---
tags:
  - веб-разработка
  - javascript
created: 2024-10-04
date: 2024-10-04
---
startsWith - *начинается с*
```js
строка.startsWith(что ищем, [начало проверки]);
```
## Пример 1
Проверим, начинается ли строка на заданную подстроку:

```js
let str = 'abcde'; 
let res = str.startsWith('abc'); 

console.log(res);
```

Результат выполнения кода: `true`

## Пример 2
Проверим, начинается ли строка на заданную подстроку:

```js
let str = 'abcde'; 
let res = str.startsWith('xxx'); 

console.log(res);
```

Результат выполнения кода: `false`

## Пример 

Начнем проверку с заданной позиции:
```
0 1 2 3 4
a b c d e
```

```js
let str = 'abcde'; 
let res = str.startsWith('bc', 1); 

console.log(res);
```

Результат выполнения кода: `true`

---

## Связанные

- [[Методы]]
- [[filter]]
- [[map (2)]]
- [[map]]
