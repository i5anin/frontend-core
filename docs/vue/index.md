# Vue 3

### Ключевые особенности

Vue 3 — это полностью переписанное ядро фреймворка с акцентом на производительность, масштабируемость и гибкость
архитектуры.
Он основан на **реактивности через Proxy**, поддерживает **Composition API**, улучшенный **TypeScript**, **Teleport**, *
*Suspense**, **Fragments** и имеет на 50–60% меньший runtime по сравнению с Vue 2.

---

### Новая реактивная система

Vue 3 заменил старый механизм `Object.defineProperty` на **Proxy**, что дало:

* глубокое отслеживание вложенных структур без рекурсий;
* улучшенную производительность обновлений;
* поддержку наблюдения за добавлением/удалением свойств;
* возможность создавать кастомные реактивные системы.

```ts
import {reactive, effect} from 'vue'

const state = reactive({count: 0})
effect(() => console.log(state.count))
state.count++ // триггерит effect
```

---

### Composition API

Новый декларативный способ описания логики через функции:

```vue

<script setup lang="ts">
  import {ref, computed, onMounted} from 'vue'

  const count = ref(0)
  const double = computed(() => count.value * 2)
  const increment = () => count.value++

  onMounted(() => console.log('mounted'))
</script>

<template>
  <button @click="increment">Count: {{ count }} / Double: {{ double }}</button>
</template>
```

Преимущества:

* композиция логики по смыслу, а не по опциям;
* повторное использование кода через `use*` функции;
* отличная типизация и тестируемость.

---

### Script Setup

Упрощённый синтаксис для компонентов:

* Автоматически обрабатывает `defineProps`, `defineEmits`, `defineExpose`.
* Не требует `export default`.
* Поддерживает top-level await.

```vue

<script setup lang="ts">
  const props = defineProps<{ title: string }>()
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

---

### Fragments и Teleport

* **Fragments** позволяют возвращать несколько корневых элементов из компонента.
* **Teleport** перемещает контент в любое место DOM, например, для модалок.

```vue

<template>
  <Teleport to="body">
    <div class="modal">
      <slot/>
    </div>
  </Teleport>
</template>
```

---

### Suspense

Поддержка асинхронных компонентов и загрузочных состояний:

```vue

<Suspense>
  <template #default>
    <UserProfile/>
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

```ts
export default {
    async setup() {
        const user = await fetchUser()
        return {user}
    },
}
```

---

### Оптимизация рендера

* Компилятор генерирует **оптимизированные шаблоны**, помечая динамические узлы.
* Используется **block tree tracking** — Vue обновляет только изменившиеся части.
* Поддерживается **hoisting** (вынесение неизменных узлов за рендер-функцию).
* **Patch flags** позволяют быстро определять, какие элементы нужно обновить.

Результат — в 2–3 раза меньше лишних перерендеров по сравнению с Vue 2.

---

### Реактивные утилиты

Vue 3 предоставляет набор низкоуровневых API:

* `ref`, `reactive`, `computed`, `readonly`, `shallowRef`, `shallowReactive`;
* `toRef`, `toRefs`, `unref`, `isRef`;
* `watch`, `watchEffect`, `effectScope`;
* `customRef` — создание своих реактивных свойств.

```ts
import {customRef} from 'vue'

function useDebouncedRef(value: string, delay = 300) {
    let timeout: number
    return customRef((track, trigger) => ({
        get() {
            track()
            return value
        },
        set(newValue) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                value = newValue
                trigger()
            }, delay)
        },
    }))
}
```

---

### Provide / Inject

Нативная поддержка внедрения зависимостей:

```ts
// Provider
import {provide} from 'vue'

provide('theme', 'dark')

// Consumer
import {inject} from 'vue'

const theme = inject('theme', 'light')
```

Типизация через `InjectionKey`:

```ts
const ThemeKey: InjectionKey<string> = Symbol()
provide(ThemeKey, 'dark')
const theme = inject(ThemeKey)!
```

---

### Telemetry и DevTools

Vue 3 имеет новый DevTools с:

* инспекцией реактивных данных;
* анализом производительности;
* трекингом эффектов и перерендеров;
* профилированием Composition API хуков.

---

### Встроенная поддержка TypeScript

* Полная типизация всех API (включая JSX/TSX).
* Автокомплит для props, emits и slots.
* Проверка типов через `vue-tsc`.

```bash
pnpm add -D vue-tsc
pnpm vue-tsc --noEmit
```

---

### Новые возможности шаблонов

* Директивы теперь поддерживают аргументы и модификаторы через выражения.
* Можно использовать `<script setup>` совместно с `<template>` и `<style scoped>`.
* Внутренне используется улучшенный компилятор шаблонов с поддержкой tree-shaking.

