---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
created: 2026-04-25
date: 2026-04-25
---
[Options API](./Basics — Options API) и [../Composition API](#)  являются двумя разными подходами к созданию компонентов во [../Vue.js](#).

является классическим способом определения компонентов в [../Vue.js](#) до версии 3.0. Он основан на определении опций компонента в объекте. Компоненты, созданные с использованием [Options API](./Basics — Options API), определяют свойства, методы, хуки жизненного цикла и другие опции внутри объекта `Vue.component` или в опциях объекта компонента. Пример компонента, созданного с использованием [Options API](./Basics — Options API), может выглядеть следующим образом:

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

- [[Подходы написания VUE]]
- [[Options API (2)]]
