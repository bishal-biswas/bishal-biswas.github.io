---
title: "CSS z-index and Stacking Context Explained"
slug: css-z-index-stacking-context
metaDescription: Learn how CSS z-index really works, why z-index 9999 sometimes does nothing, what creates a stacking context, and how to fix common layering bugs.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+z-index
author: Bishal Biswas
publishDate: 2026-12-17
isDraft: false
category: CSS
tags:
  - CSS z-index
  - stacking context
  - CSS layering
  - CSS position
---

I still remember the day I wrote `z-index: 9999` on a dropdown menu, refreshed the page, and it was still hiding behind a card. So I tried `z-index: 999999`. Still behind.

That was the day I learned that `z-index` is not a simple "who is on top" number for the whole page. It works inside something called a **stacking context**, and once I understood that, those bugs became easy to fix.

In this article, I will explain what `z-index` does, when it works, what a stacking context is, and how I debug layering problems.

## What Is `z-index`?

A webpage is not completely flat. Elements can overlap, and the browser has to decide which one is painted on top. The `z-index` property controls the order on the z-axis, which you can imagine as pointing out of the screen towards you.

```css
.back {
  position: relative;
  z-index: 1;
}

.front {
  position: relative;
  z-index: 2;
}
```

A higher `z-index` is painted in front of a lower one, as long as they are in the **same stacking context**. Remember that condition. The whole article is really about it.

## When Does `z-index` Work?

This was my first surprise. `z-index` has no effect on a normal, non-positioned block element.

```css
.box {
  z-index: 10; /* Does nothing: the element is position: static */
}
```

`z-index` applies to:

- **Positioned elements**: `position` set to `relative`, `absolute`, `fixed` or `sticky`.
- **Flex items** and **grid items**, even if they are not positioned.

```css
.box {
  position: relative;
  z-index: 10; /* Now it works */
}
```

