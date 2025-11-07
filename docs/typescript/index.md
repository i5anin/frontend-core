# TypeScript

> 📘 [Официальный Handbook TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)

### Концепция

**TypeScript** — надстройка над JavaScript, добавляющая **статическую типизацию**, проверку кода на этапе компиляции и поддержку современных возможностей языка.
В контексте фронтенда с Vue 3 и Vite, TS используется для типобезопасности данных, автодополнения, документирования интерфейсов и предотвращения ошибок при сборке.

---

### Установка и настройка

```bash
pnpm add -D typescript vue-tsc
```

Создай `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowJs": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "useDefineForClassFields": true,
    "noImplicitAny": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}
```

Проверка типов:

```bash
pnpm vue-tsc --noEmit
```

---

### Основы типизации

#### Примитивы

```ts
let isActive: boolean = true
let count: number = 42
let username: string = 'Alex'
let values: number[] = [1, 2, 3]
```

#### Объекты и интерфейсы

```ts
interface User {
  id: string
  email: string
  name?: string // необязательное поле
}

const user: User = 
    { id: 'u1', email: 'a@example.com' }
```

#### Объединения и пересечения

```ts
type ApiResponse = {
    status: number
} & (
    | { data: unknown }
    | { error: string }
    )
```

#### Литеральные типы

```ts
type Theme = 'light' | 'dark'
```

#### Enum и константные объекты

```ts
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}
```

#### Кортежи

```ts
const entry: [string, number] = 
    ['views', 100]
```

---

### Функции

```ts
function sum(a: number, b: number): number {
  return a + b
}

const log = (msg: string): void => console.log(msg)

function fetchData(): Promise<string[]> {
  return Promise.resolve(['a', 'b'])
}
```

---

### Обобщения (Generics)

Позволяют описывать типы параметров:

```ts
function identity<T>(value: T): T {
  return value
}
const id = identity<number>(5)
```

Комбинирование с интерфейсами:

```ts
interface ApiResponse<T> {
  data: T
  status: number
}
```

---

### Типизация в Composition API

Vue автоматически выводит типы при использовании `ref`, `reactive`, `computed`, но их можно уточнять:

```ts
const count = ref<number>(0)
const user = reactive<{ name: string; age: number }>({ name: 'Tom', age: 30 })
```

Пример с `defineProps` и `defineEmits`:

```vue
<script setup lang="ts">
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ (e: 'loaded', data: object): void }>()
</script>
```

---

### Типизация стора (Pinia)

```ts
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '' as string,
    age: 0 as number,
  }),
  getters: {
    upperName: (state) => state.name.toUpperCase(),
  },
  actions: {
    setName(name: string) {
      this.name = name
    },
  },
})
```

Pinia автоматически выводит типы для state, getters и actions.

---

### Типы данных Vue Router

```ts
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomeView.vue') },
]
```

---

### Утилиты TypeScript

* `Partial<T>` — делает все поля опциональными.
* `Required<T>` — делает все поля обязательными.
* `Pick<T, K>` — выбирает подмножество свойств.
* `Omit<T, K>` — исключает свойства.
* `Record<K, T>` — объект с фиксированными ключами и типом значений.
* `ReturnType<T>` — возвращаемый тип функции.

Примеры:

```ts
type User = { id: string; name: string; email: string }
type PublicUser = Pick<User, 'id' | 'name'>
type UserMap = Record<string, User>
```

---

### Типизация API-запросов

```ts
interface ApiResponse<T> {
  data: T
  error?: string
}

async function getUser(
    id: string
): Promise<ApiResponse<User>> {
    const res = await fetch(`/api/user/${id}`)
    return res.json()
}
```

---

### Типизация событий

```ts
function handleClick(e: MouseEvent) {
  console.log(e.clientX)
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  console.log(target.value)
}
```

---

### Работа с unknown и never

```ts
function parse(value: unknown) {
  if (typeof value === 'string') return value.toUpperCase()
  throw new Error('Not a string')
}

function fail(msg: string): never {
  throw new Error(msg)
}
```

---

### Расширенные возможности

#### Type Guards

```ts
function isUser(obj: any): obj is User {
    return typeof obj.id === 'string'
        && typeof obj.email === 'string'
}

```

#### Discriminated Unions

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(s: Shape) {
    return s.kind === 'circle'
        ? Math.PI * s.radius ** 2
        : s.size ** 2
}
```

---

### Настройки строгого режима

Рекомендуется включать все строгие флаги:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "noUnusedLocals": true,
  "noImplicitReturns": true
}
```

---

### Типизация .vue-файлов

Добавь декларацию для Vue:

```ts
// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

---

### Интеграция с Vite

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': '/src' },
  },
})
```

Vite сам подхватывает `tsconfig.json` и типы окружения через `vite/client`.

---

### Проверка и автоматизация

Добавь команды в `package.json`:

```json
{
  "scripts": {
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint src --ext .ts,.vue"
  }
}
```

---

### Лучшие практики

* Типизируй все внешние интерфейсы (API, props, emits, events).
* Избегай `any` — используй `unknown` и проверки типов.
* Храни типы в `src/types/` и экспортируй из index-файлов.
* Используй `zod` или `valibot` для runtime-валидации.
* Разделяй типы домена и транспорта (`User` vs `UserDto`).
* Включи строгий режим компилятора.
* Следи за совпадением типов на клиенте и сервере при работе с API.

---

### Пример реального использования

```ts
// src/types/user.ts
export interface User {
  id: string
  email: string
  name: string
}

// src/api/users.ts
import type { User } from '@/types/user'

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users')
  return res.json()
}
```

---

TypeScript в связке с Vue 3 делает код самодокументируемым, безопасным и удобным для рефакторинга.
Он снижает вероятность ошибок, ускоряет разработку и превращает сложные приложения в предсказуемо работающие системы с чёткими контрактами данных.
