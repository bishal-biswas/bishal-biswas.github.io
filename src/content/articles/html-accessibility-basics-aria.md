---
title: "HTML Accessibility Basics: Writing Pages Everyone Can Use"
slug: html-accessibility-basics-aria
metaDescription: Learn HTML accessibility basics with simple examples, including semantic elements, alt text, labels, keyboard focus, and when to use ARIA attributes.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=Accessibility
author: Bishal Biswas
publishDate: 2026-11-17
isDraft: false
category: HTML
tags:
  - HTML accessibility
  - ARIA
  - Web accessibility
  - Semantic HTML
---

When I first started building web pages, I only checked one thing: does it look right on my screen?

Later, I tried to use one of my own pages with only a keyboard. I could not reach half the buttons. Then I turned on a screen reader, and it read my "menu" as a list of meaningless words. That was the day I realized a page that looks fine is not the same as a page everyone can use.

Accessibility (often shortened to **a11y**) means building pages that work for people with different abilities. That includes people who use screen readers, people who navigate with a keyboard, people with low vision, and people with color blindness.

The good news is that most accessibility starts with plain, correct HTML. In this article, I will explain the basics I use on every page, and when ARIA attributes actually help.

## Why Accessibility Starts With HTML

Browsers already know how to make many HTML elements accessible. A `<button>` can be focused with the Tab key, activated with Enter or Space, and is announced as "button" by screen readers. You get all of that for free.

A `<div>` styled to look like a button gets none of it.

```html
<!-- Accessible by default -->
<button type="button">Save</button>

<!-- Not accessible without extra work -->
<div class="btn" onclick="save()">Save</div>
```

The `div` version cannot be reached with Tab, does nothing when Enter is pressed, and is announced as plain text. So my first rule is simple: **use the right HTML element for the job.**

## Use Semantic Elements for Page Structure

Screen reader users often jump between landmarks such as the header, navigation, and main content. Those landmarks come from semantic elements.

```html
<header>
  <a href="/">My Site</a>
</header>

<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/articles">Articles</a></li>
  </ul>
</nav>

<main>
  <h1>Welcome</h1>
  <p>This is the main content.</p>
</main>

<footer>
  <p>&copy; 2026 My Site</p>
</footer>
```

