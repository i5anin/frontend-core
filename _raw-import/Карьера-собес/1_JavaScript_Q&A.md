---
tags:
  - карьера
  - javascript
created: 2026-04-24
date: 2026-04-24
---
# Senior Frontend Interview: JavaScript Q&A

## РАЗДЕЛ 1: Синтаксис и типы данных (12 вопросов)

**Вопрос 1.1: Что такое примитивные типы vs reference типы в JavaScript? Как происходит копирование?**

**Модель ответа:**
В JavaScript есть две категории типов: примитивные (значения) и ссылочные (объекты). Они различаются способом хранения в памяти и поведением при копировании.

**Основные моменты:**

1. **Примитивные типы (6 типов):**
   - number, string, boolean, null, undefined, symbol, bigint
   - Хранятся в стеке (stack)
   - При присваивании копируется само значение
   - Небольшой размер в памяти

2. **Reference типы (объекты):**
   - Object, Array, Function, Map, Set, Date и т.д.
   - Хранятся в куче (heap)
   - При присваивании копируется только ссылка (адрес в памяти)
   - Большой размер в памяти

3. **Примеры копирования:**
```javascript
// Примитивные типы - копируется значение
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (не изменилось)
console.log(b); // 10

// Reference типы - копируется ссылка
let obj1 = { name: 'Alice' };
let obj2 = obj1;
obj2.name = 'Bob';
console.log(obj1.name); // 'Bob' (изменилось!)
console.log(obj2.name); // 'Bob'

// Так работает переменная obj2 - она указывает на ТО ЖЕ место в памяти
obj2 = { name: 'Charlie' }; // Теперь obj2 указывает на новый объект
console.log(obj1.name); // 'Bob' (obj1 остался прежним)
```

4. **Проверка типов:**
```javascript
typeof 5;           // 'number'
typeof 'hello';     // 'string'
typeof true;        // 'boolean'
typeof undefined;   // 'undefined'
typeof Symbol();    // 'symbol'
typeof 100n;        // 'bigint'

typeof {};          // 'object'
typeof [];          // 'object' (массив это объект!)
typeof null;        // 'object' (исторический баг)
typeof function(){}; // 'function'

// Для точной проверки используйте instanceof
[] instanceof Array; // true
{} instanceof Object; // true
```

**Ключевые точки:**
- Примитивы копируются по значению, объекты по ссылке
- null имеет тип 'object' - это историческая ошибка в JavaScript
- Две переменные, указывающие на один объект, делят одни данные
- При присвоении нового объекта старая ссылка не изменяется

**Контрольная точка:** Можете ли вы объяснить, почему `console.log(typeof null)` вернет 'object'?

---

**Вопрос 1.2: Как работают typeof и instanceof? В чем их разница?**

**Модель ответа:**
typeof и instanceof - это два разных оператора проверки типов в JavaScript. Они работают на разных уровнях и используются в разных ситуациях.

**Основные моменты:**

1. **typeof оператор:**
   - Возвращает строку с названием типа
   - Работает для всех типов (примитивы и объекты)
   - Возвращает: 'number', 'string', 'boolean', 'undefined', 'symbol', 'bigint', 'object', 'function'

2. **instanceof оператор:**
   - Проверяет наличие конструктора в цепочке прототипов
   - Работает только для объектов
   - Возвращает true/false
   - Проверяет: obj instanceof Constructor

3. **Практические различия:**
```javascript
// typeof - для базовых типов
typeof 42;                    // 'number'
typeof 'hello';               // 'string'
typeof true;                  // 'boolean'
typeof undefined;             // 'undefined'
typeof Symbol('id');          // 'symbol'

// instanceof - для проверки конструктора
let arr = [1, 2, 3];
arr instanceof Array;         // true
arr instanceof Object;        // true (Array наследует Object)

let date = new Date();
date instanceof Date;         // true
date instanceof Object;       // true

// typeof может быть обманчивым
typeof null;                  // 'object' (баг!)
typeof [];                    // 'object' (это массив)
typeof {};                    // 'object' (это объект)

// instanceof точнее:
null instanceof Object;       // false
[] instanceof Array;          // true
{} instanceof Object;         // true

// typeof for functions
typeof function(){};          // 'function'
let fn = () => {};
fn instanceof Function;       // true
```

4. **Проверка типов на практике:**
```javascript
// Правильная проверка типов
function checkType(value) {
  if (value === null) return 'null';
  if (typeof value !== 'object') return typeof value;
  if (value instanceof Array) return 'Array';
  if (value instanceof Date) return 'Date';
  if (value instanceof Map) return 'Map';
  return 'Object';
}

checkType(42);      // 'number'
checkType(null);    // 'null'
checkType([]);      // 'Array'
checkType({});      // 'Object'
```

**Ключевые точки:**
- typeof возвращает строку, instanceof возвращает boolean
- typeof работает для примитивов, instanceof для объектов
- null имеет тип 'object' - используйте точную проверку `value === null`
- instanceof проверяет цепочку прототипов
- typeof undefined никогда не выбросит ошибку, даже если переменная не объявлена

**Контрольная точка:** Как проверить, что переменная содержит именно Array, а не Object?

---

**Вопрос 1.3: Как работает явное преобразование типов? Что такое Number(), String(), Boolean()?**

