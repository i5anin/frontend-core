# Компоненты Vue

## Props — передача данных вниз

```js
// Дочерний компонент
export default {
  props: {
    title: String,
    count: {
      type: Number,
      default: 0,
      required: false,
      validator(val) { return val >= 0; }
    },
    user: {
      type: Object,
      default: () => ({}) // для объектов — функция!
    }
  }
};
```

```html
<!-- Передача props -->
<Card :title="post.title" :count="comments.length" :user="user" />

<!-- Передать все props объектом -->
<Card v-bind="post" />
```

## Emits — события вверх

```js
// Дочерний компонент
export default {
  emits: {
    // С валидацией
    update: (value) => typeof value === 'string',
    // Без валидации
    delete: null,
    click: null
  },

  methods: {
    handleClick() {
      this.$emit('update', this.localValue);
    }
  }
};
```

```html
<!-- Родитель слушает событие -->
<Card @update="onUpdate" @delete="onDelete" />
```

## v-model для компонентов

```js
// Компонент принимает modelValue и отправляет update:modelValue
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],

  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); }
    }
  }
};
```

```html
<!-- Использование -->
<MyInput v-model="text" />

<!-- Несколько v-model -->
<MyForm v-model:name="name" v-model:email="email" />
```

## Slots — вставка контента

```html
<!-- Компонент Card.vue -->
<div class="card">
  <slot name="header">Заголовок по умолчанию</slot>
  <div class="body">
    <slot /> <!-- default slot -->
  </div>
  <slot name="footer" />
</div>
```

```html
<!-- Использование -->
<Card>
  <template #header>
    <h2>Мой заголовок</h2>
  </template>

  <p>Основной контент</p>

  <template #footer>
    <button>OK</button>
  </template>
</Card>
```

## Scoped Slots

```html
<!-- Компонент передаёт данные в slot -->
<ul>
  <li v-for="item in items" :key="item.id">
    <slot :item="item" :index="index" />
  </li>
</ul>
```

```html
<!-- Родитель получает данные из slot -->
<List :items="products">
  <template #default="{ item, index }">
    <span>{{ index }}. {{ item.name }}</span>
  </template>
</List>
```

## Динамические компоненты

```html
<!-- Переключение между компонентами -->
<component :is="currentTab" />

<!-- С сохранением состояния -->
<keep-alive>
  <component :is="currentTab" />
</keep-alive>
```

## Async компоненты

```js
import { defineAsyncComponent } from 'vue';

const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
);

// С состояниями загрузки
const AsyncModal = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  loadingComponent: Spinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000
});
```

## Teleport — рендер вне компонента

```html
<!-- Рендерим в body, даже если компонент глубоко вложен -->
<teleport to="body">
  <div class="modal" v-if="isOpen">
    <h2>Modal</h2>
    <slot />
  </div>
</teleport>
```
