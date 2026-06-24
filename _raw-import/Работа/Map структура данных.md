---
tags:
  - веб-разработка
  - javascript
  - api
created: 2024-10-13
date: 2024-10-13
---
**`Map`** и метод **`map`** — это разные вещи в [JavaScript](./JavaScript).

**1. **`Map`** — это структура данных.**

[Map структура данных](./Map структура данных) — это коллекция ключ-значение, где ключами могут быть любые значения (включая объекты).

Пример использования `Map`:

```javascript
const myMap = new Map();

myMap.set('key1', 'value1');
myMap.set({ name: 'Anna' }, 'value2');

console.log(myMap.get('key1'));  // "value1"
```

**2. **Метод [../JavaScript/Методы/map](#)** — это метод массивов.**

Метод `map` используется для создания нового массива, где каждый элемент исходного массива трансформируется в соответствии с функцией обратного вызова (callback).

Пример использования метода `map`:

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(element) {
  return element * 2;
});

console.log(doubled);  // [2, 4, 6, 8, 10]
```

**Различия:**
- **`Map`** — это объект для хранения данных в формате ключ-значение.
- **Метод `map`** — это метод массивов, который возвращает новый массив, преобразованный с помощью переданной функции.

**Пример использования метода `map` с индексом и исходным массивом:**

```javascript
const arr = [1, 2, 3];

const newArr = arr.map(function(element, index, array) {
  console.log('Элемент:', element, 'Индекс:', index, 'Исходный массив:', array);
  return element * 2;  // Умножаем каждый элемент на 2
});

console.log(newArr);  // [2, 4, 6]
```

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