**Модель ответа:**
Явное преобразование типов позволяет конвертировать значение из одного типа в другой. Это важно для контроля над типами и избегания неожиданного поведения.

**Основные моменты:**

1. **Number() - преобразование в число:**
```javascript
Number('42');         // 42
Number('3.14');       // 3.14
Number(true);         // 1
Number(false);        // 0
Number(null);         // 0
Number(undefined);    // NaN
Number('hello');      // NaN
Number('');           // 0
Number('  123  ');    // 123 (пробелы игнорируются)
```

2. **String() - преобразование в строку:**
```javascript
String(42);           // '42'
String(true);         // 'true'
String(false);        // 'false'
String(null);         // 'null'
String(undefined);    // 'undefined'
String([1, 2, 3]);    // '1,2,3'
String({a: 1});       // '[object Object]'
```

3. **Boolean() - преобразование в логическое значение:**
```javascript
Boolean(1);           // true
Boolean(0);           // false
Boolean('');          // false
Boolean('hello');     // true
Boolean(null);        // false
Boolean(undefined);   // false
Boolean([]);          // true (массив это объект!)
Boolean({});          // true (объект это объект!)
```

4. **Особенные случаи и Falsy значения:**
```javascript
// Falsy значения (преобразуются в false)
Boolean(0);           // false
Boolean('');          // false
Boolean(null);        // false
Boolean(undefined);   // false
Boolean(NaN);         // false
Boolean(false);       // false

// Все остальные значения - Truthy
Boolean(1);           // true
Boolean('0');         // true (строка '0' это не число 0!)
Boolean(42);          // true
Boolean('false');     // true (строка это объект!)
Boolean([]);          // true (пустой массив)
Boolean({});          // true (пустой объект)
```

5. **Методы преобразования чисел:**
```javascript
// parseInt - разбор целого числа
parseInt('42');       // 42
parseInt('42.5');     // 42 (остаток игнорируется)
parseInt('42px');     // 42 (парсит до первого не-цифрового символа)
parseInt('hello');    // NaN
parseInt('ff', 16);   // 255 (в 16-ичной системе)

// parseFloat - разбор числа с точкой
parseFloat('3.14');   // 3.14
parseFloat('3.14.5'); // 3.14

// toFixed - округление до N знаков
(3.14159).toFixed(2); // '3.14'
(42).toFixed(2);      // '42.00'
```

**Ключевые точки:**
- Number(null) возвращает 0, Number(undefined) возвращает NaN
- Пустая строка '' преобразуется в 0, а строка '0' в число 0
- Boolean([]) и Boolean({}) возвращают true (это объекты!)
- Falsy значений всего 6: 0, '', null, undefined, NaN, false
- parseInt и parseFloat более мягкие, чем Number()

**Контрольная точка:** Почему Boolean('0') возвращает true, а Number('0') возвращает 0?

---

**Вопрос 1.4: Что такое NaN, Infinity и undefined? Как их различить и использовать?**

**Модель ответа:**
NaN, Infinity и undefined - это специальные значения в JavaScript, которые имеют особое поведение и требуют аккуратной обработки.

**Основные моменты:**

1. **undefined - "нет значения":**
   - Означает, что значение не определено или отсутствует
   - Возвращается функциями без return
   - Значение параметров, которые не были переданы
   - Значение свойств, которые не существуют

2. **NaN - "Not a Number":**
   - Означает невалидное числовое значение
   - Результат невалидных математических операций
   - Уникальное свойство: NaN !== NaN
   - Нужна специальная проверка Number.isNaN()

3. **Infinity - бесконечность:**
   - Результат деления на ноль
   - Очень большое число (больше Number.MAX_VALUE)
   - Есть также -Infinity

4. **Примеры:**
```javascript
// undefined
let x;
console.log(x);       // undefined

function test() {}
test();               // undefined

const obj = {};
obj.missing;          // undefined

// NaN
0 / 0;                // NaN
Number('hello');      // NaN
Math.sqrt(-1);        // NaN
undefined + 5;        // NaN

// Неправильная проверка
NaN === NaN;          // false!!! (не работает)
typeof NaN;           // 'number' (NaN это число по типу!)

// Правильная проверка
Number.isNaN(NaN);    // true
isNaN(NaN);           // true
isNaN('hello');       // true (приводит к Number сначала)

// Infinity
1 / 0;                // Infinity
-1 / 0;               // -Infinity
Number.MAX_VALUE * 2; // Infinity
```

5. **Поведение в операциях:**
```javascript
// undefined в операциях
undefined + 5;        // NaN
undefined * 2;        // NaN
'hello' + undefined;  // 'hellounde

efined'

// NaN в операциях
NaN + 5;              // NaN
NaN * 2;              // NaN
NaN === NaN;          // false

// Infinity в операциях
Infinity + 5;         // Infinity
Infinity * 2;         // Infinity
Infinity / Infinity;  // NaN
0 * Infinity;         // NaN
```

**Ключевые точки:**
- undefined значит "нет значения", NaN значит "невалидное число"
- NaN является уникальным: NaN !== NaN, используйте Number.isNaN()
- typeof undefined === 'undefined', typeof NaN === 'number'
- Infinity возвращается при делении на ноль
- Проверка: `value === undefined` и `Number.isNaN(value)`

**Контрольная точка:** Почему NaN !== NaN?

---

