---
title: "CSS Colors: Hex, RGB, HSL and When I Use Each"
slug: css-colors-hex-rgb-hsl
metaDescription: Learn CSS color formats with simple examples, including named colors, hex, RGB, HSL, transparency and modern oklch, plus when I use each one in projects.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Colors
author: Bishal Biswas
publishDate: 2026-11-27
isDraft: false
category: CSS
tags:
  - CSS colors
  - Hex color codes
  - RGB and HSL
  - CSS transparency
---

When I first opened someone else's stylesheet, I saw colors written in four different ways: `red`, `#ff0000`, `rgb(255 0 0)`, and `hsl(0 100% 50%)`. I wondered why anyone would need so many ways to say the same thing.

It turns out each format is useful in different situations. In this article, I will explain the main CSS color formats, how transparency works, a quick look at the newer `oklch()`, and when I personally use each one.

## Where Colors Are Used in CSS

Colors show up in many properties:

```css
.card {
  color: #1a1a1a;              /* text color */
  background-color: #ffffff;   /* background */
  border: 1px solid #cccccc;   /* border color */
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
}
```

Every format below can be used in any of these properties.

## Named Colors

CSS has around 140 built-in color names.

```css
h1 {
  color: tomato;
}

.alert {
  background-color: lightyellow;
}
```

Named colors are easy to read and great for quick tests. But you can't fine-tune them, and real brand colors almost never match a name exactly.

Two special keywords are worth knowing:

- `transparent`: fully see-through.
- `currentColor`: uses the element's current `color` value. I use it a lot for icons and borders.

```css
.icon {
  color: #72eb6c;
  border: 2px solid currentColor; /* same green */
}
```

## Hex Colors

Hex is the most common format you will see in design tools and code.

```css
.header {
  background-color: #02162b;
}
```

A hex color has a `#` and six characters: two each for red, green, and blue. Each pair goes from `00` (none) to `ff` (full).

```text
#02162b
 ^^      red   = 02
   ^^    green = 16
     ^^  blue  = 2b
```

Some examples:

| Hex | Color |
|---|---|
| `#000000` | Black |
| `#ffffff` | White |
| `#ff0000` | Red |
| `#00ff00` | Green |
| `#0000ff` | Blue |

### Short Hex

If each pair is a repeated letter, you can shorten it to three characters:

```css
color: #fff;   /* same as #ffffff */
color: #f00;   /* same as #ff0000 */
```

### Hex With Transparency

Add two more characters for alpha (opacity):

```css
background-color: #00000080; /* black at about 50% opacity */
```

**When I use hex:** when copying colors from a design tool like Figma, or for solid brand colors that never change.

## RGB

RGB describes a color with three numbers from 0 to 255 for red, green, and blue.

```css
.box {
  background-color: rgb(2 22 43);
}
```

This is the exact same color as `#02162b`, just written in decimal.

Modern CSS uses spaces between the values. The older comma version still works:

```css
color: rgb(255 99 71);       /* modern */
color: rgb(255, 99, 71);     /* legacy, still valid */
```

### RGB With Transparency

Add a slash and an alpha value from 0 to 1 (or a percentage):

```css
.overlay {
  background-color: rgb(0 0 0 / 0.5); /* 50% black */
}
```

You may also see `rgba(0, 0, 0, 0.5)`. In modern CSS, `rgba()` and `rgb()` are aliases, so either works.

**When I use RGB:** for transparent overlays and shadows, because `rgb(0 0 0 / 0.2)` is very readable.

## HSL

HSL stands for **Hue, Saturation, Lightness**. It describes colors the way people think about them.

```css
.button {
  background-color: hsl(118 77% 67%);
}
```

- **Hue** is a position on the color wheel from 0 to 360 degrees. 0 is red, 120 is green, 240 is blue.
- **Saturation** is how colorful it is. 0% is gray, 100% is fully vivid.
- **Lightness** is how light it is. 0% is black, 100% is white, 50% is the "pure" color.

### Why I Like HSL

HSL makes it easy to create variations of the same color. For a button hover state, I only change the lightness:

```css
.button {
  background-color: hsl(210 80% 45%);
}

.button:hover {
  background-color: hsl(210 80% 38%); /* a bit darker */
}
```

With hex, I would have to guess a whole new code. With HSL, I just move one number.

Transparency works the same way as RGB:

```css
background-color: hsl(210 80% 45% / 0.3);
```

**When I use HSL:** building color palettes, hover and active states, and light and dark versions of a color. It pairs nicely with [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties):

```css
:root {
  --brand-hue: 210;
  --brand: hsl(var(--brand-hue) 80% 45%);
  --brand-light: hsl(var(--brand-hue) 80% 92%);
}
```

## A Quick Look at `oklch()`

`oklch()` is a newer color format supported in all major browsers. It is based on how human eyes perceive brightness.

```css
.badge {
  background-color: oklch(70% 0.15 145);
}
```

- **L**: lightness (0% to 100%)
- **C**: chroma, or colorfulness
- **H**: hue angle

The big advantage is that two colors with the same `L` value actually *look* equally bright. In HSL, a yellow and a blue at 50% lightness look very different in brightness. `oklch()` also reaches the wider color range of modern screens.

As a beginner, you don't need to switch to `oklch()` right away. I mention it because you will see it more and more in modern design systems.

## `opacity` vs Transparent Colors

There is an important difference here:

```css
/* Makes the whole element, including text, see-through */
.card {
  opacity: 0.5;
}

/* Only the background is see-through; text stays solid */
.card {
  background-color: rgb(255 255 255 / 0.5);
}
```

If you only want a see-through background, use a transparent color, not `opacity`.

## Color and Accessibility

Pretty colors don't help if people can't read the text. Always check that your text and background have enough contrast. The WCAG guideline is at least **4.5:1** for normal text.

Browser DevTools show the contrast ratio when you inspect text. I go into more detail on this in [HTML accessibility basics](https://bishal-biswas.github.io/articles/html-accessibility-basics-aria).

## My Quick Rule of Thumb

| Situation | Format I use |
|---|---|
| Copying from a design file | Hex |
| Shadows and overlays | `rgb()` with alpha |
| Hover states and palettes | `hsl()` |
| Modern design systems | `oklch()` |
| Matching text color | `currentColor` |
| Quick experiments | Named colors |

## Common Mistakes

### 1. Forgetting the `#`

`color: 02162b;` is invalid. It must be `#02162b`.

### 2. Using `opacity` for a See-Through Background

`opacity` fades the text too. Use an alpha color instead.

### 3. Mixing Commas and Spaces

`rgb(255, 0 0)` is invalid. Use all commas or all spaces.

### 4. Low Contrast Text

Light gray on white might look clean, but many users can't read it.

### 5. Repeating the Same Color Everywhere

If one hex value appears 30 times in your stylesheet, store it in a CSS variable so you only change it once.

## Conclusion

Hex, RGB, and HSL can all describe the same colors. The difference is how easy each one is to read and adjust. Hex is compact, RGB is clear for transparency, and HSL is the friendliest for making variations. `oklch()` is the modern option to keep an eye on.

My advice is to pick the format that makes your intent clearest. If you want to see how colors fit into selecting elements in the first place, start with my [CSS selectors guide](https://bishal-biswas.github.io/articles/css-selectors-explained).
