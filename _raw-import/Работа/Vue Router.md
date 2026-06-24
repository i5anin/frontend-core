---
tags:
  - веб-разработка
  - vue
  - javascript
  - npm
  - консоль
created: 2024-10-12
date: 2024-10-12
---
`Vue Router` — это официальный маршрутизатор для Vue.js, который позволяет создавать одностраничные приложения (SPA) с поддержкой динамической навигации между различными страницами (или компонентами), сохраняя при этом все преимущества Vue, такие как реактивность и компоненты. Он отвечает за управление переходами между различными представлениями в приложении без полной перезагрузки страницы.

**Основные особенности Vue Router:**
1. **Маршруты (routes):** Позволяют сопоставлять URL с компонентами. Вы можете задать, какой компонент должен быть загружен, когда пользователь посещает определенный маршрут.
2. **Динамические маршруты:** Поддержка динамических сегментов URL, например, `/user/:id`, где `id` — это переменная.
3. **Программная навигация:** Вы можете переходить между страницами программно с помощью методов, таких как `this.$router.push()`.
4. **Гвардии маршрутов (Navigation Guards):** Позволяют контролировать доступ к маршрутам. Вы можете выполнить код до или после перехода на другой маршрут.
5. **Вложенные маршруты:** Позволяют определять маршруты внутри маршрутов для создания многоуровневой навигации.
6. **Ленивая загрузка (Lazy Loading):** Вы можете загружать компоненты только при необходимости, что улучшает производительность приложения.

**Пример использования Vue Router:**

**Установка Vue Router:**
Если вы используете Vue CLI, Vue Router можно установить с помощью команды:

```bash
npm install vue-router
```

**Настройка маршрутов:**

Создайте файл `router/index.js`, где будут определены маршруты для приложения:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

**Подключение маршрутизатора к приложению:**

В `main.js` импортируйте и подключите Vue Router:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // импорт маршрутизатора

const app = createApp(App);

app.use(router);  // использование маршрутизатора
app.mount('#app');
```

**Использование маршрутов в `App.vue`:**

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/about">О нас</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
```

**Основные элементы:**
- **`<router-link>`** — используется для создания ссылок на маршруты (аналог стандартного HTML-тега `<a>`, но без перезагрузки страницы).
- **`<router-view>`** — это место, где будет отображаться соответствующий маршрут, то есть компонент, связанный с текущим URL.

**Программная навигация:**
Вы можете программно менять маршруты с помощью методов `$router.push()` и `$router.replace()`:

```javascript
this.$router.push({ name: 'Home' });
```

**Динамические маршруты:**

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'User',
    component: User
  }
];
```

В компоненте `User.vue` вы можете получить динамический параметр `id` через `$route.params.id`.

**Гвардии маршрутов:**

Вы можете использовать гвардии для защиты маршрутов:

```javascript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];
```

**Ленивая загрузка компонентов:**

Чтобы улучшить производительность приложения, вы можете загружать компоненты только тогда, когда они действительно нужны:

```javascript
const routes = [
  {
    path: '/about',
    component: () => import('../components/About.vue') // ленивая загрузка
  }
];
```

**Вывод:**
`Vue Router` предоставляет мощные возможности для создания одностраничных приложений с Vue.js, позволяя легко управлять переходами между страницами и обеспечивать гибкую маршрутизацию с динамическими сегментами, защитой маршрутов и ленивой загрузкой компонентов.

---

## Связанные

- [[Basics]]
- [[component]]
- [[Composition API]]
- [[destroyed]]
- [[mounted]]
- [[Options API]]
