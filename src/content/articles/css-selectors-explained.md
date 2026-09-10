---
title: "CSS Selectors Explained With Examples: A Beginner's Guide"
slug: css-selectors-explained
metaDescription: Learn CSS selectors from the basics with simple examples.
  Understand element, class, ID, attribute, descendant, child, sibling,
  pseudo-class, and pseudo-element selectors.
image: css-selectors-explained.webp
author: Bishal Biswas
publishDate: 2026-09-10
isDraft: false
category: Web Development
tags:
  - CSS
  - CSS selectors
  - Types of CSS selectors
---
## Introduction

When I started learning CSS, one of the first things I had to understand was how CSS knows **which HTML elements should receive a particular style**.

For example, suppose I have this HTML:

```html
<h1>My Website</h1>
<p>Welcome to my website.</p>
<p>This is another paragraph.</p>
```

Now I want to make only the paragraphs blue.

How does CSS know that I want to target the `<p>` elements?

This is where **CSS selectors** come in.

A CSS selector tells the browser which HTML elements I want to select and style.

For example:

```css
p {
    color: blue;
}
```

Here, `p` is the selector.

The browser finds all `<p>` elements and applies the `color: blue` rule to them.

In this article, I will explain the most important CSS selectors with simple examples.

---

# What Is a CSS Selector?

A CSS selector is a pattern used to select HTML elements that I want to style.

A basic CSS rule looks like this:

```css
selector {
    property: value;
}
```

For example:

```css
p {
    color: blue;
    font-size: 18px;
}
```

Here:

- `p` is the selector
- `color` is a CSS property
- `blue` is the property value
- `font-size` is another property
- `18px` is its value

The browser applies these styles to all `<p>` elements.

---

# 1. Element Selector

The element selector is probably the easiest selector to understand.

I simply write the HTML element name.

For example:

```css
p {
    color: blue;
}
```

This selects every `<p>` element.

HTML:

```html
<p>Hello World</p>
<p>Welcome to my website.</p>
<p>I am learning CSS.</p>
```

All three paragraphs will become blue.

I can also target other HTML elements:

```css
h1 {
    font-size: 40px;
}

button {
    background-color: black;
}

img {
    width: 300px;
}
```

This is useful when I want to apply the same style to every element of a particular type.

---

# 2. Class Selector

The class selector is one of the selectors I use most often in real projects.

First, I add a class to an HTML element.

```html
<p class="highlight">This paragraph is important.</p>
<p>This paragraph is normal.</p>
<p class="highlight">This paragraph is also important.</p>
```

Then I use a dot (`.`) before the class name in CSS.

```css
.highlight {
    color: red;
    font-weight: bold;
}
```

Only the elements having the `highlight` class will receive these styles.

The class selector is very useful because I can use the same class on multiple elements.

For example:

```html
<h2 class="highlight">Important Heading</h2>
<p class="highlight">Important paragraph.</p>
<button class="highlight">Important Button</button>
```

All three elements can be styled using:

```css
.highlight {
    color: red;
}
```

### A common mistake

I sometimes see beginners write:

```css
highlight {
    color: red;
}
```

That is not a class selector.

The correct syntax is:

```css
.highlight {
    color: red;
}
```

The dot tells CSS that `highlight` is a class.

---

# 3. ID Selector

An ID selector targets an element based on its `id` attribute.

HTML:

```html
<h1 id="main-heading">My Website</h1>
```

CSS:

```css
#main-heading {
    color: green;
}
```

The `#` symbol tells CSS that I am selecting an ID.

For example:

```html
<p id="description">
    This is my website.
</p>
```

```css
#description {
    font-size: 20px;
}
```

### Class vs ID

The main difference is how I generally use them.

A class can be reused:

```html
<p class="text">One</p>
<p class="text">Two</p>
<p class="text">Three</p>
```

An ID is intended to identify one particular element within a page:

```html
<h1 id="main-heading">My Website</h1>
```

For normal styling, I generally prefer classes because they are reusable.

