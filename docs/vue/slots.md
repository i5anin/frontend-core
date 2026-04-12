# Слоты Vue

## Default Slot

```html
<!-- BaseButton.vue -->
<template>
  <button class="btn" :class="`btn--${variant}`">
    <slot>Нажми меня</slot>  <!-- fallback если slot пустой -->
  </button>
</template>
```

```html
<!-- Использование -->
<BaseButton>Сохранить</BaseButton>
<BaseButton>🗑️ Удалить</BaseButton>
<BaseButton />  <!-- покажет "Нажми меня" -->
```

## Named Slots

```html
<!-- PageLayout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot />  <!-- default slot -->
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

```html
<!-- Использование -->
<PageLayout>
  <template #header>
    <h1>Заголовок страницы</h1>
  </template>

  <p>Основной контент</p>

  <template #footer>
    <p>© 2024</p>
  </template>
</PageLayout>
```

## Scoped Slots — данные из компонента

```html
<!-- DataTable.vue — передаёт данные через slot -->
<template>
  <table>
    <tr v-for="row in data" :key="row.id">
      <td v-for="col in columns" :key="col.key">
        <slot :name="col.key" :row="row" :value="row[col.key]">
          {{ row[col.key] }}  <!-- default рендеринг -->
        </slot>
      </td>
    </tr>
  </table>
</template>
```

```html
<!-- Родитель кастомизирует рендеринг колонок -->
<DataTable :data="users" :columns="cols">
  <!-- Кастомная колонка status -->
  <template #status="{ value }">
    <span :class="`badge badge--${value}`">{{ value }}</span>
  </template>

  <!-- Кастомная колонка actions -->
  <template #actions="{ row }">
    <button @click="edit(row)">Изменить</button>
    <button @click="remove(row.id)">Удалить</button>
  </template>
</DataTable>
```

## useSlots() в Composition API

```js
import { useSlots, computed } from 'vue';

export default {
  setup() {
    const slots = useSlots();

    // Проверить наличие slot
    const hasHeader = computed(() => !!slots.header);

    return { hasHeader };
  }
};
```

```html
<template>
  <div>
    <header v-if="hasHeader">
      <slot name="header" />
    </header>
    <slot />
  </div>
</template>
```

## Renderless компонент (через slots)

```js
// MouseTracker.vue — логика без визуала
export default {
  data() {
    return { x: 0, y: 0 };
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.update);
  },
  methods: {
    update(e) { this.x = e.clientX; this.y = e.clientY; }
  },
  render() {
    return this.$slots.default({ x: this.x, y: this.y });
  }
};
```

```html
<MouseTracker>
  <template #default="{ x, y }">
    <p>Позиция: {{ x }}, {{ y }}</p>
  </template>
</MouseTracker>
```
