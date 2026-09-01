/**
 * Google Sheets backend for bishal-biswas.github.io
 * ----------------------------------------------------------------------------
 * A single Apps Script Web App bound to one spreadsheet. It stands in for a
 * database on a fully static GitHub Pages site:
 *
 *   POST  { action: "contact"     }  -> Messages tab      + notify + auto-reply
 *   POST  { action: "subscribe"   }  -> Newsletter tab    + welcome mail
 *   POST  { action: "testimonial" }  -> Testimonials tab  (pending approval)
 *   POST  { action: "view"        }  -> ArticleStats tab  (view counter)
 *   POST  { action: "react"       }  -> Reactions tab     (like / dislike)
 *   GET   ?action=stats&slugs=a,b    -> counts for those articles
 *   GET   ?action=testimonials       -> approved testimonials
 *   GET   ?action=ping               -> health check
 *
 * Setup lives in docs/google-sheets-backend.md. The short version:
 *   1. Extensions > Apps Script from the spreadsheet, paste this file.
 *   2. Run setupSheets() once and accept the permission prompt.
 *   3. Deploy > New deployment > Web app, "Execute as: Me",
 *      "Who has access: Anyone", then copy the /exec URL into
 *      PUBLIC_SHEETS_ENDPOINT.
 *
 * CORS note: Apps Script web apps never answer a preflight OPTIONS request, so
 * the browser side must stay inside the CORS "simple request" rules - the site
 * posts JSON under Content-Type: text/plain. Do not "fix" that to
 * application/json; it will start failing in the browser.
 */

/* -- Configuration -------------------------------------------------------- */

var CONFIG = {
    // Where "you have a new message" notifications land.
    OWNER_EMAIL: 'bishal.biswas.4796@gmail.com',
    SITE_NAME: 'Bishal Biswas',
    SITE_URL: 'https://bishal-biswas.github.io',

    // Optional shared string; must match PUBLIC_API_TOKEN in the site build.
    // It ships inside the page source, so treat it as a speed bump against
    // drive-by bots hitting the endpoint directly - not as authentication.
    API_TOKEN: '',

    // Turn this off if EmailJS sends the visitor-facing auto-reply instead.
    // Leave it on and the whole flow works without any third-party service.
    SEND_AUTOREPLY: true,

    // A form filled in faster than this was filled in by a script.
    MIN_FILL_SECONDS: 3,

    // Per-visitor write budget, enforced through CacheService.
    RATE_LIMIT_WRITES: 8,
    RATE_LIMIT_WINDOW_SECONDS: 600,

    // One view per visitor per article per this many seconds.
    VIEW_DEDUPE_SECONDS: 21600, // 6 hours

    MAX_LENGTH: {
        name: 120, email: 160, subject: 160, message: 5000,
        review: 2000, role: 120, slug: 200, page: 300, photo: 500
    }
};

var SHEETS = {
    MESSAGES: {
        name: 'Messages',
        headers: ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Page', 'Status']
    },
    NEWSLETTER: {
        name: 'Newsletter',
        headers: ['Timestamp', 'Email', 'Source', 'Status']
    },
    TESTIMONIALS: {
        name: 'Testimonials',
        headers: ['Timestamp', 'Name', 'Email', 'Role', 'Rating', 'Review', 'Photo', 'Approved']
    },
    STATS: {
        name: 'ArticleStats',
        headers: ['Slug', 'Views', 'Likes', 'Dislikes', 'Updated']
    },
    REACTIONS: {
        name: 'Reactions',
        headers: ['Timestamp', 'Slug', 'VisitorId', 'Reaction']
    }
};

/* -- One-time setup ------------------------------------------------------- */

/**
 * Run this once from the Apps Script editor. It creates every tab with the
 * right headers; running it again is harmless.
 */
function setupSheets() {
    Object.keys(SHEETS).forEach(function (key) { sheetFor(SHEETS[key]); });
    SpreadsheetApp.getActiveSpreadsheet().toast('All tabs are ready.', 'Setup complete', 5);
}

/* -- Entry points --------------------------------------------------------- */

function doGet(e) {
    var params = (e && e.parameter) || {};
    var result;
    try {
        switch (params.action) {
            case 'stats':
                result = { ok: true, stats: readStats(splitList(params.slugs || params.slug)) };
                break;
            case 'testimonials':
                result = { ok: true, testimonials: readApprovedTestimonials() };
                break;
            case 'ping':
                result = { ok: true, message: 'Backend reachable', time: new Date().toISOString() };
                break;
            default:
                result = { ok: false, error: 'Unknown action' };
        }
    } catch (err) {
        result = { ok: false, error: errorText(err) };
    }
    // callback= makes this JSONP, the escape hatch if plain CORS ever breaks.
    return reply(result, params.callback);
}

