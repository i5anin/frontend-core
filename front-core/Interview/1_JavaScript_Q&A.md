# Senior Frontend Interview: JavaScript Q&A

## РАЗДЕЛ 1: Синтаксис и типы данных (12 вопросов)

### Вопрос 1.1: Что такое примитивные типы vs reference типы в JavaScript? Как происходит копирование?

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

### Вопрос 1.2: Как работают typeof и instanceof? В чем их разница?

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

### Вопрос 1.3: Как работает явное преобразование типов? Number(), String(), Boolean()

**Основные моменты:**
- `Number()`: преобразует в число. `Number('42')` → 42, `Number(true)` → 1
- `String()`: преобразует в строку. `String(42)` → '42', `String(null)` → 'null'
- `Boolean()`: преобразует в boolean. Falsy: 0, '', null, undefined, NaN, false

**Ключевые примеры:**
```javascript
Number('3.14'); // 3.14
Number('hello'); // NaN
String([1,2,3]); // '1,2,3'
Boolean('0'); // true (строка это объект!)
Boolean(0); // false (ноль)
```

---

### Вопрос 1.4: Что такое NaN, Infinity и undefined? Как различить и проверить?

**Основные моменты:**
- `undefined`: нет значения (возвращается функциями без return, несуществующие свойства)
- `NaN`: невалидное число (результат 0/0, Number('text'), Math.sqrt(-1))
- `Infinity`: бесконечность (результат 1/0, очень большое число)

**Ключевые примеры:**
```javascript
Number.isNaN(NaN); // true (правильная проверка)
NaN === NaN; // false (неправильно!)
0 / 0; // NaN
1 / 0; // Infinity
typeof NaN; // 'number' (сюрприз!)
```

---

### Вопрос 1.5: Что такое Spread operator и Rest parameters? Разница?

**Основные моменты:**
- Spread (...): разворачивает массив/объект → `[...arr1, ...arr2]`, `sum(...[1,2,3])`
- Rest (...): собирает аргументы → `function sum(...nums)`, `let [first, ...rest] = arr`

**Ключевые примеры:**
```javascript
// Spread
let combined = [...[1,2], ...[3,4]]; // [1,2,3,4]
sum(...[1,2,3]); // Распаковывает в отдельные аргументы

// Rest
function sum(...numbers) { // numbers это массив
  return numbers.reduce((a,b) => a+b, 0);
}
```

---

### Вопрос 1.6: Как работает деструктуризация массивов и объектов?

**Основные моменты:**
- Массивы: `let [a, b, c] = [1, 2, 3]`
- Объекты: `let {name, age} = {name: 'Alice', age: 30}`
- Значения по умолчанию: `let [x = 10] = []` → x = 10
- Переименование: `let {name: personName} = {name: 'Alice'}`

**Ключевые примеры:**
```javascript
let [first, ...rest] = [1,2,3,4]; // first=1, rest=[2,3,4]
let {name, country = 'USA'} = {name: 'Alice'}; // country='USA'
function greet({name, age}) { console.log(name, age); }
```

---

### Вопрос 1.7: Как работают шаблонные строки (Template Literals)?

**Основные моменты:**
- Используют обратные кавычки: ``` let str = `Hello ${name}` ```
- Интерполяция: `${выражение}` - можно вставлять переменные и функции
- Многострочные строки без `\n`

**Ключевые примеры:**
```javascript
let name = 'Alice';
let str = `Hello, ${name}!`; // Hello, Alice!
let html = `
  <div>
    <h1>${title}</h1>
  </div>
`;
let result = `5 + 5 = ${5 + 5}`; // 5 + 5 = 10
```

---

### Вопрос 1.8: Какие методы есть для работы со строками? Производительность?

**Основные моменты:**
- Поиск: `indexOf()`, `includes()`, `startsWith()`, `endsWith()`
- Преобразование: `toUpperCase()`, `toLowerCase()`, `trim()`
- Подстрока: `substring()`, `slice()`, `substr()`
- Замена: `replace()`, `replaceAll()`
- Разделение: `split()`

**Проблема производительности:**
```javascript
// Плохо - создается новая строка каждый раз
let result = '';
for (let i = 0; i < 10000; i++) {
  result += 'text'; // O(n²)!
}

// Хорошо - используйте массив
let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push('text');
}
let result = arr.join('');
```

---

### Вопрос 1.9: Что такое Symbol в JavaScript? Когда это полезно?

**Основные моменты:**
- Уникальный примитивный тип (каждый Symbol уникален)
- Используется как приватный ключ объекта
- Не видны в `for...in` и `Object.keys()`
- `Symbol.for()` для глобальных символов

**Ключевые примеры:**
```javascript
let sym1 = Symbol('id');
let sym2 = Symbol('id');
console.log(sym1 === sym2); // false!

let obj = {[sym1]: 'secret', public: 'visible'};
Object.keys(obj); // ['public'] (символ спрятан)
```

---

