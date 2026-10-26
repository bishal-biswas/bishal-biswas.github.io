---
title: "CSS Position: relative, absolute, fixed and sticky"
slug: css-position-relative-absolute-fixed-sticky
metaDescription: Learn the CSS position property with simple examples. Understand static, relative, absolute, fixed and sticky, offsets, and containing blocks.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Position
author: Bishal Biswas
publishDate: 2026-12-01
isDraft: false
category: CSS
tags:
  - CSS position
  - position absolute
  - position sticky
  - CSS layout
---

The first time I used `position: absolute`, my element flew to the top corner of the whole page. I only wanted to place a small badge on the corner of a card.

The fix was one line on the parent: `position: relative`. But I didn't know *why* that worked until I properly learned how the `position` property behaves.

In this article, I will explain the five values of `position`, `static`, `relative`, `absolute`, `fixed`, and `sticky`, with simple examples and the real situations where I use each.

## The Offset Properties

Before we look at the values, there are four properties that work together with `position`:

```css
top: 10px;
right: 10px;
bottom: 10px;
left: 10px;
```

There is also a shorthand called `inset`:

```css
inset: 0;               /* top, right, bottom, left all 0 */
inset: 10px 20px;       /* top/bottom 10px, left/right 20px */
```

These offsets do nothing on a `static` element. They only work once you change the position value.

## `position: static`

This is the default for every element. The element sits in the normal flow of the page, one after another, as described in [block vs inline elements](https://bishal-biswas.github.io/articles/html-block-vs-inline-elements).

```css
.box {
  position: static;
  top: 50px; /* ignored */
}
```

You rarely write `static` yourself, except to reset an element that was positioned somewhere else.

## `position: relative`

A relative element stays in the normal flow, but you can nudge it from where it would normally be.

```css
.nudge {
  position: relative;
  top: 10px;
  left: 20px;
}
```

The element moves 10px down and 20px right. The important part: **its original space is still reserved**. Other elements don't move to fill the gap.

```html
<p>First paragraph.</p>
<p class="nudge">I moved, but my space stayed.</p>
<p>Third paragraph.</p>
```

### The Real Reason I Use `relative`

Honestly, I almost never use `relative` to nudge things. I use it to create a **positioning reference** for absolute children. That is the next section.

## `position: absolute`

An absolute element is **removed from the normal flow**. Other elements act as if it doesn't exist. Then it is placed using `top`, `right`, `bottom`, and `left` relative to its **containing block**.

The containing block is the nearest ancestor that has a position other than `static`. If none exists, it uses the initial containing block, which is roughly the page itself.

That is exactly why my badge flew to the corner of the page.

### The Badge Example

```html
<div class="card">
  <span class="badge">New</span>
  <h3>CSS Course</h3>
  <p>Learn CSS step by step.</p>
</div>
```

```css
.card {
  position: relative; /* becomes the reference */
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  background: #72eb6c;
  border-radius: 4px;
}
```

Now the badge sits in the top right corner of the **card**, not the page. This "relative parent, absolute child" pattern is something I use constantly.

### Filling the Parent

`inset: 0` with absolute positioning stretches an element to cover its parent. I use this for image overlays:

```css
.thumbnail {
  position: relative;
}

.thumbnail .overlay {
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
}
```

## `position: fixed`

A fixed element is also removed from the flow, but it is positioned relative to the **viewport** (the browser window). It stays in the same place even when you scroll.

```css
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
```

I use `fixed` for:

- "Back to top" buttons
- Chat widgets
- Cookie banners
- Full-screen modal backgrounds

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.6);
}
```

### A `fixed` Gotcha

If any ancestor has a `transform`, `filter`, or `perspective` property, a fixed child is positioned relative to that ancestor instead of the viewport. If your fixed element suddenly scrolls with the page, check the parents for one of these properties.

## `position: sticky`

Sticky is a mix of relative and fixed. The element behaves normally until you scroll to a certain point, then it "sticks" in place.

```css
.site-header {
  position: sticky;
  top: 0;
  background: white;
}
```

The header scrolls normally until it reaches the top of the viewport, then it stays there.

You **must** set at least one offset like `top: 0`. Without it, sticky does nothing.

### Sticky Only Works Inside Its Parent

A sticky element only sticks while its parent is on screen. Once the parent scrolls away, the sticky element goes with it. This is useful for section headings:

```html
<section>
  <h2 class="sticky-heading">HTML</h2>
  <p>Lots of content...</p>
</section>
<section>
  <h2 class="sticky-heading">CSS</h2>
  <p>Lots of content...</p>
</section>
```

```css
.sticky-heading {
  position: sticky;
  top: 0;
  background: #02162b;
  color: white;
}
```

Each heading sticks while its own section is visible.

### When Sticky Doesn't Work

If sticky isn't working, I check these things:

1. Is there a `top` (or `bottom`) value?
2. Does any ancestor have `overflow: hidden`, `overflow: auto`, or `overflow: scroll`? That creates a new scroll container and can stop sticky from working the way you expect.
3. Is the parent tall enough for the element to move within?

## Quick Comparison

| Value | In normal flow? | Positioned relative to | Scrolls with page? |
|---|---|---|---|
| `static` | Yes | Not positioned | Yes |
| `relative` | Yes (space kept) | Its own normal position | Yes |
| `absolute` | No | Nearest positioned ancestor | Yes |
| `fixed` | No | Viewport | No |
| `sticky` | Yes | Scroll container, after threshold | Until it sticks |

## Positioning and `z-index`

Once elements are positioned, they can overlap. `z-index` controls which one appears on top, but it only works on positioned elements (and flex or grid items).

```css
.badge {
  position: absolute;
  z-index: 10;
}
```

`z-index` has its own tricky rules around stacking contexts, which I explain in [CSS z-index and stacking context](https://bishal-biswas.github.io/articles/css-z-index-stacking-context).

## Don't Use Position for Page Layout

When I was a beginner, I tried to build whole page layouts with `position: absolute`. It looked fine on my screen and broke on every other screen size.

For laying out columns, rows, and grids, use Flexbox or Grid instead. I cover both in my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide). Save `position` for overlays, badges, sticky headers, and small adjustments.

## Common Mistakes

### 1. Forgetting `position: relative` on the Parent

Without it, an absolute child positions itself against the page or some distant ancestor.

### 2. Sticky Without `top`

`position: sticky` needs a threshold like `top: 0`.

### 3. `overflow: hidden` Breaking Sticky

An ancestor with overflow set can stop sticky from working.

### 4. Fixed Headers Covering Content

A fixed header is removed from the flow, so the content starts underneath it. Add `padding-top` to the body, or use `sticky` instead.

### 5. Building Layouts With Absolute

Absolute elements ignore their neighbors, so layouts break when content or screen size changes.

## Conclusion

`static` is the default. `relative` keeps an element in the flow and creates a reference for absolute children. `absolute` removes an element and places it inside its nearest positioned ancestor. `fixed` pins it to the viewport. `sticky` scrolls normally and then sticks.

If you remember just one thing, make it this: **relative parent, absolute child**. That one pattern covers most of the positioning I do day to day.
