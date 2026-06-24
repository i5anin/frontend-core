---
tags:
  - карьера
  - typescript
created: 2025-01-12
date: 2025-01-12
---
В [../TypeScript/TypeScript](#) можно объявить переменные, параметры или возвращаемые значения с несколькими типами, используя **объединения (`Union`)** или **пересечения (`Intersection`)**. Эти инструменты помогают описывать значения, которые могут принадлежать нескольким типам, или комбинировать несколько типов в один.

---

****1. Объединение типов (Union Types)****

Объединение типов позволяет переменной принимать значения нескольких разных типов. Используется оператор `|`.

**Пример:**

```typescript
let value: string | number;

value = "Hello"; // Строка
value = 42;      // Число

// Ошибка: значение должно быть либо строкой, либо числом
// value = true;
```

**Пример с функцией:**

```typescript
function printId(id: string | number) {
  console.log(`Ваш ID: ${id}`);
}

printId("12345"); // Работает
printId(67890);   // Работает
```

---

****2. Пересечение типов (Intersection Types)****

Пересечение типов позволяет объединить несколько типов в один. Используется оператор `&`. Это означает, что переменная должна соответствовать **всем типам одновременно**.

**Пример:**

```typescript
type Person = { name: string };
type Employee = { employeeId: number };

type EmployeeDetails = Person & Employee;

const emp: EmployeeDetails = {
  name: "Alice",
  employeeId: 123,
};
```

---

****3. Комбинирование `Union` и `Intersection`****

Можно сочетать объединения и пересечения типов.

**Пример:**

```typescript
type Admin = { role: string };
type User = { name: string };

type Person = Admin | User; // Либо Admin, либо User
type AdminUser = Admin & User; // Обе роли одновременно

const person1: Person = { role: "Admin" }; // Либо Admin
const person2: Person = { name: "John" };  // Либо User

const person3: AdminUser = { role: "Admin", name: "Alice" }; // И Admin, и User
```

---

****4. Массивы с несколькими типами****

TypeScript позволяет указывать типы элементов массива.

**Массив с объединёнными типами:**

```typescript
let data: (string | number)[] = ["Alice", 42, "Bob", 100];
```

**Массив с пересечениями:**

Обычно пересечения в массивах не используются напрямую, но можно описать массив объектов с несколькими типами.

---

****5. Использование `Union` и `Intersection` в функциях****

**Параметры с объединением:**

```typescript
function processInput(input: string | number) {
  if (typeof input === "string") {
    console.log(`Строка: ${input}`);
  } else {
    console.log(`Число: ${input}`);
  }
}
```

**Возвращаемые значения:**

```typescript
function getId(id: string | number): string | number {
  return id;
}
```

**Пересечения в функциях:**

```typescript
type Admin = { role: string };
type User = { name: string };

function greetPerson(person: Admin & User) {
  console.log(`Привет, ${person.name}, ваша роль: ${person.role}`);
}

greetPerson({ name: "Alice", role: "Admin" });
```

---

****6. Пример с интерфейсами****

**Объединение типов:**

```typescript
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

type Vehicle = Car | Boat;

function operate(vehicle: Vehicle) {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}
```

**Пересечение типов:**

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

type AmphibiousVehicle = Flyable & Swimmable;

const vehicle: AmphibiousVehicle = {
  fly: () => console.log("Flying"),
  swim: () => console.log("Swimming"),
};

vehicle.fly();
vehicle.swim();
```

---

****7. Пример с дженериками****

**Объединение:**

```typescript
function combine<T extends string | number>(a: T, b: T): T {
  return (a as any) + (b as any); // Пример для строк или чисел
}

console.log(combine(1, 2));        // 3
console.log(combine("A", "B"));    // "AB"
// Ошибка: не поддерживается
// console.log(combine(true, false));
```

**Пересечение:**

```typescript
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const result = merge({ name: "Alice" }, { age: 25 });
console.log(result); // { name: "Alice", age: 25 }
```

---

****Итог****

- Используйте **`Union`** (`|`), когда значение может быть **одним из нескольких типов**.
- Используйте **`Intersection`** (`&`), когда значение должно быть **одновременно несколькими типами**.
- Эти инструменты позволяют эффективно и строго описывать типы в сложных структурах и функциях.

---

## Связанные

- [[Собеседование с Евгением]]
- [[! Map, включая использование методов .flat()]]
- [[! объединения двух объектов Map (m1 и m2) в один новый объект Map (m3).]]
- [[! с массивами и объектами Map, с использованием оператора расширения ... для объединения массивов и Map.]]
- [[Intersection Types]]
- [[Map в JavaScript.]]