### Вопрос 1.10: Что такое BigInt? Когда использовать вместо Number?

**Основные моменты:**
- `Number.MAX_SAFE_INTEGER = 9007199254740991`
- `BigInt` для больших целых чисел: `123n` или `BigInt('123')`
- Целочисленное деление: `10n / 3n === 3n`
- Нельзя смешивать типы: `10n + 10` → TypeError

**Ключевые примеры:**
```javascript
let big = 9007199254740992n; // Добавляем 'n'
BigInt(999); // BigInt(999)
10n + 20n; // 30n
10n + 10; // TypeError!
```

---

### Вопрос 1.11: Что такое WeakMap и WeakSet? Когда использовать?

**Основные моменты:**
- "Слабые" ссылки на объекты (не мешают сборке мусора)
- Нельзя итерировать, нет `size`
- Ключи только объекты (не примитивы)
- Приватные данные в классах

**Ключевые примеры:**
```javascript
let weakMap = new WeakMap();
let obj = {name: 'Alice'};
weakMap.set(obj, 'private data');
obj = null; // Объект может быть удален сборщиком мусора

// Используйте для приватности:
const privateData = new WeakMap();
class User {
  constructor(pwd) {
    privateData.set(this, {password: pwd});
  }
}
```

---

### Вопрос 1.12: Объекты как хеш-таблицы vs Map? Когда использовать что?

**Основные моменты:**
- Объект: ключи всегда строки, упрощенный синтаксис, встроенные методы
- Map: любые ключи, встроенный `size`, итерируется в порядке вставки
- Map быстрее на больших объемах данных

**Ключевые примеры:**
```javascript
// Объект - ключи становятся строками
let obj = {};
obj[0] = 'a'; // ключ '0'
obj[true] = 'b'; // ключ 'true'

// Map - сохраняет типы
let map = new Map();
map.set(0, 'a'); // ключ число 0
map.set(true, 'b'); // ключ boolean true
```

---

## РАЗДЕЛ 2: Асинхронное программирование (15 вопросов)

### Вопрос 2.1: Что такое Event Loop? Порядок выполнения setTimeout, Promise, async/await?

**Основные моменты:**
- Call Stack: выполняет синхронный код
- Microtask Queue: Promise, async/await, MutationObserver
- Macrotask Queue: setTimeout, setInterval, fetch
- Порядок: Call Stack → Microtasks → 1 Macrotask → Repeat

**Ключевые примеры:**
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Вывод: 1, 4, 3, 2
```

---

### Вопрос 2.2: Макротаски vs Микротаски: какой приоритет?

**Основные моменты:**
- Микротаски выполняются между макротасками
- Все микротаски выполняются перед следующей макротаской
- Новая макротаска может быть добавлена внутри микротаски

**Ключевые примеры:**
```javascript
setTimeout(() => console.log('Macro'), 0);
Promise.resolve().then(() => console.log('Micro'));
// Вывод: Micro, Macro
```

---

### Вопрос 2.3: Что такое Promise? resolve, reject, then, catch, finally?

**Основные моменты:**
- Три состояния: pending → fulfilled или rejected
- `resolve(value)`: переход в fulfilled
- `reject(error)`: переход в rejected
- `then()`: обработка fulfilled, `catch()`: rejected, `finally()`: всегда

**Ключевые примеры:**
```javascript
let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
p.then(val => console.log(val))
 .catch(err => console.error(err))
 .finally(() => console.log('cleanup'));
```

---

### Вопрос 2.4: Async/Await vs Promises: какой выбрать?

**Основные моменты:**
- Async функция всегда возвращает Promise
- Await ждет разрешения Promise
- Try/catch вместо цепочки .catch()
- Promise.all() для параллельных операций

**Ключевые примеры:**
```javascript
// Promises
fetch('/user').then(r => r.json()).then(d => console.log(d));

// Async/await
async function getUser() {
  const r = await fetch('/user');
  const d = await r.json();
  return d;
}
```

---

### Вопрос 2.5: Как обработать ошибки в async/await? Try/catch vs catch()

**Основные моменты:**
- Try/catch обрабатывает любые ошибки (синхронные и асинхронные)
- Catch() в цепочке Promises тоже работает
- Finally выполнится в любом случае

**Ключевые примеры:**
```javascript
async function fetchUser() {
  try {
    const r = await fetch('/user');
    if (!r.ok) throw new Error('Not found');
    return await r.json();
  } catch (err) {
    console.error(err.message);
    return null;
  } finally {
    console.log('done');
  }
}
```

---

### Вопрос 2.6: Promise.all vs Promise.race vs Promise.allSettled?

**Основные моменты:**
- `Promise.all()`: все должны успешно завершиться
- `Promise.race()`: первый завершенный побеждает
- `Promise.allSettled()`: все, независимо от статуса (fulfilled/rejected)

**Ключевые примеры:**
```javascript
// Все должны успешно
Promise.all([p1, p2, p3]).then(results => {});

