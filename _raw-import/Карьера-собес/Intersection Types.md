---
tags:
  - карьера
  - typescript
created: 2025-01-12
date: 2025-01-12
---
На изображении используется **пересечение типов** (`Intersection Types`) в [../TypeScript/TypeScript](#). Давайте разберём код и его особенности.

---

**Код из изображения:**

```typescript
type Bar = {
  name: string;
  price: number;
};

type Foo = {
  age: number;
};

type FooBar = Bar & Foo;

const element: FooBar = {
  name: 'test',
  age: 123,
  price: 40000,
};
```

---

**Разбор кода:**

****1. Типы `Bar` и `Foo`:****

- **`Bar`**:
    
    ```typescript
    type Bar = {
      name: string;
      price: number;
    };
    ```
    
    Тип описывает объект, который должен иметь:
    
    - `name` — строку.
    - `price` — число.
- **`Foo`**:
    
    ```typescript
    type Foo = {
      age: number;
    };
    ```
    
    Тип описывает объект, который должен иметь:
    
    - `age` — число.

****2. Пересечение типов (`FooBar`):****

- Пересечение типов (`&`) объединяет свойства из обоих типов (`Bar` и `Foo`), создавая новый тип:
    
    ```typescript
    type FooBar = Bar & Foo;
    ```
    
    Теперь тип `FooBar` требует, чтобы объект включал **все свойства из `Bar` и `Foo`**:
    - `name: string`
    - `price: number`
    - `age: number`

****3. Объект `element`:****

- Объект `element` объявлен с типом `FooBar`:
    
    ```typescript
    const element: FooBar = {
      name: 'test',
      age: 123,
      price: 40000,
    };
    ```
    
    Поскольку тип `FooBar` требует все свойства из `Bar` и `Foo`, объект `element` включает:
    - `name: 'test'` (из `Bar`).
    - `price: 40000` (из `Bar`).
    - `age: 123` (из `Foo`).

Объект соответствует типу `FooBar`, поэтому ошибок нет.

---

**Основные моменты:**

1. **Пересечение типов (`&`):**
    
    - Объединяет свойства всех типов.
    - Объект должен соответствовать требованиям каждого типа.
    
    Пример:
    
    ```typescript
    type A = { a: string };
    type B = { b: number };
    
    type AB = A & B;
    
    const obj: AB = { a: 'Hello', b: 42 }; // Работает
    ```
    
2. **Если свойства пересекаются:** Если оба типа содержат свойство с одинаковым именем, его тип должен быть совместимым. Например:
    
    ```typescript
    type A = { value: string };
    type B = { value: number };
    
    type AB = A & B; // Ошибка: конфликт типов
    ```
    
3. **Когда использовать пересечения:**
    
    - Для описания объектов, которые должны соответствовать сразу нескольким типам.
    - Полезно для объединения типов из нескольких источников, например, данных API.

---

**Пример с пересечением:**

**Описание пользователя и сотрудника:**

```typescript
type User = {
  id: number;
  name: string;
};

type Employee = {
  employeeId: number;
  department: string;
};

type UserEmployee = User & Employee;

const person: UserEmployee = {
  id: 1,
  name: 'Alice',
  employeeId: 1001,
  department: 'HR',
};
```

Здесь `person` должен быть одновременно `User` и `Employee`.

---

**Отличие пересечения (`&`) от объединения (`|`):**

- **Пересечение (`&`)**: Требует, чтобы объект соответствовал **всем типам**.
    
    ```typescript
    type A = { a: string };
    type B = { b: number };
    
    type AB = A & B;
    
    const obj: AB = { a: 'Hello', b: 42 }; // OK
    ```
    
- **Объединение (`|`)**: Требует, чтобы объект соответствовал **хотя бы одному типу**.
    
    ```typescript
    type A = { a: string };
    type B = { b: number };
    
    type AB = A | B;
    
    const obj1: AB = { a: 'Hello' }; // OK
    const obj2: AB = { b: 42 };      // OK
    const obj3: AB = { a: 'Hello', b: 42 }; // OK
    ```
    

---

**Заключение:**

- Пересечения типов (`&`) полезны, когда нужно объединить свойства из нескольких типов.
- В вашем примере объект `element` успешно объединяет `Bar` и `Foo`, что делает его типом `FooBar`.

---

## Связанные

- [[Собеседование с Евгением]]
- [[! Map, включая использование методов .flat()]]
- [[! объединения двух объектов Map (m1 и m2) в один новый объект Map (m3).]]
- [[! с массивами и объектами Map, с использованием оператора расширения ... для объединения массивов и Map.]]
- [[Map в JavaScript.]]
- [[Ref vs. Reactive]]
