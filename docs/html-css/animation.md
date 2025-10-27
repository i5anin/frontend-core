## Анимации

### Назначение

Анимации в интерфейсе не просто украшают — они объясняют **изменение состояния**, направляют внимание пользователя и создают ощущение плавности взаимодействия.
Хорошая анимация не мешает, а помогает — делает интерфейс «живым», но предсказуемым.

---

## Основы CSS-анимаций

### Переходы (Transitions)

Простая форма анимации между двумя состояниями элемента.

```css
.button {
  background: #409eff;
  transition: background 0.3s ease, transform 0.2s;
}
.button:hover {
  background: #66b1ff;
  transform: scale(1.05);
}
```

* `transition-property` — какие свойства анимируются;
* `transition-duration` — длительность;
* `transition-timing-function` — тип кривой (`ease`, `linear`, `ease-in-out`, `cubic-bezier()`);
* `transition-delay` — задержка перед началом.

---

### Ключевые кадры (Keyframes)

Используются для сложных последовательностей движения.

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal {
  animation: fadeInUp 0.4s ease-out;
}
```

* `animation-name` — имя набора кадров;
* `animation-duration` — длительность;
* `animation-iteration-count` — количество повторений (`infinite` для циклов);
* `animation-fill-mode: forwards` — сохраняет финальное состояние.

---

### Комбинирование

Можно совмещать несколько анимаций:

```css
.element {
  animation: fadeIn 0.5s ease, slideIn 0.5s ease;
}
```

---

## Псевдоклассы и состояния

Анимации часто применяются при изменении состояния элемента (`:hover`, `:focus`, `:active`) или при добавлении/удалении классов через JavaScript.

```js
element.classList.add('is-visible') // запускает CSS-анимацию
```

---

## Переходы во Vue 3

Vue предоставляет директиву `<transition>` для управления появлением и исчезновением элементов.

```vue
<template>
  <transition name="fade">
    <p v-if="visible">Привет, мир!</p>
  </transition>
  <button @click="visible = !visible">Toggle</button>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

* Vue автоматически добавляет классы:

    * `*-enter-from`, `*-enter-active`, `*-enter-to`
    * `*-leave-from`, `*-leave-active`, `*-leave-to`

---

## Переходы между маршрутами

```vue
<template>
  <transition name="slide" mode="out-in">
    <router-view />
  </transition>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
```

`mode="out-in"` гарантирует, что старая страница исчезнет до появления новой.

---

## Анимации списков

Vue поддерживает `<transition-group>` для элементов с `v-for`.

```vue
<transition-group name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</transition-group>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```

Ключ (`:key`) обязателен для отслеживания состояния элементов.

---

## Аппаратное ускорение

* Используй `transform` и `opacity` — GPU-ускоряемые свойства.
* Избегай анимации `width`, `height`, `top`, `left` — они вызывают перерасчёт layout.
* Для плавности — 60 FPS: время одного кадра ≤ 16.6 мс.

---

## Timing Functions (кривые ускорения)

Тип кривой сильно влияет на «характер» движения:

* `ease-in` — плавное начало;
* `ease-out` — мягкая остановка;
* `ease-in-out` — комбинация;
* `cubic-bezier(0.4, 0, 0.2, 1)` — стандартная Material Design кривая.

Пример визуального отличия:

```
ease-in       ускоряется постепенно  
ease-out      замедляется к концу  
linear        постоянная скорость  
```

---

## JS-анимации

Когда нужно управлять логикой динамически — используется JS-анимация.

### requestAnimationFrame

```js
function animate(el) {
  let start = null
  const duration = 500
  function step(ts) {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    el.style.opacity = progress
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
animate(document.querySelector('.box'))
```

### Библиотеки

* **GSAP (GreenSock)** — промышленный стандарт анимаций.
* **Anime.js** — простая и мощная API для JS-анимаций.
* **Motion One / Framer Motion** — декларативный синтаксис, поддержка Web Animations API.

Пример (GSAP):

```js
gsap.from('.card', { y: 40, opacity: 0, stagger: 0.1, duration: 0.5 })
```

---

## Web Animations API

Современный нативный API без CSS и сторонних библиотек.

```js
element.animate(
  [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }],
  { duration: 400, easing: 'ease-out', fill: 'forwards' }
)
```

---

## Перформанс и оптимизация

* Анимируй только **opacity** и **transform**.
* Группируй анимации с одинаковыми свойствами.
* Используй `will-change: transform;` для подготовки элемента к анимации.
* Не делай анимации длиннее 500–700 мс без необходимости.
* Дай пользователю контроль: `prefers-reduced-motion` для выключения.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0ms !important; transition-duration: 0ms !important; }
}
```

---

## Микроанимации

Небольшие реакции интерфейса на действия пользователя:

* Кнопка слегка подпрыгивает при нажатии.
* Tooltip плавно появляется.
* Иконка «сохраняется» с коротким вращением.

Микроанимации делают интерфейс **отзывчивым и понятным**, если не злоупотреблять.

---

## Чек-лист хорошей анимации

1. Есть смысл — поясняет действие, не отвлекает.
2. Единый стиль (скорость, кривая, длительность).
3. GPU-friendly свойства (`transform`, `opacity`).
4. Контролируется через системные предпочтения.
5. Возможен откат или прерывание без глюков.
6. Согласована с UX — не мешает навигации.

---

Анимация — это не украшение, а **язык интерфейса**, который помогает пользователю видеть, как система реагирует. Лучшие анимации — те, которые ощущаются естественно, а не замечаются.