```vue

<template>
  <input v-model.trim="email" placeholder="email"/>
</template>
```

---

### Компонентная модель

* Компоненты — функции, возвращающие Virtual DOM или шаблон.
* Поддерживаются функциональные и асинхронные компоненты:

```ts
const AsyncComponent = defineAsyncComponent(() => import('./HeavyChart.vue'))
```

* Новая функция `defineExpose` позволяет явно экспортировать публичный API:

```vue

<script setup>
  const open = () => {
  }
  defineExpose({open})
</script>
```

---

### Улучшения производительности

* Быстрая инициализация за счёт **tree-shaking runtime**.
* Lazy-hydration в SSR.
* Сжатие runtime с помощью **proxy-based dependency tracking**.
* Уменьшено количество микротасков при обновлении реактивности.
* VDOM стал на 40% эффективнее при diff-процессе.

---

### Архитектура и расширяемость

Vue 3 теперь состоит из модулей:

* **@vue/reactivity** — ядро реактивности;
* **@vue/runtime-dom** — работа с DOM;
* **@vue/runtime-core** — Virtual DOM и компонентная система;
* **@vue/compiler-sfc** — компилятор `.vue` файлов.

Это делает возможным сборку кастомных рантаймов, например для WebGL или SSR.

---

### Интеграция с экосистемой

* **Pinia** — новый официальный стор, полностью на Composition API.
* **Vue Router 5** — TypeScript-first маршрутизация.
* **VueUse** — набор готовых composables.
* **Vite** — нативная сборка Vue 3 приложений.

---

### Принципы построения Vue 3-приложений

* Минимизируй глобальное состояние, всё через composables или Pinia.
* Используй `<script setup>` как основной синтаксис.
* Логику и данные разделяй — композиции чистые, без UI.
* Компоненты короткие и однофункциональные.
* Предпочитай декларативность: реактивные вычисления вместо ручных подписок.
* Следи за `watch` — избегай побочек, где можно обойтись `computed`.

---

### Чек-лист для продакшена

1. Включить `defineExpose()` только при необходимости.
2. Проверить `unref` и `watchEffect` на утечки.
3. Использовать `readonly()` для неизменяемых данных.
4. Минимизировать количество реактивных источников.
5. Добавить DevTools performance mark для профилирования.
6. Использовать `Suspense` и lazy-загрузку для тяжелых компонентов.
7. Проверить, что `emits` и `props` типизированы.

---

Vue 3 — это современная, модульная и реактивная экосистема, где композиция логики и строгая типизация стали стандартом.
Он сочетает декларативность Vue 2 с гибкостью функциональных подходов, превращая фреймворк в основу для крупных,
масштабируемых приложений.

# i18n (локализация) во Vue 3

## Цели и терминология

Локализация — адаптация интерфейса под язык, формат дат/чисел, валюты, формы множественного числа и направление письма (
LTR/RTL). В экосистеме Vue используется `vue-i18n` (v9+) с Composition API.

## Установка

```bash
# npm
npm i vue-i18n@^9
# pnpm
pnpm add vue-i18n@^9
# yarn
yarn add vue-i18n@^9
```

## Базовая инициализация

Создаём инстанс i18n и подключаем к приложению. Для Composition API выключаем legacy-режим.

```ts
// src/i18n.ts
import {createI18n} from 'vue-i18n'

export type MessageSchema = {
    common: {
        save: string
        cancel: string
    }
    home: {
        title: string
        items_count: string // "Товаров: {count}"
    }
}

const messages = {
    ru: {
        common: {save: 'Сохранить', cancel: 'Отменить'},
        home: {
            title: 'Главная',
            items_count: 'Товаров: {count}'
        }
    },
    en: {
        common: {save: 'Save', cancel: 'Cancel'},
        home: {
            title: 'Home',
            items_count: 'Items: {count}'
        }
    }
} satisfies Record<string, MessageSchema>

export const i18n = createI18n<[MessageSchema], 'ru' | 'en'>({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages
})
```

```ts
// src/main.ts
import {createApp} from 'vue'
import App from './App.vue'
import {i18n} from './i18n'

createApp(App).use(i18n).mount('#app')
```

## Использование в компонентах (Composition API)

```vue

<script setup lang="ts">
  import {useI18n} from 'vue-i18n'
  import type {MessageSchema} from '@/i18n'

  const {t, locale, availableLocales, n, d} = useI18n<{ message: MessageSchema }>()

  function switchTo(lang: 'ru' | 'en') {
    locale.value = lang
  }
</script>

<template>
  <h1>{{ t('home.title') }}</h1>
  <p>{{ t('home.items_count', { count: 5 }) }}</p>

  <p>{{ n(1234567.89, { style: 'currency', currency: 'RUB' }) }}</p>
  <p>{{ d(new Date(), { dateStyle: 'long', timeStyle: 'short' }) }}</p>

  <button @click="switchTo('ru')" :aria-pressed="locale==='ru'">RU</button>
  <button @click="switchTo('en')" :aria-pressed="locale==='en'">EN</button>

  <small>Доступные языки: {{ availableLocales.join(', ') }}</small>
</template>
```

