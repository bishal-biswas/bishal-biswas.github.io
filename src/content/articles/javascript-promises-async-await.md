---
title: "JavaScript Promises and async/await Explained"
slug: javascript-promises-async-await
metaDescription: Learn JavaScript promises and async/await with simple examples, including then, catch, finally, error handling, Promise.all, and common beginner mistakes.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=Async+Await
author: Bishal Biswas
publishDate: 2027-01-08
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - Promises
  - async await
  - Asynchronous JavaScript
---

Some things in programming take time. Loading data from a server, reading a file, or waiting for a timer. JavaScript cannot just freeze the whole page while it waits.

That is why JavaScript has **asynchronous** code, and the modern way to handle it is with **promises** and **async/await**.

When I first saw `.then().then().catch()`, I found it hard to follow. Then I learned `async/await`, and suddenly asynchronous code looked almost like normal code.

In this article, I will explain what promises are, how to use `then` and `catch`, how `async/await` makes it simpler, and how to run several tasks at once.

## Synchronous vs Asynchronous

Normal JavaScript runs line by line. Each line finishes before the next one starts:

```js
console.log("One");
console.log("Two");
console.log("Three");
```

Asynchronous code starts a task and lets the rest of the program carry on:

```js
console.log("One");

setTimeout(() => {
  console.log("Two");
}, 1000);

console.log("Three");
// One, Three, (one second later) Two
```

JavaScript runs on a single thread, so this "start now, finish later" style keeps the page responsive.

## What Is a Promise?

A **promise** is an object that represents a value that is not ready yet, but will be at some point.

I think of it like an order receipt at a food counter. You do not have the food yet, but the receipt promises you will get it, or be told that something went wrong.

A promise is always in one of three states:

- **pending**: still waiting
- **fulfilled**: finished successfully with a value
- **rejected**: failed with an error

Once a promise is fulfilled or rejected, it is **settled** and never changes again.

## Creating a Promise

Most of the time you will use promises that other APIs give you, like `fetch()`. But it helps to see how one is made:

```js
const orderFood = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Pizza is ready!");
    } else {
      reject(new Error("Kitchen is closed"));
    }
  }, 1000);
});
```

- Call `resolve(value)` when the task succeeds
- Call `reject(error)` when it fails

## Using then, catch and finally

To use the result, attach handlers:

```js
orderFood
  .then((message) => {
    console.log(message); // "Pizza is ready!"
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Order complete");
  });
```

- `.then()` runs when the promise is fulfilled
- `.catch()` runs when it is rejected
- `.finally()` runs either way, which is useful for hiding a loading spinner

### Chaining

Whatever you return from `.then()` is passed to the next `.then()`. If you return a promise, the chain waits for it:

```js
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error));
```

One `.catch()` at the end handles errors from any step above it.

## async/await

`async/await` is built on top of promises. It does not replace them; it just gives you a cleaner way to write the same thing.

Here is the same fetch rewritten:

```js
async function loadUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  console.log(user.name);
}

loadUser();
```

Two rules:

1. `await` pauses the function until the promise settles, then gives you the value.
2. You can use `await` inside an `async` function, or at the top level of an ES module.

An `async` function **always returns a promise**, even if you return a plain value:

```js
async function getNumber() {
  return 42;
}

getNumber().then((n) => console.log(n)); // 42
```

## Error Handling With try...catch

With `async/await`, you handle errors using the familiar `try...catch`:

```js
async function loadUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.error("Could not load user:", error.message);
  } finally {
    console.log("Done");
  }
}
```

Note the `response.ok` check. `fetch` only rejects on network failures, not on HTTP errors like 404 or 500. I explain that in detail in [using the Fetch API to get JSON data](https://bishal-biswas.github.io/articles/javascript-fetch-api-json).

## Running Tasks in Parallel

A common beginner mistake is awaiting things one after another when they do not depend on each other:

```js
const user = await getUser();    // waits ~1s
const posts = await getPosts();  // then waits another ~1s
```

If the tasks are independent, start them together with `Promise.all`:

```js
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

Now both run at the same time, and you wait only as long as the slowest one.

There are a few related helpers:

| Method | What it does |
|---|---|
| `Promise.all` | Waits for all; rejects as soon as one fails |
| `Promise.allSettled` | Waits for all; gives you each result or error |
| `Promise.race` | Settles with the first promise to settle |
| `Promise.any` | Fulfils with the first success; rejects only if all fail |

I use `Promise.allSettled` when some requests are allowed to fail without breaking the whole page.

## A Small Helper: delay

Here is a tiny function I use for demos and retries. It wraps `setTimeout` in a promise:

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function countdown() {
  for (let i = 3; i > 0; i--) {
    console.log(i);
    await delay(1000);
  }
  console.log("Go!");
}

countdown();
```

Notice I used a `for` loop here, not `forEach`. `forEach` does not wait for `await`. I explain why in my guide to [JavaScript loops](https://bishal-biswas.github.io/articles/javascript-loops-for-while-foreach).

## Common Mistakes

### 1. Forgetting await

```js
const data = fetch("/api/data");
console.log(data); // Promise { <pending> }
```

Without `await` (or `.then()`), you get the promise, not the value.

### 2. Using await Outside an async Function

In a regular script, this is a syntax error. Wrap the code in an `async` function, or use an ES module where top-level `await` is allowed.

### 3. Not Handling Errors

An unhandled rejection shows up as an error in the console and can leave your UI stuck. Always use `.catch()` or `try...catch`.

### 4. Awaiting Independent Tasks One by One

Use `Promise.all` to run them in parallel.

### 5. Using await Inside forEach

`forEach` ignores the returned promises. Use `for...of` for sequential work, or `Promise.all` with `map` for parallel work:

```js
await Promise.all(ids.map((id) => deleteItem(id)));
```

### 6. Mixing then and await Randomly

Both work, but mixing them in one function is hard to read. Pick one style per function. I default to `async/await`.

## Conclusion

A promise is a placeholder for a future value that can be pending, fulfilled or rejected. You can consume it with `.then()` and `.catch()`, or more readably with `async/await` and `try...catch`.

The habits that help me most are: always handle errors, check `response.ok` when using `fetch`, and use `Promise.all` when tasks can run at the same time.

If closures and callbacks still feel fuzzy, it is worth revisiting [scope, hoisting and closures](https://bishal-biswas.github.io/articles/javascript-scope-hoisting-closures), because every `.then()` callback relies on them.
