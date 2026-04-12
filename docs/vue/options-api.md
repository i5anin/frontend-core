# Options API

## Структура компонента

```js
export default {
  name: 'MyComponent',

  // Входные данные от родителя
  props: {
    title: { type: String, required: true },
    count: { type: Number, default: 0 }
  },

  // Локальное состояние
  data() {
    return {
      message: 'Hello',
      items: []
    };
  },

  // Вычисляемые свойства (кэшируются)
  computed: {
    fullTitle() {
      return `${this.title}: ${this.count}`;
    }
  },

  // Методы
  methods: {
    addItem(item) {
      this.items.push(item);
    }
  },

  // Отслеживание изменений
  watch: {
    count(newVal, oldVal) {
      console.log(`${oldVal} → ${newVal}`);
    },
    items: {
      handler(val) { /* вызывается при изменении */ },
      deep: true,      // глубокое наблюдение
      immediate: true  // вызвать сразу
    }
  },

  // События которые компонент может отправить
  emits: ['update', 'delete'],

  // Хуки жизненного цикла
  created()     { /* DOM ещё нет */ },
  mounted()     { /* DOM готов */ },
  updated()     { /* после обновления */ },
  beforeUnmount() { /* очистка */ }
};
```

## Жизненный цикл

```
beforeCreate  → created
      ↓
beforeMount  → mounted
      ↓
beforeUpdate → updated (при изменении данных)
      ↓
beforeUnmount → unmounted
```

```js
export default {
  created() {
    // Данные готовы, DOM нет
    // Загружать данные из API
    this.fetchData();
  },

  mounted() {
    // DOM готов
    // Работа с DOM, инициализация сторонних библиотек
    this.$refs.input.focus();
  },

  beforeUnmount() {
    // Очистка: таймеры, слушатели, websockets
    clearInterval(this.timer);
    this.socket.close();
  }
};
```

## computed vs methods

```js
export default {
  data() { return { a: 1, b: 2 }; },

  computed: {
    // Кэшируется! Пересчитывается только если a или b изменились
    sum() { return this.a + this.b; }
  },

  methods: {
    // Вызывается каждый раз при рендеринге
    getSum() { return this.a + this.b; }
  }
};
```

```html
<!-- computed вызов -->
<p>{{ sum }}</p>

<!-- methods вызов — всегда вызывает функцию -->
<p>{{ getSum() }}</p>
```

## Computed с getter/setter

```js
computed: {
  fullName: {
    get() {
      return `${this.first} ${this.last}`;
    },
    set(val) {
      const [first, last] = val.split(' ');
      this.first = first;
      this.last = last;
    }
  }
}
```

## v-model

```html
<!-- v-model = :value + @input -->
<input v-model="message">

<!-- Эквивалент -->
<input :value="message" @input="message = $event.target.value">

<!-- Модификаторы -->
<input v-model.trim="name">    <!-- убирает пробелы -->
<input v-model.number="age">   <!-- конвертирует в число -->
<input v-model.lazy="text">    <!-- обновляет на @change -->
```
