---
title: "CSS Specificity, Cascade and Inheritance Explained"
slug: css-specificity-cascade-inheritance
metaDescription: Learn how the CSS cascade, specificity and inheritance decide which style wins, with simple examples, specificity scores, !important and cascade layers.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Specificity
author: Bishal Biswas
publishDate: 2026-11-29
isDraft: false
category: CSS
tags:
  - CSS specificity
  - CSS cascade
  - CSS inheritance
  - Cascade layers
---

One of the most frustrating moments I had while learning CSS was writing a rule, saving the file, refreshing the page, and seeing… nothing change. The CSS was correct. The selector was correct. But another rule somewhere was winning.

That "somewhere" is controlled by three ideas: the **cascade**, **specificity**, and **inheritance**. Once I understood them, I stopped fighting my own stylesheets.

In this article, I will explain each one with simple examples, show how to calculate specificity, and share the habits that keep my CSS easy to manage.

## The Problem: Multiple Rules, One Element

Look at this:

```html
<p class="intro" id="welcome">Hello!</p>
```

```css
p {
  color: blue;
}

.intro {
  color: green;
}

#welcome {
  color: red;
}
```

All three rules match the same paragraph. The text can only have one color. Which one wins?

The answer is red. To understand why, we need the cascade.

## What Is the Cascade?

The "C" in CSS stands for **Cascading**. The cascade is the algorithm the browser uses to decide which value wins when several rules set the same property on the same element.

In simplified order, the browser checks:

1. **Origin and importance**: Is it a browser default, your stylesheet, or marked `!important`?
2. **Cascade layers**: Which `@layer` is the rule in, if any?
3. **Specificity**: How specific is the selector?
4. **Order of appearance**: If everything else is equal, the rule written later wins.

For most everyday problems, you only need to think about **specificity** and **order**.

## Order of Appearance

When two selectors have the same specificity, the last one wins:

```css
.button {
  background: blue;
}

.button {
  background: green; /* this wins */
}
```

This also applies across files. A stylesheet linked later in the HTML can override one linked earlier.

## What Is Specificity?

Specificity is a score that measures how precisely a selector targets an element. A more specific selector beats a less specific one, no matter the order.

I think of the score as three columns: **(IDs, Classes, Elements)**.

| Selector type | Examples | Adds to |
|---|---|---|
| ID | `#header` | IDs column |
| Class, attribute, pseudo-class | `.card`, `[type="text"]`, `:hover` | Classes column |
| Element, pseudo-element | `p`, `h1`, `::before` | Elements column |
| Universal selector | `*` | Nothing |

### Calculating Specificity

Count each part of the selector:

```css
p                     /* (0, 0, 1) */
.intro                /* (0, 1, 0) */
p.intro               /* (0, 1, 1) */
.card .title          /* (0, 2, 0) */
#welcome              /* (1, 0, 0) */
#nav a:hover          /* (1, 1, 1) */
ul li a               /* (0, 0, 3) */
```

Compare the columns from left to right. The first column with a bigger number wins.

```text
(1, 0, 0) beats (0, 5, 0)
(0, 2, 0) beats (0, 1, 9)
```

One ID beats any number of classes. One class beats any number of elements. That is why `#welcome` won in the first example.

