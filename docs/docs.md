## Подготовка

### Установка инструментов

1. **Node.js 22+** — современная версия с поддержкой ESModules и топ-левел `await`.
   Установка через nvm:

   ```bash
   nvm install 22
   nvm use 22
   ```
2. **Менеджер пакетов pnpm** — быстрый и безопасный пакетный менеджер.

   ```bash
   npm install -g pnpm
   ```
3. **Редактор кода** — Visual Studio Code с плагинами:

    * Vue Language Features (Volar)
    * TypeScript Vue Plugin
    * ESLint
    * Prettier
    * GitLens
    * Tailwind CSS IntelliSense
    * REST Client или Thunder Client для тестирования API

### Настройка окружения

Создай базовую структуру проекта:

```bash
pnpm create vite@latest project-name --template vue-ts
cd project-name
pnpm install
```

Инициализация Git:

```bash
git init
git add .
git commit -m "init project"
```

Создай файл `.env` для переменных окружения:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp
```

### Конфигурация линтинга и форматирования

Добавь ESLint и Prettier:

```bash
pnpm add -D eslint prettier @vue/eslint-config-typescript eslint-plugin-vue
```

Создай файл `.eslintrc.cjs`:

```js
module.exports = {
  extends: ['@vue/eslint-config-typescript', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 0
  }
}
```

Создай `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

### Настройка TailwindCSS

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: []
}
```

В `src/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Настройка Pinia и Router

```bash
pnpm add vue-router pinia
```

Создай `src/router/index.ts`:

```ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{ path: '/', name: 'Home', component: Home }]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

Создай `src/store/index.ts`:

```ts
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

### Подключение в `main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

### Проверка конфигурации

Запуск dev-сервера:

```bash
pnpm run dev
```

Сборка проекта:

```bash
pnpm run build
```

Предпросмотр:

```bash
pnpm run preview
```

### Дополнительная подготовка

* Установи **Vitest** для тестов:

  ```bash
  pnpm add -D vitest @vue/test-utils jsdom
  ```
* Настрой **husky** и **lint-staged** для проверки кода перед коммитом:

  ```bash
  pnpm add -D husky lint-staged
  npx husky install
  ```

  В `package.json`:

  ```json
  {
    "lint-staged": {
      "*.{ts,vue,js}": ["eslint --fix", "prettier --write"]
    }
  }
  ```

### Проверка безопасности зависимостей

```bash
pnpm audit
pnpm up --latest
```

После этой подготовки проект готов к дальнейшей разработке, интеграции CI/CD и настройке деплоя.
