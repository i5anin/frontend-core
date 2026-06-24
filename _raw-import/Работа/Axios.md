---
tags:
  - веб-разработка
  - html
  - javascript
  - npm
  - api
created: 2024-10-13
date: 2024-10-13
---
**Axios** — это популярная JavaScript-библиотека, которая используется для выполнения HTTP-запросов (например, GET, POST, PUT, DELETE) из браузера или Node.js. Axios позволяет легко работать с API, отправлять и получать данные с сервера, а также обрабатывать асинхронные запросы с использованием промисов.

**Основные возможности Axios:**
- Поддержка всех HTTP-методов (GET, POST, PUT, DELETE и др.).
- Работает как в браузере, так и на сервере с использованием Node.js.
- Автоматическое преобразование данных в формат JSON и из него.
- Удобная работа с промисами.
- Возможность настройки заголовков запроса.
- Обработка ошибок.
- Поддержка конфигурации и настройки тайм-аутов.
- Возможность работы с запросами, требующими аутентификации (например, с использованием токенов).

**Установка Axios:**

1. **Через npm (для Node.js или проектов с модульной системой):**
   ```bash
   npm install axios
   ```

2. **Через CDN (для использования в браузере):**
   Добавьте ссылку в ваш HTML-файл:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   ```

**Пример использования Axios:**

**Пример 1: GET-запрос**
```javascript
axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response.data);  // Здесь обрабатывается успешный ответ
  })
  .catch(error => {
    console.error('Ошибка:', error);  // Обработка ошибок
  });
```

В этом примере выполняется GET-запрос к публичному API, и данные (JSON) выводятся в консоль. В случае ошибки будет выполнена обработка ошибки в блоке `catch`.

**Пример 2: POST-запрос**
```javascript
axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'Новое сообщение',
  body: 'Это пример POST-запроса',
  userId: 1
})
  .then(response => {
    console.log('Ответ:', response.data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
```

Здесь создается новый ресурс с помощью метода POST и отправляется объект данных на сервер.

**Пример 3: Настройка заголовков**
Иногда требуется отправить запрос с дополнительными заголовками, например, для аутентификации:

```javascript
axios.get('https://jsonplaceholder.typicode.com/posts', {
  headers: {
    'Authorization': 'Bearer my-token'
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
```

**Пример 4: Отправка нескольких запросов с использованием `axios.all()`**
Axios поддерживает выполнение нескольких запросов одновременно:

```javascript
axios.all([
  axios.get('https://jsonplaceholder.typicode.com/posts'),
  axios.get('https://jsonplaceholder.typicode.com/users')
])
  .then(axios.spread((postsResponse, usersResponse) => {
    console.log('Посты:', postsResponse.data);
    console.log('Пользователи:', usersResponse.data);
  }))
  .catch(error => {
    console.error('Ошибка:', error);
  });
```

**Пример использования Axios в Vue.js:**
Axios часто используется в Vue.js для выполнения запросов к API и обработки данных.

```vue
<template>
  <div>
    <h1>Список постов</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.error('Ошибка при загрузке постов:', error);
      });
  }
};
</script>
```

**Как это работает:**
1. В компоненте Vue.js в хук `created()` отправляется GET-запрос с помощью Axios.
2. Полученные данные сохраняются в массив `posts`.
3. В шаблоне данные выводятся с помощью директивы `v-for`.

**Настройка Axios по умолчанию:**
Вы можете настроить глобальные параметры для всех запросов, например, указать базовый URL или заголовки:

```javascript
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'Bearer my-token';
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

**Обработка ошибок:**
Axios автоматически обрабатывает HTTP-ошибки (например, 404 или 500), и вы можете использовать блоки `catch` для работы с ними.

```javascript
axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) {
      // Сервер вернул ответ с кодом ошибки
      console.error('Ошибка сервера:', error.response.status);
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error('Ошибка запроса:', error.request);
    } else {
      // Произошла ошибка при настройке запроса
      console.error('Ошибка:', error.message);
    }
  });
```

**Итог:**
- **Axios** — это удобная библиотека для выполнения HTTP-запросов, которая поддерживает все основные HTTP-методы и работает с промисами.
- Она часто используется в современных JavaScript-фреймворках, таких как Vue.js, React и Angular, для взаимодействия с внешними API и серверными приложениями.
- Axios позволяет легко обрабатывать ответы, ошибки и настраивать запросы для различных целей, таких как аутентификация и работа с JSON-данными.

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
