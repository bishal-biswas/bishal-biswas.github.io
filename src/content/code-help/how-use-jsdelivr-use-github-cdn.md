---
title: How to Use jsDelivr to Use GitHub as a CDN
slug: how-use-jsdelivr-use-github-cdn
metaDescription: Learn how to use jsDelivr with GitHub as a free CDN to host and
  deliver JavaScript, CSS, images, JSON, and other static files with simple URL
  examples.
publishDate: 2026-09-13
isDraft: false
tags:
  - JsDelivr
  - Github
  - CDN
---
You can use **GitHub as a free file storage source** and **jsDelivr as a CDN** to serve your files quickly from around the world.

This is useful for hosting:

* JavaScript files
* CSS files
* Images
* Fonts
* JSON files
* Other static files

You don't need to create a separate server for these files.

- - -

# How It Works

The basic flow is:

```text
Your GitHub Repository
        ↓
     jsDelivr
        ↓
      CDN
        ↓
      Users
```

For example, suppose you have:

```text
GitHub Username: bishal-biswas
Repository: my-cdn
File: assets/logo.png
```

You can access the file through jsDelivr using:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/assets/logo.png
```

- - -

# Basic URL Format

The general format is:

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPOSITORY@VERSION/FILE_PATH
```

For example:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@main/assets/logo.png
```

Where:

| Part               | Meaning         |
| ------------------ | --------------- |
| `cdn.jsdelivr.net` | jsDelivr CDN    |
| `gh`               | GitHub          |
| `bishal-biswas`    | GitHub username |
| `my-cdn`           | Repository name |
| `main`             | Branch/version  |
| `assets/logo.png`  | File path       |

- - -

# Step 1: Create a GitHub Repository

Create a repository on GitHub.

For example:

```text
my-cdn
```

Your repository could look like this:

```text
my-cdn/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   ├── logo.png
│   └── banner.jpg
│
└── data/
    └── products.json
```

- - -

# Step 2: Upload Your Files

Upload your files to the repository.

For example:

```text
my-cdn/
└── js/
    └── script.js
```

If your GitHub repository is:

```text
https://github.com/bishal-biswas/my-cdn
```

and the file is:

```text
js/script.js
```

the jsDelivr URL can be:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/js/script.js
```

- - -

# Step 3: Use the File

## JavaScript

Instead of:

```html
<script src="https://github.com/bishal-biswas/my-cdn/blob/main/js/script.js"></script>
```

use:

```html
<script src="https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/js/script.js"></script>
```

- - -

## CSS

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/css/style.css"
>
```

- - -

## Image

```html
<img
  src="https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/images/logo.png"
  alt="Logo"
>
```

- - -

## JSON

You can also load JSON files:

```javascript
fetch("https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn/data/products.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```

- - -

# Using a Specific Branch

You can specify a branch after `@`.

For example:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@main/js/script.js
```

For a `development` branch:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@development/js/script.js
```

The format is:

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPOSITORY@BRANCH/FILE
```

- - -

# Using Git Tags or Releases

For production projects, it is better to use a **specific version** instead of depending on a branch that may change.

For example, create a Git tag:

```text
v1.0.0
```

Then use:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@v1.0.0/js/script.js
```

Later, you can release:

```text
v1.1.0
```

and use:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@v1.1.0/js/script.js
```

### Why use versions?

Imagine your website currently uses:

```text
@v1.0.0
```

You can update the repository and release:

```text
v1.1.0
```

without unexpectedly changing the file used by your existing website.

- - -

# Branch vs Version

| URL            | Use                                     |
| -------------- | --------------------------------------- |
| No version     | Quick testing / latest version          |
| `@main`        | Development or frequently updated files |
| `@v1.0.0`      | Production / fixed version              |
| `@commit-hash` | Exact immutable version                 |

For production, prefer a **tag/version or commit hash**.

- - -

# Example Project

Suppose your GitHub repository is:

```text
https://github.com/myusername/my-assets
```

with:

```text
my-assets/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── images/
    └── logo.png
```

You can use:

### CSS

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/myusername/my-assets/css/style.css"
>
```

### JavaScript

```html
<script src="https://cdn.jsdelivr.net/gh/myusername/my-assets/js/app.js"></script>
```

### Image

```html
<img
  src="https://cdn.jsdelivr.net/gh/myusername/my-assets/images/logo.png"
  alt="Logo"
>
```

- - -

# Why Use jsDelivr?

Without a CDN, users may download files directly from GitHub.

With jsDelivr:

```text
GitHub
   ↓
jsDelivr CDN
   ↓
User
```

jsDelivr distributes and caches files through its CDN infrastructure, helping deliver static files efficiently. jsDelivr supports GitHub repositories as well as npm packages.

### Benefits

* Free for open-source/public GitHub projects
* No separate CDN server required
* Global CDN
* Simple URLs
* Works with JS, CSS, images and other static files
* Supports versions, branches and commits
* Useful for static websites and open-source projects

- - -

# Important: GitHub Repository Must Be Public

For the normal GitHub CDN URL:

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPOSITORY/FILE
```

your repository should be publicly accessible.

Do **not** use this method for:

* Passwords
* API keys
* Private configuration
* Database credentials
* Secrets
* Private user data

A CDN is for files you are comfortable making publicly accessible.

- - -

# Example: Create Your Own Image CDN

You could create a repository specifically for images:

```text
my-image-cdn/
│
├── logos/
│   ├── logo.png
│   └── logo-dark.png
│
├── products/
│   ├── product-1.webp
│   ├── product-2.webp
│   └── product-3.webp
│
└── banners/
    ├── hero.webp
    └── banner.jpg
```

Then:

```html
<img
  src="https://cdn.jsdelivr.net/gh/myusername/my-image-cdn/products/product-1.webp"
  alt="Product"
>
```

You can use this in your:

* Astro websites
* React websites
* HTML websites
* WordPress sites
* GitHub Pages sites
* Documentation websites

- - -

# Useful URL Patterns

### Latest/default branch

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPO/FILE
```

### Specific branch

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/FILE
```

### Specific release/tag

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPO@v1.0.0/FILE
```

### Specific commit

```text
https://cdn.jsdelivr.net/gh/USERNAME/REPO@COMMIT_HASH/FILE
```

- - -

# One-Line Formula to Remember

```text
https://cdn.jsdelivr.net/gh/GITHUB_USERNAME/REPOSITORY@VERSION/FILE_PATH
```

For example:

```text
https://cdn.jsdelivr.net/gh/bishal-biswas/my-cdn@v1.0.0/images/logo.png
```

That's it.

**GitHub stores the file → jsDelivr delivers the file through its CDN.**

> **Tip:** For production websites, use a specific version/tag instead of `main` so that your website doesn't unexpectedly start using a changed file.
