## Vue 3

### Ключевые особенности

Vue 3 — это полностью переписанное ядро фреймворка с акцентом на производительность, масштабируемость и гибкость архитектуры.
Он основан на **реактивности через Proxy**, поддерживает **Composition API**, улучшенный **TypeScript**, **Teleport**, **Suspense**, **Fragments** и имеет на 50–60% меньший runtime по сравнению с Vue 2.

---

### Новая реактивная система

Vue 3 заменил старый механизм `Object.defineProperty` на **Proxy**, что дало:

* глубокое отслеживание вложенных структур без рекурсий;
* улучшенную производительность обновлений;
* поддержку наблюдения за добавлением/удалением свойств;
* возможность создавать кастомные реактивные системы.

```ts
import { reactive, effect } from 'vue'

const state = reactive({ count: 0 })
effect(() => console.log(state.count))
state.count++ // триггерит effect
```

---

### Composition API

Новый декларативный способ описания логики через функции:

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++

onMounted(() => console.log('mounted'))
</script>

<template>
  <button @click="increment">Count: {{ count }} / Double: {{ double }}</button>
</template>
```

Преимущества:

* композиция логики по смыслу, а не по опциям;
* повторное использование кода через `use*` функции;
* отличная типизация и тестируемость.

---

### Script Setup

Упрощённый синтаксис для компонентов:

* Автоматически обрабатывает `defineProps`, `defineEmits`, `defineExpose`.
* Не требует `export default`.
* Поддерживает top-level await.

```vue
<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

---

### Fragments и Teleport

* **Fragments** позволяют возвращать несколько корневых элементов из компонента.
* **Teleport** перемещает контент в любое место DOM, например, для модалок.

```vue
<template>
  <Teleport to="body">
    <div class="modal"><slot /></div>
  </Teleport>
</template>
```

---

### Suspense

Поддержка асинхронных компонентов и загрузочных состояний:

```vue
<Suspense>
  <template #default>
    <UserProfile />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

```ts
export default {
  async setup() {
    const user = await fetchUser()
    return { user }
  },
}
```

---

### Оптимизация рендера

* Компилятор генерирует **оптимизированные шаблоны**, помечая динамические узлы.
* Используется **block tree tracking** — Vue обновляет только изменившиеся части.
* Поддерживается **hoisting** (вынесение неизменных узлов за рендер-функцию).
* **Patch flags** позволяют быстро определять, какие элементы нужно обновить.

Результат — в 2–3 раза меньше лишних перерендеров по сравнению с Vue 2.

---

### Реактивные утилиты

Vue 3 предоставляет набор низкоуровневых API:

* `ref`, `reactive`, `computed`, `readonly`, `shallowRef`, `shallowReactive`;
* `toRef`, `toRefs`, `unref`, `isRef`;
* `watch`, `watchEffect`, `effectScope`;
* `customRef` — создание своих реактивных свойств.

```ts
import { customRef } from 'vue'

function useDebouncedRef(value: string, delay = 300) {
  let timeout: number
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    },
  }))
}
```

---

### Provide / Inject

Нативная поддержка внедрения зависимостей:

```ts
// Provider
import { provide } from 'vue'
provide('theme', 'dark')

// Consumer
import { inject } from 'vue'
const theme = inject('theme', 'light')
```

Типизация через `InjectionKey`:

```ts
const ThemeKey: InjectionKey<string> = Symbol()
provide(ThemeKey, 'dark')
const theme = inject(ThemeKey)!
```

---

### Telemetry и DevTools

Vue 3 имеет новый DevTools с:

* инспекцией реактивных данных;
* анализом производительности;
* трекингом эффектов и перерендеров;
* профилированием Composition API хуков.

---

### Встроенная поддержка TypeScript

* Полная типизация всех API (включая JSX/TSX).
* Автокомплит для props, emits и slots.
* Проверка типов через `vue-tsc`.

```bash
pnpm add -D vue-tsc
pnpm vue-tsc --noEmit
```

---

### Новые возможности шаблонов

* Директивы теперь поддерживают аргументы и модификаторы через выражения.
* Можно использовать `<script setup>` совместно с `<template>` и `<style scoped>`.
* Внутренне используется улучшенный компилятор шаблонов с поддержкой tree-shaking.

```vue
<template>
  <input v-model.trim="email" placeholder="email" />
</template>
```

---

### Компонентная модель

* Компоненты — функции, возвращающие Virtual DOM или шаблон.
* Поддерживаются функциональные и асинхронные компоненты:

```ts
const AsyncComponent = defineAsyncComponent(() => import('./HeavyChart.vue'))
```

* Новая функция `defineExpose` позволяет явно экспортировать публичный API:

```vue
<script setup>
const open = () => {}
defineExpose({ open })
</script>
```

---

### Улучшения производительности

* Быстрая инициализация за счёт **tree-shaking runtime**.
* Lazy-hydration в SSR.
* Сжатие runtime с помощью **proxy-based dependency tracking**.
* Уменьшено количество микротасков при обновлении реактивности.
* VDOM стал на 40% эффективнее при diff-процессе.

---

### Архитектура и расширяемость

Vue 3 теперь состоит из модулей:

* **@vue/reactivity** — ядро реактивности;
* **@vue/runtime-dom** — работа с DOM;
* **@vue/runtime-core** — Virtual DOM и компонентная система;
* **@vue/compiler-sfc** — компилятор `.vue` файлов.

Это делает возможным сборку кастомных рантаймов, например для WebGL или SSR.

---

### Интеграция с экосистемой

* **Pinia** — новый официальный стор, полностью на Composition API.
* **Vue Router 5** — TypeScript-first маршрутизация.
* **VueUse** — набор готовых composables.
* **Vite** — нативная сборка Vue 3 приложений.

---

### Принципы построения Vue 3-приложений

* Минимизируй глобальное состояние, всё через composables или Pinia.
* Используй `<script setup>` как основной синтаксис.
* Логику и данные разделяй — композиции чистые, без UI.
* Компоненты короткие и однофункциональные.
* Предпочитай декларативность: реактивные вычисления вместо ручных подписок.
* Следи за `watch` — избегай побочек, где можно обойтись `computed`.

---

### Чек-лист для продакшена

1. Включить `defineExpose()` только при необходимости.
2. Проверить `unref` и `watchEffect` на утечки.
3. Использовать `readonly()` для неизменяемых данных.
4. Минимизировать количество реактивных источников.
5. Добавить DevTools performance mark для профилирования.
6. Использовать `Suspense` и lazy-загрузку для тяжелых компонентов.
7. Проверить, что `emits` и `props` типизированы.

---

Vue 3 — это современная, модульная и реактивная экосистема, где композиция логики и строгая типизация стали стандартом.
Он сочетает декларативность Vue 2 с гибкостью функциональных подходов, превращая фреймворк в основу для крупных, масштабируемых приложений.
