## 1. Назначение `i18n`

`i18n` — механизм локализации интерфейса. Включает:

- хранение переводов,
    
- выбор языка в рантайме,
    
- подстановку значений в строки,
    
- форматирование дат/чисел.
    

В `Vue 3` применяется библиотека `vue-i18n`.

---

## 2. Базовая архитектура

Структура проекта:

```
src/
  locales/
    en.json
    ru.json
  i18n/
    index.ts
```

Переводы хранятся в отдельных JSON-файлах.  
Ключи — строковые идентификаторы, не текст.

Пример `ru.json`:

```json
{
  "auth": {
    "login": "Войти",
    "logout": "Выйти"
  }
}
```

---

## 3. Инициализация `i18n` (Vue 3, Composition API)

Файл `i18n/index.ts`:

```ts
import { createI18n } from 'vue-i18n'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: { ru, en }
})
```

Подключение в `main.ts`:

```ts
app.use(i18n)
```

---

## 4. Использование в компоненте (Composition API)

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <button>{{ t('auth.login') }}</button>
</template>
```

---

## 5. Динамическое изменение языка

```ts
const { locale } = useI18n()
locale.value = 'en'
```

Переключение всегда реактивное.

---

## 6. Подстановки (`placeholders`)

`vue-i18n` позволяет вставлять параметры:

`ru.json`:

```json
{
  "user": {
    "hello": "Привет, {name}"
  }
}
```

Компонент:

```vue
{{ t('user.hello', { name: 'Сергей' }) }}
```

---

## 7. Множественное число (`pluralization`)

Пример в `ru.json`:

```json
{
  "cart": "{count} товар | {count} товара | {count} товаров"
}
```

Использование:

```vue
{{ t('cart', 3) }}
```

---

## 8. Форматирование дат и чисел

Поддерживается через Intl API:

```ts
t('price', { value: 1234, format: 'currency' })
```

Требует отдельной конфигурации `numberFormats` и `datetimeFormats`.

---

## 9. Порядок загрузки и оптимизация

Для крупных систем:

- не загружать все локали сразу;
    
- использовать динамический импорт:
    

```ts
const localeMessages = await import(`../locales/${lang}.json`)
```

- кэшировать загруженные языки.
    

---

## 10. Типичные ошибки

- использование текста вместо ключей;
    
- смешивание локализованных строк в компонентах и логике;
    
- жёсткое кодирование языка, отсутствие fallback;
    
- отсутствие поддержки множественного числа и подстановок.
    

