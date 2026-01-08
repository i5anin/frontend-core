# Памятка по типам данных JavaScript

## 1. Перечень типов

Всего 8 типов:

**Примитивы:**  
`number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`

**Ссылочный:**  
`object`

---

## 2. Примитивы

### number

IEEE-754.  
`NaN !== NaN`, есть `Infinity`, `-Infinity`, `-0`.  
`Number.MAX_SAFE_INTEGER = 9007199254740991`.

### bigint

Целые произвольной длины.  
Нельзя смешивать с `number`.

### string

UTF-16.  
`.length` → количество кодовых единиц, emoji = 2.

### boolean

`true` / `false`.

### null

Осмысленное отсутствие.  
`typeof null === 'object'` (ошибка стандарта).

### undefined

Отсутствие значения как факта.

### symbol

Уникальный ключ. Не перечисляется стандартными циклами.

---

## 3. object и его подвиды

Все ниже — `object`:

- обычный объект `{}`;
    
- массив `[]`;
    
- функция `function(){}`, `()=>{}`;
    
- `Date`, `RegExp`, `Error`;
    
- `Map`, `Set`, `WeakMap`, `WeakSet`;
    
- `ArrayBuffer`, `TypedArray`.
    

Проверки:  
`Array.isArray(value)` — массив;  
`typeof fn === 'function'` — функция;  
`value instanceof Date` — объект конкретного класса.

---

## 4. typeof — таблица

```
number      → typeof 1
bigint      → typeof 1n
string      → typeof 'x'
boolean     → typeof true
undefined   → typeof undefined
symbol      → typeof Symbol()
object      → typeof {}, [], null
function    → typeof function(){}
```

---

## 5. Проверка типов

- строка: `typeof v === 'string'`
    
- число: `typeof v === 'number' && Number.isFinite(v)`
    
- bigint: `typeof v === 'bigint'`
    
- boolean: `typeof v === 'boolean'`
    
- undefined: `typeof v === 'undefined'`
    
- null: `v === null`
    
- объект: `typeof v === 'object' && v !== null`
    
- массив: `Array.isArray(v)`
    
- NaN: `Number.isNaN(v)`
    

---

## 6. Приведение типов

### Булево (truthy/falsy)

Falsy: `false`, `0`, `-0`, `NaN`, `''`, `null`, `undefined`.  
Все остальные значения — truthy, включая: `'0'`, `'false'`, `[]`, `{}`.

### В строку

Оператор `+` со строкой → строка.  
Объект → через `valueOf()` → `toString()`.

### В число

`Number()` превращает:  
`'10' → 10`, `'' → 0`, `'5 ' → 5`, `null → 0`, `undefined → NaN`, `true → 1`, `'10px' → NaN`.  
Арифметика (`-`, `*`, `/`) приводит к числу.

---

## 7. Сравнения

### Жёсткое

`===` сравнивает без приведения.

### Нестрогое

`==` с приведением. Известные ловушки:  
`0 == ''`, `'' == false`, `[1] == 1`, `null == undefined`.

### Object.is

Точный эквивалент:  
`Object.is(NaN, NaN)` → `true`;  
`Object.is(0, -0)` → `false`.

---

## 8. Optional chaining и nullish

`user?.profile?.email` — безопасный доступ.  
`x ?? y` — выбирает `y` только если `x` — `null` или `undefined`.

Отличие от `||`:  
`0 || 5 → 5`,  
`0 ?? 5 → 0`.

---

## 9. Коллекции

### Array

Упорядоченный список, динамическая длина.

### Map

Ключи любых типов, порядок вставки сохраняется.

### Set

Уникальные значения.

### WeakMap / WeakSet

Хранение только объектных ссылок без предотвращения GC. Нет перечисления.

---

## 10. Функции и классы

Функция — объект с возможностью вызова:  
`typeof (()=>{}) === 'function'`.

Класс — синтаксический сахар над функцией:  
`class A {}; typeof A === 'function'`.

Экземпляр:  
`obj instanceof A`.

---

## 11. Практические правила

- Примитивы проверять через `typeof`, `=== null`, `Number.is*`.
    
- Массив — только `Array.isArray`.
    
- Классы — через `instanceof`.
    
- `===` использовать всегда; `==` избегать.
    
- Для точных больших чисел → `bigint`.
    
- Унифицировать использование `null`/`undefined` в проекте.
    
- Не использовать `new Number/String/Boolean`.
    

