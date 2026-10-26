---
title: "JavaScript Conditionals: if, switch and the Ternary Operator"
slug: javascript-conditionals-if-switch-ternary
metaDescription: Learn JavaScript conditionals with simple examples, including if, else if, else, switch, the ternary operator, truthy and falsy values, and logical operators.
image: https://placehold.co/1200x630/00151f/f7df1e/png?text=JS+Conditionals
author: Bishal Biswas
publishDate: 2027-01-04
isDraft: false
category: JavaScript
tags:
  - JavaScript
  - JavaScript conditionals
  - switch statement
  - Ternary operator
---

Every program has to make decisions. Show the login button or the logout button? Is the password long enough? Is it morning or evening?

In JavaScript, we make these decisions with **conditionals**.

When I first learned conditionals, I wrote long chains of `if` statements for everything. Later I discovered `switch`, the ternary operator, and a few shortcuts that made my code much cleaner.

In this article, I will explain `if`, `else if`, `else`, `switch` and the ternary operator, along with truthy and falsy values, which are the source of many beginner bugs.

## The if Statement

The `if` statement runs a block of code only when a condition is true:

```js
const age = 20;

if (age >= 18) {
  console.log("You can vote.");
}
```

The condition goes inside the parentheses. If it evaluates to `true`, the code in the curly braces runs. If not, it is skipped.

## if...else

Add `else` to handle the opposite case:

```js
const isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in.");
}
```

## else if

When there are more than two possibilities, chain them with `else if`:

```js
const score = 72;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 75) {
  console.log("Grade B");
} else if (score >= 50) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

JavaScript checks each condition from top to bottom and runs the **first** one that is true. The rest are skipped. That means the order matters. If I had put `score >= 50` first, every passing score would be a "C".

## Comparison Operators

Conditions usually use comparison operators:

| Operator | Meaning |
|---|---|
| `===` | equal (value and type) |
| `!==` | not equal (value and type) |
| `>` / `<` | greater / less than |
| `>=` / `<=` | greater or equal / less or equal |

Always prefer `===` over `==`. The double equals converts types before comparing, which leads to surprises:

```js
console.log(0 == "");   // true
console.log(0 === "");  // false
console.log("5" == 5);  // true
console.log("5" === 5); // false
```

## Logical Operators

You can combine conditions with logical operators:

- `&&` (AND) is true only if both sides are true
- `||` (OR) is true if at least one side is true
- `!` (NOT) flips true and false

```js
const age = 25;
const hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Enjoy the show!");
}

const day = "Sunday";
if (day === "Saturday" || day === "Sunday") {
  console.log("It's the weekend.");
}

if (!hasTicket) {
  console.log("Buy a ticket first.");
}
```

## Truthy and Falsy Values

This is something I wish I had learned on day one.

A condition does not have to be a real boolean. JavaScript converts whatever you give it into `true` or `false`.

These values are **falsy**:

- `false`
- `0` and `-0`
- `0n` (BigInt zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is **truthy**, including `"0"`, `"false"`, `[]` and `{}`.

```js
const username = "";

if (username) {
  console.log(`Hello, ${username}`);
} else {
  console.log("No username given");
}
```

This is handy, but it can bite you. If a valid value can be `0`, a truthy check will treat it as missing:

```js
const quantity = 0;

if (quantity) {
  console.log("Has quantity"); // never runs, even though 0 is valid
}
```

In that case, be explicit: `if (quantity !== undefined)`. You can read more about value types in [JavaScript data types explained for beginners](https://bishal-biswas.github.io/articles/javascript-data-types-explained).

## The switch Statement

When you compare one value against many fixed options, `switch` can be easier to read than a long `else if` chain:

```js
const day = "Tue";

switch (day) {
  case "Mon":
    console.log("Start of the week");
    break;
  case "Tue":
  case "Wed":
  case "Thu":
    console.log("Midweek");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Weekend");
}
```

A few things to notice:

- `switch` compares using strict equality (`===`)
- `break` stops execution; without it, the code **falls through** into the next case
- Grouping cases like `"Tue"`, `"Wed"`, `"Thu"` is a deliberate use of fall-through
- `default` runs when no case matches

I use `switch` when I am checking one variable against several exact values, such as a status, a command name, or a key pressed.

## The Ternary Operator

The ternary operator is a short way to choose between two values:

```js
condition ? valueIfTrue : valueIfFalse
```

For example:

```js
const age = 16;
const message = age >= 18 ? "Adult" : "Minor";

console.log(message); // "Minor"
```

It is great inside template literals and when setting a value:

```js
const items = 3;
console.log(`You have ${items} item${items === 1 ? "" : "s"}.`);
```

I keep ternaries short. If I find myself nesting them, I switch back to `if...else`, because nested ternaries get hard to read very quickly.

## Short-Circuit Shortcuts

Logical operators return one of their values, not just `true` or `false`. This gives some useful shortcuts.

### Default Values With ?? and ||

```js
const userName = null;
const display = userName ?? "Guest";
console.log(display); // "Guest"
```

The **nullish coalescing** operator `??` only falls back when the left side is `null` or `undefined`. The older `||` falls back on any falsy value, including `0` and `""`:

```js
const volume = 0;
console.log(volume || 50); // 50 (probably a bug)
console.log(volume ?? 50); // 0
```

### Running Code Only If Something Is True

```js
isAdmin && showAdminPanel();
```

This calls `showAdminPanel()` only when `isAdmin` is truthy. It is fine for short cases, but a plain `if` is often clearer for beginners.

## A Practical Example

Here is a small example that changes a greeting based on the time of day:

```html
<p id="greeting"></p>
```

```js
const hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

document.querySelector("#greeting").textContent = greeting;
```

If you want to learn more about changing the page like this, see [JavaScript DOM manipulation basics](https://bishal-biswas.github.io/articles/javascript-dom-manipulation-basics).

## Common Mistakes

### 1. Using = Instead of ===

```js
if (role = "admin") { } // assigns, always truthy
if (role === "admin") { } // compares
```

### 2. Using == Instead of ===

Loose equality converts types and causes confusing results. Stick to `===`.

### 3. Forgetting break in switch

Without `break`, execution falls through into the next case, which is rarely what you want.

### 4. Wrong Order in else if Chains

Put the most specific conditions first. The first true branch wins.

### 5. Relying on Truthiness When 0 or "" Are Valid

Use `??` or an explicit check like `!== undefined` instead.

### 6. Nesting Ternaries

They work, but they are hard to read. Use `if...else` for anything with more than two outcomes.

## Conclusion

Conditionals let your code make decisions. Use `if...else` for most logic, `switch` when comparing one value against many fixed options, and the ternary operator for short either-or values.

Understanding truthy and falsy values, and always using `===`, will save you from a lot of confusing bugs.

Conditionals and loops together are the core of program logic. If you have not read it yet, my guide to [JavaScript loops](https://bishal-biswas.github.io/articles/javascript-loops-for-while-foreach) is a natural next step, and [JavaScript functions and arrow functions](https://bishal-biswas.github.io/articles/javascript-functions-arrow-functions) shows how to wrap this logic into reusable pieces.
