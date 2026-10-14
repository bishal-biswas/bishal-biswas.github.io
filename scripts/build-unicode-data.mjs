// Builds the static data behind /tools/character-emoji-finder.
//
//   node scripts/build-unicode-data.mjs
//
// Downloads the Unicode Character Database, the emojibase dataset and the
// WHATWG named-entity list, then writes two files the page fetches at runtime:
//
//   public/assets/data/unicode/chars.json  - emoji + curated character sets
//                                            (loaded when the tool opens)
//   public/assets/data/unicode/names.txt   - every named code point, only
//                                            loaded for "search all Unicode"
//                                            and the text inspector
//
// Bump the versions below and re-run when a new Unicode release lands.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const UNICODE_VERSION = "17.0.0";
const EMOJIBASE_VERSION = "17.0.0";

const SOURCES = {
    "UnicodeData.txt": `https://www.unicode.org/Public/${UNICODE_VERSION}/ucd/UnicodeData.txt`,
    "NameAliases.txt": `https://www.unicode.org/Public/${UNICODE_VERSION}/ucd/NameAliases.txt`,
    "Blocks.txt": `https://www.unicode.org/Public/${UNICODE_VERSION}/ucd/Blocks.txt`,
    "emoji-test.txt": `https://www.unicode.org/Public/${UNICODE_VERSION}/emoji/emoji-test.txt`,
    "emoji.json": `https://cdn.jsdelivr.net/npm/emojibase-data@${EMOJIBASE_VERSION}/en/data.json`,
    "shortcodes.json": `https://cdn.jsdelivr.net/npm/emojibase-data@${EMOJIBASE_VERSION}/en/shortcodes/github.json`,
    "entities.json": "https://html.spec.whatwg.org/entities.json",
};

const CACHE_DIR = join(tmpdir(), `unicode-data-${UNICODE_VERSION}`);
const OUT_DIR = join(process.cwd(), "public", "assets", "data", "unicode");

async function source(file) {
    const cached = join(CACHE_DIR, file);
    if (!existsSync(cached)) {
        console.log(`Downloading ${SOURCES[file]}`);
        const res = await fetch(SOURCES[file]);
        if (!res.ok) throw new Error(`${SOURCES[file]} -> HTTP ${res.status}`);
        await writeFile(cached, Buffer.from(await res.arrayBuffer()));
    }
    return readFile(cached, "utf8");
}

const hex = cp => cp.toString(16).toUpperCase().padStart(4, "0");

