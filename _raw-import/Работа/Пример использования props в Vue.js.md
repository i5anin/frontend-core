---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
created: 2024-10-12
date: 2024-10-12
---
# props [../Vue/Vue.js](#) пример

Пример передачи данных через [props](./props) из родительского компонента в дочерний:

**Родительский компонент (`ParentComponent.vue`):**
```html
<template>
  <div>
    <h1>Родительский компонент</h1>
    <ChildComponent :title="parentTitle" :description="parentDescription" @updateCount="handleUpdateCount" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentTitle: 'Заголовок от родителя',
      parentDescription: 'Описание от родителя',
      count: 0
    };
  },
  methods: {
    handleUpdateCount(newCount) {
      this.count = newCount;
      console.log('Новое значение count:', this.count);
    }
  }
};
</script>
```

**Дочерний компонент (`ChildComponent.vue`):**
```html
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="incrementCount">Увеличить счетчик</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Нет описания'
    }
  },
  methods: {
    incrementCount() {
      this.$emit('updateCount', this.$emit('count') + 1);
    }
  }
};
</script>
```

В этом примере родительский компонент передает значения `title` и `description` в дочерний через `props`, а также получает обновление `count` через событие `updateCount`, которое генерируется в дочернем компоненте.

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
