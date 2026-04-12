# Синтаксис и типы данных

## Примитивные vs Reference типы

**Примитивные** (хранятся в стеке, копируются по значению):
`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

**Reference** (хранятся в куче, копируется ссылка):
`Object`, `Array`, `Function`, `Map`, `Set`

```js
// Примитив — копируется значение
let a = 5;
let b = a;
b = 10;
console.log(a); // 5

// Reference — копируется ссылка
let obj1 = { name: 'Alice' };
let obj2 = obj1;
obj2.name = 'Bob';
console.log(obj1.name); // 'Bob' — изменилось!
```

## typeof и instanceof

```js
typeof 42;           // 'number'
typeof 'hello';      // 'string'
typeof null;         // 'object' — исторический баг!
typeof [];           // 'object'
typeof function(){}; // 'function'

[] instanceof Array;  // true
[] instanceof Object; // true
null instanceof Object; // false
```

## Явное преобразование типов

```js
Number('42');     // 42
Number(true);     // 1
Number(null);     // 0
Number('text');   // NaN

Boolean('');      // false
Boolean('0');     // true  ← строка не пуста
Boolean([]);      // true  ← массив = объект
Boolean(0);       // false

String(42);       // '42'
String(null);     // 'null'
```

### Falsy значения (всего 6)
`0`, `''`, `null`, `undefined`, `NaN`, `false`

## NaN, Infinity, undefined

```js
NaN === NaN;          // false — уникальное поведение!
Number.isNaN(NaN);    // true  — правильная проверка
typeof NaN;           // 'number'

1 / 0;               // Infinity
0 / 0;               // NaN

let x;
console.log(x);      // undefined
```

## Spread и Rest

```js
// Spread — разворачивает
let arr = [...[1,2], ...[3,4]]; // [1,2,3,4]
let obj = { ...a, ...b };

// Rest — собирает
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// В деструктуризации
let [first, ...rest] = [1, 2, 3, 4];
```

## Деструктуризация

```js
// Массив
let [a, b, c = 10] = [1, 2];
let [head, ...tail] = [1, 2, 3];

// Объект
let { name, age = 30 } = { name: 'Alice' };
let { name: personName } = { name: 'Alice' }; // переименование

// В параметрах функции
function greet({ name, age }) {
  return `${name}, ${age}`;
}
```

## Template Literals

```js
let name = 'Alice';
let str = `Hello, ${name}!`;           // интерполяция
let calc = `Result: ${5 + 5}`;         // выражение
let multiline = `Line 1
Line 2`;                               // многострочная
```

## Symbol и BigInt

```js
// Symbol — уникальный ключ
let sym1 = Symbol('id');
let sym2 = Symbol('id');
sym1 === sym2; // false

// BigInt — большие числа
let big = 9007199254740992n;
10n + 20n; // 30n
// 10n + 10 — TypeError! Нельзя смешивать
```

## Map vs Object

```js
// Object — ключи всегда строки
let obj = {};
obj[0] = 'a'; // ключ становится '0'

// Map — ключи любого типа
let map = new Map();
map.set(0, 'a');    // ключ число 0
map.set({}, 'val'); // ключ объект
map.size;           // 2
```
