---
title: How to Run HTML Files Locally Without VS Code
slug: run-html-files-locally-without-vscode
metaDescription: "- Learn how to run HTML, CSS, and JavaScript files locally
  without VS Code using Python's HTTP server or Node.js Live Server."
publishDate: 2026-10-22
isDraft: false
tags:
  - LocalHost
  - Live Server
---
# How to Run HTML Files Locally Without VS Code

If you want to test HTML, CSS, and JavaScript files locally, you don't necessarily need VS Code or its Live Server extension.

## Using Python

If Python is installed on your computer, open Command Prompt in your project folder and run:

```bash
python -m http.server 5500
```

Then open this URL in your browser:

```text
http://localhost:5500
```

Your project can have a structure like:

```text
my-website/
├── index.html
├── style.css
└── script.js
```

Press `Ctrl + C` in the Command Prompt to stop the server.

## Using Node.js

If you have Node.js installed, you can use:

```bash
npx live-server
```

This is especially useful because it can automatically reload the browser when you save changes to your files.

## Conclusion

VS Code is convenient, but it is not required to run a local website. Python's built-in HTTP server is great for a simple local server, while `npx live-server` is a good choice when you want automatic browser refreshing.
