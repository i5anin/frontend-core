# TS – Типы данных, объединение и пересечение типов

## Базовые типы TypeScript

Использует JS-типы + расширенные:

- `string`
    
- `number`
    
- `boolean`
    
- `bigint`
    
- `symbol`
    
- `null`
    
- `undefined`
    
- `object`
    
- `unknown` — более безопасная версия `any`
    
- `any` — отключение типизации
    
- `void` — отсутствие результата
    
- `never` — функция не возвращает управление (ошибки/бесконечный цикл)
    

---

## Литеральные типы

Фиксированные значения:

```ts
type Status = 'ok' | 'error'
```

---

## Объединение типов (Union)

Запись: `A | B`  
Значение может быть одного из типов.

Пример:

```ts
let value: string | number
```

Используется для API-ответов, параметров, состояний.

---

## Пересечение типов (Intersection)

Запись: `A & B`  
Объединяет свойства нескольких типов — объект должен удовлетворять обоим типам.

Пример:

```ts
type A = { id: number }
type B = { name: string }

type User = A & B // { id: number; name: string }
```

Используется для смешивания моделей (mixins), расширения типов.

---

## Интерфейсы и алиасы типов

### interface

Подходит для описания объектов и классов.

```ts
interface User {
  id: number
  name: string
}
```

Поддерживает расширение:

```ts
interface Admin extends User {
  role: string
}
```

### type

Более гибок:

```ts
type User = { id: number } & { name: string }
```

Можно описывать:

- объединения,
    
- пересечения,
    
- примитивы,
    
- кортежи,
    
- функции.
    

---

## Кортежи (Tuples)

Фиксированная структура массива:

```ts
type Pair = [number, string]
```

---

## Enum и Const Enum

```ts
enum Status { OK, ERROR }
const enum Direction { Up, Down }
```

`const enum` — компилируется в inline-значения.

---

## Дженерики (Generics)

Параметры типов для функций, классов, интерфейсов:

```ts
function wrap<T>(value: T) {
  return { value }
}
```

Шаблон для типобезопасной универсальности.

---

## Утилиты (Utility Types)

Используются повсеместно:

- `Partial<T>`
    
- `Pick<T, K>`
    
- `Omit<T, K>`
    
- `Readonly<T>`
    
- `Record<K, T>`
    
- `ReturnType<T>`
    
- `Exclude`, `Extract`
    

Позволяют быстро конструировать новые типы на основе существующих.

