---
tags:
  - веб-разработка
  - vue
  - css
  - javascript
created: 2024-10-15
date: 2024-10-15
---
Вот список современных [CSS](./CSS)-концепций и свойств, которые полезно знать разработчику [../../../Vue/Vue.js](#) в 2024 году:

**1. **[Flexbox](#)****
Flexbox — это современный способ создания гибких макетов. Он используется для выравнивания и распределения элементов на странице.
- `display: flex`
- `flex-direction`, `justify-content`, `align-items`
- `flex-wrap`, `flex-basis`, `flex-grow`, `flex-shrink`

**2. **[Grid Layout](#)****
CSS Grid — это мощный инструмент для создания сложных макетов сетки.
- `display: grid`
- `grid-template-columns`, `grid-template-rows`
- `grid-gap`, `grid-auto-flow`
- `grid-area`, `grid-template-areas`
- `align-items`, `justify-items`

**3. **[Custom Properties](#) (CSS Variables)****
CSS-переменные позволяют управлять повторяющимися значениями и легко обновлять дизайн.
```css
:root {
  --main-color: #3498db;
  --padding-size: 16px;
}
.element {
  color: var(--main-color);
  padding: var(--padding-size);
}
```

**4. **[Responsive Design](#) (Медиа-запросы)****
Медиа-запросы остаются ключевым элементом адаптивного дизайна.
```css
@media (max-width: 768px) {
  .element {
    font-size: 14px;
  }
}
```

**5. **[Flexibly Managing Spacing](#)****
Использование современных единиц измерения: `rem`, `em`, `%`, `vh`, `vw`.
- `rem` — базируется на корневом размере шрифта.
- `vh`, `vw` — соответствуют 1% от высоты или ширины окна.

**6. **[Positioning](#)****
Современные техники позиционирования элементов:
- `position: relative`, `position: absolute`, `position: sticky`
- `z-index`

**7. **[Transitions and Animations](#)****
Добавление плавных переходов и анимаций.
- `transition`, `transition-timing-function`
- `@keyframes`

**8. **[Clamp Function](#)****
Позволяет задавать гибкие значения с минимальными и максимальными ограничениями.
```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

**9. **[Aspect Ratio](#)****
Управление соотношением сторон блоков без использования JavaScript.
```css
.element {
  aspect-ratio: 16 / 9;
}
```

**10. **[Modern Pseudo-Classes and Selectors](#)****
Современные псевдоклассы:
- `:is()`, `:where()` — упрощают написание селекторов.
- `:focus-visible` — улучшает доступность.
- `:not()` — исключает элементы из выборки.
- `:nth-child()`, `:nth-of-type()`

**11. **[Container Queries](#)****
Контейнерные запросы позволяют применять стили в зависимости от размеров контейнера, а не окна браузера.
```css
@container (min-width: 400px) {
  .element {
    font-size: 18px;
  }
}
```

**12. **[CSS Modules](#) (Scoped CSS in Vue)****
Использование `scoped` стилей в компонентах Vue:
```vue
<style scoped>
.component {
  color: blue;
}
</style>
```

**13. **[CSS Grid](#)/[Flexbox Mix](#)****
Комбинирование Flexbox и CSS Grid для создания адаптивных интерфейсов.

**14. **[Dark Mode Support](#)****
Использование системных цветовых схем для поддержки темной и светлой темы:
```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #333;
    color: #fff;
  }
}
```

**15. **[CSS Nesting](#) (с 2024 года)****
Возможность вложенности стилей, которая делает CSS более модульным.
```css
.container {
  color: black;
  & .child {
    color: white;
  }
}
```

Знание этих современных [CSS](./CSS)-инструментов и техник позволяет создавать адаптивные, красивые и эффективные интерфейсы в проектах на [../../../Vue/Vue.js](#) в 2024 году.

---

## Связанные

- [[CSS]]
- [[CSS единицы измерения]]
- [[CSS единицы измерения2]]
- [[CSS существуют различные тип отображения элементов]]
- [[CSS-правил, который определяет приоритет применения стилей]]
- [[CSS]]
