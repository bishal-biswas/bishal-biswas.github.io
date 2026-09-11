---
title: CSS Flexbox and CSS Grid Complete Guide for Beginners
slug: css-flexbox-grid-complete-guide
metaDescription: Learn CSS Flexbox and CSS Grid from scratch with simple
  examples. Understand rows, columns, alignment, gaps, responsive layouts, and
  when to use Flexbox or Grid.
image: https://mw-hr.sgp1.digitaloceanspaces.com/media/blog_images/1714892538827.jpg
author: Bishal Biswas
publishDate: 2026-09-11
isDraft: false
category: Web Development
tags:
  - CSS Flexbox
  - CSS Grid tutorial
---

## Introduction

When I started building websites, one of the things that took me some time to understand was **how to properly arrange elements on a page**.

At first, I used margins, padding, `position`, and sometimes even unnecessary HTML elements just to get things positioned where I wanted them.

It worked, but the CSS quickly became difficult to maintain.

Then I started learning **CSS Flexbox** and **CSS Grid**.

These two CSS layout systems completely changed the way I approached website layouts.

Today, I use Flexbox and Grid instead of trying to manually position everything.

In this guide, I will explain both from the beginning, including:

- What Flexbox is
- Flex container and flex items
- Main axis and cross axis
- Important Flexbox properties
- Creating rows and columns
- Alignment and spacing
- Wrapping elements
- What CSS Grid is
- Grid rows and columns
- Grid gaps
- Grid templates
- Spanning multiple columns and rows
- Responsive layouts
- Flexbox vs Grid
- When I use Flexbox and when I use Grid
- Practical examples

---

# What Is CSS Flexbox?

**Flexbox**, short for Flexible Box Layout, is a CSS layout system designed mainly for arranging elements along one dimension.

That means I can primarily arrange elements:

- Horizontally in a row
- Vertically in a column

For example:

```html
<div class="container">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
</div>
```

I can turn the parent into a flex container:

```css
.container {
    display: flex;
}
```

By default, the children are placed in a row.

Visually, it becomes something like:

```text
One    Two    Three
```

This is one of the simplest uses of Flexbox.

---

# Flex Container and Flex Items

There are two important terms I need to understand.

## Flex Container

The element where I write:

```css
display: flex;
```

is called the **flex container**.

For example:

```css
.container {
    display: flex;
}
```

Here, `.container` is the flex container.

## Flex Items

The direct children of the flex container are called **flex items**.

For example:

```html
<div class="container">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
</div>
```

The three inner `<div>` elements are flex items.

An important point is that Flexbox primarily controls the **direct children** of the flex container.

---

# The `display: flex` Property

Everything starts with:

```css
.container {
    display: flex;
}
```

Without this, the container behaves normally.

With it, its direct children become flex items.

For example:

```css
.container {
    display: flex;
    gap: 20px;
}
```

Now the items will be arranged next to each other with a 20px gap.

---

# Understanding the Main Axis and Cross Axis

This is one of the most important concepts in Flexbox.

When I started learning Flexbox, I initially focused only on properties like `justify-content` and `align-items`.

Later I realized that understanding the **axes** makes these properties much easier.

Flexbox has two axes:

```text
Main Axis
Cross Axis
```

By default, the main axis is horizontal.

```text
Main Axis
-------------------------------->

[ One ] [ Two ] [ Three ]

              |
              |
              v

          Cross Axis
```

So when:

```css
.container {
    display: flex;
}
```

the main axis goes from left to right.

But if I change the direction:

```css
.container {
    display: flex;
    flex-direction: column;
}
```

the main axis becomes vertical.

```text
[ One ]

[ Two ]

[ Three ]
```

This is important because `justify-content` works along the **main axis**, while `align-items` works along the **cross axis**.

---

# `flex-direction`

The `flex-direction` property controls the direction of flex items.

There are four main values:

```css
flex-direction: row;
flex-direction: row-reverse;
flex-direction: column;
flex-direction: column-reverse;
```

## Row

This is the default.

```css
.container {
    display: flex;
    flex-direction: row;
}
```

Result:

```text
One    Two    Three
```

## Row Reverse

```css
.container {
    display: flex;
    flex-direction: row-reverse;
}
```

The order is reversed:

```text
Three    Two    One
```

## Column

```css
.container {
    display: flex;
    flex-direction: column;
}
```

Result:

```text
One

Two

Three
```

## Column Reverse