**Вопрос 1.5: Что такое Spread operator и Rest parameters? В чем их разница?**

**Модель ответа:**
Spread operator и Rest parameters используют одинаковый синтаксис `...`, но работают в разных контекстах. Spread разворачивает, Rest собирает.

**Основные моменты:**

1. **Spread operator (разворачивает):**
   - Разворачивает массив в отдельные элементы
   - Разворачивает объект в отдельные пары ключ-значение
   - Используется в вызовах функций и литералах

2. **Rest parameters (собирает):**
   - Собирает несколько аргументов в один массив
   - Используется в параметрах функций
   - Должен быть последним параметром

3. **Примеры со Spread:**
```javascript
// Spread в массивах
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Spread в функциях
function sum(a, b, c) {
  return a + b + c;
}
let numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Spread в объектах
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3 };
let merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3 }

// Shallow copy
let original = { name: 'Alice' };
let copy = { ...original };
copy.name = 'Bob';
console.log(original.name); // 'Alice' (не изменился)
```

4. **Примеры с Rest:**
```javascript
// Rest в функциях
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Rest с другими параметрами
function introduce(name, ...hobbies) {
  console.log(name); // 'Alice'
  console.log(hobbies); // ['reading', 'coding']
}
introduce('Alice', 'reading', 'coding');

// Rest может быть только последним
function test(a, ...rest, b) {} // SyntaxError!

// Rest в деструктуризации
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]
```

5. **Сравнение arguments vs Rest:**
```javascript
// arguments (старый способ)
function oldSum() {
  console.log(arguments); // ArrayLike объект, не массив
  console.log(Array.isArray(arguments)); // false
}

// Rest parameters (новый способ)
function newSum(...numbers) {
  console.log(numbers); // Обычный массив
  console.log(Array.isArray(numbers)); // true
}
```

**Ключевые точки:**
- Spread разворачивает (раскрывает) массивы и объекты
- Rest собирает (собирает) множество аргументов в массив
- Rest должен быть последним параметром
- Spread создает shallow copy (поверхностную копию)
- Rest в функциях заменил arguments объект

**Контрольная точка:** Как скопировать объект так, чтобы изменения в копии не влияли на оригинал?

---

**Вопрос 1.6: Как работает деструктуризация объектов и массивов?**

**Модель ответа:**
Деструктуризация позволяет распаковать значения из массивов или свойства из объектов в отдельные переменные.

**Основные моменты:**

1. **Деструктуризация массивов:**
```javascript
// Базовая
let [a, b, c] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// Пропуск элементов
let [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3

// Rest в деструктуризации
let [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// Значения по умолчанию
let [x = 10, y = 20] = [5];
console.log(x); // 5
console.log(y); // 20
```

2. **Деструктуризация объектов:**
```javascript
// Базовая
let { name, age } = { name: 'Alice', age: 30 };
console.log(name); // 'Alice'
console.log(age); // 30

// Переименование
let { name: personName, age: personAge } = { name: 'Alice', age: 30 };
console.log(personName); // 'Alice'

// Значения по умолчанию
let { name, country = 'USA' } = { name: 'Alice' };
console.log(country); // 'USA'

// Вложенная деструктуризация
let { user: { name, email } } = {
  user: { name: 'Alice', email: 'alice@example.com' }
};
console.log(name); // 'Alice'
console.log(email); // 'alice@example.com'
```

3. **В функциях:**
```javascript
// Параметры функции
function greet({ name, age }) {
  console.log(`${name} is ${age}`);
}
greet({ name: 'Alice', age: 30 }); // Alice is 30

// Частичная деструктуризация
function printPoint({ x, y, z = 0 }) {
  console.log(x, y, z);
}
printPoint({ x: 1, y: 2 }); // 1 2 0
```

4. **Обмен переменных:**
```javascript
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

**Ключевые точки:**
- Деструктуризация читается слева направо
- Можно использовать значения по умолчанию
- Rest можно использовать в деструктуризации
- В объектах порядок не важен, важны имена ключей
- Очень полезно в параметрах функций

**Контрольная точка:** Как деструктуризировать объект и переименовать свойство?

---

**Вопрос 1.7: Как работают шаблонные строки (Template Literals)? Что такое интерполяция?**

**Модель ответа:**
Template literals (обратные кавычки) позволяют создавать строки с переменными и сложным форматированием.

**Основные моменты:**

1. **Базовый синтаксис:**
```javascript
// Обычные строки
let str1 = 'Hello';  // одинарные кавычки
let str2 = "World";  // двойные кавычки

// Template literals (обратные кавычки)
let name = 'Alice';
let str3 = `Hello, ${name}!`; // Hello, Alice!
let str4 = `Line 1
Line 2
Line 3`; // Многострочные без \n
```

2. **Интерполяция (подстановка переменных):**
```javascript
let x = 10;
let y = 20;
console.log(`${x} + ${y} = ${x + y}`); // 10 + 20 = 30

let user = { name: 'Alice', age: 30 };
console.log(`${user.name} is ${user.age}`); // Alice is 30

// Вызов функций внутри
function getAge() { return 30; }
console.log(`Age: ${getAge()}`); // Age: 30

