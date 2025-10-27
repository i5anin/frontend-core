## Архитектура

### Цели и принципы

* Предсказуемая структура, изоляция слоёв, слабые связи, высокая когезия.
* Чёткие границы: UI ↔ состояние ↔ домен ↔ инфраструктура.
* Runtime-агностичность: возможность SSR/SSG/CSR без переписывания логики.
* Контрактность: типы и интерфейсы на границах (DTO/Schema).
* Наблюдаемость и тестируемость: логирование, трейсинг, метрики, изолируемость модулей.

### Слои приложения

```
/src
├─ app/            # инициализация, провайдеры, маршрутизация, глобальные стили
├─ pages/          # страницы/роуты (минимум логики)
├─ widgets/        # крупные композиции UI (сост. из features/entities)
├─ features/       # пользовательские сценарии (actions, формы, интеракции)
├─ entities/       # доменные сущности (модели, хранилища, UI для сущности)
├─ shared/         # дизайн-токены, утилиты, api-клиенты, либы без побочек
└─ processes/      # кросс-страничные процессы (аутентификация, онбординг)
```

Подход совместим с Feature-Sliced Design: каждый слой имеет публичный API (`index.ts`) и локальные реализации.

### Публичные API модулей

Каждый модуль экспортирует только то, что нужно снаружи:

```ts
// features/auth-by-email/index.ts
export { AuthForm } from './ui/AuthForm.vue'
export { useEmailAuth } from './model/useEmailAuth'
```

Внутренние детали (сервисы, хелперы) не реэкспортируются.

### Маршрутизация и фичи

* Маршруты — декларативно, ленивые чанки и prefetch по интентам.
* Фичи подключаются через композицию (DI через провайдеры/фабрики), а не через глобальные синглтоны.

```ts
// app/router.ts
import { createRouter, createWebHistory } from 'vue-router'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/home') },
    { path: '/account', component: () => import('@/pages/account') },
  ],
})
```

### Состояние

* Локальное: `ref/computed` либо композиционные хуки `use*`.
* Глобальное: Pinia (или легковесные сторы per-entity/feature), без хранения вычислимых производных.
* Кэш запросов: слой запросов с дедупликацией, retry, отменой (AbortController).

```ts
// shared/api/queryClient.ts
type QueryKey = string
const cache = new Map<QueryKey, Promise<unknown>>()
export function query<T>(key: QueryKey, fn: () => Promise<T>) {
  if (!cache.has(key)) cache.set(key, fn())
  return cache.get(key) as Promise<T>
}
```

### Данные и контракты

* DTO/Schema через `zod`/`valibot` на границе сети.
* Маппинг `dto -> entity` отдельно, UI не знает о форматах транспорта.

```ts
// shared/api/schemas.ts
import { z } from 'zod'
export const UserDto = z.object({ id: z.string().uuid(), email: z.string().email(), name: z.string() })
export type UserDto = z.infer<typeof UserDto>

// entities/user/model/mapper.ts
export function mapUser(dto: UserDto) {
  return { id: dto.id, email: dto.email, displayName: dto.name }
}
```

### Транспортный слой

* REST/GraphQL/gRPC-web — через адаптеры, единый интерфейс клиента.
* Перехватчики: аутентификация, трейсинг, ретраи с экспоненциальным джиттером, таймауты.

```ts
// shared/api/http.ts
export async function http<T>(input: RequestInfo, init: RequestInit & { timeout?: number } = {}) {
  const c = new AbortController()
  const id = setTimeout(() => c.abort(), init.timeout ?? 10000)
  const res = await fetch(input, { ...init, signal: c.signal, credentials: 'include' })
  clearTimeout(id)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as T
}
```

### Обработка ошибок

* На границах: логирование и нормализация доменных ошибок.
* В UI: состояния loading/empty/error, без всплытия необработанных исключений.
* Глобальные перехватчики ошибок и promise rejection.

```ts
// app/errorBoundary.ts
window.addEventListener('unhandledrejection', (e) => {/* логирование, нотификация */})
window.addEventListener('error', (e) => {/* логирование */})
```

### SSR/SSG/CSR/ISR

* CSR по умолчанию, SSR/SSG для SEO-критичных страниц.
* Общая логика извлечена из платформенного кода: сторы/сервисы не зависят от DOM.
* Гидратация частичная (islands) для тяжелых виджетов; критичный CSS инлайн, остальное — отложенно.

Стратегии данных на SSR:

* `render-then-data` для интерактивности и TTFB.
* `data-then-render` для критичных SEO страниц.

### Фича-флаги и конфигурация

