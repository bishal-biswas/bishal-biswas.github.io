# Site data API

Static site data is grouped by purpose so pages can import only what they use:

- `profile.js`: identity, biography, about section, and homepage statistics
- `navigation.js`: asset paths, navbar menus, and footer links
- `skills.js`: skills statistics, services, experience, education, certificates, and technologies
- `content.js`: portfolio works, article categories, products, and legacy article metadata
- `pageData.js`: per-page hero copy (title, small text, heading text)
- `index.js`: aggregate named exports for code that needs data from multiple domains

Keep new consumers on the purpose-based modules, or import from `index.js` when a page needs data from several of them.