---
tags:
  - карьера
  - vue
  - css
  - javascript
  - api
created: 2026-05-18
date: 2026-05-18
---
# 🟩 Vue — карточки для Quizlet

> Цель: 200 карточек по Vue 3, Composition API, Pinia, Vue Router.

---

## 📦 Базовый набор (20 карточек)

```
Vue.js---Прогрессивный фреймворк для создания пользовательских интерфейсов с реактивной системой;
Composition API---Способ организации логики компонента через функции setup, ref и reactive вместо options-объекта;
Options API---Классический способ описания компонента через объект с полями data, methods, computed, watch;
ref---Функция Composition API, создающая реактивную ссылку на примитивное или объектное значение через свойство .value;
reactive---Функция Composition API, создающая реактивный proxy-объект, не требующий обращения через .value;
computed---Реактивное вычисляемое свойство, кэширующее результат до изменения зависимостей;
watch---Функция отслеживания изменений реактивного значения с возможностью получения старого и нового значений;
watchEffect---Функция, автоматически отслеживающая используемые реактивные зависимости и реагирующая на их изменения;
defineProps---Макрос Composition API, объявляющий props компонента в setup-скрипте;
defineEmits---Макрос Composition API, объявляющий события, которые компонент может эмитить наружу;
v-model---Двусторонняя привязка данных между формой и состоянием компонента, синтаксический сахар над :value и @input;
v-if---Директива условного рендеринга, удаляющая или вставляющая элемент в DOM;
v-show---Директива условного отображения, переключающая CSS-свойство display;
v-for---Директива рендеринга списка по массиву или объекту с обязательным ключом key;
provide / inject---Механизм передачи данных от предка к любым потомкам без props-drilling;
slot---Механизм передачи разметки от родителя в дочерний компонент в указанное место шаблона;
Teleport---Встроенный компонент, переносящий содержимое в указанное место DOM-дерева вне родителя;
Suspense---Встроенный компонент для отображения fallback-контента пока асинхронный компонент загружается;
Pinia---Официальная библиотека управления состоянием Vue 3, заменяющая Vuex, поддерживающая TypeScript;
Vue Router---Официальный маршрутизатор Vue, обеспечивающий SPA-навигацию через history API.
```

---

## 📋 Планы для расширения

- [ ] Lifecycle hooks (onMounted, onUnmounted, ...)
- [ ] toRef, toRefs
- [ ] shallowRef, shallowReactive
- [ ] readonly, isRef, unref
- [ ] customRef
- [ ] effectScope
- [ ] markRaw
- [ ] async components (defineAsyncComponent)
- [ ] KeepAlive
- [ ] Transition / TransitionGroup
- [ ] v-on modifiers (.stop, .prevent, .self)
- [ ] v-bind modifiers
- [ ] dynamic components (`<component :is>`)
- [ ] scoped CSS
- [ ] CSS modules в SFC
- [ ] CSS v-bind
- [ ] Pinia getters, actions
- [ ] Pinia stores composition
- [ ] navigation guards
- [ ] route meta

---

## 🔗 Связанные

- [🟨 JavaScript — карточки](./JavaScript — карточки.md)
- [📘 TypeScript — карточки](./TypeScript — карточки.md)


---

## Связанные

- [[Карточки Quizlet]]
- [[JavaScript — карточки]]
- [[TypeScript — карточки]]
- [[Метод заучивания]]
- [[Формат импорта]]
