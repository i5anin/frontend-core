
Основные позиции:

- `static` — по потоку.
    
- `relative` — смещение без выхода из потока.
    
- `absolute` — позиционирование относительно ближайшего positioned-родителя.
    
- `fixed` — относительно окна.
    
- `sticky` — комбинация relative/fixed.
    

Наложение элементов определяется:  
`z-index`, контекстами наложения (transform, opacity < 1, flex/grid).

---

---

# HTML/CSS – Псевдоклассы и псевдоэлементы

Псевдоклассы — состояние:  
`:hover`, `:focus`, `:active`, `:checked`, `:disabled`, `:nth-child`, `:not`.

Псевдоэлементы — виртуальные элементы:  
`::before`, `::after`, `::placeholder`, `::selection`.

---

# HTML/CSS – Формы и элементы форм

Элементы: `input`, `textarea`, `select`, `option`, `fieldset`, `label`, `button`.  
Валидация: атрибуты `required`, `pattern`, `min`, `max`.  
События: `input`, `change`, `submit`.  
Правильная доступность: связывание через `for/id`.

---

# HTML/CSS – Встраивание медиа

- Изображения: `<img src="">`
    
- Видео: `<video controls>`
    
- Аудио: `<audio controls>`
    
- Современные форматы: `webp`, `avif`.
    
- Responsive images: `srcset`, `sizes`, `<picture>`.
    

---

# HTML/CSS – Flexbox

Одномерная раскладка.

Основные свойства контейнера:  
`display: flex`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`.

Элементов:  
`flex-grow`, `flex-shrink`, `flex-basis`, `order`.

---

# HTML/CSS – Grid

Двумерная раскладка.

Основные свойства:  
`display: grid`, `grid-template-columns`, `grid-template-rows`, `gap`, `grid-auto-flow`.

Позволяет строить сложные сетки, адаптивные макеты, комбинировать авто/фракции (`fr`).

---

# HTML/CSS – Комбинаторы и спецификация

Комбинаторы:

- `A B` — потомок
    
- `A > B` — прямой ребёнок
    
- `A + B` — сосед
    
- `A ~ B` — все следующие соседи
    

Специфичность:  
inline > id > class/attr/pseudoclass > tag/pseudoelement.

---

# HTML/CSS – БЭМ

Методология именования:

- Block: независимый компонент
    
- Element: `block__element`
    
- Modifier: `block--mod`
    

Цель — изоляция, читаемость, предсказуемость.

---

# HTML/CSS – DOM и CSSOM, порядок загрузки

Браузер создаёт:

- DOM — дерево HTML
    
- CSSOM — дерево стилей
    

JS блокирует построение DOM, если стоит `<script>` без `defer`.  
CSS блокирует рендеринг, но не построение DOM.

---

# HTML/CSS – Изоляция стилей

Способы:

- БЭМ
    
- CSS Modules
    
- Shadow DOM
    
- Скоуп-стили (Vue SFC `<style scoped>`)
    

---

# HTML/CSS – Адаптивная верстка

Используются:

- медиазапросы (`@media`)
    
- резиновые сетки (`%`, `fr`, `minmax`)
    
- контейнерные единицы (`vw`, `vh`)
    
- `clamp()`
    

Mobile-first подход.

---

# HTML/CSS – Семантическая верстка

Использование тегов по назначению:  
`header`, `main`, `nav`, `aside`, `footer`, `section`, `article`, `figure`.  
Правильная структура улучшает SEO, доступность и читаемость.

---

# HTML/CSS – Canvas и SVG (база)

Canvas — растровая отрисовка через JS.  
SVG — векторная графика в DOM.  
SVG подходит для иконок, графиков, Canvas — для анимаций, игр.

---

# HTML/CSS – Анимации (база)

Трансформации и переходы:

```css
transition: all .3s;
transform: translate / scale / rotate;
```

CSS-анимации:

```css
@keyframes move { ... }
animation: move 1s infinite;
```

Лучше анимировать transform и opacity — они используют GPU.

---

# HTML/CSS – Основные блоки браузера

- HTML Parser
    
- CSS Parser
    
- JS Engine
    
- Layout engine
    
- Painting
    
- Composite (GPU)
    
- Network Layer
    

---

# HTML/CSS – Как происходит рендер

1. Парсинг HTML → DOM
    
2. Парсинг CSS → CSSOM
    
3. Объединение в Render Tree
    
4. Layout (расчёт размеров/позиций)
    
5. Paint (отрисовка)
    
6. Composite (слои на GPU)
    

Пересчёты вызывают Reflow / Repaint.

---

Готов продолжить следующие блоки (Vue, DevOps, системный дизайн) в таком же формате.