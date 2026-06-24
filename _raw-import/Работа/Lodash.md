---
tags: [javascript, lodash, библиотеки]
created: 2026-06-20
---

# Lodash

> Утилитная библиотека для работы с массивами, объектами, строками и функциями.

```js
import _ from 'lodash'
```

---

## Строки

**`_.includes`** — содержит ли строка подстроку

```js
_.includes('order_cal_price', 'price') // true
```

---

## Массивы

**`_.filter`** — фильтрация по условию

```js
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob',   age: 30 },
]

_.filter(users, u => u.age > 25) // [{ name: 'Bob', age: 30 }]
```

---

## Функции

**`_.memoize`** — кешировать результат по аргументу

```js
const double = _.memoize(n => n * 2)

double(5)  // вычисляет → 10
double(5)  // из кеша  → 10
double(10) // вычисляет → 20
```

---

## Связанные

- [[Библиотеки]]
