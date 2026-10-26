---
title: "Using the JavaScript Fetch API to Get JSON Data"
slug: javascript-fetch-api-json
metaDescription: Learn how to use the JavaScript Fetch API to get and send JSON data, check response.ok, handle errors, set headers, and display results on the page.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=Fetch+API
author: Bishal Biswas
publishDate: 2027-01-10
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - Fetch API
  - JSON
  - HTTP requests
---

Most real websites do not hard-code all their data. Weather apps, product lists, comments and dashboards all load data from a server.

In the browser, the built-in way to do that is the **Fetch API**.

The first time I used `fetch`, I got a promise back, logged it, and saw `Promise { <pending> }`. I had no idea what to do with it. Once I understood promises and the two-step response process, it became one of my most-used tools.

In this article, I will explain how to use `fetch` to get JSON data, how to handle errors properly, how to send data with POST, and how to show the result on a page.

Because `fetch` returns a promise, it helps to read [JavaScript promises and async/await explained](https://bishal-biswas.github.io/articles/javascript-promises-async-await) first.

## What Is JSON?

JSON stands for **JavaScript Object Notation**. It is a text format for sending structured data, and it looks very similar to a JavaScript object:

```json
{
  "id": 1,
  "name": "Bishal",
  "skills": ["HTML", "CSS", "JavaScript"],
  "isAvailable": true
}
```

There are a few differences from JavaScript objects. Keys must be in double quotes, strings must use double quotes, and there are no functions, comments or `undefined`.

When JSON arrives in the browser, it is just text. We need to **parse** it into a real JavaScript object. If objects are new to you, see [JavaScript objects explained with examples](https://bishal-biswas.github.io/articles/javascript-objects-beginners).

## Your First Fetch Request

Here is the simplest possible `fetch` with `async/await`:

```js
async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  console.log(user.name);
}

getUser();
```

This happens in two steps:

1. `await fetch(url)` gives you a **Response** object as soon as the headers arrive.
2. `await response.json()` reads the body and parses it as JSON.

Both steps return promises, which is why there are two `await` keywords.

The same thing with `.then()` looks like this:

```js
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error));
```

## The Response Object

The `Response` has several useful properties:

```js
const response = await fetch("/api/data");

console.log(response.ok);     // true if status is 200-299
console.log(response.status); // e.g. 200, 404, 500
console.log(response.headers.get("content-type"));
```

And several ways to read the body:

- `response.json()` for JSON
- `response.text()` for plain text or HTML
- `response.blob()` for files like images

You can only read the body **once**. Calling `response.json()` twice throws an error.

## Handling Errors Properly

This is the most important part of this article, and the one I got wrong for a long time.

`fetch` only rejects when the **network** fails, for example when you are offline or the domain does not exist. A **404 Not Found** or **500 Server Error** is still a "successful" fetch from the browser's point of view.

So you must check `response.ok` yourself:

```js
async function getUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not load user:", error.message);
    return null;
  }
}
```

Now both network errors and HTTP errors end up in the `catch` block.

## Showing Data on the Page

Let's fetch a list of posts and display them:

```html
<button id="load">Load posts</button>
<p id="status"></p>
<ul id="posts"></ul>
```

```js
const button = document.querySelector("#load");
const statusEl = document.querySelector("#status");
const list = document.querySelector("#posts");

button.addEventListener("click", async () => {
  statusEl.textContent = "Loading...";
  list.replaceChildren();

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const posts = await response.json();

    for (const post of posts) {
      const li = document.createElement("li");
      li.textContent = post.title;
      list.append(li);
    }

    statusEl.textContent = "";
  } catch (error) {
    statusEl.textContent = "Something went wrong. Please try again.";
  }
});
```

I use `textContent` instead of `innerHTML` so that data from the server cannot inject HTML into my page. I cover these DOM methods in [JavaScript DOM manipulation basics](https://bishal-biswas.github.io/articles/javascript-dom-manipulation-basics).

## Sending Data With POST

To send data, pass a second argument with options:

```js
async function createPost(title, body) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body, userId: 1 })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

createPost("Hello", "My first post").then(console.log);
```

Three things to notice:

- `method` sets the HTTP method (`GET` is the default)
- The `Content-Type` header tells the server you are sending JSON
- `JSON.stringify()` turns your object into a JSON string

The same pattern works for `PUT`, `PATCH` and `DELETE`.

### Sending Form Data

If you are submitting an HTML form, you can send `FormData` directly. Do not set `Content-Type` yourself in this case; the browser sets it with the correct boundary:

```js
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await fetch("/api/contact", {
    method: "POST",
    body: new FormData(form)
  });
});
```

For a refresher on forms, see [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

## Query Parameters

To add query parameters safely, I use `URLSearchParams` instead of building strings by hand:

```js
const params = new URLSearchParams({ q: "javascript tips", page: 2 });
const response = await fetch(`/api/search?${params}`);
```

It encodes spaces and special characters correctly for you.

## Timeouts and Cancelling

`fetch` has no built-in timeout option, but you can pass an `AbortSignal`:

```js
const response = await fetch("/api/slow", {
  signal: AbortSignal.timeout(5000)
});
```

If the request takes longer than five seconds, it is aborted and the promise rejects with a `TimeoutError`.

## A Note on CORS

If you fetch from another domain and see a **CORS** error in the console, the problem is usually not your code. The server must send headers that allow your site to read the response. You cannot fix that from the browser side; it must be configured on the server or handled through your own backend.

## Common Mistakes

### 1. Forgetting the Second await

```js
const data = await fetch(url).json(); // TypeError
```

`fetch(url)` is a promise, not a response. Write it in two steps.

### 2. Not Checking response.ok

A 404 will not trigger `catch` on its own. Always check `response.ok` and throw.

### 3. Forgetting JSON.stringify When Sending

Passing a plain object as `body` sends `"[object Object]"`.

### 4. Missing the Content-Type Header

Many servers will not parse the body as JSON without `Content-Type: application/json`.

### 5. Using innerHTML With API Data

It can open your page to XSS. Use `textContent` and create elements.

### 6. Putting Secret API Keys in Front-End Code

Anything in browser JavaScript is visible to visitors. Keep secret keys on a server.

## Conclusion

The Fetch API is the standard way to talk to servers from the browser. The core pattern is short: `await fetch(url)`, check `response.ok`, then `await response.json()`.

For sending data, set the `method`, add a `Content-Type` header, and use `JSON.stringify()`. Wrap everything in `try...catch`, show the user a friendly message when things fail, and you will have reliable data loading in your projects.
