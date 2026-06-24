---
tags:
  - веб-разработка
  - vue
  - javascript
  - npm
  - консоль
created: 2024-10-13
date: 2024-10-13
---
В [../Vue/Vue.js](#) **"views"** (представления) обычно относятся к страницам приложения. В контексте [SPA](./SPA) (Single Page Application) под "представлением" подразумевается отдельный компонент, который отображается в зависимости от маршрута (URL), и Vue Router управляет этими представлениями.

**Views** — это компоненты, которые отображаются в маршрутах и загружаются на основе текущего пути [URL](./URL). [Vue Router](./Vue Router), официальная библиотека маршрутизации для [../Vue/Vue.js](#), помогает управлять различными представлениями и переключаться между ними.

**Как это работает:**

1. **Vue Router** отвечает за отображение определенного представления ([view](#)) при изменении маршрута ([URL](./URL)).
2. Представления обычно размещаются в папке `views`, и каждый компонент в этой папке представляет собой отдельную страницу или раздел веб-приложения.
3. **Динамические представления** (views) могут загружаться на основе URL параметров.

**Основные концепции:**

1. **Компоненты представления (view components)** — это компоненты Vue, которые связываются с маршрутами ([URL](./URL)). Они могут содержать любые элементы, а также вызывать другие компоненты.

2. **Маршруты ([routes](./routes))** — это настройки Vue Router, которые указывают, какие компоненты должны отображаться на основе URL.

**Пример использования представлений (views) с Vue Router:**

**Установка Vue Router:**

Чтобы использовать Vue Router в проекте Vue.js, его нужно установить:

```bash
npm install vue-router
```

**Настройка Vue Router:**

Создаем маршруты и связываем их с представлениями (views):

1. В файле `main.js`:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Импортируем настроенный маршрутизатор

const app = createApp(App);

app.use(router);  // Используем Vue Router в приложении
app.mount('#app');
```

2. В файле `router/index.js`:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

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

3. В папке `views` создаем компоненты для представлений:

- **`views/Home.vue`**:

```vue
<template>
  <div>
    <h1>Главная страница</h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>
```

- **`views/About.vue`**:

```vue
<template>
  <div>
    <h1>О нас</h1>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>
```

4. В файле `App.vue` добавляем компонент `<router-view>`, который отвечает за отображение представлений на основе маршрутов.

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

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
```

**Как это работает:**

- **`<router-view>`** — это специальный компонент, предоставляемый Vue Router, который динамически загружает и отображает представления на основе текущего маршрута. Когда пользователь переходит по URL, связанный с маршрутом компонент отображается в этом месте.
  
- **`<router-link>`** — это компонент для создания ссылок, которые позволяют пользователю переключаться между маршрутами. Он работает аналогично [HTML](./HTML)-тегу `<a>`, но не перезагружает страницу.

**Пример динамических маршрутов:**

Vue Router также поддерживает **динамические маршруты**, которые позволяют создавать представления для динамических URL.

1. В файле `router/index.js`:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:id',  // Динамический параметр :id
    name: 'User',
    component: User
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

2. В компоненте `views/User.vue`:

```vue
<template>
  <div>
    <h1>Пользователь с ID: {{ userId }}</h1>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();  // Доступ к маршруту

    return {
      userId: route.params.id  // Получаем динамический параметр из маршрута
    };
  }
};
</script>
```

Здесь, когда пользователь переходит по адресу `/user/1`, компонент `User.vue` будет отображаться с выводом `Пользователь с ID: 1`.

**Итог:**

- **[views](./views) (представления)** в [../Vue/Vue.js](#) — это страницы или компоненты, которые отображаются на основе маршрутов.
- **[Vue Router](./Vue Router)** управляет маршрутизацией и отображает представления через компонент `<router-view>`.
- Представления обычно размещаются в папке `views`, и каждое представление связывается с маршрутом, определенным в конфигурации маршрутизатора.
- [Vue Router](./Vue Router) поддерживает как статические, так и динамические маршруты, что делает его мощным инструментом для управления навигацией в приложении.



---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
