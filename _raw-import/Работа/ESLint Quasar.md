---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
  - typescript
created: 2025-03-20
date: 2025-03-20
---
Если тебе нужны настройки **ESLint** для крупного проекта, можно ориентироваться на конфигурацию из **Quasar** или популярных проектов с Vue 3.

Вот пример **оптимальной настройки ESLint** для крупного Vue 3 проекта с **Composition API, Pinia и TypeScript**:

**📌 **1. Установка зависимостей****

```sh
npm install --save-dev eslint eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript eslint-plugin-import eslint-plugin-promise eslint-plugin-unused-imports eslint-plugin-security
```

**📌 **2. Конфигурация `.eslintrc.cjs`****

```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2023: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
    'promise',
    'unused-imports',
    'security',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'error',
    'vue/require-default-prop': 'off',
    'vue/no-mutating-props': 'error',

    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/no-unresolved': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],

    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'warn',

    'unused-imports/no-unused-imports': 'error',
    'security/detect-object-injection': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
```

**📌 **3. Конфигурация `.prettierrc`****

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

**📌 **4. Скрипты в `package.json`****

```json
"scripts": {
  "lint": "eslint --ext .js,.ts,.vue src",
  "lint:fix": "eslint --fix --ext .js,.ts,.vue src"
}
```

**✅ **Что это даёт?****

- 🚀 **Поддержка Vue 3 и TypeScript**
- 🔥 **Оптимизированный порядок импортов**
- 🔒 **Базовая защита от уязвимостей (`eslint-plugin-security`)**
- 🛠 **Фикс неиспользуемых импортов (`eslint-plugin-unused-imports`)**
- 🎯 **Чистый код с Prettier**

Если проект не на **TypeScript**, просто удали `@typescript-eslint/*` зависимости и правила.

🔹 **Хочешь больше гибкости?** Могу адаптировать под твой конкретный стек.

---

## Связанные

- [[Tools_and_Utilities]]
- [[ABBYY FineReader PDF]]
- [[nexe]]
- [[npm i предупреждения]]
- [[npm и команды]]
- [[Open Source Сетевых Мониторов]]