// ---- Character sets shown under the "Characters" tab ----------------------
// `ranges` are inclusive [start, end]; unassigned code points are dropped.
// `filter` (optional) receives the Unicode name.
const SETS = [
    { id: "popular", label: "Popular", chars: "✓✔✗✘☐☑☒★☆✦✧♥❤♡♠♣♦→←↑↓↔↕⇒⇐⇔➜➔•·◦‣…–—‒‐«»‹›“”‘’„‚©®™℠°±×÷≠≈≤≥∞√∑∏∆∂µπΩ€£¥¢₹₽₩₿§¶†‡‰‱¹²³¼½¾⅓⅔¿¡№℃℉☀☁☂☃☎✉✈⚠⚡☕♪♫♬⌘⌥⇧⌃⏎⌫⌦⎋⇥␣●○◉◎■□▪▫▲△▼▽◆◇◀▶♀♂⚥☯☮✝☪✡☠☢☣⚛♻∴∵✱✲✳❀✿❁✽" },
    { id: "arrows", label: "Arrows", ranges: [[0x2190, 0x21FF], [0x27F0, 0x27FF], [0x2900, 0x297F], [0x2794, 0x27BF], [0x2B00, 0x2BFF]], filter: name => /ARROW|HARPOON/.test(name) },
    { id: "math", label: "Math", ranges: [[0x00AC, 0x00AC], [0x00B1, 0x00B1], [0x00D7, 0x00D7], [0x00F7, 0x00F7], [0x2200, 0x22FF], [0x27C0, 0x27EF], [0x2980, 0x29FF], [0x2A00, 0x2AFF]] },
    { id: "currency", label: "Currency", category: "Sc" },
    { id: "punctuation", label: "Punctuation", ranges: [[0x00A1, 0x00A1], [0x00A7, 0x00A7], [0x00AB, 0x00AB], [0x00B6, 0x00B7], [0x00BB, 0x00BB], [0x00BF, 0x00BF], [0x2010, 0x2027], [0x2030, 0x205E], [0x2E00, 0x2E5D]] },
    { id: "invisible", label: "Spaces & invisible", ranges: [[0x0009, 0x0009], [0x0020, 0x0020], [0x00A0, 0x00A0], [0x00AD, 0x00AD], [0x034F, 0x034F], [0x061C, 0x061C], [0x115F, 0x1160], [0x17B4, 0x17B5], [0x180E, 0x180E], [0x2000, 0x200F], [0x2028, 0x202F], [0x205F, 0x2064], [0x2066, 0x206F], [0x2800, 0x2800], [0x3000, 0x3000], [0x3164, 0x3164], [0xFE00, 0xFE0F], [0xFEFF, 0xFEFF], [0xFFA0, 0xFFA0], [0xFFFC, 0xFFFD]] },
    { id: "latin", label: "Accented letters", ranges: [[0x00C0, 0x00FF], [0x0100, 0x017F], [0x0180, 0x024F], [0x1E00, 0x1EFF]], filter: name => !/MULTIPLICATION|DIVISION/.test(name) },
    { id: "greek", label: "Greek", ranges: [[0x0370, 0x03FF]] },
    { id: "cyrillic", label: "Cyrillic", ranges: [[0x0400, 0x04FF]] },
    { id: "superscript", label: "Superscript & subscript", ranges: [[0x00B2, 0x00B3], [0x00B9, 0x00B9], [0x00AA, 0x00AA], [0x00BA, 0x00BA], [0x02B0, 0x02FF], [0x1D2C, 0x1D6A], [0x1D9B, 0x1DBF], [0x2070, 0x209F], [0x2C7C, 0x2C7D], [0xA770, 0xA770]], filter: name => /SUPERSCRIPT|SUBSCRIPT|MODIFIER LETTER (SMALL|CAPITAL)|ORDINAL INDICATOR/.test(name) },
    { id: "numbers", label: "Numbers & fractions", ranges: [[0x00BC, 0x00BE], [0x2150, 0x218B], [0x2460, 0x24FF], [0x2776, 0x2793], [0x3251, 0x325F], [0x32B1, 0x32BF], [0x1F100, 0x1F10C]] },
    { id: "shapes", label: "Shapes", ranges: [[0x25A0, 0x25FF], [0x2B12, 0x2B2F], [0x2B50, 0x2B59], [0x2BC0, 0x2BCF], [0x1F780, 0x1F7D8], [0x1F7E0, 0x1F7EB]] },
    { id: "box", label: "Box drawing & blocks", ranges: [[0x2500, 0x259F], [0x1FB00, 0x1FBCA]] },
    { id: "symbols", label: "Misc symbols", ranges: [[0x2600, 0x26FF]] },
    { id: "dingbats", label: "Dingbats", ranges: [[0x2700, 0x27BF]], filter: name => !/ARROW/.test(name) },
    { id: "technical", label: "Keyboard & technical", ranges: [[0x2300, 0x23FF], [0x2400, 0x2426]] },
    { id: "letterlike", label: "Letterlike", ranges: [[0x2100, 0x214F]] },
    { id: "fancy", label: "Fancy text letters", ranges: [[0x1D400, 0x1D7FF]] },
    { id: "music", label: "Music", ranges: [[0x2669, 0x266F], [0x1D100, 0x1D1EA]] },
    { id: "games", label: "Chess, cards & dice", ranges: [[0x2654, 0x265F], [0x2680, 0x2685], [0x1F000, 0x1F02B], [0x1F030, 0x1F093], [0x1F0A0, 0x1F0F5], [0x1FA00, 0x1FA6D]] },
    { id: "braille", label: "Braille", ranges: [[0x2800, 0x28FF]] },
    { id: "ascii", label: "ASCII", ranges: [[0x0020, 0x007E]] },
];