If the `position` values are new to you, read [CSS position: relative, absolute, fixed and sticky](https://bishal-biswas.github.io/articles/css-position-relative-absolute-fixed-sticky) first, because `z-index` and `position` almost always go together.

And for flex and grid children, see my [Flexbox and Grid guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).

## The Default Stacking Order

Without any `z-index`, the browser still follows rules. Inside one stacking context, it paints roughly in this order, from back to front:

1. The background and borders of the element that forms the context
2. Children with a **negative** `z-index`
3. Normal, non-positioned block elements
4. Floated elements
5. Inline content, like text
6. Positioned elements with `z-index: auto` or `0`
7. Children with a **positive** `z-index`

And when two elements are at the same level, the one that comes **later in the HTML** is painted on top.

```html
<div class="card">First</div>
<div class="card">Second</div>
```

```css
.card {
  position: relative;
  margin-top: -20px;
}
```

Here, "Second" overlaps "First", because it comes later in the source.

## What Is a Stacking Context?

A stacking context is like a **sealed group** of layers. Everything inside it is stacked together, and then the whole group is placed into its parent context as a single unit.

Here is the analogy that made it click for me. Imagine two folders lying on a desk. Folder A is on top of folder B. Inside folder B there is a page marked "z-index: 9999". No matter how big that number is, the page cannot come out above folder A. It is stuck inside folder B.

That is exactly what happened with my dropdown.

```html
<header class="header">
  <nav class="dropdown">Menu</nav>
</header>

<main class="content">
  <div class="card">Card</div>
</main>
```

```css
.header {
  position: relative;
  z-index: 1;
}

.dropdown {
  position: absolute;
  z-index: 9999;
}

.content {
  position: relative;
  z-index: 2;
}
```

`.header` and `.content` both create stacking contexts. `.content` has `z-index: 2` and `.header` has `1`, so the entire content area is above the entire header, including the dropdown. The `9999` only competes with other elements **inside** `.header`.

The fix is to change the order of the parents, not the child:

```css
.header {
  position: relative;
  z-index: 3; /* higher than .content */
}
```

## What Creates a Stacking Context?

This is the list that explains most "mystery" bugs. A new stacking context is created by:

- The root element (`<html>`)
- An element with `position: relative` or `absolute` **and** a `z-index` other than `auto`
- An element with `position: fixed` or `position: sticky` (always)
- A flex or grid item with a `z-index` other than `auto`
- `opacity` less than `1`
- `transform`, `filter`, `perspective`, `clip-path` or `mask` with a value other than `none`
- `mix-blend-mode` other than `normal`
- `isolation: isolate`
- `will-change` set to one of the properties above
- `contain: layout` or `contain: paint`

The sneaky ones are `opacity`, `transform` and `filter`. I once added a fade-in animation with `opacity` to a section, and suddenly a tooltip inside it could no longer appear above the next section. I had no idea that animation created a new stacking context. If you use those properties for motion, keep this in mind when reading [CSS transitions and animations](https://bishal-biswas.github.io/articles/css-transitions-animations-beginners).

## `isolation: isolate`

Sometimes I **want** a component to be its own sealed group, so its internal z-index values do not leak out and fight with the rest of the page. `isolation: isolate` creates a stacking context without needing `position` or a `z-index`.

```css
.card {
  isolation: isolate;
}

.card .badge {
  position: absolute;
  z-index: 1; /* Only competes inside .card */
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1; /* Stays behind the card's content, but inside the card */
}
```

Without `isolation: isolate`, that `z-index: -1` background could slip behind the card's parent and disappear.

## The Top Layer

Modern HTML has a special layer above every stacking context, called the **top layer**. A `<dialog>` opened with `showModal()` and an element using the `popover` attribute are placed there.

```html
<button popovertarget="menu">Open menu</button>
<div id="menu" popover>Menu content</div>
```

Elements in the top layer appear above everything else, no matter what `z-index` the rest of the page uses. For modals and menus, this often removes the need for `z-index` entirely.

## Organizing z-index Values

Random numbers like `10`, `99`, `500` and `9999` scattered across a project become impossible to manage. I keep a small scale in [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties):

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}
```

Now every layer has a name, and I can see the whole order in one place.

## How I Debug a z-index Problem

When something is hidden behind something else, I go through these steps:

1. **Is the element positioned, or a flex or grid item?** If not, `z-index` is ignored.
2. **Which stacking context is it in?** Walk up through its parents and look for any property from the list above.
3. **Compare the parents, not the children.** Find the two ancestors that are siblings in the same context, and compare their `z-index` values.
4. **Check for `overflow: hidden`.** A parent with `overflow: hidden` clips the child no matter what its `z-index` is. That is clipping, not stacking, but it looks similar.

Browser DevTools help a lot here. In Chrome and Edge, the **Layers** panel and the computed styles show which properties are active, and Firefox's inspector marks elements that create a stacking context.

## Common Mistakes

### 1. Using `z-index` on a Static Element

Add `position: relative` (or make it a flex or grid item) and it starts working.

### 2. Increasing the Number Forever

If `z-index: 10` does not work, `z-index: 99999` probably will not either. The problem is almost always the parent's stacking context.

### 3. Forgetting That `opacity` and `transform` Create Contexts

An animation or a small `transform: translateZ(0)` hack can suddenly change your layering.

### 4. Confusing Clipping With Stacking

An element cut off by a parent with `overflow: hidden` will not be fixed by any `z-index`.

### 5. Using `z-index` for Modals That Could Use the Top Layer

A native `<dialog>` or `popover` avoids most layering fights.

## Conclusion

`z-index` decides which overlapping element is on top, but only among elements in the same stacking context. It needs a positioned element, or a flex or grid item, to work at all.

Stacking contexts are sealed groups. A child can never escape its parent's group, no matter how big its number is. Learn the list of properties that create a stacking context, use `isolation: isolate` for components, keep your values in a small named scale, and reach for the top layer for dialogs and popovers.

Once I started thinking in folders instead of numbers, I stopped writing `z-index: 9999` and started fixing the real problem.
