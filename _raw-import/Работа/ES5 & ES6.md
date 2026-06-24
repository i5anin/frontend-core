---
tags:
  - веб-разработка
  - javascript
created: 2024-10-23
date: 2024-10-23
---
# Руководство по ECMAScript 5 и ECMAScript 6 (ES5 & ES6)

## Введение

**ECMAScript (ES)** — это стандарт, на основе которого построены современные языки программирования, такие как [JavaScript](./JavaScript). С течением времени ECMAScript претерпевал значительные изменения, добавляя новые возможности и улучшая существующие. В этом руководстве мы рассмотрим основные особенности ECMAScript 5 (ES5) и ECMAScript 6 (ES6), а также сравним их.

# ECMAScript 5 (ES5)

ECMAScript 5 был выпущен в декабре 2009 года и стал значительным обновлением для JavaScript. ES5 привнес множество улучшений, которые сделали язык более мощным и удобным для разработчиков.

**Основные особенности ES5**

**1. Строгий режим (Strict Mode)**

Строгий режим вводит более строгие правила для написания кода, помогая избежать потенциальных ошибок.

```javascript
"use strict";

function myFunction() {
  // Код в строгом режиме
}
```

**Преимущества:**
- Запрещает использование неявных глобальных переменных.
- Запрещает удаление необъектных свойств.
- Запрещает дублирование параметров функции.

**2. Новые методы для объектов и массивов**

ES5 добавил множество методов для работы с объектами и массивами, что упростило манипуляции с данными.

**Методы объектов:**
- `Object.create()`
- `Object.keys()`
- `Object.defineProperty()`

**Пример использования `Object.keys`:**

```javascript
var obj = { a: 1, b: 2, c: 3 };
var keys = Object.keys(obj); // ["a", "b", "c"]
```

**Методы массивов:**
- `forEach()`
- `map()`
- `filter()`
- `reduce()`
- `some()`
- `every()`

**Пример использования `map`:**

```javascript
var numbers = [1, 2, 3];
var doubled = numbers.map(function(num) {
  return num * 2;
}); // [2, 4, 6]
```

**3. JSON поддержка**

ES5 встроил поддержку JSON, что облегчило работу с данными.

```javascript
var jsonString = '{"name":"John", "age":30}';
var obj = JSON.parse(jsonString);

var newJson = JSON.stringify(obj); // '{"name":"John","age":30}'
```

**4. Доступ к свойствам объектов**

В ES5 появились методы для более гибкого доступа к свойствам объектов.

- `Object.getOwnPropertyDescriptor()`
- `Object.defineProperty()`
- `Object.defineProperties()`

**Пример использования `Object.defineProperty`:**

```javascript
var obj = {};
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,
  enumerable: true,
  configurable: false
});
```

**5. Дополнительные улучшения**

- Поддержка `Array.isArray()`
- Улучшенная работа с функциями, включая метод `bind()`

**Пример использования `bind`:**

```javascript
function greet() {
  console.log(this.name);
}

var person = { name: 'Alice' };
var greetPerson = greet.bind(person);
greetPerson(); // "Alice"
```

---
# ECMAScript 6 (ES6)

ECMAScript 6, также известный как **ES2015**, был выпущен в июне 2015 года и принес кардинальные изменения и улучшения в JavaScript. ES6 сделал язык более мощным, выразительным и удобным для разработки крупных приложений.

**Основные особенности ES6**

**1. Новые способы объявления переменных: `let` и `const`**

**`let`** позволяет объявлять блочные переменные, а **`const`** — константы.

```javascript
let mutable = 'изменяемое значение';
const immutable = 'константа';

// Ошибка: попытка изменить константу
immutable = 'новое значение'; // TypeError
```

**2. Стрелочные функции (Arrow Functions)**

Стрелочные функции обеспечивают более краткий синтаксис и сохраняют контекст `this`.

```javascript
// Обычная функция
function add(a, b) {
  return a + b;
}

// Стрелочная функция
const add = (a, b) => a + b;
```

**Особенности:**
- Не имеют собственного `this`
- Не имеют `arguments` объекта

**3. Шаблонные строки (Template Literals)**

Шаблонные строки позволяют внедрять выражения и использовать многострочные строки.

```javascript
const name = 'John';
const greeting = `Привет, ${name}!`;
console.log(greeting); // "Привет, John!"

const multiLine = `
  Это
  многострочная
  строка.
`;
```

**4. Деструктуризация (Destructuring)**

