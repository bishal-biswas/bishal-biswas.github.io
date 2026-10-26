---
title: "HTML Form Validation Without JavaScript"
slug: html-form-validation-built-in
metaDescription: Learn how to validate HTML forms without JavaScript using required, minlength, pattern, min, max and input types, plus CSS to style valid and invalid fields.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=Form+Validation
author: Bishal Biswas
publishDate: 2026-11-15
isDraft: false
category: HTML
tags:
  - HTML form validation
  - required attribute
  - pattern attribute
  - user-invalid
---

When I built my first contact form, I wrote a lot of JavaScript to check that the email looked right and the message was not empty. Later, I found out that HTML could already do most of that on its own.

Built-in form validation is fast, works without any scripts, and shows error messages in the user's own language. It is not a replacement for server-side checks, but it gives users quick feedback before they submit.

In this article, I will explain the validation attributes HTML gives you, how to style valid and invalid fields with CSS, and where the limits are.

If you need a refresher on forms, read [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons) first.

## How Built-In Validation Works

When a user submits a form, the browser checks every field against its rules. If a field fails, the browser:

1. Stops the form from being submitted.
2. Focuses the first invalid field.
3. Shows a message explaining the problem.

You do not write any JavaScript for this. You just add attributes.

## The `required` Attribute

The simplest rule is `required`:

```html
<form action="/subscribe" method="post">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required>

  <button type="submit">Subscribe</button>
</form>
```

If the field is empty, the form will not submit.

`required` works on text inputs, `textarea`, `select`, checkboxes and radio buttons. For a radio group, adding `required` to one button in the group makes the whole group required.

```html
<fieldset>
  <legend>Preferred contact</legend>
  <label><input type="radio" name="contact" value="email" required> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

## Validation From Input Types

Some input types validate automatically:

```html
<input type="email" name="email" required>
<input type="url" name="website">
```

- `email` checks that the value looks like an email address.
- `url` checks that the value is a full URL, including `https://`.
- `number`, `date` and `range` reject values that are not valid for their type.

