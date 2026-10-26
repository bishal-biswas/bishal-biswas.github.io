---
title: "JavaScript Loops: for, while, for...of and forEach"
slug: javascript-loops-for-while-foreach
metaDescription: Learn JavaScript loops with simple examples, including for, while, do...while, for...of, for...in and forEach, plus when to use each and common mistakes.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Loops
author: Bishal Biswas
publishDate: 2027-01-02
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - JavaScript loops
  - for...of
  - forEach
---

When I started programming, I wrote the same line of code again and again whenever I needed to do something more than once. It did not take long to realise there had to be a better way.

That better way is a **loop**.

A loop lets you repeat a block of code until a condition is met, or once for every item in a list. JavaScript has several kinds of loops, and at first it was not obvious to me which one to pick.

In this article, I will explain `for`, `while`, `do...while`, `for...of`, `for...in` and `forEach`, and share the simple rules I use to choose between them.

## Why Do We Need Loops?

Imagine printing the numbers 1 to 5:

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

That is fine for five numbers, but not for five hundred. With a loop:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Same result, and changing `5` to `500` is a one-character edit.

## The Classic for Loop

The `for` loop has three parts inside the parentheses:

```js
for (initialization; condition; update) {
  // code to repeat
}
```

- **Initialization** runs once at the start: `let i = 0`
- **Condition** is checked before every repetition: `i < 5`
- **Update** runs after every repetition: `i++`

A common use is looping through an array by index:

```js
const fruits = ["apple", "banana", "mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}
```

I reach for a classic `for` loop when I need the index, want to count backwards, or want to skip by more than one:

```js
for (let i = 10; i > 0; i -= 2) {
  console.log(i); // 10, 8, 6, 4, 2
}
```

Always use `let` for the counter, not `var`. With `let`, each repetition gets its own copy of `i`, which matters when you use it inside callbacks. I explain why in [let, const and var explained](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var).

## The while Loop

A `while` loop keeps running as long as its condition is true:

```js
let count = 3;

while (count > 0) {
  console.log(count);
  count--;
}
console.log("Lift off!");
```

I use `while` when I do not know in advance how many times the loop should run. For example, retrying until something succeeds, or reading input until the user types "quit".

```js
let attempts = 0;
let success = false;

while (!success && attempts < 3) {
  attempts++;
  success = Math.random() > 0.5;
}
```

## The do...while Loop

`do...while` is like `while`, except the body always runs **at least once**, because the condition is checked at the end:

```js
let number;

do {
  number = Math.floor(Math.random() * 10);
  console.log(number);
} while (number !== 7);
```

Honestly, I do not use this often, but it is handy when the first run has to happen no matter what.

## The for...of Loop

`for...of` loops over the **values** of anything iterable, such as arrays, strings, `Map`, `Set` and `NodeList`:

```js
const colors = ["red", "green", "blue"];

for (const color of colors) {
  console.log(color);
}
```

It also works on strings:

```js
for (const letter of "Hi!") {
  console.log(letter); // H, i, !
}
```

This is my default loop for arrays. It is short, readable, and supports `break` and `continue`.

If you need the index too, use `entries()`:

```js
for (const [index, color] of colors.entries()) {
  console.log(index, color);
}
```

## The for...in Loop

`for...in` loops over the **keys** (property names) of an object:

```js
const user = { name: "Bishal", role: "Developer" };

for (const key in user) {
  console.log(key, user[key]);
}
```

I avoid `for...in` on arrays. It gives you the indexes as strings, and it can include inherited properties. For objects, I usually prefer `Object.entries()` with `for...of`:

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

You can learn more about objects in [JavaScript objects explained with examples](https://bishal-biswas.github.io/articles/javascript-objects-beginners).

## The forEach Method

`forEach` is not a loop statement. It is an **array method** that calls a function for each item:

```js
const scores = [80, 92, 75];

scores.forEach((score, index) => {
  console.log(`Student ${index + 1}: ${score}`);
});
```

It reads nicely, and you get the item and index as arguments.

There are some important limitations though:

- You **cannot** use `break` or `continue` inside it
- `return` only exits the current callback, not the whole loop
- It does not wait for `await` inside the callback

If you need to stop early or use `await`, use `for...of` instead.

Also, if your goal is to build a new array, `map` or `filter` is usually a better fit than `forEach`. I cover those in [map, filter and reduce](https://bishal-biswas.github.io/articles/javascript-arrays-methods-map-filter-reduce).

## break and continue

`break` exits the loop completely:

```js
const numbers = [3, 8, 12, 5];

for (const n of numbers) {
  if (n > 10) {
    console.log("Found:", n);
    break;
  }
}
```

`continue` skips to the next repetition:

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i); // 1, 2, 4, 5
}
```

## Which Loop Should I Use?

Here is the quick guide I follow:

| Situation | Loop |
|---|---|
| Go through every item of an array | `for...of` |
| Need the index or a custom step | classic `for` |
| Unknown number of repetitions | `while` |
| Must run at least once | `do...while` |
| Go through an object's keys | `Object.entries()` + `for...of` |
| Run a side effect for each item, no early exit | `forEach` |
| Build a new array | `map` / `filter` (not a loop) |

## A Practical DOM Example

Loops are very common when working with the page. Here is one that highlights every link pointing to an external site:

```js
const links = document.querySelectorAll("a");

for (const link of links) {
  if (link.hostname !== location.hostname) {
    link.classList.add("external");
  }
}
```

## Common Mistakes

### 1. Infinite Loops

Forgetting to update the condition variable means the loop never ends and the tab freezes:

```js
let i = 0;
while (i < 5) {
  console.log(i);
  // forgot i++
}
```

### 2. Off-by-One Errors

Arrays start at index 0, so the last index is `length - 1`:

```js
for (let i = 0; i <= arr.length; i++) // wrong, goes one too far
for (let i = 0; i < arr.length; i++)  // correct
```

### 3. Using for...in on Arrays

Use `for...of` for arrays and save `for...in` for objects.

### 4. Trying to break Out of forEach

It will throw a syntax error. Switch to `for...of`.

### 5. Using await Inside forEach

`forEach` will not wait. Use `for...of` with `await` when the order matters.

## Conclusion

Loops let you repeat work without repeating code. JavaScript offers several kinds, but you do not need all of them every day.

In practice, I use `for...of` most of the time, a classic `for` when I need the index, `while` when the number of repetitions is unknown, and array methods like `map` and `filter` when I am transforming data.

Pick the loop that makes your intent clearest, and always make sure your loop has a way to stop.
