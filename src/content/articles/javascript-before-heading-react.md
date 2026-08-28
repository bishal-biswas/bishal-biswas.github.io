---
title : Javascript before Heading to React
slug : javascript-before-heading-react
featuredImage : javascript-before-heading-react.jpg
author : Bishal Biswas
publishDate : 2025-10-14T08:30
isDraft : false
metaDescription :  Explore my developer portfolio, built with Astro and powered by Vercel & Supabase. Discover articles on web development, project case studies on my blog.
category : Tech Information
tags : [JavaScript, React, Frontend]
---

We’ll go topic by topic with **explanation + examples + small practice task** so you can master each concept properly.

----------

## Variables and Data Types

### Variables

You can declare variables using:

<pre><code  class="language-js">
var name = "Bishal"; // old way — avoid using this
let age = 24; // preferred for mutable variables
const country = "India"; // preferred for constants
</code></pre>

**Difference:**

-   `let` → can change value  
-   `const` → cannot change value
-   `var` → avoid (function-scoped, not block-scoped)

----------

### Data Types

1.  **String** → `"Hello"`    
2.  **Number** → `42`    
3.  **Boolean** → `true` / `false`    
4.  **Undefined** → declared but not assigned    
5.  **Null** → intentionally empty    
6.  **Object** → `{ key: value }`    
7.  **Array** → `[1, 2, 3]`    
8.  **Symbol / BigInt** _(rare, advanced)_

🧩 **Example:**

<pre><code  class="language-js">
let person = {
	name: "Bishal",
	age: 24,
	skills: ["C#", "React", "Angular"]
};
  
console.log(person.name); // Bishal
console.log(person.skills[1]); // React
</code></pre>

✅ **Practice Task:**  
Create variables for your profile (name, age, skills, country) and log them in a sentence.

----------

## Functions

React components are functions — so this is _crucial_.

### Basic Function
<pre><code  class="language-js">
function greet(name) {
	return `Hello, ${name}!`;
}
console.log(greet("Bishal"));
</code></pre>

### Arrow Function (modern)

<pre><code  class="language-js">
const greet = (name) => `Hello, ${name}!`;
</code></pre>

Arrow functions don’t have their own `this`, which becomes important in React event handlers.

✅ **Practice Task:**  
Write a function `sum(a, b)` that returns their sum, and then write it again using an arrow function.

----------

## Objects and Arrays

### Objects

Used for key-value pairs:
<pre><code  class="language-js">
const user = {
	name: "Bishal",
	city: "Kolkata"
};
console.log(user.city);
</code></pre>

### Arrays

Ordered lists:
<pre><code  class="language-js">
const languages = ["C#", "JS", "Python"];
console.log(languages[1]); // JS
</code></pre>

----------

### Array Methods

You’ll use these _a lot_ in React when rendering lists.

<pre><code  class="language-js">
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2); // [2,4,6,8,10]
const evens = nums.filter(n => n % 2 === 0); // [2,4]
const total = nums.reduce((a, b) => a + b, 0); // 15
</code></pre>

✅ **Practice Task:**  
Create an array of objects like:
<pre><code  class="language-js">
[{name:"Song1", duration:3}, {name:"Song2", duration:4}]
</code></pre>

Then print all song names using `.map()`.

----------

## Destructuring & Spread Operator

### Destructuring

Extract values easily:
<pre><code  class="language-js">
const user = { name: "Bishal", age: 24 };
const { name, age } = user;
console.log(name, age);
</code></pre>

For arrays:
<pre><code  class="language-js">
const [a, b] = [10, 20];
</code></pre>

### Spread Operator (`...`)

Used to copy or merge arrays/objects (you’ll use this constantly in React state updates).
<pre><code  class="language-js">
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1,2,3,4];
const user = { name: "Bishal" };
const updatedUser = { ...user, age: 24 }; // merge
</code></pre>

✅ **Practice Task:**  
Use spread to clone an array, and modify only one element without changing the original.

----------

## Conditionals and Loops

### if / else
<pre><code  class="language-js">
if (age > 18) {
	console.log("Adult");
} else {
	console.log("Minor");
}
</code></pre>

### Ternary Operator (React uses this a lot)

<pre><code  class="language-js">
const message = age > 18 ? "Adult" : "Minor";
</code></pre>

### Loops
<pre><code  class="language-js">
for (let i = 0; i < 5; i++) console.log(i);
const nums = [1, 2, 3];
for (let n of nums) console.log(n);
</code></pre> 

✅ **Practice Task:**  
Use ternary operator to print “Senior Developer” if yearsOfExperience > 3, otherwise “Junior Developer”.

----------

## Functions + Objects (This and Arrow)

Understanding `this` is useful later in React class components or event binding.
<pre><code  class="language-js">
const user = {
	name: "Bishal",
	greet: function() {
		console.log("Hi " + this.name);
	}
};
user.greet();
</code></pre>
If you use an arrow function:
<pre><code  class="language-js">
const user = {
	name: "Bishal",
	greet: () => console.log("Hi " + this.name)
};

</code></pre>

user.greet(); // undefined (because arrow doesn’t have its own `this`)`` 

✅ **Remember:** Avoid `this` when possible — React functional components handle scope differently.

----------

## Asynchronous JavaScript

React uses async operations (like fetching APIs) in `useEffect`.

### Promises
<pre><code  class="language-js">
fetch("https://jsonplaceholder.typicode.com/posts")
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.error(err));
</code></pre>

### Async/Await

A cleaner version:
<pre><code  class="language-js">
async function getData() {
try {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await res.json();
	console.log(data);
	} catch (err) {
		console.error(err);
	}
}
getData();
</code></pre>

✅ **Practice Task:**  
Fetch any public API and log 5 results in console.

----------

## ES Modules

React uses imports and exports everywhere.
<pre><code  class="language-js">
// utils.js
export function greet(name) {
return `Hi, ${name}`;
}
// app.js
import { greet } from './utils.js';
console.log(greet("Bishal"));
</code></pre>

✅ **Practice Task:**  
Create two JS files — one with a function, another that imports and uses it.

----------

## DOM Manipulation (Just to Understand)

React _replaces_ manual DOM manipulation, but you must know what it does:
<pre><code  class="language-js">
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
	document.body.style.backgroundColor = "lightblue";
});
</code></pre>

----------

## Summary — Before React You Should Know

Comfortable with:

-   `let`, `const`, data types
-   Objects & Arrays
-   Functions & Arrow Functions
-   `map`, `filter`, `reduce`
-   Destructuring, Spread operator
-   Async/Await, Fetch
-   Conditional rendering with ternary
-   ES Modules (`import`, `export`)