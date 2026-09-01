# bishal-biswas.github.io

Personal portfolio and blog of **Bishal Biswas** - Software Developer, Web
Developer and Blogger.

Live site: <https://bishal-biswas.github.io>

![Screenshot of bishal-biswas.github.io](./public/Screenshot_bishal-biswas.github.io.jpeg)

---

## ⚠️ Copyright and Usage Restrictions

**Copyright © 2026 Bishal Biswas. All Rights Reserved.**

This repository is public so the work can be **viewed and reviewed**. It is
**not** open source, and no licence to reuse it is granted.

**You may not** copy, republish, redistribute, modify, or use this code,
design, or content - in whole or in part - as the basis for another website,
template, or product, whether free or commercial. This applies to the source
code and the design as much as it does to the articles, images, photographs,
resume, and project descriptions.

**You may** read the source, learn from it, and quote short excerpts with
attribution and a link back to this repository.

Third-party dependencies (Astro, Tailwind CSS, Decap CMS and others) keep
their own licences and are unaffected by the above.

For permission requests, or to report misuse, contact
**bishal.biswas.4796@gmail.com**.

See [LICENSE](./LICENSE) for the full terms.

---

## Tech Stack

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) (static output) |
| Styling | Tailwind CSS v4 |
| Content | Astro content collections (Markdown + JSON) |
| CMS | [Decap CMS](https://decapcms.org) at `/admin` |
| Auth | GitHub OAuth via a Vercel proxy |
| Hosting | GitHub Pages, deployed by GitHub Actions |
| Backend | Google Sheets + Apps Script ([setup](./docs/google-sheets-backend.md)) |

## Project Structure

```text
├── .github/workflows/deploy.yml   Build + deploy to GitHub Pages
├── docs/                          Setup guides
├── google-apps-script/Code.gs     Google Sheets backend (deployed separately)
├── public/
│   ├── admin/                     Decap CMS (index.html + config.yml)
│   └── uploads/                   CMS-managed media
└── src/
    ├── components/                Astro components
    ├── content/                   Articles, portfolio, snippets, pages
    ├── data/site-data/            Site + personal data (JSON + shims)
    ├── layouts/                   Page layouts
    └── pages/                     Routes
```

Editable content lives in two places: Markdown under `src/content/`, and JSON
under `src/data/site-data/json/`. The `.js` files beside that JSON are thin
re-export shims, so pages keep importing from the same paths as before.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build locally |

### Editing content locally

`local_backend: true` is set in `public/admin/config.yml`, so the CMS can
write straight to your working tree with no GitHub round-trip:

```sh
npx decap-server        # in one terminal
npm run dev             # in another
```

Then open <http://localhost:4321/admin/index.html>.

> **Note:** Astro caches content in `node_modules/.astro/data-store.json`.
> Deleting `.astro/` alone does not clear it, so a local build can succeed
> using cached entries even when the Markdown files are missing. Verify page
> counts against `git status` before assuming a build is healthy.

## Dynamic features

The site is static, but the contact form, newsletter signup, testimonial
submissions and article view/like counters all write to a Google Sheet through
a single Apps Script Web App. Setup - creating the sheet, deploying the script,
and the EmailJS option for auto-replies - is in
[docs/google-sheets-backend.md](./docs/google-sheets-backend.md).

Configuration comes from `PUBLIC_*` env vars (see `.env.example`), set as
GitHub repository *variables* for production. With none of them set, every form
degrades to a "not connected yet" notice rather than failing.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. The Pages source must be set to
**GitHub Actions** (not "Deploy from a branch"), or GitHub also runs Jekyll,
which fails on `.astro` files and strips the `_astro/` asset directory.
`public/.nojekyll` guards against the latter.
