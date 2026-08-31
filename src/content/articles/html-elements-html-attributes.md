---
title: HTML Elements vs HTML Attributes
slug: html-elements-html-attributes
featuredImage: article-thumbnail-1-.jpg
author: Bishal Biswas
publishDate: 2026-08-31
isDraft: false
category: Web Development
tags:
  - HTML
  - HTML Elements
  - HTML Attributes
---
# HTML Elements vs HTML Attributes: What's the Difference?

When I was learning HTML, one of the things that confused me at first was the difference between an **HTML element** and an **HTML attribute**.

I understood that HTML used tags such as `<p>`, `<h1>`, `<a>`, and `<img>`, but then I started seeing things like `href`, `src`, `class`, `id`, and `alt` inside those tags.

I wondered, "Are those also HTML elements?"

The answer is no.

HTML elements and HTML attributes have different purposes. Once you understand that difference, reading and writing HTML becomes much easier.

In this article, I will explain HTML elements and attributes from the ground up, show you how they work together, and give you practical examples that you will encounter in almost every web project.

## What Is an HTML Element?

An HTML element is a building block of an HTML document.

It tells the browser what a particular piece of content represents.

For example:

```html
<h1>My Website</h1>
```

This is an HTML element.

It tells the browser that "My Website" is a top-level heading.

Another example:

```html
<p>Welcome to my website.</p>
```

This represents a paragraph.

We can use different HTML elements for different types of content:

```html
<h1>A Heading</h1>

<p>A paragraph.</p>

<a href="https://example.com">A Link</a>

<button>Click Me</button>
```

Each of these represents a different type of content or functionality.

## What Is an HTML Tag?

Before going further, I want to clear up one small terminology issue.

You will often hear developers use the words **tag** and **element** interchangeably, but technically they are not exactly the same thing.

Consider this:

```html
<p>Hello World</p>
```

The opening tag is:

```html
<p>
```

The closing tag is:

```html
</p>
```

The complete structure:

```html
<p>Hello World</p>
```

is the HTML element.

So I generally think of it this way:

**Tag:** The markup such as `<p>` or `</p>`.

**Element:** The complete HTML structure containing the tag and its content.

This distinction becomes useful when we start talking about attributes.

## What Is an HTML Attribute?

An HTML attribute provides additional information about an HTML element.

Attributes are written inside the opening tag.

For example:

```html
<a href="https://example.com">Visit Website</a>
```

Here:

```text
<a>                  Element
href="https://example.com"   Attribute
Visit Website        Content
```

The `href` attribute tells the browser where the link should take the user.

Without `href`, the `<a>` element would not have a destination specified.

Another example:

```html
<img src="profile.jpg" alt="Profile picture">
```

Here, `src` and `alt` are attributes.

The element is:

```html
<img>
```

The attributes provide additional information:

```text
src="profile.jpg"
alt="Profile picture"
```

So the easiest definition I use is:

> **An HTML element defines what something is, while an HTML attribute provides additional information about that element.**

## HTML Element vs HTML Attribute

Let's compare them directly.

| HTML Element | HTML Attribute |
|---|---|
| Defines the structure or meaning of content | Provides additional information |
| Usually appears as a tag | Appears inside an opening tag |
| Can contain content | Usually contains a value |
| Examples: `<p>`, `<h1>`, `<img>` | Examples: `id`, `class`, `href`, `src` |
| Creates the actual HTML structure | Modifies or describes the element |

For example:

```html
<a href="https://example.com">Example</a>
```

Here:

- `<a>` is the element/tag.
- `href` is the attribute.
- `"https://example.com"` is the attribute value.
- `Example` is the content.

## Anatomy of an HTML Element With Attributes

Let's look at a slightly more detailed example:

```html
<p class="intro" id="welcome">
    Welcome to my website.
</p>
```

We can break this down into several parts.

```text
<p
    class="intro"
    id="welcome">
    
    Welcome to my website.
    
</p>
```

Here:

- `<p>` is the paragraph element.
- `class` is an attribute.
- `"intro"` is the value of the `class` attribute.
- `id` is another attribute.
- `"welcome"` is the value of the `id` attribute.
- `Welcome to my website.` is the content.

This is an important pattern to understand because you will see it constantly when working with HTML, CSS, JavaScript, React, and Angular.

## How Are Attributes Written?

Most HTML attributes follow this pattern:

```html
attribute="value"
```

For example:

```html
class="container"
```

Here:

```text
class  → Attribute name
container → Attribute value
```

Put together:

```html
<div class="container">
    Content
</div>
```

The `class` attribute tells us that this `<div>` belongs to the `container` class.

## Can an Element Have Multiple Attributes?

Yes.

An HTML element can have multiple attributes.

For example:

```html
<img
    src="profile.jpg"
    alt="Profile picture"
    width="300"
    height="300">
```

This image element has several attributes:

- `src`
- `alt`
- `width`
- `height`

