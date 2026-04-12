# Интерфейсы TypeScript

## Interface vs Type Alias

```ts
// Interface — только для объектов
interface User {
  name: string;
  age: number;
}

// Type — для любых типов
type User = { name: string; age: number };
type ID = string | number;
type Callback = (data: string) => void;
```

**Ключевые различия:**

| | Interface | Type |
|---|---|---|
| Extends | `extends` | `&` |
| Declaration merging | ✅ | ❌ |
| Union/Intersection | ❌ | ✅ |
| Computed properties | ❌ | ✅ |

## Наследование интерфейсов

```ts
interface Animal {
  name: string;
  breathe(): void;
}

interface Dog extends Animal {
  bark(): void;
}

interface WorkingDog extends Dog {
  task: string;
}

// Множественное наследование
interface AB extends A, B {}
```

## Declaration Merging

```ts
// Два одинаковых интерфейса объединяются автоматически
interface Window {
  myCustomVar: string;
}

interface Window {
  myCustomFunc(): void;
}

// Итог: Window имеет оба свойства
```

## Интерфейс для функций

```ts
interface GreetFn {
  (name: string): string;
}

const greet: GreetFn = (name) => `Hello, ${name}`;

// Или через type
type GreetFn = (name: string) => string;
```

## Интерфейс для классов (implements)

```ts
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class User implements Serializable {
  constructor(public name: string) {}

  serialize() {
    return JSON.stringify({ name: this.name });
  }

  deserialize(data: string) {
    const parsed = JSON.parse(data);
    this.name = parsed.name;
  }
}
```

## Index Signatures

```ts
// Объект с неизвестными ключами
interface StringMap {
  [key: string]: string;
}

const map: StringMap = {
  name: 'Alice',
  city: 'Moscow'
};

// Число как ключ
interface NumberMap {
  [index: number]: string;
}
```

## Nested Interfaces

```ts
interface Address {
  city: string;
  country: string;
}

interface User {
  name: string;
  address: Address;
  contacts: {
    email: string;
    phone?: string;
  };
}
```

## Utility Types с Interface

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;      // все поля опциональные
type RequiredUser = Required<User>;    // все поля обязательные
type ReadonlyUser = Readonly<User>;    // все поля readonly

type UserPreview = Pick<User, 'id' | 'name'>;     // только нужные
type UserWithout = Omit<User, 'email' | 'age'>;   // без лишних

type UserRecord = Record<'admin' | 'user', User>; // словарь
```
