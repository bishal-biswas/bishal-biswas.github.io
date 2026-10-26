---
title: "JavaScript Functions and Arrow Functions Explained"
slug: javascript-functions-arrow-functions
metaDescription: Learn how JavaScript functions work, from declarations and expressions to arrow functions, parameters, default values, return values and the this keyword.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Functions
author: Bishal Biswas
publishDate: 2026-12-23
isDraft: false
category: JavaScript
tags:
  - JavaScript functions
  - arrow functions
  - function parameters
  - return statement
---

Before I understood functions, my JavaScript files were long lists of instructions, often with the same few lines copied three or four times. When something needed to change, I had to remember every copy.

Functions fixed that. A function lets me write some code once, give it a name, and run it whenever I need it.

In this article, I will explain how to create functions, how parameters and return values work, what arrow functions are, and when I choose one style over another.

## What Is a Function?

A function is a reusable block of code that does a specific job.

```js
function sayHello() {
  console.log("Hello!");
}

sayHello(); // "Hello!"
sayHello(); // "Hello!"
```

There are two separate steps:

- **Defining** the function: writing what it does
- **Calling** the function: running it with `sayHello()`

The parentheses `()` are what actually run the function. Writing `sayHello` without them just refers to the function itself.

## Parameters and Arguments

Functions become really useful when they accept input.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Bishal"); // "Hello, Bishal!"
greet("Riya");   // "Hello, Riya!"
```

- `name` is a **parameter**: a placeholder in the definition.
- `"Bishal"` is an **argument**: the actual value passed in when calling.

A function can have several parameters:

```js
function add(a, b) {
  console.log(a + b);
}

add(2, 3); // 5
```

### Default Parameters

If an argument is not passed, the parameter is `undefined`. I can give it a default value instead:

```js
function greet(name = "friend") {
  console.log(`Hello, ${name}!`);
}

greet();         // "Hello, friend!"
greet("Bishal"); // "Hello, Bishal!"
```

### Rest Parameters

To accept any number of arguments, I use the rest syntax `...`:

```js
function sum(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

sum(1, 2, 3, 4); // 10
```

`numbers` becomes a real array.

## Returning a Value

`console.log` only prints. To get a value **back** from a function, I use `return`.

```js
function multiply(a, b) {
  return a * b;
}

const result = multiply(4, 5);
console.log(result); // 20
```

Two things about `return`:

1. It immediately stops the function. Code after it does not run.
2. If a function has no `return`, it returns `undefined`.

```js
function checkAge(age) {
  if (age < 18) {
    return "Too young";
  }
  return "Welcome";
}
```

This "return early" pattern keeps code flat and easy to read.

## Function Declarations vs Function Expressions

### Function Declaration

```js
function square(n) {
  return n * n;
}
```

Function declarations are **hoisted**, which means I can call them before the line where they are written:

```js
console.log(square(3)); // 9

function square(n) {
  return n * n;
}
```

### Function Expression

A function can also be stored in a variable:

```js
const square = function (n) {
  return n * n;
};
```

This is not hoisted the same way. Because it uses `const`, calling it before that line throws a `ReferenceError`. I explain why in [JavaScript variables: let, const and var](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var), and hoisting in more detail in [JavaScript scope, hoisting and closures](https://bishal-biswas.github.io/articles/javascript-scope-hoisting-closures).

## Arrow Functions

Arrow functions are a shorter way to write function expressions. They were added in ES2015 and are now everywhere.

```js
// Function expression
const add = function (a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => {
  return a + b;
};
```

### Implicit Return

If the body is a single expression, I can drop the braces and the `return`:

```js
const add = (a, b) => a + b;
const double = n => n * 2;      // one parameter: parentheses optional
const getTime = () => Date.now(); // no parameters: empty parentheses needed
```

The value of the expression is returned automatically.

### Returning an Object

This one caught me out. Braces after the arrow are treated as a function body, not an object:

```js
const makeUser = name => { name: name };   // returns undefined!
const makeUser2 = name => ({ name: name }); // returns { name: "..." }
```

Wrap the object in parentheses to return it.

### Where Arrow Functions Shine

Arrow functions are perfect for short callbacks, which is why you will see them so often with array methods:

```js
const prices = [100, 250, 80];

const withTax = prices.map(price => price * 1.18);
const cheap = prices.filter(price => price < 200);
```

I explain these methods properly in [JavaScript array methods: map, filter and reduce](https://bishal-biswas.github.io/articles/javascript-arrays-methods-map-filter-reduce).

## Arrow Functions and `this`

The biggest real difference is how they handle `this`.

A regular function gets its own `this`, decided by **how it is called**. An arrow function does **not** have its own `this`. It uses the `this` from the place where it was written.

```js
const user = {
  name: "Bishal",
  regularGreet: function () {
    console.log(this.name);
  },
  arrowGreet: () => {
    console.log(this.name);
  },
};

user.regularGreet(); // "Bishal"
user.arrowGreet();   // undefined (this is not the user object)
```

So for **object methods**, I use regular functions or the shorter method syntax:

```js
const user = {
  name: "Bishal",
  greet() {
    console.log(this.name);
  },
};
```

But arrow functions are great **inside** methods, because they keep the outer `this`:

```js
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // "this" is still timer
    }, 1000);
  },
};
```

Arrow functions also cannot be used as constructors with `new`, and they do not have their own `arguments` object. Use rest parameters instead.

## Functions as Values

In JavaScript, functions are values. I can store them, pass them to other functions and return them.

```js
function runTwice(action) {
  action();
  action();
}

runTwice(() => console.log("Hi")); // "Hi" "Hi"
```

A function passed to another function is called a **callback**. Event listeners are a great example:

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

More on that in [JavaScript events and addEventListener](https://bishal-biswas.github.io/articles/javascript-events-addeventlistener).

## Which Style Do I Use?

| Situation | My choice |
|---|---|
| A main, named helper function | Function declaration |
| Short callback (map, filter, events) | Arrow function |
| Object method that uses `this` | Method syntax `greet() {}` |
| Callback inside a method that needs the outer `this` | Arrow function |

## Common Mistakes

### 1. Forgetting to Call the Function

```js
button.addEventListener("click", handleClick());  // runs immediately!
button.addEventListener("click", handleClick);    // correct
```

### 2. Forgetting `return`

```js
function add(a, b) {
  a + b; // calculated, but not returned
}
add(1, 2); // undefined
```

### 3. Adding Braces to a One-Line Arrow Function Without `return`

```js
const double = n => { n * 2 };  // undefined
const double2 = n => n * 2;     // returns n * 2
```

### 4. Using Arrow Functions as Object Methods

They do not get their own `this`, so `this.name` will not point to the object.

### 5. Functions That Do Too Much

If a function is 80 lines long and does five jobs, split it. One function, one job.

## Conclusion

Functions are the building blocks of JavaScript. A function takes parameters, does some work and can return a value. You can write one as a declaration, an expression or an arrow function.

My simple rule: named declarations for main helpers, arrow functions for short callbacks, and method syntax for object methods that use `this`.

Functions are also at the heart of modern frameworks. Every React component is a function, which is why functions are high on my list of [JavaScript to learn before React](https://bishal-biswas.github.io/articles/javascript-before-heading-react).
