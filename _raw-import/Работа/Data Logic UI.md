---
tags:
  - веб-разработка
  - vue
  - javascript
  - npm
  - api
created: 2025-04-06
date: 2025-04-06
---
Вот технически корректное и современное (2025) объяснение подхода к **разделению на Data / Logic / UI**, адаптированное под **Vue 3 с Composition API** и соблюдением принципов **чистого кода**, **KISS/DRY** и **масштабируемости**.

---

## 📌 Обоснование и план

**Зачем делить?**

Разделение на **Data / Logic / UI** повышает:

- читаемость кода;
    
- повторное использование логики;
    
- тестируемость и сопровождаемость;
    
- соответствие принципу **Single Responsibility**.
    

---

## 🧱 Структура проекта (Vue 3 + Composition API)

```
src/
├── entities/                 # бизнес-сущности (например, user, product)
│   └── user/
│       ├── model/            # data: типы, API-интерфейсы, schema, factories
│       ├── logic/            # logic: use-cases, hooks (composables)
│       └── ui/               # ui: компоненты, layout, widgets
│
├── shared/                   # общие utils, библиотеки, стили
│   └── ui/                   # общие UI-компоненты (Button, Modal и т.д.)
│
└── pages/                    # страницы (page-level layout + logic + widgets)
```

---

## ⚙️ Установка зависимостей

```bash
npm install axios zod
```

---

## 🧩 Реализация (пример на user)

**1. **Data** – `entities/user/model/index.js`**

```js
// ✅ user schema, типизация, factories

import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export const createUser = (overrides = {}) => ({
  id: 0,
  name: '',
  email: '',
  ...overrides
})
```

---

**2. **Logic** – `entities/user/logic/useUsers.js`**

```js
// 📌 use-case логика, работа с API, обработка состояния

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { userSchema } from '../model'

export function useUsers() {
  const users = ref([])
  const isLoading = ref(false)

  const fetchUsers = async () => {
    isLoading.value = true
    try {
      const { data } = await axios.get('/api/users')
      const parsed = userSchema.array().parse(data)
      users.value = parsed
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchUsers)

  return { users, isLoading, fetchUsers }
}
```

---

**3. **UI** – `entities/user/ui/UserList.vue`**

```vue
<template>
  <div v-if="isLoading">Загрузка...</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.name }} — {{ user.email }}
    </li>
  </ul>
</template>

<script setup>
import { useUsers } from '@/entities/user/logic/useUsers'

const { users, isLoading } = useUsers()
</script>
```

---

## ▶️ Пример использования

В файле `pages/users/index.vue`:

```vue
<template>
  <section>
    <h1>Пользователи</h1>
    <UserList />
  </section>
</template>

<script setup>
import UserList from '@/entities/user/ui/UserList.vue'
</script>
```

---

## ✅ Вывод

Разделение на **data / logic / ui**:

- Обеспечивает модульность и масштабируемость.
    
- Позволяет команде параллельно работать над бизнес-логикой, дизайном и интеграцией API.
    
- Упрощает поддержку и повторное использование компонентов и логики.
    

Можем адаптировать эту архитектуру под **Feature-Sliced Design**, если тебе потребуется более крупная и гибкая система. Хочешь?

---

## Связанные

- [[Design_Principles]]
- [[CDN]]
- [[Design Patterns]]
- [[glances установка сервера]]
- [[gRPC]]
- [[PWA]]
