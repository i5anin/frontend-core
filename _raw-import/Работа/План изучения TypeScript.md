---
tags: [typescript, роадмап, обучение]
created: 2026-06-20
---

# TypeScript — роадмап

> Для Vue / NestJS разработчика. Фокус — практика на реальных проектах, не академия.

---

## Уровень 1 — Базовые типы

| Тема | Пример |
|---|---|
| Примитивы | `string`, `number`, `boolean`, `null`, `undefined` |
| `any` / `unknown` / `never` / `void` | `unknown` — безопасная альтернатива `any` |
| Массивы и кортежи | `string[]`, `[number, string]` |
| Опциональные свойства | `age?: number` |
| Union / Intersection | `string \| number`, `A & B` |
| Literal types | `type Dir = 'left' \| 'right'` |
| Enum | `enum Role { Admin, User }` |
| Функции | `(a: number) => string` |

---

## Уровень 2 — Интерфейсы и типы

```ts
interface User {
  id: number
  name: string
  role?: 'admin' | 'user'
}

type ID = string | number
```

- `interface` — для объектов и классов, можно расширять (`extends`)
- `type` — для union, intersection, псевдонимов

---

## Уровень 3 — Generics и утилиты

```ts
function wrap<T>(val: T): T[] { return [val] }
```

| Утилита | Что делает |
|---|---|
| `Partial<T>` | Все поля опциональны |
| `Required<T>` | Все поля обязательны |
| `Pick<T, K>` | Взять только нужные поля |
| `Omit<T, K>` | Убрать ненужные поля |
| `Record<K, V>` | Словарь |
| `Exclude<T, U>` | Убрать из union |

---

## Уровень 4 — Мета-программирование

```ts
type Keys = keyof User           // 'id' | 'name' | 'role'
type Val = typeof config         // тип из значения
type R = ReturnType<typeof fn>   // тип возврата функции

// infer — вытащить тип изнутри
type Unwrap<T> = T extends Promise<infer U> ? U : T
```

---

## В проектах

**Vue 3**

```ts
// defineProps и defineEmits — с типами
const props = defineProps<{ title: string; count?: number }>()
const emit = defineEmits<{ change: [value: string] }>()

// ref и reactive
const name = ref<string>('')
const user = reactive<User>({ id: 1, name: 'Иван' })
```

**NestJS**

```ts
// DTO с валидацией
export class CreateUserDto {
  @IsString() name: string
  @IsEmail() email: string
}

// Generic репозиторий
constructor(private repo: Repository<User>) {}
```

---

## Чеклист

- [ ] Убрал `any` во всех компонентах и сервисах
- [ ] Типизировал props и emits через `defineProps<T>()`
- [ ] Понимаю `Partial`, `Pick`, `Omit`, `Record`
- [ ] Написал хотя бы одну Generic-функцию
- [ ] `strict: true` включён в `tsconfig.json`
- [ ] Типизировал middleware / guards в NestJS

---

## Ресурсы

| Ресурс | Для чего |
|---|---|
| [typescriptlang.org/docs](https://www.typescriptlang.org/docs/handbook/intro.html) | Официальный handbook |
| [typescript-exercises.github.io](https://typescript-exercises.github.io) | Практика задачами |
| [type-challenges](https://github.com/type-challenges/type-challenges) | Прокачка (easy → hard) |
| [ts-reset](https://github.com/total-typescript/ts-reset) | Современный TS стиль |

---

## Связанные

- [[Vue — роадмап]]
- [[От Junior до Senior]]
- [[Площадки для прокачивания скилов]]
