---
title: "CSS Typography: Fonts, Sizes and Line Height"
slug: css-typography-fonts-web
metaDescription: Learn CSS typography basics, including font-family stacks, web fonts, font-size with rem and clamp(), font-weight, line-height and readable line length.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Typography
author: Bishal Biswas
publishDate: 2026-12-15
isDraft: false
category: CSS
tags:
  - CSS typography
  - CSS fonts
  - line-height
  - web fonts
---

When I look back at my first websites, the thing that makes them look most "beginner" is not the layout or the colors. It is the text. Tiny font sizes, lines that stretched across the whole screen, and paragraphs squeezed together with no breathing room.

Most of a website is text, so good typography makes everything feel better with very little effort.

In this article, I will explain the CSS properties I use for typography: choosing fonts, loading web fonts, setting sizes, weight, line height and line length. I will also share the mistakes I made while learning.

## Choosing a Font With `font-family`

The `font-family` property sets the typeface. I always give it a **list** of fonts, called a font stack.

```css
body {
  font-family: "Inter", "Segoe UI", Roboto, Arial, sans-serif;
}
```

The browser tries each font from left to right and uses the first one that is available. The last item should always be a **generic family**, so there is always something to fall back to.

The main generic families are:

- `serif`: fonts with small strokes at the ends of letters
- `sans-serif`: fonts without those strokes
- `monospace`: every character has the same width, great for code
- `system-ui`: the operating system's default interface font

Font names with spaces need quotes, like `"Segoe UI"`. Generic family names must not be quoted.

### The System Font Stack

If I want fast, native-looking text with no downloads, I use the system font:

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```

This loads instantly because the fonts are already on the user's device.

## Loading Web Fonts

When I want a specific font that users may not have installed, I load it as a web font.

### Option 1: A Font Service

Services like Google Fonts give you a `<link>` to put in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

If you are not sure where the `<head>` is or what goes inside it, I explained it in [HTML document structure: doctype, head and body](https://bishal-biswas.github.io/articles/html-document-structure-doctype-head-body).

### Option 2: Self-Hosting With `@font-face`

I can also host the font files myself:

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Inter", system-ui, sans-serif;
}
```

A few notes:

- **WOFF2** is the format to use today. Every modern browser supports it and it is well compressed.
- `font-weight: 100 900` tells the browser this is a **variable font** that covers every weight in that range from one file.
- `font-display: swap` shows the fallback font immediately and swaps in the web font when it loads, so the text is never invisible.

I try to load only the weights I really use. Every extra file makes the page slower.

## Setting Font Size

### Use `rem` for Font Sizes

I set font sizes in `rem` rather than `px`.

```css
html {
  font-size: 100%; /* usually 16px, respects the user's browser setting */
}

body {
  font-size: 1rem;      /* 16px by default */
}

h1 {
  font-size: 2.5rem;    /* 40px by default */
}

small {
  font-size: 0.875rem;  /* 14px by default */
}
```

`rem` is relative to the root font size. If a user increases the default font size in their browser settings, everything scales with it. Hard-coded `px` sizes on the root can override that preference, which hurts people who need larger text.

For a full comparison of `px`, `em`, `rem` and viewport units, see [CSS units explained](https://bishal-biswas.github.io/articles/css-units-px-em-rem-vh-vw).

### Fluid Font Sizes With `clamp()`

For big headings, I like sizes that grow with the screen but stay within limits:

```css
h1 {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
}
```

`clamp(minimum, preferred, maximum)` means:

- never smaller than `2rem`
- try to be `1.5rem + 2.5vw`, which grows with the viewport width
- never bigger than `3.5rem`

I keep a `rem` part in the middle value so the size still responds when the user zooms. Using only `vw` would ignore their zoom and text-size settings.

### Body Text Size

For body text on most sites, I start at `1rem` (16px) and often go to `1.125rem` (18px) for long articles. Anything below 16px for main reading text usually feels too small on phones.

## Font Weight and Style

```css
p {
  font-weight: 400; /* normal */
}

strong {
  font-weight: 700; /* bold */
}

.subtitle {
  font-weight: 300; /* light */
  font-style: italic;
}
```

Weights go from `100` (thin) to `900` (black). `normal` is `400` and `bold` is `700`.

One thing that confused me: if I ask for `font-weight: 600` but I only loaded the 400 and 700 files, the browser picks the closest available weight, or sometimes creates a "fake bold". Load the weights you use, or use a variable font.

## Line Height

`line-height` controls the space between lines of text. This is the single setting that improved my text the most.

```css
body {
  line-height: 1.6;
}

h1,
h2,
h3 {
  line-height: 1.2;
}
```

I always use a **unitless** number. `1.6` means "1.6 times the element's own font size". Children inherit the number and calculate it with their own font size, which is exactly what I want.

If I write `line-height: 24px` or `1.6em` on the `body` instead, children inherit a fixed computed value. A large heading inside would then get cramped lines.

My usual values:

- Body text: `1.5` to `1.7`
- Headings: `1.1` to `1.3`

## Line Length

Long lines are tiring to read, because your eyes have to travel far to find the next line. A comfortable length is roughly 60 to 75 characters.

The `ch` unit is perfect for this. `1ch` is about the width of the "0" character in the current font.

```css
.article-content {
  max-width: 68ch;
  margin-inline: auto;
}
```

## Other Useful Typography Properties

```css
h1 {
  letter-spacing: -0.02em; /* slightly tighter for big headings */
  text-wrap: balance;      /* balances lines in short headings */
}

p {
  text-wrap: pretty;       /* avoids a single short word on the last line */
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}
```

`text-wrap: balance` is supported in all modern browsers. `text-wrap: pretty` is supported in most, and browsers that do not support it simply ignore it, so it is safe to add.

## Putting It Together

Here is a simple base typography setup I often start with:

```css
:root {
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", Consolas, monospace;
}

body {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
  color: #1f2328;
}

h1, h2, h3 {
  line-height: 1.2;
  text-wrap: balance;
}

h1 { font-size: clamp(2rem, 1.5rem + 2.5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 1.25rem + 1vw, 2rem); }

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.prose {
  max-width: 68ch;
}
```

I store the font stacks in [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties) so I can change them in one place. And remember that CSS only changes how headings look. Choosing the right heading level is an HTML job, which I covered in [HTML headings, paragraphs and text formatting](https://bishal-biswas.github.io/articles/html-headings-paragraphs-text-formatting).

## Common Mistakes

### 1. No Generic Fallback

```css
body {
  font-family: "My Fancy Font"; /* if it fails, you get the browser default */
}
```

Always end with `sans-serif`, `serif`, `monospace` or `system-ui`.

### 2. Setting the Root Font Size in `px`

`html { font-size: 16px; }` can override the user's preferred text size. Use `100%` or leave it alone.

### 3. Line Height With Units

A unitless `line-height` inherits better than `px` or `em`. Use numbers like `1.5`.

### 4. Loading Too Many Font Files

Five weights and three families can add hundreds of kilobytes. Pick one or two families and only the weights you need.

### 5. Choosing Heading Tags for Their Size

Do not pick `<h4>` because it "looks the right size". Choose the correct heading level, then style it with CSS.

## Conclusion

Good typography comes from a few simple decisions: a sensible font stack, sizes in `rem`, a unitless `line-height` around `1.6`, and a comfortable line length around `65ch`.

Add web fonts carefully, use `font-display: swap`, and let headings scale with `clamp()`. With just those basics, your text will look calmer, more readable and more professional on every screen.