The email check is fairly loose. It accepts `name@domain` without a dot, because that is technically valid. If you need stricter rules, combine it with `pattern`. I cover all the input types in [HTML input types explained](https://bishal-biswas.github.io/articles/html-input-types-explained).

## Length Rules: `minlength` and `maxlength`

```html
<label for="username">Username</label>
<input type="text" id="username" name="username"
       minlength="3" maxlength="20" required>
```

- `minlength` sets the minimum number of characters.
- `maxlength` sets the maximum. The browser simply stops the user from typing more.

These also work on `textarea`:

```html
<label for="message">Message</label>
<textarea id="message" name="message" minlength="10" required></textarea>
```

Note: `minlength` is only checked when the user has typed something. An empty field passes `minlength` unless it is also `required`.

## Number and Date Rules: `min`, `max` and `step`

```html
<label for="age">Age</label>
<input type="number" id="age" name="age" min="13" max="120" required>

<label for="checkin">Check-in date</label>
<input type="date" id="checkin" name="checkin" min="2026-11-15">

<label for="price">Price</label>
<input type="number" id="price" name="price" min="0" step="0.01">
```

- `min` and `max` set the allowed range.
- `step` controls which values are allowed. The default step for numbers is 1, so `4.5` would be invalid unless you change it.

## Custom Rules With `pattern`

The `pattern` attribute uses a regular expression to check the value:

```html
<label for="code">Invite code (3 letters, 4 digits)</label>
<input type="text" id="code" name="code"
       pattern="[A-Za-z]{3}[0-9]{4}"
       title="Three letters followed by four digits, like ABC1234"
       required>
```

A few things to know about `pattern`:

- It must match the **whole** value. You do not need `^` and `$`; the browser adds them for you.
- It only works on text-like inputs: `text`, `email`, `tel`, `url`, `password` and `search`.
- The `title` text is often shown as part of the error message, so use it to explain the expected format.

Modern browsers compile `pattern` with the regular expression `v` flag, so some special characters like `-` inside a character class may need escaping, for example `[A-Za-z0-9\-]`.

Another example, a simple Indian mobile number:

```html
<label for="mobile">Mobile number</label>
<input type="tel" id="mobile" name="mobile" pattern="[6-9][0-9]{9}"
       title="10 digit mobile number starting with 6, 7, 8 or 9">
```

## Telling Users the Rules Up Front

Do not make users guess. I show the rules near the field and connect them with `aria-describedby`:

```html
<label for="new-password">Password</label>
<input type="password" id="new-password" name="password"
       minlength="12" required
       aria-describedby="password-hint"
       autocomplete="new-password">
<p id="password-hint">At least 12 characters.</p>
```

Screen readers read the hint when the field is focused.

## Styling Valid and Invalid Fields

CSS has pseudo-classes for validation state.

### `:invalid` and `:valid`

```css
input:invalid {
  border-color: crimson;
}

input:valid {
  border-color: seagreen;
}
```

The problem is that `:invalid` matches immediately. A `required` field is invalid as soon as the page loads, so users see red borders before they have typed anything. That feels unfriendly.

### `:user-invalid` and `:user-valid`

The better option is `:user-invalid`, which only matches after the user has interacted with the field or tried to submit:

```css
input:user-invalid,
textarea:user-invalid {
  border-color: crimson;
  background-color: #fff5f5;
}

input:user-valid {
  border-color: seagreen;
}
```

`:user-invalid` and `:user-valid` are supported in all major browsers now, so I use them by default.

### Marking Required Fields

```css
label:has(+ input:required)::after {
  content: " *";
  color: crimson;
}
```

This adds a star after any label that is directly followed by a required input. If selectors like `:has()` and `::after` look new, see [CSS selectors explained](https://bishal-biswas.github.io/articles/css-selectors-explained).

## Turning Validation Off

Sometimes you want to skip validation. For example, a "Save draft" button should not require every field.

You can disable validation for the whole form:

```html
<form novalidate>...</form>
```

Or only for one button:

```html
<button type="submit">Publish</button>
<button type="submit" formnovalidate>Save draft</button>
```

`novalidate` is also used when you want to replace the browser's messages with your own JavaScript validation while still using the attributes as rules.

## Going a Step Further With JavaScript

You do not need JavaScript for basic validation, but the Constraint Validation API lets you customise messages when you want:

```js
const email = document.querySelector("#email");

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Please enter an email like name@example.com.");
  } else {
    email.setCustomValidity("");
  }
});
```

Remember to reset the message to an empty string, otherwise the field stays invalid forever. If you want to build your JavaScript basics first, see [JavaScript before React](https://bishal-biswas.github.io/articles/javascript-before-heading-react).

## Always Validate on the Server Too

This is the most important point in the whole article. HTML validation is for **user experience**, not security.

Anyone can open developer tools, remove `required`, or send a request directly without using your form at all. Your server must check every value again before saving it or acting on it.

## Common Mistakes

### 1. Relying Only on Client-Side Validation

Browser checks can be bypassed. Always validate on the server.

### 2. Using `placeholder` Instead of Rules

A placeholder like "At least 8 characters" is not a rule. Add `minlength="8"` and a visible hint.

### 3. Adding `^` and `$` to `pattern` Unnecessarily

It does not break anything, but it is not needed because `pattern` already matches the whole value.

### 4. Red Borders on Page Load

Styling with `:invalid` shows errors too early. Use `:user-invalid`.

### 5. Forgetting `name` Attributes

A field without `name` passes validation but is never sent to the server.

## Conclusion

HTML can handle a lot of form validation on its own. Use `required` for mandatory fields, the right input type for emails and URLs, `minlength` and `maxlength` for text length, `min`, `max` and `step` for numbers and dates, and `pattern` for custom formats.

Style errors with `:user-invalid` so users only see them at the right time, and explain the rules before users make a mistake. Finally, always check everything again on the server.
