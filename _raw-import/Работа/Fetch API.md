---
tags:
  - веб-разработка
  - javascript
  - api
created: 2024-10-20
date: 2024-10-20
---
Fetch API — это современный интерфейс [JavaScript](./JavaScript) для выполнения HTTP-запросов. Он предоставляет мощный и гибкий способ для отправки запросов на сервер и получения ответов, заменяя устаревший `XMLHttpRequest`. Основное преимущество [Fetch API](./Fetch API) заключается в том, что он работает на основе **[промисов](Promise)**, что упрощает работу с асинхронными операциями.

Основные моменты:

- **Асинхронность**: [Fetch API](./Fetch API) использует промисы, что упрощает обработку запросов без блокирования основной программы.
- **Поддержка всех типов запросов**: можно выполнять запросы [GET](./GET), [POST](#), [PUT](#), [DELETE](#) и другие.
- **Поддержка CORS (Cross-Origin Resource Sharing)**: Fetch API поддерживает запросы между разными источниками.
- **Ответ в виде потоков**: поддерживает работу с потоковыми данными, что позволяет загружать данные по частям.

Пример запроса с Fetch API:

```javascript
fetch('https://example.com/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
```

В этом примере:

1. `fetch` отправляет HTTP-запрос на сервер по указанному URL.
2. Первый `.then()` обрабатывает ответ: проверяет статус запроса и, если всё в порядке, конвертирует ответ в JSON.
3. Второй `.then()` работает с полученными данными.
4. `.catch()` обрабатывает возможные ошибки, например, проблемы с сетью или сервером.

Fetch API также поддерживает более сложные запросы, такие как отправка данных на сервер с методом POST:

```javascript
fetch('https://example.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Иван', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

Этот код отправляет POST-запрос с JSON-данными на сервер.

---

## Связанные

- [[APIs]]
- [[REST API]]
- [[Telegram API (2)]]
- [[Telegram API]]
