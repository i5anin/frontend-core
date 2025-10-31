# HTML / CSS / PCSS 2025+

### Общие принципы

Современная фронтенд-разметка — это не просто HTML + CSS, а **система декларативных интерфейсов**, где верстка, стили и логика взаимодействуют через компоненты.
HTML остаётся основой, CSS становится модульным и типизированным, а PostCSS (PCSS) — инструментом автоматизации и трансформации стилей.    

## HTML 2025

<h2 id="semantic">Семантика и адаптивность</h2>

HTML всё ещё про **структуру и смысл**, не про оформление.
Используй семантические теги для улучшения доступности, SEO и UX.

**Примеры:**

```html
<header> — шапка страницы  
<nav> — меню навигации  
<main> — основное содержимое  
<section> — логический раздел  
<article> — самостоятельный контент  
<aside> — боковая панель  
<footer> — подвал страницы
```

**Пример:**

```html
<article class="news">
  <header>
    <h2>Новый релиз Vue 3.5</h2>
    <time datetime="2025-06-10">10 июня 2025</time>
  </header>
  <p>Vue стал ещё быстрее благодаря компиляции шаблонов на уровне CDN.</p>
  <footer>
    <a href="/read-more">Читать дальше →</a>
  </footer>
</article>
```    

<h2 id="positioning">Позиционирование и наложение</h2>

### Базовые режимы `position`

* `static` — по потоку, без смещения.
* `relative` — остаётся в потоке, смещения через `inset`/`top|right|bottom|left`.
* `absolute` — вне потока, относительно ближайшего предка с установленным содержащим блоком для абсолютного позиционирования (обычно предок с `position` ≠ `static`).
* `fixed` — относительно вьюпорта; при наличии предка с трансформацией/фильтром/перспективой фиксируется к нему.
* `sticky` — гибрид: ведёт себя как `relative` до порога, затем «прилипает» как `fixed` в пределах контейнера.

### Содержащие блоки (containing block)

* Для `absolute` — ближайший предок с `position` ≠ `static` (или специальные случаи форматирующих контекстов).
* Для `fixed` — вьюпорт; если предок имеет `transform`/`filter`/`perspective`/`contain: paint|strict|content` — этот предок становится опорой.
* Логические смещения: используйте `inset`, `inset-inline`, `inset-block` вместо устаревших `top/left`.

```css
.card {
  position: relative;
}
.card__badge {
  position: absolute;
  inset-block-start: .5rem;
  inset-inline-end: .5rem;
}
```

### Формы

HTML5 формирует стандарт взаимодействия с пользователем:

* Новые типы полей: `email`, `date`, `number`, `range`, `color`.
* Валидация без JS (`required`, `pattern`, `min`, `max`).
* Элементы: `<datalist>`, `<progress>`, `<meter>`, `<output>`.

```html
<form>
  <input type="email" required placeholder="you@example.com" />
  <input type="range" min="0" max="100" />
  <button type="submit">Отправить</button>
</form>
```    

### Медиа и графика

* `<picture>` — адаптивные изображения.
* `<video>` и `<audio>` — нативные медиа без плагинов.
* `<canvas>` — динамическая графика.
* `<svg>` — масштабируемая векторная графика и иконки.

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Фото" loading="lazy" />
</picture>
```    

### Новые стандарты

* `loading="lazy"` — отложенная загрузка изображений и iframe.
* `fetchpriority="high"` — контроль приоритета загрузки.
* `popover` API — нативные всплывающие окна.
* `dialog` API — модальные окна без JS-фреймворков.
* `:has()` — псевдокласс для реактивных состояний.    

## CSS 2025

### Современные возможности

#### Переменные (Custom Properties)

```css
:root {
  --color-primary: #0078ff;
  --spacing: 1rem;
}
button {
  background: var(--color-primary);
  margin: var(--spacing);
}
```

#### Контейнерные запросы (Container Queries)

Позволяют адаптировать дизайн не по ширине экрана, а по размеру контейнера:

```css
.card {
  container-type: inline-size;
}
@container (min-width: 500px) {
  .card__title { font-size: 1.5rem; }
}
```

#### Логические свойства

Поддержка языков с разным направлением письма (LTR/RTL):

```css
margin-inline-start: 1rem; /* вместо margin-left */
padding-block-end: 2rem;   /* вместо padding-bottom */
```

#### Слои (`@layer`)

Приоритет слоёв стилей:

```css
@layer reset, base, components, utilities;

