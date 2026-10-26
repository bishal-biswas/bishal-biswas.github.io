---
title: "The CSS Box Model Explained Simply"
slug: css-box-model-explained
metaDescription: Learn the CSS box model with simple examples. Understand content, padding, border and margin, box-sizing border-box, and how margin collapsing works.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Box+Model
author: Bishal Biswas
publishDate: 2026-11-23
isDraft: false
category: CSS
tags:
  - CSS box model
  - box-sizing
  - CSS padding and margin
  - CSS layout
---

When I started with CSS, I made a card 300px wide, added some padding and a border, and then wondered why it was suddenly wider than 300px. It broke my whole layout.

The reason was the **CSS box model**. Once I understood it, sizing and spacing stopped feeling random.

In this article, I will explain the four parts of the box model, how width is calculated, why almost every project uses `box-sizing: border-box`, and a few surprises like margin collapsing.

## Every Element Is a Box

In CSS, every element on the page is drawn as a rectangular box. Even a round avatar image is a rectangle with rounded corners.

Each box has four layers, from the inside out:

```text
+-------------------------------+
|            margin             |
|   +-----------------------+   |
|   |        border         |   |
|   |   +---------------+   |   |
|   |   |    padding    |   |   |
|   |   |  +---------+  |   |   |
|   |   |  | content |  |   |   |
|   |   |  +---------+  |   |   |
|   |   +---------------+   |   |
|   +-----------------------+   |
+-------------------------------+
```

1. **Content**: the text, image, or child elements.
2. **Padding**: space between the content and the border. It is inside the box and shows the background color.
3. **Border**: a line around the padding.
4. **Margin**: space outside the border that pushes other elements away. It is always transparent.

## A Simple Example

```html
<div class="card">Hello, box model!</div>
```

```css
.card {
  width: 300px;
  padding: 20px;
  border: 5px solid #02162b;
  margin: 30px;
  background: #e8f5e9;
}
```

Here:

- The content area is 300px wide.
- 20px of padding sits on every side of the content.
- A 5px border wraps the padding.
- 30px of margin separates the card from its neighbors.

## How Width Is Calculated by Default

By default, CSS uses `box-sizing: content-box`. That means `width` only sets the **content** area. Padding and border are added on top.

So the visible width of the card above is:

```text
300 (content)
+ 20 + 20 (padding left and right)
+ 5 + 5 (border left and right)
= 350px
```

The margin adds another 60px of space around it, but margin is not part of the visible box.

This is exactly what confused me as a beginner. I asked for 300px and got 350px.

## The Fix: `box-sizing: border-box`

With `border-box`, the `width` you set includes the content, padding, and border. The browser shrinks the content area to make everything fit.

```css
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid #02162b;
}
```

Now the visible width is exactly 300px. The content area becomes 250px.

Because this is so much easier to reason about, I put this at the top of nearly every stylesheet:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

The `*` is the universal selector. If selectors are new to you, my [CSS selectors guide](https://bishal-biswas.github.io/articles/css-selectors-explained) covers it.

## Padding and Margin Shorthand

Writing every side separately gets long:

```css
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}
```

The shorthand follows a clockwise order, starting at the top: **top, right, bottom, left**.

```css
.box {
  padding: 10px 20px 10px 20px; /* top right bottom left */
  padding: 10px 20px;           /* top/bottom, left/right */
  padding: 10px 20px 30px;      /* top, left/right, bottom */
  padding: 10px;                /* all four sides */
}
```

Margin uses the exact same pattern.

### Logical Properties

Modern CSS also has logical versions that adapt to the writing direction, which is useful for right-to-left languages:

```css
.box {
  padding-inline: 20px; /* left and right in English */
  padding-block: 10px;  /* top and bottom in English */
  margin-inline: auto;  /* centers a block with a width */
}
```

## The Border

A border needs three things: a width, a style, and a color.

```css
.box {
  border: 2px solid #72eb6c;
}
```

Without a style like `solid`, `dashed`, or `dotted`, the border will not appear. That caught me out more than once.

You can also round the corners. `border-radius` does not change the box size:

```css
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
```

## Margin Collapsing

This is the box model's biggest surprise. When two **vertical** margins of block elements touch, they do not add up. Only the larger one is used.

```css
h2 {
  margin-bottom: 30px;
}

p {
  margin-top: 20px;
}
```

```html
<h2>Title</h2>
<p>Paragraph</p>
```

You might expect 50px between them, but you get **30px**. The margins collapse into the larger value.

A few things to know:

- Only vertical (top and bottom) margins collapse, never left and right.
- Margins do not collapse inside flex or grid containers.
- A parent's top margin can collapse with its first child's top margin if nothing (padding, border) separates them.

In my own projects, I avoid most of this by using only `margin-bottom` for spacing, or by using `gap` inside flex and grid layouts. You can learn more about `gap` in my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).

## Box Model and Inline Elements

The box model works a little differently for inline elements like `<span>` and `<a>`. Their `width` and `height` are ignored, and their top and bottom margins have no effect. I explain why in [block vs inline elements in HTML](https://bishal-biswas.github.io/articles/html-block-vs-inline-elements).

## Seeing the Box Model in DevTools

My favorite way to learn this was opening DevTools. Right-click any element, choose **Inspect**, and look at the **Computed** tab (Chrome and Edge) or the **Layout** tab (Firefox). You will see a colored diagram showing the exact content, padding, border, and margin values.

Hovering over an element also highlights the padding in green and margin in orange on the page itself.

## A Practical Card Example

```html
<article class="card">
  <h2>CSS Basics</h2>
  <p>Learn how boxes work in CSS.</p>
</article>
```

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  max-width: 360px;
  padding: 24px;
  margin: 0 auto 32px;
  border: 1px solid #cfd8dc;
  border-radius: 12px;
}

.card h2 {
  margin: 0 0 8px;
}

.card p {
  margin: 0;
}
```

The card is never wider than 360px, has comfortable padding inside, is centered with `margin: 0 auto`, and has a predictable gap below it.

## Common Mistakes

### 1. Forgetting `box-sizing: border-box`

Without it, padding and border make your elements larger than the width you set.

### 2. Using Padding When You Mean Margin

Padding is inside the box and shows the background. Margin is outside and is transparent. If you want space *between* two cards, use margin or `gap`.

### 3. Border With No Style

`border: 2px red;` shows nothing. Add `solid`.

### 4. Being Confused by Collapsing Margins

If a gap is smaller than you expected, check whether two vertical margins are collapsing.

### 5. Setting Height on Text Containers

A fixed `height` on a box with text can cause overflow when the text grows. Let the content decide the height, or use `min-height`.

## Conclusion

Every element is a box made of content, padding, border, and margin. By default, `width` only covers the content, which is why boxes grow when you add padding. Using `box-sizing: border-box` makes `width` mean what you expect.

Once you combine this with the knowledge of collapsing margins and a quick look in DevTools, most spacing problems become easy to fix. Next, it helps to understand the units you use for all these values, which I cover in [CSS units explained](https://bishal-biswas.github.io/articles/css-units-px-em-rem-vh-vw).
