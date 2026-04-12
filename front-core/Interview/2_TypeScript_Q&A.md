# Senior Frontend Interview: TypeScript Q&A

## РАЗДЕЛ 1: TypeScript типизация (10 вопросов)

### Вопрос 1.1: Что такое type annotation vs type inference?

**Основные моменты:**
- Type annotation: явное указание типа `let x: number = 5;`
- Type inference: TypeScript сам определяет тип `let x = 5;` → number

**Ключевые примеры:**
```typescript
// Annotation
let age: number = 30;
let name: string = 'Alice';
function greet(name: string): string { return `Hi ${name}`; }

// Inference
let num = 42; // TypeScript понимает что это number
let str = 'hello'; // Это string
const arr = [1, 2, 3]; // number[]
```

---

### Вопрос 1.2: Что такое Union Types (|) и Intersection Types (&)?

**Основные моменты:**
- Union (|): может быть одно ИЛИ другое: `string | number`
- Intersection (&): должно быть одно И другое: `Admin & User`

**Ключевые примеры:**
```typescript
// Union
let id: string | number;
id = '123'; // ✓
id = 123; // ✓
id = true; // ✗

// Intersection
interface Admin { adminPanel: true; }
interface User { email: string; }
type SuperUser = Admin & User;
let user: SuperUser = {
  adminPanel: true,
  email: 'admin@example.com'
};
```

---

### Вопрос 1.3: Что такое Type Guards и Type Narrowing?

**Основные моменты:**
- Type guard: проверка чтобы сужить тип
- typeof, instanceof, in оператор

**Ключевые примеры:**
```typescript
function process(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // ✓ Знаем что это string
  } else {
    console.log(value.toFixed(2)); // ✓ Знаем что это number
  }
}

// Custom type guard
function isUser(obj: any): obj is User {
  return 'email' in obj;
}

let data: User | Post;
if (isUser(data)) {
  console.log(data.email); // ✓ Type narrowing
}
```

---

### Вопрос 1.4: Что такое Generics? Как и когда использовать?

**Основные моменты:**
- Generics позволяют писать переиспользуемый код с разными типами
- `<T>` - типовая переменная

**Ключевые примеры:**
```typescript
// Generic функция
function identity<T>(value: T): T {
  return value;
}
identity<string>('hello'); // string
identity<number>(42); // number

// Generic интерфейс
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  getValue() { return this.value; }
}

const box = new Box<string>('hello');
```

---

### Вопрос 1.5: Что такое Generic Constraints?

**Основные моменты:**
- Ограничить типовую переменную: `<T extends Type>`

**Ключевые примеры:**
```typescript
// T должен быть string или number
function addTag<T extends string | number>(item: T): T {
  return item;
}

// T должен иметь свойство length
function getLength<T extends { length: number }>(item: T) {
  return item.length;
}

getLength('hello'); // ✓
getLength([1, 2, 3]); // ✓
getLength(123); // ✗ Ошибка
```

---

### Вопрос 1.6: Что такое Conditional Types?

**Основные моменты:**
- Выбирать тип в зависимости от условия: `T extends U ? X : Y`

**Ключевые примеры:**
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<number>; // false

// Практический пример
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number
```

---

### Вопрос 1.7: Что такое Mapped Types?

**Основные моменты:**
- Трансформировать свойства типа: `{ [K in keyof T]: NewType }`

**Ключевые примеры:**
```typescript
interface User {
  name: string;
  age: number;
}

// Сделать все свойства опциональными
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Сделать все readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }
```

---

### Вопрос 1.8: Что такое Utility Types? (Partial, Pick, Omit, Record и т.д.)

**Основные моменты:**
- Встроенные типовые помощники для трансформации типов

**Ключевые примеры:**
```typescript
interface User { id: number; name: string; email: string; }

// Partial<T>: все свойства опциональные
type UserUpdate = Partial<User>; // id?, name?, email?

// Pick<T, K>: выбрать свойства
type UserPreview = Pick<User, 'id' | 'name'>; // {id, name}

// Omit<T, K>: исключить свойства
type UserWithoutEmail = Omit<User, 'email'>; // {id, name}

// Record<K, T>: объект с определенными ключами
type StatusCode = Record<'success' | 'error', number>;
// { success: number; error: number; }

// Readonly<T>, Exclude<T, U>, Extract<T, U>
```

---

### Вопрос 1.9: Как работает распределение в Conditional Types (Distributive)?

**Основные моменты:**
- Union типы распределяются над conditional types

**Ключевые примеры:**
```typescript
type Check<T> = T extends string ? true : false;

type Result = Check<string | number>;
// Распределяется как: Check<string> | Check<number>
// true | false = boolean

// Без распределения - используйте []
type NonDistributive<T> = [T] extends [string] ? true : false;
type Result2 = NonDistributive<string | number>; // false
```

---

### Вопрос 1.10: Что такое Decorators в TypeScript?

**Основные моменты:**
- Функции для аннотирования классов, методов, свойств
- Требуют включить `"experimentalDecorators": true` в tsconfig.json

**Ключевые примеры:**
```typescript
// Class decorator
function log<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`Creating ${constructor.name}`);
      super(...args);
    }
  };
}

@log
class User {
  constructor(public name: string) {}
}

