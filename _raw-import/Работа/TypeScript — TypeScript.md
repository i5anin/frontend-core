---
tags:
  - веб-разработка
  - javascript
  - typescript
created: 2024-06-15
date: 2024-06-15
---
## Шпаргалка по [TypeScript](./TypeScript — TypeScript):

**Основные концепции:**

* **Статическая типизация:** TS проверяет типы данных во время компиляции, что помогает предотвращать ошибки.
* **Интерфейсы:** Определяют структуру данных, гарантируя совместимость между различными частями кода.
* **Классы:** [../../../JavaScript/class](#) Позволяют создавать объекты с методами и свойствами.
* **Модули:** Разбивают код на логические блоки, повышая организованность и повторное использование.
* **Типизация данных:** 
    * `string`, `number`, `boolean`, `null`, `undefined`
    * `Array<T>`, `Tuple`, `Object`
    * `Enum`, `any`, `unknown`
* **Generics:** Позволяют создавать гибкие функции и классы, работающие с различными типами данных.

**Синтаксис:**

* **Объявление переменных:** `let`, `const`
* **Типизация переменных:** `let name: string = "Иван";`
* **Функции:**
    ```typescript
    function greet(name: string): string {
        return `Привет, ${name}!`;
    }
    ```
* **Интерфейсы:**
    ```typescript
    interface Person {
        name: string;
        age: number;
    }
    ```
* **Классы:**
    ```typescript
    class Car {
        brand: string;
        model: string;

        constructor(brand: string, model: string) {
            this.brand = brand;
            this.model = model;
        }

        startEngine(): void {
            console.log("Двигатель запущен");
        }
    }
    ```

**Полезные инструменты:**

* **TypeScript Playground:** онлайн-редактор для тестирования кода.
* **Visual Studio Code:** IDE с отличной поддержкой TS.
* **ts-node:** позволяет запускать TS-код без компиляции.
* **tsc:** компилятор TS, который преобразует TS-код в [JavaScript](./JavaScript).

**Дополнительные материалы:**

* **Официальная документация:** [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
* **TypeScript Handbook:** [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)
* **Курсы на Udemy, Coursera:** [https://www.udemy.com/](https://www.udemy.com/), [https://www.coursera.org/](https://www.coursera.org/)

**Примеры:**

```typescript
// Интерфейс для определения структуры объекта
interface User {
  name: string;
  age: number;
  city: string;
}

// Создание объекта с использованием интерфейса
const user: User = {
  name: "Иван",
  age: 30,
  city: "Москва",
};

// Функция, принимающая объект User
function greetUser(user: User): void {
  console.log(`Привет, ${user.name}!`);
}

greetUser(user);
```

**Советы:**

* Используйте строгую типизацию, чтобы избежать ошибок.
* Пишите чистый, читаемый код с использованием интерфейсов и классов.
* Используйте TypeScript Playground для быстрого тестирования кода.
* Не бойтесь экспериментировать и использовать различные инструменты!


---

## Связанные

- [[TypeScript]]
- [[Function Declaration vs Function Expression]]
