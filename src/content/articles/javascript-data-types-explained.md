---
title: "JavaScript Data Types Explained for Beginners"
slug: javascript-data-types-explained
metaDescription: Learn all eight JavaScript data types, the difference between primitives and objects, how typeof works, and the type conversion traps beginners hit.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Data+Types
author: Bishal Biswas
publishDate: 2026-12-21
isDraft: false
category: JavaScript
tags:
  - JavaScript data types
  - primitive types
  - typeof operator
  - type conversion
---

One of my first JavaScript bugs looked like this: I added two numbers from a form and got `"105"` instead of `15`. I stared at it for ages before I realized the "numbers" were actually text.

That bug taught me why data types matter. JavaScript does not make you declare a type when you create a variable, but every value still has one, and the type decides how the value behaves.

In this article, I will go through all the JavaScript data types, show how to check them, and explain the conversion traps that confused me as a beginner.

If you have not seen `let` and `const` yet, read [JavaScript variables: let, const and var](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var) first.

## JavaScript Is Dynamically Typed

In JavaScript, a variable does not have a fixed type. The **value** has the type.

```js
let value = 42;        // number
value = "forty-two";   // now a string
value = true;          // now a boolean
```

This is flexible, but it also means I have to pay attention to what kind of value I am working with.

## The Eight Data Types

JavaScript has **eight** data types. Seven are **primitives**, and one is **object**.

The primitives are:

1. `string`
2. `number`
3. `bigint`
4. `boolean`
5. `undefined`
6. `null`
7. `symbol`

Everything else, including arrays and functions, is an `object`.

## Primitive Types

### String

A string is text. I can use single quotes, double quotes or backticks.

```js
const single = 'Hello';
const double = "Hello";
const name = "Bishal";
const greeting = `Hello, ${name}!`; // template literal
```

Backticks create **template literals**, which let me insert values with `${ }` and write multi-line strings. I use them most of the time when I need to build a string.

Strings have a `length` and many useful methods:

```js
const word = "JavaScript";
console.log(word.length);        // 10
console.log(word.toUpperCase()); // "JAVASCRIPT"
console.log(word.includes("Script")); // true
```

### Number

JavaScript uses one `number` type for both whole numbers and decimals.

```js
const age = 25;
const price = 99.5;
const negative = -10;
```

There are also some special number values:

```js
console.log(1 / 0);        // Infinity
console.log("abc" * 2);    // NaN (Not a Number)
console.log(typeof NaN);   // "number"
```

Yes, `NaN` is of type `number`. It represents a failed numeric operation. To check for it, use `Number.isNaN(value)`, because `NaN === NaN` is `false`.

A famous decimal quirk:

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

This happens because numbers are stored in binary floating point. For money, I usually work in whole units, like cents or paise, to avoid it.

### BigInt

A normal `number` can only represent integers exactly up to `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991). For bigger whole numbers, there is `bigint`. You create one by adding `n` to the end:

```js
const huge = 9007199254740993n;
console.log(huge + 2n); // 9007199254740995n
```

You cannot mix `bigint` and `number` directly in math (`1n + 1` throws a `TypeError`). As a beginner, you will rarely need it, but it is good to know it exists.

### Boolean

A boolean is either `true` or `false`.

```js
const isLoggedIn = true;
const hasErrors = false;

console.log(5 > 3); // true
```

Booleans are what `if` statements and comparisons work with. I cover those in [JavaScript conditionals: if, switch and the ternary operator](https://bishal-biswas.github.io/articles/javascript-conditionals-if-switch-ternary).

### Undefined

`undefined` means a variable exists but has not been given a value.

```js
let result;
console.log(result); // undefined
```

A function with no `return` also returns `undefined`, and reading a property that does not exist gives `undefined`.

### Null

`null` means "intentionally empty". I set it myself when I want to say "there is no value here on purpose".

```js
let selectedUser = null; // nobody selected yet
```

My way of remembering the difference:

> `undefined` = JavaScript says "nothing assigned yet". `null` = I say "this is empty on purpose".

### Symbol

A `symbol` is a unique identifier. Even two symbols with the same description are different.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false
```

