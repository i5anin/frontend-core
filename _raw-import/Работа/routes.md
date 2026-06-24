---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
created: 2024-10-23
date: 2024-10-23
---
**Маршруты (routes)** в **Vue Router** — это способ определения путей (URL), которые связаны с компонентами Vue. Когда пользователь посещает определённый URL, соответствующий компонент отображается в представлении.

**Основные концепции Vue Router:**

1. **Определение маршрутов** — каждый маршрут указывает на определённый компонент.
2. **Переход между страницами** — Vue Router позволяет легко переходить между страницами, не перезагружая приложение.
3. **Динамические маршруты** — маршруты могут содержать переменные части (параметры), которые передаются в компоненты.
4. **Маршрутизация с именованными маршрутами** — маршруты могут иметь имена, чтобы облегчить их использование.

**Пример базовой конфигурации маршрутов:**

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'

const routes = [
  { path: '/', component: HomePage },  // Маршрут для главной страницы
  { path: '/about', component: AboutPage }  // Маршрут для страницы "О нас"
]

const router = createRouter({
  history: createWebHistory(),
  routes  // используем определённые выше маршруты
})

export default router
```

**Использование маршрутов:**
После того как маршруты определены, их нужно подключить в приложение. Это делается через компонент `<router-view>`, который отвечает за отображение компонентов на основе текущего маршрута.

```html
<template>
  <div id="app">
    <router-link to="/">Главная</router-link>
    <router-link to="/about">О нас</router-link>
    
    <!-- Здесь будет рендериться компонент, соответствующий текущему маршруту -->
    <router-view></router-view>
  </div>
</template>
```

**Динамические маршруты:**
Vue Router поддерживает динамические сегменты маршрутов, которые можно использовать для отображения компонентов с разными параметрами.

```javascript
const routes = [
  { path: '/user/:id', component: UserProfile }  // Динамический параметр `id`
]
```

Теперь при посещении `/user/123` в компоненте `UserProfile` будет доступен параметр `id` со значением `123`. Доступ к параметрам можно получить через объект `$route.params`:

```javascript
export default {
  created() {
    console.log(this.$route.params.id)  // Выведет 123
  }
}
```

**Именованные маршруты:**
Каждому маршруту можно присвоить имя для удобства навигации:

```javascript
const routes = [
  { path: '/user/:id', component: UserProfile, name: 'user' }
]
```

Теперь можно использовать этот маршрут по имени:

```html
<router-link :to="{ name: 'user', params: { id: 123 }}">Профиль пользователя</router-link>
```

**Навигация программно:**
Vue Router позволяет осуществлять переходы программно с помощью метода `this.$router.push()`:

```javascript
this.$router.push({ name: 'user', params: { id: 123 } })
```

**Пример сложной конфигурации с дочерними маршрутами:**
Vue Router также поддерживает вложенные (дочерние) маршруты:

```javascript
const routes = [
  {
    path: '/user/:id',
    component: UserProfile,
    children: [
      {
        path: 'settings',
        component: UserSettings
      }
    ]
  }
]
```

Теперь при переходе по адресу `/user/123/settings`, компонент `UserSettings` будет отрендерен внутри `UserProfile`.

**Заключение:**
Vue Router — это мощный инструмент для маршрутизации в приложениях на Vue.js. С его помощью можно легко управлять навигацией, динамическими маршрутами и реализовать сложные системы маршрутизации с дочерними маршрутами и программной навигацией.

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
