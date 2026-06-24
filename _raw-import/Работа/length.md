---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
created: 2025-01-12
date: 2025-01-12
---
В [JavaScript](./JavaScript) `length` — это свойство, которое используется для получения длины, в зависимости от контекста:

1. **[Массив](./Массив)**: возвращает количество элементов в массиве.
   ```javascript
   const arr = [1, 2, 3, 4];
   console.log(arr.length); // 4
   ```

2. **Строка ([../JavaScript/string](#))**: возвращает количество символов в строке.
   ```javascript
   const str = "Hello";
   console.log(str.length); // 5
   ```

3. **[object](./object) типа [Set](./Set), [../JavaScript/Методы/map](#) и т.д.** не используют [length](./length), а вместо этого у них есть свойство [size](#).

   Например, для [Set](./Set):
   ```javascript
   const set = new Set([1, 2, 3]);
   console.log(set.size); // 3
   ```

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
