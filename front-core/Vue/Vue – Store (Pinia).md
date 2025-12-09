Pinia — современный store-менеджер для Vue, заменивший Vuex. Основан на реактивности Vue 3 и Composition API. Pinia предоставляет централизованное состояние приложения, удобную типизацию и простую архитектуру без сложных мутаций и boilerplate.

**Создание стора**

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: state => state.count * 2
  },
  actions: {
    inc() {
      this.count++
    }
  }
})
```

**Использование в компоненте**

```js
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
counter.inc()
</script>
```

`state`, `getters` и `actions` становятся доступными как свойства объекта.

**Особенности архитектуры Pinia**

- **Нет мутаций** — состояние изменяется в `actions`, напрямую через `this`.
    
- **Реактивность на базе Vue** — все stores полностью реактивны.
    
- **Поддержка модульности** — любое количество stores, каждый независимый.
    
- **Инстанс-ориентированность** — один store = одно глобальное состояние.
    
- **Поддержка SSR**.
    
- **Hot Module Replacement** для стора без перезагрузки страницы.
    

**Типизация и использование с TS**

Pinia даёт высокую точность типов благодаря Composition API:

```ts
const counter = useCounterStore()
counter.count // number
counter.inc() // typed action
```

**Getters**

Getter — вычисляемое свойство, аналог `computed`, работает поверх state:

```js
getters: {
  completedTasks: state => state.tasks.filter(t => t.done)
}
```

Getters кэшируются автоматически.

**Actions**

Actions — любые функции, которые изменяют состояние или запускают асинхронный код:

```js
actions: {
  async loadData() {
    const res = await fetch('/api')
    this.items = await res.json()
  }
}
```

Actions могут вызываться друг из друга и могут возвращать значения.

**Подключение в приложении**

```js
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
```

**Плагины Pinia**

Pinia поддерживает плагины для расширения функционала:

```js
pinia.use(({ store }) => {
  store.$subscribe((mutation, state) => {
    console.log(mutation, state)
  })
})
```

Могут добавлять свойства, персистентность, логирование.

**Почему Pinia вместо Vuex**

- Нет мутаций и лишних уровней абстракции.
    
- Код проще, меньше шаблонности.
    
- Лучшая типизация.
    
- Прямое использование методов и state.
    
- Совместимость с Composition API по философии.
    

Pinia — стандартный state-manager для Vue 3 и основной инструмент хранения глобального состояния в актуальных приложениях.