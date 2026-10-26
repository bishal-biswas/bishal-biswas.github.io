---
title: "JavaScript Array Methods: map, filter and reduce"
slug: javascript-arrays-methods-map-filter-reduce
metaDescription: Learn how the JavaScript array methods map, filter and reduce work, with simple examples, chaining, real use cases and the mistakes beginners often make.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Array+Methods
author: Bishal Biswas
publishDate: 2026-12-25
isDraft: false
category: JavaScript
tags:
  - JavaScript arrays
  - map filter reduce
  - array methods
  - functional programming
---

For a long time, every time I needed to work with an array, I wrote a `for` loop. Create an empty array, loop, check something, push the result. It worked, but my code was full of loops that all looked the same.

Then I learned `map`, `filter` and `reduce`. These three methods replaced most of my loops with shorter code that says exactly what it is doing.

In this article, I will explain each method with simple examples, show how to chain them together, and cover the mistakes I made while learning them.

These methods all take a function as an argument, usually an arrow function. If arrow functions are still new to you, read [JavaScript functions and arrow functions explained](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions) first.

## A Quick Look at All Three

| Method | What it does | Returns |
|---|---|---|
| `map` | Transforms every item | A new array, same length |
| `filter` | Keeps items that pass a test | A new array, same or shorter |
| `reduce` | Combines all items into one value | A single value (any type) |

None of them change the original array. They all return something new.

## `map()`: Transform Every Item

`map` runs a function on each item and collects the results into a new array.

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (unchanged)
```

Here is the same thing with a `for` loop, so you can see what `map` saves:

```js
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
```

### `map` With Objects

In real projects, I often have an array of objects and want just one property from each:

```js
const users = [
  { name: "Bishal", age: 25 },
  { name: "Riya", age: 30 },
  { name: "Amit", age: 17 },
];

const names = users.map(user => user.name);
console.log(names); // ["Bishal", "Riya", "Amit"]
```

Or turn data into HTML:

```js
const listHtml = users
  .map(user => `<li>${user.name}</li>`)
  .join("");
```

### The Callback Arguments

The callback actually receives three arguments: the item, its index and the whole array.

```js
const labels = ["a", "b", "c"].map((letter, index) => `${index + 1}. ${letter}`);
console.log(labels); // ["1. a", "2. b", "3. c"]
```

## `filter()`: Keep Only What You Need

`filter` runs a test on each item. If the callback returns a truthy value, the item is kept. If it returns a falsy value, the item is skipped.

```js
const numbers = [5, 12, 8, 130, 44];

const big = numbers.filter(n => n > 10);
console.log(big); // [12, 130, 44]
```

With objects:

```js
const adults = users.filter(user => user.age >= 18);
console.log(adults);
// [{ name: "Bishal", age: 25 }, { name: "Riya", age: 30 }]
```

A handy trick is removing empty values:

```js
const values = ["apple", "", null, "banana", undefined];
const clean = values.filter(Boolean);
console.log(clean); // ["apple", "banana"]
```

`Boolean` is used as the callback, so every falsy value is dropped.

If nothing matches, `filter` returns an empty array `[]`, not `undefined`.

## `reduce()`: Combine Everything Into One Value

`reduce` is the one that confused me the most. It walks through the array and carries a running result, called the **accumulator**, from one item to the next.

```js
const numbers = [10, 20, 30];

const total = numbers.reduce((sum, n) => sum + n, 0);

console.log(total); // 60
```

The parts:

- `sum` is the accumulator, the running total
- `n` is the current item
- `0` is the **initial value** of the accumulator

Step by step:

```text
start:   sum = 0
item 10: sum = 0 + 10  = 10
item 20: sum = 10 + 20 = 30
item 30: sum = 30 + 30 = 60
result:  60
```

### A Shopping Cart Total

```js
const cart = [
  { item: "Book", price: 299, qty: 2 },
  { item: "Pen", price: 20, qty: 5 },
];

const cartTotal = cart.reduce((total, product) => {
  return total + product.price * product.qty;
}, 0);

console.log(cartTotal); // 698
```

### Building an Object With `reduce`

The accumulator can be anything, not just a number. Here I count how many times each fruit appears:

```js
const fruits = ["apple", "banana", "apple", "mango", "banana", "apple"];

const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(counts); // { apple: 3, banana: 2, mango: 1 }
```

If working with object properties like `acc[fruit]` is new, see [JavaScript objects explained with examples](https://bishal-biswas.github.io/articles/javascript-objects-beginners).

For simple grouping, modern JavaScript also has `Object.groupBy()`, which is supported in all current major browsers:

```js
const byAdult = Object.groupBy(users, user => (user.age >= 18 ? "adult" : "minor"));
```

## Chaining Methods Together

Because `map` and `filter` return arrays, I can chain them. This is where the code really starts to read like a sentence.

```js
const products = [
  { name: "Laptop", price: 55000, inStock: true },
  { name: "Mouse", price: 700, inStock: false },
  { name: "Keyboard", price: 1500, inStock: true },
];

const totalInStock = products
  .filter(p => p.inStock)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log(totalInStock); // 56500
```

Read it from top to bottom: keep products in stock, take their prices, add them up.

This pattern is very common when working with data from an API. I show a full example of fetching JSON and then processing it in [using the JavaScript Fetch API to get JSON data](https://bishal-biswas.github.io/articles/javascript-fetch-api-json).

## What About `forEach`?

`forEach` also loops over every item, but it returns `undefined`. I use it when I want a **side effect**, like logging or updating the page, and I do not need a new array.

```js
users.forEach(user => console.log(user.name));
```

My rule:

- Need a new array of transformed items? `map`
- Need a subset? `filter`
- Need one final value? `reduce`
- Just need to do something for each item? `forEach` or `for...of`

I compare all the loop options in [JavaScript loops: for, while, for...of and forEach](https://bishal-biswas.github.io/articles/javascript-loops-for-while-foreach).

## Common Mistakes

### 1. Forgetting to Return in `map`

```js
const doubled = numbers.map(n => {
  n * 2; // no return
});
console.log(doubled); // [undefined, undefined, undefined, undefined]
```

With braces, you need `return`. Without braces, the return is automatic.

### 2. Using `map` Just to Loop

```js
users.map(user => console.log(user.name)); // creates an unused array
```

If you do not use the result, use `forEach` instead.

### 3. Forgetting the Initial Value in `reduce`

```js
[].reduce((sum, n) => sum + n); // TypeError: Reduce of empty array with no initial value
```

Without an initial value, `reduce` uses the first item as the starting accumulator, which fails on an empty array and gives strange results with arrays of objects. I always pass an initial value.

### 4. Forgetting to Return the Accumulator

```js
const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  // forgot "return acc"
}, {});
```

On the next step, `acc` becomes `undefined` and the code throws an error.

### 5. Expecting `filter` to Return One Item

`filter` always returns an array. If you want the first match only, use `find`, which returns the item itself or `undefined`.

```js
const riya = users.find(user => user.name === "Riya");
```

## Conclusion

`map`, `filter` and `reduce` are three of the most useful tools in JavaScript. `map` transforms each item, `filter` keeps the items that pass a test, and `reduce` combines everything into one value. None of them change the original array.

Start by replacing your simple loops with `map` and `filter`. Once those feel natural, `reduce` will make much more sense. And when you want to combine these with features like destructuring and spread, read [modern JavaScript: destructuring, spread and other ES6 features](https://bishal-biswas.github.io/articles/javascript-es6-features-destructuring-spread).