If you need a refresher on these selector types, see my [CSS selectors guide](https://bishal-biswas.github.io/articles/css-selectors-explained).

### Special Cases

- `:is()` and `:not()` take the specificity of their **most specific** argument.
- `:where()` always has **zero** specificity. That makes it great for default styles that are easy to override.

```css
:where(.card) p {
  color: gray; /* specificity (0, 0, 1) */
}
```

## Inline Styles

Styles written in the HTML `style` attribute beat any selector in your stylesheet:

```html
<p class="intro" style="color: purple;">Hello!</p>
```

The text is purple. I avoid inline styles in most projects because they are hard to override and scatter styling across HTML.

## `!important`

Adding `!important` to a declaration moves it ahead of normal declarations, regardless of specificity:

```css
.intro {
  color: green !important;
}

#welcome {
  color: red; /* loses to !important */
}
```

It feels like a quick fix, but it creates a new problem. The only way to override `!important` is another `!important` with equal or higher specificity. Soon, your stylesheet becomes a war of `!important` rules.

I use it only in rare cases, such as utility classes that must always apply, like `.visually-hidden`.

## Cascade Layers

Modern CSS has `@layer`, which is supported in all current browsers. Layers let you decide which groups of styles win, **before** specificity is even checked.

```css
@layer reset, base, components;

@layer base {
  #main p {
    color: gray;
  }
}

@layer components {
  .card p {
    color: black; /* wins, because components is a later layer */
  }
}
```

Even though `#main p` has an ID, the `components` layer is declared later, so it wins. Styles not in any layer beat all layered styles.

As a beginner, you don't need layers right away, but they are very useful once a project grows.

## What Is Inheritance?

Inheritance is different from the cascade. It answers a different question: **if no rule sets a property on an element, does it get a value from its parent?**

Some properties are inherited, and some are not.

```css
body {
  color: #222;
  font-family: system-ui, sans-serif;
  border: 1px solid red;
}
```

```html
<body>
  <p>This paragraph inherits the color and font.</p>
</body>
```

The paragraph gets the `color` and `font-family` from `body`. It does **not** get a red border.

### Inherited vs Not Inherited

| Usually inherited | Not inherited |
|---|---|
| `color` | `margin`, `padding` |
| `font-family`, `font-size`, `font-weight` | `border` |
| `line-height` | `width`, `height` |
| `text-align` | `background` |
| `visibility` | `display` |
| `cursor` | `position` |

The pattern makes sense: text-related properties inherit, while box and layout properties do not. Imagine if every child element inherited its parent's border.

### Inherited Values Lose to Any Direct Rule

This catches a lot of beginners:

```css
#article {
  color: red;
}

p {
  color: blue;
}
```

```html
<div id="article">
  <p>What color am I?</p>
</div>
```

The text is **blue**. Even though `#article` has high specificity, it targets the `div`, not the `p`. Inherited values are only used when nothing targets the element directly, so even a plain `p` selector wins.

### Controlling Inheritance

CSS gives you keywords to control this:

```css
.child {
  color: inherit;   /* take the parent's value */
  border: inherit;  /* force inheritance of a non-inherited property */
  margin: initial;  /* reset to the property's default */
  all: unset;       /* reset everything */
}
```

I use `inherit` often for links and buttons so they match the surrounding text:

```css
button {
  font: inherit;
  color: inherit;
}
```

## Debugging With DevTools

When a style doesn't apply, I right-click the element and choose **Inspect**. In the **Styles** panel, rules that lost the cascade are shown with a line through them. You can hover over a selector to see its specificity in Chrome and Edge. The **Computed** tab shows the final value and where it came from.

## Common Mistakes

### 1. Using IDs for Styling

IDs have very high specificity, which makes them hard to override later. I use classes for styling.

### 2. Reaching for `!important` First

Check specificity and order first. `!important` should be a last resort.

### 3. Writing Overly Long Selectors

`body div.container ul li a.link` is fragile and highly specific. A single class like `.nav-link` is usually enough.

### 4. Confusing Inheritance With Specificity

A high-specificity rule on a parent does not beat a low-specificity rule on the child itself.

### 5. Forgetting Order Across Files

If two files have equal-specificity rules, the one loaded later wins.

## Conclusion

The cascade decides which rule wins, specificity measures how targeted a selector is, and inheritance passes certain values from parent to child.

My simple habits are: style with classes, keep selectors short, avoid `!important`, and let text properties inherit from `body`. Following these, I rarely run into mystery styles anymore. Next, it's worth learning how [the CSS box model](https://bishal-biswas.github.io/articles/css-box-model-explained) works, and how [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties) also follow the inheritance rules.
