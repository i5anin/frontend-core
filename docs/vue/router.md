# Router

### Общая концепция

**Vue Router 5** — официальный маршрутизатор для Vue 3. Он управляет навигацией между страницами, синхронизирует состояние приложения с адресной строкой и поддерживает разные режимы работы: **history**, **hash** и **memory**.
Router реализует декларативную модель: маршруты описываются как дерево конфигураций, а переходы выполняются программно или через `<router-link>`.

---

### Установка

```bash
pnpm add vue-router
```

---

### Базовая настройка

`src/router/index.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
```

Подключение в приложении:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')
```

---

### Типы истории

* **createWebHistory()** — стандартный HTML5 History API (рекомендуется).
* **createWebHashHistory()** — с `#` в адресе, подходит для SPA без серверной настройки.
* **createMemoryHistory()** — для SSR и тестирования.

---

### Навигация

**Декларативно:**

```vue
<router-link to="/about">О проекте</router-link>
```

**Программно:**

```ts
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/profile')
```

Навигация с параметрами:

```ts
router.push({ name: 'user', params: { id: 42 } })
router.replace({ query: { sort: 'date' } })
```

---

### Параметры и динамические маршруты

```ts
{ path: '/user/:id', name: 'user', component: UserView, props: true }
```

Компонент получает параметр:

```ts
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)
</script>
```

---

### Вложенные маршруты

```ts
{
  path: '/dashboard',
  component: DashboardLayout,
  children: [
    { path: '', component: DashboardHome },
    { path: 'settings', component: DashboardSettings },
  ],
}
```

В шаблоне:

```vue
<template>
  <router-view /> <!-- Внутренний маршрут -->
</template>
```

---

### Ленивые маршруты

```ts
{ path: '/profile', component: () => import('@/pages/ProfileView.vue') }
```

Vite автоматически создаёт чанки и подгружает страницу по требованию.

---

### Навигационные хуки

#### Глобальные

```ts
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) next('/login')
  else next()
})
```

#### Локальные (в компоненте)

```ts
<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteLeave(() => {
  console.log('Покидаем страницу')
})

onBeforeRouteUpdate((to, from) => {
  console.log('Маршрут обновился:', to.params)
})
</script>
```

---

### Props в маршрутах

Передача параметров как props:

```ts
{ path: '/user/:id', component: UserView, props: true }
```

Vue передаст `id` в компонент как обычное свойство, без обращения к `useRoute()`.

---

### Meta-поля маршрутов

```ts
{ path: '/admin', component: Admin, meta: { requiresAuth: true, layout: 'admin' } }
```

Использование:

```ts
router.beforeEach((to) => {
  document.title = to.meta.title || 'My App'
})
```

---

### Scroll Behavior

Функция, управляющая позиционированием после перехода:

```ts
scrollBehavior(to, from, savedPosition) {
  return savedPosition || { top: 0 }
}
```

---

### Redirect и Alias

```ts
{ path: '/home', redirect: '/' }
{ path: '/old-path', alias: '/new-path', component: OldPage }
```

---

### Работа с query-параметрами

```ts
router.push({ path: '/search', query: { q: 'vue', page: 2 } })
console.log(route.query.q)
```

---

### Transitions между маршрутами

```vue
<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

---

### Защита маршрутов

Часто используется middleware-подход:

```ts
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else next()
})
```

---

### Error и 404 маршруты

```ts
{ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
```

---

### SSR и Router

В SSR используется `createMemoryHistory()` и синхронное разрешение маршрутов до рендера:

```ts
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
await router.push(url)
await router.isReady()
```

---

### Router в Composition API

```ts
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
router.push({ name: 'dashboard' })
console.log(route.fullPath)
```

---

### Best Practices

* Разделяй маршруты по доменам (`/auth`, `/admin`, `/dashboard`).
* Используй **ленивую загрузку** для всех крупных страниц.
* Не храни бизнес-логику в `beforeEach` — только проверки доступа и метаданные.
* Для SEO и SSR — динамически обновляй `meta` и `title`.
* Предусматривай `404` и fallback-маршрут.
* Вложенные маршруты — только при реальной вложенности интерфейса.

---

### Чек-лист настройки Router

1. Определены основные маршруты и fallback.
2. Включён `history`-режим.
3. Используется ленивый импорт страниц.
4. Настроено `scrollBehavior`.
5. Работает защита маршрутов (auth guard).
6. Тестированы переходы через `<router-link>` и программно.
7. 404 и редиректы настроены корректно.

---

Vue Router 5 — это модульная система навигации, тесно интегрированная с Composition API, обеспечивающая типобезопасную, масштабируемую и реактивную маршрутизацию для современных Vue 3-приложений.
