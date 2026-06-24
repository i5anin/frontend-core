---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
  - state-management
created: 2024-10-20
date: 2024-10-20
---
**Примеры создания и работы со стором в **[Vuex](#)** и **[Pinia](./Pinia)****

****1. [Vuex](#)****
**Объявление хранилища (стора) в [Vuex](#):**
```javascript
// store.js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  }
})

export default store
```

**Подключение Vuex к приложению:**
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App)
  .use(store)
  .mount('#app')
```

**Использование хранилища в компонентах:**
```html
<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <p>Double Counter: {{ doubleCounter }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['counter']),
    ...mapGetters(['doubleCounter'])
  },
  methods: {
    ...mapActions(['incrementAsync']),
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  }
}
</script>
```

****2. [Pinia](./Pinia)****

**Объявление хранилища (стора) в Pinia:**
```javascript
// store.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    incrementAsync() {
      setTimeout(() => {
        this.increment()
      }, 1000)
    }
  },
  getters: {
    doubleCounter: (state) => state.counter * 2
  }
})
```

**Подключение Pinia к приложению:**
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

**Использование хранилища в компонентах:**
```html
<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <p>Double Counter: {{ doubleCounter }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>

<script>
import { useCounterStore } from './store'

export default {
  setup() {
    const store = useCounterStore()

    return {
      counter: store.counter,
      doubleCounter: store.doubleCounter,
      increment: store.increment,
      decrement: store.decrement,
      incrementAsync: store.incrementAsync
    }
  }
}
</script>
```

**Основные различия:**
- В **[Vuex](#)** требуется использование мутаций для изменения состояния.
- В **[Pinia](./Pinia)** можно напрямую изменять состояние в экшенах, что упрощает код.
- В **[Pinia](./Pinia)** поддержка [Composition API](./Basics — Composition API) делает код более реактивным и естественным для [Vue](./Basics — Vue.js) 3.

---

## Связанные

- [[Basics]]
- [[component]]
- [[Composition API]]
- [[destroyed]]
- [[mounted]]
- [[Options API]]