```css
.container {
    display: flex;
    flex-direction: column-reverse;
}
```

The order becomes:

```text
Three

Two

One
```

---

# `justify-content`

I use `justify-content` to control how flex items are positioned along the **main axis**.

For example:

```css
.container {
    display: flex;
    justify-content: center;
}
```

This centers the items along the main axis.

Some commonly used values are:

```css
justify-content: flex-start;
justify-content: center;
justify-content: flex-end;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

---

## `flex-start`

```css
.container {
    display: flex;
    justify-content: flex-start;
}
```

Items stay at the beginning.

```text
One   Two   Three
```

---

## `center`

```css
.container {
    display: flex;
    justify-content: center;
}
```

Items move to the center.

```text
      One   Two   Three
```

---

## `flex-end`

```css
.container {
    display: flex;
    justify-content: flex-end;
}
```

Items move toward the end.

```text
                One   Two   Three
```

---

## `space-between`

```css
.container {
    display: flex;
    justify-content: space-between;
}
```

The first item goes to the beginning and the last item goes to the end.

```text
One             Two             Three
```

This is very useful for navigation bars.

---

## `space-around`

```css
.container {
    display: flex;
    justify-content: space-around;
}
```

Space is distributed around the items.

---

## `space-evenly`

```css
.container {
    display: flex;
    justify-content: space-evenly;
}
```

The available space is distributed evenly.

---

# `align-items`

`align-items` controls alignment along the **cross axis**.

For example:

```css
.container {
    display: flex;
    align-items: center;
}
```

If the flex direction is a row, this generally means vertical alignment.

This is extremely useful when I want to vertically align items.

For example:

```css
.navbar {
    display: flex;
    align-items: center;
}
```

Now the logo, links, and buttons can be vertically aligned.

Common values include:

```css
align-items: flex-start;
align-items: center;
align-items: flex-end;
align-items: stretch;
```

---

# Centering an Element With Flexbox

One of my favorite simple Flexbox tricks is centering something both horizontally and vertically.

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

If the container has a height:

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```

I can place the child right in the center of the viewport.

For example:

```html
<div class="container">
    <button>Login</button>
</div>
```

This is much cleaner than trying to calculate margins manually.

---

# `gap`

The `gap` property is one of the properties I use frequently with Flexbox.

```css
.container {
    display: flex;
    gap: 20px;
}
```

It creates space between flex items.

For example:

```text
One    20px    Two    20px    Three
```

I can also use:

```css
row-gap: 20px;
column-gap: 30px;
```

Or simply:

```css
gap: 20px 30px;
```

The first value controls row spacing and the second controls column spacing.

---

# `flex-wrap`

By default, flex items try to stay on one line.

Sometimes there isn't enough space.

I can allow them to move to another line using:

```css
.container {
    display: flex;
    flex-wrap: wrap;
}
```

For example:

```text
One    Two    Three    Four

Five   Six    Seven
```

This is particularly useful for responsive cards.

---

# Building a Responsive Card Layout With Flexbox

Suppose I have several cards:

```html
<div class="cards">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
</div>
```

I can write:

```css
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 250px;
}
```

Now the cards can automatically wrap when the available width becomes smaller.

This is a very practical Flexbox pattern.

---

# The `flex` Property

The `flex` shorthand controls how a flex item grows and shrinks.

For example:

```css
.card {
    flex: 1;
}
```

If multiple items have:

```css
flex: 1;
```

they can share the available space.

For example:

```html
<div class="container">
    <div class="box">One</div>
    <div class="box">Two</div>
    <div class="box">Three</div>
</div>
```

```css
.box {
    flex: 1;
}
```

The three boxes can occupy equal portions of the available space.

---

# `flex-grow`

This controls how much a flex item can grow relative to other items.

```css
.first {
    flex-grow: 2;
}

.second {
    flex-grow: 1;
}
```

The first item can receive twice as much additional space as the second.

---

# `flex-shrink`

This controls how much an item can shrink when there isn't enough space.

```css
.box {
    flex-shrink: 1;
}
```

This is the default behavior.

---

# `flex-basis`

`flex-basis` defines the initial size of a flex item along the main axis.

```css
.card {
    flex-basis: 250px;
}
```

For practical layouts, I often see combinations like:

```css
.card {
    flex: 1 1 250px;
}
```

This means:

```text
grow: 1
shrink: 1
basis: 250px
```

---

# `align-self`

Sometimes I don't want to change the alignment of every flex item.