// Everyday words people type that the official Unicode names do not contain.
const KEYWORDS = {
    "2713": "tick done yes", "2714": "tick done yes", "2717": "cross no wrong", "2718": "cross no wrong",
    "2610": "checkbox unchecked", "2611": "checkbox checked tick", "2612": "checkbox crossed",
    "2022": "bullet dot list", "00B7": "middot dot interpunct", "2026": "ellipsis dots three",
    "2013": "en dash range", "2014": "em dash", "00B0": "degree temperature", "00D7": "multiply times x",
    "00F7": "divide obelus", "2260": "not equal", "2248": "approximately about", "221E": "infinity",
    "2318": "command cmd mac", "2325": "option alt mac", "21E7": "shift", "2303": "control ctrl",
    "23CE": "enter return", "21B5": "enter return", "232B": "backspace delete", "2326": "delete forward",
    "238B": "escape esc", "21E5": "tab", "2423": "space visible", "2665": "heart love suit",
    "2764": "heart love", "2661": "heart love outline", "2605": "star favourite", "2606": "star favourite outline",
    "00A9": "copyright", "00AE": "registered trademark", "2122": "trademark tm", "00A7": "section law",
    "00B6": "paragraph pilcrow", "20AC": "euro", "00A3": "pound sterling gbp", "00A5": "yen yuan",
    "20B9": "rupee inr india", "20BF": "bitcoin btc crypto", "0024": "dollar usd", "00A2": "cent",
    "00A0": "nbsp non-breaking space", "200B": "zwsp zero width space", "200D": "zwj zero width joiner",
    "200C": "zwnj zero width non-joiner", "FEFF": "bom byte order mark zwnbsp", "2060": "wj word joiner",
    "00AD": "shy soft hyphen", "3164": "hangul filler blank invisible name", "2800": "braille blank invisible",
    "FE0F": "emoji presentation selector vs16", "FE0E": "text presentation selector vs15",
    "2192": "right next", "2190": "left back", "2191": "up", "2193": "down",
    "00AB": "guillemet quote angle", "00BB": "guillemet quote angle", "201C": "smart quote curly", "201D": "smart quote curly",
    "2018": "smart quote apostrophe curly", "2019": "apostrophe smart quote curly",
    "2640": "female woman venus", "2642": "male man mars", "262F": "yin yang", "262E": "peace",
    "2620": "skull poison pirate", "267B": "recycle", "26A0": "warning caution", "26A1": "lightning voltage",
    "2600": "sun sunny weather", "2601": "cloud weather", "2602": "umbrella rain", "2603": "snowman snow",
    "260E": "phone telephone call", "2709": "email mail envelope letter", "2708": "plane airplane flight",
    "221A": "square root radical", "2211": "sum sigma", "220F": "product", "03C0": "pi", "2116": "number numero",
    "2103": "celsius", "2109": "fahrenheit",
};

// ---- Parse the UCD ---------------------------------------------------------
const unicodeData = await (async () => {
    await mkdir(CACHE_DIR, { recursive: true });
    return source("UnicodeData.txt");
})();

const names = new Map();      // cp -> name
const categories = new Map(); // cp -> general category
const computedRanges = [];    // [start, end, label] for "<CJK Ideograph, First>" etc.
let pendingFirst = null;

for (const line of unicodeData.split("\n")) {
    if (!line) continue;
    const fields = line.split(";");
    const cp = parseInt(fields[0], 16);
    const name = fields[1];
    categories.set(cp, fields[2]);
    const range = name.match(/^<(.+), (First|Last)>$/);
    if (range) {
        if (range[2] === "First") pendingFirst = cp;
        else computedRanges.push([pendingFirst, cp, range[1]]);
        continue;
    }
    // Control characters are "<control>" in field 1; the real name lives in the alias file.
    if (name.startsWith("<")) continue;
    names.set(cp, name);
}

