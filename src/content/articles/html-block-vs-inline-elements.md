---
title: "Block vs Inline Elements in HTML"
slug: html-block-vs-inline-elements
metaDescription: Learn the difference between block and inline elements in HTML, how each one behaves in a layout, and how inline-block and CSS display change them.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=Block+vs+Inline
author: Bishal Biswas
publishDate: 2026-11-19
isDraft: false
category: HTML
tags:
  - HTML block elements
  - HTML inline elements
  - inline-block
  - HTML layout
---

When I was learning HTML, I kept running into a confusing problem. I would put two elements next to each other in my code, and one of them would jump to a new line. Another time, I would set a `width` on a link, and nothing would happen.

Both problems had the same cause: I did not understand the difference between **block** and **inline** elements.

In this article, I will explain how block and inline elements behave, show examples of each, introduce `inline-block`, and go through the mistakes I made while learning this.

## What Is a Block Element?

A block element starts on a new line and stretches to fill the full width of its parent by default.

Think of block elements like paragraphs in a book. Each one gets its own line, stacked from top to bottom.

```html
<h2>My Heading</h2>
<p>First paragraph.</p>
<p>Second paragraph.</p>
```

Even if these paragraphs are short, each one takes up its own full row.

### Common Block Elements

Here are some block elements you will use all the time:

- `<div>`
- `<p>`
- `<h1>` to `<h6>`
- `<ul>`, `<ol>`, and `<li>`
- `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<main>`
- `<form>`
- `<table>`
- `<blockquote>`

### Block Element Behavior

Block elements:

- Start on a new line.
- Take the full available width unless you set a `width`.
- Respect `width`, `height`, `margin`, and `padding` on all sides.
- Can contain other block and inline elements (following HTML's content rules).

```css
.box {
  width: 300px;
  height: 100px;
  margin: 20px;
  padding: 16px;
  background: #e8f5e9;
}
```

```html
<div class="box">I am a block box.</div>
<div class="box">I am another block box.</div>
```

Even with a width of 300px, the second box still drops below the first. A block element always starts on a new line, no matter how narrow it is.

## What Is an Inline Element?

An inline element sits inside a line of text. It only takes up as much width as its content needs, and it does not start a new line.

Think of inline elements like words in a sentence. They flow next to each other and wrap to the next line when there is no more space.

```html
<p>
  I am learning <strong>HTML</strong> and
  <a href="/css">CSS</a> this week.
</p>
```

The `<strong>` and `<a>` elements stay inside the sentence.

### Common Inline Elements

- `<span>`
- `<a>`
- `<strong>` and `<em>`
- `<img>` (technically a replaced inline element)
- `<code>`
- `<label>`
- `<button>`, `<input>`, and `<select>` (these are inline-level but behave like inline-block)
- `<br>`

### Inline Element Behavior

Inline elements:

- Do not start on a new line.
- Only take the width of their content.
- **Ignore** `width` and `height` (except replaced elements like `<img>` and form controls).
- Apply left and right margin and padding normally.
- Apply top and bottom padding visually, but it does **not** push surrounding lines away.
- Ignore top and bottom margin.

That last point surprised me the most. Look at this:

```css
a {
  padding: 20px;
  margin: 20px;
  background: yellow;
}
```

The yellow background grows upward and downward, but the lines of text above and below do not move. The background may even overlap them. That is inline behavior.

## Block vs Inline: Side by Side

| Feature | Block | Inline |
|---|---|---|
| Starts on new line | Yes | No |
| Default width | Full width of parent | Width of content |
| `width` and `height` | Respected | Ignored |
| Vertical margin | Respected | Ignored |
| Vertical padding | Pushes content | Painted, but does not push lines |
| Typical use | Sections, layout, paragraphs | Text-level content |

If you have read my article on [div vs span](https://bishal-biswas.github.io/articles/html-div-vs-span), this table will look familiar. `div` is the generic block element and `span` is the generic inline element.

## What About `inline-block`?

Sometimes I want the best of both worlds. I want elements to sit next to each other in a line, but I also want to set their width, height, and vertical padding.

That is what `display: inline-block` does.

```css
.tag {
  display: inline-block;
  padding: 6px 12px;
  margin: 4px;
  background: #00283a;
  color: white;
  border-radius: 4px;
}
```

```html
<span class="tag">HTML</span>
<span class="tag">CSS</span>
<span class="tag">JavaScript</span>
```

Now the tags sit in a row, but their padding and margin work on all sides.

| Feature | Inline | Inline-block | Block |
|---|---|---|---|
| Sits in a line | Yes | Yes | No |
| `width`/`height` work | No | Yes | Yes |
| Vertical margin works | No | Yes | Yes |

## Changing Behavior With CSS

Block and inline are **default** behaviors. CSS can change them using the `display` property.

```css
/* Make links stack like blocks */
nav a {
  display: block;
}

/* Make list items sit in a row */
.menu li {
  display: inline-block;
}
```

Changing `display` only changes how something looks and is laid out. It does not change what the element means. A `<p>` with `display: inline` is still a paragraph.

I cover every value of this property in [the CSS display property explained](https://bishal-biswas.github.io/articles/css-display-property-block-inline-none).

### A Note on Flexbox and Grid

In modern layouts, I rarely use `inline-block` for rows of cards anymore. Instead, I put `display: flex` or `display: grid` on the parent. The children then become flex or grid items, and their block or inline nature matters much less for layout.

```css
.card-row {
  display: flex;
  gap: 16px;
}
```

If you want to go further with this, see my [CSS Flexbox and Grid complete guide](https://bishal-biswas.github.io/articles/css-flexbox-grid-complete-guide).

## How "Block" and "Inline" Fit Into Modern HTML

You might read that the HTML specification no longer uses the words "block" and "inline." That is true. Modern HTML groups elements by **content categories**, such as flow content and phrasing content.

For beginners, though, the block and inline idea is still the best way to understand layout. The "block" or "inline" behavior now comes from the browser's default CSS for each element. That is why you can change it with `display`.

A useful rough rule for nesting: phrasing (inline) elements like `<span>` and `<strong>` should hold text and other phrasing elements, not large structures like `<div>` or `<p>`.

## Common Mistakes

### 1. Setting Width on an Inline Element

```css
span {
  width: 200px; /* does nothing */
}
```

Change it to `inline-block` or `block` if you need a width.

### 2. Expecting Vertical Margin on Links

`margin-top` on an `<a>` will not move it. Use `display: inline-block` or add spacing to the parent instead.

### 3. Putting a Block Inside a Paragraph

```html
<p>
  Hello
  <div>World</div>
</p>
```

A `<p>` cannot contain a `<div>`. The browser closes the paragraph early, and your HTML structure ends up different from what you wrote.

### 4. Choosing an Element Only for Its Display

Do not use `<h3>` just because you want a block with bold text, or `<span>` because you want something inline. Choose the element based on meaning, then use CSS for the look.

### 5. Gaps Between Inline-Block Items

Inline-block elements are affected by the whitespace in your HTML, which creates small gaps between them. If that bothers you, switch the parent to flexbox and use `gap`.

## Conclusion

Block elements start on a new line and fill the width. Inline elements flow inside a line of text and only take the space they need. Inline-block sits in a line but accepts width, height, and vertical spacing.

Once I understood these three behaviors, many "weird" layout bugs suddenly made sense. If something is not sizing or spacing the way you expect, the first thing I would check is its `display` value in your browser's DevTools.
