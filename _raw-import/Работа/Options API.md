---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
created: 2025-01-12
date: 2025-01-12
---
[Options API](./Basics — Options API) и [Composition API](./Basics — Composition API)  являются двумя разными подходами к созданию компонентов во [Vue.js](./Basics — Vue.js).

является классическим способом определения компонентов в [Vue.js](./Basics — Vue.js) до версии 3.0. Он основан на определении опций компонента в объекте. Компоненты, созданные с использованием [Options API](./Basics — Options API), определяют свойства, методы, хуки жизненного цикла и другие опции внутри объекта `Vue.component` или в опциях объекта компонента. Пример компонента, созданного с использованием [Options API](./Basics — Options API), может выглядеть следующим образом:

```js
Vue.component('my-component', {
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    showMessage() {
      alert(this.message);
    }
  }
});

```



---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
