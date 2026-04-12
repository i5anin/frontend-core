# Flexbox и CSS Grid

## Flexbox — одномерный layout

### Контейнер

```css
.container {
  display: flex;

  /* Направление */
  flex-direction: row;            /* default — строка */
  flex-direction: column;         /* колонка */
  flex-direction: row-reverse;

  /* Перенос */
  flex-wrap: nowrap;  /* default */
  flex-wrap: wrap;

  /* Выравнивание по главной оси */
  justify-content: flex-start;    /* default */
  justify-content: center;
  justify-content: flex-end;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;

  /* Выравнивание по поперечной оси */
  align-items: stretch;  /* default */
  align-items: center;
  align-items: flex-start;
  align-items: flex-end;
  align-items: baseline;

  /* Расстояние */
  gap: 20px;
  row-gap: 10px;
  column-gap: 20px;
}
```

### Элементы

```css
.item {
  /* flex: grow shrink basis */
  flex: 1;           /* 1 1 0 — равное пространство */
  flex: 0 0 200px;   /* фиксированная ширина */
  flex: 1 0 auto;

  flex-grow: 1;      /* занять доступное пространство */
  flex-shrink: 0;    /* не сжиматься */
  flex-basis: 200px; /* начальный размер */

  align-self: center;    /* перекрыть align-items для одного */
  order: -1;             /* порядок отображения */
}

/* Прижать элемент к краю */
.last { margin-left: auto; }
```

### Типичные паттерны

```css
/* Навигация */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Card */
.card {
  display: flex;
  flex-direction: column;
}
.card-body { flex: 1; }     /* растягивается */
.card-footer { flex-shrink: 0; } /* фиксированный */
```

---

## CSS Grid — двумерный layout

### Контейнер

```css
.grid {
  display: grid;

  /* Колонки */
  grid-template-columns: 200px 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  /* Строки */
  grid-template-rows: auto 1fr auto;

  /* Расстояние */
  gap: 20px;
  row-gap: 10px;
  column-gap: 20px;

  /* Именованные области */
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
```

### Размещение элементов

```css
.item {
  /* Явное размещение */
  grid-column: 1 / 3;    /* от 1 до 3 линии */
  grid-column: span 2;   /* занять 2 колонки */
  grid-column: 1 / -1;   /* во всю ширину */

  grid-row: 1 / 3;
  grid-row: span 2;

  /* По именованным областям */
  grid-area: header;
  grid-area: sidebar;
  grid-area: main;
}
```

### Layout страницы

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```

### Responsive Grid

```css
/* Автоматически адаптируется */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

---

## Flexbox vs Grid — когда что?

| | Flexbox | Grid |
|---|---|---|
| Ось | Одна (row или column) | Две (rows + columns) |
| Контент | Под контент | Под макет |
| Выравнивание | Простое | Сложное |
| Браузеры | Все | Все современные |

**Flexbox:** навбар, кнопки, список карточек в строку  
**Grid:** layout страницы, сложные сетки, галерея