// Formal aliases: corrections replace the (frozen, sometimes misspelt) name;
// control/figment names fill in for "<control>"; abbreviations become keywords.
const aliasKeywords = new Map();
for (const line of (await source("NameAliases.txt")).split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [cpHex, alias, type] = line.split(";").map(s => s.trim());
    const cp = parseInt(cpHex, 16);
    if (type === "correction") names.set(cp, alias);
    else if ((type === "control" || type === "figment") && !names.has(cp)) names.set(cp, alias);
    else if (type === "abbreviation") aliasKeywords.set(cp, [...(aliasKeywords.get(cp) || []), alias.toLowerCase()]);
}

const blocks = [];
for (const line of (await source("Blocks.txt")).split("\n")) {
    const match = line.match(/^([0-9A-F]+)\.\.([0-9A-F]+); (.+)$/);
    if (match) blocks.push([parseInt(match[1], 16), parseInt(match[2], 16), match[3].trim()]);
}

// Named HTML entities. Several names often map to one character - keep the
// shortest, preferring lowercase (&rarr; over &RightArrow; and &srarr;).
const entityFor = new Map();
const isLower = e => e === e.toLowerCase();
for (const [entity, { codepoints }] of Object.entries(JSON.parse(await source("entities.json")))) {
    if (!entity.endsWith(";") || codepoints.length !== 1) continue;
    const cp = codepoints[0];
    const current = entityFor.get(cp);
    const better = !current
        || entity.length < current.length
        || (entity.length === current.length && isLower(entity) && !isLower(current));
    if (better) entityFor.set(cp, entity);
}

// ---- Character sets --------------------------------------------------------
const toRuns = cps => {
    const runs = [];
    for (const cp of cps) {
        const last = runs[runs.length - 1];
        if (last && cp === last[1] + 1) last[1] = cp;
        else runs.push([cp, cp]);
    }
    return runs.map(([a, b]) => (a === b ? a.toString(16) : `${a.toString(16)}-${b.toString(16)}`)).join(",");
};

const usedChars = new Set();
const sets = SETS.map(set => {
    let cps;
    if (set.chars) {
        cps = [...new Set(Array.from(set.chars, ch => ch.codePointAt(0)))];
    } else if (set.category) {
        cps = [...categories].filter(([cp, cat]) => cat === set.category && names.has(cp)).map(([cp]) => cp);
    } else {
        cps = [];
        for (const [start, end] of set.ranges) {
            for (let cp = start; cp <= end; cp++) {
                if (!names.has(cp)) continue;
                if (set.filter && !set.filter(names.get(cp))) continue;
                cps.push(cp);
            }
        }
        cps = [...new Set(cps)];
        if (set.id !== "popular") cps.sort((a, b) => a - b);
    }
    cps.forEach(cp => {
        if (!names.has(cp)) throw new Error(`${set.id}: U+${hex(cp)} has no name`);
        usedChars.add(cp);
    });
    return { id: set.id, label: set.label, cps: set.chars ? cps.map(cp => cp.toString(16)).join(",") : toRuns(cps), count: cps.length };
});

const chars = {};
for (const cp of [...usedChars].sort((a, b) => a - b)) {
    // [name, keywords, abbreviation] - the abbreviation (NBSP, ZWJ...) labels
    // invisible characters in the grid.
    const aliases = aliasKeywords.get(cp) || [];
    const entry = [names.get(cp)];
    const keywords = [...new Set([...aliases, ...(KEYWORDS[hex(cp)] || "").split(" ")])].filter(Boolean).join(" ");
    if (keywords || aliases.length) entry.push(keywords);
    if (aliases.length) entry.push(aliases[0].toUpperCase());
    chars[cp.toString(16)] = entry;
}
for (const key of Object.keys(KEYWORDS)) {
    if (!usedChars.has(parseInt(key, 16))) console.warn(`Keyword entry U+${key} is not in any set`);
}

