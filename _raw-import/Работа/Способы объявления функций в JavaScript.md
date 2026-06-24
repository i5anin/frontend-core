---
tags:
  - веб-разработка
  - javascript
  - backend
created: 2025-01-12
date: 2025-01-12
---
Функции в [JavaScript](./JavaScript) можно объявлять различными способами в зависимости от контекста и задач. Вот основные подходы:

---

**1. **Function Declaration** (Объявление функции)**

Функция определяется с именем и доступна во всем блоке, где она объявлена (поддержка hoisting).

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

---

**2. **Function Expression** (Функциональное выражение)**

Функция присваивается переменной и не доступна до присвоения.

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

---

**3. **Arrow Function** (Стрелочная функция)**

Краткий синтаксис. Не имеет собственного `this`, `arguments`, и не поддерживает `hoisting`.

```javascript
const greet = (name) => `Hello, ${name}!`;
```

- Если только один аргумент, скобки можно опустить.
- Если только одно выражение, тело можно записать в одну строку.

---

**4. **Anonymous Function** (Анонимная функция)**

Функция без имени. Используется для коллбеков.

```javascript
setTimeout(function() {
  console.log('Executed after 1 second');
}, 1000);
```

---

**5. **Immediately Invoked Function Expression (IIFE)** (Немедленно вызываемое функциональное выражение)**

Функция, которая вызывается сразу после объявления.

```javascript
(function() {
  console.log('IIFE executed!');
})();
```

---

**6. **Generator Function****

Позволяет приостанавливать выполнение с помощью `yield`.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
```

---

**7. **Async Function****

Асинхронная функция для работы с промисами.

```javascript
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
};
```

---

**8. **Object Method** (Методы объекта)**

Функции, объявленные как методы объекта.

```javascript
const user = {
  greet(name) {
    return `Hello, ${name}!`;
  }
};
```

---

**9. **Class Method** (Методы класса)**

Функции, объявленные внутри класса.

```javascript
class User {
  greet(name) {
    return `Hello, ${name}!`;
  }
}
```

---

**10. **Dynamic Function (Function Constructor)****

Создание функций через конструктор `Function` (редко используется).

```javascript
const add = new Function('a', 'b', 'return a + b');
console.log(add(2, 3)); // 5
```

Каждый способ имеет свои особенности и области применения. Выбор зависит от задачи, контекста и предпочтений.

---

## Связанные

- [[General]]
- [[Вложенные функции]]
- [[Замыкание в JavaScript проверка]]
- [[Замыкание в JavaScript]]
- [[Замыкание]]
- [[Именованные и неименованные параметры функций в JavaScript и axios]]
