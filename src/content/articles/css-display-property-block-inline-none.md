---
title: "The CSS display Property Explained"
slug: css-display-property-block-inline-none
metaDescription: Learn the CSS display property with examples, including block, inline, inline-block, none, flex, grid and contents, and how display none differs from hidden.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+display
author: Bishal Biswas
publishDate: 2026-12-03
isDraft: false
category: CSS
tags:
  - CSS display property
  - display none
  - inline-block
  - CSS layout
---

If I had to pick one CSS property that controls the most about layout, it would be `display`. It decides whether an element starts on a new line, whether it accepts a width, whether its children line up in a row or a grid, and even whether it shows up at all.

When I was learning, I treated `display` as a magic switch I flipped until things looked right. In this article, I will explain what each common value actually does, so you can choose one on purpose.

## What Does `display` Control?

The `display` property controls two things:

1. **Outer display**: how the element itself behaves next to its siblings (block or inline).
2. **Inner display**: how the element lays out its own children (normal flow, flex, or grid).

Every HTML element has a default `display` value from the browser. A `<div>` is `block`, a `<span>` is `inline`, and a `<li>` is `list-item`. You can change any of them with CSS.

## `display: block`

A block element:

- Starts on a new line.
- Fills the full width of its parent by default.
- Accepts `width`, `height`, `margin`, and `padding` on all sides.

```css
.nav-link {
  display: block;
  padding: 12px 16px;
}
```

I often make links `block` in a vertical menu so the whole row is clickable, not just the text.

## `display: inline`

An inline element:

- Sits inside a line of text.
- Only takes the width of its content.
- Ignores `width` and `height`.
- Ignores top and bottom margin.

```css
.tag {
  display: inline;
}
```

`<span>`, `<a>`, `<strong>`, and `<em>` are inline by default. I explain the difference between these two in detail in [block vs inline elements in HTML](https://bishal-biswas.github.io/articles/html-block-vs-inline-elements).

## `display: inline-block`

Inline-block is a mix. The element sits in a line like inline, but accepts width, height, and vertical spacing like block.

```css
.badge {
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  border-radius: 999px;
  background: #72eb6c;
}
```

```html
<p>
  Skills:
  <span class="badge">HTML</span>
  <span class="badge">CSS</span>
</p>
```

The badges stay in the sentence, and their padding and margin work properly on every side.

## `display: none`

`display: none` removes an element completely. It is not drawn, it takes up no space, and screen readers ignore it.

```css
.mobile-menu {
  display: none;
}
```

I use it to hide things that should not exist on screen right now, like a closed menu or content for another screen size.

### `display: none` vs `visibility: hidden` vs `opacity: 0`

These three are easy to mix up:

| Property | Visible? | Takes up space? | Clickable? | Read by screen readers? |
|---|---|---|---|---|
| `display: none` | No | No | No | No |
| `visibility: hidden` | No | Yes | No | No |
| `opacity: 0` | No | Yes | Yes | Yes |

```css
.gone      { display: none; }       /* removed from layout */
.invisible { visibility: hidden; }  /* empty space left behind */
.faded     { opacity: 0; }          /* invisible but still there */
```

### The HTML `hidden` Attribute

HTML has a built-in `hidden` attribute. By default, it behaves like `display: none`:

```html
<div id="message" hidden>Saved!</div>
```

Toggling it with JavaScript is simple:

```js
const message = document.getElementById("message");
message.hidden = false; // show it
```

One gotcha: if your CSS sets `display: flex` on that element, it can override `hidden`. I add this small rule to be safe:

```css
[hidden] {
  display: none !important;
}
```

## `display: flex`

`flex` changes the **inner** display. The element itself behaves like a block, but its direct children become flex items arranged in a row (or column).

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

```html
<div class="toolbar">
  <button>Bold</button>
  <button>Italic</button>
  <button>Link</button>
</div>
```

The buttons line up in a row with 12px gaps. There is also `inline-flex`, which does the same thing for the children, but the container itself sits inline.

## `display: grid`

`grid` also changes the inner display. Its children are placed into rows and columns.

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

Three equal columns, with gaps between them. Flexbox and Grid are big topics on their own, so I cover them fully in my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).

## `display: contents`

This one is less common. `display: contents` makes the element's own box disappear, while its children stay and act as if they belong directly to the grandparent.

```html
<ul class="grid">
  <li class="wrapper">
    <a href="#">One</a>
  </li>
</ul>
```

```css
.wrapper {
  display: contents;
}
```

It can be handy inside grid and flex layouts. However, applying it to elements with meaning, like buttons, lists, or tables, has historically caused accessibility problems in some browsers. I only use it on plain wrapper elements, and I test with a screen reader if it matters.

## Other Values You Might See

- `list-item`: the default for `<li>`, which adds the bullet or number.
- `table`, `table-row`, `table-cell`: make elements behave like table parts. Real data should use real [HTML tables](https://bishal-biswas.github.io/articles/html-tables-explained) instead.
- `flow-root`: makes a block that contains its floats and stops margins from collapsing through it.

### The Two-Value Syntax

Modern CSS also supports writing outer and inner display separately:

```css
display: block flow;    /* same as block */
display: inline flow;   /* same as inline */
display: block flex;    /* same as flex */
display: inline flex;   /* same as inline-flex */
```

You don't need to use this, but it helps explain how `display` works under the hood.

## `display` Doesn't Change Meaning

Changing `display` only changes layout. A `<span>` with `display: block` is still a `span`, and a `<ul>` with `display: flex` is still a list. Choose your HTML element for its meaning first, then use `display` for the layout.

## Common Mistakes

### 1. Setting Width on an Inline Element

`width` does nothing on `display: inline`. Switch to `inline-block` or `block`.

### 2. Applying Flex to the Wrong Element

`display: flex` goes on the **parent**, not on the items you want to line up.

### 3. Using `opacity: 0` to Hide Things

The element is still clickable and still read by screen readers. Use `display: none` or `hidden` if it should be gone.

### 4. Overriding the `hidden` Attribute

A `display: flex` rule can make `hidden` elements visible. Add a `[hidden]` rule.

### 5. Animating `display`

For a long time, `display` could not be animated, so things popped in instantly. Modern browsers now support transitioning it with `transition-behavior: allow-discrete`, but as a beginner, fading `opacity` is the simpler choice. I cover animations in [CSS transitions and animations for beginners](https://bishal-biswas.github.io/articles/css-transitions-animations-beginners).

## Conclusion

`block` stacks, `inline` flows with text, `inline-block` flows but accepts sizing, and `none` removes the element. `flex` and `grid` change how the children are arranged.

When something in my layout behaves strangely, the first thing I check in DevTools is the `display` value. It explains more layout bugs than any other property.
