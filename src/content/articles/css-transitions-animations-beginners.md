---
title: "CSS Transitions and Animations for Beginners"
slug: css-transitions-animations-beginners
metaDescription: Learn CSS transitions and keyframe animations from scratch, with simple examples, timing functions, performance tips and reduced motion support.
image: https://placehold.co/1200x630/02162b/72eb6c/png?text=CSS+Animations
author: Bishal Biswas
publishDate: 2026-12-11
isDraft: false
category: CSS
tags:
  - CSS transitions
  - CSS animations
  - keyframes
  - prefers-reduced-motion
---

The first time I added a hover effect to a button, the color changed instantly. It worked, but it felt a bit harsh. Then I added one line of CSS, `transition: background-color 0.2s;`, and suddenly the button felt smooth and polished.

That one line got me curious about motion in CSS. In this article, I will explain the two main tools CSS gives us for movement: **transitions** and **animations**. I will show how each one works, when I use which, and the mistakes I made along the way.

## Transitions vs Animations

Before the details, here is the main difference:

- A **transition** animates a change from one value to another when something triggers it, such as `:hover` or a class being added.
- An **animation** uses `@keyframes` to define a sequence of steps. It can run on its own, loop, and go through many states.

I think of it like this:

> A transition is "go smoothly from A to B". An animation is "follow this whole script".

## CSS Transitions

### A Basic Transition

```css
.button {
  background-color: #2f7d32;
  color: white;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #1b5e20;
}
```

When the mouse moves over the button, the background fades to the darker green over 0.2 seconds. When the mouse leaves, it fades back.

Notice that the `transition` goes on the normal `.button` rule, not only on `:hover`. That way the transition runs in both directions. If you are new to `:hover`, I covered it in [CSS pseudo-classes and pseudo-elements](https://bishal-biswas.github.io/articles/css-pseudo-classes-pseudo-elements).

### The Transition Properties

The `transition` shorthand combines four properties:

```css
.box {
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
}

/* Same thing as a shorthand */
.box {
  transition: transform 0.3s ease-out 0s;
}
```

- **property**: which CSS property to animate
- **duration**: how long it takes
- **timing function**: how the speed changes over time
- **delay**: how long to wait before starting

### Transitioning Several Properties

I separate them with commas:

```css
.card {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
```

This creates the popular "card lifts up on hover" effect.

You can also write `transition: all 0.3s;`, but I try to avoid `all`. It can accidentally animate properties I did not intend to animate, and it makes the CSS harder to reason about.

### Timing Functions

The timing function controls the feel of the motion.

```css
.a { transition-timing-function: linear; }      /* same speed the whole time */
.b { transition-timing-function: ease; }        /* default: slow, fast, slow */
.c { transition-timing-function: ease-in; }     /* starts slow */
.d { transition-timing-function: ease-out; }    /* ends slow */
.e { transition-timing-function: ease-in-out; } /* slow at both ends */
.f { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); } /* a little bounce */
```

For most user interface effects, I use `ease-out`. Things that react to the user should start quickly and settle gently.

### Triggering a Transition With JavaScript

Transitions run whenever a value changes, so toggling a class works too:

```css
.panel {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.panel.is-open {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const panel = document.querySelector(".panel");
const button = document.querySelector("#toggle");

button.addEventListener("click", () => {
  panel.classList.toggle("is-open");
});
```

JavaScript only switches the class. CSS handles the motion. I explain event listeners properly in [JavaScript events and addEventListener](https://bishal-biswas.github.io/articles/javascript-events-addeventlistener).

## CSS Animations

### Step 1: Define Keyframes

`@keyframes` describes what happens during the animation.

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

I can also use percentages for more steps:

```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
```

### Step 2: Apply the Animation

```css
.notification-dot {
  animation: pulse 1.5s ease-in-out infinite;
}
```

That shorthand means: use the `pulse` keyframes, take 1.5 seconds per cycle, use `ease-in-out`, and repeat forever.

### The Animation Properties

```css
.loader {
  animation-name: spin;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

The two I had to look up most often were:

- **`animation-direction`**: `normal`, `reverse`, `alternate` (forward then backward) or `alternate-reverse`.
- **`animation-fill-mode`**: what styles apply before and after the animation. `forwards` keeps the final keyframe after the animation ends, which is very useful for one-time entrance effects.

```css
.hero-title {
  opacity: 0;
  animation: fade-in 0.6s ease-out 0.2s forwards;
}
```

Without `forwards`, the title would fade in and then jump back to `opacity: 0`.

## When I Use Which

| Situation | I use |
|---|---|
| Hover, focus or active effects | Transition |
| Opening and closing a menu with a class | Transition |
| A loading spinner | Animation |
| Something that loops or pulses | Animation |
| An entrance effect when the page loads | Animation |
| Motion with more than two steps | Animation |

## Performance: Animate the Cheap Properties

Some properties are much cheaper for the browser to animate than others. `transform` and `opacity` can usually be handled by the compositor without recalculating layout, so they stay smooth.

Animating `width`, `height`, `top`, `left` or `margin` forces the browser to recalculate layout on every frame, which can feel janky on slower devices.

```css
/* Less smooth */
.box:hover {
  left: 20px;
}

/* Smoother */
.box:hover {
  transform: translateX(20px);
}
```

So my rule is: whenever I can, move things with `transform` and fade them with `opacity`.

## Respect Reduced Motion

Some people get dizzy or unwell from motion on screen, and they can turn on a "reduce motion" setting in their operating system. CSS can detect it with a media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This is a common reset that removes most motion for people who ask for it. A gentler approach is to add motion only when the user has not asked to reduce it:

```css
@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 0.25s ease;
  }
}
```

If media queries are new to you, see [CSS media queries and responsive design](https://bishal-biswas.github.io/articles/css-media-queries-responsive-design).

## Common Mistakes

### 1. Putting the Transition Only on `:hover`

```css
.button:hover {
  background: #1b5e20;
  transition: background 0.2s; /* Only animates on the way in */
}
```

Put the `transition` on the base rule so it animates both ways.

### 2. Trying to Transition `display`

Historically, `display: none` to `display: block` would not transition at all. Newer CSS features like `transition-behavior: allow-discrete` and `@starting-style` make this possible in modern browsers, but for beginners I still recommend fading with `opacity` and hiding with `visibility`, which is simple and widely supported.

### 3. Transitioning to or From `auto`

`height: 0` to `height: auto` does not animate by default, because the browser cannot interpolate to `auto`. Newer CSS (`interpolate-size: allow-keywords`) is starting to solve this in some browsers, but it is not supported everywhere yet, so check support before relying on it.

### 4. Making Animations Too Long

Interface animations should usually be short, often between 150ms and 400ms. Anything longer starts to feel slow, especially when users trigger it many times.

### 5. Forgetting `animation-fill-mode`

If an element snaps back after an entrance animation, you probably need `forwards`.

## Conclusion

Transitions and animations are two sides of the same idea. A transition smoothly moves between two values when something changes. An animation follows a set of keyframes and can run on its own, repeat and have many steps.

Start with small transitions on buttons and links, prefer `transform` and `opacity`, keep durations short, and always respect `prefers-reduced-motion`. If you want to keep timing values consistent across your project, store them in [CSS variables](https://bishal-biswas.github.io/articles/css-variables-custom-properties), for example `--speed-fast: 0.15s`.

A little motion goes a long way. The best animations are the ones users feel but barely notice.
