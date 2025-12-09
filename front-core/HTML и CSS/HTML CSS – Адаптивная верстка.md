### Адаптивная верстка (Responsive Web Design) — ключевые аспекты 2025

| Технология                | Синтаксис / Пример                                                                 | Назначение и особенности 2025                                                                 |
|---------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Медиа-запросы**         | `@media (max-width: 768px) { … }`<br>`@media (prefers-color-scheme: dark) { … }`    | Основной инструмент. Поддержка `width`, `height`, `orientation`, `prefers-reduced-motion`, `prefers-contrast`, `display-mode` |
| **breakpoint-единицы**    | `min-width: 64rem`<br>`max-width: clamp(320px, 100vw, 1400px)`                     | Рекомендуется `rem`/`em` вместо `px` для доступности и масштабирования шрифта                        |
| **container queries**     | `@container (min-width: 400px) { .card { … } }`<br>`container-type: inline-size;`   | С 2024–2025 полная поддержка во всех браузерах. Адаптация по размеру контейнера, а не viewport       |
| **container units**       | `width: 100cqi` (100% inline размера контейнера)<br>`max-width: 50cqb`             | `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax` — работают только внутри container queries             |
| **Flexbox**               | `display: flex; flex-wrap: wrap; gap: 2rem;`                                      | Основной инструмент для строк/колонок. `flex-basis` + `flex-grow` вместо фиксированных ширин         |
| **Grid**                  | `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`     | `auto-fit` + `minmax()` — золотой стандарт карточек и галерей 2025                                  |
| **clamp()**               | `font-size: clamp(1rem, 2.5vw + 0.5rem, 3rem);`                                    | Плавное масштабирование без медиа-запросов                                                                |
| **logical properties**    | `margin-block`, `padding-inline-start`, `inset-inline: 0`                          | Замена физических `top/right/bottom/left` для поддержки RTL и вертикальных языков                   |
| **aspect-ratio**          | `aspect-ratio: 16/9;` или `aspect-ratio: 1/1;`                                     | Нативная замена padding-hack для видео и карточек                                                        |
| **modern viewport units** | `dvh`, `svh`, `lvh`, `dvb`, `svb`, `lvb`                                            | Решают проблему мобильных браузеров с скрывающейся адресной строкой                                    |
| **prefers-reduced-motion**| `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`   | Обязательно для доступности 2025                                                                        |
| **<meta viewport>**       | `<meta name="viewport" content="width=device-width, initial-scale=1">`            | Обязательно. Дополнительно можно `maximum-scale=1` блокировать только при необходимости             |

### Рекомендуемая структура breakpoints 2025 (в rem)

```css
/* Mobile first */
:root {
  --mobile: 20rem;      /* 320px */
  --tablet: 48rem;      /* 768px */
  --desktop: 64rem;     /* 1024px */
  --wide: 90rem;        /* 1440px */
}

@media (min-width: 48rem) { … }
@media (min-width: 64rem) { … }
@media (min-width: 90rem) { … }
```

### Современные подходы 2025

| Подход                      | Когда использовать                                                                 |
|-----------------------------|------------------------------------------------------------------------------------|
| Mobile-first + container queries | Большинство проектов (90%+ случаев)                                               |
| Grid + auto-fit + minmax()  | Карточки, галереи, списки товаров                                                  |
| Flexbox + flex-basis: 0 + flex-grow: 1 | Навигация, формы, простые строки                                                  |
| clamp() + fluid typography  | Заголовки и текст — полностью без медиа-запросов                                  |
| :has() + container queries  | Сложные компоненты, меняющие layout при наличии определённых дочерних элементов   |

### Обязательные проверки на собеседовании

- Разница между `@media (width)` и container queries
- Как работают `cqi`/`cqw` единицы
- Почему `100vh` на мобильных ломается и как чинить через `dvh`/`lvh`
- Специфичность и производительность `:has()` и container queries
- Поддержка `aspect-ratio` и `logical properties` в старых браузерах (2025 — полная)

Адаптивная верстка 2025 = Mobile-first + Container Queries + Fluid Typography + Modern Units.