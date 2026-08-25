# Site data API

Static site data is grouped by purpose so pages can import only what they use:

- `profile.js`: identity, biography, about section, and homepage statistics
- `navigation.js`: asset paths, navbar menus, and footer links
- `skills.js`: skills statistics, services, experience, education, certificates, and technologies
- `content.js`: portfolio works, blog categories, products, and legacy blog metadata
- `index.js`: aggregate named exports for code that needs data from multiple domains

The original `../sitedata.js` export remains as a compatibility source while the project migrates to these named APIs. Keep new consumers on the purpose-based modules.