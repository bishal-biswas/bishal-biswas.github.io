---
title: "CSS Units Explained: px, em, rem, %, vh and vw"
slug: css-units-px-em-rem-vh-vw
metaDescription: Learn the most useful CSS units with simple examples, including px, em, rem, percent, vh, vw and dvh, and which unit I use for fonts, spacing and layout.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Units
author: Bishal Biswas
publishDate: 2026-11-25
isDraft: false
category: CSS
tags:
  - CSS units
  - rem vs em
  - viewport units
  - Responsive CSS
---

When I started writing CSS, I used `px` for everything. Font sizes, padding, widths, all in pixels. It worked, until I zoomed my browser text size up and parts of my layout stopped making sense, or I opened the page on a phone and things overflowed.

CSS has many units, and each one is good at a different job. In this article, I will explain the units I actually use, `px`, `em`, `rem`, `%`, `vh`, and `vw`, plus a few newer ones, and share the simple rules I follow when picking one.

## Absolute vs Relative Units

CSS units fall into two groups:

- **Absolute units** have a fixed size. The main one on the web is `px`.
- **Relative units** depend on something else, such as the font size, the parent element, or the screen size.

Relative units are what make a design flexible.

## `px`: Pixels

`px` is the simplest unit. `16px` is always 16 CSS pixels.

```css
.box {
  border: 1px solid #ccc;
  border-radius: 8px;
}
```

A CSS pixel is not always one physical screen pixel. On high-density screens, one CSS pixel may be two or three device pixels. The browser handles that for you.

**Where I use `px`:** borders, small shadows, and border radius, things that should stay crisp and not scale with text.

## `em`: Relative to the Current Font Size

`1em` equals the font size of the element itself. If the element's font size is 20px, then `1em` is 20px.

```css
.button {
  font-size: 20px;
  padding: 0.5em 1em; /* 10px 20px */
}
```

This is great for components. If I make the button's font bigger, the padding grows with it automatically.

### The `em` Compounding Problem

When `em` is used for `font-size`, it is relative to the **parent's** font size. Nested elements multiply:

```css
ul {
  font-size: 1.2em;
}
```

```html
<ul>
  <li>Level 1
    <ul>
      <li>Level 2
        <ul>
          <li>Level 3</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

Level 1 is 1.2× the body size, level 2 is 1.44×, and level 3 is about 1.73×. The text keeps growing. That is why I rarely use `em` for font sizes.

## `rem`: Relative to the Root Font Size

`rem` means "root em." It is always relative to the font size of the `<html>` element, no matter how deeply nested the element is.

Most browsers use a default root font size of 16px, so:

```text
1rem    = 16px
1.5rem  = 24px
0.875rem = 14px
```

```css
h1 {
  font-size: 2.5rem; /* 40px by default */
}

p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
```

There is no compounding problem, so `rem` is predictable.

### Why `rem` Is Better for Accessibility

Some users increase the default font size in their browser settings. If your font sizes use `rem`, your whole page respects that choice. If you hard-code `px`, those users may be stuck with text that is too small.

For this reason, I avoid setting `html { font-size: 62.5%; }` tricks or fixed pixel root sizes. I let the browser default stand.

**Where I use `rem`:** font sizes, most spacing (margin, padding, `gap`), and max-widths for text.

## `%`: Percent

A percentage is relative to the **parent**. For `width`, it is the parent's content width.

```css
.container {
  width: 800px;
}

.half {
  width: 50%; /* 400px */
}
```

Be careful, because percent means different things for different properties:

- `width: 50%` is half of the parent's width.
- `height: 50%` only works if the parent has a defined height.
- `padding` and `margin` percentages are based on the parent's **width**, even for top and bottom.
- `font-size: 120%` is relative to the parent's font size, just like `1.2em`.

**Where I use `%`:** fluid widths like `width: 100%` and `max-width: 100%` on images.

```css
img {
  max-width: 100%;
  height: auto;
}
```

## `vw` and `vh`: Viewport Units

The viewport is the visible area of the browser window.

- `1vw` = 1% of the viewport width.
- `1vh` = 1% of the viewport height.

```css
.hero {
  min-height: 100vh; /* fill the screen height */
}

.banner-title {
  font-size: 5vw; /* scales with screen width */
}
```

### The Mobile `100vh` Problem

On phones, the browser's address bar appears and disappears as you scroll. For years, `100vh` was based on the largest size, so a "full screen" section was taller than the visible area.

Modern CSS fixes this with new viewport units, now supported in all major browsers:

- `svh`: small viewport height (address bar visible).
- `lvh`: large viewport height (address bar hidden).
- `dvh`: dynamic viewport height, which updates as the bar moves.

```css
.hero {
  min-height: 100vh;   /* fallback for very old browsers */
  min-height: 100dvh;  /* modern browsers */
}
```

I usually use `svh` or `dvh` for full-height sections now.

**A warning about `vw`:** `100vw` includes the vertical scrollbar width on desktop, so `width: 100vw` can cause a small horizontal scroll. `width: 100%` is usually safer.

## Mixing Units With `clamp()`

My favorite trick for responsive font sizes combines units with `clamp(min, preferred, max)`:

```css
h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}
```

The heading grows with the screen width, but never smaller than `1.75rem` or larger than `3rem`. Because the minimum and maximum use `rem`, it still respects user font settings.

## Other Units Worth Knowing

- `ch`: roughly the width of the "0" character. Great for readable text width: `max-width: 65ch;`.
- `fr`: a fraction of free space, used in CSS Grid. See my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).
- Unitless `line-height`: `line-height: 1.6;` scales with the font size and is the recommended way to set line height.

## My Quick Cheat Sheet

| Use case | Unit I reach for |
|---|---|
| Font sizes | `rem` (or `clamp()` with `rem`) |
| Spacing (margin, padding, gap) | `rem` |
| Padding that scales with a component's text | `em` |
| Borders and border radius | `px` |
| Fluid widths | `%` |
| Full-screen sections | `dvh` / `svh` |
| Readable text width | `ch` |
| Grid columns | `fr` |

## Common Mistakes

### 1. Using `em` for Nested Font Sizes

Nested `em` font sizes compound. Use `rem` for font sizes unless you specifically want scaling.

### 2. Expecting `height: 50%` to Work Everywhere

Percent heights need a parent with a known height. Otherwise, they do nothing.

### 3. Using `width: 100vw`

It can cause a horizontal scrollbar. Use `100%` for full-width blocks.

### 4. `100vh` on Mobile

Use `dvh` or `svh` so content is not hidden behind the browser UI.

### 5. Setting Everything in `px`

Fixed pixel font sizes ignore the user's browser font preference. `rem` respects it.

## Conclusion

Every CSS unit is relative to something. `px` is fixed, `em` follows the element's font size, `rem` follows the root font size, `%` follows the parent, and viewport units follow the screen.

My everyday setup is simple: `rem` for text and spacing, `px` for borders, `%` for fluid widths, and `dvh` for full-height sections. Combined with the [CSS box model](https://bishal-biswas.github.io/articles/css-box-model-explained) and [media queries for responsive design](https://bishal-biswas.github.io/articles/css-media-queries-responsive-design), these units are the foundation of layouts that work on every screen.
