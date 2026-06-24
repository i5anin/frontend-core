---
tags:
  - javascript
  - типы
  - синтаксис
created: 2026-06-20
dataview: false
---

# JS — синтаксис и типы данных

---

## Типы

| Категория | Типы |
|---|---|
| **Примитивы** | `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined` |
| **Объекты** | `Object`, `Array`, `Map`, `Set`, `Function` и всё остальное |

---

## Проверка типов

```js
typeof x              // 'string', 'number', 'object', 'undefined'...
Array.isArray(x)      // true / false
Number.isNaN(x)       // безопасный NaN-чек (не путать с глобальным isNaN)
Number.isFinite(x)    // исключает Infinity и NaN
Object.is(a, b)       // точное сравнение: NaN === NaN, но 0 !== -0
```

---

## Falsy-значения

```js
false  0  -0  0n  ''  null  undefined  NaN
```

> [!tip]
> `??` проверяет только `null` и `undefined`, игнорирует `0` и `''`.
> Используй вместо `||` когда `0` и пустая строка — валидные значения.

---

## Приведение типов

```js
+'42'        // 42  (унарный плюс → число)
'a' + 1      // 'a1'  (конкатенация побеждает)
null ?? 'по умолчанию'   // 'по умолчанию'
user?.address?.city      // undefined если нет, не бросает ошибку
```

> [!warning]
> Нестрогое сравнение делает неявное приведение типов — непредсказуемо. Всегда строгое.

---

## Объекты

```js
const obj = {}
const obj2 = Object.create(proto)   // с прототипом

Object.freeze(obj)                  // заморозка — нельзя изменить
const copy = structuredClone(obj)   // глубокий клон (нативный, ES2022)
```

---

## Коллекции

```js
const map = new Map()       // ключ — любой тип
const set = new Set([1,2,3])// уникальные значения

// WeakMap / WeakSet — не удерживают ссылки, GC может очистить
const wm = new WeakMap()
```

---

## Массивы

```js
// Немутирующие методы (ES2023)
arr.toSorted()       // новый отсортированный массив
arr.toReversed()     // новый перевёрнутый массив
arr.toSpliced(1, 1)  // новый без элемента
arr.with(2, 'x')     // новый с заменой по индексу

// Итерация
for (const item of arr) { ... }
arr.map()  .filter()  .reduce()  .some()  .every()
```

---

## Строки

```js
`Hello ${name}`         // шаблонный литерал
Array.from('😀').length // 1 — корректный подсчёт Unicode
'😀'.length             // 2 — ошибочно (UTF-16 суррогатная пара)
```

---

## Symbol

```js
const id = Symbol('id')          // уникальный ключ
const shared = Symbol.for('id')  // глобальный реестр

// Встроенные символы управляют поведением
Symbol.iterator    // делает объект итерируемым
Symbol.toPrimitive // контролирует приведение к примитиву
```

---

## Ошибки

```js
try {
  fn()
} catch (e) {
  if (e instanceof TypeError) { ... }
} finally {
  // выполняется всегда
}
```

---

## Правила

1. `const` по умолчанию, `let` только если переприсвоение, `var` — никогда
2. Никогда нестрогое сравнение (==), только строгое (===)
3. Не мутировать аргументы функций
4. Различать `null` (намеренное отсутствие) и `undefined` (не задано)
5. Большие числа → `BigInt`, целые без потерь → `Number.isSafeInteger`

---

## Связанные

- [[JavaScript]]
- [[const vs let vs var]]
- [[class]]
