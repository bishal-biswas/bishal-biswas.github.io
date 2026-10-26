---
title: "JavaScript Objects Explained With Examples"
slug: javascript-objects-beginners
metaDescription: Learn JavaScript objects from scratch, including properties, methods, dot and bracket notation, looping over keys, and common beginner mistakes.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Objects
author: Bishal Biswas
publishDate: 2026-12-27
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - JavaScript objects
  - Object properties
  - Object methods
---

When I first started learning JavaScript, I stored everything in separate variables. A user's name in one variable, their age in another, their email in a third. It worked, but it got messy very quickly.

Then I learned about objects, and things started to make sense.

An object lets you group related data together under one name. Almost everything you work with in JavaScript, from DOM elements to JSON from an API, is an object or behaves like one.

In this article, I will explain what JavaScript objects are, how to create them, how to read and change their properties, and the mistakes I made when I was learning them.

If you are still getting comfortable with the basic value types, you may want to read [JavaScript data types explained for beginners](https://bishal-biswas.github.io/articles/javascript-data-types-explained) first.

## What Is a JavaScript Object?

An object is a collection of **key-value pairs**. Each key is called a **property name**, and each value can be anything: a string, a number, an array, a function, or even another object.

Here is a simple object:

```js
const user = {
  name: "Bishal",
  age: 25,
  isAdmin: false
};
```

In this example:

- `name`, `age`, and `isAdmin` are the keys
- `"Bishal"`, `25`, and `false` are the values

I like to think of an object as a labelled box. Instead of remembering what is in position 0 or position 1 (like an array), you look things up by their label.

## Creating Objects

The most common way to create an object is with **object literal** syntax, which is the curly braces you saw above.

```js
const book = {
  title: "Learning JavaScript",
  pages: 320
};
```

You can also start with an empty object and add properties later:

```js
const settings = {};
settings.theme = "dark";
settings.fontSize = 16;
```

There is also `new Object()`, but in practice I almost never see it in modern code. The literal syntax is shorter and clearer.

## Reading Properties

There are two ways to read a property: **dot notation** and **bracket notation**.

### Dot Notation

```js
console.log(user.name); // "Bishal"
console.log(user.age);  // 25
```

Dot notation is what I use most of the time. It is short and easy to read.

### Bracket Notation

```js
console.log(user["name"]); // "Bishal"
```

Bracket notation becomes useful in two situations.

The first is when the key is stored in a variable:

```js
const key = "age";
console.log(user[key]); // 25
```

The second is when the key is not a valid identifier, such as a key with a space or a dash:

```js
const product = {
  "product-id": 101,
  "display name": "Keyboard"
};

console.log(product["product-id"]);   // 101
console.log(product["display name"]); // "Keyboard"
```

You cannot write `product.product-id`, because JavaScript would read that as `product.product` minus `id`.

## Adding, Changing and Deleting Properties

Objects are **mutable**, which means you can change them after they are created.

```js
const user = { name: "Bishal" };

user.age = 25;          // add a property
user.name = "Bishal B"; // change a property
delete user.age;        // remove a property

console.log(user); // { name: "Bishal B" }
```

Notice that `user` is declared with `const`, but I can still change its properties. This confused me at first. `const` only stops you from reassigning the variable itself. It does not freeze the object inside it. I go into this in more detail in [let, const and var explained](https://bishal-biswas.github.io/articles/javascript-variables-let-const-var).

```js
const user = { name: "Bishal" };
user.name = "Rahul"; // allowed
// user = {};        // TypeError: Assignment to constant variable
```

## Methods: Functions Inside Objects

When a property's value is a function, we call it a **method**.

```js
const user = {
  name: "Bishal",
  greet() {
    return `Hi, I am ${this.name}`;
  }
};

console.log(user.greet()); // "Hi, I am Bishal"
```

Inside a regular method, `this` refers to the object the method was called on. So `this.name` gives us `"Bishal"`.

One thing to watch out for: arrow functions do not have their own `this`. If you write a method as an arrow function, `this` will not point to the object.

```js
const user = {
  name: "Bishal",
  greet: () => `Hi, I am ${this.name}`
};

console.log(user.greet()); // "Hi, I am undefined"
```

For object methods, I stick to the shorthand `greet() { }` syntax. You can read more about the differences in [JavaScript functions and arrow functions](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions).

## Nested Objects

Objects can contain other objects and arrays:

```js
const user = {
  name: "Bishal",
  address: {
    city: "Kolkata",
    country: "India"
  },
  skills: ["HTML", "CSS", "JavaScript"]
};

console.log(user.address.city); // "Kolkata"
console.log(user.skills[2]);    // "JavaScript"
```

This is exactly the shape of data you get back from most APIs.

### Optional Chaining

What if `address` might not exist? Accessing `user.address.city` would throw an error. Optional chaining (`?.`) solves this:

```js
const guest = { name: "Guest" };

console.log(guest.address?.city); // undefined, no error
```

## Checking If a Property Exists

There are a few ways to check:

```js
const user = { name: "Bishal", age: 0 };

console.log("age" in user);           // true
console.log(Object.hasOwn(user, "age")); // true
console.log(user.email === undefined);    // true
```

I prefer `Object.hasOwn()` or `in` over checking truthiness. A check like `if (user.age)` would be `false` here because `0` is falsy, even though the property exists.

## Looping Over an Object

Objects are not arrays, so you cannot use `map` on them directly. Instead, JavaScript gives you three useful helpers:

```js
const scores = { math: 90, science: 85, english: 78 };

console.log(Object.keys(scores));    // ["math", "science", "english"]
console.log(Object.values(scores));  // [90, 85, 78]
console.log(Object.entries(scores)); // [["math", 90], ["science", 85], ["english", 78]]
```

`Object.entries()` combined with `for...of` is my favourite way to loop:

```js
for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}
```

Because these return arrays, you can also chain array methods like `filter` and `map` on them.

## Copying Objects

Objects are stored **by reference**. If you assign an object to another variable, both variables point to the same object.

```js
const a = { count: 1 };
const b = a;

b.count = 2;
console.log(a.count); // 2
```

To make a shallow copy, use the spread syntax:

```js
const original = { count: 1 };
const copy = { ...original };

copy.count = 2;
console.log(original.count); // 1
```

For nested objects, a shallow copy still shares the inner objects. In modern browsers you can use `structuredClone()` for a deep copy:

```js
const deepCopy = structuredClone(user);
```

I cover spread in more depth in [destructuring, spread and other ES6 features](https://bishal-biswas.github.io/articles/javascript-es6-features-destructuring-spread).

## Common Mistakes

### 1. Using Dot Notation With a Variable

```js
const key = "name";
console.log(user.key);  // undefined (looks for a property literally called "key")
console.log(user[key]); // "Bishal"
```

### 2. Thinking `const` Makes an Object Unchangeable

`const` prevents reassignment, not mutation. If you truly need a read-only object, use `Object.freeze()`, which is shallow.

### 3. Comparing Objects With `===`

```js
console.log({ a: 1 } === { a: 1 }); // false
```

Two separate objects are never equal, even with the same contents, because `===` compares references.

### 4. Accidentally Sharing a Reference

Assigning `const b = a` does not copy anything. Use spread or `structuredClone()` when you need a separate object.

### 5. Using Arrow Functions as Methods

As shown earlier, arrow functions do not get their own `this`, so they rarely make good object methods.

## Conclusion

Objects are one of the most important building blocks in JavaScript. They let you group related data, attach behaviour with methods, and model real things like users, products, and settings.

The key ideas to remember are simple: objects store key-value pairs, you read them with dot or bracket notation, they are mutable even with `const`, and they are passed around by reference.

Once you are comfortable with objects, working with the DOM, JSON, and APIs becomes much easier, because all of those are built on the same idea.
