---
title: "JavaScript DOM Manipulation Basics"
slug: javascript-dom-manipulation-basics
metaDescription: Learn the basics of JavaScript DOM manipulation, including selecting elements, changing text and styles, toggling classes, and creating or removing elements.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=DOM+Manipulation
author: Bishal Biswas
publishDate: 2026-12-29
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - DOM manipulation
  - querySelector
  - classList
---

The first time I made a button change the text on a page, it felt like magic. Up to that point, my HTML pages just sat there. With a few lines of JavaScript, the page suddenly reacted.

That "magic" is called **DOM manipulation**.

In this article, I will explain what the DOM is, how to select elements, how to change their content, styles and attributes, and how to create and remove elements. I will also cover the mistakes I made most often when I started.

If you are new to HTML itself, it helps to first read [what HTML is and how elements work](https://bishal-biswas.github.io/articles/html-a-beginner-complete-guide).

## What Is the DOM?

DOM stands for **Document Object Model**.

When the browser loads your HTML, it does not keep it as plain text. It turns it into a tree of objects. Each element, piece of text and attribute becomes a node in that tree.

For example, this HTML:

```html
<body>
  <h1>Hello</h1>
  <p>Welcome to my site.</p>
</body>
```

becomes a tree that looks roughly like this:

```text
document
└── html
    └── body
        ├── h1  → "Hello"
        └── p   → "Welcome to my site."
```

JavaScript can read and change this tree. When the tree changes, the browser updates what you see on screen.

The entry point to all of this is the global `document` object.

## Selecting Elements

Before you can change an element, you need to find it.

### querySelector

`document.querySelector()` returns the **first** element that matches a CSS selector:

```js
const title = document.querySelector("h1");
const card = document.querySelector(".card");
const header = document.querySelector("#main-header");
```

Because it uses CSS selector syntax, everything you know from [CSS selectors](https://bishal-biswas.github.io/articles/css-selectors-explained) works here too.

```js
const firstLink = document.querySelector("nav a");
const emailInput = document.querySelector('input[type="email"]');
```

If nothing matches, it returns `null`.

### querySelectorAll

`document.querySelectorAll()` returns **all** matching elements as a `NodeList`:

```js
const items = document.querySelectorAll(".item");

items.forEach((item) => {
  console.log(item.textContent);
});
```

A `NodeList` is not a real array, but it does support `forEach` and `for...of`. If you need array methods like `map` or `filter`, convert it first:

```js
const texts = Array.from(items).map((item) => item.textContent);
```

### getElementById

There is also the older `getElementById()`:

```js
const header = document.getElementById("main-header");
```

Notice there is no `#` here, because it takes an ID, not a selector. It still works fine, but I tend to use `querySelector` everywhere for consistency.

## Changing Text and HTML

### textContent

`textContent` reads or sets the plain text inside an element:

```js
const title = document.querySelector("h1");
title.textContent = "Hello, Bishal!";
```

### innerHTML

`innerHTML` reads or sets the HTML inside an element:

```js
const box = document.querySelector(".box");
box.innerHTML = "<strong>Saved!</strong>";
```

This is powerful, but be careful. Never put user input into `innerHTML`. If a user types `<img src=x onerror="alert(1)">`, the browser will run it. That is a cross-site scripting (XSS) risk.

My rule is simple: use `textContent` for text, and only use `innerHTML` with content I fully control.

## Changing Styles

Every element has a `style` property for inline styles:

```js
const box = document.querySelector(".box");
box.style.backgroundColor = "tomato";
box.style.padding = "20px";
```

CSS property names with dashes become camelCase in JavaScript, so `background-color` becomes `backgroundColor`.

That said, I rarely set many styles directly. It is usually cleaner to keep styles in CSS and toggle classes from JavaScript.

## Working With Classes

The `classList` property is one of the most useful parts of the DOM API:

```js
const menu = document.querySelector(".menu");

menu.classList.add("open");
menu.classList.remove("open");
menu.classList.toggle("open");
console.log(menu.classList.contains("open")); // true or false
```

Then in CSS:

```css
.menu {
  display: none;
}

.menu.open {
  display: block;
}
```

This keeps a clean split: CSS decides how things look, and JavaScript decides when the class is applied.

## Changing Attributes

You can read and change attributes like `src`, `href`, and `alt`:

```js
const img = document.querySelector("img");

img.setAttribute("src", "photo-2.jpg");
img.setAttribute("alt", "A sunset over the river");

console.log(img.getAttribute("alt"));
```

Many common attributes are also available as properties:

```js
const link = document.querySelector("a");
link.href = "https://example.com";
```

For custom `data-*` attributes, use `dataset`:

```html
<button data-user-id="42">View</button>
```

```js
const button = document.querySelector("button");
console.log(button.dataset.userId); // "42"
```

If attributes are new to you, see [HTML attributes like class, id, href and src](https://bishal-biswas.github.io/articles/html-attributes-class-id-href-src).

## Creating and Adding Elements

You can build new elements entirely in JavaScript:

```js
const list = document.querySelector("#todo-list");

const item = document.createElement("li");
item.textContent = "Learn the DOM";
item.classList.add("todo");

list.append(item);
```

The main methods for inserting elements are:

- `append()` adds to the end of a parent
- `prepend()` adds to the start of a parent
- `before()` and `after()` insert next to an element

```js
const heading = document.querySelector("h1");
const note = document.createElement("p");
note.textContent = "Updated today";

heading.after(note);
```

## Removing Elements

Removing is even simpler:

```js
const banner = document.querySelector(".banner");
banner.remove();
```

To clear everything inside an element, I use `replaceChildren()` with no arguments:

```js
list.replaceChildren();
```

## Putting It Together

Here is a tiny example that combines everything. It adds items to a list when you click a button:

```html
<input id="task" type="text" placeholder="New task" />
<button id="add">Add</button>
<ul id="list"></ul>
```

```js
const input = document.querySelector("#task");
const button = document.querySelector("#add");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);

  input.value = "";
});
```

The `addEventListener` part is how we react to clicks. I explain it fully in [JavaScript events and addEventListener](https://bishal-biswas.github.io/articles/javascript-events-addeventlistener).

## Common Mistakes

### 1. Running the Script Before the HTML Exists

If your `<script>` is in the `<head>` without `defer`, it runs before the body is parsed, so `querySelector` returns `null`.

The fix is to add `defer`:

```html
<script src="app.js" defer></script>
```

or place the script just before `</body>`.

### 2. Forgetting That querySelector Can Return null

Calling `.textContent` on `null` throws an error. If an element might not exist, check first or use optional chaining:

```js
document.querySelector(".maybe")?.classList.add("active");
```

### 3. Treating a NodeList Like a Single Element

```js
document.querySelectorAll(".item").textContent = "Hi"; // does nothing useful
```

You need to loop over the list.

### 4. Using innerHTML With User Input

This opens the door to XSS. Use `textContent` instead.

### 5. Setting Lots of Inline Styles

It works, but it mixes styling into JavaScript. Toggling a class is easier to maintain.

## Conclusion

DOM manipulation is how JavaScript brings an HTML page to life. The pattern is almost always the same: select an element, then change its text, classes, attributes or position in the tree.

If you remember `querySelector`, `textContent`, `classList`, `createElement`, `append` and `remove`, you can already build a lot of interactive features.

Once these feel natural, the next step is learning events, so your page can respond to what the user does.
