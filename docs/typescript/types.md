## Объединение и пересечение типов

### Объединение типов (Union Types)

Объединение (`|`) описывает значение, которое может принадлежать **одному из нескольких типов**.
TypeScript проверяет каждый возможный вариант, помогая явно обработать все случаи.

```ts
let value: string | number
value = 'Hello'
value = 42
```

---

#### Пример с функцией

```ts
function printId(id: string | number) {
  console.log('ID:', id)
}
printId(10)
printId('abc')
```

Когда тип объединён, компилятор требует проверки типа перед доступом к специфичным свойствам:

```ts
function getLength(x: string | string[]) {
  if (typeof x === 'string') return x.length
  return x.join(', ').length
}
```

---

#### Объединения объектов

```ts
type ApiResponse = { success: true; data: string } | { success: false; error: string }

function handleResponse(res: ApiResponse) {
  if (res.success) console.log('Data:', res.data)
  else console.error('Error:', res.error)
}
```

---

#### Discriminated Union (дискриминированные объединения)

Используются для безопасной обработки разных «вариантов» объекта с помощью общего поля-дискриминатора.

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.side ** 2
  }
}
```

TypeScript сам понимает, какая ветка активна — дополнительная проверка не требуется.

---

### Пересечение типов (Intersection Types)

Пересечение (`&`) объединяет **свойства нескольких типов в один**, создавая тип, который должен удовлетворять всем включённым контрактам одновременно.

```ts
interface A { a: string }
interface B { b: number }

type AB = A & B

const obj: AB = { a: 'x', b: 5 }
```

---

#### Пример с объединением данных

```ts
type User = { id: string; name: string }
type Contact = { email: string; phone?: string }

type UserProfile = User & Contact

const profile: UserProfile = {
  id: 'u1',
  name: 'Alice',
  email: 'a@example.com',
}
```

---

#### Совмещение пересечения и объединения

Можно комбинировать оба подхода для сложных структур:

```ts
type Success = { ok: true; data: string }
type Failure = { ok: false; error: string }
type ApiResponse = (Success | Failure) & { timestamp: number }

const res: ApiResponse = { ok: true, data: 'done', timestamp: Date.now() }
```

---

### Пересечения с функциями

Пересечение сигнатур используется для создания **перегрузок**:

```ts
type Add = ((a: number, b: number) => number) & ((a: string, b: string) => string)

const add: Add = (a: any, b: any) => a + b
```

---

### Пример с интерфейсами и типами

```ts
interface WithTimestamps {
  createdAt: Date
  updatedAt: Date
}

type User = { id: string; name: string }

type UserWithTimestamps = User & WithTimestamps
```

---

### Пример практического использования

#### Модель данных API

```ts
type BaseEntity = { id: string; createdAt: string }
type UserDto = { email: string; name: string }
type AdminDto = { role: 'admin'; permissions: string[] }

type UserResponse = (UserDto | AdminDto) & BaseEntity
```

#### Пример результата:

```ts
const user: UserResponse = {
  id: 'u1',
  createdAt: '2025-01-01',
  email: 'a@example.com',
  name: 'Alice',
}
```

---

### Конфликт свойств при пересечении

Если одинаковые поля имеют несовместимые типы, результат — `never`:

```ts
type A = { value: string }
type B = { value: number }
type C = A & B // { value: never }
```

Это помогает TypeScript выявлять логические противоречия.

---

### Utility-типы с объединениями и пересечениями

```ts
type Entity<T> = { id: string } & T
type Animal = { species: string }
type Dog = Entity<Animal>

type PartialUser = Partial<User> | null
```

---

### Сведение разнородных объединений

TypeScript может использовать **type guards** для безопасной работы с объединёнными типами:

```ts
function isUser(x: any): x is User {
  return typeof x.id === 'string' && 'name' in x
}

function process(data: User | AdminDto) {
  if ('permissions' in data) console.log('Admin:', data.permissions)
  else console.log('User:', data.name)
}
```

---

### Итог

* `|` (объединение) — **«или»**, значение принадлежит одному из нескольких типов.
* `&` (пересечение) — **«и»**, тип должен включать свойства всех объединённых типов.
* Эти конструкции часто используются вместе для создания сложных моделей данных, API-ответов и безопасных проверок типов.

Объединения повышают **гибкость**, пересечения обеспечивают **строгость** и **композицию** типов — вместе они позволяют строить выразительные и надёжные контракты данных в TypeScript.
