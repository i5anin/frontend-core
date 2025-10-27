---
title: ООП в JavaScript
description: Принципы объектно-ориентированного программирования в JavaScript. Классы, наследование, инкапсуляция, полиморфизм, прототипы.
outline: deep
---

# ООП в JavaScript

JavaScript сочетает **прототипное наследование** и синтаксическую оболочку в виде `class`.  
Современные реализации (ES2022+) полностью поддерживают инкапсуляцию, статические поля и наследование.

## Базовые принципы

| Принцип      | Суть                                        |
|--------------|---------------------------------------------|
| Инкапсуляция | Сокрытие состояния и логики внутри объекта  |
| Наследование | Повторное использование кода через иерархию |
| Полиморфизм  | Единый интерфейс для разных реализаций      |
| Абстракция   | Сокрытие деталей реализации                 |

## Классы и экземпляры

```ts
class User {
    #password

    constructor(name, password) {
        this.name = name
        this.#password = password
    }

    checkPassword(p) {
        return this.#password === p
    }
}

const u = new User('Сергей', '12345')
console.log(u.checkPassword('12345'))
```

* `#password` — приватное поле.
* Вне класса доступ к нему невозможен.

## Наследование

```ts
class Employee extends User {
    constructor(name, password, role) {
        super(name, password)
        this.role = role
    }

    info() {
        return `${this.name} — ${this.role}`
    }
}

const e = new Employee('Анна', 'secret', 'разработчик')
console.log(e.info())
```

* `extends` — ключевое слово для наследования.
* `super()` вызывает конструктор родителя.

## Полиморфизм

```ts
class Shape {
    area() {
        throw new Error('Метод не реализован')
    }
}

class Circle extends Shape {
    constructor(r) {
        super()
        this.r = r
    }

    area() {
        return Math.PI * this.r ** 2
    }
}

class Square extends Shape {
    constructor(a) {
        super()
        this.a = a
    }

    area() {
        return this.a ** 2
    }
}

const shapes = [new Circle(3), new Square(4)]
for (const s of shapes) console.log(s.area())
```

Одинаковый интерфейс (`area()`), разные реализации.

## Прототипы

Классы — синтаксический сахар над прототипами:

```ts
function User(name) {
    this.name = name
}

User.prototype.greet = function () {
    return `Привет, ${this.name}`
}

const u = new User('Иван')
console.log(u.greet())
```

Эквивалентно:

```ts
class User {
    constructor(name) {
        this.name = name
    }

    greet() {
        return `Привет, ${this.name}`
    }
}
```

## Статические члены

```ts
class MathUtil {
    static sum(...nums) {
        return nums.reduce((a, b) => a + b, 0)
    }
}

console.log(MathUtil.sum(1, 2, 3))
```

`static` связывает метод с классом, а не с экземпляром.

## Инкапсуляция через приватные поля

```ts
class BankAccount {
    #balance = 0

    deposit(v) {
        if (v <= 0) throw new Error('Недопустимая сумма')
        this.#balance += v
    }

    get balance() {
        return this.#balance
    }
}

const acc = new BankAccount()
acc.deposit(500)
console.log(acc.balance)
```

## Абстрактные шаблоны

В JS нет ключевого слова `abstract`, но паттерн эмулируется:

```ts
class Repository {
    async find() {
        throw new Error('Не реализовано')
    }
}

class UserRepository extends Repository {
    async find() {
        return [{id: 1, name: 'User'}]
    }
}
```

## Миксины

Для повторного использования логики без жесткой иерархии:

```ts
const Loggable = Base => class extends Base {
    log(msg) {
        console.log(`[LOG] ${msg}`)
    }
}

class Service {
}

class ApiService extends Loggable(Service) {
}

new ApiService().log('ready')
```

## Итог

* ООП в JS опирается на **прототипы**.
* `class` лишь синтаксическое удобство.
* Для архитектуры — важно проектировать интерфейсы, не классы.
* Приватные поля и `AbortController` сделали модель конкурентоспособной с Java/C#.

**Основание ответа:** материал составлен по стандарту ECMAScript 2025 и современным практикам проектирования архитектуры
на JavaScript. Внешние источники не использовались.


