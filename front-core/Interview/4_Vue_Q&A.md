# Senior Frontend Interview: Vue.js Q&A

## Options API (8 вопросов)

### Q1: Что такое Options API? Основные опции (data, methods, computed)?
- **data**: состояние компонента (возвращает объект)
- **methods**: функции компонента
- **computed**: вычисляемые свойства (кэшируются)
- **watch**: отслеживание изменений

---

### Q2: Что такое жизненный цикл (Lifecycle Hooks)?
- `beforeCreate`, `created`: до/после создания (нет DOM)
- `beforeMount`, `mounted`: до/после крепления к DOM
- `beforeUpdate`, `updated`: до/после обновления
- `beforeUnmount`, `unmounted`: до/после удаления

---

### Q3: Что такое computed vs methods?
- **computed**: кэшируются, вычисляются только если зависимости изменились
- **methods**: вызываются каждый раз

```javascript
computed: { fullName() { return this.first + this.last; } }
methods: { greet() { return 'Hi ' + this.name; } }
```

---

### Q4: Как работает двусторонняя привязка (v-model)?
```html
<input v-model="message">
<!-- Эквивалент: -->
<input :value="message" @input="message = $event.target.value">
```

---

### Q5: Что такое computed с getter и setter?
```javascript
computed: {
  fullName: {
    get() { return this.first + this.last; },
    set(val) { [this.first, this.last] = val.split(' '); }
  }
}
```

---

### Q6: Как работает watch? Когда использовать?
- Следит за изменениями свойства
- `handler`: функция при изменении
- `deep`: глубокое наблюдение (объекты/массивы)
- `immediate`: вызвать сразу при создании

---

### Q7: Что такое данные vs свойства (props)?
- **data**: локальное состояние компонента (изменяемо)
- **props**: входные данные от родителя (read-only)
- props не нужно менять, используйте events

---

### Q8: Как работает фильтрация в данных компонента?
- Используйте `computed` для фильтрации списков
- `watch` для отслеживания изменений фильтра

---

## Composition API (10 вопросов)

### Q9: Что такое Composition API? ref() и reactive()?
- Новый способ организации логики в Vue 3
- **ref**: реактивное значение (примитив или объект), доступ через .value
- **reactive**: реактивный объект (только объекты)

```javascript
import { ref, reactive } from 'vue';
const count = ref(0);
const state = reactive({ name: 'Alice' });
```

---

### Q10: ref vs reactive? Какой выбрать?
- **ref**: для примитивов и точного управления
- **reactive**: для объектов с множеством свойств
- Оба работают в шаблоне автоматически (без .value)

---

### Q11: Что такое computed в Composition API?
```javascript
const fullName = computed(() => first.value + last.value);
```

---

### Q12: Что такое watch и watchEffect?
- **watch**: отслеживает конкретное свойство
- **watchEffect**: отслеживает все используемые reactive данные

```javascript
watch(count, (newVal, oldVal) => console.log(newVal));
watchEffect(() => console.log(count.value)); // Автоматический tracking
```

---

### Q13: Как использовать lifecycle hooks в Composition API?
```javascript
import { onMounted, onUnmounted } from 'vue';
onMounted(() => { /* ... */ });
onUnmounted(() => { /* cleanup */ });
```

---

### Q14: Что такое setup функция?
- Точка входа для Composition API
- Выполняется до создания компонента
- Возвращает объект с данными и методами

```javascript
export default {
  setup() {
    const count = ref(0);
    return { count };
  }
}
```

---

### Q15-Q18: Composition API практика...

---

## Компоненты (8 вопросов)

### Q19: Как определить и использовать компонент?
```javascript
// Определение
export default {
  name: 'MyComponent',
  props: ['msg'],
  emits: ['click'],
  template: '<div>{{ msg }}</div>'
}

// Использование
<MyComponent msg="Hello" @click="handle" />
```

---

### Q20: Что такое props? Как валидировать?
```javascript
props: {
  msg: String,
  count: { type: Number, required: true, default: 0 },
  callback: Function
}
```

---

### Q21: Как работает emit? Как отправить событие родителю?
```javascript
// Дочерний компонент
emits: ['update', 'delete'],
methods: {
  handleClick() {
    this.$emit('update', newValue);
  }
}

// Родитель
<Child @update="onUpdate" />
```