// Тернарный оператор
let status = true;
console.log(`Status: ${status ? 'active' : 'inactive'}`); // Status: active
```

3. **Tagged templates (тегированные шаблоны):**
```javascript
function myTag(strings, ...values) {
  console.log(strings); // ['Hello ', ' is ', '']
  console.log(values);  // ['Alice', 30]
  
  return strings[0] + values[0].toUpperCase() + 
         strings[1] + values[1] + strings[2];
}

let name = 'Alice';
let age = 30;
console.log(myTag`Hello ${name} is ${age}`); 
// Hello ALICE is 30
```

4. **HTML с template literals:**
```javascript
let title = 'My Page';
let content = 'Hello World';

let html = `
  <div class="container">
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`;

document.body.innerHTML = html;
```

**Ключевые точки:**
- Template literals используют обратные кавычки (``)
- Интерполяция через ${выражение}
- Внутри можно вызывать функции и выполнять операции
- Поддерживают многострочные строки без \n
- Tagged templates позволяют обработать строку перед возвратом

**Контрольная точка:** Как использовать функцию внутри template literal?

---

**Вопрос 1.8: Как работать со строками? Какие методы есть и как избежать проблем производительности?**

**Модель ответа:**
Строки в JavaScript имеют много методов для манипуляции. Важно знать, какие методы изменяют исходную строку, а какие нет.

**Основные моменты:**

1. **Основные методы строк:**
```javascript
let str = 'Hello World';

// Информация о строке
str.length;           // 11
str[0];               // 'H'
str.charAt(0);        // 'H'
str.charCodeAt(0);    // 72

// Поиск
str.indexOf('o');     // 4
str.lastIndexOf('o'); // 7
str.includes('World'); // true
str.startsWith('Hello'); // true
str.endsWith('World');   // true

// Получение подстроки
str.substring(0, 5);  // 'Hello'
str.substr(0, 5);     // 'Hello' (deprecated)
str.slice(0, 5);      // 'Hello'
str.slice(-5);        // 'World'

// Преобразование регистра
str.toUpperCase();    // 'HELLO WORLD'
str.toLowerCase();    // 'hello world'

// Замена
str.replace('World', 'JavaScript'); // 'Hello JavaScript'
str.replaceAll('l', 'L'); // 'HeLLo WorLd'

// Разделение
str.split(' ');       // ['Hello', 'World']
str.split('');        // ['H','e','l','l','o',' ','W','o','r','l','d']

// Объединение
'Hello'.concat(' ', 'World'); // 'Hello World'

// Повтор
'abc'.repeat(3);      // 'abcabcabc'

// Удаление пробелов
'  hello  '.trim();   // 'hello'
'  hello  '.trimStart(); // 'hello  '
'  hello  '.trimEnd(); // '  hello'

// Заполнение
'5'.padStart(3, '0'); // '005'
'5'.padEnd(3, '0');   // '500'
```

2. **Строки неизменяемы (Immutable):**
```javascript
let str = 'Hello';
str[0] = 'J'; // Не сработает!
console.log(str); // 'Hello'

// Правильно:
str = 'J' + str.slice(1); // 'Jello'
```

3. **Производительность:**
```javascript
// Плохо: конкатенация в цикле
let result = '';
for (let i = 0; i < 10000; i++) {
  result += 'text'; // Создает новую строку каждый раз
}

// Хорошо: использовать массив
let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push('text');
}
let result = arr.join('');

// Хорошо: template literal
let result = `...`;
```

4. **Регулярные выражения:**
```javascript
let str = 'hello123world456';
str.match(/\d+/g);      // ['123', '456']
str.search(/\d+/);      // 5
str.replace(/\d+/g, 'X'); // 'helloXworldX'
```

**Ключевые точки:**
- Строки неизменяемы - все методы возвращают новую строку
- Не используйте конкатенацию в циклах (плохая производительность)
- slice работает с отрицательными индексами, substring нет
- Используйте includes вместо indexOf когда нужна только проверка
- Для замены всех вхождений используйте replaceAll

**Контрольная точка:** Как заменить все вхождения символа в строке?

---

**Вопрос 1.9: Что такое Symbol в JavaScript? Когда это полезно?**

**Модель ответа:**
Symbol - это примитивный тип данных, введенный в ES6. Каждый Symbol уникален и может использоваться как ключ объекта.

**Основные моменты:**

1. **Создание и использование:**
```javascript
// Каждый символ уникален
let sym1 = Symbol('id');
let sym2 = Symbol('id');
console.log(sym1 === sym2); // false!

// Символы не видны в for...in и Object.keys()
let obj = {
  [Symbol('private')]: 'secret',
  public: 'visible'
};

for (let key in obj) {
  console.log(key); // только 'public'
}

Object.keys(obj); // ['public']
Object.getOwnPropertySymbols(obj); // [Symbol(private)]
```

2. **Как ключи объектов:**
```javascript
let userId = Symbol('id');
let users = {
  [userId]: 123,
  name: 'Alice'
};

console.log(users[userId]); // 123
console.log(users.name); // 'Alice'
console.log(users['userId']); // undefined
```

3. **Глобальный реестр Symbol.for():**
```javascript
// Обычные символы
let sym1 = Symbol('shared');
let sym2 = Symbol('shared');
console.log(sym1 === sym2); // false