I can override the alignment for one particular item using `align-self`.

```css
.special {
    align-self: flex-end;
}
```

For example:

```html
<div class="container">
    <div>One</div>
    <div class="special">Two</div>
    <div>Three</div>
</div>
```

Only the special item receives the different cross-axis alignment.

---

# `order`

Flexbox also allows me to change the visual order of items.

```css
.first {
    order: 2;
}

.second {
    order: 1;
}
```

The visual order can change without changing the HTML order.

I use this carefully because the HTML order can matter for accessibility and keyboard navigation.

---

# What Is CSS Grid?

Now let's move to CSS Grid.

While Flexbox is mainly designed for **one-dimensional layouts**, CSS Grid is designed for **two-dimensional layouts**.

Grid allows me to work with:

```text
Rows
Columns
```

For example:

```text
+---------+---------+---------+
|         |         |         |
|    1    |    2    |    3    |
|         |         |         |
+---------+---------+---------+
|         |         |         |
|    4    |    5    |    6    |
|         |         |         |
+---------+---------+---------+
```

This is where Grid becomes extremely powerful.

---

# Creating a CSS Grid

Just like Flexbox, I start by changing the display property:

```css
.container {
    display: grid;
}
```

But I normally also define columns.

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```

This creates three equal columns.

---

# Understanding `fr`

The `fr` unit means a **fraction of the available space**.

For example:

```css
grid-template-columns: 1fr 1fr 1fr;
```

means three equal columns.

```text
|  1fr  |  1fr  |  1fr  |
```

I can also create different proportions:

```css
grid-template-columns: 2fr 1fr;
```

This gives the first column twice the available share of the second.

```text
|       2fr       |  1fr  |
```

---

# Creating Grid Rows

I can explicitly define rows as well.

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 200px;
}
```

This creates two columns and two rows.

---

# Grid Gap

Just like Flexbox, Grid supports `gap`.

```css
.container {
    display: grid;
    gap: 20px;
}
```

I can also use:

```css
row-gap: 20px;
column-gap: 30px;
```

Or:

```css
gap: 20px 30px;
```

---

# A Simple CSS Grid Example

HTML:

```html
<div class="grid">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
    <div>Six</div>
</div>
```

CSS:

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

The result is:

```text
+-------+-------+-------+
| One   | Two   | Three |
+-------+-------+-------+
| Four  | Five  | Six   |
+-------+-------+-------+
```

---

# The `repeat()` Function

Instead of writing:

```css
grid-template-columns: 1fr 1fr 1fr;
```

I can write:

```css
grid-template-columns: repeat(3, 1fr);
```

This means:

> Create 3 columns, each taking 1 fraction of the available space.

For five equal columns:

```css
grid-template-columns: repeat(5, 1fr);
```

This makes the CSS easier to read.

---

# `grid-column`

Grid allows me to control where an item starts and ends.

For example:

```css
.featured {
    grid-column: span 2;
}
```

This makes the item span two columns.

Example:

```text
+---------+---------+---------+
|         |         |         |
| Featured          | Item 2  |
|         |         |         |
+---------+---------+---------+
```

This is useful for dashboards, galleries, and magazine-style layouts.

---

# `grid-row`

Similarly, I can make an item span multiple rows.

```css
.featured {
    grid-row: span 2;
}
```

This allows one item to become taller than the others.

---

# Explicit Grid Placement

I can also specify exact column positions.

```css
.item {
    grid-column: 1 / 3;
}
```

This means the item starts at grid line 1 and ends at grid line 3.

Therefore, it occupies two columns.

I can do the same with rows:

```css
.item {
    grid-row: 1 / 3;
}
```

This makes it occupy two rows.

---

# `grid-template-areas`

One of the Grid features I particularly like is `grid-template-areas`.

It allows me to visually describe a page layout.

For example:

```css
.layout {
    display: grid;

    grid-template-columns: 200px 1fr;

    grid-template-areas:
        "sidebar header"
        "sidebar main"
        "sidebar footer";
}
```

Then I assign areas:

```css
.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.main {
    grid-area: main;
}

.footer {
    grid-area: footer;
}
```

This makes the layout very easy to understand.

The structure is essentially:

```text
+----------+----------------+
| Sidebar  | Header         |
|          +----------------+
|          | Main           |
|          |                |
|          +----------------+
|          | Footer         |
+----------+----------------+
```

For larger page layouts, this can be much easier to maintain than manually positioning every element.