// Первый результат
Promise.race([p1, p2]).then(first => {});

// Все результаты, даже ошибки
Promise.allSettled([p1, p2]).then(results => {
  // results: [{status: 'fulfilled', value: ...}, {status: 'rejected', reason: ...}]
});
```

---

### Вопрос 2.7: Как отменить Promise или Async операцию?

**Основные моменты:**
- `AbortController` для отмены fetch
- Promise нельзя отменить напрямую
- Timeout для отмены операции по времени

**Ключевые примеры:**
```javascript
const controller = new AbortController();
fetch('/data', {signal: controller.signal});
controller.abort(); // Отмена запроса

// С timeout
Promise.race([
  fetch('/data'),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
]);
```

---

### Вопрос 2.8: Что такое Race Conditions в асинхронном коде?

**Основные моменты:**
- Race condition: результат зависит от порядка выполнения
- Типичный пример: несколько запросов, результаты приходят не в порядке

**Ключевые примеры:**
```javascript
// Проблема
let result;
fetch('/slow').then(r => result = r); // Может прийти последним
fetch('/fast').then(r => result = r); // Может затереть slow

// Решение
async function getSlow() { return await fetch('/slow'); }
async function getFast() { return await fetch('/fast'); }
let [slow, fast] = await Promise.all([getSlow(), getFast()]);
```

---

### Вопрос 2.9: Как реализовать retry логику в асинхронном коде?

**Основные моменты:**
- Повторить операцию при ошибке
- Экспоненциальная задержка (backoff)

**Ключевые примеры:**
```javascript
async function retryFetch(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}
```

---

### Вопрос 2.10: Что такое Memory Leaks в асинхронном коде?

**Основные моменты:**
- Забытые обработчики событий
- Незакрытые подписки на промисы
- Циклические ссылки в callback функциях

**Ключевые примеры:**
```javascript
// Утечка
element.addEventListener('click', () => {
  fetch('/data').then(r => console.log(r)); // element может быть удален
});

// Исправленно
element.addEventListener('click', handler);
// Позже:
element.removeEventListener('click', handler);
```

---

### Вопрос 2.11: Как использовать async в циклах? Параллельно vs последовательно?

**Основные моменты:**
- Параллельно быстрее, но требует Promise.all()
- Последовательно медленнее, но проще с зависимостями

**Ключевые примеры:**
```javascript
// Плохо - последовательно
for (let id of ids) {
  await fetchUser(id); // Медленно: 3 сек (3 запроса по 1 сек)
}

// Хорошо - параллельно
await Promise.all(ids.map(id => fetchUser(id))); // 1 сек
```

---

### Вопрос 2.12: Что такое Callback Hell? Как его избежать?

**Основные моменты:**
- Nested callbacks: трудно читать
- Решение: Promises или async/await

**Ключевые примеры:**
```javascript
// Callback hell
fetchUser(id, function(user) {
  fetchPosts(user.id, function(posts) {
    fetchComments(posts[0].id, function(comments) {
      // Ад!
    });
  });
});

// С Promises
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id));

// С async/await
const user = await fetchUser(id);
const posts = await fetchPosts(user.id);
const comments = await fetchComments(posts[0].id);
```

---

### Вопрос 2.13: Как отладить асинхронный код? DevTools и логирование?

**Основные моменты:**
- DevTools: async/await stack traces (нужен Chrome/Edge)
- console.time() для измерения времени
- Promise rejection handler

**Ключевые примеры:**
```javascript
console.time('fetch');
const data = await fetch('/data').then(r => r.json());
console.timeEnd('fetch'); // Измерить время

// Отловить необработанные rejection
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason);
});
```

---

### Вопрос 2.14: Что такое Microtask vs Event Listener в контексте асинхронности?

**Основные моменты:**
- Microtask (Promise): выше приоритет
- Event Listener (click, load): низше приоритет (macrotask)

**Ключевые примеры:**
```javascript
element.addEventListener('click', () => console.log('listener')); // Macrotask
element.click(); // Trigger listener
Promise.resolve().then(() => console.log('promise')); // Microtask
// Порядок: promise, listener (если уже был click!)
```

---

### Вопрос 2.15: Как комбинировать асинхронный код с итерацией (generators)?

**Основные моменты:**
- Async generators: `async function*`
- Async iterators: `for await...of`

**Ключевые примеры:**
```javascript
async function* fetchPages(urls) {
  for (let url of urls) {
    const data = await fetch(url).then(r => r.json());
    yield data;
  }
}

for await (let data of fetchPages([...])) {
  console.log(data);
}
```

---

## ⚠️ РАЗДЕЛЫ 3-7 (Объекты, ООП, FP, API, V8)

Вопросы этих разделов будут добавлены в следующем обновлении.
Общий объем: JavaScript Q&A включает 73 вопроса по всем 7 разделам.

---

**Статус файла:** 30 вопросов заполнено (из 73)  
**Следующие разделы:** 3-7 в работе