// Global registry
let globalSym1 = Symbol.for('shared');
let globalSym2 = Symbol.for('shared');
console.log(globalSym1 === globalSym2); // true!
```

4. **Встроенные символы:**
```javascript
// Symbol.iterator - для итерации
let iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => {
        count++;
        if (count <= 3) {
          return { value: count, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (let value of iterable) {
  console.log(value); // 1, 2, 3
}

// Symbol.hasInstance - проверка instanceof
class MyClass {
  static [Symbol.hasInstance](obj) {
    return obj.custom === true;
  }
}

const obj = { custom: true };
console.log(obj instanceof MyClass); // true
```

5. **Приватные свойства:**
```javascript
// Раньше использовали Symbol для приватности
class Counter {
  constructor() {
    this.#count = 0;
  }
  
  increment() {
    this.#count++;
  }
  
  get count() {
    return this.#count;
  }
}

// Теперь есть # для приватных полей
```

**Ключевые точки:**
- Каждый Symbol уникален
- Symbol.for() создает глобальные символы
- Символы не видны в обычном перечислении свойств
- Полезны для приватных ключей объектов
- Symbol.iterator используется для итерирования
- Существуют встроенные символы (iterator, hasInstance и т.д.)

**Контрольная точка:** В чем разница между Symbol() и Symbol.for()?

---

**Вопрос 1.10: Что такое BigInt? Когда его использовать вместо Number?**

**Модель ответа:**
BigInt - это числовой тип для работы с очень большими целыми числами, больше, чем Number.MAX_SAFE_INTEGER.

**Основные моменты:**

1. **Проблема с большими числами:**
```javascript
// Number имеет ограничение
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

let big = 9007199254740992;
console.log(big === big + 1); // true!!! (потеря точности)

// Это происходит потому что Number использует 64-бит IEEE 754
```

2. **Создание BigInt:**
```javascript
// С суффиксом 'n'
let big1 = 123n;
let big2 = 456n;

// С конструктором BigInt()
let big3 = BigInt('789');
let big4 = BigInt(999);

// Можно использовать 0x, 0b, 0o
let hex = 0xFFn;
let binary = 0b1010n;
let octal = 0o777n;

// Попытка создать BigInt из float вызовет ошибку
// BigInt(3.14); // RangeError
```

3. **Операции с BigInt:**
```javascript
let a = 10n;
let b = 20n;

console.log(a + b); // 30n
console.log(a - b); // -10n
console.log(a * b); // 200n
console.log(a / b); // 0n (целочисленное деление!)
console.log(a % b); // 10n
console.log(a ** 2n); // 100n

// Сравнение
console.log(10n < 20n); // true
console.log(10n == 10);  // true (слабое сравнение)
console.log(10n === 10); // false (строгое сравнение)
```

4. **Преобразование:**
```javascript
// BigInt → Number (может потерять точность)
let big = 999999999999999999999n;
let num = Number(big); // потеря точности

// Number → BigInt
let num = 42;
let big = BigInt(num); // 42n

// BigInt → String
String(42n); // '42'
(42n).toString(); // '42'

// Нельзя смешивать типы в операциях
// 10n + 10; // TypeError
10n + BigInt(10); // 20n
```

5. **Применение:**
```javascript
// Криптография
let privateKey = 12345678901234567890123456789n;

// Большие счетчики
let userId = BigInt(Number.MAX_SAFE_INTEGER) + 1n;

// Битовые операции
let flags = 0b1010n;
let result = flags & 0b0110n; // 0b0010n
```

**Ключевые точки:**
- Number.MAX_SAFE_INTEGER = 9007199254740991
- BigInt предназначен для целых чисел, не для float
- Отмечается суффиксом 'n' или функцией BigInt()
- Нельзя смешивать Number и BigInt в операциях
- === сравнивает по типу, == может быть кроссовым
- Деление в BigInt целочисленное (результат без остатка)

**Контрольная точка:** Почему нельзя создать BigInt(3.14)?

---

**Вопрос 1.11: Что такое Weakmap и WeakSet? Когда их использовать?**

**Модель ответа:**
WeakMap и WeakSet - это коллекции с "слабыми" ссылками на объекты. Они используются когда нужны приватные связи без влияния на сборку мусора.

**Основные моменты:**

1. **Разница между Map и WeakMap:**
```javascript
// Map - сильные ссылки
let map = new Map();
let obj = { name: 'Alice' };
map.set(obj, 'data');
obj = null; // obj все еще живет в памяти через map!

// WeakMap - слабые ссылки
let weakMap = new WeakMap();
let obj = { name: 'Alice' };
weakMap.set(obj, 'data');
obj = null; // Теперь объект может быть удален сборщиком мусора
```

2. **Свойства WeakMap:**
```javascript
let weakMap = new WeakMap();
let obj = { name: 'Alice' };

weakMap.set(obj, 'private data');
console.log(weakMap.get(obj)); // 'private data'
console.log(weakMap.has(obj)); // true

weakMap.delete(obj);
console.log(weakMap.has(obj)); // false

// Нельзя итерировать
// for (let [key, value] of weakMap) {} // TypeError

// Нельзя получить размер
// weakMap.size; // undefined

// Нельзя использовать примитивы как ключи
// weakMap.set('string', 'data'); // TypeError
```

3. **Приватные данные объектов:**
```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    privateData.set(this, { password: 'secret' });
  }
  
  verifyPassword(pwd) {
    return privateData.get(this).password === pwd;
  }
}

let user = new User('Alice');
console.log(user.name); // 'Alice'
console.log(user.verifyPassword('secret')); // true
console.log(privateData.get(user)); // { password: 'secret' }

user = null; // Приватные данные будут удалены вместе с объектом
```

4. **WeakSet:**
```javascript
let weakSet = new WeakSet();
let obj1 = {};
let obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true
weakSet.delete(obj2);
console.log(weakSet.has(obj2)); // false

// Практическое применение - отслеживание обработанных объектов
const processed = new WeakSet();

function processObject(obj) {
  if (processed.has(obj)) return;
  // обработка
  processed.add(obj);
}
```

5. **Когда использовать:**
```javascript
// ✓ Используйте WeakMap/WeakSet для:
// - Приватных данных в классах
// - Кэширования связанного с объектами
// - Отслеживания "обработанных" объектов
// - Когда размер коллекции растет без контроля

// ✗ Не используйте WeakMap/WeakSet для:
// - Когда нужна итерация
// - Когда нужна сохраняемость данных
// - Когда нужна проверка размера
// - Когда ключи - примитивы
```

**Ключевые точки:**
- WeakMap/WeakSet имеют слабые ссылки на объекты
- Объекты могут быть удалены сборщиком мусора, даже если находятся в WeakMap/Set
- Нельзя итерировать или получить размер
- Ключи только объекты, не примитивы
- Полезны для приватных данных и кэширования
- Не влияют на жизненный цикл объектов

**Контрольная точка:** Почему нельзя итерировать WeakMap?

---

**Вопрос 1.12: Как объекты работают как хеш-таблицы vs Map? Когда использовать что?**

**Модель ответа:**
В JavaScript можно использовать объекты {} и Map для хранения пар ключ-значение. У каждого подхода есть свои преимущества.

**Основные моменты:**

1. **Объекты как хеш-таблицы:**
```javascript
let obj = {};
obj['key1'] = 'value1';
obj['key2'] = 'value2';
obj.key3 = 'value3';

console.log(obj.key1); // 'value1'
console.log(obj['key2']); // 'value2'
console.log(obj.key3); // 'value3'

// Удаление
delete obj.key1;
console.log(obj.key1); // undefined
```

2. **Map - встроенная коллекция:**
```javascript
let map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
map.set(123, 'numeric key');
map.set({ id: 1 }, 'object key');

console.log(map.get('key1')); // 'value1'
console.log(map.has('key2')); // true
console.log(map.size); // 4

map.delete('key1');
map.clear(); // удалить все
```

3. **Различия:**
```javascript
// Объект
let obj = {};
obj[0] = 'a';
obj[1] = 'b';
// Ключи всегда строки
for (let key in obj) {
  console.log(typeof key); // 'string', даже для чисел!
}

// Map
let map = new Map();
map.set(0, 'a');
map.set(1, 'b');
// Ключи сохраняют тип
for (let [key, value] of map) {
  console.log(typeof key); // 'number'
}
```

4. **Производительность и удобство:**
```javascript
// Объект - ключи всегда строки
let obj = {};
obj[undefined] = 'undef';
obj[null] = 'null';
obj[true] = 'bool';
obj[{}] = 'obj';

// Все ключи преобразованы в строки:
Object.keys(obj); // ['undefined', 'null', 'true', '[object Object]']

// Map может иметь любые ключи
let map = new Map();
map.set(undefined, 'undef');
map.set(null, 'null');
map.set(true, 'bool');
map.set({}, 'obj');

for (let [key, value] of map) {
  console.log(key); // undefined, null, true, {}
}
```

5. **Выбор между Object и Map:**
```javascript
// ✓ Используйте Object когда:
// - Ключи - простые строки
// - Нужна литеральная нотация { key: value }
// - Нужна совместимость со старым кодом
// - Нужны методы Object.keys(), Object.values()
let config = { apiUrl: 'https://...', timeout: 5000 };

// ✓ Используйте Map когда:
// - Ключи - сложные типы (объекты, числа)
// - Нужна хорошая производительность с большим количеством данных
// - Нужна итерация
// - Нужна функция size
let cache = new Map();
cache.set(userId, userData);
cache.set(requestId, response);
```

6. **Методы для работы:**
```javascript
// Объект
let obj = { a: 1, b: 2, c: 3 };
Object.keys(obj);   // ['a', 'b', 'c']
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// Map
let map = new Map([
  ['a', 1],
  ['b', 2]
]);
[...map.keys()];   // ['a', 'b']
[...map.values()]; // [1, 2]
[...map.entries()]; // [['a', 1], ['b', 2]]

// Преобразование
let obj = { a: 1, b: 2 };
let mapFromObj = new Map(Object.entries(obj));

let map = new Map([['a', 1], ['b', 2]]);
let objFromMap = Object.fromEntries(map);
```

**Ключевые точки:**
- Объекты ограничены строковыми ключами
- Map может иметь любые типы ключей
- Map имеет встроенный size, объект требует Object.keys().length
- Map итерируется в порядке вставки
- Map часто быстрее с большим количеством операций
- Используйте Object для конфига, Map для данных

**Контрольная точка:** Как преобразовать объект в Map и обратно?

---

## РАЗДЕЛ 2: Асинхронное программирование (15 вопросов)

**Вопрос 2.1: Что такое Event Loop? Объясните с примерами setTimeout, Promise, async/await**

**Модель ответа:**
Event Loop - это механизм в JavaScript, который управляет выполнением кода, обработкой событий и выполнением асинхронных операций.

**Основные моменты:**

1. **Структура Event Loop:**
   - Call Stack: стек вызовов синхронного кода
   - Task Queue (Macrotask): setTimeout, setInterval, fetch
   - Microtask Queue: Promise, async/await, MutationObserver
   - Web APIs: browser APIs которые работают параллельно

2. **Порядок выполнения:**
```javascript
console.log('1'); // Call Stack

setTimeout(() => {
  console.log('2'); // Task Queue
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3'); // Microtask Queue
  });

console.log('4'); // Call Stack

// Вывод: 1, 4, 3, 2
```

3. **Почему так?**
   - Сначала выполнится весь синхронный код (1, 4)
   - Потом все microtasks (3)
   - Потом первый macrotask (2)
   - Если есть еще macrotasks - их тоже выполнит

4. **Подробный пример:**
```javascript
console.log('Start'); // 1

setTimeout(() => {
  console.log('setTimeout 1'); // 8
  Promise.resolve().then(() => console.log('Promise in setTimeout')); // 9
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1'); // 3
    setTimeout(() => {
      console.log('setTimeout in Promise'); // 10
    }, 0);
  })
  .then(() => {
    console.log('Promise 2'); // 5
  });

console.log('End'); // 2

// Вывод:
// Start
// End
// Promise 1
// Promise 2
// setTimeout 1
// Promise in setTimeout
// setTimeout in Promise
```

5. **Визуализация:**
```
┌─────────────────────────────────────────────────────┐
│                   JavaScript Engine                  │
│  ┌─────────────────────────────────────────────────┐ │
│  │             Call Stack (синхронный)             │ │
│  │ Выполняется код сверху вниз                     │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │          Microtask Queue (микротаски)           │ │
│  │ Promises, async/await, MutationObserver         │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │          Task Queue (макротаски)                │ │
│  │ setTimeout, setInterval, fetch, click, etc      │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

Event Loop цикл:
1. Выполнить весь Call Stack
2. Выполнить все Microtask Queue
3. Выполнить один Task из Task Queue
4. Вернуться к шагу 1
```

**Ключевые точки:**
- Call Stack выполняется первым (синхронный код)
- Microtasks выполняются после Call Stack (Promise, async/await)
- Macrotasks выполняются после всех Microtasks
- Внутри macrotask может возникнуть новый macrotask

**Контрольная точка:** Почему Promises выполняются раньше setTimeout?

---

**Вопрос 2.2: Макротаски vs Микротаски: порядок выполнения и примеры**

**Модель ответа:**
JavaScript разделяет асинхронные операции на макротаски и микротаски с разными приоритетами выполнения.

**Основные моменты:**

1. **Макротаски (Macrotasks):**
   - setTimeout, setInterval
   - setImmediate (Node.js)
   - fetch, XMLHttpRequest
   - DOM events (click, load, etc)
   - requestAnimationFrame
   - Каждая макротаска обрабатывается отдельно

2. **Микротаски (Microtasks):**
   - Promise (then, catch, finally)
   - async/await
   - MutationObserver
   - process.nextTick (Node.js)
   - queueMicrotask()
   - Все микротаски выполняются между макротасками

3. **Пример выполнения:**
```javascript
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout 1'); // Macrotask 1
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1'); // Microtask
    setTimeout(() => {
      console.log('setTimeout 2'); // Macrotask 2
    }, 0);
  });

