---
title: "JavaScript Scope, Hoisting and Closures Explained"
slug: javascript-scope-hoisting-closures
metaDescription: Learn JavaScript scope, hoisting and closures in plain language, with examples of global, function and block scope, the temporal dead zone, and real closures.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Closures
author: Bishal Biswas
publishDate: 2027-01-06
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - JavaScript scope
  - Hoisting
  - Closures
---

Scope, hoisting and closures are three topics that show up in almost every JavaScript interview. They also explain a lot of the "weird" behaviour beginners run into.

When I first read about closures, the definitions sounded very abstract. It only clicked when I saw a few small, practical examples.

In this article, I will explain scope, hoisting and closures in plain language, one step at a time. Each idea builds on the one before it, so I recommend reading them in order.

It will help if you already know how [let, const and var](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var) differ, and how [functions and arrow functions](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions) work.

## What Is Scope?

**Scope** decides where a variable can be accessed in your code.

Think of it like rooms in a house. A variable declared in one room may not be visible from another room.

JavaScript has three main kinds of scope:

1. Global scope
2. Function scope
3. Block scope

### Global Scope

A variable declared outside any function or block is in the global scope. It can be used anywhere:

```js
const siteName = "My Portfolio";

function showName() {
  console.log(siteName); // works
}

showName();
```

Global variables are convenient, but too many of them make code harder to manage, because any part of the program can change them.

### Function Scope

Variables declared inside a function only exist inside that function:

```js
function greet() {
  const message = "Hello!";
  console.log(message);
}

greet();
console.log(message); // ReferenceError: message is not defined
```

### Block Scope

A **block** is any code inside curly braces, such as an `if` or a `for` loop. Variables declared with `let` and `const` are limited to that block:

```js
if (true) {
  const color = "blue";
  let size = 10;
}

console.log(color); // ReferenceError
```

But `var` ignores block scope. It only respects function scope:

```js
if (true) {
  var leaked = "I escaped!";
}

console.log(leaked); // "I escaped!"
```

This is one of the main reasons modern code uses `let` and `const` instead of `var`.

## The Scope Chain

When JavaScript looks for a variable, it starts in the current scope. If it does not find it, it moves outward to the parent scope, then the next one, until it reaches the global scope.

```js
const a = "global";

function outer() {
  const b = "outer";

  function inner() {
    const c = "inner";
    console.log(a, b, c); // "global outer inner"
  }

  inner();
}

outer();
```

`inner` can see `b` and `a`, but `outer` cannot see `c`. Lookups only go outward, never inward.

This is called **lexical scope**: what a function can access depends on where it was **written** in the code, not where it is called from. Keep that in mind, because closures depend on it.

## What Is Hoisting?

Before your code runs, JavaScript sets up all the declarations in each scope. This behaviour is called **hoisting**. It can make it look as if declarations were "moved to the top".

How it behaves depends on what you declared.

### Function Declarations Are Fully Hoisted

You can call a function declaration before it appears in the code:

```js
sayHi(); // "Hi!"

function sayHi() {
  console.log("Hi!");
}
```

### var Is Hoisted as undefined

```js
console.log(score); // undefined
var score = 10;
```

The declaration is hoisted, but the value is not. So `score` exists, but it is `undefined` until the assignment line runs.

### let and const Are Hoisted, but in the Temporal Dead Zone

```js
console.log(total); // ReferenceError: Cannot access 'total' before initialization
let total = 5;
```

`let` and `const` are also hoisted, but you cannot touch them until the line where they are declared. The time between the start of the scope and that line is called the **temporal dead zone** (TDZ).

I actually find this helpful. An error is much easier to debug than a silent `undefined`.

### Function Expressions Follow Their Variable

```js
greet(); // ReferenceError (TDZ)

const greet = () => console.log("Hello");
```

Because `greet` is a `const`, it follows the `const` rules, not the function declaration rules.

## What Is a Closure?

Here is the simplest definition I know:

> A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished running.

Let's see it:

```js
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Normally, when `makeCounter` finishes, you would expect `count` to disappear. But the inner function still uses `count`, so JavaScript keeps it alive. The inner function **closes over** `count`.

Each call to `makeCounter` creates a fresh `count`:

```js
const a = makeCounter();
const b = makeCounter();

a(); // 1
a(); // 2
b(); // 1
```

## Why Closures Are Useful

### Private Data

Nothing outside `makeCounter` can change `count` directly. The only way is through the function we returned. This is a simple way to keep data private:

```js
function createWallet(start) {
  let balance = start;

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}

const wallet = createWallet(100);
wallet.deposit(50);
console.log(wallet.getBalance()); // 150
console.log(wallet.balance);      // undefined
```

### Function Factories

Closures let you create customised functions:

```js
function multiplyBy(factor) {
  return (number) => number * factor;
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Event Handlers

You use closures all the time without noticing, especially in event listeners:

```js
function setupButton(button, label) {
  button.addEventListener("click", () => {
    console.log(`${label} clicked`);
  });
}
```

The arrow function remembers `label` long after `setupButton` has returned. I talk more about listeners in [JavaScript events and addEventListener](https://bishal-biswas.github.io/articles/javascript-events-addeventlistener).

## The Classic Loop Problem

This example shows scope and closures working together:

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 4, 4, 4
```

Because `var` is function-scoped, there is only **one** `i`, and by the time the timers run, it is `4`.

Changing `var` to `let` fixes it:

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 1, 2, 3
```

With `let`, each loop iteration gets its own `i`, and each closure remembers its own copy.

## Common Mistakes

### 1. Using var and Expecting Block Scope

`var` leaks out of `if` blocks and loops. Use `let` and `const`.

### 2. Using a Variable Before Declaring It

With `let` and `const`, this throws a `ReferenceError`. Declare variables before you use them.

### 3. Accidentally Creating Globals

Assigning to an undeclared variable outside strict mode creates a global:

```js
function setup() {
  total = 10; // no let/const, becomes global in sloppy mode
}
```

ES modules and classes run in strict mode automatically, where this throws an error instead.

### 4. Thinking Closures Copy Values

A closure keeps a live reference to the variable, not a snapshot. If the variable changes later, the closure sees the new value.

### 5. Shadowing Without Realising It

```js
const name = "Global";

function show() {
  const name = "Local";
  console.log(name); // "Local"
}
```

Reusing names in inner scopes is legal, but it can be confusing. I try to pick distinct names.

## Conclusion

Scope controls where variables are visible. Hoisting explains why some declarations can be used before they appear and others throw errors. Closures let functions remember the variables around them.

My practical summary: use `let` and `const`, declare things before you use them, and remember that a function always carries its surrounding scope with it.

Once closures make sense, many advanced patterns, including callbacks and [promises with async/await](https://bishal-biswas.github.io/articles/javascript-promises-async-await), become much easier to follow.