Деструктуризация позволяет распаковывать значения из массивов или объектов в отдельные переменные.

```javascript
// Массивы
const [a, b] = [1, 2];
console.log(a, b); // 1 2

// Объекты
const { name, age } = { name: 'Alice', age: 25 };
console.log(name, age); // "Alice" 25
```

**5. Параметры по умолчанию (Default Parameters)**

Позволяют задавать значения по умолчанию для параметров функций.

```javascript
function greet(name = 'Гость') {
  console.log(`Привет, ${name}!`);
}

greet(); // "Привет, Гость!"
greet('Alice'); // "Привет, Alice!"
```

**6. Оператор распространения (Rest & Spread Operators)**

**Rest Operator (`...`)** собирает остаточные параметры.

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3); // 6
```

**Spread Operator (`...`)** распаковывает элементы массива или объекта.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

**7. Классы (Classes)**

В ES6 введен синтаксис классов, который предоставляет более удобный способ создания объектов и наследования.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} издает звук.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} лает.`);
  }
}

const dog = new Dog('Бобик');
dog.speak(); // "Бобик лает."
```

**8. Модули (Modules)**

ES6 вводит встроенную поддержку модулей, позволяя импортировать и экспортировать код между файлами.

**Экспорт:**

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

**Импорт:**

```javascript
// app.js
import { add, subtract } from './math.js';

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
```

**9. Промисы (Promises)**

Промисы облегчают работу с асинхронным кодом, предоставляя более понятный способ управления асинхронными операциями.

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Данные получены');
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data)) // "Данные получены"
  .catch(error => console.error(error));
```

**10. Итераторы и Генераторы (Iterators & Generators)**

**Итераторы** позволяют обходить элементы коллекций.

```javascript
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**Генераторы** — функции, которые могут приостанавливать и возобновлять своё выполнение.

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**11. Улучшенные литералы объектов (Enhanced Object Literals)**

Позволяют более кратко определять методы и свойства объектов.

```javascript
const name = 'Alice';
const age = 25;

// До ES6
const person = {
  name: name,
  age: age,
  greet: function() {
    console.log('Привет!');
  }
};

// В ES6
const person = {
  name,
  age,
  greet() {
    console.log('Привет!');
  }
};
```

## Сравнение ES5 и ES6

| Особенность          | ES5                                | ES6                                   |
|----------------------|------------------------------------|---------------------------------------|
| Объявление переменных | `var`                              | `let`, `const`                         |
| Функции              | Функциональные выражения и декларации | Стрелочные функции (`=>`)              |
| Объекты              | Ограниченные возможности           | Улучшенные литералы объектов          |
| Массивы              | Новые методы (forEach, map и др.)  | Оператор распространения (`...`)       |
| Классы               | Нет поддержки                      | Синтаксис классов                      |
| Модули               | Нет встроенной поддержки           | Встроенные модули (`import`, `export`) |
| Асинхронность        | Колбэки                            | Промисы, async/await                   |
| Деструктуризация     | Нет                                | Да                                     |
| Шаблонные строки     | Конкатенация строк                  | Шаблонные литералы                     |

## Транспилирование ES6 в ES5

Для обеспечения совместимости ES6 кода с более старыми браузерами, разработчики часто используют транспилеры, такие как **Babel**.

**Установка Babel**

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

**Настройка Babel**

Создайте файл `.babelrc` в корне проекта:

```json
{
  "presets": ["@babel/preset-env"]
}
```

**Транспилирование кода**

```bash
npx babel src --out-dir lib
```

Этот пример транспилирует код из папки `src` и выводит результат в папку `lib`.

## Заключение

ECMAScript 5 и ECMAScript 6 внесли значительные улучшения в JavaScript, делая язык более мощным и удобным для разработки современных веб-приложений. Понимание этих версий ES помогает разработчикам писать эффективный, чистый и поддерживаемый код.

## Дополнительные ресурсы

- [ECMAScript 5.1 Specification](https://www.ecma-international.org/ecma-262/5.1/)
- [ECMAScript 2015 Language Specification](https://www.ecma-international.org/ecma-262/6.0/)
- [MDN Web Docs - ECMAScript 5](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Versions#ECMAScript_5)
- [MDN Web Docs - ECMAScript 6](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import)

```

---

## Связанные

- [[JavaScript]]
- [[AJAX]]
- [[Code Style JavaScript Wrapping and Braces в WebStorm]]
- [[JavaScript]]
- [[Promise]]
- [[Реактивность]]