Each attribute provides additional information about the image.

Similarly, a link can have multiple attributes:

```html
<a
    href="https://example.com"
    target="_blank"
    title="Visit Example">
    Visit Website
</a>
```

Here we have three attributes:

```text
href
target
title
```

The order of attributes generally does not matter.

For example:

```html
<a href="https://example.com" target="_blank">
    Visit
</a>
```

and:

```html
<a target="_blank" href="https://example.com">
    Visit
</a>
```

represent the same basic information.

## Common HTML Elements

There are many HTML elements, but you will use some much more frequently than others.

### `<h1>` to `<h6>`

These are heading elements.

```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
```

### `<p>`

Used for paragraphs.

```html
<p>This is a paragraph.</p>
```

### `<a>`

Used to create links.

```html
<a href="https://example.com">Visit Website</a>
```

### `<img>`

Used to display images.

```html
<img src="photo.jpg" alt="A mountain">
```

### `<div>`

A generic container.

```html
<div>
    Some content
</div>
```

### `<button>`

Creates a button.

```html
<button>Submit</button>
```

### `<form>`

Used to create forms.

```html
<form>
    ...
</form>
```

These are just a few examples. HTML contains many more elements for different purposes.

## Common HTML Attributes

Just as there are commonly used elements, there are attributes that you will encounter frequently.

### `id`

The `id` attribute identifies a specific element.

```html
<p id="introduction">
    Welcome to my website.
</p>
```

An `id` should generally be unique within a page.

It can be useful when working with CSS or JavaScript.

For example:

```javascript
const element = document.getElementById("introduction");
```

### `class`

The `class` attribute is used to assign one or more classes to an element.

```html
<p class="description">
    This is my website.
</p>
```

An element can have multiple classes:

```html
<p class="description highlighted">
    This is my website.
</p>
```

Classes are commonly used with CSS and JavaScript.

### `href`

The `href` attribute specifies the destination of a link.

```html
<a href="/about">About Me</a>
```

It can point to another page:

```html
<a href="/contact">Contact</a>
```

or an external website:

```html
<a href="https://example.com">Example</a>
```

### `src`

The `src` attribute specifies the source of an external resource.

For example:

```html
<img src="photo.jpg" alt="My photo">
```

Here, `src` tells the browser which image to load.

You will also encounter `src` with elements such as `<script>`.

### `alt`

The `alt` attribute provides alternative text for an image.

```html
<img src="dog.jpg" alt="A brown dog sitting on grass">
```

This is particularly important for accessibility.

If the image cannot be displayed, the alternative text can provide information about what the image represents.

### `title`

The `title` attribute can provide additional information about an element.

```html
<button title="Save your changes">
    Save
</button>
```

When appropriate, browsers can display this information as a tooltip.

## Boolean Attributes

Not every HTML attribute needs a value.

Some attributes are called **boolean attributes**.

For example:

```html
<input type="text" disabled>
```

The `disabled` attribute indicates that the input is disabled.

You may also see:

```html
<input type="checkbox" checked>
```

Here, `checked` indicates that the checkbox is selected.

Other examples include:

```html
<input required>
```

and:

```html
<button disabled>Submit</button>
```

The presence of the attribute is what matters.

## Element Without Attributes

An HTML element does not necessarily need an attribute.

For example:

```html
<h1>Hello World</h1>
```

There are no attributes here.

The element still works perfectly.

Another example:

```html
<p>Hello, I am learning HTML.</p>
```

Again, no attributes are required.

## Element With Attributes

Now let's add an attribute:

```html
<p class="intro">
    Hello, I am learning HTML.
</p>
```

The `class` attribute gives additional information about the paragraph.

The element still remains a paragraph.

The attribute does not replace the element.

This is an important concept for beginners.

## An Attribute Does Not Exist Independently

An attribute is normally associated with an HTML element.

For example:

```html
class="container"
```

by itself is not a complete HTML structure.

Instead, we use it with an element:

```html
<div class="container">
    Content
</div>
```

Here, `class="container"` provides information about the `<div>` element.

The same applies to:

```html
href="/about"
```

We normally use it with an anchor element:

```html
<a href="/about">About</a>
```

## A Real-World Example

Let's put everything together.

Suppose I want to create a simple profile section.

I could write:

```html
<section id="profile" class="profile-card">

    <img
        src="bishal.jpg"
        alt="Profile photo">

    <h2 class="profile-name">
        Bishal Biswas
    </h2>

    <p class="profile-description">
        I am a software developer and technical writer.
    </p>

    <a
        href="/contact"
        class="contact-link">
        Contact Me
    </a>

</section>
```

There are several elements here:

```text
<section>
<img>
<h2>
<p>
<a>
```

There are also several attributes:

```text
id
class
src
alt
href
```

The elements create the structure.

The attributes provide additional information about those elements.

Once you start seeing HTML this way, complicated-looking markup becomes much easier to understand.

