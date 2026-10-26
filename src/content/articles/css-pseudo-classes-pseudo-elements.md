---
title: "CSS Pseudo-Classes and Pseudo-Elements Explained"
slug: css-pseudo-classes-pseudo-elements
metaDescription: Learn the difference between CSS pseudo-classes and pseudo-elements, with examples of :hover, :focus-visible, :nth-child, :has(), ::before and ::after.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=Pseudo+Classes
author: Bishal Biswas
publishDate: 2026-12-09
isDraft: false
category: CSS
tags:
  - CSS pseudo-classes
  - CSS pseudo-elements
  - CSS selectors
  - before and after
---

When I first saw CSS like `a:hover` and `p::first-line`, I honestly thought the colons were typos. One colon here, two colons there. It looked random.

It is not random at all. One colon means a **pseudo-class**, and two colons mean a **pseudo-element**. Once I understood the difference, a lot of CSS started to make sense.

In this article, I will explain what pseudo-classes and pseudo-elements are, show the ones I use most often, and go through the mistakes I made with them.

If basic selectors like classes and IDs are still new to you, start with [CSS selectors explained with examples](https://bishal-biswas.github.io/articles/css-selectors-explained).

## The Short Version

- A **pseudo-class** (`:`) selects an element when it is in a certain **state** or **position**. For example, a link the mouse is over, or the first item in a list.
- A **pseudo-element** (`::`) styles a **part** of an element, or adds content that is not in the HTML. For example, the first letter of a paragraph, or a decorative icon before a heading.

A simple way I remember it:

> Pseudo-class = "when" or "which one". Pseudo-element = "which part".

## Pseudo-Classes

A pseudo-class is added to a normal selector with a single colon.

```css
selector:pseudo-class {
  property: value;
}
```

### User Action Pseudo-Classes

These react to what the user is doing.

```css
a:hover {
  color: #2f7d32;
}

button:active {
  transform: scale(0.98);
}

input:focus {
  border-color: #2f7d32;
}
```

- `:hover` applies when the pointer is over the element.
- `:active` applies while the element is being pressed.
- `:focus` applies when the element has keyboard or click focus.

### `:focus-visible` for Better Focus Styles

A common problem is that `:focus` shows an outline even when someone clicks a button with a mouse, and some people remove the outline completely because of that. That hurts keyboard users.

`:focus-visible` solves this. The browser applies it when it decides a visible focus indicator is helpful, which is usually during keyboard navigation.

```css
button:focus-visible {
  outline: 3px solid #2f7d32;
  outline-offset: 2px;
}
```

I now use `:focus-visible` for almost all my focus styles. My article on [HTML accessibility basics](https://bishal-biswas.github.io/articles/html-accessibility-basics-aria) explains why keyboard focus matters so much.

### Structural Pseudo-Classes

These select elements based on their position among siblings.

```css
li:first-child {
  font-weight: bold;
}

li:last-child {
  border-bottom: none;
}

tr:nth-child(even) {
  background: #f4f4f4;
}

li:nth-child(3) {
  color: crimson;
}
```

`:nth-child()` accepts a number, the keywords `odd` and `even`, or a formula like `3n` (every third element) or `3n + 1` (the 1st, 4th, 7th and so on).

There is also `:nth-of-type()`, which counts only siblings of the same element type. This matters when siblings are mixed:

```html
<article>
  <h2>Title</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</article>
```

```css
p:first-child {
  /* Matches nothing: the first child is the h2 */
}

p:first-of-type {
  /* Matches "First paragraph" */
}
```

### Form State Pseudo-Classes

These are very handy with forms.

```css
input:disabled {
  opacity: 0.5;
}

input:checked + label {
  font-weight: bold;
}

input:required {
  border-left: 3px solid orange;
}

input:user-invalid {
  border-color: crimson;
}
```

I like `:user-invalid` because, unlike `:invalid`, it waits until the user has interacted with the field. That way an empty required field does not show red before the user has even typed anything. For more on form markup, see [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

### Logical Pseudo-Classes: `:not()`, `:is()`, `:where()` and `:has()`

These take other selectors inside the brackets.

```css
/* Every button except .primary */
button:not(.primary) {
  background: transparent;
}

/* Shorter way to write h1 a, h2 a, h3 a */
:is(h1, h2, h3) a {
  text-decoration: none;
}

/* Same as :is(), but with zero specificity */
:where(ul, ol) {
  padding-left: 1.25rem;
}
```

And then there is `:has()`, which is supported in all modern browsers and finally lets me style a parent based on what it contains:

```css
/* A card that contains an image gets no padding */
.card:has(img) {
  padding: 0;
}

/* A form field wrapper with an invalid input */
.field:has(input:user-invalid) {
  color: crimson;
}
```

Before `:has()`, this needed JavaScript.

## Pseudo-Elements

A pseudo-element uses two colons and styles a part of an element.

### `::before` and `::after`

These are the pseudo-elements I use most. They insert a generated box at the start or end of an element's content. They need the `content` property, or they will not appear.

```css
.required-label::after {
  content: " *";
  color: crimson;
}

.quote::before {
  content: "\201C"; /* opening curly quote */
  font-size: 2rem;
}
```

`::before` and `::after` are also great for decoration:

```css
.heading {
  position: relative;
}

.heading::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  margin-top: 8px;
  background: #2f7d32;
}
```

Here, `content: ""` creates an empty box that I can size and color. It draws a short underline without adding any extra HTML.

### Text Pseudo-Elements

```css
p::first-line {
  font-weight: bold;
}

p::first-letter {
  font-size: 2.5em;
  float: left;
  margin-right: 6px;
}

::selection {
  background: #72eb6c;
  color: #02162b;
}
```

- `::first-line` styles the first rendered line of a block.
- `::first-letter` styles the first letter, which is nice for drop caps.
- `::selection` styles text the user highlights.

### Form-Related Pseudo-Elements

```css
input::placeholder {
  color: #888;
}

li::marker {
  color: #2f7d32;
}

input[type="file"]::file-selector-button {
  padding: 6px 12px;
  border-radius: 4px;
}
```

## Pseudo-Classes vs Pseudo-Elements

| Feature | Pseudo-class | Pseudo-element |
|---|---|---|
| Syntax | One colon `:` | Two colons `::` |
| Selects | An element in a state or position | A part of an element |
| Examples | `:hover`, `:nth-child()`, `:has()` | `::before`, `::after`, `::marker` |
| Can add content | No | `::before` and `::after` can |

You can also combine them. The pseudo-class goes first:

```css
a:hover::after {
  content: " →";
}
```

## Common Mistakes

### 1. Forgetting `content` on `::before` or `::after`

```css
.icon::before {
  width: 20px;
  height: 20px;
  background: red;
  /* Nothing shows: content is missing */
}
```

Add `content: "";` and it appears (plus `display: inline-block` or `block` if you want the width and height to apply).

### 2. Putting Important Text in `content`

Text added with `content` is not part of the HTML. It cannot be selected or copied like normal text, and screen reader support varies. I only use it for decoration or small hints, never for information the user really needs.

### 3. Confusing `:first-child` with `:first-of-type`

`p:first-child` means "a `p` that is the first child of its parent", not "the first `p`". If a heading comes before it, nothing matches.

### 4. Using One Colon for Pseudo-Elements

Browsers still accept `:before` and `:after` with one colon for old compatibility reasons, but newer pseudo-elements like `::marker` and `::placeholder` only work with two. I always use two colons for pseudo-elements so I never have to remember which ones are exceptions.

### 5. Removing Focus Outlines

```css
*:focus {
  outline: none; /* Please do not do this */
}
```

If you dislike the default outline, replace it with a custom `:focus-visible` style instead of removing it.

## Conclusion

Pseudo-classes and pseudo-elements look strange at first, but the rule is simple. One colon selects an element in a certain state or position. Two colons style a part of an element or add generated content.

The ones I reach for every week are `:hover`, `:focus-visible`, `:nth-child()`, `:has()`, `::before` and `::after`. If you learn those first, you will be able to handle most real projects.

Most pseudo-classes add specificity like a class does (`:where()` adds none, and `:is()`, `:not()` and `:has()` take the specificity of their most specific argument), so if a rule unexpectedly wins or loses, read about [CSS specificity, cascade and inheritance](https://bishal-biswas.github.io/articles/css-specificity-cascade-inheritance). And when you want hover effects to change smoothly instead of instantly, the next step is [CSS transitions and animations](https://bishal-biswas.github.io/articles/css-transitions-animations-beginners).