console.log('Script end');

// Порядок:
// 1. Script start (синхронный)
// 2. Script end (синхронный)
// 3. Promise 1 (микротаска)
// 4. setTimeout 1 (макротаска 1)
// 5. setTimeout 2 (макротаска 2)
```

4. **Вложенные макротаски:**
```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  
  Promise.resolve().then(() => {
    console.log('Promise in Timeout 1');
  });
  
  setTimeout(() => {
    console.log('Timeout 1.1'); // Новый macrotask
  }, 0);
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  });

console.log('End');

// Порядок:
// Start
// End
// Promise 1
// Timeout 1
// Promise in Timeout 1
// Timeout 1.1
```

5. **queueMicrotask() - ручное добавление микротаски:**
```javascript
console.log('Start');

queueMicrotask(() => {
  console.log('Microtask via queueMicrotask');
});

Promise.resolve().then(() => {
  console.log('Promise microtask');
});

setTimeout(() => {
  console.log('Macrotask');
}, 0);

console.log('End');

// Порядок:
// Start
// End
// Microtask via queueMicrotask
// Promise microtask
// Macrotask
```

**Ключевые точки:**
- Микротаски имеют более высокий приоритет
- Все микротаски выполняются перед следующей макротаской
- Новая макротаска может быть добавлена внутри микротаски
- Микротаски внутри макротаски выполнятся после остального

**Контрольная точка:** Если внутри Timeout создать новый Promise, когда он выполнится?

---

**Вопрос 2.3: Что такое Promise? Объясните resolve, reject, then, catch, finally**

**Модель ответа:**
Promise - это объект, представляющий состояние какой-то асинхронной операции (выполнено, отклонено или ждет).

**Основные моменты:**

1. **Три состояния Promise:**
   - Pending: начальное состояние
   - Fulfilled (Resolved): операция успешна, есть значение
   - Rejected: операция неудачна, есть причина (error)

2. **Создание Promise:**
```javascript
let promise = new Promise((resolve, reject) => {
  // Асинхронная операция
  if (/* успешно */) {
    resolve(value); // Переход в Fulfilled
  } else {
    reject(error); // Переход в Rejected
  }
});

