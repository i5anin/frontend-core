# Store

### Концепция

**Pinia** — официальный store-менеджер для Vue 3, пришедший на смену Vuex.
Он основан на **Composition API**, полностью типизирован, модульный и реактивный.
Pinia делает управление состоянием простым, декларативным и предсказуемым, не требуя шаблонного кода и мутаций.

---

### Установка

```bash
pnpm add pinia
```

Подключение в приложении:

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

---

### Создание стора

```ts
// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    isAuthenticated: false,
  }),

  getters: {
    userInfo: (state) => `${state.name} <${state.email}>`,
  },

  actions: {
    login(name: string, email: string) {
      this.name = name
      this.email = email
      this.isAuthenticated = true
    },
    logout() {
      this.$reset()
    },
  },
})
```

Использование в компоненте:

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const user = useUserStore()
</script>

<template>
  <div v-if="user.isAuthenticated">
    Привет, {{ user.name }}!
  </div>
  <button @click="user.logout">Выйти</button>
</template>
```

---

### Реактивность и связь с компонентами

* Все поля стора реактивны, как `ref()` и `computed()`.
* В шаблонах изменения отслеживаются автоматически.
* Состояние можно деструктурировать через `storeToRefs()` для реактивности.

```ts
import { storeToRefs } from 'pinia'
const { name, email } = storeToRefs(useUserStore())
```

---

### Getters

Аналог `computed`, но в контексте стора:

```ts
getters: {
  isAdmin: (state) => state.email.endsWith('@admin.com'),
  upperName() {
    return this.name.toUpperCase()
  },
}
```

---

### Actions

Методы для изменения состояния и выполнения асинхронных операций:

```ts
actions: {
  async fetchProfile() {
    const res = await fetch('/api/profile')
    Object.assign(this, await res.json())
  },
}
```

Actions можно вызывать напрямую, нет мутаций или коммитов, как в Vuex.

---

### Модульная структура

Каждый store изолирован, но может использовать другие:

```ts
// src/stores/cart.ts
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as string[] }),
  actions: {
    checkout() {
      const user = useUserStore()
      if (!user.isAuthenticated) throw new Error('Необходимо войти')
      console.log(`Оформление заказа для ${user.name}`)
    },
  },
})
```

---

### Подписки на изменения

```ts
const store = useUserStore()

store.$subscribe((mutation, state) => {
  console.log('Изменение:', mutation, state)
})
```

Также можно слушать действия:

```ts
store.$onAction(({ name, after, onError }) => {
  console.log(`Action: ${name}`)
  after(() => console.log(`✅ ${name} завершено`))
  onError((err) => console.error(`❌ ${name} ошибка:`, err))
})
```

---

### Сброс состояния

```ts
store.$reset()
```

или вручную:

```ts
Object.assign(store, { name: '', email: '', isAuthenticated: false })
```

---

### Persist (сохранение состояния)

Для сохранения состояния между сессиями:

```bash
pnpm add pinia-plugin-persistedstate
```

```ts
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

В сторе:

```ts
export const useThemeStore = defineStore('theme', {
  state: () => ({ dark: false }),
  persist: true,
})
```

---

### SSR и Hydration

Pinia поддерживает изоморфное использование:

```ts
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  return { app, pinia }
}
```

При гидратации:

```ts
pinia.state.value = window.__INITIAL_STATE__
```

---

### Отладка и DevTools

Pinia интегрируется с Vue DevTools:

* просмотр состояния и геттеров в реальном времени;
* отслеживание действий и их результатов;
* экспорт/импорт стора для дебага.

---

### Лучшие практики

* Один store — одна доменная сущность (`user`, `cart`, `settings`).
* Не создавай монолитный store с несвязанными полями.
* Храни только **источник истины**, derived данные вычисляй через getters.
* Избегай циклических зависимостей между сторами.
* Асинхронные операции — внутри actions, не в компонентах.
* Никогда не изменяй состояние стора вне его actions.

---

### Пример сложного стора

```ts
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as { id: number; text: string; done: boolean }[],
    filter: 'all' as 'all' | 'done' | 'active',
  }),
  getters: {
    filtered: (state) =>
      state.filter === 'done'
        ? state.todos.filter((t) => t.done)
        : state.filter === 'active'
        ? state.todos.filter((t) => !t.done)
        : state.todos,
  },
  actions: {
    add(text: string) {
      this.todos.push({ id: Date.now(), text, done: false })
    },
    toggle(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
    },
    remove(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
  },
})
```

---

### Чек-лист стора

1. Все изменения состояния происходят через actions.
2. Данные типизированы и документированы.
3. Derived значения реализованы через getters.
4. Используется `storeToRefs()` при деструктурировании.
5. Нет прямых мутаций в компонентах.
6. Состояние может быть восстановлено (`$reset` или persist).
7. При SSR — state сериализуется и гидратируется корректно.

---

Pinia — лёгкий, реактивный и типобезопасный store, идеально сочетающийся с Composition API и архитектурой Vue 3.
Он упрощает управление состоянием, избавляет от шаблонного кода Vuex и делает структуру данных чистой и предсказуемой.
