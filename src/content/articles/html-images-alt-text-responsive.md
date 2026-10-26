---
title: "HTML Images: src, alt and Responsive Images"
slug: html-images-alt-text-responsive
metaDescription: Learn how to add images in HTML with src and alt, write useful alt text, avoid layout shift, lazy load images and serve responsive images with srcset.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=HTML+Images
author: Bishal Biswas
publishDate: 2026-11-03
isDraft: false
category: HTML
tags:
  - HTML images
  - alt text
  - responsive images
  - srcset
---

Images make a web page feel alive. But images are also one of the main reasons pages load slowly and one of the most common accessibility problems I see.

When I first learned the `img` tag, I only knew about `src`. Later I learned that a few extra attributes make a huge difference to speed, accessibility and how the page looks on different screens.

In this article, I will explain how to add images in HTML, how to write good alt text, and how responsive images work.

## The Basic `img` Tag

Here is the simplest image:

```html
<img src="cat.jpg" alt="A ginger cat sleeping on a sofa">
```

`img` is a **void element**, which means it has no closing tag.

The two attributes you should always include are:

- `src`: the path or URL of the image file.
- `alt`: a text alternative for the image.

The `src` path works the same way as an `href` in a link. It can be relative, root-relative or absolute. I explain those path types in [HTML links explained](https://bishal-biswas.github.io/articles/html-links-anchor-tag-guide).

## Writing Good Alt Text

The `alt` attribute is used when the image cannot be seen. That includes:

- Screen reader users who hear the alt text read aloud.
- Situations where the image fails to load.
- Search engines trying to understand the image.

### Describe the Purpose, Not Just the Pixels

Good alt text describes what the image **means** in that context.

```html
<!-- Too vague -->
<img src="chart.png" alt="Chart">

<!-- Useful -->
<img src="chart.png" alt="Bar chart showing sales doubled from January to June">
```

A few tips I follow:

- Keep it short and specific, usually one sentence.
- Do not start with "Image of" or "Picture of". Screen readers already announce that it is an image.
- If the image contains text, include that text in the alt.

### Images Inside Links

If an image is the only content of a link, the alt text should describe where the link goes:

```html
<a href="/">
  <img src="logo.svg" alt="Bishal Biswas home">
</a>
```

### Decorative Images

Some images are purely decorative, like a background swirl. For these, use an **empty** alt:

```html
<img src="divider-wave.svg" alt="">
```

An empty `alt=""` tells screen readers to skip the image. This is different from leaving `alt` out completely. If `alt` is missing, some screen readers read the file name instead, which is not helpful.

## Width and Height: Preventing Layout Shift

Have you ever started reading a page and then the text suddenly jumped down because an image loaded? That is called **layout shift**.

The fix is to add `width` and `height` attributes:

```html
<img src="photo.jpg" alt="Mountain lake at sunrise" width="1200" height="800">
```

The browser uses these numbers to calculate the image's aspect ratio and reserve the right amount of space before the image loads.

You can still make the image flexible with CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

With this CSS, the image shrinks to fit its container, and the browser still keeps the correct ratio. I put this rule in almost every project.

## Lazy Loading

Images further down the page do not need to load immediately. The `loading` attribute lets the browser wait until the user scrolls near them:

```html
<img src="gallery-1.jpg" alt="Old town street at night"
     width="800" height="600" loading="lazy">
```

Do **not** lazy load the main image at the top of the page, like a hero banner. That image should load as quickly as possible. For that one, you can even give the browser a hint:

```html
<img src="hero.jpg" alt="Laptop on a wooden desk"
     width="1600" height="900" fetchpriority="high">
```

## Responsive Images With `srcset` and `sizes`

A phone does not need the same huge image as a 4K monitor. Responsive images let the browser choose a suitable file.

### Different Resolutions With `srcset`

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Team working together in an office"
  width="1600" height="1067">
```

Here is what each part means:

- `srcset` lists the available files and their real widths (`400w` means 400 pixels wide).
- `sizes` tells the browser how wide the image will be displayed. In this case, full viewport width on screens up to 600px, and half the viewport width otherwise.
- `src` is the fallback for very old browsers.

The browser combines this information with the screen's pixel density and picks the best file. You do not control the exact choice. The browser does.

### Simple Density Switching

For fixed-size images like logos, you can use `x` descriptors instead:

```html
<img src="logo.png" srcset="logo.png 1x, logo@2x.png 2x"
     alt="Company logo" width="200" height="60">
```

High-density screens will download the sharper `@2x` file.

## The `picture` Element

The `picture` element gives you more control. I use it in two situations.

### 1. Modern Formats With a Fallback

```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Sunset over the sea" width="1200" height="800">
</picture>
```

The browser uses the first format it supports. AVIF and WebP files are usually much smaller than JPEG. In 2026, WebP is supported everywhere and AVIF is supported in all major browsers, but keeping a JPEG fallback costs nothing.

### 2. Different Crops for Different Screens

```html
<picture>
  <source media="(max-width: 600px)" srcset="banner-square.jpg">
  <img src="banner-wide.jpg" alt="Our new product on a white table"
       width="1600" height="600">
</picture>
```

On small screens, a square crop is shown. On larger screens, the wide version is used.

Notice that the `img` element is still required inside `picture`. The `alt`, `width` and `height` go on the `img`.

## Images With Captions: `figure` and `figcaption`

When an image needs a visible caption, wrap it in `figure`:

```html
<figure>
  <img src="eiffel.jpg" alt="Eiffel Tower lit up at night"
       width="800" height="1200">
  <figcaption>The Eiffel Tower during the evening light show.</figcaption>
</figure>
```

`figure` is one of the semantic elements I describe in [HTML semantic elements explained](https://bishal-biswas.github.io/articles/html-semantic-elements).

## Choosing an Image Format

Here is the quick guide I use:

| Format | Best for |
|---|---|
| JPEG | Photos when you need maximum compatibility |
| PNG | Screenshots and images needing transparency |
| WebP | Photos and graphics, smaller than JPEG and PNG |
| AVIF | Photos with even better compression |
| SVG | Logos, icons and simple illustrations |

SVG is a vector format, so it stays sharp at any size.

## Common Mistakes

### 1. Missing `alt`

Every `img` should have an `alt` attribute, even if it is empty for decorative images.

### 2. Forgetting Width and Height

Without them, the page jumps when images load. Add the real dimensions and use `height: auto` in CSS.

### 3. Uploading Huge Images

A 5000-pixel-wide photo displayed at 600 pixels wastes data. Resize and compress images before using them, or use `srcset`.

### 4. Lazy Loading the Hero Image

`loading="lazy"` on the first visible image delays it and makes the page feel slower.

### 5. Using Images for Text

Text inside an image cannot be selected, translated or resized easily. Use real HTML text and style it with CSS.

## Conclusion

The `img` tag is easy to use, but doing it well takes a few extra attributes. Always add `src` and meaningful `alt` text. Include `width` and `height` to prevent layout shift. Lazy load images below the fold, and use `srcset`, `sizes` or `picture` to serve the right image to each device.

If you want to go back to the basics of how elements and attributes fit together, my article on [HTML elements and HTML attributes](https://bishal-biswas.github.io/articles/html-elements-html-attributes) is a good place to start.