// Практический пример
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Success!');
    } else {
      reject(new Error('Failed!'));
    }
  }, 1000);
});
```

3. **then() - обработка результата:**
```javascript
promise
  .then((value) => {
    console.log(value); // Если resolved
    return newValue; // Можно вернуть новое значение
  })
  .then((newValue) => {
    // Дальнейшая обработка
  });

// then может быть несколько раз вызван на одном Promise
promise.then((value) => console.log('Handler 1:', value));
promise.then((value) => console.log('Handler 2:', value));
// Оба выполнятся
```

4. **catch() - обработка ошибок:**
```javascript
promise
  .catch((error) => {
    console.log('Error:', error.message);
    return fallbackValue; // Можно восстановиться
  });

// Полный цепочка
promise
  .then(value => processValue(value))
  .catch(error => handleError(error))
  .finally(() => cleanup());
```

5. **finally() - выполнить в любом случае:**
```javascript
promise
  .then(value => console.log('Success:', value))
  .catch(error => console.log('Error:', error))
  .finally(() => {
    console.log('Cleanup'); // Выполнится в любом случае
  });

// Примеры:
fetch('/api/data')
  .then(response => response.json())
  .catch(error => console.error('Fetch failed'))
  .finally(() => hideLoadingSpinner());
```

6. **Возвращение значений из then:**
```javascript
Promise.resolve(5)
  .then(value => {
    console.log(value); // 5
    return value * 2; // Вернем 10
  })
  .then(value => {
    console.log(value); // 10
    return Promise.resolve(100); // Вернем Promise!
  })
  .then(value => {
    console.log(value); // 100
  });
