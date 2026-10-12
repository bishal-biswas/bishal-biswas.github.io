---
title: HTML Tables Explained With Practical Examples
slug: html-tables-explained
metaDescription: Learn HTML tables with practical examples, including rows,
  columns, table headers, captions, colspan, rowspan, and accessible table
  design.
image: html-tables-explained.webp
author: Bishal Biswas
publishDate: 2026-10-13
isDraft: false
category: HTML
tags:
  - HTML table tags
  - HTML table rows and columns
  - HTML table headers, colspan and rowspan in HTML
---

When I started learning HTML, I understood how to create headings, paragraphs, links, and images. But displaying structured information, such as student marks, employee details, or product prices, required a different approach.

That is where **HTML tables** become useful.

An HTML table allows us to organize related information into rows and columns, making it easier for visitors to read and compare data. For example, if I wanted to display a list of employees with their names, departments, and salaries, a table would be a natural choice.

In this article, I will explain how HTML tables work, the tags used to create them, and how to build practical tables using simple examples. We will also explore table headers, merged cells, captions, and a few common mistakes beginners should avoid.

## 1. What Is an HTML Table?

An HTML table is a way to present structured data in rows and columns on a web page.

You might have seen tables used for:

- Student marks and examination results
- Employee directories
- Product prices and comparisons
- Monthly expenses
- Course schedules
- Reports and statistics

For example, imagine we want to display the following information about three programming languages:

| Language | Type | Popular Use |
|---|---|---|
| HTML | Markup language | Structuring web pages |
| CSS | Style sheet language | Styling web pages |
| JavaScript | Programming language | Adding interactivity |

We could build this layout using ordinary HTML elements, but a table is better suited to representing data with a consistent row-and-column structure.

**Important:** Tables should primarily be used for tabular data, not for arranging the entire layout of a website. Modern web layouts are better handled using CSS Flexbox and Grid.

## 2. Understanding the Basic HTML Table Tags

Before creating our first table, let's understand the main HTML elements involved.

| HTML tag | Purpose |
|---|---|
| `<table>` | Creates the table container |
| `<tr>` | Creates a table row |
| `<th>` | Defines a header cell |
| `<td>` | Defines a regular data cell |
| `<caption>` | Adds a title or description to the table |
| `<thead>` | Groups the header rows |
| `<tbody>` | Groups the main data rows |
| `<tfoot>` | Groups footer rows, often used for totals or summaries |

You do not need to memorize everything immediately. The most important elements to understand first are `<table>`, `<tr>`, `<th>`, and `<td>`.

Let's see how they work together.

## 3. Creating Your First HTML Table

Suppose we want to display the names, ages, and cities of three people.

Here is a complete HTML example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Table</title>
</head>
<body>
    <h1>Employee Information</h1>

    <table>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
        <tr>
            <td>Rahul</td>
            <td>28</td>
            <td>Kolkata</td>
        </tr>
        <tr>
            <td>Priya</td>
            <td>25</td>
            <td>Delhi</td>
        </tr>
        <tr>
            <td>Amit</td>
            <td>30</td>
            <td>Mumbai</td>
        </tr>
    </table>
</body>
</html>
```

Save this code as `index.html` and open it in a browser.

You will see the table's information, but the browser might not display visible borders by default.

Let's understand the important parts of the code.

### The `<table>` element

```html
<table>
    <!-- Table content goes here -->
</table>
```

The `<table>` element acts as the container for the entire table. The rows and cells belong inside it.

### The `<tr>` element

```html
<tr>
    <td>Rahul</td>
    <td>28</td>
    <td>Kolkata</td>