---

# Responsive CSS Grid

One of the most useful Grid techniques is creating responsive columns.

For example:

```css
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

This is a very powerful pattern.

Let's break it down.

### `auto-fit`

The browser tries to fit as many columns as possible.

### `minmax(250px, 1fr)`

Each column should ideally be at least 250px wide, but it can grow to use available space.

This means I can create a responsive card layout without necessarily writing multiple media queries.

---

# `auto-fit` vs `auto-fill`

You may also see:

```css
repeat(auto-fill, minmax(250px, 1fr))
```

and:

```css
repeat(auto-fit, minmax(250px, 1fr))
```

They are similar, but their behavior differs when there is extra available space and fewer items than the possible number of tracks.

For many common responsive card layouts, I prefer:

```css
repeat(auto-fit, minmax(250px, 1fr))
```

because the existing cards can expand to use the available space.

---

# Aligning Items in CSS Grid

Grid also provides alignment properties.

For example:

```css
.container {
    display: grid;
    align-items: center;
}
```

I can also use:

```css
justify-items: center;
```

And:

```css
place-items: center;
```

For example:

```css
.container {
    display: grid;
    place-items: center;
}
```

This is a convenient way to center grid items.

---

# `justify-content` and `align-content` in Grid

Grid also supports:

```css
justify-content
align-content
```

These properties control how the entire grid is positioned when there is extra space inside the grid container.

For example:

```css
.container {
    display: grid;
    justify-content: center;
}
```

The grid itself can be centered horizontally.

This is slightly different from `justify-items`, which controls the alignment of items inside their grid areas.

---

# Flexbox vs CSS Grid

This is one of the most common questions beginners ask.

**Should I use Flexbox or Grid?**

My simple rule is:

> If I am primarily working in one direction, I think about Flexbox first. If I am controlling rows and columns together, I think about Grid first.

Here's a simple comparison:

| Feature | Flexbox | CSS Grid |
|---|---|---|
| Main purpose | One-dimensional layout | Two-dimensional layout |
| Rows | Yes | Yes |
| Columns | Yes | Yes |
| Row + column control | Limited | Excellent |
| Navigation bars | Excellent | Possible |
| Simple alignment | Excellent | Excellent |
| Card layouts | Excellent | Excellent |
| Complex page layouts | Possible | Excellent |
| Dashboard layouts | Possible | Excellent |
| Responsive layouts | Excellent | Excellent |

---

# When I Use Flexbox

I generally think about Flexbox for smaller layout relationships.

For example:

### Navigation

```css
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

### Button groups

```css
.buttons {
    display: flex;
    gap: 10px;
}
```

### Centering

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Horizontal cards

```css
.cards {
    display: flex;
    gap: 20px;
}
```

Flexbox is excellent when the layout is primarily concerned with a single direction.

---

# When I Use CSS Grid

I generally think about Grid when the layout has a clear row and column structure.

For example:

### Dashboard

```css
.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
}
```

### Image gallery

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}
```

### Main website layout

```css
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
}
```

### Responsive card grid

```css
.cards {
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(250px, 1fr)
    );
    gap: 20px;
}
```

Grid is especially useful when I want stronger control over rows and columns.

---

# Can I Use Flexbox and Grid Together?

Absolutely.

I don't consider Flexbox and Grid competitors.

In real projects, I often use both.

For example, I might use Grid for the overall page:

```css
.page {
    display: grid;
    grid-template-columns: 250px 1fr;
}
```

Then use Flexbox inside the navigation:

```css
.nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
```

And use another Flexbox layout inside a card:

```css
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

This combination is completely normal.

---

# A Practical Responsive Website Layout

Let's imagine that I am building a simple website with:

- Header
- Sidebar
- Main content
- Cards

I could use Grid for the overall structure.

```html
<div class="layout">

    <header class="header">
        My Website
    </header>

    <aside class="sidebar">
        Navigation
    </aside>

    <main class="main">
        <div class="cards">
            <div class="card">Card 1</div>
            <div class="card">Card 2</div>
            <div class="card">Card 3</div>
        </div>
    </main>

</div>
```

CSS:

```css
.layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    grid-template-areas:
        "sidebar header"
        "sidebar main";
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.main {
    grid-area: main;
}

.cards {
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(220px, 1fr)
    );
    gap: 20px;
}
```

Here I am using Grid at two different levels.

The outer Grid controls the page structure.

