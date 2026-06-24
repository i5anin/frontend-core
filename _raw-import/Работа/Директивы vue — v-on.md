---
tags:
  - веб-разработка
  - vue
  - javascript
created: 2024-10-12
date: 2024-10-12
---
`v-on` — это директива [../Vue.js](#), которая используется для прослушивания событий [DOM](./DOM) и выполнения действий при их возникновении. Например, можно использовать `v-on` для обработки кликов, нажатий клавиш, отправки форм и других событий.

**Синтаксис:**
```vue
v-on:событие="метод"
```

Можно также использовать сокращение:
```vue
@событие="метод"
```

**Пример использования `v-on`:**

**Пример 1: Обработка клика**
```vue
<template>
  <div>
    <button v-on:click="handleClick">Нажми меня</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('Кнопка была нажата!');
    }
  }
};
</script>
```

**Пример 2: Сокращение `@`**
```vue
<template>
  <div>
    <button @click="handleClick">Нажми меня</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('Кнопка была нажата!');
    }
  }
};
</script>
```

**Обработка других событий:**

**Пример 3: Обработка ввода с клавиатуры (`keyup`)**
```vue
<template>
  <div>
    <input @keyup.enter="handleEnter" placeholder="Нажми Enter"/>
  </div>
</template>

<script>
export default {
  methods: {
    handleEnter() {
      alert('Нажата клавиша Enter!');
    }
  }
};
</script>
```

В этом примере событие срабатывает при нажатии клавиши Enter в поле ввода.

**Пример 4: Передача параметров в метод**
```vue
<template>
  <div>
    <button @click="sayHello('Привет')">Сказать привет</button>
  </div>
</template>

<script>
export default {
  methods: {
    sayHello(message) {
      alert(message);
    }
  }
};
</script>
```

Здесь при клике на кнопку передается параметр `"Привет"` в метод `sayHello`, который выводит его в всплывающем окне.

**Основные события для использования с `v-on`:**
- `click`: клик мышью.
- `submit`: отправка формы.
- `keyup`: нажатие клавиш.
- `keydown`: удерживание клавиши.
- `mouseover`: наведение курсора мыши на элемент и другие события, доступные в [DOM](./DOM).

---

## Связанные

- [[Директивы vue]]