</tr>
```

The `<tr>` element creates a table row.

In this example, one row contains three cells: a name, an age, and a city.

### The `<th>` element

```html
<tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
</tr>
```

The `<th>` element defines a header cell.

Browsers commonly display header cells in bold and center their text by default. More importantly, header cells communicate the meaning of the associated data to browsers and assistive technologies.

### The `<td>` element

```html
<td>Rahul</td>
<td>28</td>
<td>Kolkata</td>
```

The `<td>` element defines a regular data cell.

In our example, the employee's name, age, and city are stored in separate cells.

### How the elements fit together

Think of the structure this way:

- A table contains rows.
- Each row contains cells.
- Header cells describe the data.
- Regular cells contain the actual values.

Once this relationship becomes clear, creating more complicated tables becomes much easier.

## 4. Adding Borders and Styling With CSS

Our first table displays the information, but it may look plain. We can use CSS to add borders, spacing, colors, and other visual improvements.

Here is a simple example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled HTML Table</title>

    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #cccccc;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #eeeeee;
        }
    </style>
</head>
<body>
    <h1>Employee Information</h1>

    <table>
        <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Experience</th>
        </tr>
        <tr>
            <td>Rahul</td>
            <td>Development</td>
            <td>3 years</td>
        </tr>
        <tr>
            <td>Priya</td>
            <td>Testing</td>
            <td>2 years</td>
        </tr>
    </table>
</body>
</html>
```

Let's look at the CSS properties that make the difference.

**`border: 1px solid #cccccc;`**

This adds a thin gray border around each header and data cell.

**`padding: 10px;`**

Padding creates space between the text and the cell's edges. Without enough padding, table content can feel cramped.

**`text-align: left;`**

This aligns the cell content to the left.

**`border-collapse: collapse;`**

By default, table cells can have separate borders. Setting `border-collapse: collapse` combines adjacent borders into a single border, producing a cleaner appearance.

**`width: 100%;`**

This makes the table fill the width of its containing element, up to the available space.

These CSS properties are enough to make a basic table much easier to read.

## 5. Understanding `<thead>`, `<tbody>`, and `<tfoot>`

When a table contains many rows, keeping everything inside one undifferentiated structure can make the HTML harder to understand.

HTML provides three elements that help organize the table into meaningful sections.

- `<thead>` groups the table's header rows.
- `<tbody>` groups the main data rows.
- `<tfoot>` groups footer rows, such as totals or summaries.

Let's use them to create a simple expense report.

```html
<table>
    <caption>Monthly Expenses</caption>

    <thead>
        <tr>
            <th scope="col">Category</th>
            <th scope="col">Amount (₹)</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>Rent</td>
            <td>8,000</td>
        </tr>
        <tr>
            <td>Food</td>
            <td>4,000</td>
        </tr>
        <tr>
            <td>Internet</td>
            <td>800</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>12,800</td>
        </tr>
    </tfoot>
</table>
```

### Why use these sections?

Imagine returning to this code several months later. You can quickly identify the column headings, the main expense records, and the total.

These elements also help browsers and assistive technologies interpret the structure of the table.

Notice the use of `scope="col"` and `scope="row"`.

- `scope="col"` identifies a header as describing a column.
- `scope="row"` identifies a header as describing a row.

These attributes are particularly useful when building accessible tables.

One detail worth knowing: `<thead>`, `<tbody>`, and `<tfoot>` organize a table semantically. They do not automatically calculate totals or style every section. If you want to calculate the total dynamically, you would need JavaScript or a value supplied by your application.

## 6. Using the `<caption>` Element

A table may contain several rows and columns, but readers still need to understand what the data represents.

The `<caption>` element provides a title or description for the table.

For example:

```html
<table>
    <caption>Student Examination Results</caption>

    <tr>
        <th scope="col">Student</th>
        <th scope="col">Subject</th>
        <th scope="col">Marks</th>
    </tr>

    <tr>
        <td>Rahul</td>
        <td>Mathematics</td>
        <td>85</td>
    </tr>

    <tr>
        <td>Priya</td>
        <td>Science</td>
        <td>92</td>
    </tr>
</table>
```

The caption helps readers understand the purpose of the table before examining individual cells.

By default, browsers generally display the caption above the table. CSS can change its position.

```css
caption {
    caption-side: bottom;
    font-style: italic;
    padding: 8px;
}
```

In this example, the caption appears below the table.

For tables that present important information, adding a clear caption is a useful habit.

## 7. Merging Cells With `colspan` and `rowspan`

Sometimes, a table needs a cell that spans multiple columns or rows.

For example, a timetable might have one heading covering several days, or an examination report might have a heading that covers multiple rows.

HTML provides two attributes for these situations.

### Using `colspan`

The `colspan` attribute makes a cell span multiple columns.

