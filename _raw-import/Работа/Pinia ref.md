---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
  - state-management
created: 2024-10-13
date: 2024-10-13
---
В **[Pinia](./Pinia)** (как и в обычном **Vue 3**) можно использовать [ref](./ref) для создания реактивных переменных. `ref` создаёт реактивные данные, которые можно использовать в хранилищах **Pinia** для управления состоянием.

**Пример использования `ref` в Pinia:**

```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // Создаем реактивные переменные с помощью ref
  const name = ref('Анна');
  const age = ref(25);

  // Actions для изменения состояния
  function updateName(newName) {
    name.value = newName;
  }

  return { name, age, updateName };
});
```

**Описание:**
- В данном примере `name` и `age` объявлены с помощью `ref`, что делает их реактивными. Чтобы получить значение из `ref`, нужно обращаться через `.value`.
- `updateName` — это метод для изменения значения `name`, в котором используется `.value`.

**Как использовать в компонентах Vue:**

```vue
<template>
  <div>
    <p>Имя: {{ userStore.name }}</p>
    <p>Возраст: {{ userStore.age }}</p>
    <button @click="changeName">Изменить имя</button>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user';

const userStore = useUserStore();

function changeName() {
  userStore.updateName('Ольга');
}
</script>
```

Здесь компоненты используют данные из хранилища **Pinia** через реактивные свойства `ref`.

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
