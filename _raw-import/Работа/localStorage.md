---
tags:
  - веб-разработка
  - javascript
created: 2023-06-20
date: 2023-06-20
---
`localStorage` — это встроенный объект в [JavaScript](./JavaScript), который позволяет хранить данные в браузере пользователя без срока действия. Данные сохраняются даже после закрытия вкладки или перезагрузки страницы, пока их не удалит сам пользователь или приложение.

Пример использования `localStorage`:

**Сохранение данных в `localStorage`:**
```javascript
localStorage.setItem('username', 'JohnDoe');
```

**Получение данных из `localStorage`:**
```javascript
let username = localStorage.getItem('username');
console.log(username);  // Выведет: JohnDoe
```

**Удаление данных из `localStorage`:**
```javascript
localStorage.removeItem('username');
```

**Очистка всех данных из `localStorage`:**
```javascript
localStorage.clear();
```

**Проверка наличия данных:**
```javascript
if (localStorage.getItem('username') !== null) {
  console.log('Пользователь существует');
} else {
  console.log('Пользователь не найден');
}
```

`localStorage` может хранить только строки, поэтому для работы с объектами нужно использовать JSON:

**Сохранение объекта:**
```javascript
let user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));
```

**Получение объекта:**
```javascript
let retrievedUser = JSON.parse(localStorage.getItem('user'));
console.log(retrievedUser.name);  // Выведет: John
```

---

## Связанные

- [[JavaScript]]
- [[class]]
- [[const vs let vs var]]
- [[Cобеседования на позицию Junior JavaScript (2)]]
- [[Cобеседования на позицию Junior JavaScript]]
- [[float]]
