---
tags:
  - веб-разработка
  - javascript
created: 2024-10-13
date: 2024-10-13
---
В [JavaScript](./JavaScript) строка ([string](../Архив/string)) — это примитивный тип данных, который представляет собой последовательность символов, используемую для хранения и обработки текстовой информации.

**Как создать строку**
Строки можно создавать с помощью:
- Одинарных кавычек:
  ```javascript
  const str1 = 'Привет';
  ```
- Двойных кавычек:
  ```javascript
  const str2 = "Мир";
  ```
- Косых кавычек (шаблонные строки), которые поддерживают интерполяцию:
  ```javascript
  const name = "Аня";
  const greeting = `Привет, ${name}!`; // Привет, Аня!
  ```

**Операции со строками**
1. **Конкатенация**: можно объединять строки с помощью оператора `+`.
   ```javascript
   const fullName = "Иван" + " " + "Иванов";
   ```

2. **Доступ к символам**: символы строки можно получить через индекс.
   ```javascript
   const str = "Hello";
   console.log(str[0]); // 'H'
   ```

3. **Методы для работы со строками**:
   - `length` — возвращает длину строки.
   - `toUpperCase()` — приводит строку к верхнему регистру.
   - `toLowerCase()` — приводит строку к нижнему регистру.
   - `slice(start, end)` — возвращает подстроку.
   - `replace(searchValue, newValue)` — заменяет часть строки.

Пример:
```javascript
const text = "Hello, World!";
console.log(text.length); // 13
console.log(text.toUpperCase()); // "HELLO, WORLD!"
```

---

## Связанные

- [[JavaScript]]
- [[class]]
- [[const vs let vs var]]
- [[Cобеседования на позицию Junior JavaScript]]
- [[float]]
