---
tags:
  - веб-разработка
  - vue
  - javascript
created: 2023-06-20
date: 2023-06-20
---
`v-if`, `v-else-if`, `v-else` — это директивы условного рендеринга во Vue.js, которые позволяют показывать или скрывать элементы на основе условий.

**`v-if`:**
Директива `v-if` рендерит элемент только в том случае, если выражение истинно (true). Если выражение ложно, элемент не рендерится вообще.

```vue
<template>
  <div v-if="isLoggedIn">
    <p>Добро пожаловать, пользователь!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true
    }
  }
}
</script>
```

**`v-else-if`:**
Директива `v-else-if` используется для указания новой проверки, если предыдущая проверка `v-if` не сработала. Это как оператор `else if` в JavaScript.

```vue
<template>
  <div>
    <p v-if="score >= 90">Отлично!</p>
    <p v-else-if="score >= 75">Хорошо!</p>
    <p v-else-if="score >= 50">Удовлетворительно!</p>
    <p v-else>Неудовлетворительно!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 85
    }
  }
}
</script>
```

**`v-else`:**
Директива `v-else` срабатывает, если все предыдущие условия с `v-if` и `v-else-if` оказались ложными. Элемент с `v-else` рендерится, если не выполнилось ни одно условие.

```vue
<template>
  <div>
    <p v-if="role === 'admin'">Вы администратор</p>
    <p v-else-if="role === 'user'">Вы пользователь</p>
    <p v-else>Вы гость</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: 'guest'
    }
  }
}
</script>
```

**Основные моменты:**
- Элемент с `v-else` всегда должен идти сразу за элементом с `v-if` или `v-else-if`, иначе он не будет работать.
- Условные элементы с `v-if` и `v-else-if` будут полностью удаляться из DOM, если условие ложно, в отличие от `v-show`, который просто скрывает элемент.

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
