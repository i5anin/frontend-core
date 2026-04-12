# Позиционирование и наложение

## Position значения

```css
/* static — по умолчанию, нет top/left */
.box { position: static; }

/* relative — относительно обычного положения */
.box { position: relative; top: 10px; left: 20px; }

/* absolute — относительно ближайшего родителя с position != static */
.parent { position: relative; }
.child  { position: absolute; top: 0; right: 0; }

/* fixed — относительно viewport (не скроллится) */
.header { position: fixed; top: 0; width: 100%; }

/* sticky — гибрид relative и fixed */
.nav { position: sticky; top: 0; }
```

## z-index и Stacking Context

```css
/* z-index работает только при position != static */
.modal   { position: fixed; z-index: 1000; }
.overlay { position: fixed; z-index: 999;  }

/* Новый stacking context создаётся при: */
/* - position + z-index != auto */
/* - opacity < 1 */
/* - transform */
/* - filter */
/* - isolation: isolate */

.container {
  position: relative;
  isolation: isolate; /* создаёт stacking context явно */
}
```

## Box Model

```css
/* box-sizing: content-box (default) */
/* width = только контент */
/* итоговая ширина = width + padding + border */

/* box-sizing: border-box */
/* width = контент + padding + border */
/* итоговая ширина = width (всегда!) */

*, *::before, *::after {
  box-sizing: border-box; /* лучшая практика */
}

.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  margin: 10px;
}
```

## Display значения

```css
display: block;        /* занимает всю ширину строки */
display: inline;       /* только по контенту, нельзя width/height */
display: inline-block; /* inline + можно задать размеры */
display: flex;         /* flexbox контейнер */
display: grid;         /* grid контейнер */
display: none;         /* скрыть из потока */
display: contents;     /* элемент исчезает, дети остаются */
```

## Overflow

```css
overflow: visible;  /* default — выходит за границы */
overflow: hidden;   /* обрезается */
overflow: scroll;   /* скролл всегда */
overflow: auto;     /* скролл только когда нужен */

overflow-x: hidden;
overflow-y: auto;

/* Clip содержимое с закруглёнными углами */
.card {
  border-radius: 8px;
  overflow: hidden;
}
```

## Centering — способы

```css
/* 1. Flexbox (самый удобный) */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. Grid */
.parent {
  display: grid;
  place-items: center;
}

/* 3. Absolute + transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. margin: auto (только горизонтально для block) */
.child {
  width: 300px;
  margin: 0 auto;
}
```

## Float и Clearfix

```css
/* Float — устаревший способ, но встречается */
.image { float: left; margin-right: 20px; }

/* Clearfix — очистка float */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* Современный способ — не используйте float для layout */
```
