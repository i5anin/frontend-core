---
tags:
  - веб-разработка
  - css
  - html
  - javascript
  - typescript
created: 2024-10-11
date: 2024-10-11
---
Sure! Here's how you can use Tailwind [CSS](./CSS) to create a dark theme for the i5anin portfolio:

1.  Install Tailwind [CSS](./CSS):

Assuming that you have a basic understanding of Node.js and npm, run the following command in the terminal to install Tailwind [CSS](./CSS):

`npm install tailwindcss`

2.  Create a Tailwind CSS configuration file:

Create a new file called `tailwind.config.js` in the root directory of your project and add the following code to it:

```css
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

This configuration file tells Tailwind CSS to enable dark mode and purge any unused CSS classes. It also configures Tailwind CSS to use Just-in-Time (JIT) mode for faster build times.

3.  Create a `dark` class:

Add the following code to your `src/index.css` file:

css

```css
.dark {
  --color-primary: #8b5cf6;
  --color-background: #111827;
  --color-text: #d1d5db;
}

@media (prefers-color-scheme: dark) {
  .dark {
    --color-primary: #8b5cf6;
    --color-background: #111827;
    --color-text: #d1d5db;
  }
}
```

This code creates a `.dark` class that sets some custom CSS variables for the primary color, background color, and text color. It also adds a media query that changes the values of these variables when the user's device is set to dark mode.

4.  Add the `dark` class to your HTML:

Find the HTML element that represents the background of your website (for example, the `body` element) and add the `dark` class to it, like this:

python

`<body class="dark">`

This will apply the custom CSS styles defined in the `.dark` class when the `body` element has the `dark` class.

5.  Use the custom CSS variables in your styles:

Now you can use the custom CSS variables defined in the `.dark` class in your styles. For example, to set the background color of an element to the custom background color, you can use the `var()` function like this:

css

`.background {   background-color: var(--color-background); }`

And that's it! You've created a dark theme for the i5anin portfolio using Tailwind CSS.

---

## Связанные

- [[CSS]]
- [[CSS единицы измерения]]
- [[CSS единицы измерения2]]
- [[CSS существуют различные тип отображения элементов]]
- [[CSS-правил, который определяет приоритет применения стилей]]
- [[CSS]]
