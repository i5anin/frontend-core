---
tags:
  - веб-разработка
  - vue
  - javascript
  - typescript
  - api
created: 2024-10-12
date: 2024-10-12
---
**Pinia** — это официальная библиотека для управления состоянием в [../Vue/Vue.js](#), которая является заменой для [vuex](#). Она проще в использовании, имеет более понятный [API](./API) и поддерживает работу с [../TypeScript/TypeScript](#) "из коробки". Pinia позволяет организовать централизованное хранение данных в приложении [../Vue/Vue.js](#).


**Пример использования Pinia**

1. **Создание магазина (store)**

```javascript
// stores/counter.js
import { defineStore } from 'pinia';

// Определение нового магазина (store)
export const useCounterStore = defineStore('counter', {
  // Состояние (state)
  state: () => ({
    count: 0
  }),

  // Геттеры (getters) — аналог вычисляемых свойств
  getters: {
    doubleCount: (state) => state.count * 2
  },

  // Действия (actions) — для изменения состояния
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});
```

Здесь мы создали простой магазин под названием `counter`, который содержит состояние `count`, геттер `doubleCount` для удвоенного значения `count`, и два действия `increment` и `decrement` для увеличения и уменьшения счётчика соответственно.

2. **Использование магазина в компонентах**

Теперь мы можем использовать этот магазин в компонентах [../Vue/Vue.js](#).

```vue
<template>
  <div>
    <h1>Счётчик: {{ count }}</h1>
    <h2>Удвоенный счётчик: {{ doubleCount }}</h2>
    <button @click="increment">Увеличить</button>
    <button @click="decrement">Уменьшить</button>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'; // Импортируем магазин

export default {
  setup() {
    const counterStore = useCounterStore(); // Инициализация магазина

    return {
      // Доступ к состоянию и действиям магазина
      count: counterStore.count,
      doubleCount: counterStore.doubleCount,
      increment: counterStore.increment,
      decrement: counterStore.decrement
    };
  }
};
</script>
```

**Что здесь происходит:**

1. В компоненте мы импортируем наш магазин `useCounterStore` и инициализируем его в функции `setup()`.
2. Мы получаем доступ к состоянию (`count`), геттеру (`doubleCount`) и действиям (`increment` и `decrement`) через созданный магазин.
3. Мы можем вызывать действия для изменения состояния и отображать значение состояния и геттеров в шаблоне.

**Расширенные возможности Pinia**

1. **Множественные магазины**

Вы можете создавать несколько магазинов для разделения логики. Например, можно создать отдельный магазин для пользователей, а другой для товаров.

```javascript
// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Анна',
    isLoggedIn: false
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    }
  }
});
```

2. **Поддержка модулей (для больших приложений)**

Pinia поддерживает модули, что позволяет делить логику на небольшие, легко управляемые магазины.

3. **Поддержка [../TypeScript/TypeScript](#)**

Pinia имеет встроенную поддержку TypeScript, что делает её отличным выбором для типовозависимых приложений.

**Итог:**

- **Pinia** — это современная библиотека для управления состоянием в Vue.js, которая заменяет Vuex.
- Она упрощает управление состоянием за счет интуитивного API и поддерживает основные концепции, такие как **state** (состояние), **getters** (геттеры) и **actions** (действия).
- Pinia интегрируется с Vue 3 и использует функциональные возможности `setup()`, что делает её очень гибкой и подходящей для современных Vue-приложений.

---
После установки нужно зарегистрировать Pinia в вашем Vue-приложении:

```javascript
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

// Создание экземпляра Pinia
const pinia = createPinia();

// Подключение Pinia к приложению
app.use(pinia);

app.mount('#app');
```


---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
