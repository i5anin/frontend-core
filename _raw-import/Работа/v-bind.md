---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
created: 2024-10-12
date: 2024-10-12
---
В [../../Vue/Vue.js](#).js директива **`v-bind`** используется для динамической привязки значений к атрибутам [HTML](./HTML)-элементов, свойствам компонентов или для работы с классами и стилями. Она позволяет связать данные из [../../Vue/Vue.js](#)-компонента с атрибутами элемента в шаблоне.

**Синтаксис:**
```vue
v-bind:атрибут="выражение"
```

**Сокращение:**
Директива `v-bind` может использоваться в сокращённой форме, используя только двоеточие (`:`):
```vue
:атрибут="выражение"
```

**Основное использование `v-bind`:**

**Пример 1: Привязка к атрибуту `href`**
```vue
<template>
  <a v-bind:href="url">Перейти на сайт</a>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://example.com'
    };
  }
};
</script>
```
Или в сокращённой форме:
```vue
<template>
  <a :href="url">Перейти на сайт</a>
</template>
```

Здесь атрибут `href` динамически привязан к переменной `url` из данных компонента.

**Пример 2: Привязка классов**
```vue
<template>
  <div :class="{'active': isActive}">Пример с классами</div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    };
  }
};
</script>
```
В этом примере класс `active` будет добавлен к элементу `div`, если значение `isActive` равно `true`.

**Пример 3: Привязка стилей**
```vue
<template>
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">Цветной текст</div>
</template>

<script>
export default {
  data() {
    return {
      textColor: 'blue',
      fontSize: 18
    };
  }
};
</script>
```
Здесь стиль элемента `div` (цвет текста и размер шрифта) динамически изменяется в зависимости от данных компонента.

**Применение `v-bind` для передачи данных в дочерние компоненты:**
Когда необходимо передать данные в дочерний компонент через `props`, также используется `v-bind`.

**Пример:**
```vue
<!-- Родительский компонент -->
<template>
  <ChildComponent :message="parentMessage"></ChildComponent>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      parentMessage: 'Привет из родительского компонента'
    };
  },
  components: {
    ChildComponent
  }
};
</script>

<!-- Дочерний компонент (ChildComponent.vue) -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: ['message']
};
</script>
```

Здесь данные `parentMessage` из родительского компонента передаются в дочерний через атрибут `message` с использованием `v-bind`.

**Итог:**
- **`v-bind`** используется для динамической привязки атрибутов и свойств к элементам в шаблоне [../../Vue/Vue.js](#).
- Оно применяется для привязки атрибутов (например, `href`, `src`), классов, стилей и передачи данных в компоненты через `props`.
- Сокращение `v-bind` — это просто двоеточие (`:`), которое делает код более компактным и удобным.

---

## Связанные

- [[Directives]]
- [[v-bind2]]
- [[v-for]]
- [[v-for2]]
- [[v-model]]
- [[v-model2]]