Symbols are mostly used for special object keys and by libraries. You can safely skip them early on.

## The Object Type

Objects store collections of data as key and value pairs.

```js
const user = {
  name: "Bishal",
  age: 25,
  isAdmin: false,
};

console.log(user.name); // "Bishal"
```

Arrays and functions are also objects:

```js
const fruits = ["apple", "banana"];
function greet() {}
```

I explain objects in detail in [JavaScript objects explained with examples](https://bishal-biswas.github.io/articles/javascript-objects-beginners).

## Primitives vs Objects

This difference matters a lot when copying values.

Primitives are copied **by value**:

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)
```

Objects are shared **by reference**:

```js
const original = { score: 10 };
const copy = original;
copy.score = 20;
console.log(original.score); // 20 (changed!)
```

Both variables point to the same object. To make a real copy, I use the spread syntax for a shallow copy or `structuredClone()` for a deep copy:

```js
const shallow = { ...original };
const deep = structuredClone(original);
```

## Checking Types With `typeof`

The `typeof` operator returns the type as a string.

```js
typeof "hello";     // "string"
typeof 42;          // "number"
typeof 10n;         // "bigint"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof Symbol();    // "symbol"
typeof {};          // "object"
typeof [];          // "object"
typeof function(){}; // "function"
typeof null;        // "object"  (a famous old bug)
```

Two things to watch:

- `typeof null` returns `"object"`. This is a bug from the very first version of JavaScript that can never be fixed without breaking old websites. Check for null with `value === null`.
- Arrays return `"object"`. Use `Array.isArray(value)` to check for an array.

## Type Conversion

JavaScript often converts types automatically. This is called **type coercion**, and it explains my `"105"` bug.

```js
console.log("10" + 5);  // "105"  (+ with a string joins text)
console.log("10" - 5);  // 5      (- converts to numbers)
console.log("10" * "2"); // 20
```

The `+` operator joins strings if either side is a string. Other math operators try to convert to numbers.

Values from form inputs are **always strings**, even for `<input type="number">`. That is exactly where my bug came from. You can see how inputs work in [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

To convert on purpose:

```js
Number("42");      // 42
Number("42px");    // NaN
parseInt("42px");  // 42
String(42);        // "42"
Boolean(0);        // false
```

### Truthy and Falsy

In an `if` condition, every value is treated as either truthy or falsy. The falsy values are:

```js
false, 0, -0, 0n, "", null, undefined, NaN
```

Everything else is truthy, including `"0"`, `"false"`, `[]` and `{}`.

### `==` vs `===`

```js
console.log(5 == "5");  // true  (converts types first)
console.log(5 === "5"); // false (types are different)
```

I always use `===` and `!==`. They do not convert types, so there are no surprises.

## Common Mistakes

### 1. Adding Strings Instead of Numbers

Convert input values with `Number()` before doing math.

### 2. Checking for `null` With `typeof`

`typeof null` is `"object"`. Use `value === null`.

### 3. Using `==`

Loose equality has confusing conversion rules. Use `===`.

### 4. Copying an Object and Expecting a Separate Copy

`const b = a` shares the same object. Use spread or `structuredClone()`.

### 5. Comparing With `NaN`

`value === NaN` is always `false`. Use `Number.isNaN(value)`.

## Conclusion

JavaScript has eight data types: seven primitives (string, number, bigint, boolean, undefined, null and symbol) and the object type, which also covers arrays and functions.

Primitives are copied by value, objects by reference. Use `typeof` to check most types, `Array.isArray()` for arrays and `=== null` for null. And always be careful with automatic conversion, especially with `+` and form input values.

Once I understood types, a whole category of strange bugs simply disappeared from my code.