## Интерполяция и форматирование

### Параметры

```ts
t('home.items_count', {count: 12}) // "Товаров: 12"
```

### Плюрализация

```ts
// ru.json
{
    "cart"
:
    "{n} товар | {n} товара | {n} товаров"
}
```

```ts
t('cart', 1)   // "1 товар"
t('cart', 2)   // "2 товара"
t('cart', 5)   // "5 товаров"
```

### Формат даты/чисел

```ts
n(10000, {style: 'decimal', useGrouping: true})
d(new Date(), {dateStyle: 'medium'})
```

## Ресурсы сообщений: файлы и code-splitting

Храните строки по языкам и доменам (модулям) и подгружайте их лениво.

```ts
// src/locales/index.ts
export const loaded = new Set<string>()

export async function loadLocale(lang: string) {
    if (loaded.has(lang)) return
    const messages = await import(/* @vite-ignore */ `./${lang}.json`)
    i18n.global.setLocaleMessage(lang, messages.default)
    loaded.add(lang)
}
```

```ts
// переключение языка с ленивой загрузкой
import {i18n} from '@/i18n'
import {loadLocale} from '@/locales'

async function setLang(lang: 'ru' | 'en') {
    await loadLocale(lang)
    i18n.global.locale.value = lang
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
}
```

## SFC `<i18n>` блок

```vue

<i18n lang="json">
  {
  "ru": { "greet": "Привет, {name}!" },
  "en": { "greet": "Hi, {name}!" }
  }
</i18n>

<script setup lang="ts">
  import {useI18n} from 'vue-i18n'

  const {t} = useI18n()
</script>

<template>
  <p>{{ t('greet', { name: 'Мария' }) }}</p>
</template>
```

## Директива `v-t` для простых узлов

```vue

<template>
  <span v-t="'common.save'"></span>
</template>
```

## Типобезопасность

Определяйте схему сообщений и используйте generic-параметры `useI18n`.

```ts
// i18n.ts (см. выше) — MessageSchema и createI18n<[MessageSchema], Locales>
```

Проверяйте ключи на этапе компиляции:

```ts
// t('unknown.key') // TS ошибка
t('common.save')     // ок
```

## Хранение выбранного языка

```ts
// src/stores/locale.ts
import {ref, watch} from 'vue'
import {i18n} from '@/i18n'

const STORAGE_KEY = 'app:locale'
export const currentLocale = ref<string>(localStorage.getItem(STORAGE_KEY) || i18n.global.locale.value)

watch(currentLocale, (val) => {
    localStorage.setItem(STORAGE_KEY, val)
    i18n.global.locale.value = val
    document.documentElement.setAttribute('lang', val)
})
```

## Интеграция с Vue Router

Варианты: префикс пути (`/ru/...`), параметр запроса (`?lang=ru`), поддомен (`ru.example.com`). Чаще всего — префикс.

```ts
// router.ts
import {createRouter, createWebHistory} from 'vue-router'
import {loadLocale} from '@/locales'
import {i18n} from '@/i18n'

const routes = [
    {path: '/:lang(ru|en)/', name: 'home', component: () => import('@/pages/Home.vue')},
    // ...
]

const router = createRouter({history: createWebHistory(), routes})

router.beforeEach(async (to) => {
    const lang = (to.params.lang as string) || 'ru'
    await loadLocale(lang)
    i18n.global.locale.value = lang
    document.documentElement.setAttribute('lang', lang)
})

export default router
```

Перенаправление с корня на язык по предпочтениям браузера:

```ts
// main redirect
const supported = ['ru', 'en'] as const
const browser = navigator.language.split('-')[0]
const lang = supported.includes(browser as any) ? browser : 'ru'
if (location.pathname === '/') {
    location.replace(`/${lang}/`)
}
```

## SSR/SSG

Создавайте i18n-инстанс на запрос, чтобы избежать утечек состояния между пользователями.

```ts
// ssr/i18n.ts
import {createI18n} from 'vue-i18n'

export function createI18nSSR(locale: string, messages: any) {
    return createI18n({
        legacy: false,
        locale,
        messages: {[locale]: messages},
        fallbackLocale: 'en'
    })
}
```

На сервере подставляйте язык из URL/заголовков. На клиенте гидратируйте тем же языком и предзагруженными сообщениями.

## Тестирование

Монтируйте компоненты с замоканным i18n.