function doPost(e) {
    var result;
    try {
        var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

        if (CONFIG.API_TOKEN && body.token !== CONFIG.API_TOKEN) {
            throw new Error('This request was rejected.');
        }
        // Honeypot: a real person never fills a field they cannot see. Answer
        // with a normal success so the bot has nothing to learn from it.
        if (body._gotcha) return reply({ ok: true, message: 'Thanks!' });

        switch (body.action) {
            case 'contact':     result = handleContact(body); break;
            case 'subscribe':   result = handleSubscribe(body); break;
            case 'testimonial': result = handleTestimonial(body); break;
            case 'view':        result = handleView(body); break;
            case 'react':       result = handleReact(body); break;
            default: throw new Error('Unknown action');
        }
    } catch (err) {
        result = { ok: false, error: errorText(err) };
    }
    return reply(result);
}

/* -- Handlers ------------------------------------------------------------- */

function handleContact(body) {
    var name = clean(body.name, CONFIG.MAX_LENGTH.name);
    var email = clean(body.email, CONFIG.MAX_LENGTH.email);
    var subject = clean(body.subject, CONFIG.MAX_LENGTH.subject) || 'Website enquiry';
    var message = clean(body.message, CONFIG.MAX_LENGTH.message);
    var page = clean(body.page, CONFIG.MAX_LENGTH.page);

    if (!name) throw new Error('Please tell me your name.');
    if (!isEmail(email)) throw new Error('That email address does not look right.');
    if (message.length < 10) throw new Error('Please write a slightly longer message.');

    requireHumanTiming(body);
    rateLimit(body.visitorId);

    appendRow(SHEETS.MESSAGES, [new Date(), name, email, subject, message, page, 'New']);

    notifyOwner(
        'New message from ' + name,
        '<p><strong>' + esc(name) + '</strong> (' + esc(email) + ') wrote from ' +
        (page ? '<a href="' + esc(page) + '">' + esc(page) + '</a>' : 'the contact page') + ':</p>' +
        '<p><em>' + esc(subject) + '</em></p>' +
        quoteBlock(message),
        email
    );

    if (CONFIG.SEND_AUTOREPLY) sendContactAutoReply(name, email, message);

    return { ok: true, message: 'Thanks ' + name + ' - your message is on its way.' };
}

function handleSubscribe(body) {
    var email = clean(body.email, CONFIG.MAX_LENGTH.email);
    var source = clean(body.source, CONFIG.MAX_LENGTH.page);

    if (!isEmail(email)) throw new Error('That email address does not look right.');
    requireHumanTiming(body);
    rateLimit(body.visitorId);

    return withLock(function () {
        var sheet = sheetFor(SHEETS.NEWSLETTER);
        var existing = columnValues(sheet, 2).map(lower);
        if (existing.indexOf(lower(email)) !== -1) {
            return { ok: true, message: 'You are already on the list - thanks!' };
        }

        sheet.appendRow([new Date(), email, source, 'Subscribed']);
        sendWelcomeEmail(email);
        notifyOwner('New newsletter subscriber',
            '<p>' + esc(email) + ' subscribed from ' + esc(source || 'the site') + '.</p>');

        return { ok: true, message: 'You are subscribed. Check your inbox for a hello.' };
    });
}

function handleTestimonial(body) {
    var name = clean(body.name, CONFIG.MAX_LENGTH.name);
    var email = clean(body.email, CONFIG.MAX_LENGTH.email);
    var role = clean(body.role, CONFIG.MAX_LENGTH.role);
    var review = clean(body.review, CONFIG.MAX_LENGTH.review);
    var photo = clean(body.photo, CONFIG.MAX_LENGTH.photo);
    var rating = Math.max(1, Math.min(5, Math.round(Number(body.rating) || 5)));

    if (!name) throw new Error('Please tell me your name.');
    if (!isEmail(email)) throw new Error('That email address does not look right.');
    if (review.length < 20) throw new Error('Please write at least a sentence or two.');

    requireHumanTiming(body);
    rateLimit(body.visitorId);

    var sheet = sheetFor(SHEETS.TESTIMONIALS);
    sheet.appendRow([new Date(), name, email, role, rating, review, photo, false]);
    // Render the Approved column as a real checkbox so approving is one click.
    sheet.getRange(sheet.getLastRow(), 8).insertCheckboxes();

    notifyOwner(
        'New testimonial from ' + name,
        '<p><strong>' + esc(name) + '</strong>' + (role ? ' - ' + esc(role) : '') +
        ' left a ' + rating + '/5 review:</p>' +
        quoteBlock(review) +
        '<p>Tick <strong>Approved</strong> in the Testimonials tab to publish it.</p>',
        email
    );

    return { ok: true, message: 'Thank you! Your review is in and will appear once I approve it.' };
}

