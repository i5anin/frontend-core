---
tags:
  - веб-разработка
  - vue
  - html
created: 2024-11-19
date: 2024-11-19
---
**Передача данных из родителя в дочерний компонент**

1. **В родительском компоненте**:
   - Определите переменную, которую хотите передать.
   - Используйте атрибуты в компоненте для передачи данных через пропсы.

```html
<!-- ParentComponent.vue -->
<template>
  <ChildComponent :message="parentMessage" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      parentMessage: 'Привет из родителя!'
    };
  }
};
</script>
```

2. **В дочернем компоненте**:
   - Определите пропс с использованием `props`.

```html
<!-- ChildComponent.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>
```

---

**Передача данных из дочернего в родительский компонент**

1. **В родительском компоненте**:
   - Определите обработчик события для получения данных от дочернего компонента.

```html
<!-- ParentComponent.vue -->
<template>
  <ChildComponent @update-message="handleMessageUpdate" />
  <p>Сообщение от дочернего компонента: {{ childMessage }}</p>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      childMessage: ''
    };
  },
  methods: {
    handleMessageUpdate(newMessage) {
      this.childMessage = newMessage;
    }
  }
};
</script>
```

2. **В дочернем компоненте**:
   - Используйте `$emit` для передачи данных в родителя.

```html
<!-- ChildComponent.vue -->
<template>
  <button @click="sendMessage">Отправить сообщение родителю</button>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$emit('update-message', 'Привет из дочернего компонента!');
    }
  }
};
</script>
```

---

**Итоговая схема**

- **Родитель → Дочерний:** Используйте `props` для передачи данных.
- **Дочерний → Родитель:** Используйте события и `$emit` для передачи данных.

Такой подход полностью соответствует современным стандартам Vue 3 и позволяет обеспечить строгую структуру и понимание потоков данных.

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
