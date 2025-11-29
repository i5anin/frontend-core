Vue Router — официальный маршрутизатор для Vue-приложений. Управляет отображением страниц, навигацией, параметрами URL и историей браузера. Основан на принципе: **URL → компонент**.

**Создание маршрутизатора**

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/user/:id', component: () => import('@/pages/User.vue') }
  ]
})

export default router
```

**Подключение**

```js
createApp(App)
  .use(router)
  .mount('#app')
```

**Навигация**

Программная:

```js
router.push('/about')
router.push({ name: 'user', params: { id: 5 } })
```

Через шаблон:

```vue
<router-link to="/about">About</router-link>
<router-view />
```

`<router-view>` — точка отрисовки компонентов маршрутов.

**Динамические маршруты**

```js
{ path: '/product/:id', component: Product }
```

Получение параметров:

```js
import { useRoute } from 'vue-router'
const route = useRoute()
route.params.id
```

**Навигационные гарды**

Глобальные:

```js
router.beforeEach((to, from, next) => {
  if (!isAuth && to.meta.protected) return next('/login')
  next()
})
```

Локальные (в компоненте):

```js
beforeRouteLeave(to, from, next) { ... }
```

Используются для защиты маршрутов, загрузки данных, проверки прав.

**Lazy-loading страниц**

```js
{ 
  path: '/settings',
  component: () => import('@/pages/Settings.vue')
}
```

Уменьшает размер первоначального бандла.

**Работа с историей**

Режимы:

`createWebHistory()` — стандартный HTML5 History API.  
`createWebHashHistory()` — `#/` в URL (подходит для SPA на статическом хостинге).

**Meta-поля маршрутов**

```js
{
  path: '/admin',
  component: Admin,
  meta: { requiresAuth: true }
}
```

Используются для проверок прав, настроек интерфейса, заголовков страниц.

**Переходы между страницами**

Vue Router поддерживает анимации:

```vue
<transition name="fade">
  <router-view />
</transition>
```

**Scroll Behavior**

Контроль прокрутки:

```js
scrollBehavior(to, from, saved) {
  return saved || { top: 0 }
}
```

Позволяет восстанавливать позицию или управлять поведением при переходах.

**Глубокие особенности**

- Совместим с SSR (Nuxt использует расширенный роутинг).
    
- Поддерживает несколько `<router-view>` и nested routes.
    
- Удобно использовать вместе с Pinia и Provide/Inject.
    
- Корректно работает с history state и событийной моделью браузера.
    

Vue Router — критический элемент архитектуры Vue-приложений, обеспечивающий маршрутизацию, защиту, lazy-loading и навигационную инфраструктуру.