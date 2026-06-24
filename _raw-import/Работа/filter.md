---
tags:
  - веб-разработка
  - javascript
created: 2024-10-04
date: 2024-10-04
---
*filter* - фильтр 
## Синтаксис

```js
let новый массив = 
	массив.filter(function(элемент, индекс, массив) { 
	код 
	return true или false 
	});
```

## Пример 1

Давайте отфильтруем массив, оставив в нем только положительные числа:

```javascript
let arr = [-2, 5, 1, -5, -1, 1, 3, 4, -1];

let res = arr.filter(function(elem) {
	if (elem >= 0) {
		return true;
	} else {
		return false;
	}
});

console.log(res);
```

Результат выполнения кода: `[5, 1, 1, 3, 4]`

## Пример 2

Сократим код, воспользовавшись [стрелочной функцией](https://code.mu/ru/javascript/book/prime/functions/nested/arrow-functions/):

```js 
let arr = [-2, 5, 1, -5, -1, 1, 3, 4, -1];

let res = arr.filter(elem => {
	if (elem >= 0) {
		return true;
	} else {
		return false;
	}
});
console.log(res);
```
Результат выполнения кода: `[5, 1, 1, 3, 4]`

## Пример 3 

Сократим код, воспользовавшись [сокращением логических операций](https://code.mu/ru/javascript/book/prime/functions/basis/logical-operators/):

```js 
let arr = [-2, 5, 1, -5, -1, 1, 3, 4, -1];
let res = arr.filter(elem => {
	return elem >= 0;
});
console.log(res);
```

Результат выполнения кода: `[5, 1, 1, 3, 4]`

## Пример 4

Сократим код, воспользовавшись особенностями стрелочных функций:

```js
let arr = [-2, 5, 1, -5, -1, 1, 3, 4, -1];
let res = arr.filter(elem => elem > 0);
console.log(res);
```

Результат выполнения кода: `[5, 1, 1, 3, 4]`

## Пример 5

При необходимости в третий параметр можно передать сам массив:

```js 
let res = arr.filter(function(elem, index, arr) {
	тут будет доступен массив arr
});
```

---

## Связанные

- [[map]]
- [[startsWith]]
