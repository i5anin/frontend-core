# Функциональное программирование в JavaScript

Функциональное программирование (ФП) — это парадигма, в которой программы строятся из *чистых функций*, без побочных эффектов, с акцентом на *неизменяемость данных* и *композицию функций*.

JavaScript, несмотря на то что не является чисто функциональным языком, отлично поддерживает этот подход.

---

## Основные принципы

### 1. Чистые функции

Функция считается **чистой**, если при одинаковых входных данных она всегда возвращает одинаковый результат и не изменяет внешнее состояние.

```js
// Чистая функция
function sum(a, b) {
  return a + b;
}

// Нечистая функция
let counter = 0;
function increment() {
  counter++; // изменяет внешнее состояние
}
```

**Зачем это нужно:** чистые функции легко тестировать, предсказуемы и упрощают отладку.

---

### 2. Неизменяемость данных (Immutability)

Вместо изменения существующих структур данных, создаются новые копии.

```js
const user = { name: 'Alex', age: 25 };

// ❌ плохо — изменяет исходный объект
user.age = 26;

// ✅ хорошо — создаём новый объект
const updatedUser = { ...user, age: 26 };
```

Используются методы, не изменяющие массивы: `map`, `filter`, `reduce`, `concat`, `slice`.

---

### 3. Функции высшего порядка (Higher-Order Functions)

Это функции, которые принимают другие функции как аргументы или возвращают их.

```js
function withLogging(fn) {
  return function (...args) {
    console.log('Вызов с аргументами:', args);
    return fn(...args);
  };
}

const sum = (a, b) => a + b;
const loggedSum = withLogging(sum);
loggedSum(2, 3);
```

---

### 4. Композиция функций

Композиция — это объединение нескольких функций в одну, где результат одной функции передаётся в следующую.

```js
const compose = (f, g) => x => f(g(x));

const double = x => x * 2;
const square = x => x * x;

const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(3)); // 36
```

Современные библиотеки (например, **Ramda** или **lodash/fp**) предоставляют готовые инструменты для композиции и каррирования.

---

### 5. Каррирование (Currying)

Каррирование — это преобразование функции с несколькими аргументами в последовательность функций, каждая из которых принимает один аргумент.

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

ES6 позволяет писать короче:

```js
const multiply = a => b => a * b;
```

---

### 6. Рекурсия вместо циклов

В функциональном стиле циклы часто заменяются рекурсией.

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

---

### 7. Декларативность

ФП поощряет декларативный стиль: **описываем, что нужно сделать**, а не **как**.

```js
// Императивно
let total = 0;
for (let i = 0; i < arr.length; i++) {
  total += arr[i];
}

// Декларативно
const total = arr.reduce((sum, val) => sum + val, 0);
```

---

## Практика: примеры применения

### Обработка данных

```js
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

const activeUserNames = users
  .filter(u => u.active)
  .map(u => u.name);

console.log(activeUserNames); // ['Alice', 'Charlie']
```

### Комбинирование преобразований

```js
const trim = str => str.trim();
const toLower = str => str.toLowerCase();
const slugify = str => str.replace(/\s+/g, '-');

const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const createSlug = compose(slugify, toLower, trim);

console.log(createSlug('  Hello World  ')); // 'hello-world'
```

---

## Когда использовать ФП в JavaScript

* При работе с неизменяемыми структурами (Redux, Vuex)
* В обработке данных (map/filter/reduce)
* При создании утилитарных функций (вместо классов и состояний)
* Для предсказуемого и тестируемого кода

---

## Заключение

Функциональное программирование — не альтернатива ООП, а другой угол зрения. В JavaScript можно и нужно использовать оба подхода, выбирая инструмент под задачу. В результате код становится чище, тесты проще, а баги — реже.

