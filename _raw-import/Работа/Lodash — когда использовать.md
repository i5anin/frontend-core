---
tags: [javascript, lodash, библиотеки]
created: 2026-06-20
---

# Lodash — когда использовать

> Lodash решает задачи, где нативный JS многословен или ненадёжен. Но в 2024+ многое уже есть в нативном JS — сначала проверь, нужна ли библиотека.

---

## Когда Lodash оправдан

**Глубокое клонирование объектов**

```js
// ❌ Нативно — не работает для вложенных объектов
const copy = { ...obj }

// ✅ Lodash
const copy = _.cloneDeep(obj)
```

**Глубокое сравнение объектов**

```js
// ❌ Нативно — невозможно через ===
obj1 === obj2 // false, даже если содержимое одинаковое

// ✅ Lodash
_.isEqual(obj1, obj2) // true / false по содержимому
```

**Группировка массива**

```js
const orders = [
  { status: 'new',  id: 1 },
  { status: 'done', id: 2 },
  { status: 'new',  id: 3 },
]

_.groupBy(orders, 'status')
// { new: [...], done: [...] }
```

**Дебаунс и тротлинг**

```js
// Не вызывать функцию чаще чем раз в 300мс
const onInput = _.debounce(fetchSearch, 300)

// Не чаще одного раза в секунду
const onScroll = _.throttle(handleScroll, 1000)
```

**Безопасный доступ к вложенным полям**

```js
const city = _.get(user, 'address.city', 'Не указан')
// Не упадёт если user.address = undefined
```

**Сортировка по нескольким полям**

```js
_.orderBy(users, ['role', 'name'], ['asc', 'desc'])
```

---

## Когда Lodash НЕ нужен

| Задача | Нативный JS |
|---|---|
| Фильтрация | `arr.filter()` |
| Поиск | `arr.find()` |
| Проверка включения | `arr.includes()` |
| Плоский массив | `arr.flat()` |
| Уникальные значения | `new Set(arr)` |
| Поверхностный клон | `{ ...obj }` |
| Опциональная цепочка | `user?.address?.city` |

> [!tip]
> Если проект на Vue/React — скорее всего Lodash уже есть в зависимостях транзитивно. Но импортируй только нужные методы:
> ```js
> import cloneDeep from 'lodash/cloneDeep'
> ```
> Не `import _ from 'lodash'` — это тянет всю библиотеку в бандл.

---

## Связанные

- [[Lodash]]
