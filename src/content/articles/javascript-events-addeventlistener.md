---
title: "JavaScript Events and addEventListener Explained"
slug: javascript-events-addeventlistener
metaDescription: Learn how JavaScript events work, how to use addEventListener, the event object, preventDefault, bubbling, and event delegation with beginner examples.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Events
author: Bishal Biswas
publishDate: 2026-12-31
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - JavaScript events
  - addEventListener
  - Event delegation
---

A web page that cannot react to the user is just a document. Events are what turn it into an app.

Every time someone clicks a button, types in a field, submits a form or scrolls the page, the browser fires an **event**. JavaScript can listen for those events and run code in response.

In this article, I will explain how events work, how to use `addEventListener`, what the event object is, and how bubbling and event delegation work. These last two confused me for a long time, so I will try to keep them simple.

If you have not yet learned how to select and change elements, I recommend reading [JavaScript DOM manipulation basics](https://bishal-biswas.github.io/articles/javascript-dom-manipulation-basics) first.

## What Is an Event?

An event is a signal that something happened. Some common examples are:

- `click` when an element is clicked
- `input` when the value of a field changes
- `submit` when a form is submitted
- `keydown` when a key is pressed
- `DOMContentLoaded` when the HTML has been fully parsed

Your job is to say: "When this event happens on this element, run this function."

## Using addEventListener

The standard way to listen for an event is `addEventListener`:

```html
<button id="like">Like</button>
```

```js
const button = document.querySelector("#like");

button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

It takes two main arguments:

1. The event type as a string (`"click"`)
2. A function to run when the event happens (the **listener** or **handler**)

You can also pass a named function:

```js
function handleClick() {
  console.log("Liked!");
}

button.addEventListener("click", handleClick);
```

Notice I wrote `handleClick`, not `handleClick()`. We are passing the function itself, not calling it.

### Why Not onclick?

You may see code like this:

```html
<button onclick="handleClick()">Like</button>
```

or:

```js
button.onclick = handleClick;
```

These work, but they have limits. An element can only have one `onclick` property at a time, so assigning a second one replaces the first. `addEventListener` lets you attach many listeners, and it keeps JavaScript out of your HTML. That is why I use it almost everywhere.

## The Event Object

When the browser calls your listener, it passes an **event object** with details about what happened:

```js
button.addEventListener("click", (event) => {
  console.log(event.type);   // "click"
  console.log(event.target); // the element that was clicked
});
```

Some properties I use often:

- `event.target` is the element where the event started
- `event.currentTarget` is the element the listener is attached to
- `event.key` is the key pressed, for keyboard events
- `event.clientX` and `event.clientY` are the mouse position

Here is a keyboard example:

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    console.log("Close the modal");
  }
});
```

## Common Event Types

### Input Events

```html
<input id="name" type="text" />
<p id="preview"></p>
```

```js
const input = document.querySelector("#name");
const preview = document.querySelector("#preview");

input.addEventListener("input", (event) => {
  preview.textContent = event.target.value;
});
```

The `input` event fires on every change. The `change` event fires only when the user commits the value, for example by leaving the field.

### Form Submit Events

```html
<form id="signup">
  <input name="email" type="email" required />
  <button type="submit">Sign up</button>
</form>
```

```js
const form = document.querySelector("#signup");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(data.get("email"));
});
```

Listen to `submit` on the form, not `click` on the button. That way it also works when the user presses Enter. If forms are new to you, see [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

## preventDefault

Some events have a default browser action. Submitting a form reloads the page, and clicking a link navigates away.

`event.preventDefault()` stops that default action:

```js
const link = document.querySelector("a.no-go");

link.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Navigation stopped");
});
```

## Event Bubbling

This is the part that took me longest to understand.

When you click an element, the event does not only fire on that element. It **bubbles up** through each of its ancestors, all the way to `document`.

```html
<div id="card">
  <button id="btn">Click me</button>
</div>
```

```js
document.querySelector("#card").addEventListener("click", () => {
  console.log("Card clicked");
});

document.querySelector("#btn").addEventListener("click", () => {
  console.log("Button clicked");
});
```

Clicking the button logs:

```text
Button clicked
Card clicked
```

The button handles it first, then the event bubbles to the card.

If you need to stop that, you can call `event.stopPropagation()`. I try to use it sparingly, because it can break other code that expects the event to bubble.

## Event Delegation

Bubbling is actually very useful. It allows a technique called **event delegation**.

Instead of attaching a listener to every item in a list, you attach one listener to the parent and check which child was clicked:

```html
<ul id="todo">
  <li>Buy milk <button class="delete">x</button></li>
  <li>Write article <button class="delete">x</button></li>
</ul>
```

```js
const list = document.querySelector("#todo");

list.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete");
  if (!deleteBtn) return;

  deleteBtn.closest("li").remove();
});
```

This has two big benefits:

- Only one listener, no matter how many items there are
- It works for items added later with JavaScript

`closest()` walks up from the clicked element to find the nearest match, which handles clicks on nested elements inside the button.

## Listener Options

`addEventListener` accepts a third argument with options:

```js
button.addEventListener("click", handleClick, { once: true });
```

- `once: true` removes the listener after it runs once
- `passive: true` tells the browser you will not call `preventDefault`, which helps scroll performance for `scroll`, `wheel` and `touch` listeners
- `signal` lets you remove listeners with an `AbortController`

## Removing Listeners

To remove a listener, you must pass the **same function reference**:

```js
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

This will not work, because the two arrow functions are different objects:

```js
button.addEventListener("click", () => console.log("Hi"));
button.removeEventListener("click", () => console.log("Hi")); // does nothing
```

## Common Mistakes

### 1. Calling the Function Instead of Passing It

```js
button.addEventListener("click", handleClick()); // runs immediately
button.addEventListener("click", handleClick);   // correct
```

### 2. Listening to click on a Submit Button

Use the form's `submit` event so keyboard submission works too.

### 3. Forgetting preventDefault on Forms

Without it, the page reloads and your JavaScript output disappears.

### 4. Confusing target and currentTarget

`target` is where the click happened. `currentTarget` is where the listener lives. In delegation they are often different.

### 5. Adding Listeners Inside a Loop for Dynamic Items

New items will not have listeners. Use event delegation instead.

## Conclusion

Events are how your page responds to people. With `addEventListener`, you pick an element, choose an event type, and give it a function to run.

The ideas that make the biggest difference are the event object, `preventDefault`, bubbling, and event delegation. Once those click, building menus, forms, modals and to-do lists becomes much more straightforward.

When you are ready to go further, look at how [JavaScript functions and arrow functions](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions) work, since every listener you write is a function.