Consider this example:

```html
<table>
    <tr>
        <th colspan="3">Student Information</th>
    </tr>
    <tr>
        <th>Name</th>
        <th>Course</th>
        <th>City</th>
    </tr>
    <tr>
        <td>Rahul</td>
        <td>BCA</td>
        <td>Kolkata</td>
    </tr>
</table>
```

The heading `Student Information` spans three columns.

The value `colspan="3"` tells the browser that the cell occupies the space of three columns.

You can use `colspan` for grouped headings, report summaries, or other layouts where a cell needs to cover multiple columns.

### Using `rowspan`

The `rowspan` attribute makes a cell span multiple rows.

For example:

```html
<table>
    <tr>
        <th>Department</th>
        <th>Employee</th>
    </tr>
    <tr>
        <td rowspan="2">Development</td>
        <td>Rahul</td>
    </tr>
    <tr>
        <td>Priya</td>
    </tr>
</table>
```

Here, the `Development` cell spans two rows because both employees belong to the same department.

The attribute `rowspan="2"` makes the cell occupy space across two rows.

### What is the difference?

| Attribute | What it does | Example |
|---|---|---|
| `colspan` | Spans multiple columns | `colspan="3"` |
| `rowspan` | Spans multiple rows | `rowspan="2"` |

When using these attributes, remember that the cells in subsequent rows must account for the space already occupied by a spanning cell. Otherwise, the table may not display the way you intended.

## 8. Building a Practical Product Price Table

So far, we have explored individual HTML table elements. Now let's combine them in a more practical example.

Suppose we are building a small online store and want to display a list of products and their prices.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Price List</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 24px;
        }

        table {
            width: 100%;
            max-width: 700px;
            border-collapse: collapse;
        }

        caption {
            font-size: 1.2rem;
            font-weight: bold;
            padding: 12px;
        }

        th,
        td {
            border: 1px solid #dddddd;
            padding: 12px;
            text-align: left;
        }

        thead {
            background-color: #f2f2f2;
        }

        tbody tr:nth-child(even) {
            background-color: #fafafa;
        }

        td:last-child {
            text-align: right;
        }
    </style>
</head>
<body>
    <h1>Our Products</h1>

    <table>
        <caption>Product Price List</caption>

        <thead>
            <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>P101</td>
                <td>Keyboard</td>
                <td>₹799</td>
            </tr>
            <tr>
                <td>P102</td>
                <td>Mouse</td>
                <td>₹499</td>
            </tr>
            <tr>
                <td>P103</td>
                <td>Monitor</td>
                <td>₹8,999</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

This example combines several techniques:

- A caption that explains the table's purpose.
- A `<thead>` section containing column headers.
- A `<tbody>` section containing product information.
- CSS borders and padding for readability.
- Alternating row colors using `:nth-child(even)`.
- Right-aligned prices for easier comparison.

The `td:last-child` selector targets the last data cell in each row. In this table, that cell contains the product price.

Notice that we did not need JavaScript to create the table. Plain HTML provides the structure, and CSS handles the presentation.

In a real e-commerce application, the product rows might eventually come from a database through a backend API. The same basic HTML structure can still be used to display that data.

## 9. Making HTML Tables Responsive

A table that looks good on a desktop may become difficult to read on a mobile phone, especially when it contains many columns.

One straightforward solution is to allow the table to scroll horizontally when necessary.

```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>E101</td>
                <td>Rahul</td>
                <td>Development</td>
                <td>rahul@example.com</td>
                <td>Kolkata</td>
            </tr>
        </tbody>
    </table>
</div>
```

Add the following CSS:

```css
.table-container {
    width: 100%;
    overflow-x: auto;
}

.table-container table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
}

.table-container th,
.table-container td {
    padding: 10px;
    border: 1px solid #dddddd;
    text-align: left;
}
```

Let's understand what happens here.

The `overflow-x: auto` property allows horizontal scrolling when the table becomes wider than its container.

The `min-width: 600px` rule prevents the table from becoming too narrow, which helps preserve the readability of its columns. The actual minimum width should depend on your content.

This approach is useful when the data must remain in a row-and-column format.