function handleView(body) {
    var slug = clean(body.slug, CONFIG.MAX_LENGTH.slug);
    if (!slug) throw new Error('Missing slug');

    // One counted view per visitor per article per VIEW_DEDUPE_SECONDS. A
    // refresh loop then costs a cache lookup instead of a spreadsheet write.
    var cache = CacheService.getScriptCache();
    // CacheService keys cap out at 250 characters, so trim the slug rather
    // than letting a long one silently break the dedupe.
    var key = 'view:' + slug.slice(0, 80) + ':' + (clean(body.visitorId, 80) || 'anon');
    if (cache.get(key)) {
        return { ok: true, stats: readStats([slug])[slug], counted: false };
    }
    cache.put(key, '1', CONFIG.VIEW_DEDUPE_SECONDS);

    var stats = withLock(function () {
        var row = statsRow(slug);
        row.values[1] = Number(row.values[1] || 0) + 1;
        writeStatsRow(row);
        return {
            views: row.values[1],
            likes: Number(row.values[2] || 0),
            dislikes: Number(row.values[3] || 0)
        };
    });

    return { ok: true, stats: stats, counted: true };
}

function handleReact(body) {
    var slug = clean(body.slug, CONFIG.MAX_LENGTH.slug);
    var reaction = lower(clean(body.reaction, 10));
    var visitorId = clean(body.visitorId, 80);

    if (!slug) throw new Error('Missing slug');
    if (reaction !== 'like' && reaction !== 'dislike') throw new Error('Unknown reaction');
    if (!visitorId) throw new Error('Missing visitor id');

    return withLock(function () {
        var sheet = sheetFor(SHEETS.REACTIONS);
        var rows = sheet.getLastRow() > 1
            ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues()
            : [];

        var mine = -1;
        for (var i = 0; i < rows.length; i++) {
            if (String(rows[i][1]) === slug && String(rows[i][2]) === visitorId) { mine = i; break; }
        }

        var current = mine === -1 ? '' : lower(String(rows[mine][3]));
        var next;
        if (mine === -1) {
            sheet.appendRow([new Date(), slug, visitorId, reaction]);
            next = reaction;
        } else if (current === reaction) {
            sheet.deleteRow(mine + 2); // clicking the same button again clears it
            next = '';
        } else {
            sheet.getRange(mine + 2, 4).setValue(reaction);
            sheet.getRange(mine + 2, 1).setValue(new Date());
            next = reaction;
        }

        var counts = countReactions(slug);
        var row = statsRow(slug);
        row.values[2] = counts.likes;
        row.values[3] = counts.dislikes;
        writeStatsRow(row);

        return {
            ok: true,
            reaction: next,
            stats: { views: Number(row.values[1] || 0), likes: counts.likes, dislikes: counts.dislikes }
        };
    });
}

/* -- Reads ---------------------------------------------------------------- */

function readStats(slugs) {
    var sheet = sheetFor(SHEETS.STATS);
    var rows = sheet.getLastRow() > 1
        ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues()
        : [];

    var all = {};
    rows.forEach(function (row) {
        all[String(row[0])] = {
            views: Number(row[1] || 0),
            likes: Number(row[2] || 0),
            dislikes: Number(row[3] || 0)
        };
    });

    if (!slugs || !slugs.length) return all;

    var picked = {};
    slugs.forEach(function (slug) {
        picked[slug] = all[slug] || { views: 0, likes: 0, dislikes: 0 };
    });
    return picked;
}

function readApprovedTestimonials() {
    var sheet = sheetFor(SHEETS.TESTIMONIALS);
    if (sheet.getLastRow() < 2) return [];

    return sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues()
        .filter(function (row) { return row[7] === true || lower(String(row[7])) === 'true'; })
        .map(function (row) {
            return {
                clientName: String(row[1] || ''),
                role: String(row[3] || ''),
                ratingStar: Number(row[4] || 0),
                reviewText: String(row[5] || ''),
                clientImg: String(row[6] || '')
            };
        })
        .reverse(); // newest first
}

