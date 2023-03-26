# Learn CSS

**CSS** - Stands for Cascading Style Sheets

CSS describes how HTML elements are to be displayed on screen, paper, or in other media
CSS saves a lot of work. It can control the layout of multiple web pages all at once
External stylesheets are stored in CSS files.

## CSS Syntax

```css
h1 {
    color: #000000;
}
/* Where h1 is selector, color is property, and #000000 is value. Both with property and value are declaration. */
```

## Seectors

Used to "find" (or select) the HTML elements you want to style.

### CSS Selectors are divided into five categories `:`

**Simple selectors** - select elements based on name, id, class

**Combinator selectors** - select elements based on a specific relationship between them

**Pseudo-class selectors** - select elements based on a certain state

**Pseudo-elements selectors** - select and style a part of an element

**Attribute selectors** - select elements based on an attribute or attribute value

Here are most basic CSS selectors used `:`

**1. CSS element Selector** - selects HTML elements based on the element name.

```css
p {
  text-align: center;
  color: blue;
}
```

**2. CSS id Selector** - uses the id attribute of an HTML element to select a specific element.

To select an element with a specific id, write a hash (#) character, followed by the id of the element.

```css
#para1 {
  text-align: center;
  color: blue;
}
```

**3. CSS class Selector** - selects HTML elements with a specific class attribute.

To select elements with a specific class, write a period (.) character, followed by the class name.

```css
.center {
  text-align: center;
  color: blue;
}
```

You can also specify that only specific HTML elements should be affected by a class.

```css
p.center {
  text-align: center;
  color: blue;
}
```

HTML elements can also refer to more than one class.

```css
<p class="center large">This paragraph refers to two classes.</p>
```

**4. CSS Universal Selector** - selects all HTML elements on the page.

```css
* {
  text-align: center;
  color: blue;
}
```

**5. CSS Grouping Selector** - selects all the HTML elements with the same style definitions.

```css
h1, h2, p {
  text-align: center;
  color: blue;
}
```

## Three Ways to Add CSS

**1. External CSS** - With an external style sheet, you can change the look of an entire website by changing just one file!

```html
<!--FileName: index.html-->
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

```css
/* Filename: styles.css*/
body {
  background-color: lightblue;
}

h1 {
  color: blue;
  margin-left: 20px;
}
```

**2. Internal CSS** - used if one single HTML page has a unique style.

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  background-color: yellow;
}

h1 {
  color: red;
  margin-left: 40px;
}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

**3. Inline CSS** - used to apply a unique style for a single element.

```html
<!DOCTYPE html>
<html>
<body>

<h1 style="color:blue;text-align:center;">This is a heading</h1>
<p style="color:red;">This is a paragraph.</p>

</body>
</html>
```

## CSS Comments

Comments are used to explain the code, and may help when you edit the source code at a later date.

```css
/* This is a single-line comment */
p {
  color: red;
}
```

```css
p {
  color: red;  /* Set text color to red */
}
```

```css
/* This is
a multi-line
comment */

p {
  color: red;
}
```

## CSS Colors

Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.

### CSS Color Names

A color can be specified by using a predefined color name.

```html
<h1 style="background-color:Orange;">Orange</h1>
```

### CSS Background Color

Set the background color for HTML elements.

```html
<p style="background-color:red;">Lorem ipsum...</p>
```

### CSS Text Color

Set the color of text.

```html
<p style="color:red;">Lorem ipsum...</p>
```

### CSS Border Color

Set the color of borders.

```html
<h1 style="border:2px solid Violet;">Hello World</h1>
```

### CSS Color Values

Specified using RGB values, HEX values, HSL values, RGBA values, and HSLA values.

```html
<h1 style="background-color:rgb(255, 99, 71);">...</h1>
```

**RGB Value** - a color can be specified as an RGB value, using this formula: rgb(red, green, blue).

```css
background-color:rgb(255, 99, 71)
```

**RGBA Value** - RGBA color values are an extension of RGB color values with an alpha channel - which specifies the opacity for a color.
An RGBA color value is specified with: rgba(red, green, blue, alpha).

```css
background-color:rgba(255, 99, 71, 0.5)
```

**HEX Value** - a color can be specified using a hexadecimal value in the form.

```css
background-color: #000000
```

**3 Digit HEX Value** - The 3-digit hex code is a shorthand for some 6-digit hex codes.
The 3-digit hex code has the following form: #rgb

```css
background-color:#fc9
```

**HSL Value** - a color can be specified using hue, saturation, and lightness (HSL) in the form: hsl(hue, saturation, lightness).

```css
background-color:hsl(0, 100%, 50%)
```

**HSLA Value** - HSLA color values are an extension of HSL color values with an alpha channel - which specifies the opacity for a color.
An HSLA color value is specified with: hsla(hue, saturation, lightness, alpha).

```css
background-color:hsla(0, 100%, 50%, 0.5)
```

## CSS Backgrounds

The CSS background properties are used to add background effects for elements.

**CSS background-color** - specifies the background color of an element.

```css
body {
  background-color: lightblue;
}
```

Opacity / Transparency

`opacity` property specifies the opacity/transparency of an element. It can take a value from 0.0 - 1.0. The lower value, the more transparent.

```css
div {
  background-color: green;
  opacity: 0.3;
}
```

Transparency using RGBA

If you do not want to apply opacity to child elements, like in our example above, use RGBA color values.

```css
div {
  background: rgba(0, 128, 0, 0.3) /* Green background with 30% opacity */
}
```

**CSS background-image** - specifies an image to use as the background of an element.

```css
body {
  background-image: url("paper.gif");
}
```

**CSS background-repeat** - repeats an image both horizontally and vertically.

```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: repeat-x;
}
```

```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: repeat-y;
}
```

```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: no-repeat;
}
```

**CSS background-position** - used to specify the position of the background image.

```css
body {
  background-image: url("gradient_bg.png");
  background-repeat: no-repeat;
  background-position: right top;
}
```
