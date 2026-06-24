---
tags:
  - карьера
  - vue
  - javascript
  - api
created: 2025-01-12
date: 2025-01-12
---
**Что делает `computed` в [Vue](#)?**

`computed` — это API в Vue.js, используемый для создания **вычисляемых свойств**. Вычисляемые свойства автоматически обновляются, когда изменяются зависимости, на которых они основаны. Они кэшируются, то есть их значение пересчитывается только при необходимости, если зависимые данные изменились.

---

**Разбор вашего примера кода:**

```javascript
const commentFields = computed(() => {
  return Object.entries(props.header.fields || {})
    .filter(([name]) => name.includes('comments'))
    .map(([name, field]) => ({ name, ...field }))
});
```

1. **Цель**:
    
    - `computed` здесь создаёт реактивное вычисляемое свойство `commentFields`.
    - Это свойство автоматически пересчитается, если изменится значение `props.header.fields`.
2. **Детали работы:**
    
    - **`Object.entries()`**: Преобразует объект `props.header.fields` в массив пар `[ключ, значение]`.
    - **`.filter()`**: Оставляет только те пары, где ключ (имя поля) содержит подстроку `"comments"`.
    - **`.map()`**: Преобразует оставшиеся пары в объекты вида `{ name, ...field }`, где:
        - `name` — это ключ из объекта `fields`,
        - `...field` — это все свойства из значения объекта `fields`.
3. **Кэширование**:
    
    - Если `props.header.fields` остаётся неизменным, результат вычисления кэшируется.
    - Это экономит ресурсы, поскольку значение `commentFields` пересчитывается только при изменении `props.header.fields`.

---

**Что делает `computed`?**

1. **Реактивность**:
    
    - Вычисляемое свойство следит за реактивными данными, на которые оно ссылается (в данном случае `props.header.fields`).
    - Если данные изменяются, вычисляемое свойство автоматически обновляется.
2. **Кэширование**:
    
    - Значение вычисляемого свойства сохраняется, пока зависимые данные не изменятся.
    - Это предотвращает лишние вычисления при каждом доступе к свойству.
3. **Применение в шаблонах**:
    
    - Вычисляемые свойства можно использовать в шаблонах Vue, как обычные данные.

---

**Пример простого использования `computed`:**

**1. Вычисление данных:**

```javascript
import { ref, computed } from 'vue';

const count = ref(5);
const doubleCount = computed(() => count.value * 2);

console.log(doubleCount.value); // 10
count.value++;
console.log(doubleCount.value); // 12
```

- `doubleCount` обновляется автоматически при изменении `count`.

**2. В шаблоне:**

```javascript
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    return { count, doubleCount, increment };
  }
};
</script>
```

---

**Основные преимущества `computed`:**

1. **Кэширование**:
    - В отличие от `methods`, вычисляемое свойство не пересчитывается при каждом вызове, если его зависимости не изменились.
2. **Простота использования**:
    - Упрощает работу с

**`watch` в Vue.js**

`watch` используется для **наблюдения за изменениями реактивных переменных или вычисляемых значений**. Это позволяет выполнять побочные эффекты, такие как API-запросы, логирование или другие действия, когда отслеживаемое значение изменяется.

---

**Как работает `watch`?**

- `watch` отслеживает изменения реактивных данных или вычисляемых свойств.
- Когда отслеживаемое значение изменяется, вызывается функция-обработчик.
- В обработчик передаются:
    - Новое значение.
    - Старое значение.

---

**Пример использования `watch`:**

```javascript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`count изменился: с ${oldValue} на ${newValue}`);
});

count.value++; // Лог: count изменился: с 0 на 1
```

---

**Какие переменные можно отслеживать?**

1. **Примитивные значения:**
    
    - `ref`:
        
        ```javascript
        const myValue = ref(0);
        watch(myValue, (newVal, oldVal) => {
          console.log(newVal, oldVal);
        });
        ```
        
2. **Объекты и массивы:**
    
    - `reactive`:
        
        ```javascript
        const state = reactive({ name: 'Alice', age: 25 });
        watch(() => state.name, (newVal, oldVal) => {
          console.log(`Имя изменилось с ${oldVal} на ${newVal}`);
        });
        
        state.name = 'Bob'; // Лог: Имя изменилось с Alice на Bob
        ```
        
3. **Вычисляемые свойства (`computed`):**
    
    ```javascript
    const count = ref(10);
    const doubleCount = computed(() => count.value * 2);
    
    watch(doubleCount, (newVal, oldVal) => {
      console.log(`doubleCount изменился: с ${oldVal} на ${newVal}`);
    });
    
    count.value++; // Лог: doubleCount изменился: с 20 на 22
    ```
    
4. **Множественные источники (массив):**
    
    ```javascript
    watch([count, doubleCount], ([newCount, newDouble], [oldCount, oldDouble]) => {
      console.log(`count: ${oldCount} -> ${newCount}, doubleCount: ${oldDouble} -> ${newDouble}`);
    });
    
    count.value++; // Лог: count: 10 -> 11, doubleCount: 20 -> 22
    ```
    

---

**Глубокое наблюдение (`deep`)**

По умолчанию `watch` не отслеживает вложенные свойства объектов. Для этого нужно использовать опцию `{ deep: true }`.

```javascript
const state = reactive({ user: { name: 'Alice', age: 25 } });

watch(
  () => state.user,
  (newVal, oldVal) => {
    console.log('user изменился:', newVal, oldVal);
  },
  { deep: true }
);

state.user.name = 'Bob'; // Лог: user изменился: { name: 'Bob', age: 25 } { name: 'Alice', age: 25 }
```

---

**Немедленное выполнение (`immediate`)**

По умолчанию `watch` срабатывает только при изменении отслеживаемого значения. Если нужно вызвать обработчик сразу при монтировании, используется `{ immediate: true }`.

```javascript
watch(
  count,
  (newVal, oldVal) => {
    console.log(`Сразу вызывается: ${oldVal} -> ${newVal}`);
  },
  { immediate: true }
);
```

---

**Отличия между `watch` и `computed`**

|**Свойство**|**`watch`**|**`computed`**|
|---|---|---|
|**Цель**|Наблюдение за изменениями и выполнение побочных эффектов|Создание вычисляемых значений на основе данных|
|**Кэширование**|Нет|Да|
|**Использование**|API-запросы, логика, асинхронные задачи|Привязка к шаблонам, оптимизация вычислений|

---

**Пример реального применения**

**API-запрос при изменении фильтра:**

```javascript
const filter = ref('');
const data = ref([]);

watch(filter, async (newFilter) => {
  const response = await fetch(`https://api.example.com/items?search=${newFilter}`);
  data.value = await response.json();
});
```

**Наблюдение за изменением размера окна:**

```javascript
const windowSize = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

watch(
  windowSize,
  (newSize) => {
    console.log(`Размер окна изменился: ${newSize.width}x${newSize.height}`);
  },
  { deep: true }
);

window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;
});
```

---

`watch` — это мощный инструмент для выполнения побочных действий на основе изменений данных. Он идеально подходит для отслеживания сложных сценариев или асинхронной логики, когда простого обновления интерфейса недостаточно.

---

## Связанные

- [[Собеседование с Евгением]]
- [[! Map, включая использование методов .flat()]]
- [[! объединения двух объектов Map (m1 и m2) в один новый объект Map (m3).]]
- [[! с массивами и объектами Map, с использованием оператора расширения ... для объединения массивов и Map.]]
- [[Intersection Types]]
- [[Map в JavaScript.]]