function countReactions(slug) {
    var sheet = sheetFor(SHEETS.REACTIONS);
    if (sheet.getLastRow() < 2) return { likes: 0, dislikes: 0 };

    var rows = sheet.getRange(2, 2, sheet.getLastRow() - 1, 3).getValues();
    var likes = 0, dislikes = 0;
    rows.forEach(function (row) {
        if (String(row[0]) !== slug) return;
        if (lower(String(row[2])) === 'like') likes++;
        else if (lower(String(row[2])) === 'dislike') dislikes++;
    });
    return { likes: likes, dislikes: dislikes };
}

/* -- ArticleStats row helpers --------------------------------------------- */

/** Returns { rowIndex, values } for a slug, creating the row if it is new. */
function statsRow(slug) {
    var sheet = sheetFor(SHEETS.STATS);
    var slugs = columnValues(sheet, 1).map(String);
    var index = slugs.indexOf(slug);

    if (index === -1) {
        var fresh = [slug, 0, 0, 0, new Date()];
        sheet.appendRow(fresh);
        return { rowIndex: sheet.getLastRow(), values: fresh };
    }
    var rowIndex = index + 2; // +1 for the header, +1 because ranges are 1-based
    return { rowIndex: rowIndex, values: sheet.getRange(rowIndex, 1, 1, 5).getValues()[0] };
}

function writeStatsRow(row) {
    row.values[4] = new Date();
    sheetFor(SHEETS.STATS).getRange(row.rowIndex, 1, 1, 5).setValues([row.values]);
}

/* -- Mail ----------------------------------------------------------------- */

function notifyOwner(subject, htmlBody, replyTo) {
    var options = {
        to: CONFIG.OWNER_EMAIL,
        subject: '[' + CONFIG.SITE_NAME + '] ' + subject,
        htmlBody: htmlBody
    };
    if (replyTo && isEmail(replyTo)) options.replyTo = replyTo;
    trySend(options);
}

function sendContactAutoReply(name, email, message) {
    trySend({
        to: email,
        name: CONFIG.SITE_NAME,
        subject: 'Thanks for getting in touch, ' + name,
        htmlBody: emailShell(
            'Thanks for reaching out',
            '<p>Hi ' + esc(name) + ',</p>' +
            '<p>Your message reached me and I read every one personally. Expect a reply within a day or two.</p>' +
            '<p style="color:#565658;font-size:13px">For reference, here is what you sent:</p>' +
            quoteBlock(message) +
            '<p>- ' + esc(CONFIG.SITE_NAME) + '</p>'
        )
    });
}

function sendWelcomeEmail(email) {
    trySend({
        to: email,
        name: CONFIG.SITE_NAME,
        subject: 'You are on the list',
        htmlBody: emailShell(
            'Welcome aboard',
            '<p>Thanks for subscribing.</p>' +
            '<p>You will hear from me when a new article goes up - no more often than that, and never with anything I would not want in my own inbox.</p>' +
            '<p><a href="' + CONFIG.SITE_URL + '/articles" style="color:#5fb353">Browse the latest articles</a></p>' +
            '<p>- ' + esc(CONFIG.SITE_NAME) + '</p>'
        )
    });
}

/** A plain, dependency-free HTML wrapper that survives every mail client. */
function emailShell(heading, inner) {
    return '' +
        '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;' +
        'line-height:1.6;color:#00283a;max-width:560px">' +
        '<h2 style="color:#5fb353;margin:0 0 16px">' + esc(heading) + '</h2>' +
        inner +
        '<hr style="border:0;border-top:1px solid #dedede;margin:24px 0">' +
        '<p style="font-size:12px;color:#565658">Sent from ' +
        '<a href="' + CONFIG.SITE_URL + '" style="color:#5fb353">' + CONFIG.SITE_URL + '</a></p>' +
        '</div>';
}

function quoteBlock(text) {
    return '<blockquote style="border-left:3px solid #5fb353;margin:0;padding:0 0 0 12px">' +
        esc(text).replace(/\n/g, '<br>') + '</blockquote>';
}

/**
 * A failed send must never fail the request - the row is already saved, and
 * losing a notification is far better than telling the visitor it broke.
 */
function trySend(options) {
    try {
        MailApp.sendEmail(options);
    } catch (err) {
        console.error('Mail failed: ' + errorText(err));
    }
}

