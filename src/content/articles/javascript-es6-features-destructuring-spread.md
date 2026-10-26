---
title: "Modern JavaScript: Destructuring, Spread and Other ES6 Features"
slug: javascript-es6-features-destructuring-spread
metaDescription: Learn the modern JavaScript features you will use every day, including destructuring, spread and rest, template literals, default parameters, and modules.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=ES6+Features
author: Bishal Biswas
publishDate: 2027-01-14
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - ES6
  - Destructuring
  - Spread operator
---

When I started reading other people's JavaScript, I kept seeing syntax I did not understand. Things like `const { name } = user`, `[...items]` and `` `Hello ${name}` ``.

All of these come from **ES6** (also called ES2015) and the yearly updates after it. They are now completely standard in every modern browser and in frameworks like React.

In this article, I will explain the modern features I use every single day: destructuring, spread and rest, template literals, default parameters, shorthand properties, optional chaining, nullish coalescing, and modules.

If you plan to learn React, these features are essential. I also mention them in [JavaScript to learn before React](https://bishal-biswas.github.io/articles/javascript-before-heading-react).

## Template Literals

Template literals use backticks instead of quotes. They let you put variables directly inside a string with `${}`:

```js
const name = "Bishal";
const age = 25;

// Old way
const oldMsg = "Hi, I am " + name + " and I am " + age + ".";

// Modern way
const msg = `Hi, I am ${name} and I am ${age}.`;
```

You can put any expression inside `${}`, and template literals can span multiple lines:

```js
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>${age >= 18 ? "Adult" : "Minor"}</p>
  </div>
`;
```

## Object Destructuring

Destructuring lets you pull values out of an object into variables in one line:

```js
const user = { name: "Bishal", role: "Developer", city: "Kolkata" };

// Old way
const name = user.name;
const role = user.role;

// Destructuring
const { name, role } = user;
```

### Renaming and Default Values

You can rename a variable and set a fallback value:

```js
const { name: userName, country = "India" } = user;

console.log(userName); // "Bishal"
console.log(country);  // "India" (default, because user has no country)
```

### Nested Destructuring

```js
const profile = {
  name: "Bishal",
  social: { github: "bishal-biswas" }
};

const { social: { github } } = profile;
console.log(github); // "bishal-biswas"
```

### Destructuring Function Parameters

This is where I use destructuring most. It makes function signatures self-documenting:

```js
function createCard({ title, description, featured = false }) {
  return `${title} - ${description} ${featured ? "(featured)" : ""}`;
}

createCard({ title: "Portfolio", description: "My site" });
```

The order of the properties does not matter, which makes these functions easier to call. If objects are new to you, read [JavaScript objects explained with examples](https://bishal-biswas.github.io/articles/javascript-objects-beginners).

## Array Destructuring

Arrays can be destructured by **position**:

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;
console.log(first, second); // "red" "green"
```

You can skip items with commas:

```js
const [, , third] = colors;
console.log(third); // "blue"
```

A neat trick is swapping two variables without a temporary one:

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

## The Spread Operator (...)

The spread operator `...` **expands** an array or object into individual items.

### Spread With Arrays

```js
const frontend = ["HTML", "CSS"];
const all = [...frontend, "JavaScript"];
console.log(all); // ["HTML", "CSS", "JavaScript"]

const copy = [...frontend]; // shallow copy
```

It is also useful for passing array items as function arguments:

```js
const numbers = [4, 9, 2];
console.log(Math.max(...numbers)); // 9
```

### Spread With Objects

```js
const defaults = { theme: "light", fontSize: 16 };
const userSettings = { theme: "dark" };

const settings = { ...defaults, ...userSettings };
console.log(settings); // { theme: "dark", fontSize: 16 }
```

Later properties overwrite earlier ones, which makes this perfect for merging settings.

You will also see this pattern for updating data without changing the original, which is very common in React:

```js
const updatedUser = { ...user, city: "Delhi" };
```

Remember that spread only makes a **shallow** copy. Nested objects are still shared.

## The Rest Operator (...)

The same three dots can also **collect** items. When used this way, they are called the rest operator.

### Rest in Function Parameters

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

`numbers` is a real array, so you can use array methods on it. I cover `reduce` in [map, filter and reduce](https://bishal-biswas.github.io/articles/javascript-arrays-methods-map-filter-reduce).

### Rest in Destructuring

```js
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

const { password, ...safeUser } = { name: "Bishal", password: "secret" };
console.log(safeUser); // { name: "Bishal" }
```

That second example is handy for removing a property before sending or logging an object.

A simple way to remember the difference: **spread** unpacks, **rest** gathers.

## Default Parameters

Functions can have default values for their parameters:

```js
function greet(name = "friend") {
  return `Hello, ${name}!`;
}

console.log(greet());         // "Hello, friend!"
console.log(greet("Bishal")); // "Hello, Bishal!"
```

The default is used only when the argument is `undefined`, not when it is `null` or `0`.

## Shorthand Properties and Methods

When a variable has the same name as the property, you can write it once:

```js
const name = "Bishal";
const age = 25;

const user = { name, age }; // same as { name: name, age: age }
```

Methods also have a shorter syntax:

```js
const counter = {
  count: 0,
  increment() {
    this.count++;
  }
};
```

## Optional Chaining and Nullish Coalescing

These two came after ES6 (in ES2020), but I use them so often they belong here.

Optional chaining `?.` stops and returns `undefined` if something along the way is `null` or `undefined`:

```js
const city = user.address?.city;
const firstTag = post.tags?.[0];
```

Nullish coalescing `??` gives a fallback only for `null` or `undefined`:

```js
const pageSize = settings.pageSize ?? 10;
```

They work beautifully together:

```js
const city = user.address?.city ?? "Unknown";
```

## let, const and Arrow Functions

ES6 also introduced `let`, `const` and arrow functions. They are big enough topics that I wrote separate guides on [let, const and var](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var) and on [functions and arrow functions](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions).

## Modules: import and export

Modules let you split code into files and share pieces between them.

```js
// math.js
export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}
```

```js
// main.js
import multiply, { add } from "./math.js";

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6
```

- **Named exports** are imported with curly braces and must match the name
- A file can have one **default export**, imported without braces under any name

In the browser, load the entry file with `type="module"`:

```html
<script type="module" src="main.js"></script>
```

Module scripts are deferred automatically and run in strict mode.

## Common Mistakes

### 1. Destructuring From undefined

```js
const { name } = undefined; // TypeError
```

Give a default when the value might be missing: `const { name } = user ?? {};`

### 2. Expecting Spread to Deep Copy

Spread copies only the top level. Use `structuredClone()` for a deep copy.

### 3. Using Quotes Instead of Backticks

`"Hello ${name}"` prints the literal text. Template literals need backticks.

### 4. Confusing Default and Named Imports

`import add from "./math.js"` imports the default export, not the named `add`.

### 5. Putting Rest Anywhere But Last

`const [...rest, last] = arr` is a syntax error. Rest must be the final element.

## Conclusion

Modern JavaScript features make code shorter and much easier to read. Destructuring pulls values out of objects and arrays, spread unpacks them, rest gathers them, and template literals make strings painless.

Add default parameters, shorthand properties, optional chaining, nullish coalescing and modules, and you have the toolkit used in almost every modern codebase.

Practise rewriting a few of your older functions with these features. Once they feel natural, reading framework code and tutorials becomes a lot less confusing.
