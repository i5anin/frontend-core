Composition API — современный способ организации логики во Vue, основанный на функциях и реактивных примитивах. Вся логика компонента размещается в `setup()`, что позволяет группировать связанную функциональность горизонтально, а не разрывать её по секциям, как в Options API.

**Базовая структура**

```js
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    const increment = () => {
      count.value++
    }

    return {
      count,
      double,
      increment
    }
  }
}
```

**Ключевые свойства**

- Нет `this` — управление осуществляется через переменные.
    
- Используются реактивные примитивы: `ref`, `reactive`, `computed`, `watch`, `watchEffect`.
    
- Логику можно группировать по смыслу, создавая отдельные функции (composables).
    
- Прекрасно работает с TypeScript из-за явных типов.
    
- Наглядно видно, какие зависимости участвуют в вычислениях.
    
- Код легче тестировать, переиспользовать и переносить между компонентами.
    

**Примеры реактивности**

`ref()` — примитивное значение:

```js
const isOpen = ref(false)
```

`reactive()` — объект:

```js
const state = reactive({
  user: null,
  loading: false
})
```

`computed()` — вычисляемые значения:

```js
const fullName = computed(() => state.user?.name + ' ' + state.user?.surname)
```

`watch()` — реакция на изменение:

```js
watch(() => state.loading, v => console.log(v))
```

**Хуки жизненного цикла**

Используются функции вместо методов:

`onMounted`, `onUpdated`, `onUnmounted`, `onBeforeMount`, и т.д.

```js
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted')
})
```

**Composables**

Повторно используемая логика оформляется в функции:

```js
export function useCounter() {
  const count = ref(0)
  const inc = () => count.value++
  return { count, inc }
}
```

**Особенности и преимущества**

- Гибкая структура кода.
    
- Высокая масштабируемость.
    
- Прямая работа с реактивностью.
    
- Нет скрытой магии `this`.
    
- Удобен для больших проектов, сложных компонентов и архитектурных решений.
    

Composition API — основной стандарт разработки во Vue 3 и 2025 года.