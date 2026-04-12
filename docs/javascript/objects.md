# Продвинутая работа с объектами

## Object.defineProperty — дескрипторы свойств

```js
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,   // нельзя менять
  enumerable: true,  // видно в for...in
  configurable: false // нельзя удалить
});

obj.name = 'Bob'; // Тихо игнорируется (или TypeError в strict mode)
```

## Getter и Setter

```js
const user = {
  _age: 25,
  get age() { return this._age; },
  set age(val) {
    if (val < 0) throw new Error('Возраст не может быть отрицательным');
    this._age = val;
  }
};

user.age = 30; // setter
console.log(user.age); // getter → 30
```

## freeze, seal, preventExtensions

```js
const obj = { a: 1, b: 2 };

// freeze — нельзя ничего менять
Object.freeze(obj);
obj.a = 99; // игнорируется
obj.c = 3;  // игнорируется

// seal — нельзя добавлять/удалять, но можно менять
Object.seal(obj);
obj.a = 99; // работает
obj.c = 3;  // игнорируется

// preventExtensions — нельзя добавлять
Object.preventExtensions(obj);
obj.c = 3; // игнорируется
```

## Proxy и Reflect

```js
const handler = {
  get(target, key) {
    console.log(`Читаем: ${key}`);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (typeof value !== 'number') throw new TypeError('Только числа');
    return Reflect.set(target, key, value);
  }
};

const proxy = new Proxy({}, handler);
proxy.age = 30;    // set вызывается
console.log(proxy.age); // get вызывается → 30
proxy.name = 'Alice';   // TypeError!
```

## for...in vs for...of

```js
const obj = { a: 1, b: 2, c: 3 };

// for...in — перебирает ключи (включая прототипы!)
for (let key in obj) {
  console.log(key); // 'a', 'b', 'c'
}

// for...of — перебирает значения (для итерируемых)
for (let val of [1, 2, 3]) {
  console.log(val); // 1, 2, 3
}

// Object.entries для объектов
for (let [key, val] of Object.entries(obj)) {
  console.log(key, val);
}
```

## Object методы

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);    // ['a', 'b', 'c']
Object.values(obj);  // [1, 2, 3]
Object.entries(obj); // [['a',1], ['b',2], ['c',3]]

// Создать объект из массива пар
Object.fromEntries([['a', 1], ['b', 2]]); // { a: 1, b: 2 }

// Поверхностное копирование
const copy = Object.assign({}, obj);
const copy2 = { ...obj };

// Глубокое копирование
const deep = JSON.parse(JSON.stringify(obj)); // работает для простых объектов
const deep2 = structuredClone(obj);           // современный способ
```

## WeakMap для приватных данных

```js
const _private = new WeakMap();

class User {
  constructor(name, password) {
    _private.set(this, { password });
    this.name = name;
  }

  verify(pwd) {
    return _private.get(this).password === pwd;
  }
}

const user = new User('Alice', 'secret');
user.verify('secret'); // true
user.password;         // undefined — скрыто
```
