# Адаптивная верстка

## Media Queries

```css
/* Mobile-first подход (рекомендуется) */
.container { width: 100%; }           /* Mobile */

@media (min-width: 768px) {
  .container { max-width: 720px; }   /* Tablet */
}

@media (min-width: 1024px) {
  .container { max-width: 960px; }   /* Desktop */
}

@media (min-width: 1280px) {
  .container { max-width: 1200px; }  /* Large */
}

/* Desktop-first подход */
.container { max-width: 1200px; }

@media (max-width: 1023px) { }
@media (max-width: 767px)  { }
```

## Типичные Breakpoints

```css
/* Bootstrap-like */
/* xs: 0–575px */
/* sm: 576px–767px */
/* md: 768px–991px */
/* lg: 992px–1199px */
/* xl: 1200px+ */

/* Tailwind-like */
/* sm: 640px  */
/* md: 768px  */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

## Единицы измерения

```css
/* Абсолютные */
px   /* пиксели */

/* Относительные к шрифту */
em   /* относительно родителя (1em = текущий font-size) */
rem  /* относительно :root (1rem = 16px по умолчанию) */

/* Viewport */
vw   /* 1vw = 1% ширины viewport */
vh   /* 1vh = 1% высоты viewport */
vmin /* меньший из vw и vh */
vmax /* больший */
dvh  /* dynamic viewport height (учитывает UI браузера) */

/* Проценты */
%    /* относительно родителя */
```

## Fluid Typography

```css
/* Фиксированный размер (плохо) */
h1 { font-size: 48px; }

/* Fluid (хорошо) */
h1 { font-size: clamp(24px, 5vw, 48px); }
/*                  min  preferred  max */

/* CSS custom properties + calc */
:root {
  --fluid-min: 14px;
  --fluid-max: 18px;
  font-size: clamp(var(--fluid-min), 2.5vw, var(--fluid-max));
}
```

## Адаптивные изображения

```html
<!-- srcset + sizes -->
<img
  src="medium.jpg"
  srcset="small.jpg 600w, medium.jpg 1200w, large.jpg 1800w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  alt="..."
>

<!-- picture — разные форматы/размеры -->
<picture>
  <source media="(max-width: 600px)" srcset="mobile.webp" type="image/webp">
  <source media="(max-width: 600px)" srcset="mobile.jpg">
  <source srcset="desktop.webp" type="image/webp">
  <img src="desktop.jpg" alt="...">
</picture>
```

## CSS Grid — адаптивный

```css
/* Автоматически меняет количество колонок */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
/* 4 колонки на desktop, 2 на tablet, 1 на mobile */
```

## Container Queries (современный)

```css
/* Адаптация под размер контейнера, а не экрана */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 20px;
  }
}
```

## Viewport Meta

```html
<!-- Обязательно для мобильных! -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Практика: адаптивный навбар

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* скрыть, показать бургер */
  }
  .nav-links.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
  }
}
```
