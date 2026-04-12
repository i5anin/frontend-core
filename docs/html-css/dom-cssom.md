# DOM и CSSOM

## Порядок загрузки страницы

```
1. Браузер получает HTML
2. Парсит HTML → DOM Tree
3. Парсит CSS → CSSOM Tree
4. DOM + CSSOM → Render Tree
5. Layout (Reflow) — вычисление позиций
6. Paint — рисование пикселей
7. Composite — наложение слоёв
```

## DOM Tree

```html
<!-- HTML -->
<html>
  <body>
    <div class="container">
      <h1>Title</h1>
      <p>Text</p>
    </div>
  </body>
</html>
```

```
Document
  └── html
        └── body
              └── div.container
                    ├── h1 "Title"
                    └── p "Text"
```

## CSSOM Tree

```css
body { font-size: 16px; }
.container { color: red; }
h1 { font-size: 2em; }
```

```
Стили вычисляются и применяются к каждому узлу
h1: font-size=32px, color=red (унаследован)
```

## Reflow (Layout) и Repaint

```js
// Reflow — перевычисление геометрии (МЕДЛЕННО!)
element.style.width = '200px';
element.style.height = '100px';
element.offsetWidth; // Чтение → принудительный reflow

// Repaint — перерисовка (быстрее)
element.style.color = 'red';
element.style.background = 'blue';

// Composite — только слой (БЫСТРО!)
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';
```

## Как избежать Forced Layout

```js
// Плохо — read + write чередуются (layout thrashing)
for (let el of elements) {
  const height = el.offsetHeight;   // read → reflow
  el.style.height = height + 'px'; // write
}

// Хорошо — сначала все read, потом все write
const heights = elements.map(el => el.offsetHeight); // все read
elements.forEach((el, i) => {
  el.style.height = heights[i] + 'px'; // все write
});

// Или используйте requestAnimationFrame
requestAnimationFrame(() => {
  element.style.transform = 'translateX(100px)';
});
```

## Из чего состоит браузер

```
┌──────────────────────────────────────────┐
│            Браузер                        │
│                                          │
│  ┌──────────┐  ┌──────────────────────┐  │
│  │  UI      │  │   Browser Engine     │  │
│  │ (адресная│  │   (навигация,        │  │
│  │  строка) │  │    история)          │  │
│  └──────────┘  └──────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────────┐ │
│  │         Rendering Engine             │ │
│  │  HTML Parser → DOM                   │ │
│  │  CSS Parser  → CSSOM                 │ │
│  │  Layout → Paint → Composite          │ │
│  └──────────────────────────────────────┘ │
│                                          │
│  ┌──────────┐  ┌──────────────────────┐  │
│  │JavaScript│  │   Network            │  │
│  │ Engine   │  │   (HTTP, WebSocket)  │  │
│  │  (V8)    │  └──────────────────────┘  │
│  └──────────┘                            │
│                                          │
│  ┌──────────────────────────────────────┐ │
│  │      Data Storage                    │ │
│  │  Cookies, localStorage, IndexedDB    │ │
│  └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

## Критический путь рендеринга

```
HTML → DOM
CSS  → CSSOM  ← Блокирует рендеринг!
JS   → Блокирует и DOM и CSSOM!

Оптимизации:
- CSS в <head>
- JS в конце <body> или defer/async
- Минимизировать CSS
- Убрать неиспользуемый CSS
```

```html
<!-- defer — загружает параллельно, выполняет после DOM -->
<script defer src="app.js"></script>

<!-- async — загружает параллельно, выполняет сразу -->
<script async src="analytics.js"></script>
```

## Изоляция стилей

```css
/* 1. BEM — соглашения об именовании */
.card__title { }
.card__title--highlighted { }

/* 2. CSS Modules (в сборщиках) */
/* .title → .Header_title_3xkv */

/* 3. CSS-in-JS (styled-components, Emotion) */

/* 4. Shadow DOM — полная изоляция */
const shadow = element.attachShadow({ mode: 'open' });

/* 5. @scope (новый CSS) */
@scope (.card) {
  .title { color: red; }
}
```
