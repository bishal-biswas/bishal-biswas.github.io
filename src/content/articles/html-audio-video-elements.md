---
title: "HTML Audio and Video Elements Explained"
slug: html-audio-video-elements
metaDescription: Learn how to add audio and video to a web page with HTML, including controls, autoplay rules, multiple sources, captions with track and poster images.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=HTML+Media
author: Bishal Biswas
publishDate: 2026-11-09
isDraft: false
category: HTML
tags:
  - HTML video
  - HTML audio
  - autoplay
  - video captions
---

Before HTML5, playing a video on a web page usually meant installing a plugin like Flash. Today, browsers can play audio and video natively with two simple elements: `audio` and `video`.

When I first added a video to a page, I expected it to autoplay with sound. It did not, and I spent a while wondering why. The answer was browser autoplay rules, which I will explain below.

In this article, I will cover how the `audio` and `video` elements work, the attributes I use most, how to add captions, and the common mistakes to avoid.

## The `video` Element

Here is a basic video:

```html
<video src="intro.mp4" controls width="640" height="360">
  Your browser does not support the video element.
</video>
```

- `src` points to the video file.
- `controls` shows the browser's built-in play button, timeline, volume and fullscreen controls.
- `width` and `height` reserve space for the video, which prevents the page from jumping when it loads.

The text inside the element is fallback content. Modern browsers all support `video`, so it is rarely shown, but it does not hurt to include it.

Without the `controls` attribute, the video appears as a still frame with no way to play it, unless you build your own controls with JavaScript.

## The `audio` Element

The `audio` element works almost the same way:

```html
<audio src="podcast-episode-1.mp3" controls>
  Your browser does not support the audio element.
</audio>
```

With `controls`, the browser shows a small player bar. Without `controls`, the audio element is invisible.

## Providing Multiple Sources

Different browsers support different formats. To be safe, you can offer several files using `source` elements:

```html
<video controls width="640" height="360">
  <source src="intro.webm" type="video/webm">
  <source src="intro.mp4" type="video/mp4">
  <p>Your browser cannot play this video. <a href="intro.mp4">Download it instead</a>.</p>
</video>
```

The browser tries each `source` from top to bottom and plays the first one it supports. The `type` attribute helps the browser skip formats it cannot play without downloading them.

In 2026, MP4 with H.264 video and AAC audio plays in every major browser, so a single MP4 file is often enough. WebM is a good open alternative that also has wide support. For audio, MP3 works everywhere, and AAC and Opus are good options too.

## Useful Attributes

Here are the attributes I use most often.

### `poster`

```html
<video src="intro.mp4" controls poster="intro-thumbnail.jpg"
       width="640" height="360"></video>
```

The `poster` image is shown before the video starts playing. Without it, the browser shows the first frame, which is often a black screen.

### `preload`

```html
<video src="intro.mp4" controls preload="metadata"></video>
```

`preload` is a hint about how much to download before the user presses play:

- `none`: download nothing until play is pressed.
- `metadata`: download only basic information like duration and dimensions.
- `auto`: the browser may download the whole file.

I usually use `metadata` or `none` to save data, especially for long videos on mobile.

### `loop` and `muted`

```html
<video src="background.mp4" loop muted></video>
```

- `loop` restarts the media when it ends.
- `muted` starts the media with the sound off.

### `playsinline`

```html
<video src="clip.mp4" autoplay muted playsinline loop></video>
```

On iPhones, videos may open in fullscreen when they start playing. `playsinline` keeps them inside the page layout.

## Autoplay Rules

This is the part that confused me at first.

Browsers block autoplay **with sound** in most cases. They do not want pages to suddenly start making noise. So this usually will not autoplay:

```html
<video src="promo.mp4" autoplay></video>
```

But this usually will:

```html
<video src="promo.mp4" autoplay muted playsinline loop></video>
```

Muted autoplay is generally allowed. Autoplay with sound is only allowed in certain situations, for example after the user has interacted with the site.