```ts
// Example.spec.ts
import {mount} from '@vue/test-utils'
import {createI18n} from 'vue-i18n'
import Component from './Component.vue'

const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    messages: {ru: {hello: 'Привет'}}
})

test('renders translation', () => {
    const wrapper = mount(Component, {global: {plugins: [i18n]}})
    expect(wrapper.text()).toContain('Привет')
})
```

## Организация ключей

Рекомендуемая структура:

```
locales/
  en.json
  ru.json
  feature/
    en.json
    ru.json
```

Ключи по доменам:

```
common.*
auth.*
profile.*
orders.list.*
orders.details.*
```

## Лучшие практики

* Избегайте конкатенации строк — только параметризованные шаблоны.
* Для сложных фраз используйте множественность и селекторы (gender, статус).
* Не храните HTML в переводах. Если требуется разметка — разбивайте на несколько ключей или используйте слот/компонент.
* Поддерживайте консистентность ключей и плейсхолдеров для всех языков.
* Включайте автоматические проверки: линт ключей, отсутствие «сиротских» переводов, синхронизация схемы.

## Производительность

* Лениво загружайте языки: динамический `import()` для `*.json`.
* Разделяйте по фичам, чтобы грузить только нужные домены.
* Кешируйте загруженные словари в памяти и `localStorage`.
* Не вызывайте `t()` в вычислениях, которые часто пересчитываются без нужды; кэшируйте результаты, если текст статичен.

## Доступность и UX

* Обновляйте `lang` и `dir` на `<html>` при смене языка.
* Для RTL-языков (ar, he, fa) переключайте `dir="rtl"` и проверяйте стили.
* Помечайте неизменяемые элементы `translate="no"` (бренды, коды).
* Давайте пользователю явный переключатель языка и сохраняйте выбор.
* Обновляйте метаданные страницы (title/description) на текущем языке.

## Безопасность

* Никогда не вставляйте пользовательский ввод как ключи переводов.
* Не используйте `v-html` c переводами. При крайней необходимости — строго санитайзьте.
* Не доверяйте контенту из удалённых источников без валидации.

## Локализация дат, чисел, валют

Используйте `Intl`-форматы через `n()` и `d()` либо внешние библиотеки для нестандартных правил. Настройте валюту и
часовой пояс на уровне приложения.

```ts
// пример глобальной валюты
const CURRENCY = 'RUB'
n(1999.9, {style: 'currency', currency: CURRENCY, currencyDisplay: 'symbol'})
```

## Контент вне JS: JSON, YAML, ICU

`vue-i18n` поддерживает ICU-подобный синтаксис. Для сложных кейсов используйте ICU-плейсхолдеры.

```json
{
  "invite": "{gender, select, male{Он} female{Она} other{Они}} пригласил{gender, select, female{а} other{}} вас"
}
```

```ts
t('invite', {gender: 'female'}) // "Она пригласила вас"
```

## Диагностика и отладка

* Включайте `missingWarn` для логирования отсутствующих ключей.
* В dev-сборке подсвечивайте отсутствующие переводы специальным префиксом.
* Пишите e2e-тесты на переключение языка и корректность форматирования валют/дат.

```ts
createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    missingWarn: (key) => __DEV__ && console.warn('[i18n:missing]', key)
})
```

## Миграция и совместимость

* Если проект на Options API, `vue-i18n` поддерживает legacy-режим: `legacy: true` и `this.$t`.
* Постепенно выносите строки из компонентов в ресурсы, закрывайте TODO по ключам.
* Проверяйте, что fallbackLocale настроен и покрывает основные ключи.

## Пример плагина для удобства

```ts
// src/plugins/i18n-helpers.ts
import type {App} from 'vue'
import {i18n} from '@/i18n'

export default {
    install(app: App) {
        app.config.globalProperties.$t = i18n.global.t
    }
}
```

## Полный пример переключателя языка

```vue

<script setup lang="ts">
  import {useI18n} from 'vue-i18n'
  import {loadLocale} from '@/locales'

  const {t, locale, availableLocales} = useI18n()

  async function change(lang: string) {
    await loadLocale(lang)
    locale.value = lang
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('app:locale', lang)
  }
</script>

<template>
  <label>
    {{ t('common.language') }}
    <select :value="locale" @change="change(($event.target as HTMLSelectElement).value)">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">{{ loc.toUpperCase() }}</option>
    </select>
  </label>
</template>
```

## Чек-лист перед релизом

* ☑️ Все ключи покрыты на всех языках.
* ☑️ Настроен fallback и логирование пропущенных ключей.
* ☑️ Включена ленивная загрузка словарей.
* ☑️ Переключение языка обновляет `lang`/`dir`, заголовок страницы и сохраняется.
* ☑️ Покрыты e2e-сценарии: первая загрузка, смена языка, SSR-гидратация.
* ☑️ В UI нет жёстко закодированных строк.