@layer base {
  body { font-family: system-ui; }
}
@layer components {
  .button { border-radius: 8px; }
}
```

#### `:is()` и `:where()`

Упрощают селекторы и уменьшают специфичность:

```css
:is(h1, h2, h3) { margin-block-end: 0.5em; }
```

#### Псевдокласс `:has()`

Реактивный CSS без JS:

```css
.card:has(img:hover) {
  border-color: var(--color-primary);
}
```

#### Nesting (вложенность)

CSS наконец поддерживает SCSS-подобный синтаксис:

```css
.card {
  color: #333;
  &__title { font-weight: bold; }
  &:hover { transform: scale(1.02); }
}
```    

### Анимации и переходы

```css
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal {
  animation: fade 0.3s ease;
}
```

Нативные **scroll-linked animations** (`@scroll-timeline`) и **view transitions API** делают анимации плавными даже при переходах страниц.

### Гриды и флексы нового поколения

* `subgrid` — вложенные сетки наследуют линии родителя.
* `min()`, `max()`, `clamp()` — выражения для адаптивной типографики.

```css
font-size: clamp(1rem, 2vw, 2rem);
```

### Системная адаптивность

* `@media (prefers-color-scheme: dark)` — поддержка тёмной темы.
* `@media (prefers-reduced-motion: reduce)` — отключение анимаций.
* `color-scheme: light dark;` — автоматическое переключение темы.

## PostCSS (PCSS)

### Что это

**PostCSS** — инструмент для обработки CSS через плагины.
Он не заменяет Sass, а превращает ваш CSS в **построенный под проект пайплайн**.

### Типовые плагины

| Название               | Назначение                               |
| ---------------------- | ---------------------------------------- |
| `postcss-nested`       | вложенные селекторы (как SCSS)           |
| `autoprefixer`         | добавление вендорных префиксов           |
| `postcss-import`       | импорт файлов                            |
| `postcss-custom-media` | алиасы для медиа-запросов                |
| `postcss-mixins`       | шаблоны и функции                        |
| `postcss-preset-env`   | современные фичи CSS под старые браузеры |    

### Пример конфигурации

`postcss.config.js`

```js
export default {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'autoprefixer': {},
    'postcss-preset-env': { stage: 1 }
  }
}
```    

### Пример PCSS-файла

```pcss
@import 'variables.pcss';

.card {
  display: grid;
  gap: var(--spacing);
  &__title {
    font-size: clamp(1rem, 2vw, 1.5rem);
  }
  &:hover {
    background: var(--color-accent);
  }
}
```    

## Современные практики

1. Используй **семантический HTML** и **CSS-переменные** вместо хаотичных классов.
2. Организуй стили по компонентам (SCSS/PCSS-модули, `@layer`, `@import`).
3. Проверяй контраст и доступность (`aria-label`, `alt`, `role`).
4. Предпочитай **Grid и Flexbox** для макета, а не `position: absolute`.
5. Храни критический CSS inline, остальное — `async` загрузка.
6. Оптимизируй шрифты (`font-display: swap`).
7. Используй **PostCSS** для унификации и сборки.
8. Изолируй стили (CSS Modules, scoped, Shadow DOM).
9. Следи за **Cumulative Layout Shift (CLS)** — избегай скачков верстки.
10. Минимизируй переопределения и каскады — думай модульно.    

## Чек-лист HTML / CSS / PCSS 2025+

* ☑️ Семантическая и доступная разметка
* ☑️ Адаптивность через Grid, Flexbox и Container Queries
* ☑️ Переменные, логические свойства и современные селекторы
* ☑️ Постпроцессинг (PostCSS) и автопрефиксы
* ☑️ Использование системных предпочтений (тема, анимации)
* ☑️ Минимизация каскадов и дублирования
* ☑️ Легковесность и производительность (lazy-load, inline-critical)
* ☑️ Поддержка View Transitions и Scroll Animations
* ☑️ Единая архитектура стилей через слои (`@layer`)
* ☑️ Проверка Lighthouse / Axe / DevTools    

Современный HTML и CSS — это уже не «верстка», а **UI-архитектура**, где структура, стиль и поведение проектируются как согласованные, адаптивные системы.
PostCSS завершает эту эволюцию, превращая CSS в язык с экосистемой, гибкостью и автопилотом будущего.