My advice: do not depend on autoplay with sound. If a video is important, let the user press play. If it is a decorative background video, make it muted, and keep it short and small in file size.

Also think about users who prefer less motion. You can pause decorative videos for them with a small script that checks `prefers-reduced-motion`.

## Captions and Subtitles With `track`

Captions make video accessible to deaf and hard-of-hearing users. They also help people watching in a noisy place or with the sound off.

You add captions with the `track` element:

```html
<video controls width="640" height="360">
  <source src="lesson.mp4" type="video/mp4">
  <track src="lesson-en.vtt" kind="captions" srclang="en" label="English" default>
  <track src="lesson-bn.vtt" kind="subtitles" srclang="bn" label="বাংলা">
</video>
```

- `kind` describes the track: `captions` include sounds and speaker information, while `subtitles` are translations of the dialogue.
- `srclang` is the language code.
- `label` is the name shown in the captions menu.
- `default` turns that track on automatically.

Caption files use the **WebVTT** format. A simple `.vtt` file looks like this:

```text
WEBVTT

00:00:00.000 --> 00:00:03.500
Hi, welcome to this HTML lesson.

00:00:03.500 --> 00:00:07.000
Today we will learn about the video element.
```

One gotcha: if the `.vtt` file is on a different domain from the page, it needs the right CORS setup, otherwise the browser will not load it.

## Controlling Media With JavaScript

Both elements have a JavaScript API. Here is a simple custom play button:

```html
<video id="lesson" src="lesson.mp4" width="640" height="360"></video>
<button type="button" id="toggle">Play</button>
```

```js
const video = document.querySelector("#lesson");
const button = document.querySelector("#toggle");

button.addEventListener("click", async () => {
  if (video.paused) {
    await video.play();
    button.textContent = "Pause";
  } else {
    video.pause();
    button.textContent = "Play";
  }
});
```

`play()` returns a promise. It can be rejected if the browser blocks playback, so in real projects I wrap it in `try...catch`. If JavaScript is still new to you, I share my learning path in [JavaScript before React](https://bishal-biswas.github.io/articles/javascript-before-heading-react).

Notice that I used a `button` for this action, not a link. Buttons are for actions, as I explain in [HTML links explained](https://bishal-biswas.github.io/articles/html-links-anchor-tag-guide).

## Making Videos Responsive

To make a video shrink on small screens, I use the same trick as with images:

```css
video {
  max-width: 100%;
  height: auto;
}
```

Because I set `width` and `height` attributes in the HTML, the browser keeps the correct aspect ratio while resizing. The same approach is covered in [HTML images: src, alt and responsive images](https://bishal-biswas.github.io/articles/html-images-alt-text-responsive).

## Self-Hosted Video vs YouTube

Hosting a video yourself with `video` gives you full control and no third-party tracking. But video files are large, and serving them can be expensive and slow without a good CDN.

For long videos, many people embed a player from YouTube or Vimeo using an `iframe` instead. I explain that approach in [HTML iframe: how to embed other pages safely](https://bishal-biswas.github.io/articles/html-iframe-embed-content).

## Common Mistakes

### 1. Forgetting `controls`

Without `controls` and without custom JavaScript controls, users have no way to play the media.

### 2. Expecting Autoplay With Sound

Browsers will usually block it. Use `muted` for autoplay, or let users press play.

### 3. No Captions

Videos with speech should have captions. They help many more people than you might expect.

### 4. Huge, Uncompressed Files

A raw screen recording can be hundreds of megabytes. Compress your video and pick a sensible resolution before uploading.

### 5. Missing Poster and Dimensions

Without them, users see a black box and the layout may jump while loading.

## Conclusion

The `audio` and `video` elements let you play media without any plugins. Add `controls` so users can play and pause, use `source` elements if you want multiple formats, and set `poster`, `width` and `height` for a better first impression.

Remember that autoplay with sound is usually blocked, so only autoplay muted videos. And always add captions with `track` when your video includes speech. These small details make your media much more pleasant and accessible for everyone.