---

# 4. Universal Selector

The universal selector selects every element on the page.

It is represented by an asterisk (`*`).

```css
* {
    margin: 0;
    padding: 0;
}
```

This applies the styles to all elements.

A common use is resetting default browser spacing:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

I often use a variation of this in projects because browsers have their own default styles.

---

# 5. Grouping Selector

Sometimes I want to apply the same styles to several different elements.

Instead of writing:

```css
h1 {
    color: blue;
}

h2 {
    color: blue;
}

h3 {
    color: blue;
}
```

I can group them:

```css
h1, h2, h3 {
    color: blue;
}
```

I simply separate the selectors with commas.

This makes the CSS shorter and easier to maintain.

---

# 6. Descendant Selector

The descendant selector allows me to select elements that exist inside another element.

For example:

```html
<div class="card">
    <h2>Product</h2>
    <p>This is a product.</p>
</div>
```

I can target the paragraph inside `.card` like this:

```css
.card p {
    color: gray;
}
```

Here:

```css
.card p
```

means:

> Select any `<p>` element that exists somewhere inside an element with the `card` class.

It does not have to be a direct child.

For example:

```html
<div class="card">
    <section>
        <p>This will also be selected.</p>
    </section>
</div>
```

The selector still works:

```css
.card p {
    color: gray;
}
```

---

# 7. Child Selector

The child selector is slightly different from the descendant selector.

It uses the `>` symbol.

```css
.card > p {
    color: red;
}
```

This selects only `<p>` elements that are **direct children** of `.card`.

For example:

```html
<div class="card">
    <p>This is selected.</p>

    <section>
        <p>This is not selected.</p>
    </section>
</div>
```

The first paragraph is a direct child of `.card`.

The second paragraph is inside `<section>`, so it is not a direct child.

Therefore:

```css
.card > p
```

selects only the first paragraph.

This is an important difference:

```css
.card p
```

means any descendant.

```css
.card > p
```

means direct child only.

---

# 8. Attribute Selector

CSS can also select elements based on their attributes.

For example:

```html
<input type="text">
<input type="email">
<input type="password">
```

I can select all elements having a `type` attribute with:

```css
input[type] {
    border: 1px solid gray;
}
```

I can also target a specific attribute value:

```css
input[type="email"] {
    border-color: blue;
}
```

Now only the email input is selected.

Another example:

```html
<a href="https://example.com">Example</a>
<a href="/about">About</a>
```

I can select links that start with `https`:

```css
a[href^="https"] {
    color: green;
}
```

Attribute selectors become particularly useful when I need to style elements based on their HTML attributes without adding extra classes.

---

# 9. Adjacent Sibling Selector

The adjacent sibling selector uses the `+` symbol.

It selects an element that comes immediately after another element.

For example:

```html
<h2>Heading</h2>
<p>This paragraph comes immediately after the heading.</p>
<p>This is another paragraph.</p>
```

CSS:

```css
h2 + p {
    color: blue;
}
```

Only the first paragraph is selected because it immediately follows the `<h2>`.

This can be useful when I want to style something based on what comes directly before it.

---

# 10. General Sibling Selector

The general sibling selector uses the `~` symbol.

It selects sibling elements that appear after another element.

For example:

