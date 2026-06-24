---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
  - api
created: 2023-06-20
date: 2023-06-20
---
`$emit` — это [методы во Vue](./Basics — методы во Vue).js, который используется для передачи событий от дочернего компонента родительскому. Он позволяет дочернему компоненту "выбросить" событие, которое может быть обработано в родительском компоненте.

Пример использования:

В дочернем компоненте:

```html
<template>
  <button @click="sendEvent">Нажми меня</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$emit('myEvent', 'данные');
    }
  }
}
</script>
```

В родительском компоненте:

```html
<template>
  <ChildComponent @myEvent="handleEvent" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleEvent(data) {
      console.log('Событие получено:', data);
    }
  }
}
</script>
```

Здесь дочерний компонент отправляет событие `myEvent`, и родительский компонент ловит это событие через директиву `@myEvent` и вызывает метод `handleEvent`.

[Vue.js](./Basics — Vue.js)

---

## Связанные

- [[Vue]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
- [[Guard]]