## HTML Elements and Attributes Work Together

I don't think of elements and attributes as competing concepts.

They work together.

Consider:

```html
<input
    type="email"
    id="email"
    name="email"
    placeholder="Enter your email"
    required>
```

The `<input>` element tells the browser that this is an input control.

The attributes tell the browser more about that input:

```text
type="email"
```

The input is intended for an email address.

```text
id="email"
```

Gives the element an identifier.

```text
name="email"
```

Provides its form field name.

```text
placeholder="Enter your email"
```

Provides placeholder text.

```text
required
```

Makes the field required.

One element can therefore have several attributes that change its behavior or provide additional information.

## Element vs Attribute: A Simple Analogy

When I explain this concept to someone completely new to HTML, I like using a simple analogy.

Imagine a person.

The **HTML element** is like the person themselves.

The **attributes** are information describing that person.

For example:

```text
Person
├── Name
├── Age
├── Occupation
└── Location
```

Similarly:

```html
<div
    class="profile"
    id="user-profile">
    My Profile
</div>
```

The `<div>` is the element.

The `class` and `id` provide additional information about it.

This isn't a perfect technical analogy, but it is useful when you're just getting started.

## Do HTML Attributes Change the Element?

Some attributes affect how an element behaves or how it is interpreted.

For example:

```html
<a href="/about">About</a>
```

The `href` gives the link its destination.

Similarly:

```html
<input type="password">
```

The `type` attribute changes the kind of input control.

And:

```html
<img src="photo.jpg" alt="My photo">
```

The `src` tells the browser which image to load.

So attributes can significantly affect an element's behavior, meaning, or configuration.

## HTML Elements vs Attributes in CSS

You will also see the difference when working with CSS.

Suppose I have:

```html
<p class="important">
    This is important.
</p>
```

The `<p>` is the element.

The `class="important"` is an attribute.

CSS can target the element:

```css
p {
    font-size: 18px;
}
```

Or it can target the class:

```css
.important {
    font-weight: bold;
}
```

Understanding this distinction becomes very useful once you start learning CSS.

## HTML Elements vs Attributes in JavaScript

JavaScript also interacts with both elements and their attributes.

For example:

```html
<button id="saveButton">
    Save
</button>
```

JavaScript can find the element using its `id`:

```javascript
const button = document.getElementById("saveButton");
```

JavaScript can also read or modify attributes.

For example:

```javascript
button.setAttribute("title", "Save your changes");
```

Now the button has a `title` attribute.

This is one of the reasons understanding HTML is important before going deeply into JavaScript and frontend frameworks.

## Common Beginner Mistakes

There are a few mistakes I see frequently when someone is learning HTML.

### Thinking `class` Is an Element

This is incorrect:

```text
class
```

is not an HTML element.

It is an attribute.

For example:

```html
<div class="container">
```

Here:

```text
div       → Element
class     → Attribute
container → Attribute value
```

### Thinking `href` Is a Tag

Another common misunderstanding is thinking:

```text
href
```

is an HTML tag.

It isn't.

It is an attribute used with elements such as `<a>`.

```html
<a href="/about">About</a>
```

### Putting Attributes Outside the Opening Tag

This is incorrect:

```html
<p>
    class="intro"
    Hello World
</p>
```

The attribute belongs inside the opening tag:

```html
<p class="intro">
    Hello World
</p>
```

### Confusing Attribute Values With Attributes

Consider:

```html
<img src="photo.jpg">
```

Here:

```text
src       → Attribute
photo.jpg → Attribute value
```

`photo.jpg` is not the attribute. It is the value assigned to the `src` attribute.

## Quick Way to Remember the Difference

If you are still confused, remember this simple rule:

> **Element = What it is**

> **Attribute = Additional information about it**

For example:

```html
<a href="/about" class="navigation-link">
    About
</a>
```

Think of it like this:

```text
<a>                    What is it?
  ↓
Link

href="/about"          Where does it go?
class="navigation-link" How is it categorized?
```

The element defines the basic thing.

The attributes give it additional information.

## Final Thoughts

Understanding HTML elements and attributes is one of those small concepts that makes a big difference when you're learning web development.

At first, HTML can look like a collection of random symbols:

```html
<div class="container" id="main">
```

But once you break it down, it becomes much easier:

```text
<div>
  ↓
HTML element

class="container"
  ↓
HTML attribute

id="main"
  ↓
HTML attribute
```

The key thing I want you to remember is:

**HTML elements create the structure of a web page.**

**HTML attributes provide additional information or configuration for those elements.**

Once you understand this distinction, many other HTML concepts become easier to learn.

And when you eventually move into CSS, JavaScript, React, Angular, or other frontend technologies, this knowledge will continue to be useful.

You don't need to memorize every HTML element or attribute right now.

Start with the commonly used ones, write some HTML yourself, inspect existing websites using your browser's developer tools, and gradually learn more as you build.

That is how I recommend learning HTML in practice.