// Method decorator
function deprecated(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.warn(`${propertyKey} is deprecated`);
    return original.apply(this, args);
  };
}
```

---

## РАЗДЕЛ 2: Типы данных, Union и Enum (8 вопросов)

### Вопрос 2.1: Что такое Enum и когда его использовать?

**Основные моменты:**
- Enum: перечисление именованных констант
- Numeric enum (по умолчанию): начиная с 0
- String enum: для более читаемых значений

**Ключевые примеры:**
```typescript
// Numeric enum
enum Direction { Up = 0, Down = 1, Left = 2, Right = 3 }
enum Direction { Up, Down, Left, Right } // Автоматическое 0,1,2,3

// String enum
enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' }

// Usage
let dir: Direction = Direction.Up;
let status: Status = Status.Active;

// Использование в API
const response = { status: 'ACTIVE' };
if (response.status === Status.Active) { }
```

---

### Вопрос 2.2: Enum vs as const vs Union type - какой выбрать?

**Основные моменты:**
- Enum: больше кода, но удобнее для больших наборов
- as const: более легкий вес, более современный
- Union: максимальная гибкость

**Ключевые примеры:**
```typescript
// Enum
enum Color { Red, Green, Blue }

// as const
const Colors = { Red: 'RED', Green: 'GREEN', Blue: 'BLUE' } as const;
type Color = typeof Colors[keyof typeof Colors]; // 'RED' | 'GREEN' | 'BLUE'

// Union
type Color = 'RED' | 'GREEN' | 'BLUE';
```

---

### Вопрос 2.3: Что такое Discriminated Unions (Tagged Unions)?

**Основные моменты:**
- Union с общим свойством (discriminator) для точного типирования

**Ключевые примеры:**
```typescript
interface SuccessResponse {
  type: 'success';
  data: string;
}

interface ErrorResponse {
  type: 'error';
  error: Error;
}

type Response = SuccessResponse | ErrorResponse;

function handle(response: Response) {
  if (response.type === 'success') {
    console.log(response.data); // ✓ Знаем что есть data
  } else {
    console.log(response.error); // ✓ Знаем что есть error
  }
}
```

---

### Вопрос 2.4: Что такое Literal Types?

**Основные моменты:**
- Конкретные значения как тип
- Используются с Union для выбора из набора значений

**Ключевые примеры:**
```typescript
// Literal types
type Direction = 'up' | 'down' | 'left' | 'right';
type HttpStatus = 200 | 301 | 404 | 500;
type Boolean = true | false;

function move(direction: Direction) { }
move('up'); // ✓
move('diagonal'); // ✗

// С объектами
const settings = {
  mode: 'dark' as const, // Literal 'dark', не string
  level: 5 as const // Literal 5, не number
};
```

---

### Вопрос 2.5: Что такое Readonly модификатор?

**Основные моменты:**
- Readonly: свойство нельзя менять
- ReadonlyArray: массив нельзя менять
- as const: автоматический readonly для объектов

**Ключевые примеры:**
```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = { apiUrl: 'https://...', timeout: 5000 };
config.apiUrl = 'https://new'; // ✗ Ошибка

type ReadonlyArray = readonly number[];
let arr: ReadonlyArray = [1, 2, 3];
arr[0] = 5; // ✗ Ошибка

// as const
const settings = { mode: 'dark', level: 5 } as const;
// Все свойства readonly и literal типов
```

---

### Вопрос 2.6: Разница между Optional (?) и Default parameters?

**Основные моменты:**
- Optional (?): может быть undefined
- Default parameter: используется если не передан

**Ключевые примеры:**
```typescript
function greet(name?: string) {
  // name может быть string | undefined
  console.log(name?.toUpperCase()); // Safe navigation
}

function greet(name: string = 'Guest') {
  // name будет всегда string
  console.log(name.toUpperCase());
}

greet(); // 'GUEST'
```

---

### Вопрос 2.7: Что такое Never type и когда его использовать?

**Основные моменты:**
- Never: тип который никогда не бывает
- Функции которые никогда не возвращают значение
- Exhaustiveness checking

**Ключевые примеры:**
```typescript
// Функция которая не возвращает (бросает исключение или бесконечный цикл)
function throwError(message: string): never {
  throw new Error(message);
}

// Исключить значение из union
type NonNull<T> = T extends null ? never : T;

// Exhaustiveness checking
type Direction = 'up' | 'down' | 'left' | 'right';

function handle(dir: Direction) {
  switch(dir) {
    case 'up': return 1;
    case 'down': return 2;
    case 'left': return 3;
    case 'right': return 4;
    default: const _exhaustive: never = dir; // Ошибка если забыли case
  }
}
```

---

### Вопрос 2.8: Что такое Type Aliases vs Interfaces? Разница?

**Основные моменты:**
- Type alias: для любых типов, использует =
- Interface: только для объектов, расширяемый

**Ключевые примеры:**
```typescript
// Type alias
type User = { name: string; age: number; };
type Status = 'active' | 'inactive';
type Callback = (data: string) => void;

// Interface
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  adminPanel: boolean;
}

// Merging interfaces
interface Window { myVar: string; }
interface Window { myFunc(): void; }
// Объединяются автоматически

// Type может быть Union, Interface нет
type Result = Success | Error;
```

---

**Статус:** 18 вопросов по TypeScript заполнено ✓