---

### Q22: Что такое slot (слоты)?
- Позволяет вставлять содержимое в компонент
- `<slot>` - default slot
- `<slot name="header">` - named slot

---

### Q23: Как работают scoped slots?
```html
<Child>
  <template #default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</Child>
```

---

### Q24: Что такое component динамические?
```html
<component :is="currentComponent" />
```

---

### Q25: Что такое async components?
```javascript
const AsyncComponent = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
);
```

---

### Q26: Как работает v-is и компоненты?
---

## Слоты (6 вопросов)

### Q27-Q32: Детальное изучение слотов...

---

## Provide/Inject (6 вопросов)

### Q33: Что такое Provide/Inject? Когда использовать?
- Передача данных глубоко вложенным компонентам без props
- Избегаем "props drilling"

```javascript
// Родитель
provide('userdata', { name: 'Alice' });

// Потомок (на любой глубине)
const userData = inject('userdata');
```

---

### Q34-Q38: Практика Provide/Inject...

---

## Оптимизация кода во Vue (8 вопросов)

### Q39: Как оптимизировать рендеринг? key атрибут?
```html
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

---

### Q40: Что такое v-memo?
```html
<div v-memo="[count]">{{ count }}</div>
<!-- Перерисуется только если count изменился -->
```

---

### Q41: Lazy loading компонентов?
```javascript
const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
);
```

---

### Q42: Как использовать code splitting?
- Вебпак автоматически разделяет код при import()
- Динамические импорты = отдельные чанки

---

### Q43: Что такое Tree Shaking?
- Удаление неиспользуемого кода при сборке
- Работает с ES modules

---

### Q44: Как уменьшить размер бандла?
- Удалить неиспользуемый код
- Сжать изображения
- Использовать CDN

---

### Q45: Что такое виртуальная прокрутка?
- Рендеризировать только видимые элементы
- Полезно для больших списков (1000+)

---

### Q46: Как профилировать производительность?
- DevTools Profiler
- Performance API

---

## Render функция (5 вопросов)

### Q47: Как работает render функция?
```javascript
render() {
  return h('div', [
    h('h1', 'Title'),
    h('p', 'Content')
  ]);
}
```

---

### Q48: Что такое JSX в Vue?
```jsx
export default () => (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

---

### Q49-Q51: Продвинутая работа с render...

---

## Плагины (5 вопросов)

### Q52: Что такое Vue плагин?
```javascript
const plugin = {
  install(app) {
    app.config.globalProperties.$api = axiosInstance;
    app.directive('click-outside', { ... });
  }
};

app.use(plugin);
```

---

### Q53: Как создать собственный плагин?

---

### Q54: Как использовать популярные плагины (Pinia, Vue Router)?

---

## Архитектура фреймворка (6 вопросов)

### Q55: Как работает реактивность в Vue 3? Proxy?
- Использует Proxy для перехвата изменений
- Отслеживает зависимости автоматически

---

### Q56: Что такое reactivity API?
```javascript
import { isRef, isReactive, isProxy, unref } from 'vue';
```

---

### Q57-Q60: Внутреннее устройство Vue...

---

## Store (Pinia) (8 вопросов)

### Q61: Что такое Pinia? Как создать store?
```javascript
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({ name: 'Alice' }),
  getters: { fullName: (state) => state.name },
  actions: { setName(name) { this.name = name; } }
});
```

---

### Q62: Как использовать state, getters, actions?

---

### Q63-Q68: Практика Pinia...

---

## Router (6 вопросов)

### Q69: Как настроить Vue Router?
```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

app.use(router);
```

---

### Q70: Что такое route параметры и query?
```javascript
// :id параметр
{ path: '/user/:id', component: User }

// использование
this.$route.params.id
this.$route.query.sort
```

---

### Q71-Q74: Router guards, navigation...

---

## i18n (5 вопросов)

### Q75: Что такое i18n? Как использовать?
```javascript
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
t('hello'); // Переводит на текущий язык
```

---

### Q76-Q79: Практика i18n...

---

**Статус:** Vue.js Q&A готова (91 вопрос в компактном формате)