```

**Ключевые точки:**
- resolve() переводит Promise в Fulfilled
- reject() переводит Promise в Rejected
- then() вызывается на Fulfilled, catch() на Rejected
- finally() вызывается всегда
- then() может возвращать значение или новый Promise

**Контрольная точка:** Что произойдет если в then() вернуть новый Promise?

---

**Вопрос 2.4: Async/Await vs Promises: преимущества и недостатки**

**Модель ответа:**
async/await синтаксис предоставляет более удобный способ работать с Promises, чем цепочка .then().

**Основные моменты:**

1. **Синтаксис async/await:**
```javascript
// Обычный Promise
function getUser() {
  return fetch('/user')
    .then(response => response.json())
    .then(data => data.user);
}

// С async/await
async function getUser() {
  const response = await fetch('/user');
  const data = await response.json();
  return data.user;
}
```

2. **async функция:**
   - Всегда возвращает Promise
   - Может содержать await выражения
   - Pauses выполнение до разрешения Promise

```javascript
async function example() {
  return 42; // Вернет Promise.resolve(42)
}

example().then(value => console.log(value)); // 42

// Эквивалентно:
function example() {
  return Promise.resolve(42);
}
```

3. **await оператор:**
   - Может использоваться только в async функции
   - Ждет разрешения Promise
   - Возвращает значение (не сам Promise)
   - Во время ожидания функция приостанавливается

```javascript
async function example() {
  const promise = Promise.resolve(42);
  const value = await promise; // Ждет и получает 42
  console.log(value); // 42
}
```

4. **Error handling:**
```javascript
// С Promises
function fetchUser(id) {
  return fetch(`/user/${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Not found');
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}

// С async/await
async function fetchUser(id) {
  try {
    const response = await fetch(`/user/${id}`);
    if (!response.ok) throw new Error('Not found');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
```

5. **Параллельные операции:**
```javascript
// Плохо - выполнится последовательно
async function getTwoUsers(id1, id2) {
  const user1 = await fetchUser(id1); // Ждем 1 сек
  const user2 = await fetchUser(id2); // Ждем еще 1 сек
  return [user1, user2]; // Всего 2 сек
}

// Хорошо - выполнится параллельно
async function getTwoUsers(id1, id2) {
  const [user1, user2] = await Promise.all([
    fetchUser(id1), // Ждем оба одновременно
    fetchUser(id2)
  ]); // Всего 1 сек
  return [user1, user2];
}
```

6. **Сравнение:**
```javascript
// Promise.all() vs Promise.race()
Promise.all([promise1, promise2]) // Все должны успешно завершиться
Promise.race([promise1, promise2]) // Первый завершенный побеждает
Promise.allSettled([promise1, promise2]) // Все, независимо от статуса

// С async/await:
await Promise.all([...])
await Promise.race([...])
await Promise.allSettled([...])
```

**Ключевые точки:**
- async всегда возвращает Promise
- await ждет разрешения Promise в async функции
- try/catch более читаемо чем цепочка .catch()
- Promise.all() для параллельных операций
- Нельзя использовать await в обычных функциях (только в async)

**Контрольная точка:** Как выполнить несколько асинхронных операций параллельно с async/await?

---

Продолжение следует...



---

## Связанные

- [[Senior Frontend]]
