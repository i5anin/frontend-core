---
tags:
  - веб-разработка
  - vue
  - javascript
created: 2024-10-13
date: 2024-10-13
---
`v-model` — это директива в [../../Vue/Vue.js](#), которая связывает данные из компонента с элементом формы (например, `input`, `textarea`, `select`). Она обеспечивает двустороннюю привязку данных: изменения в поле формы автоматически обновляют соответствующее свойство в данных компонента и наоборот.

**Пример использования `v-model`:**

**Пример 1: Привязка к текстовому полю (`input`)**
```vue
<template>
  <div>
    <input v-model="message" placeholder="Введите сообщение">
    <p>Вы ввели: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    };
  }
};
</script>
```

Здесь значение текстового поля (`input`) связано с переменной `message` в данных компонента. Когда пользователь вводит текст, значение автоматически обновляется и отображается в параграфе.

**Пример 2: Привязка к чекбоксу (`checkbox`)**
```vue
<template>
  <div>
    <input type="checkbox" v-model="isChecked"> Включить
    <p>Статус: {{ isChecked ? 'Включено' : 'Отключено' }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false
    };
  }
};
</script>
```

В этом примере `v-model` связывает значение чекбокса с переменной `isChecked`. Когда пользователь изменяет состояние чекбокса, переменная обновляется.

**Пример 3: Привязка к выпадающему списку (`select`)**
```vue
<template>
  <div>
    <select v-model="selectedOption">
      <option value="apple">Яблоко</option>
      <option value="banana">Банан</option>
      <option value="orange">Апельсин</option>
    </select>
    <p>Вы выбрали: {{ selectedOption }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: ''
    };
  }
};
</script>
```

Здесь `v-model` связывает выбранное значение выпадающего списка с переменной `selectedOption`. Когда пользователь выбирает новый элемент, переменная обновляется.

**Пример 4: Привязка к полю `textarea`**
```vue
<template>
  <div>
    <textarea v-model="textAreaContent" placeholder="Введите текст"></textarea>
    <p>Текст: {{ textAreaContent }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textAreaContent: ''
    };
  }
};
</script>
```

**Итог:**
- `v-model` обеспечивает двустороннюю привязку данных между элементом формы и данными компонента.
- Применяется к элементам формы: `input`, `textarea`, `select`, `checkbox` и т.д.
- Удобен для обработки пользовательского ввода в форме.

---

## Связанные

- [[Directives]]
- [[v-bind]]
- [[v-bind2]]
- [[v-for]]
- [[v-for2]]
- [[v-model]]
