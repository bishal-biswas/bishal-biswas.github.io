---
title: "HTML Input Types Explained With Examples"
slug: html-input-types-explained
metaDescription: Learn the most useful HTML input types, from text, email and password to number, date, range, checkbox, radio, color and file, with simple examples.
image: https://placehold.co/1200x630/00283a/5fb353/png?text=HTML+Inputs
author: Bishal Biswas
publishDate: 2026-11-13
isDraft: false
category: HTML
tags:
  - HTML input types
  - HTML forms
  - input element
---

The `input` element is one of the most flexible elements in HTML. By changing a single attribute, `type`, the same element can become a text box, a checkbox, a date picker, a color picker or a file uploader.

When I started building forms, I used `type="text"` for everything: emails, phone numbers, ages, even dates. It worked, but users had a worse experience, especially on phones. Choosing the right input type gives you better keyboards, built-in validation and native pickers for free.

In this article, I will go through the input types I use most, with examples. If you are new to forms in general, start with [HTML forms, inputs, labels and buttons](https://bishal-biswas.github.io/articles/html-forms-inputs-labels-buttons).

## The Basic Input

Every input follows the same pattern:

```html
<label for="username">Username</label>
<input type="text" id="username" name="username">
```

- `type` decides what kind of control it is. If you leave it out, the default is `text`.
- `name` is the key used when the form data is sent.
- `id` connects the input to its `label`.

Always pair inputs with a `label`. It makes the field accessible and gives users a bigger area to click.

## Text-Based Input Types

### `text`

For general single-line text like names or titles:

```html
<label for="full-name">Full name</label>
<input type="text" id="full-name" name="full_name" autocomplete="name">
```

### `email`

```html
<label for="email">Email</label>
<input type="email" id="email" name="email" autocomplete="email">
```

On phones, this shows a keyboard with the `@` key. The browser also checks that the value looks like an email address when the form is submitted. Add the `multiple` attribute if you want to accept several comma-separated emails.

### `password`

```html
<label for="password">Password</label>
<input type="password" id="password" name="password" autocomplete="current-password">
```

The characters are hidden as dots. Use `autocomplete="new-password"` on sign-up forms so password managers can suggest a strong password.

### `tel`

```html
<label for="phone">Phone</label>
<input type="tel" id="phone" name="phone" autocomplete="tel">
```

This shows a number pad on phones. It does **not** validate the format, because phone numbers vary so much between countries. You can add a `pattern` if you need a specific format.

### `url`

```html
<label for="website">Website</label>
<input type="url" id="website" name="website" placeholder="https://example.com">
```

The browser checks that the value is a valid absolute URL, including the protocol.

### `search`

```html
<label for="site-search">Search articles</label>
<input type="search" id="site-search" name="q">
```

It behaves like a text field, but some browsers add a small clear button and the mobile keyboard may show a "Search" key.

## Number Input Types

### `number`

```html
<label for="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" min="1" max="10" step="1" value="1">
```

- `min` and `max` set the allowed range.
- `step` sets the increment. Use `step="0.01"` for prices, or `step="any"` to allow any decimal.

Important: `number` is meant for actual quantities. For things like credit card numbers, PIN codes or postal codes, use `type="text"` with `inputmode="numeric"`:

```html
<label for="postal">Postal code</label>
<input type="text" id="postal" name="postal_code" inputmode="numeric" autocomplete="postal-code">
```

This still shows a number keyboard on phones, but avoids problems like leading zeros being removed or the value changing when the user scrolls over the field.

### `range`

```html
<label for="volume">Volume</label>
<input type="range" id="volume" name="volume" min="0" max="100" value="50">
```

A slider is great when the exact value does not matter much. Because the user cannot see the number, I often display it next to the slider using a little JavaScript or an `output` element.

## Date and Time Input Types

```html
<label for="birthday">Birthday</label>
<input type="date" id="birthday" name="birthday" min="1900-01-01">

<label for="meeting">Meeting time</label>
<input type="time" id="meeting" name="meeting">

<label for="appointment">Appointment</label>
<input type="datetime-local" id="appointment" name="appointment">

<label for="month">Billing month</label>
<input type="month" id="month" name="month">

<label for="week">Week</label>
<input type="week" id="week" name="week">
```

The browser shows a native picker that matches the user's device and language. One thing to know: the value is always sent in a standard format, such as `2026-11-13` for dates, no matter how it is displayed to the user.

Support for `week` is still limited in some browsers, so I rarely use it.

## Choice Input Types

### `checkbox`

Checkboxes are for yes/no choices, or picking several options:

```html
<label>
  <input type="checkbox" name="newsletter" value="yes" checked>
  Send me the newsletter
</label>
```

If a checkbox is unchecked, it is not sent with the form at all.

### `radio`

Radio buttons let the user choose exactly **one** option from a group. All buttons in a group share the same `name`:

```html
<fieldset>
  <legend>Choose a plan</legend>

  <label><input type="radio" name="plan" value="free" checked> Free</label>
  <label><input type="radio" name="plan" value="pro"> Pro</label>
  <label><input type="radio" name="plan" value="team"> Team</label>
</fieldset>
```

The `fieldset` and `legend` group the options and give the group a label that screen readers announce.

## Other Useful Input Types

### `color`

```html
<label for="brand">Brand color</label>
<input type="color" id="brand" name="brand" value="#5fb353">
```

This opens the system color picker. The value is always a lowercase hex color.

### `file`

```html
<label for="avatar">Profile photo</label>
<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
```

- `accept` suggests which file types to allow.
- `multiple` lets users pick several files.

To actually upload files, the form needs `method="post"` and `enctype="multipart/form-data"`. Also remember that `accept` is just a hint; always check files on the server.

### `hidden`

```html
<input type="hidden" name="source" value="homepage">
```

A hidden input sends a value without showing it. Users can still see and change it with developer tools, so never store secrets here.

### `submit`, `reset` and `button`

```html
<input type="submit" value="Send">
```

These create buttons. Today I prefer the `button` element because it can contain HTML, like an icon:

```html
<button type="submit">Send message</button>
```

## Styling Inputs by Type

You can target specific input types with attribute selectors:

```css
input[type="email"],
input[type="password"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input[type="checkbox"],
input[type="radio"] {
  accent-color: #5fb353;
}
```

The `accent-color` property is a simple way to color checkboxes, radio buttons and range sliders. Attribute selectors are explained in [CSS selectors explained](https://bishal-biswas.github.io/articles/css-selectors-explained).

## Common Mistakes

### 1. Using `text` for Everything

You lose mobile keyboards, validation and pickers. Pick the most specific type.

### 2. Using `number` for Codes

Card numbers, PINs and ZIP codes are not quantities. Use `text` with `inputmode="numeric"`.

### 3. Radio Buttons With Different Names

If each radio has a different `name`, users can select all of them. Buttons in one group must share the same `name`.

### 4. Inputs Without Labels

A `placeholder` is not a label. It disappears when the user types. Always use a real `label`.

### 5. Trusting Client-Side Checks

Input types help users, but anyone can bypass them. Always validate on the server too.

## Conclusion

The `type` attribute turns a single `input` element into many different controls. Choosing the right one gives users the correct keyboard, helpful pickers and basic validation without any JavaScript.

My quick rule: use the most specific type that matches the data, always add a `label`, and use `name` so the value is actually sent. In the next article, I will show how to use these types with attributes like `required` and `pattern` in [HTML form validation without JavaScript](https://bishal-biswas.github.io/articles/html-form-validation-built-in).
