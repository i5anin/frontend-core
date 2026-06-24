---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
created: 2024-10-03
date: 2024-10-03
---
# HTML5
Если вы используете Vue 3 и в основном применяете теги 
+ `<div>`
+ `<pre>`
+ `<span>`
то вам может быть полезно знать о других HTML5 тегах, которые могут улучшить семантику и структуру вашего приложения. Вот несколько тегов, которые могут быть полезны в Vue 3:

1. **`<header>`**: Для заголовка страницы или компонента.
2. **`<nav>`**: Для навигационных меню.
3. **`<main>`**: Для основного содержимого страницы.
4. **`<article>`**: Для независимых блоков контента, таких как статьи или посты.
5. **`<section>`**: Для разделов страницы или компонента.
6. **`<aside>`**: Для боковых панелей или дополнительного контента.
7. **`<footer>`**: Для подвала страницы или компонента.
8. **`<figure>`**: Для группировки медиа-контента с подписью.
9. **`<figcaption>`**: Для подписи к элементу `<figure>`.
10. **`<video>`**: Для встраивания видео.
11. **`<audio>`**: Для встраивания аудио.
12. **`<source>`**: Для указания различных источников медиафайлов внутри `<video>` или `<audio>`.
13. **`<canvas>`**: Для рисования графики на лету с помощью [JavaScript](./JavaScript).
14. **`<svg>`**: Для встраивания векторной графики.
15. **`<datalist>`**: Для предоставления списка опций для элемента `<input>`.
16. **`<details>`**: Для создания виджета с дополнительной информацией, которую можно открыть или закрыть.
17. **`<summary>`**: Для заголовка элемента `<details>`.
18. **`<time>`**: Для представления даты и времени.
19. **`<mark>`**: Для выделения текста.
20. **`<progress>`**: Для индикатора выполнения задачи.

Пример использования некоторых из этих тегов в Vue 3:

```html
<template>
  <header>
    <h1>Заголовок страницы</h1>
    <nav>
      <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#">О нас</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Заголовок статьи</h2>
      <p>Текст статьи...</p>
    </article>

    <section>
      <h2>Раздел страницы</h2>
      <p>Текст раздела...</p>
    </section>

    <aside>
      <h3>Боковая панель</h3>
      <p>Дополнительный контент...</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 Компания</p>
  </footer>
</template>

<script>
export default {
  name: 'MyComponent',
};
</script>

<style scoped>
/* Ваши стили */
</style>
```

Использование этих семантических тегов поможет улучшить доступность и [SEO](#) вашего приложения, а также сделает ваш код более понятным и структурированным.

---
Here's a basic cheat sheet for common HTML tags:

-   `<html>`: Defines an HTML document
-   `<head>`: Defines information about the document
-   `<title>`: Defines a title for the document
-   `<body>`: Defines the document's body
-   `<header>`: Defines a header for a document or section
-   `<footer>`: Defines a footer for a document or section
-   `<nav>`: Defines navigation links
-   `<section>`: Defines a section of a document
-   `<article>`: Defines an independent, self-contained content
-   `<aside>`: Defines content that is tangentially related to the main content
-   `<div>`: Defines a container for content
-   `<p>`: Defines a paragraph
-   `<a>`: Defines a hyperlink
-   `<img>`: Defines an image
-   `<ul>`: Defines an unordered list
-   `<ol>`: Defines an ordered list
-   `<li>`: Defines a list item
-   `<table>`: Defines a table
-   `<tr>`: Defines a table row
-   `<td>`: Defines a table cell
-   `<th>`: Defines a table header cell
-   `<form>`: Defines a form for user input
-   `<input>`: Defines an input field
-   `<button>`: Defines a clickable button
-   `<label>`: Defines a label for an input element
-   `<select>`: Defines a drop-down list
-   `<option>`: Defines an option in a drop-down list
-   `<textarea>`: Defines a multi-line input field

Note that this is not a comprehensive list, and there are many more [HTML](./HTML) tags that you can use to structure and style your content.![HTML5.jpg](#)

---

## Связанные

- [[HTML]]
- [[favicon]]
- [[HTML2]]
