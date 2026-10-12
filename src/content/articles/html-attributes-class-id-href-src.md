---
title: "HTML Attributes Explained: class, id, href and src"
slug: html-attributes-class-id-href-src
metaDescription: >
  Learn how HTML attributes work with simple examples of class, id, href, and
  src, and understand when to use each attribute in web development.
image: html-attributes-class-id-href-src.webp
author: Bishal Biswas
publishDate: 2026-10-14
isDraft: false
category: Web Development
tags:
  - HTML class attribute
  - HTML id attribute
  - HTML attributes explained
  - HTML basics
  - HTML for beginners
---

When I started learning HTML, I understood that elements were used to create the structure of a webpage. Tags such as `<h1>`, `<p>`, `<a>`, and `<img>` were relatively easy to understand.

Then I started seeing things like `class`, `id`, `href`, and `src` inside those tags.

For example:

```html
<a href="https://example.com" class="button">Visit Website</a>
```

At first, it can look like all of these values are simply extra information added to an HTML tag. But they actually serve different purposes.

These are called **HTML attributes**, and understanding them is one of the important steps toward becoming comfortable with HTML.

In this article, I will explain what HTML attributes are and focus on four attributes that beginners encounter very frequently:

- `class`
- `id`
- `href`
- `src`

---

## What Are HTML Attributes?

HTML attributes provide additional information about an HTML element.

An attribute is normally written inside the opening tag:

```html
<tag attribute="value">
```

For example:

```html
<p class="intro">Hello!</p>
```

Here:

- `<p>` is the HTML element.
- `class` is the attribute.
- `"intro"` is the attribute value.

The attribute gives the browser additional information about how that element should be identified, styled, or used.

An element can also have multiple attributes:

```html
<a href="https://example.com" class="button" id="main-link">
    Visit Website
</a>
```

In this example, the `<a>` element has three attributes:

- `href`
- `class`
- `id`

The important thing to remember is that **different attributes have different purposes**.

---

## 1. The `class` Attribute

The `class` attribute is commonly used to group HTML elements.

It becomes especially useful when working with CSS and JavaScript.

For example:

```html
<p class="highlight">This is an important paragraph.</p>
<p>This is a normal paragraph.</p>
<p class="highlight">This is another important paragraph.</p>
```

We can then use CSS to style every element with the `highlight` class:

```css
.highlight {
    color: red;
    font-weight: bold;
}
```

Both paragraphs with `class="highlight"` will receive the same styling.

### Why Is `class` Useful?

A class allows us to apply the same styling or behavior to multiple elements.

For example:

```html
<button class="button">Save</button>
<button class="button">Cancel</button>
<button class="button">Delete</button>
```

We could style all three buttons together:

```css
.button {
    padding: 10px 16px;
    border-radius: 6px;
}
```

Instead of writing separate CSS for every button, we can reuse the same class.

### An Element Can Have Multiple Classes

An HTML element can have more than one class.

```html
<div class="card featured">
    Product information
</div>
```

This element has two classes:

- `card`
- `featured`

CSS can target either class:

```css
.card {
    padding: 20px;
}

.featured {
    border: 2px solid black;
}
```

This is one reason classes are extremely common in modern web development.

### When Should I Use `class`?

Use a class when:

- Multiple elements need the same styling.
- Multiple elements need to be selected by JavaScript.
- You are creating reusable UI components.
- You want to describe a category or role of an element.

A useful way to think about it is:

> **`class` describes a group or reusable category.**

---

## 2. The `id` Attribute

The `id` attribute identifies a specific element.

For example:

```html
<h1 id="page-title">My Website</h1>
```

Here, `page-title` is the ID of the `<h1>` element.

An ID should be unique within a page.

For example:

```html
<h1 id="page-title">My Website</h1>
```

It would generally be incorrect to give another element the same ID:

```html
<p id="page-title">Another element</p>
```

Instead, use a different ID or a class if the elements belong to the same group.

### Using `id` with CSS

An ID can be selected in CSS using `#`:

```css
#page-title {
    font-size: 40px;
}
```

The `#` tells CSS that we are selecting an element by its ID.

### Using `id` with JavaScript

IDs are also commonly useful when JavaScript needs to find a particular element.

For example:

```html
<button id="hello-button">Click Me</button>
```

JavaScript can find it like this:

```javascript
const button = document.getElementById("hello-button");
```

Now JavaScript can work with that specific button.

### Using `id` for Page Navigation

IDs can also be used to create links to specific sections of a page.

For example:

```html
<a href="#contact">Go to Contact</a>

<h2 id="contact">Contact Me</h2>
```

When the user clicks the link, the browser can navigate to the element with the `contact` ID.

This is also useful for table-of-contents navigation on longer pages.

### When Should I Use `id`?

Use an ID when an element needs a unique identifier within the page.

Common examples include:

- A specific heading
- A unique form element
- A particular button
- A page section used as an anchor
- An element that JavaScript needs to identify uniquely

A simple way to remember it is:

> **`id` identifies one specific element.**

---

## `class` vs `id`

This is one of the first things that confused me when learning HTML.

Both can be used with CSS and JavaScript, so it is easy to wonder why both exist.

The basic difference is:

| Attribute | Main Purpose | Can Be Reused? |
|---|---|---|
| `class` | Groups elements | Yes |
| `id` | Identifies one unique element | Normally no |

For example:

```html
<p class="text">First paragraph</p>
<p class="text">Second paragraph</p>

<p id="special-text">Special paragraph</p>
```

Here, the `text` class can be used by multiple elements, while `special-text` identifies one particular element.

A practical rule for beginners is:

**Use `class` for reusable styles and components. Use `id` when an element needs a unique identity.**

---

## 3. The `href` Attribute

The `href` attribute is commonly used with links.

You will usually see it with the `<a>` element:

```html
<a href="https://example.com">Visit Example</a>
```

Here:

```html
href="https://example.com"
```

tells the browser where the link should go.

The text between the opening and closing `<a>` tags is what the user sees and clicks.

### External Links

An external URL can be used as the value:

```html
<a href="https://developer.mozilla.org/">
    Learn HTML
</a>
```

Clicking the link navigates to that URL.

### Internal Links

The `href` attribute can also point to another page on your own website:

```html
<a href="/about.html">About Me</a>
```

If the website contains an `about.html` page at that location, the browser can navigate there.

### Linking to a Section on the Same Page

As mentioned earlier, `href` can work with an element's ID:

```html
<a href="#projects">My Projects</a>

<section id="projects">
    <h2>Projects</h2>
</section>
```

The `#projects` value tells the browser to look for an element with:

```html
id="projects"
```

### Email Links

The `href` attribute can also be used to create an email link:

```html
<a href="mailto:hello@example.com">
    Email Me
</a>
```

Clicking the link can open the user's configured email application.

### When Should I Use `href`?

Use `href` when you need to specify the destination of a link or navigation.

The easiest way to remember it is:

> **`href` tells a link where to go.**

---

## 4. The `src` Attribute

The `src` attribute is commonly used when an HTML element needs to load an external resource.

One of the most familiar examples is an image:

```html
<img src="profile.jpg" alt="Profile photo">
```

Here:

```html
src="profile.jpg"
```

tells the browser where to find the image.

The browser loads the image from that location and displays it.

### External Images

The source can also be a URL:

```html
<img
    src="https://example.com/images/profile.jpg"
    alt="Profile photo"
>
```

The browser attempts to load the image from that URL.

### `src` Is Not Only for Images

The `src` attribute is used by several HTML elements.

For example, JavaScript can be loaded with:

```html
<script src="app.js"></script>
```

Here, the browser loads the JavaScript file from `app.js`.

Video can also use `src`:

```html
<video src="video.mp4" controls></video>
```

So, in a simple sense:

> **`src` tells an element where the resource it needs to load is located.**

---

## `href` vs `src`

This is another common beginner question.

Both `href` and `src` can contain URLs or file paths, but they serve different purposes.

### `href`

`href` is commonly used to specify a destination or referenced resource.

For example:

```html
<a href="about.html">About</a>
```

The link points to `about.html`.

### `src`

`src` commonly specifies the source of a resource that the element needs to load.

For example:

```html
<img src="photo.jpg" alt="Photo">
```

The image element loads `photo.jpg`.

A simple way to remember the difference:

> **`href` points to a destination or referenced resource. `src` provides the source of a resource that the element loads.**

---

## A Practical Example Using All Four

Let's put `class`, `id`, `href`, and `src` together.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Profile</title>
</head>
<body>

    <header id="top">
        <h1 class="title">My Developer Portfolio</h1>
    </header>

    <img
        class="profile-image"
        src="profile.jpg"
        alt="My profile photo"
    >

    <p class="description">
        I am learning web development and building projects.
    </p>

    <a class="button" href="#projects">
        View My Projects
    </a>

    <section id="projects">
        <h2 class="section-title">Projects</h2>
        <p>Here are some of my projects.</p>
    </section>

