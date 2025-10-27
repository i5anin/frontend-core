## Composition API

### Концепция

**Composition API** — это декларативный способ организации логики во Vue 3, основанный на функциях и реактивности, а не на конфигурации (`data`, `methods`, `computed`).
Главная идея — **композиция** логики по смыслу, а не по типу данных. Вместо громоздких компонентов с множеством опций создаются **композиционные функции** (`use*`), которые можно переиспользовать между компонентами.

### Основные элементы

* **`ref()`** — создаёт реактивное значение-примитив.
* **`reactive()`** — создаёт реактивный объект.
* **`computed()`** — вычисляемое свойство, автоматически обновляется при изменении зависимостей.
* **`watch()` / `watchEffect()`** — наблюдение за изменениями данных.
* **`onMounted()`, `onUnmounted()`** — жизненные циклы компонента.
* **`provide()` / `inject()`** — внедрение зависимостей между уровнями компонентов.
* **`toRefs()` / `toRef()`** — преобразует свойства реактивного объекта в отдельные `ref`.
* **`readonly()`** — делает состояние неизменяемым.

### Пример базового компонента

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}

onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <button @click="increment">Count: {{ count }} / Double: {{ double }}</button>
</template>
```

### Реактивность

Vue использует **прокси-обёртки** (`Proxy`) для отслеживания изменений в объектах и вычисления зависимостей.

* Все свойства внутри `reactive()` отслеживаются глубоко.
* Для примитивов — только `ref()`.
* `computed()` автоматически кеширует результаты.
* Внутренне Vue реализует систему **dependency tracking** и **effect scheduling**, минимизируя лишние перерендеры.

```ts
const state = reactive({ items: [1, 2, 3] })
watch(() => state.items.length, (len) => console.log('Length:', len))
state.items.push(4) // триггерит watch
```

### Композиционные функции (Composable)

Композиционные функции — основа повторного использования логики. Они инкапсулируют состояние и методы и возвращают публичный API.

```ts
// useFetch.ts
import { ref, onMounted } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const run = async () => {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  onMounted(run)
  return { data, error, loading, run }
}
```

Использование:

```vue
<script setup lang="ts">
import { useFetch } from '@/shared/composables/useFetch'

const { data, loading, error } = useFetch('https://api.example.com/users')
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="user in data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

### Provide / Inject

Позволяет передавать состояние и зависимости по дереву компонентов без пропсов.

```ts
// provider
import { provide } from 'vue'
const theme = ref('dark')
provide('theme', theme)

// child
import { inject } from 'vue'
const theme = inject('theme', ref('light'))
```

Можно типизировать через `InjectionKey`:

```ts
import { InjectionKey } from 'vue'
export const ThemeKey: InjectionKey<Ref<string>> = Symbol('Theme')
provide(ThemeKey, theme)
const theme = inject(ThemeKey)!
```

### Watch и WatchEffect

* `watch(source, callback)` отслеживает конкретное значение.
* `watchEffect()` отслеживает всё, что используется внутри функции.
* В `watch` можно контролировать момент срабатывания (`immediate`, `deep`).

```ts
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} → ${newVal}`)
})
```

### Работа с props и emits

В `<script setup>` объявляются через `defineProps` и `defineEmits`:

```vue
<script setup lang="ts">
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ (e: 'loaded', data: any): void }>()
</script>
```

### Реиспользование состояния (реактивные модули)

Для сложной логики — выделяй состояние в отдельные слои (`useUserStore`, `useCart`, `useTheme`), чтобы делить ответственность и улучшать тестируемость.

```ts
// useTheme.ts
export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')
  const toggle = () => (theme.value = theme.value === 'light' ? 'dark' : 'light')
  return { theme, toggle }
}
```

### Асинхронность и Suspense

Vue 3 поддерживает `Suspense` для асинхронных компонентов.

```vue
<Suspense>
  <template #default>
    <UserProfile />
  </template>
  <template #fallback>
    <div>Loading user...</div>
  </template>
</Suspense>
```

Компонент `UserProfile` может возвращать промис или использовать `async setup()`:

```ts
export default {
  async setup() {
    const data = await fetchUser()
    return { data }
  },
}
```

### Компоненты-рендереры

Composition API позволяет использовать **Render Function** и **JSX** для более гибких UI-паттернов:

```ts
import { h, ref } from 'vue'
export default {
  setup() {
    const visible = ref(true)
    return () =>
      visible.value
        ? h('button', { onClick: () => (visible.value = false) }, 'Hide me')
        : null
  },
}
```

### Жизненные циклы

Composition API предоставляет хуки, аналогичные Options API:

| Hook              | Аналог          | Когда вызывается      |
| ----------------- | --------------- | --------------------- |
| `onMounted`       | `mounted`       | после монтирования    |
| `onUpdated`       | `updated`       | после обновления DOM  |
| `onUnmounted`     | `beforeDestroy` | при удалении          |
| `onBeforeMount`   | `beforeMount`   | перед монтированием   |
| `onErrorCaptured` | `errorCaptured` | при ошибке в потомках |

### Типизация и лучшие практики

* Всегда указывай типы пропсов, возвращаемых значений и эмитов.
* Избегай глобальных `ref`, всё состояние должно жить в композициях или сторе.
* Делай композиции **чистыми** — без обращения к DOM напрямую.
* Разделяй **эффекты** и **данные**: `watchEffect` только для побочных действий.
* Старайся, чтобы каждая композиция решала одну задачу.

### Преимущества

* Повторное использование логики без mixins.
* Простая типизация с TypeScript.
* Явная структура данных и эффектов.
* Легкая тестируемость и независимость от Vue-интерфейсов.
* Оптимизированное дерево зависимостей при рендере.

### Архитектурное применение

* Состояние домена → через `useEntity()`.
* Фичи и действия → `useFeature()`.
* Общие утилиты → `useUtils()`.
* Сервисы и API → `useApi()`.

Composition API — это не просто синтаксическое обновление Vue, а архитектурный инструмент для построения гибких, модульных и тестируемых приложений.
