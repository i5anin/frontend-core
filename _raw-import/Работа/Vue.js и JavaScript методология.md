---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
  - state-management
created: 2024-10-01
date: 2024-10-01
---
## Vue.js и JavaScript: Современные стандарты 2024 и методология "Чистый код" Роберта Мартина

**Основные принципы именования файлов и директорий в [Vue.js](./Basics — Vue.js)**

1. **Понятность и очевидность**: Имена файлов и директорий должны быть понятными и очевидными. Они должны отражать суть содержимого.
2. **Краткость**: Имена должны быть максимально короткими, но при этом не терять смысл.
3. **Использование существительных для директорий**: Директории должны называться существительными, отражающими их содержимое.
4. **Использование глаголов для действий**: Файлы, содержащие действия (например, компоненты), должны называться глаголами или содержать глаголы в названии.
5. **Использование [CamelCase](./CamelCase) для компонентов**: Компоненты должны называться в [CamelCase](./CamelCase), начиная с заглавной буквы.
6. **Использование kebab-case для файлов**: Файлы должны называться в [kebab-case](./kebab-case).
7. **Использование единственного числа**: Имена директорий и файлов должны быть в единственном числе, если это возможно.

**Примеры именования файлов и директорий в [Vue.js](./Basics — Vue.js)**

**Директории**

- **src/components**: Содержит компоненты приложения.
- **src/views**: Содержит страницы приложения.
- **src/store**: Содержит [vuex](#) хранилище.
- **src/router**: Содержит маршрутизацию приложения.
- **src/services**: Содержит сервисы для работы с API.
- **src/utils**: Содержит вспомогательные функции.

**Файлы**

- **src/components/UserList.vue**: Компонент для отображения списка пользователей.
- **src/views/UserView.vue**: Страница для отображения информации о пользователе.
- **src/store/modules/user.js**: Модуль Vuex для управления состоянием пользователей.
- **src/router/index.js**: Файл маршрутизации.
- **src/services/userService.js**: Сервис для работы с API пользователей.
- **src/utils/dateUtils.js**: Вспомогательные функции для работы с датами.

**Примеры кода**

**Компонент (src/components/UserList.vue)**

```html
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id" @click="selectUser(user)">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectUser(user) {
      this.$emit('user-selected', user);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
```

**Страница (src/views/UserView.vue)**

```html
<template>
  <div>
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['user']),
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

p {
  font-size: 16px;
}
</style>
```

**Vuex Модуль (src/store/modules/user.js)**

```javascript
import userService from '../../services/userService';

const state = {
  user: null,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async fetchUser({ commit }, userId) {
    const user = await userService.getUser(userId);
    commit('SET_USER', user);
  },
};

const getters = {
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
```

**Маршрутизация (src/router/index.js)**

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import UserView from '../views/UserView.vue';

const routes = [
  {
    path: '/user/:id',
    name: 'UserView',
    component: UserView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

**Сервис (src/services/userService.js)**

```javascript
import axios from 'axios';

const API_URL = 'https://api.example.com/users';

const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export default {
  getUser,
};
```

**Вспомогательные функции (src/utils/dateUtils.js)**

```javascript
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default {
  formatDate,
};
```

**Заключение**

Следуя этим принципам, вы сможете создавать чистый, понятный и легко поддерживаемый код в [Vue.js](./Basics — Vue.js) и [JavaScript](./JavaScript), который будет соответствовать современным стандартам и методологии "Чистый код" Роберта Мартина.

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
