---
title: "JavaScript localStorage and sessionStorage Explained"
slug: javascript-local-storage-session-storage
metaDescription: Learn how JavaScript localStorage and sessionStorage work, how to save objects with JSON, the differences between them, limits, and when not to use them.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=Web+Storage
author: Bishal Biswas
publishDate: 2027-01-12
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - localStorage
  - sessionStorage
  - Web Storage API
---

Have you noticed how some websites remember your dark mode setting, even after you close the tab? Or how a half-filled form is still there after you refresh?

A lot of that is done with **Web Storage**: `localStorage` and `sessionStorage`.

When I built my first to-do app, every item vanished on refresh. That was frustrating. Adding three lines of `localStorage` code fixed it, and it felt like a huge upgrade.

In this article, I will explain how `localStorage` and `sessionStorage` work, how they differ, how to store objects and arrays, and what you should never put in them.

## What Is Web Storage?

Web Storage lets a website save small pieces of data in the user's browser as **key-value pairs**.

There are two storage objects:

- `localStorage` keeps data with no expiry date, until it is deleted by your code or the user
- `sessionStorage` keeps data only for the current tab session

Both have exactly the same methods, so once you learn one, you know the other.

## Saving and Reading Data

The main methods are:

```js
localStorage.setItem("theme", "dark");     // save
const theme = localStorage.getItem("theme"); // read
localStorage.removeItem("theme");          // delete one key
localStorage.clear();                      // delete everything for this site
```

If a key does not exist, `getItem()` returns `null`:

```js
console.log(localStorage.getItem("missing")); // null
```

You can also see how many items are stored:

```js
console.log(localStorage.length);
```

## Everything Is Stored as a String

This is the first thing that tripped me up.

Web Storage only stores **strings**. If you save a number or a boolean, it comes back as a string:

```js
localStorage.setItem("count", 5);
console.log(typeof localStorage.getItem("count")); // "string"

localStorage.setItem("isAdmin", false);
if (localStorage.getItem("isAdmin")) {
  console.log("Runs! Because 'false' is a non-empty string");
}
```

So you need to convert values when you read them back:

```js
const count = Number(localStorage.getItem("count")) || 0;
const isAdmin = localStorage.getItem("isAdmin") === "true";
```

If the truthy check above surprised you, see the section on truthy and falsy values in [JavaScript conditionals](https://bishal-biswas.github.io/articles/javascript-conditionals-if-switch-ternary).

## Storing Objects and Arrays With JSON

To store objects or arrays, convert them to a JSON string with `JSON.stringify()`, and convert them back with `JSON.parse()`:

```js
const user = { name: "Bishal", theme: "dark" };

localStorage.setItem("user", JSON.stringify(user));

const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved.name); // "Bishal"
```

If you forget `JSON.stringify()`, you will store the useless string `"[object Object]"`.

### Safe Helper Functions

In real projects I wrap this in two small helpers. `JSON.parse` throws on invalid data, and storage itself can throw in some browsers or private modes, so I use `try...catch`:

```js
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save data:", error);
  }
}

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}
```

Now I can write:

```js
const todos = loadData("todos", []);
todos.push("Learn Web Storage");
saveData("todos", todos);
```

## localStorage vs sessionStorage

Here is how they compare:

| Feature | `localStorage` | `sessionStorage` |
|---|---|---|
| How long data lasts | Until deleted | Until the tab is closed |
| Shared between tabs | Yes, across all tabs of the same origin | No, each tab has its own |
| Survives page refresh | Yes | Yes |
| Survives browser restart | Yes | No (unless the browser restores the session) |
| Typical size limit | About 5 MB per origin | About 5 MB per origin |

Both are scoped to the **origin**, which is the protocol, domain and port together. So `https://example.com` and `http://example.com` have separate storage.

### When I Use Each

I use `localStorage` for things that should be remembered long-term:

- Theme preference (light or dark)
- Language choice
- Recently viewed items
- Simple app state in small projects

I use `sessionStorage` for things that only matter right now in this tab:

- A multi-step form in progress
- A temporary filter or scroll position
- A "you already saw this message" flag for the current visit

## A Practical Example: Remembering Dark Mode

Here is a small dark mode toggle that remembers the user's choice:

```html
<button id="theme-toggle">Toggle theme</button>
```

```css
body.dark {
  background: #111;
  color: #eee;
}
```

```js
const button = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

button.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
```

`classList.toggle()` returns `true` when the class was added, which makes this nice and short. I explain `classList` in [JavaScript DOM manipulation basics](https://bishal-biswas.github.io/articles/javascript-dom-manipulation-basics) and click handlers in [JavaScript events and addEventListener](https://bishal-biswas.github.io/articles/javascript-events-addeventlistener).

## Listening for Changes in Other Tabs

When `localStorage` changes in one tab, other open tabs of the same site receive a `storage` event:

```js
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    document.body.classList.toggle("dark", event.newValue === "dark");
  }
});
```

This keeps the theme in sync across tabs. Note that the event does not fire in the tab that made the change.

## What Not to Store

This part matters.

Any JavaScript running on your page can read Web Storage. If an attacker manages to inject a script (an XSS attack), they can read everything in it.

So **never** store:

- Passwords
- Credit card or bank details
- Sensitive personal information
- Long-lived authentication tokens, if you can avoid it

For login sessions, an `HttpOnly` cookie set by the server is generally safer, because JavaScript cannot read it at all.

Also keep in mind that users can clear their storage at any time, and some browsers clear it for sites that have not been visited for a long time. Treat Web Storage as a convenience, not as your database.

## Common Mistakes

### 1. Forgetting JSON.stringify and JSON.parse

Objects become `"[object Object]"` and arrays become comma-separated strings.

### 2. Treating Stored Values as Numbers or Booleans

Everything comes back as a string. `"false"` is truthy. Convert explicitly.

### 3. Not Handling null

`getItem()` returns `null` for missing keys. Always provide a fallback.

### 4. Storing Sensitive Data

Web Storage is readable by any script on the page. Keep secrets out of it.

### 5. Storing Too Much

The limit is only a few megabytes per origin. For large data, look at IndexedDB instead.

### 6. Using It on the Server

`localStorage` only exists in the browser. In server-side code, such as an Astro component's frontmatter or Node.js, it is not defined. Access it only in client-side scripts.

## Conclusion

`localStorage` and `sessionStorage` give you a simple way to remember things in the browser. They share the same API: `setItem`, `getItem`, `removeItem` and `clear`.

The main difference is lifetime: `localStorage` lasts until it is deleted, while `sessionStorage` lasts only for the current tab.

Remember that everything is stored as a string, use JSON for objects and arrays, handle missing values, and never store anything sensitive. With those rules in mind, Web Storage is a great way to make small apps feel much more polished.
