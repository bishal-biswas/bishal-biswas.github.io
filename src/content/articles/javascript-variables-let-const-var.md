---
title: "JavaScript Variables: let, const and var Explained"
slug: javascript-variables-let-const-var
metaDescription: Learn the difference between let, const and var in JavaScript, including scope, hoisting, reassignment and which keyword to use in modern code.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Variables
author: Bishal Biswas
publishDate: 2026-12-19
isDraft: false
category: JavaScript
tags:
  - JavaScript variables
  - let vs const
  - var in JavaScript
  - block scope
---

When I started learning JavaScript, every tutorial seemed to use a different keyword. One used `var`, another used `let`, and a newer one used `const` almost everywhere. I did not understand why there were three ways to do the same thing.

It turns out they are **not** the same. They behave differently in small but important ways, and choosing the right one prevents real bugs.

In this article, I will explain what a variable is, how `let`, `const` and `var` differ, and the simple rule I follow today.

## What Is a Variable?

A variable is a name that points to a value, so I can use that value later.

```js
let userName = "Bishal";
console.log(userName); // "Bishal"
```

Here:

- `let` is the keyword that declares the variable
- `userName` is the variable name
- `"Bishal"` is the value

The value can be a string, a number, a boolean, an object and more. I go through all of them in [JavaScript data types explained](https://bishal-biswas.github.io/articles/javascript-data-types-explained).

## Naming Rules

Variable names in JavaScript:

- can contain letters, digits, `_` and `$`
- cannot start with a digit
- are case-sensitive (`age` and `Age` are different)
- cannot be reserved words like `let`, `class` or `return`

```js
let firstName = "Bishal";  // good: camelCase
let _count = 0;            // allowed
let $price = 99;           // allowed
// let 2ndPlace = "x";     // error: starts with a digit
```

The common style is **camelCase**: first word lowercase, each next word capitalized.

## `let`: A Variable That Can Change

I use `let` when I know the value will be reassigned.

```js
let score = 0;
score = 10;
score = score + 5;
console.log(score); // 15
```

I can also declare it first and assign it later:

```js
let message;
console.log(message); // undefined

message = "Hello";
```

But I cannot declare the same `let` variable twice in the same scope:

```js
let city = "Kolkata";
let city = "Delhi"; // SyntaxError: Identifier 'city' has already been declared
```

That error is helpful. It stops me from accidentally creating two variables with the same name.

## `const`: A Binding That Cannot Be Reassigned

`const` is for values that should not be reassigned.

```js
const taxRate = 0.18;
taxRate = 0.2; // TypeError: Assignment to constant variable.
```

A `const` must be given a value when it is declared:

```js
const apiUrl; // SyntaxError: Missing initializer in const declaration
```

### `const` Does Not Mean "Frozen"

This confused me for a long time. `const` stops **reassignment** of the variable, but if the value is an object or an array, its contents can still change.

```js
const user = { name: "Bishal" };
user.name = "Rahul";      // allowed: changing a property
console.log(user.name);   // "Rahul"

user = { name: "Amit" };  // TypeError: cannot reassign the variable
```

```js
const colors = ["red", "green"];
colors.push("blue");      // allowed
console.log(colors);      // ["red", "green", "blue"]
```

The variable `colors` still points to the same array. The array itself has changed. If you really want an object that cannot be changed, use `Object.freeze()`, though it only freezes the top level.

For more on working with objects and arrays, see [JavaScript objects explained](https://bishal-biswas.github.io/articles/javascript-objects-beginners) and [JavaScript array methods: map, filter and reduce](https://bishal-biswas.github.io/articles/javascript-arrays-methods-map-filter-reduce).

## `var`: The Old Way

`var` was the only option before ES2015 (ES6). It still works, but it has some behaviors that cause bugs.

### 1. `var` Is Function-Scoped, Not Block-Scoped

`let` and `const` are **block-scoped**. A block is anything inside curly braces `{ }`, like an `if` or a loop.

```js
if (true) {
  let a = 1;
  const b = 2;
  var c = 3;
}

console.log(c); // 3   (var leaks out of the block)
console.log(a); // ReferenceError: a is not defined
```

`var` ignores the block and belongs to the whole surrounding function (or the global scope if there is no function).

### 2. The Classic Loop Bug

This is the example that convinced me to stop using `var`:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 3, 3, 3
```

There is only **one** `i` shared by every loop iteration. By the time the timers run, the loop has finished and `i` is `3`.

With `let`, each iteration gets its own `i`:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 0, 1, 2
```

### 3. `var` Can Be Redeclared

```js
var total = 10;
var total = 20; // no error
```

In a big file, this can silently overwrite something important.

### 4. Hoisting Differences

All three declarations are hoisted, which means JavaScript knows about them before the code runs. But they behave differently if you use them early.

```js
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;
```

A `var` is initialized as `undefined` straight away, so using it early quietly gives `undefined`. A `let` or `const` is in the **temporal dead zone** until its line runs, so using it early throws an error. That error is much easier to debug than a silent `undefined`.

I go deeper into this in [JavaScript scope, hoisting and closures](https://bishal-biswas.github.io/articles/javascript-scope-hoisting-closures).

## Quick Comparison

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Can be reassigned | Yes | Yes | No |
| Can be redeclared in same scope | Yes | No | No |
| Must be initialized | No | No | Yes |
| Use before declaration | `undefined` | ReferenceError | ReferenceError |
| Recommended in modern code | No | Yes | Yes (default) |

## The Rule I Follow

> Use `const` by default. Switch to `let` only when the variable must be reassigned. Avoid `var`.

```js
const MAX_ITEMS = 10;          // never changes
const cart = [];               // the array changes, the binding does not

let itemCount = 0;             // will be reassigned
for (let i = 0; i < MAX_ITEMS; i++) {
  itemCount++;
}
```

Using `const` by default makes my code easier to read. When I see `let`, I immediately know that value is going to change somewhere below.

## Common Mistakes

### 1. Thinking `const` Makes Objects Unchangeable

`const` protects the variable, not the contents of an object or array.

### 2. Forgetting a Keyword

```js
total = 100; // no let, const or var
```

In non-strict scripts this silently creates a global variable. In strict mode, and inside ES modules, it throws a `ReferenceError`. Always declare variables.

### 3. Using `let` Everywhere "Just in Case"

If a value never changes, `const` communicates that clearly and protects you from accidental reassignment.

### 4. Copying Old Tutorials With `var`

Many older examples online still use `var`. When I copy one, I replace `var` with `const` or `let` and check that the code still makes sense.

### 5. Reusing One Variable for Different Things

```js
let data = "Bishal";
data = 42;
data = [1, 2, 3];
```

JavaScript allows this, but it makes code confusing. Give each value its own clear name.

## Conclusion

JavaScript has three ways to declare variables, but in modern code I really only use two. `const` for values that are not reassigned, and `let` for values that are. `var` is function-scoped, can be redeclared and gives `undefined` before its declaration, which is why I avoid it.

If you are still building up your JavaScript foundations, I also wrote about [the JavaScript you should know before learning React](https://bishal-biswas.github.io/articles/javascript-before-heading-react), and variables are the very first step on that list.