/* -- Guards --------------------------------------------------------------- */

function requireHumanTiming(body) {
    var elapsed = Number(body.elapsed || 0);
    // elapsed is milliseconds since the form rendered. Missing means an old
    // cached page, so only reject a value that is present and implausible.
    if (elapsed && elapsed < CONFIG.MIN_FILL_SECONDS * 1000) {
        throw new Error('That was quick! Please try again.');
    }
}

function rateLimit(visitorId) {
    if (!visitorId) return;
    var cache = CacheService.getScriptCache();
    var key = 'rate:' + visitorId;
    var count = Number(cache.get(key) || 0) + 1;
    cache.put(key, String(count), CONFIG.RATE_LIMIT_WINDOW_SECONDS);
    if (count > CONFIG.RATE_LIMIT_WRITES) {
        throw new Error('Too many submissions in a row. Please try again later.');
    }
}

/* -- Small helpers -------------------------------------------------------- */

function sheetFor(definition) {
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(definition.name);
    if (!sheet) {
        sheet = book.insertSheet(definition.name);
        sheet.appendRow(definition.headers);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, definition.headers.length).setFontWeight('bold');
    }
    return sheet;
}

function appendRow(definition, values) {
    withLock(function () { sheetFor(definition).appendRow(values); });
}

function columnValues(sheet, columnIndex) {
    if (sheet.getLastRow() < 2) return [];
    return sheet.getRange(2, columnIndex, sheet.getLastRow() - 1, 1)
        .getValues()
        .map(function (row) { return row[0]; });
}

/** Serialises writes so two simultaneous visitors cannot clobber a counter. */
function withLock(fn) {
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
        return fn();
    } finally {
        lock.releaseLock();
    }
}

function reply(payload, callback) {
    var body = JSON.stringify(payload);
    if (callback && /^[A-Za-z_$][\w$]*$/.test(callback)) {
        return ContentService.createTextOutput(callback + '(' + body + ')')
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function clean(value, maxLength) {
    return String(value == null ? '' : value).trim().slice(0, maxLength || 500);
}

function lower(value) {
    return String(value == null ? '' : value).trim().toLowerCase();
}

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || ''));
}

function splitList(value) {
    return String(value || '')
        .split(',')
        .map(function (item) { return item.trim(); })
        .filter(Boolean);
}

function esc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function errorText(err) {
    return String((err && err.message) || err || 'Something went wrong');
}

-----------------------------------------------------------------------------------------------------------------------
Let me check the actual code path rather than answer from memory.

**No — you're fine. Leave it as it is.**

The check is written to be skipped when the token is blank:

```js
if (CONFIG.API_TOKEN && body.token !== CONFIG.API_TOKEN) {
    throw new Error('This request was rejected.');
}
```

`''` is falsy, so the whole condition short-circuits and every request passes straight through. The client side matches — `SiteApi.astro` only attaches a token when one exists (`if (token) body.token = token`). Blank on both sides is a valid, fully-working configuration, and it's the one I shipped as the default. Nothing to redeploy.

## What the token is actually for

It's optional friction against bots that scrape `/exec` URLs and POST at them directly. It is **not** security: `PUBLIC_API_TOKEN` gets compiled into your JavaScript, so anyone who views source can read it and replay it. The real spam defence is already active without it — honeypot field, 3-second minimum fill time, 8 writes per visitor per 10 minutes, plus length and email validation.

So the honest advice: only bother if you actually start seeing junk rows in the sheet.

## If you do add it later

Both sides must change together, and each needs its own deploy:

1. Set `API_TOKEN: 'some-random-string'` in `Code.gs` → **Deploy → Manage deployments → pencil → Version: New version → Deploy** (keeps the same `/exec` URL)
2. Set `PUBLIC_API_TOKEN` to the *identical* string — in `.env` locally, and as a GitHub repository variable for production → push to rebuild the site

⚠️ Do step 1 without step 2 and **every form submission dies** with "This request was rejected." — contact, newsletter, testimonials, likes, view counts, all of it. The script would be rejecting a site that isn't sending a token yet. If that ever happens, blanking `API_TOKEN` and redeploying fixes it immediately.

One asymmetry worth knowing since you're asking: the token only gates `doPost`. `doGet` — the `stats`, `testimonials` and `ping` reads — has no check, deliberately. Those return data that's already public on your pages, and the client appends the token to GETs anyway, so it's ignored there. If you'd want reads gated too, that's a small addition to `doGet`, but I'd leave it.