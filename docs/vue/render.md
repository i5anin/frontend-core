## Render-функции

### Определение

**Render-функции** — это программный способ описания шаблонов во Vue.
Вместо декларативного HTML Vue-компонент может возвращать виртуальные узлы (VNode) напрямую с помощью функции `h()` (hyperscript).
Render-функции дают полный контроль над структурой DOM, динамическим контентом и оптимизациями рендера, особенно в случаях, когда шаблонные конструкции становятся громоздкими или недостаточно гибкими.

---

### Базовый пример

```ts
import { h } from 'vue'

export default {
  name: 'RenderExample',
  props: { msg: String },
  render() {
    return h('div', { class: 'message' }, `Message: ${this.msg}`)
  },
}
```

Эквивалент шаблона:

```vue
<template>
  <div class="message">Message: {{ msg }}</div>
</template>
```

---

### Синтаксис `h()`

```ts
h(
  type,        // строка с именем тега или компонент
  propsOrAttrs,// объект атрибутов/событий
  children     // текст, массив узлов или функция
)
```

Пример:

```ts
h('button', { onClick: handler, class: 'btn' }, 'Click me')
```

---

### Динамическая генерация контента

Render-функции позволяют создавать элементы в цикле без директив:

```ts
render() {
  return h('ul', {}, this.items.map(item =>
    h('li', { key: item.id }, item.name)
  ))
}
```

---

### Использование JSX / TSX

Для удобства можно писать Render-функции в JSX:

```tsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    return () => (
      <button onClick={() => count.value++}>Clicked {count.value} times</button>
    )
  },
})
```

JSX требует установки:

```bash
pnpm add -D @vitejs/plugin-vue-jsx
```

и активации в `vite.config.ts`:

```ts
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({ plugins: [vue(), vueJsx()] })
```

---

### Работа с компонентами

Render-функции могут рендерить другие компоненты:

```ts
import { h } from 'vue'
import MyButton from './MyButton.vue'

export default {
  render() {
    return h(MyButton, { label: 'Click' })
  },
}
```

Передача слотов:

```ts
render() {
  return h(MyButton, {}, {
    default: () => 'Text slot',
    icon: () => h('i', { class: 'icon' }),
  })
}
```

---

### Виртуальные узлы и оптимизация

Render-функции работают с **VNode** — внутренними объектами Vue:

```ts
{
  type: 'div',
  props: { id: 'app' },
  children: 'Hello'
}
```

Vue отслеживает зависимости и сравнивает VNode между рендерами (diffing), применяя только нужные изменения.
Вручную можно управлять ключами (`key`) и кэшированием узлов (`v-memo` аналог в render-API отсутствует, но `cache()` можно реализовать вручную).

---

### События и атрибуты

Все DOM-события передаются как `onEventName`:

```ts
h('input', {
  value: this.text,
  onInput: (e: Event) => (this.text = (e.target as HTMLInputElement).value),
})
```

Динамические классы и стили:

```ts
h('div', { class: ['box', { active: this.isActive }], style: { color: 'red' } })
```

---

### Пример композиции

Render-функции легко комбинировать с Composition API:

```ts
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(true)
    const toggle = () => (visible.value = !visible.value)
    return () =>
      h('div', [
        h('button', { onClick: toggle }, visible.value ? 'Hide' : 'Show'),
        visible.value ? h('p', 'Content is visible') : null,
      ])
  },
})
```

---

### Высшего порядка компоненты

Render-функции идеально подходят для **HOC** — оберток над другими компонентами:

```ts
import { h } from 'vue'

export function withBorder(WrappedComponent: any) {
  return {
    render() {
      return h('div', { class: 'border' }, [h(WrappedComponent, this.$attrs)])
    },
  }
}
```

---

### Слоты

Работа со слотами через объект `slots`:

```ts
export default {
  props: ['title'],
  setup(props, { slots }) {
    return () =>
      h('section', [
        h('h2', props.title),
        slots.default ? slots.default() : h('p', 'Empty section'),
      ])
  },
}
```

---

### Когда использовать Render-функции

* динамическая генерация разметки (деревья, схемы, редакторы);
* кастомные UI-фреймворки и DSL;
* обертки и декораторы компонентов;
* сложные манипуляции с children и слотами;
* оптимизация производительности (минимизация шаблонных вычислений).

---

### Преимущества

* Полный контроль над структурой рендера.
* Меньше ограничений, чем у шаблонов.
* Простое использование JSX для типизации и автодополнения.
* Возможность создавать собственные DSL и UI-абстракции.

---

### Недостатки

* Менее декларативный и визуально читаемый код.
* Требует знания Virtual DOM.
* Сложнее поддерживать при масштабировании, особенно без JSX.

---

### Лучшие практики

* Используй Render-функции **точечно** — для компонентов низкого уровня.
* Комбинируй с Composition API: бизнес-логика отдельно, рендер отдельно.
* Всегда добавляй ключи (`key`) для списков.
* Избегай прямых DOM-манипуляций — только декларативный VNode.
* Для слотов используй `slots.default?.()` вместо условных проверок.

---

Render-функции — мощный инструмент Vue 3 для динамического построения интерфейсов, создания UI-библиотек и fine-grained оптимизации.
Они открывают внутреннюю механику рендера, но требуют дисциплины и аккуратности, превращая разработчика в «режиссёра» собственного Virtual DOM.