* Флаги — из удаленного конфига или `env`, прогружаются на старте, доступны через провайдер.
* Стабильные точки расширения: включение/выключение виджетов, маршрутов, экспериментальных API.

```ts
// shared/config/index.ts
export interface AppConfig { apiBase: string; flags: Record<string, boolean> }
export const cfg = reactive<AppConfig>({ apiBase: '/api', flags: {} })
```

### Безопасность в архитектуре

* CSP-дружественный код, без инлайн-скриптов, Trusted Types при наличии.
* Аутентификация — через `httpOnly` cookie/DPoP/PKCE; токены вне `localStorage`.
* Разделение доменов: статика и API на разных поддоменах, строгий CORS.
* Валидация входов на клиенте и сервере (двойной контур).

### Производительность

* Разделение кода по маршрутам и фичам, prefetch на hover/idle.
* Виртуализация длинных списков, мемоизация вычислений.
* Изображения: `srcset/sizes`, AVIF/WebP, `loading=lazy`, responsive placeholders.
* Web Vitals бюджет: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.

### i18n и локализация

* Lazy loading словарей по языкам/namespace.
* Форматы дат/валют через Intl API, без крупных библиотек.
* Ключи i18n как публичный контракт фичи/виджета.

```ts
// shared/i18n/index.ts
export function t(key: string, params?: Record<string, string>) { /* ... */ }
```

### Доступность (a11y)

* Семантический HTML, правильные роли/aria, ловля фокуса и видимые focus-стили.
* Управление через клавиатуру, `prefers-reduced-motion` для анимаций.

### Модульные границы и зависимость

* Внутри слоя импорт вниз запрещён (например, `features` не импортирует `pages`).
* Межслойные зависимости явно задокументированы (ADR) и проверяются линтером импортов.

```js
// .eslintrc.cjs (фрагмент правил импортов)
'import/no-restricted-paths': ['error', { zones: [
  { target: './src/shared', from: './src/app' }, // пример политики
]}]
```

### Событийная модель и интеграции

* Доменные события между модулями — через шину событий, без прямых вызовов UI ↔ домен.
* Внешние интеграции оборачиваются в адаптеры, тестируются фейками.

```ts
// shared/event-bus.ts
type Handler<T> = (p: T) => void
const bus = new Map<string, Set<Handler<any>>>()
export const on = <T>(e: string, h: Handler<T>) => (bus.get(e) ?? bus.set(e, new Set()).get(e)!).add(h)
export const emit = <T>(e: string, p: T) => bus.get(e)?.forEach(h => h(p))
```

### Монорепозиторий и переиспользование

* Monorepo (pnpm workspaces) для общих библиотек: дизайн-система, утилиты, API-клиент.
* Версионирование пакетов — через changesets/semantic-release.
* Внутренние пакеты — ESM, treeshake-friendly, без побочных эффектов.

```
/packages
  /ui-kit
  /utils
  /api-client
/apps
  /web
  /admin
```

### Наблюдаемость

* Логи фронта (Sentry/otel-js) с выпускной версией и sourcemaps.
* Метрики Web Vitals + пользовательские (конверсия, ошибки форм).
* Трейсинг запросов: корелляция с бэкендом (traceparent).

### Тестирование архитектурных контрактов

* Контрактные тесты API: схемы валидируются в CI.
* Снимки публичных API модулей (barrels): контроль регрессий.
* Интеграционные тесты фич (без реального API): фейки и сценарии через `@vue/test-utils`.

### Пример сквозного сценария

1. **Страница** `pages/orders` подключает виджет `widgets/orders-table`.
2. Виджет собирает фичи: `features/order-filter`, `features/order-export`.
3. Фича `order-filter` читает/пишет стор сущности `entities/order` (фильтры, пагинация).
4. `entities/order` использует `shared/api` для данных и `shared/ui` для атомарных компонентов.
5. Ошибки запросов нормализуются `shared/errors`, отображаются через общий `ErrorState`.

### ADR (Architecture Decision Records)

* Для значимых решений фиксируются: контекст, варианты, выбор, последствия.
* Хранятся в `docs/adr/NNN-title.md`, линкуются из README модуля.

### Чек-лист архитектурного ревью

* Границы слоёв соблюдены, циклических зависимостей нет.
* Публичные API минимальны и документированы.
* Побочки локализованы, бизнес-логика детерминирована и тестируема.
* Сетевой слой унифицирован, схема/валидация на границе есть.
* Производительность и a11y учтены, i18n не «зашит» в строки.
* Безопасность: нет прямого `innerHTML`, токены не в хранилищах браузера.
* Настроена наблюдаемость: логи, метрики, релизные версии, sourcemaps.
