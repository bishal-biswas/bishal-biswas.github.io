# Google Sheets backend

The site is static and hosted on GitHub Pages, so it has no server of its own.
One Google Sheet plus one Apps Script Web App gives it the five things that
need to write something down:

| Feature | Where it lives | What happens |
| --- | --- | --- |
| Contact form | `/contact` | Row in **Messages**, notification to you, auto-reply to the sender |
| Auto-reply mail | contact form | Sent by Apps Script, or by EmailJS if you prefer |
| Testimonials | `/testimonials` | Row in **Testimonials**, published when you tick *Approved* |
| Article views / likes / dislikes | every article | **ArticleStats** + **Reactions** |
| Newsletter | article sidebar | Row in **Newsletter**, welcome mail to the subscriber |

Total cost: nothing. Total accounts: your existing Google account.

---

## 1. Create the spreadsheet

1. Go to [sheets.new](https://sheets.new) and name it something like
   `bishal-biswas.github.io - site data`.
2. Leave it empty. The script creates the tabs it needs.

Do not share it publicly. The Web App runs as *you*, so visitors never touch
the sheet directly.

## 2. Add the script

1. In the spreadsheet: **Extensions → Apps Script**.
2. Delete the placeholder `myFunction` code.
3. Paste the whole of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
4. At the top of that file, check `CONFIG`:
   - `OWNER_EMAIL` - where notifications go.
   - `SITE_URL` - used in the emails.
   - Leave `API_TOKEN` empty for now.
5. Save (Ctrl+S) and name the project.

## 3. Create the tabs

In the Apps Script editor, pick `setupSheets` from the function dropdown and
press **Run**.

Google will ask for permission the first time. The warning screen says the app
is not verified - that is normal for a personal script. Click **Advanced → Go
to (project name) (unsafe)** and allow it. You are granting the script access
to your own spreadsheet and the ability to send mail as you.

Back in the sheet you should now see five tabs: **Messages**, **Newsletter**,
**Testimonials**, **ArticleStats**, **Reactions**.

## 4. Deploy it as a Web App

**Deploy → New deployment → gear icon → Web app**, then:

| Setting | Value |
| --- | --- |
| Description | anything, e.g. `v1` |
| Execute as | **Me (your@gmail.com)** |
| Who has access | **Anyone** |

"Anyone" is required. "Anyone with a Google account" makes every visitor sign
in, which breaks all five features.

Copy the **Web app URL**. It ends in `/exec` and looks like:

```
https://script.google.com/macros/s/AKfycb.../exec
```

## 5. Test the endpoint before wiring anything

Paste this in a browser tab, with your own URL:

```
https://script.google.com/macros/s/AKfycb.../exec?action=ping
```

You should see `{"ok":true,"message":"Backend reachable", ...}`. If you get an
HTML sign-in page instead, "Who has access" is not set to Anyone.

## 6. Point the site at it

**Locally:**

```bash
cp .env.example .env
```

Put the `/exec` URL in `PUBLIC_SHEETS_ENDPOINT`, then restart the dev server.

**In production**, the value has to reach the GitHub Actions build. On GitHub:
**Settings → Secrets and variables → Actions → Variables → New repository
variable**:

| Name | Value |
| --- | --- |
| `PUBLIC_SHEETS_ENDPOINT` | your `/exec` URL |

A *variable*, not a secret - `PUBLIC_*` values are compiled into the JavaScript
the browser downloads, so they are readable by anyone either way.
`.github/workflows/deploy.yml` already passes it through. Push, and the next
deploy picks it up.

Nothing breaks while the endpoint is missing: forms show "not connected yet"
with your email address instead, and the counters keep their build-time values.

## 7. Check it works

On the deployed site (or locally):

- **Contact** - send yourself a message. You should get two emails: the
  notification and the auto-reply. A row appears in **Messages**.
- **An article** - reload it, then click the thumbs. **ArticleStats** and
  **Reactions** fill in.
- **Article sidebar** - subscribe. A row appears in **Newsletter**.
- **Testimonials** - leave a review, then tick **Approved** in the sheet and
  reload the page. It appears without a rebuild.

---

## Auto-reply: Apps Script or EmailJS

Both work. They differ in where the mail is sent from.

**Apps Script (the default).** `CONFIG.SEND_AUTOREPLY = true` in `Code.gs` and
nothing else to set up. Mail is sent as your Gmail address, server-side, so a
visitor cannot see or abuse the credentials. Consumer Gmail allows **100
recipients per day**, which counts both the notification and the auto-reply -
so roughly 50 messages a day.

**EmailJS.** Use it if you want branded HTML templates you can edit without
touching code, or if you would rather not use your Gmail quota. The free tier
is 200 emails/month.

To switch:

1. Create an EmailJS account, add an email service, and create a template.
2. In the template, set **To Email** to `{{to_email}}`. The site sends these
   variables: `to_name`, `to_email`, `from_name`, `subject`, `message`,
   `reply_to`.
3. Fill in all three values in `.env` (and as GitHub repository variables):
   `PUBLIC_EMAILJS_PUBLIC_KEY`, `PUBLIC_EMAILJS_SERVICE_ID`,
   `PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`.
4. Set `CONFIG.SEND_AUTOREPLY = false` in `Code.gs` and redeploy (see below),
   so the visitor does not get two emails.

Apps Script still stores the message and still notifies you either way. Note
that the EmailJS key sits in the page source, which is how EmailJS is designed
to work - lock the template down to your domain in their dashboard.

## Approving testimonials

New reviews arrive in the **Testimonials** tab with **Approved** unticked and
are invisible on the site. Tick the box and it appears on the next page load -
no rebuild, no deploy.

The reviewer's email is stored but never published. To take a review down,
untick the box or delete the row.

If you would rather bake a review into the build (so it survives the backend
going away), copy it into the CMS under *Personal Info → Testimonials*. The
page de-duplicates, so it will not show twice.

To turn the runtime fetch off entirely, set `PUBLIC_LIVE_TESTIMONIALS=false`.

## Changing the script later

This is the step that catches everyone: **saving the script does not update the
live URL.**

After editing `Code.gs`:

**Deploy → Manage deployments → pencil icon → Version: New version → Deploy**

That keeps the same `/exec` URL. Creating a *new deployment* instead gives you
a new URL and you would have to update `PUBLIC_SHEETS_ENDPOINT` everywhere.

---

## Reference

### Sheet tabs

| Tab | Columns |
| --- | --- |
| Messages | Timestamp, Name, Email, Subject, Message, Page, Status |
| Newsletter | Timestamp, Email, Source, Status |
| Testimonials | Timestamp, Name, Email, Role, Rating, Review, Photo, Approved |
| ArticleStats | Slug, Views, Likes, Dislikes, Updated |
| Reactions | Timestamp, Slug, VisitorId, Reaction |

`Status` in Messages is yours to use - a dropdown of New / Replied / Ignored
makes the tab a usable inbox.

### Endpoints

| Method | Request | Returns |
| --- | --- | --- |
| POST | `{ action: "contact", name, email, subject, message }` | `{ ok, message }` |
| POST | `{ action: "subscribe", email, source }` | `{ ok, message }` |
| POST | `{ action: "testimonial", name, email, role, rating, review, photo }` | `{ ok, message }` |
| POST | `{ action: "view", slug }` | `{ ok, stats }` |
| POST | `{ action: "react", slug, reaction }` | `{ ok, reaction, stats }` |
| GET | `?action=stats&slugs=a,b` | `{ ok, stats }` |
| GET | `?action=testimonials` | `{ ok, testimonials }` |
| GET | `?action=ping` | `{ ok, message }` |

Every POST also carries `visitorId` (anonymous, from `localStorage`), `elapsed`
(milliseconds the form was on screen), `page`, and the `_gotcha` honeypot.

### Spam handling

Four cheap layers, no CAPTCHA:

- **Honeypot** - a hidden field. Filled in means bot; the request is accepted
  with a normal-looking success and thrown away.
- **Fill timing** - a form submitted in under 3 seconds is rejected.
- **Rate limit** - 8 writes per visitor per 10 minutes.
- **Validation** - email shape and length caps on every field.

If a determined spammer finds the endpoint, set `API_TOKEN` in `Code.gs` and
`PUBLIC_API_TOKEN` to the same string, and redeploy. It stops scripted abuse of
the raw URL; it is not authentication, because the value is in the page source.

### Limits worth knowing

- **Mail**: 100 recipients/day on consumer Gmail, 1,500/day on Workspace.
- **Runtime**: 6 minutes per request, and roughly 90 minutes/day total. Nowhere
  near reachable at portfolio traffic.
- **Latency**: a cold Apps Script request takes 1-3 seconds. Forms show a
  spinner; the view counter updates quietly after the page is already usable.
- **Rows**: a sheet holds 10 million cells. That is years of traffic.
- **CORS**: Apps Script never answers a preflight `OPTIONS`, so the browser
  side posts JSON as `Content-Type: text/plain`. If you rewrite that client
  code, keep it that way or every request will fail in the browser.

### Troubleshooting

| Symptom | Cause |
| --- | --- |
| Forms say "not connected yet" | `PUBLIC_SHEETS_ENDPOINT` is empty - check the GitHub *variable* and that a deploy has run since |
| `?action=ping` shows a Google sign-in page | "Who has access" is not **Anyone** |
| Works locally, not in production | The repository variable is missing, or the last deploy predates it |
| Edits to `Code.gs` have no effect | You saved but did not redeploy - **Manage deployments → New version** |
| Rows appear, no emails | Check **Executions** in the Apps Script editor; usually the daily mail quota |
| Counters stay at 0 | The article has no `slug` in its front matter |
| CORS error in the console | The content type was changed to `application/json`, or the URL is the `/dev` one instead of `/exec` |
