---
tags:
  - веб-разработка
  - javascript
  - api
  - backend
created: 2024-10-20
date: 2024-10-20
---
REST API 
Representational State Transfer Application Programming Interface — это архитектурный стиль для построения веб-сервисов, использующий стандартные [HTTP](./HTTP) методы ([GET](./GET), [POST](#), [PUT](#), [DELETE](#)) для взаимодействия с ресурсами. Основные принципы REST включают статeless (без состояния), клиент-серверную архитектуру и использование понятных URL для идентификации ресурсов.

Пример REST API запросов:

**Пример REST API на сервере (используя [Express.js](./Express.js))**

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Для обработки JSON данных

// GET запрос для получения всех пользователей
app.get('/api/users', (req, res) => {
    res.send([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

// GET запрос для получения пользователя по ID
app.get('/api/users/:id', (req, res) => {
    const user = { id: req.params.id, name: 'John' };
    res.send(user);
});

// POST запрос для добавления нового пользователя
app.post('/api/users', (req, res) => {
    const user = { id: 3, name: req.body.name };
    res.status(201).send(user);
});

// PUT запрос для обновления информации о пользователе
app.put('/api/users/:id', (req, res) => {
    const user = { id: req.params.id, name: req.body.name };
    res.send(user);
});

// DELETE запрос для удаления пользователя
app.delete('/api/users/:id', (req, res) => {
    res.send({ message: `User with id ${req.params.id} deleted` });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

**Пример запросов к REST API с помощью `fetch` на стороне клиента:**

```javascript
// Получение всех пользователей
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Получение пользователя по ID
fetch('/api/users/1')
  .then(response => response.json())
  .then(data => console.log(data));

// Добавление нового пользователя
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'New User' })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Обновление информации о пользователе
fetch('/api/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Updated User' })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Удаление пользователя
fetch('/api/users/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

В этих примерах реализована базовая REST API структура для управления пользователями.

---

## Связанные

- [[APIs]]
- [[Fetch API]]
- [[Telegram API (2)]]
- [[Telegram API]]