For simpler tables with only two or three columns, you may not need horizontal scrolling at all. Always check how the table behaves on smaller screens before deciding on a solution.

## 10. Common HTML Table Mistakes

When learning HTML tables, a few mistakes can make your markup harder to maintain or your data more difficult to understand.

### Mistake 1: Using `<td>` for every cell

A beginner might create the first row like this:

```html
<tr>
    <td>Name</td>
    <td>Age</td>
    <td>City</td>
</tr>
```

This creates regular data cells, even though the row contains column headings.

For a typical data table, use `<th>` for the headings:

```html
<tr>
    <th scope="col">Name</th>
    <th scope="col">Age</th>
    <th scope="col">City</th>
</tr>
```

This communicates the structure more clearly and improves accessibility.

### Mistake 2: Forgetting to close elements

HTML parsers can sometimes recover from missing closing tags, but relying on browser error recovery is not a good habit.

Write clear, properly nested markup:

```html
<table>
    <tr>
        <td>HTML</td>
        <td>Structure</td>
    </tr>
</table>
```

This makes the code easier to read and maintain.

### Mistake 3: Using tables for the entire website layout

Older websites sometimes used tables to arrange navigation bars, sidebars, and page content.

Today, CSS Flexbox and Grid are usually better choices for page layouts. Tables should represent relationships between data values.

For example:

- Use a table for employee records.
- Use CSS Grid for a dashboard layout.
- Use Flexbox for aligning buttons or navigation items.

Choosing the right element makes your HTML more meaningful.

### Mistake 4: Ignoring accessibility

A table might look correct visually but still be difficult for someone using a screen reader to understand.

For ordinary data tables, consider using:

- A descriptive `<caption>`.
- `<th>` elements for header cells.
- `scope="col"` for column headers.
- `scope="row"` for row headers when appropriate.

Complex tables with multiple levels of headers may require additional markup to associate headers with their data cells correctly.

### Mistake 5: Making tables too wide on mobile screens

If a table contains many columns, its content can overflow the available screen width.

Instead of forcing every column into a narrow space, consider horizontal scrolling or redesigning the presentation for smaller screens.

The best solution depends on the amount and type of data being displayed.

## 11. When Should You Use an HTML Table?

HTML tables are especially useful when the relationship between rows and columns matters.

Here are some practical examples:

| Situation | Is a table appropriate? |
|---|---|
| Displaying examination results | Yes |
| Comparing product specifications | Yes |
| Showing employee records | Yes |
| Displaying monthly financial reports | Yes |
| Arranging website navigation links | Usually no |
| Creating a two-column page layout | Usually no |
| Displaying a collection of independent product cards | Usually no |

The distinction is simple: **use a table when the information itself has a meaningful row-and-column structure.**

For visual page layouts, use CSS layout tools instead.

## 12. What to Learn After HTML Tables

Once you understand the basics, you can practice by creating a few small projects.

I would suggest starting with these:

1. **Student marksheet:** Display student names, subjects, marks, and totals.
2. **Employee directory:** Show employee IDs, names, departments, and locations.
3. **Monthly expense report:** Organize expenses by category and display a total.
4. **Product comparison table:** Compare the specifications and prices of several products.
5. **Weekly timetable:** Practice combining cells using `rowspan` and `colspan`.

After that, learn more about CSS selectors, responsive design, and semantic HTML.

Later, when you start working with JavaScript or a framework such as Angular or React, you can learn how to generate table rows from arrays or data returned by an API.

That is an important step toward building tables that display real application data instead of hardcoded examples.

## Conclusion

HTML tables are one of the fundamental tools for presenting structured information on the web.

In this article, we explored the main table elements, including `<table>`, `<tr>`, `<th>`, and `<td>`. We also learned how to organize tables with `<thead>`, `<tbody>`, and `<tfoot>`, add captions, merge cells with `colspan` and `rowspan`, and improve readability using CSS.

The most important thing I learned from understanding these elements is that creating a table is not just about placing text into rows and columns. It is also about communicating the relationships between different pieces of information.

If you are learning HTML, try creating a student marksheet or product price list yourself. Start with plain HTML, add CSS once the structure works, and then experiment with more complex tables.

Once you are comfortable with these basics, you will be better prepared to display data in real-world web applications.
