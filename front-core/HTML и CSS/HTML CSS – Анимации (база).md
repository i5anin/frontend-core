### CSS-анимации и переходы — база для собеседования 2025

| Характеристика                  | **transition**                              | **@keyframes + animation**                         |
|---------------------------------|---------------------------------------------|----------------------------------------------------|
| Назначение                      | Плавное изменение свойств при событии      | Полный контроль над последовательностью и циклами |
| Синтаксис                       | `transition: prop time function delay`      | `animation: name duration timing delay iteration direction fill-mode play-state` |
| Производительность (2025)       | Максимальная (GPU, только transform/opacity)| Высокая при использовании transform + opacity      |
| Событие запуска                 | hover/focus/class/JS                        | Автоматически или через класс/JS                   |
| Поддержка сложных сценариев     | Только 2 состояния (от → до)                | Любое количество ключевых кадров                   |
| Пауза/управление из JS          | Ограничено                                  | Полное (animation-play-state, elapsed time API)    |

### Свойства, безопасные для GPU-анимации (2025 — обязательно использовать)

| Свойство         | Почему на GPU                  | Альтернатива (не использовать) |
|------------------|--------------------------------|--------------------------------|
| `transform`      | translate, scale, rotate, skew | margin, top, left, width       |
| `opacity`        | Композитный слой               | color, background-color        |
| `filter`         | blur, brightness, hue-rotate   | box-shadow (дорого)            |
| `will-change`    | Принудительный композитный слой| Автоопределение браузера       |

### Современный синтаксис 2025 (рекомендуемый)

```css
/* Переходы */
.btn {
  transition: 
    transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1),
    opacity   0.25s ease-out,
    filter    0.3s ease;
}

/* Анимации */
@keyframes slideIn {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

.modal {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* View Timeline API (2025 — полная поддержка) */
.element {
  animation: fade 1s both;
  animation-timeline: view();
  animation-range: entry 20% cover 40%;
}
```

### Ключевые timing-functions 2025

| Название                    | Синтаксис                                 | Когда использовать                     |
|-----------------------------|-------------------------------------------|----------------------------------------|
| Material Motion             | `cubic-bezier(0.2, 0.8, 0.4, 1)`          | Кнопки, карточки, модалки              |
| Deceleration (выезд)        | `cubic-bezier(0, 0, 0.2, 1)`              | Появление элементов                    |
| Acceleration (въезд)        | `cubic-bezier(0.4, 0, 1, 1)`              | Исчезновение                           |
| Standard (новый ease)       | `cubic-bezier(0.3, 0, 0.1, 1)`            | По умолчанию в 2025                    |
| steps()                     | `steps(4, end)`                           | Типографика, индикаторы загрузки       |

### Scroll-driven анимации (стандарт 2025)

```css
@keyframes grow {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}

.card {
  view-timeline: --card;
  animation: grow 0.6s both;
  animation-timeline: --card;
  animation-range: entry 0% entry 50%;
}
```

### ScrollTimeline + ViewTimeline (2025 — без JS)

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: rotate 2s linear infinite;
  animation-timeline: scroll();
}
```

### Web Animations API (JS-контроль 2025)

```js
element.animate(
  [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translateY(0)',      opacity: 1 }
  ],
  {
    duration: 600,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
    timeline: new ViewTimeline({ subject: element })
  }
);
```

### Обязательные правила производительности 2025

| Правило                              | Код                              |
|--------------------------------------|----------------------------------|
| Анимировать только transform/opacity | `transform: translateX(100px)`   |
| Использовать `will-change` заранее   | `will-change: transform, opacity`|
| GPU-триггер                          | `transform: translateZ(0)`       |
| Избегать layout thrashing            | Не читать layout-свойства в loop |

### Вывод для собеседования 2025

| Задача                             | Решение 2025                     |
|------------------------------------|----------------------------------|
| Hover-эффекты                      | transition + transform/opacity   |
| Появление модалок, карточек        | animation + Material easing      |
| Scroll-анимации без JS             | ViewTimeline / ScrollTimeline    |
| Сложные последовательности         | @keyframes + animation-delay     |
| Управление анимацией из JS         | Web Animations API               |
| Максимальная производительность    | transform + opacity + will-change|

**Главное правило 2025:**  
Никогда не анимировать width/height/margin/top/left — только `transform` и `opacity`.  
Scroll-driven animations и ViewTimeline — обязательны к знанию на middle+ позициях.