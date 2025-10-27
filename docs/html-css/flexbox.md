## Flexbox и Grid

### Общая идея

**Flexbox** и **Grid** — два мощных инструмента CSS для построения макетов.
Flexbox оптимизирован для **одномерных** (строчных или колонных) композиций, а Grid — для **двумерных** (строки и столбцы одновременно).
Вместе они позволяют строить адаптивные интерфейсы без хаотичного `float` и лишних обёрток.

---

## Flexbox

### Когда использовать

Flexbox применяют для выравнивания элементов **в одном направлении** — по горизонтали или вертикали.
Примеры: меню, карточки, кнопки, панель навигации.

### Основной синтаксис

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

* `display: flex` — активирует флекс-контейнер.
* `flex-direction` — направление: `row | column | row-reverse | column-reverse`.
* `justify-content` — выравнивание по **главной оси**.
* `align-items` — выравнивание по **перекрёстной оси**.
* `flex-wrap` — перенос элементов на новую строку.

---

### Управление элементами

```css
.item {
  flex: 1;              /* равное распределение */
  flex-grow: 2;          /* растёт в 2 раза быстрее */
  flex-shrink: 0;        /* не сжимается */
  flex-basis: 200px;     /* базовый размер */
  align-self: flex-end;  /* индивидуальное выравнивание */
}
```

Сокращённая запись:

```css
.item { flex: 1 0 200px; } /* grow shrink basis */
```

---

### Типовые схемы

**Выравнивание по центру:**

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Пропорциональные колонки:**

```css
.columns {
  display: flex;
}
.columns > div {
  flex: 1;
}
```

**Футер внизу страницы:**

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
```

---

## Grid

### Когда использовать

Grid идеально подходит для **сложных макетов** — таблицы, дашборды, страницы с боковыми панелями, карточки.
Он позволяет управлять строками и колонками **одновременно**, включая промежутки (`gap`), выравнивание и именованные области.

### Основной синтаксис

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}
```

* `grid-template-columns` — ширина колонок.
* `grid-template-rows` — высота строк.
* `gap` — расстояние между ячейками.

---

### Единицы измерения

* `fr` — доля свободного пространства (`1fr 2fr` → 1:2).
* `auto` — под содержимое.
* `%` / `px` — фиксированные размеры.
* `minmax(min, max)` — адаптивные размеры.
* `repeat(n, pattern)` — повтор шаблона.

```css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

---

### Размещение элементов

```css
.item {
  grid-column: 1 / 3;   /* занимает 2 колонки */
  grid-row: 2 / 4;      /* занимает 2 строки */
}
```

Можно использовать именованные линии:

```css
grid-template-columns: [start] 1fr [content] 2fr [end];
```

---

### Grid Areas

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

---

### Автоматическое размещение

Grid умеет сам размещать элементы по порядку.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
```

Элементы автоматически подстраиваются под ширину контейнера — идеальный вариант для галерей.

---

### Выравнивание

* `justify-items`, `align-items` — внутри ячеек.
* `justify-content`, `align-content` — вся сетка в контейнере.
* Значения: `start | end | center | stretch`.

---

## Комбинация Flexbox и Grid

Современные макеты почти всегда комбинируют оба подхода:

* **Grid** задаёт структуру страницы (области, линии).
* **Flexbox** управляет внутренним выравниванием внутри компонентов.

Пример:

```css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
}
.sidebar { background: #f5f5f5; }
.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

---

## Адаптивность

### Медиа-запросы

```css
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

### Автоматическая адаптация

`auto-fit` и `auto-fill` позволяют динамически распределять карточки:

```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

---

## Полезные свойства

| Свойство        | Flexbox                             | Grid                    |
| --------------- | ----------------------------------- | ----------------------- |
| `gap`           | ✅ поддерживается                    | ✅ поддерживается        |
| `order`         | изменяет порядок элементов          | через `grid-row/column` |
| `align-content` | выравнивает все строки/колонки      | аналогично              |
| `place-items`   | `align-items` + `justify-items`     | работает в обоих        |
| `place-content` | `align-content` + `justify-content` | работает в обоих        |

---

## Перформанс и семантика

* Flexbox быстрее для небольших одноосных макетов.
* Grid эффективнее для сложных двумерных раскладок.
* Старайся не делать вложенные Grid в Grid без нужды — сложнее дебажить.

---

## Визуальные инструменты

* [Firefox DevTools → Layout](https://developer.mozilla.org/ru/docs/Tools/Page_Inspector/How_to/Examine_grid_layouts) — показывает линии сетки.
* [CSS Grid Generator](https://cssgrid-generator.netlify.app/) — визуальный конструктор сетки.
* [Flexbox Froggy / Grid Garden](https://flexboxfroggy.com/) — интерактивные тренажёры.

---

## Чек-лист для Flexbox и Grid

1. Flexbox — для одномерных раскладок (линейное выравнивание).
2. Grid — для двумерных макетов (таблицы, страницы).
3. Используй `gap` вместо `margin` для промежутков.
4. Не анимируй свойства layout (`width`, `height`) — они дорогие.
5. Для адаптивности — `fr`, `minmax()` и `auto-fit`.
6. Проверяй выравнивание на всех брейкпоинтах.
7. Вложенные компоненты выравнивай Flexbox-ом внутри Grid.

---

Flexbox и Grid — это не конкуренты, а два измерения одной системы координат.
Flex управляет потоком, Grid — структурой. Вместе они дают полный контроль над компоновкой, без хаоса и «костылей» эпохи float.