```html
<h2>Heading</h2>
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

CSS:

```css
h2 ~ p {
    color: blue;
}
```

All three paragraphs can be selected because they are siblings that appear after the `<h2>`.

The important difference is:

```css
h2 + p
```

selects the immediately following sibling.

```css
h2 ~ p
```

selects matching siblings that appear later.

---

# 11. Pseudo-Classes

Pseudo-classes allow me to select an element based on its state or position.

They usually start with a colon (`:`).

One of the most common examples is `:hover`.

```css
button:hover {
    background-color: black;
    color: white;
}
```

This style is applied when I move the mouse over the button.

HTML:

```html
<button>Hover Me</button>
```

There are many useful pseudo-classes.

### `:hover`

```css
a:hover {
    color: red;
}
```

Applies when the mouse pointer is over the element.

### `:focus`

```css
input:focus {
    border-color: blue;
}
```

Applies when an input receives focus.

### `:first-child`

```css
li:first-child {
    font-weight: bold;
}
```

Selects an element if it is the first child of its parent.

### `:last-child`

```css
li:last-child {
    font-weight: bold;
}
```

Selects the last child.

### `:nth-child()`

This is particularly useful when I need to select elements based on their position.

```css
li:nth-child(2) {
    color: red;
}
```

This selects the second `<li>`.

I can also select every second item:

```css
li:nth-child(even) {
    background-color: lightgray;
}
```

Or odd items:

```css
li:nth-child(odd) {
    background-color: white;
}
```

Pseudo-classes are extremely useful for interactive interfaces and lists.

---

# 12. Pseudo-Elements

Pseudo-elements allow me to style a specific part of an element.

They generally use two colons (`::`).

For example:

```css
p::first-letter {
    font-size: 30px;
}
```

This makes the first letter of each paragraph larger.

Another example is `::before`.

```css
.note::before {
    content: "Note: ";
    font-weight: bold;
}
```

HTML:

```html
<p class="note">Always test your code.</p>
```

The generated result will visually contain:

```text
Note: Always test your code.
```

Another commonly used pseudo-element is `::after`.

```css
.link::after {
    content: " →";
}
```

Pseudo-elements are useful for decorative content and styling parts of an element without adding extra HTML.

---

# 13. The `:not()` Selector

Sometimes I want to select everything except a particular element.

The `:not()` pseudo-class is useful for this.

For example:

```css
p:not(.special) {
    color: gray;
}
```

HTML:

```html
<p>Normal paragraph</p>
<p class="special">Special paragraph</p>
<p>Another normal paragraph</p>
```

The normal paragraphs are selected, but `.special` is excluded.

This can help me avoid adding unnecessary CSS classes.

---

# 14. The `:first-of-type` and `:last-of-type` Selectors

These selectors allow me to select the first or last element of a particular type.

For example:

```css
p:first-of-type {
    color: blue;
}
```

This selects the first `<p>` among its siblings.

Similarly:

```css
p:last-of-type {
    color: red;
}
```

selects the last `<p>`.

These can be useful when working with mixed HTML elements.

---

# 15. Combining Multiple Selectors

I can combine selectors to make my CSS more specific.

For example:

```html
<p class="text important">Important text</p>
```

I can target an element having both classes:

```css
.text.important {
    color: red;
}
```

Notice that there is no space between the class names.

This:

```css
.text.important
```

means an element that has both classes.

But this:

```css
.text .important
```

means an element with `.important` inside an element with `.text`.

That small space changes the meaning.

---

# 16. Selector Specificity

One topic I recommend learning along with selectors is **CSS specificity**.

Sometimes I write multiple CSS rules that target the same element.

For example:

```css
p {
    color: blue;
}

.text {
    color: green;
}

#special {
    color: red;
}
```

And the HTML is:

```html
<p class="text" id="special">Hello</p>
```

All three selectors match the paragraph.

So which color wins?

The answer is based partly on **specificity**.

A simplified way I remember the order is:

```text
Element < Class < ID
```

So:

```css
p
```

has lower specificity than:

```css
.text
```

and `.text` has lower specificity than:

```css
#special
```

Therefore, the ID rule normally wins here.

```css
#special {
    color: red;
}
```

Specificity becomes very important when CSS gets larger.

---

# 17. CSS Selector Cheat Sheet

Here is the quick reference I use when revising CSS selectors.

| Selector | Meaning | Example |
|---|---|---|
| `*` | Select everything | `*` |
| `p` | Select all `<p>` elements | `p` |
| `.box` | Select elements with class | `.box` |
| `#header` | Select element with ID | `#header` |
| `h1, p` | Select multiple elements | `h1, p` |
| `.card p` | Select descendants | `.card p` |
| `.card > p` | Select direct children | `.card > p` |
| `input[type="text"]` | Select by attribute | `input[type="text"]` |
| `h2 + p` | Immediate sibling | `h2 + p` |
| `h2 ~ p` | General sibling | `h2 ~ p` |
| `a:hover` | Hover state | `a:hover` |
| `input:focus` | Focus state | `input:focus` |
| `li:first-child` | First child | `li:first-child` |
| `li:last-child` | Last child | `li:last-child` |
| `li:nth-child(2)` | Second child | `li:nth-child(2)` |
| `p::first-letter` | First letter | `p::first-letter` |
| `.box::before` | Content before element | `.box::before` |
| `.box::after` | Content after element | `.box::after` |
| `p:not(.special)` | Exclude matching elements | `p:not(.special)` |

