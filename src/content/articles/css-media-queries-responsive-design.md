---
title: "CSS Media Queries and Responsive Design for Beginners"
slug: css-media-queries-responsive-design
metaDescription: Learn CSS media queries and responsive design with simple examples, including the viewport meta tag, mobile-first breakpoints, range syntax and dark mode.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=Media+Queries
author: Bishal Biswas
publishDate: 2026-12-05
isDraft: false
category: CSS
tags:
  - CSS media queries
  - Responsive design
  - Mobile-first CSS
  - Breakpoints
---

The first website I built looked great on my laptop. Then I opened it on my phone. The text was tiny, the sidebar squeezed the content into a narrow strip, and I had to scroll sideways to read anything.

That was my introduction to **responsive design**: building one page that adapts to any screen size. The main tool for this in CSS is the **media query**.

In this article, I will explain how media queries work, the mobile-first approach I use, how to pick breakpoints, and a few useful queries beyond screen width.

## Step Zero: The Viewport Meta Tag

Before any media query will work properly on phones, your page needs this line in the `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without it, mobile browsers pretend the screen is about 980px wide and shrink the whole page down. Your media queries for small screens will never trigger.

I explain this and other important head tags in [HTML meta tags every beginner should know](https://bishal-biswas.github.io/articles/html-meta-tags-seo-basics).

## What Is a Media Query?

A media query applies CSS only when a condition is true. The most common condition is the width of the viewport.

```css
@media (min-width: 768px) {
  body {
    font-size: 1.125rem;
  }
}
```

This means: "When the viewport is at least 768px wide, use this font size."

The basic structure is:

```css
@media (condition) {
  /* CSS rules that only apply when the condition is true */
}
```

## `min-width` vs `max-width`

These are the two conditions you will use most.

```css
/* Applies at 768px and wider */
@media (min-width: 768px) { ... }

/* Applies at 767px and narrower */
@media (max-width: 767px) { ... }
```

### The Modern Range Syntax

All current browsers also support a newer, easier-to-read range syntax:

```css
@media (width >= 768px) { ... }

@media (width < 768px) { ... }

@media (600px <= width <= 900px) { ... }
```

I find this much clearer, especially for ranges. Both styles work, so use whichever feels more natural.

## Mobile-First: The Approach I Use

There are two ways to write responsive CSS:

- **Desktop-first**: write styles for large screens, then use `max-width` queries to fix smaller screens.
- **Mobile-first**: write styles for small screens, then use `min-width` queries to add layout for larger screens.

I use mobile-first. The base styles are simple (usually a single column), and I only add complexity as space increases.

```css
/* Base: phones, single column */
.cards {
  display: grid;
  gap: 16px;
}

/* Tablets: two columns */
@media (min-width: 640px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktops: three columns */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Phones download and apply the simplest CSS, and the layout grows naturally.

## Choosing Breakpoints

A **breakpoint** is the width where your layout changes. Beginners often ask me which exact numbers to use.

Common starting points are:

| Name | Width |
|---|---|
| Small (large phones) | 640px |
| Medium (tablets) | 768px |
| Large (laptops) | 1024px |
| Extra large (desktops) | 1280px |

But my real advice is: **let the content decide**. Open your page, slowly drag the browser window narrower, and add a breakpoint wherever the design starts to look broken. That works better than guessing device sizes, because there are thousands of different devices.

### Testing in DevTools

Every browser has a device mode. In Chrome or Edge, press F12, then click the phone and tablet icon (or press Ctrl+Shift+M). You can pick devices or drag to any width.

## A Practical Example: Responsive Navigation

```html
<header class="site-header">
  <a href="/" class="logo">Bishal</a>
  <nav>
    <ul class="nav-list">
      <li><a href="/">Home</a></li>
      <li><a href="/articles">Articles</a></li>
      <li><a href="/tools">Tools</a></li>
    </ul>
  </nav>
</header>
```

```css
/* Mobile: stacked */
.site-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Larger screens: logo left, links right */
@media (min-width: 768px) {
  .site-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
```

On phones, the logo sits above the links. On wider screens, they share one row. If Flexbox is new to you, see my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).

## Responsive Without Media Queries

Modern CSS can handle a lot of responsiveness on its own. These patterns reduce how many media queries I need:

```css
/* Images never overflow their container */
img {
  max-width: 100%;
  height: auto;
}

/* Grid that fits as many 250px+ columns as possible */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* Font size that scales smoothly between limits */
h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}
```

The `clamp()` example uses `rem` and `vw` units, which I explain in [CSS units explained](https://bishal-biswas.github.io/articles/css-units-px-em-rem-vh-vw).

## Container Queries

Media queries look at the **viewport**. Sometimes, you want a component to respond to the size of its **container** instead. A card in a narrow sidebar should look different from the same card in a wide main area, even on the same screen.

Container queries, supported in all modern browsers, solve this:

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 16px;
  }
}
```

As a beginner, start with media queries. Container queries are the next step when you build reusable components.

## Media Queries Beyond Width

Media queries can check more than size.

### Dark Mode

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #02162b;
    --text: #e6edf3;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

This uses [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties) so the colors only change in one place.

### Reduced Motion

Some users turn on "reduce motion" in their system settings because animation can make them feel unwell. Respect it:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Hover Capability

Touch screens don't have true hover. You can apply hover effects only where they make sense:

```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}
```

### Print

```css
@media print {
  nav,
  footer {
    display: none;
  }
}
```

## Common Mistakes

### 1. Forgetting the Viewport Meta Tag

Without it, your mobile media queries won't trigger on real phones.

### 2. Overlapping Breakpoints

`max-width: 768px` and `min-width: 768px` both match at exactly 768px. Use `767px` for one of them, or use the range syntax with `<` and `>=`.

### 3. Media Queries Before Base Styles

Rules later in the file win when specificity is equal. Put your media queries **after** the base styles they override.

### 4. Designing for Specific Devices

Devices change every year. Break where your content breaks, not where a particular phone ends.

### 5. Fixed Widths Everywhere

`width: 1200px` will overflow on a phone. Prefer `max-width` with percentages.

## Conclusion

Responsive design starts with the viewport meta tag, uses mobile-first base styles, and adds `min-width` media queries as the screen grows. Flexible units, `auto-fit` grids, and `clamp()` handle a lot of the work, so you need fewer breakpoints.

My best tip is to keep your browser's device mode open while you build. Checking a narrow screen early is much easier than fixing a finished desktop design later.