The inner Grid controls the cards.

I could then use Flexbox inside individual cards.

This is how these layout systems can work together.

---

# Flexbox and Grid Are Not Replacements for Everything

Although Flexbox and Grid are powerful, I don't try to use them for every CSS problem.

I still use:

```css
margin
padding
position
width
height
max-width
min-width
```

when appropriate.

For example, if I simply need to add space inside a card:

```css
.card {
    padding: 20px;
}
```

I don't need Flexbox or Grid.

The goal is not to use the newest CSS feature everywhere.

The goal is to choose the simplest tool that solves the problem.

---

# Common Mistakes Beginners Make

## 1. Using `position: absolute` for everything

When I was learning CSS, it was tempting to use:

```css
position: absolute;
```

whenever something didn't align properly.

But this often creates problems when the screen size changes.

For normal layouts, I prefer Flexbox or Grid.

---

## 2. Not understanding the Flexbox axes

If `justify-content` and `align-items` seem confusing, I recommend first asking:

> What is my main axis?

If I have:

```css
flex-direction: row;
```

the main axis is horizontal.

If I have:

```css
flex-direction: column;
```

the main axis is vertical.

Once I understand that, these properties become much easier.

---

## 3. Using too many media queries

Sometimes I see developers manually define a different number of columns for every screen size.

For example:

```css
@media (...) {
    ...
}

@media (...) {
    ...
}

@media (...) {
    ...
}
```

Media queries are useful, but Grid's:

```css
repeat(auto-fit, minmax(250px, 1fr))
```

can solve many responsive card layouts with much less CSS.

---

## 4. Forgetting `gap`

Instead of adding margins to every child:

```css
.card {
    margin-right: 20px;
}
```

I can often use:

```css
.container {
    display: flex;
    gap: 20px;
}
```

or:

```css
.container {
    display: grid;
    gap: 20px;
}
```

I find `gap` much cleaner for spacing between layout items.

---

# Flexbox Cheat Sheet

Here are the Flexbox properties I recommend remembering:

```css
display: flex;

flex-direction: row;
flex-direction: column;

justify-content: center;
align-items: center;

flex-wrap: wrap;

gap: 20px;

flex: 1;

flex-grow: 1;
flex-shrink: 1;
flex-basis: 250px;

align-self: center;

order: 1;
```

The most important ones for beginners are:

```text
display: flex
flex-direction
justify-content
align-items
flex-wrap
gap
flex
```

---

# CSS Grid Cheat Sheet

The most useful Grid properties include:

```css
display: grid;

grid-template-columns: repeat(3, 1fr);

grid-template-rows: 100px 200px;

gap: 20px;

grid-column: span 2;

grid-row: span 2;

grid-template-areas:
    "header header"
    "sidebar main";

grid-area: main;

place-items: center;
```

For responsive cards, remember this pattern:

```css
grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
);
```

It is one of the most useful Grid patterns I use.

---

# What Should I Learn First?

If you are completely new to CSS layouts, I recommend this order:

### Step 1: Understand normal CSS flow

Learn:

```text
Block elements
Inline elements
Margin
Padding
Width
Height
```

### Step 2: Learn Flexbox

Focus on:

```text
display: flex
flex-direction
justify-content
align-items
gap
flex-wrap
flex
```

### Step 3: Learn CSS Grid

Focus on:

```text
display: grid
grid-template-columns
grid-template-rows
gap
fr
repeat()
minmax()
grid-column
grid-row
grid-template-areas
```

### Step 4: Build real layouts

Try building:

```text
Navigation bar
Login page
Card layout
Pricing section
Dashboard
Image gallery
Blog layout
Portfolio page
```

This is where the concepts start becoming natural.

---

# Final Thoughts

For me, Flexbox and Grid are two of the most important CSS concepts to understand after learning basic selectors and properties.

If I need to arrange elements mainly in one direction, I usually think about **Flexbox**.

If I need to control rows and columns together, I usually think about **CSS Grid**.

I don't see them as competing technologies.

They solve slightly different layout problems, and I can use them together in the same project.

If you are learning CSS right now, don't try to memorize every property.

Start with a small project.

Build a navbar with Flexbox.

Then build a card layout.

Then build a responsive gallery with Grid.

Finally, build an entire page using Grid for the main structure and Flexbox inside individual components.

Once you do that a few times, CSS layouts become much less frustrating because you start thinking in terms of **layout systems instead of manually positioning individual elements**.