If you want a deeper look at these elements, I covered them in [HTML semantic elements explained](https://bishal-biswas.github.io/articles/html-semantic-elements).

### Use Headings in Order

Headings are like a table of contents for screen reader users. Many people navigate a page by jumping from heading to heading.

```html
<h1>CSS Guide</h1>
  <h2>Selectors</h2>
    <h3>Class Selectors</h3>
  <h2>Box Model</h2>
```

Use one `h1` for the main topic, then `h2` for sections and `h3` for sub-sections. Do not pick a heading level just because of its font size. That is what CSS is for. I explain this more in [HTML headings, paragraphs and text formatting](https://bishal-biswas.github.io/articles/html-headings-paragraphs-text-formatting).

## Write Good Alt Text for Images

Screen readers cannot see images. They read the `alt` attribute instead.

```html
<img src="team.jpg" alt="Five developers smiling around a laptop">
```

A few rules I follow:

- Describe what matters in the image, in a short sentence.
- Do not start with "Image of" because screen readers already say it is an image.
- If the image is purely decorative, use an empty `alt=""` so it is skipped.

```html
<img src="divider.svg" alt="">
```

Leaving `alt` out completely is worse than an empty value, because some screen readers will read the file name instead. You can read more in [HTML images, alt text and responsive images](https://bishal-biswas.github.io/articles/html-images-alt-text-responsive).

## Label Every Form Field

A placeholder is not a label. It disappears when the user starts typing and is not reliably announced.

```html
<label for="email">Email address</label>
<input id="email" type="email" name="email" autocomplete="email">
```

The `for` attribute must match the input's `id`. Now clicking the label focuses the input, and screen readers announce "Email address" when the field gets focus.

I wrote a full walkthrough of this in [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

## Make Sure the Keyboard Works

Many people never use a mouse. A quick test I do on every page is:

1. Click the address bar.
2. Press Tab repeatedly.
3. Check that I can reach every link, button, and form field in a sensible order.
4. Check that I can always see where the focus is.

That last point is important. Never remove the focus outline without replacing it:

```css
/* Bad: hides focus completely */
button:focus {
  outline: none;
}

/* Better: a clear custom focus style */
button:focus-visible {
  outline: 3px solid #5fb353;
  outline-offset: 2px;
}
```

`:focus-visible` shows the outline for keyboard users but usually not for mouse clicks, which keeps both groups happy.

## Write Clear Link Text

Screen reader users can pull up a list of all links on a page. If every link says "click here," that list is useless.

```html
<!-- Unclear -->
<a href="/pricing">Click here</a> to see our pricing.

<!-- Clear -->
See our <a href="/pricing">pricing plans</a>.
```

The link text should make sense on its own.

## Check Color Contrast

Light gray text on a white background might look stylish, but many people cannot read it. The WCAG guidelines recommend a contrast ratio of at least **4.5:1** for normal text and **3:1** for large text.

Your browser's DevTools can show the contrast ratio when you inspect a text element. I also avoid using color alone to show meaning:

```html
<!-- Color only: red border means error -->
<input class="error">

<!-- Color plus text -->
<input id="age" class="error" aria-describedby="age-error">
<p id="age-error">Please enter a number.</p>
```

## What Is ARIA?

ARIA stands for **Accessible Rich Internet Applications**. It is a set of attributes that add extra accessibility information to HTML.

ARIA does not change how an element looks or behaves. It only changes what assistive technology announces.

The most important rule of ARIA is often called the first rule of ARIA:

> If a native HTML element already does what you need, use it instead of adding ARIA.

In other words, `<button>` is always better than `<div role="button">`.

### ARIA Attributes I Actually Use

Here are a few ARIA attributes that are genuinely useful for beginners.

**`aria-label`** gives a name to an element that has no visible text, like an icon button:

```html
<button type="button" aria-label="Close menu">
  <svg aria-hidden="true" width="16" height="16"><!-- icon --></svg>
</button>
```

**`aria-hidden="true"`** hides decorative things from screen readers, like the icon above.

**`aria-describedby`** links extra help text to a field:

```html
<label for="password">Password</label>
<input id="password" type="password" aria-describedby="password-hint">
<p id="password-hint">At least 12 characters.</p>
```

**`aria-expanded`** tells users whether a toggle is open or closed:

```html
<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>
```

```js
const button = document.querySelector('[aria-controls="menu"]');
const menu = document.getElementById("menu");

button.addEventListener("click", () => {
  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  menu.hidden = isOpen;
});
```

**`aria-live="polite"`** announces content that updates without a page reload, such as "Item added to cart."

## Don't Forget the `lang` Attribute

Screen readers use the `lang` attribute to choose the correct pronunciation.

```html
<html lang="en">
```

It is one small attribute, and it makes a real difference.

## Common Mistakes

### 1. Using `div` or `span` as Buttons

If something performs an action, use `<button>`. If it goes to another page, use `<a href>`.

### 2. Adding ARIA That Repeats or Breaks HTML

```html
<!-- Unnecessary -->
<button role="button">Save</button>

<!-- Harmful: hides a focusable element from screen readers -->
<a href="/about" aria-hidden="true">About</a>
```

Bad ARIA is worse than no ARIA.

### 3. Removing Focus Outlines

`outline: none` without a replacement makes the page unusable for keyboard users.

### 4. Skipping Heading Levels for Looks

Choosing `h4` because it is smaller breaks the page outline. Style headings with CSS instead.

### 5. Missing or Useless Alt Text

`alt="image"` or `alt="photo123.jpg"` tells the user nothing.

## Conclusion

Accessibility felt like an advanced topic when I started, but most of it comes down to habits: use semantic elements, write useful alt text, label form fields, keep the keyboard working, and check contrast.

ARIA is a helpful tool, but it is a supplement, not a replacement for good HTML. Reach for native elements first and add ARIA only when HTML cannot express what you need.

My suggestion is to take one page you have built, unplug your mouse, and try to use it with only the Tab and Enter keys. You will learn more from those five minutes than from any checklist.
