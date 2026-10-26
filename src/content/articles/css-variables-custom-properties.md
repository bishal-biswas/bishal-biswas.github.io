---
title: "CSS Variables (Custom Properties) Explained"
slug: css-variables-custom-properties
metaDescription: Learn how CSS variables (custom properties) work, how to declare and use them with var(), fallbacks, scope, theming and changing them with JavaScript.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Variables
author: Bishal Biswas
publishDate: 2026-12-07
isDraft: false
category: CSS
tags:
  - CSS variables
  - CSS custom properties
  - var() function
  - CSS theming
---

When I built my first real website, I used the same green color in about thirty different places. Then I decided the green was a little too bright.

I had to search through the whole stylesheet and change every single value by hand. I missed two of them, of course.

That is exactly the problem CSS variables solve. In this article, I will explain what CSS variables (officially called **custom properties**) are, how to create and use them, how their scope works, and some mistakes I made while learning them.

If you are still getting comfortable with how CSS targets elements, you may want to read [CSS selectors explained with examples](https://bishal-biswas.github.io/articles/css-selectors-explained) first.

## What Are CSS Variables?

A CSS variable is a value that I store once and reuse anywhere in my stylesheet.

Here is the simplest example:

```css
:root {
  --brand-color: #5fb353;
}

.button {
  background-color: var(--brand-color);
}

.link {
  color: var(--brand-color);
}
```

Now, if I want a different green, I change it in one place and every rule that uses `--brand-color` updates automatically.

Two parts make this work:

- **Declaring** the variable: `--brand-color: #5fb353;`
- **Using** the variable: `var(--brand-color)`

## How to Declare a CSS Variable

A custom property name must start with two dashes (`--`). After that, I can use letters, numbers, dashes and underscores.

```css
:root {
  --main-bg: #ffffff;
  --text-color: #1a1a1a;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius: 6px;
}
```

### Why `:root`?

The `:root` pseudo-class selects the top-level element of the document, which is the `<html>` element in a webpage.

Because custom properties are inherited, anything I declare on `:root` is available to every element on the page. That makes `:root` the usual place for "global" variables.

### Names Are Case-Sensitive

This surprised me at first. Normal CSS property names are not case-sensitive, but custom property names are.

```css
:root {
  --Main-Color: red;
}

p {
  color: var(--main-color); /* This does NOT find --Main-Color */
}
```

I now stick to lowercase names with dashes to avoid this completely.

## How to Use a Variable With `var()`

The `var()` function reads the value of a custom property.

```css
.card {
  padding: var(--spacing-md);
  border-radius: var(--radius);
  background: var(--main-bg);
}
```

I can also use variables inside other values:

```css
:root {
  --border-width: 2px;
  --border-color: #5fb353;
}

.box {
  border: var(--border-width) solid var(--border-color);
}
```

And they work nicely with `calc()`:

```css
:root {
  --spacing: 8px;
}

.section {
  padding: calc(var(--spacing) * 3); /* 24px */
}
```

## Fallback Values

The `var()` function accepts a second argument, which is used if the variable is not defined.

```css
.alert {
  color: var(--alert-color, crimson);
}
```

If `--alert-color` does not exist, the browser uses `crimson`.

A fallback can even be another variable:

```css
.alert {
  color: var(--alert-color, var(--text-color, black));
}
```

Fallbacks are useful, but I try not to rely on them too much. If I always need a fallback, it usually means I forgot to define the variable somewhere.

## Scope: Where a Variable Is Available

CSS variables follow the normal cascade and inheritance rules. A variable is available on the element where it is declared and on all of that element's descendants.

```css
:root {
  --text-color: #1a1a1a;
}

.dark-card {
  --text-color: #f5f5f5;
  background: #111;
}

p {
  color: var(--text-color);
}
```

```html
<p>This paragraph uses the dark text.</p>

<div class="dark-card">
  <p>This paragraph uses the light text.</p>
</div>
```

The paragraph inside `.dark-card` picks up the overridden value, because `.dark-card` redefined `--text-color` for itself and its children.

This is one of the most powerful parts of custom properties. I do not need to write a new rule for `.dark-card p`. I just change the variable at the right level.

If inheritance and the cascade still feel confusing, my article on [CSS specificity, cascade and inheritance](https://bishal-biswas.github.io/articles/css-specificity-cascade-inheritance) explains how the browser decides which value wins.

## A Practical Example: Light and Dark Themes

This is where I use CSS variables the most. I define a set of color variables, then swap them for dark mode.

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --accent: #2f7d32;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f1115;
    --text: #e8e8e8;
    --accent: #72eb6c;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}

a {
  color: var(--accent);
}
```

The `body` and `a` rules never change. Only the variable values change when the user's system is in dark mode.

If you want to understand the `@media` part better, see [CSS media queries and responsive design](https://bishal-biswas.github.io/articles/css-media-queries-responsive-design). And for picking the color values themselves, I wrote about [hex, RGB and HSL colors](https://bishal-biswas.github.io/articles/css-colors-hex-rgb-hsl).

## Changing CSS Variables With JavaScript

Because custom properties live in the browser at runtime, JavaScript can read and change them.

```js
const root = document.documentElement;

// Read a variable
const accent = getComputedStyle(root).getPropertyValue("--accent");
console.log(accent.trim());

// Change a variable
root.style.setProperty("--accent", "#ff6b00");
```

Here is a simple theme toggle:

```html
<button id="theme-toggle">Toggle theme</button>
```

```js
const button = document.querySelector("#theme-toggle");

button.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
```

```css
:root.dark {
  --bg: #0f1115;
  --text: #e8e8e8;
}
```

The JavaScript only toggles a class. The CSS variables do all the styling work. For more on selecting and updating elements, see [JavaScript DOM manipulation basics](https://bishal-biswas.github.io/articles/javascript-dom-manipulation-basics).

## CSS Variables vs Sass Variables

If you have used Sass, you might wonder how these are different from `$variables`.

| Feature | CSS custom properties | Sass variables |
|---|---|---|
| Runs in | The browser | The build step |
| Can change at runtime | Yes | No |
| Follow the cascade | Yes | No |
| Can be changed by JavaScript | Yes | No |
| Need a build tool | No | Yes |

Sass variables are replaced with plain values before the CSS ever reaches the browser. CSS variables stay "alive" in the page, which is why theming with them is so easy.

## Common Mistakes

### 1. Forgetting the Two Dashes

```css
:root {
  brand-color: #5fb353; /* Wrong: this is just an invalid property */
}
```

The name must start with `--`.

### 2. Forgetting `var()`

```css
.button {
  background: --brand-color; /* Wrong */
  background: var(--brand-color); /* Right */
}
```

### 3. Using Variables in Media Query Conditions

This does not work:

```css
:root {
  --tablet: 768px;
}

@media (min-width: var(--tablet)) {
  /* This will not work */
}
```

Custom properties are set on elements, and a media query condition is not an element, so `var()` is not allowed there. I just write the number directly.

### 4. Expecting a Fallback to Fix an Invalid Value

The fallback is only used when the variable is not defined. If the variable exists but holds a value that makes no sense for that property, the fallback is ignored.

```css
:root {
  --size: red;
}

.box {
  width: var(--size, 200px); /* Fallback NOT used */
}
```

Here the browser treats `width` as invalid at computed-value time, and `width` falls back to its inherited or initial value (`auto`), not to `200px`.

### 5. Using Variables for Everything

Not every value needs to be a variable. I keep variables for things that repeat or change, such as colors, spacing, font sizes and radii. A one-off `margin-top: 3px` does not need a name.

## Conclusion

CSS variables let me write a value once and reuse it everywhere. I declare them with `--name`, read them with `var(--name)`, and I can override them at any level of the page.

Because they follow the cascade and can be changed with JavaScript, they are perfect for themes, spacing systems and design tokens.

If you take only one thing from this article, let it be this: put your repeated colors and spacing in `:root` variables from day one. Future you will be grateful when the design changes.
