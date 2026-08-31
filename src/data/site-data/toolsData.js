// Registry of all free developer tools under /tools.
// Adding an entry here lists the tool on /tools - the page itself lives at
// src/pages/tools/<slug>.astro
export const toolsData = [
    // JSON tools
    { slug: "json-formatter", name: "JSON Formatter", icon: "fa-code", category: "JSON Tools", blurb: "Beautify and pretty-print JSON with custom indentation." },
    { slug: "json-validator", name: "JSON Validator", icon: "fa-circle-check", category: "JSON Tools", blurb: "Validate JSON syntax and pinpoint errors with line numbers." },
    { slug: "json-minifier", name: "JSON Minifier", icon: "fa-minimize", category: "JSON Tools", blurb: "Compress JSON by stripping whitespace to shrink payloads." },
    { slug: "json-to-typescript", name: "JSON to TypeScript", icon: "fa-file-code", category: "JSON Tools", blurb: "Generate TypeScript interfaces from any JSON object." },
    { slug: "json-to-csharp", name: "JSON to C#", icon: "fa-file-code", category: "JSON Tools", blurb: "Convert JSON into C# classes with properties and attributes." },
    { slug: "json-to-csv", name: "JSON to CSV", icon: "fa-table", category: "JSON Tools", blurb: "Turn arrays of JSON objects into downloadable CSV files." },
    { slug: "json-yaml-converter", name: "JSON ↔ YAML", icon: "fa-right-left", category: "JSON Tools", blurb: "Convert between JSON and YAML in both directions." },

    // Encoders, decoders & security
    { slug: "jwt-decoder", name: "JWT Decoder", icon: "fa-key", category: "Encoders & Security", blurb: "Decode JWT headers and payloads, check expiry - all offline." },
    { slug: "base64-encoder-decoder", name: "Base64 Encoder / Decoder", icon: "fa-shuffle", category: "Encoders & Security", blurb: "Encode text to Base64 or decode it back, UTF-8 safe." },
    { slug: "url-encoder-decoder", name: "URL Encoder / Decoder", icon: "fa-link", category: "Encoders & Security", blurb: "Percent-encode or decode URLs and query strings." },
    { slug: "hash-generator", name: "Hash Generator", icon: "fa-fingerprint", category: "Encoders & Security", blurb: "Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes." },
    { slug: "html-entity-encoder", name: "HTML Entity Encoder", icon: "fa-shield-halved", category: "Encoders & Security", blurb: "Escape and unescape HTML entities to prevent XSS." },

    // Converters
    { slug: "webp-converter", name: "WebP Converter", icon: "fa-image", category: "Converters", blurb: "Convert PNG and JPG images to WebP right in your browser." },
    { slug: "unix-timestamp-converter", name: "Unix Timestamp Converter", icon: "fa-clock", category: "Converters", blurb: "Convert Unix epoch timestamps to human-readable dates and back." },
    { slug: "color-converter", name: "HEX / RGB / HSL Converter", icon: "fa-palette", category: "Converters", blurb: "Convert colors between HEX, RGB and HSL with a live preview." },
    { slug: "curl-to-fetch", name: "cURL to JavaScript Fetch", icon: "fa-terminal", category: "Converters", blurb: "Translate cURL commands into modern fetch() code." },

    // Generators
    { slug: "uuid-generator", name: "UUID Generator", icon: "fa-dice", category: "Generators", blurb: "Generate cryptographically random UUID v4 identifiers in bulk." },
    { slug: "cron-expression-generator", name: "Cron Expression Generator", icon: "fa-calendar-days", category: "Generators", blurb: "Build cron schedules visually with a plain-English preview." },

    // Productivity
    { slug: "seo-article-writer", name: "SEO Article Writer", icon: "fa-pen-nib", category: "Productivity", blurb: "Write articles in a block editor with Yoast-style SEO analysis." },
    { slug: "notepad", name: "Notepad", icon: "fa-note-sticky", category: "Productivity", blurb: "A distraction-free online notepad that autosaves as you type." },
    { slug: "whiteboard", name: "Whiteboard", icon: "fa-chalkboard", category: "Productivity", blurb: "Sketch, draw shapes and jot ideas on a free online whiteboard." },

    // Text & code
    { slug: "regex-tester", name: "Regex Tester", icon: "fa-magnifying-glass", category: "Text & Code", blurb: "Test regular expressions with live match highlighting." },
    { slug: "text-diff-checker", name: "Text Diff Checker", icon: "fa-code-compare", category: "Text & Code", blurb: "Compare two texts line by line and see what changed." },
    { slug: "sql-formatter", name: "SQL Formatter", icon: "fa-database", category: "Text & Code", blurb: "Format and beautify SQL queries for readability." },
    { slug: "html-preview", name: "HTML Preview", icon: "fa-eye", category: "Text & Code", blurb: "Write HTML and see it rendered live in a sandboxed preview." },
];

export const toolCategories = [...new Set(toolsData.map(t => t.category))];
