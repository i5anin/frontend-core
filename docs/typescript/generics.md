# Интерфейсы и дженерики 

Generics — это ключевые механизмы TypeScript, обеспечивающие строгую типизацию и повторное использование кода без потери гибкости.

---

### **Интерфейсы (Interfaces)**

Интерфейс определяет **структуру объекта**, описывая, какие свойства и методы он должен содержать. Это не реализация, а контракт.

```ts
interface User {
  id: number
  name: string
  email?: string // необязательное поле
}

function printUser(user: User): void {
  console.log(`${user.id}: ${user.name}`)
}
```

**Особенности:**

* Интерфейсы могут **расширять** друг друга:

  ```ts
  interface Admin extends User {
    role: 'admin' | 'superadmin'
  }
  ```
* Можно **объединять интерфейсы с одинаковыми именами** — TypeScript их сливает.
* Интерфейсы применимы не только к объектам, но и к функциям и классам:

  ```ts
  interface Logger {
    (message: string): void
  }

  const log: Logger = msg => console.log(msg)
  ```

---

### **Дженерики (Generics)**

Generics — это **параметры типов**, позволяющие писать функции, интерфейсы и классы, работающие с разными типами данных без потери типовой информации.

Простейший пример:

```ts
function identity<T>(value: T): T {
  return value
}

const num = identity<number>(42)
const str = identity('TypeScript') // T выводится автоматически
```

**Использование в интерфейсах и типах:**

```ts
interface ApiResponse<T> {
  data: T
  success: boolean
}

const response: ApiResponse<User> = {
  data: { id: 1, name: 'Сергей' },
  success: true
}
```

**Ограничения (constraints):**
Generics можно ограничивать через `extends`:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}
```

---

### **Интерфейсы + дженерики вместе**

Можно использовать интерфейсы с параметрами типов:

```ts
interface Repository<T> {
  findById(id: number): T | null
  save(entity: T): void
}

class UserRepository implements Repository<User> {
  private users: User[] = []

  findById(id: number): User | null {
    return this.users.find(u => u.id === id) || null
  }

  save(user: User): void {
    this.users.push(user)
  }
}
```

---

### **Когда использовать**

* **Интерфейсы** — когда нужна чёткая структура данных или контракт для классов/функций.
* **Дженерики** — когда тип данных неизвестен заранее, но нужно сохранить строгую типизацию (например, API, репозитории, утилиты).

---

### **TypeScriptDoc**

```ts
/**
 * @summary Демонстрация интерфейсов и дженериков в TypeScript
 * @description Пример использования интерфейсов для описания контрактов и дженериков для универсальности кода
 * @param <T> Обобщённый тип, используемый для параметризации интерфейсов и функций
 * @returns Универсальные и типобезопасные структуры данных
 * @throws Не выбрасывает исключений
 * @example
 * interface Entity<T> { id: number; data: T }
 * const user: Entity<User> = { id: 1, data: { name: 'Сергей' } }
 * @since 2025-10-29
 */
```

---

Интерфейсы обеспечивают структуру. Дженерики дают гибкость. Вместе они делают код безопасным, читаемым и универсальным — то, что в 2025 году уже стандарт для любого зрелого TypeScript-проекта.
