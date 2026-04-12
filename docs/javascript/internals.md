# Внутреннее устройство JavaScript

## V8 Engine — как работает

```
Исходный код JS
      ↓
   Парсер → AST (Abstract Syntax Tree)
      ↓
  Ignition (интерпретатор) → Bytecode
      ↓
  TurboFan (JIT-компилятор) → Машинный код
```

**JIT (Just-In-Time) компиляция:**
- Часто вызываемый код компилируется в машинный
- "Горячие" функции оптимизируются на лету
- Деоптимизация при неожиданных типах

## Call Stack и Heap

```
┌─────────────────┐
│   Call Stack    │  ← Синхронный код, функции
│  main()         │
│  greet()        │
│  console.log()  │
└─────────────────┘

┌─────────────────┐
│      Heap       │  ← Объекты, замыкания
│  { name: ... }  │
│  [1, 2, 3]      │
└─────────────────┘
```

## Event Loop — полная картина

```
  Call Stack пуст?
        ↓
  Microtask Queue  ← Promise.then, queueMicrotask
  (все до конца)
        ↓
  Один Macrotask   ← setTimeout, setInterval, fetch
        ↓
  Rendering (если нужно)
        ↓
  Повтор
```

```js
console.log('1'); // Call Stack

setTimeout(() => console.log('2'), 0); // Macrotask Queue

Promise.resolve().then(() => console.log('3')); // Microtask Queue

console.log('4'); // Call Stack

// Вывод: 1 → 4 → 3 → 2
```

## Hidden Classes (оптимизация V8)

```js
// Плохо — разные скрытые классы
function makePoint(x, y) {
  const p = {};
  p.x = x; // V8 создаёт класс C1
  p.y = y; // V8 создаёт класс C2
  return p;
}

// Хорошо — один скрытый класс
function makePoint(x, y) {
  return { x, y }; // V8 создаёт один класс
}

// Плохо — удаление свойств разрушает оптимизацию
delete point.x;
```

## Garbage Collection

```js
// Объект удаляется когда нет ссылок
let obj = { name: 'Alice' };
let ref = obj;

obj = null; // Ещё есть ref → не удаляется
ref = null; // Нет ссылок → GC удалит объект

// WeakRef — слабая ссылка (не мешает GC)
let weak = new WeakRef(obj);
weak.deref(); // получить объект (или undefined если удалён)
```

## Memory Leaks — типичные случаи

```js
// 1. Глобальные переменные
function leak() {
  forgotten = 'Я глобальная!' // без let/const/var
}

// 2. Забытые обработчики событий
element.addEventListener('click', handler);
// Нужно: element.removeEventListener('click', handler);

// 3. Замыкания держат большие объекты
function outer() {
  const bigData = new Array(1000000);
  return function inner() {
    console.log(bigData.length); // bigData живёт вечно
  };
}

// 4. Неочищенные таймеры
const interval = setInterval(() => {}, 1000);
// Нужно: clearInterval(interval);
```

## Prototype Chain

```js
const animal = { breathe() { return 'breathing'; } };
const dog = Object.create(animal);
dog.bark = function() { return 'woof'; };

dog.bark();    // own property
dog.breathe(); // из прототипа (animal)

// Цепочка:
// dog → animal → Object.prototype → null

Object.getPrototypeOf(dog) === animal; // true
```

## Closure — как хранится

```js
function counter() {
  let count = 0; // Переменная в замыкании (Closure Scope)

  return {
    increment() { count++; },
    get() { return count; }
  };
}

const c = counter();
c.increment(); // count = 1 (живёт в памяти)
c.get();       // 1
```
