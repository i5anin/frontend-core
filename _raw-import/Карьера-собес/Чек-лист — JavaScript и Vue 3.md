---
tags:
  - карьера
  - vue
  - javascript
  - api
created: 2026-04-24
date: 2026-04-24
---
## JavaScript — что спрашивают почти всегда

**1. Область видимости и замыкания**

- `var` — function scope, `let/const` — block scope
    
- **Замыкание** — функция + лексическое окружение
    
- Используется для:
    
    - приватных данных
        
    - фабрик
        
    - debounce / throttle
        

```js
function counter() {
  let i = 0
  return () => ++i
}
```

---

**2. Event Loop**

- Call Stack
    
- Web APIs
    
- Microtasks (`Promise.then`, `queueMicrotask`)
    
- Macrotasks (`setTimeout`, `setInterval`)
    

**Порядок:**

1. Sync
    
2. Microtasks
    
3. One macrotask
    
4. Render
    

```js
console.log(1)
setTimeout(() => console.log(2))
Promise.resolve().then(() => console.log(3))
console.log(4)
// 1 4 3 2
```

---

**3. this**

- Определяется **в момент вызова**
    
- Arrow function **не имеет своего this**
    
- `bind` — фиксирует навсегда
    
- `call/apply` — одноразово
    

---

**4. Prototype / class**

- `class` — синтаксический сахар над prototype
    
- Методы — в `prototype`
    
- Свойства — в экземпляре
    

```js
class A {
  method() {}
}
```

---

**5. Асинхронность**

- `async/await` — синтаксис над Promise
    
- `try/catch` ловит **только await**
    
- `Promise.all` — падает целиком
    
- `Promise.allSettled` — всегда резолвится
    

---

**6. Иммутабельность**

- Не менять входные данные
    
- Spread ≠ deep copy
    
- Часто проверяют на примерах с массивами/объектами
    

---

## Vue 3 (Composition API)

**1. ref vs reactive**

- `ref` — примитивы и единичные значения
    
- `reactive` — объекты
    
- В шаблоне `.value` не нужен
    

```js
const count = ref(0)
const state = reactive({ user: null })
```

---

**2. reactivity system**

- Основан на `Proxy`
    
- Отслеживает **доступ к свойствам**
    
- Потеря реактивности:
    
    - деструктуризация без `toRefs`
        
    - замена объекта целиком вне `reactive`
        

---

**3. computed vs watch**

|computed|watch|
|---|---|
|кешируется|нет|
|без побочек|для побочек|
|зависит от reactive|следит за изменениями|

```js
const fullName = computed(() => first.value + last.value)
```

---

**4. watch тонкости**

- По умолчанию shallow
    
- Для объектов нужен `deep: true`
    
- Можно следить за функцией
    

```js
watch(() => route.params.id, load)
```

---

**5. Lifecycle (Vue 3)**

- `setup`
    
- `onMounted`
    
- `onUpdated`
    
- `onUnmounted`
    

**Важно:** в `setup` нет `this`

---

**6. Props / Emits**

- Props **readonly**
    
- Для изменения — emit событие
    
- `v-model` = `modelValue` + `update:modelValue`
    

---

**7. Slots**

- Default
    
- Named
    
- Scoped (передача данных вниз → вверх)
    

---

**8. Key в списках**

- **Никогда не index**
    
- Только стабильный id
    
- Иначе: баги рендера, сломанный state
    

---

**9. Performance**

- `computed` вместо методов
    
- `v-memo`
    
- `defineAsyncComponent`
    
- `keep-alive`
    
- правильные `key`
    

---

## Частые каверзные вопросы

- Почему `watch` срабатывает два раза?  
    → Strict mode / immediate / deep
    
- Почему компонент не обновился?  
    → потеря реактивности / мутация props
    
- Чем `shallowRef` отличается от `ref`?  
    → не трекает вложенные изменения
    
- Когда использовать `provide/inject`?  
    → dependency injection, не state management
    

---

## Архитектура (очень любят)

- Компонент — **только UI**
    
- Бизнес-логика — composables
    
- Работа с API — services
    
- State — Pinia
    
- Никакого API в template
    

---

## Мини-шпаргалка ответов

- Vue 3 быстрее → Proxy + tree-shaking
    
- Composition API → лучше масштабируется
    
- `setup` → точка входа логики
    
- `ref` → обертка над значением
    
- `reactive` → прокси объект
    



---

## Связанные

- [[Собеседования]]
- [[Frontend Developer (Vue 3, TypeScript)]]
- [[HR-специалист уровня C-level]]
- [[LeetCode youtube разбор задач]]
- [[вопросами по JavaScript для разработчиков]]
- [[вопросами по Vue.js для разработчиков]]