// ---- Emoji -----------------------------------------------------------------
const GROUPS = ["Smileys & emotion", "People & body", null, "Animals & nature", "Food & drink", "Travel & places", "Activities", "Objects", "Symbols", "Flags"];
const GROUP_IDS = ["smileys", "people", null, "animals", "food", "travel", "activities", "objects", "symbols", "flags"];
const shortcodes = JSON.parse(await source("shortcodes.json"));

// emojibase appends VS16 (U+FE0F) to nearly every emoji, including ones that
// are emoji by default (👍️). Use the fully-qualified form from Unicode's own
// emoji-test.txt instead, so the code points shown match the standard.
const qualified = new Map();
for (const line of (await source("emoji-test.txt")).split("\n")) {
    const match = line.match(/^([0-9A-F ]+?)\s*; fully-qualified/);
    if (!match) continue;
    const str = String.fromCodePoint(...match[1].split(" ").map(h => parseInt(h, 16)));
    qualified.set(str.replace(/️/g, ""), str);
}
const canonical = str => qualified.get(str.replace(/️/g, "")) || str;

const emoji = JSON.parse(await source("emoji.json"))
    // No group = regional indicator letters; group 2 = bare skin tones and hair parts.
    .filter(e => e.group !== undefined && e.group !== 2)
    .sort((a, b) => a.order - b.order)
    .map(e => {
        const entry = { e: canonical(e.emoji), n: e.label, g: e.group, v: e.version };
        const tags = (e.tags || []).filter(tag => !e.label.toLowerCase().split(/[\s:-]+/).includes(tag));
        if (tags.length) entry.k = tags.join(" ");
        const codes = shortcodes[e.hexcode];
        if (codes) entry.s = [].concat(codes).join(" ");
        if (e.skins) {
            // One variant per tone, using every-person-the-same-tone for
            // multi-person emoji such as "people holding hands".
            const tones = [];
            for (let tone = 1; tone <= 5; tone++) {
                const skin = e.skins.find(s => s.tone === tone || (Array.isArray(s.tone) && s.tone.every(t => t === tone)));
                if (skin) tones.push(canonical(skin.emoji));
            }
            if (tones.length === 5) entry.t = tones;
        }
        return entry;
    });

const emojiGroups = GROUPS.map((label, index) => (label ? { id: GROUP_IDS[index], label, group: index, count: emoji.filter(e => e.g === index).length } : null)).filter(Boolean);

// All ~1,500 single-character entities: small, and lets the inspector show
// &rarr; for characters outside the curated sets too.
const entities = {};
for (const [cp, entity] of entityFor) entities[cp.toString(16)] = entity.slice(1, -1);

// ---- Write -----------------------------------------------------------------
await mkdir(OUT_DIR, { recursive: true });

const charsJson = {
    unicode: UNICODE_VERSION,
    emojiVersion: EMOJIBASE_VERSION,
    sets,
    chars,
    emojiGroups,
    emoji,
    entities,
    blocks: blocks.map(([a, b, name]) => [a, b, name]),
    totalNamed: names.size,
};
await writeFile(join(OUT_DIR, "chars.json"), JSON.stringify(charsJson));

// names.txt: "<delta from previous code point, base 36>;<NAME>" per line, then
// the computed ranges ("CJK Ideograph" etc.) as "@start;end;label" lines.
let previous = 0;
const lines = [];
for (const [cp, name] of [...names].sort((a, b) => a[0] - b[0])) {
    lines.push(`${(cp - previous).toString(36)};${name}`);
    previous = cp;
}
for (const [start, end, label] of computedRanges) lines.push(`@${start.toString(16)};${end.toString(16)};${label}`);
await writeFile(join(OUT_DIR, "names.txt"), lines.join("\n"));

console.log(`chars.json: ${usedChars.size} characters in ${sets.length} sets, ${emoji.length} emoji in ${emojiGroups.length} groups`);
console.log(`names.txt: ${names.size} named code points, ${computedRanges.length} computed ranges`);
