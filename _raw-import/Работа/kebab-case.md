---
tags:
  - веб-разработка
  - vue
  - css
  - html
  - javascript
created: 2024-10-13
date: 2024-10-13
---
**Kebab-case** (или "кебаб-стиль") — это стиль записи, при котором несколько слов в имени переменной или идентификатора разделяются дефисами, а все буквы пишутся строчными (без использования заглавных букв). Этот стиль получил название "kebab" (шашлык), потому что дефисы между словами напоминают шампуры, нанизывающие кусочки мяса.

**Пример kebab-case:**
- `background-color`
- `font-size`
- `text-align`

**Где используется kebab-case:**
1. **[CSS](./CSS)-свойства:**
   В [CSS](./CSS) все свойства записываются в kebab-case. Например:
   ```css
   background-color: #ffffff;
   font-size: 16px;
   text-align: center;
   ```

2. **HTML-атрибуты:**
   В HTML атрибуты, такие как `data-*`, также используют kebab-case:
   ```html
   <div data-user-name="John Doe"></div>
   ```

3. **Компоненты Vue.js:**
   Когда мы используем компоненты в шаблоне Vue, их имена записываются в kebab-case, даже если сам компонент был назван в PascalCase.

   Пример:
   ```vue
   <template>
     <my-component></my-component>
   </template>

   <script>
   export default {
     components: {
       'my-component': MyComponent
     }
   };
   </script>
   ```

**Итог:**
- **[kebab-case](./kebab-case)** — это стиль написания идентификаторов, где слова разделяются дефисами, а все буквы — строчные.
- Этот стиль широко используется в **[CSS](./CSS)**, **[HTML](./HTML)** и **[../Vue/Vue.js](#)** для именования атрибутов, классов и компонентов.

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
