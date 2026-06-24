---
tags:
  - веб-разработка
  - javascript
  - api
  - state-management
created: 2024-10-14
date: 2024-10-14
---
**#### 1. **Именованные [параметры](#)****
Именованные параметры позволяют более явно указывать аргументы функции, используя объект, в котором ключи выступают в качестве названий параметров.

**Пример использования в [функция](./function):**
```javascript
function fetchData({ url, method = 'GET', headers = {} }) {
  return axios({
    url,
    method,
    headers
  });
}

fetchData({
  url: '/api/data',
  method: 'POST',
  headers: {
    Authorization: 'Bearer token'
  }
});
```

**2. **Неименованные [параметр](#)ы (позиционные параметры)****
Такие параметры передаются функции в порядке их объявления.

**Пример:**
```javascript
function fetchData(url, method = 'GET') {
  return axios({
    url,
    method
  });
}

fetchData('/api/data', 'POST');
```

**3. **Использование с [axios](#) ****
[axios](#) поддерживает передачу параметров через объект конфигурации. Это позволяет гибко использовать именованные параметры.

```javascript
axios({
  url: '/api/data',
  method: 'POST',
  headers: {
    Authorization: 'Bearer token'
  },
  data: { key: 'value' }
});
```



---

## Связанные

- [[General]]
- [[Вложенные функции]]
- [[Замыкание в JavaScript проверка]]
- [[Замыкание в JavaScript]]
- [[Замыкание]]
- [[Импортируем необходимые функции из Pinia]]