</body>
</html>
```

Let's identify the attributes.

### `id`

```html
<header id="top">
```

The `top` ID uniquely identifies the header.

Later, another link could use:

```html
<a href="#top">Back to Top</a>
```

### `class`

```html
<h1 class="title">
```

The `title` class can be styled using CSS.

```css
.title {
    font-size: 2rem;
}
```

The same class could potentially be used by other elements.

### `src`

```html
<img src="profile.jpg">
```

The `src` tells the browser where the image is located.

### `href`

```html
<a href="#projects">
```

The `href` tells the browser where the link should navigate.

In this case, it points to the element with:

```html
id="projects"
```

---

## A Few Common Mistakes

Understanding attributes is not only about knowing what they do. It is also useful to know some mistakes beginners commonly make.

### Mistake 1: Forgetting Quotes

You will normally see attribute values written inside quotes:

```html
<p class="intro">Hello</p>
```

This is the clearest and recommended style.

Avoid writing unnecessarily inconsistent markup such as:

```html
<p class=intro>Hello</p>
```

While some unquoted values can be valid in HTML under specific conditions, using quotes consistently makes your HTML easier to read and maintain.

### Mistake 2: Reusing the Same `id`

Avoid using the same ID for multiple elements:

```html
<p id="description">First</p>
<p id="description">Second</p>
```

If you want multiple elements to share a reusable style or category, a class is usually more appropriate:

```html
<p class="description">First</p>
<p class="description">Second</p>
```

### Mistake 3: Confusing `href` and `src`

For a link:

```html
<a href="about.html">About</a>
```

For an image:

```html
<img src="photo.jpg" alt="Photo">
```

Thinking about what the element is doing can help:

- A link needs a destination, so it uses `href`.
- An image needs an image source, so it uses `src`.

### Mistake 4: Forgetting `alt` on Images

When using an image, you will commonly see:

```html
<img src="photo.jpg" alt="Profile photo">
```

`alt` is not one of the four attributes covered in this article, but it is important to know about.

The `alt` attribute provides alternative text for the image. It can help users who cannot see the image and can also be useful when an image cannot be loaded.

---

## How These Attributes Fit Into CSS and JavaScript

One reason these attributes are important is that HTML, CSS, and JavaScript often work together.

For example:

```html
<button id="save-button" class="primary-button">
    Save
</button>
```

HTML provides the structure.

CSS could use the class:

```css
.primary-button {
    padding: 10px 20px;
}
```

JavaScript could use the ID:

```javascript
const saveButton = document.getElementById("save-button");
```

This gives each technology a different role:

- **HTML** defines the element.
- **CSS** controls its appearance.
- **JavaScript** can control its behavior.

This separation is one of the basic ideas behind frontend development.

---

## What I Would Remember as a Beginner

When I look at these attributes now, I find it easier to remember them based on their purpose rather than memorizing definitions.

```text
class → groups/reuses elements
id    → uniquely identifies an element
href  → tells a link where to go
src   → tells an element where to load a resource from
```

For example:

```html
<a
    id="main-link"
    class="button"
    href="about.html"
>
    About Me
</a>
```

Here:

- `id="main-link"` gives the link a unique identifier.
- `class="button"` puts the link in the `button` styling group.
- `href="about.html"` specifies where the link should navigate.

Another example:

```html
<img
    id="profile-photo"
    class="rounded-image"
    src="profile.jpg"
    alt="Profile photo"
>
```

Here:

- `id` identifies the specific image.
- `class` allows reusable styling.
- `src` specifies the image source.
- `alt` provides alternative text.

---

## Final Thoughts

HTML attributes are a small part of HTML, but they appear almost everywhere once you start building websites.

The four attributes covered here have particularly common uses:

| Attribute | What It Does |
|---|---|
| `class` | Groups elements for reusable styling or behavior |
| `id` | Gives an element a unique identifier |
| `href` | Specifies a link's destination or referenced resource |
| `src` | Specifies the source of a resource that an element loads |

The most important thing is not to memorize every HTML attribute at once. Start by understanding why an attribute exists and then use it in small projects.

As I continue learning HTML, CSS, and JavaScript, these attributes become the connection between the basic HTML structure and the styling, navigation, and behavior added later.

A good next step is to create a small HTML page and experiment with these attributes yourself. Add a few elements, give some of them classes, assign IDs to unique sections, create links with `href`, and load an image with `src`. Once you see how they work together, the syntax becomes much easier to remember.
