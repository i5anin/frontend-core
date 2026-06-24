---
tags:
  - веб-разработка
  - javascript
created: 2024-10-13
date: 2024-10-13
---
**Promise** (промис) в [JavaScript](./JavaScript) — это объект, представляющий завершение или неудачу асинхронной операции в будущем. Он позволяет работать с асинхронным кодом, избегая "callback hell" (неудобной вложенности функций обратного вызова).

**Состояния промиса:**

1. **Pending (ожидание)** — начальное состояние, операция ещё не завершена.
2. **Fulfilled (исполнено)** — операция завершена успешно.
3. **Rejected (отклонено)** — операция завершена с ошибкой.

**Как создать промис:**

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Асинхронная операция
  let success = true;

  if (success) {
    resolve("Операция выполнена успешно!");  // Промис выполнен успешно
  } else {
    reject("Ошибка выполнения операции.");  // Промис отклонён
  }
});
```

**Как использовать промис:**

Промис позволяет цепочкой обрабатывать результат или ошибку с помощью методов `.then()` и `.catch()`.

```javascript
myPromise
  .then((message) => {
    console.log(message);  // "Операция выполнена успешно!"
  })
  .catch((error) => {
    console.error(error);  // "Ошибка выполнения операции."
  });
```

**Пример с асинхронной операцией:**

```javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Данные успешно получены!");
  }, 2000);
});

fetchData
  .then((data) => {
    console.log(data);  // "Данные успешно получены!" через 2 секунды
  })
  .catch((error) => {
    console.error(error);
  });
```

**Метод `finally`:**

Метод `finally` выполняется после того, как промис завершится (вне зависимости от того, был он выполнен успешно или отклонён).

```javascript
fetchData
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Операция завершена.");
  });
```

**Преимущества промисов:**
- Промисы помогают избегать глубокой вложенности колбэков.
- Они предоставляют удобный механизм обработки как успешных, так и ошибочных сценариев выполнения асинхронных операций.
- Промисы можно объединять в цепочки, что упрощает работу с последовательными асинхронными операциями.

**Пример цепочки промисов:**

```javascript
fetchData
  .then((data) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Второй этап завершён.");
      }, 1000);
    });
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });
```

**Promise** — это один из самых популярных способов управления асинхронным кодом в [JavaScript](./JavaScript).

---

## Связанные

- [[JavaScript]]
- [[AJAX]]
- [[Code Style JavaScript Wrapping and Braces в WebStorm]]
- [[ES5 & ES6]]
- [[JavaScript]]
- [[Реактивность]]