---

# A Practical Example

Let me put several selectors together in one small example.

### HTML

```html
<div class="card">
    <h2>My Product</h2>

    <p class="description">
        This is a product description.
    </p>

    <ul>
        <li>Feature One</li>
        <li>Feature Two</li>
        <li>Feature Three</li>
    </ul>

    <button>Buy Now</button>
</div>
```

### CSS

```css
.card {
    padding: 20px;
}

.card h2 {
    color: blue;
}

.card > .description {
    color: gray;
}

.card li:first-child {
    font-weight: bold;
}

.card li:nth-child(even) {
    background-color: lightgray;
}

.card button:hover {
    background-color: black;
    color: white;
}
```

Here I am using several concepts:

- `.card` selects the card
- `.card h2` selects the heading inside the card
- `.card > .description` selects the direct child description
- `li:first-child` selects the first list item
- `li:nth-child(even)` selects even list items
- `button:hover` changes the button when I hover over it

Once I understand selectors, CSS becomes much easier because I can precisely tell the browser what I want to style.

---

# Common CSS Selector Mistakes

## 1. Forgetting the dot for classes

Wrong:

```css
button {
    color: red;
}
```

If I intended to target `.button`, this is not correct.

Correct:

```css
.button {
    color: red;
}
```

---

## 2. Forgetting the `#` for IDs

Wrong:

```css
header {
    color: red;
}
```

If I want to target:

```html
<div id="header"></div>
```

I need:

```css
#header {
    color: red;
}
```

---

## 3. Confusing descendant and child selectors

These are not the same:

```css
.card p
```

and:

```css
.card > p
```

The first can select paragraphs at any depth inside `.card`.

The second selects only direct children.

---

## 4. Using IDs everywhere

I generally avoid creating a separate ID for every element just to style it.

For reusable styles, classes are usually a better choice:

```css
.card {
    border: 1px solid gray;
}
```

Instead of:

```css
#card1 {
    border: 1px solid gray;
}

#card2 {
    border: 1px solid gray;
}
```

Classes make the CSS much easier to reuse.

---

# How I Recommend Learning CSS Selectors

When I teach or learn CSS, I don't recommend memorizing every selector at once.

I would learn them in this order:

### Beginner level

Start with:

```text
Element
Class
ID
Universal
Grouping
```

Then learn:

```text
Descendant
Child
```

After that:

```text
Attribute selectors
```

Then move to:

```text
:hover
:focus
:first-child
:last-child
:nth-child()
```

Finally, learn:

```text
::before
::after
Sibling selectors
:not()
Specificity
```

This progression makes the topic much easier.

---

# Final Thoughts

CSS selectors are one of the foundations of CSS.

When I first started working with CSS, selectors looked simple, but I quickly realized that understanding them properly makes a huge difference when building real websites.

The selectors I use most frequently are:

```css
.element
.class
#id
.parent .child
.parent > .child
:hover
:focus
:nth-child()
::before
::after
```

Once these become comfortable, I can start writing much more precise CSS without adding unnecessary classes or HTML elements.

My advice is simple: don't just read about selectors. Create a small HTML page and experiment with each selector.

Change the HTML structure, change the selector, and see what gets selected.

That hands-on practice is what helped me understand CSS much faster.
