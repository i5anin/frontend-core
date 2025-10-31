# Быстрый старт

### Установка окружения

1. **Node.js 22+** — обязательная среда выполнения.
   Рекомендуется использовать `nvm` для управления версиями.

   ```bash
   nvm install 22
   nvm use 22
   ```
2. **Установка менеджера пакетов**
   Используй `pnpm` — он быстрее и эффективнее с точки зрения кеширования.

   ```bash
   npm install -g pnpm
   ```
3. **Создание проекта**

   ```bash
   pnpm create vite@latest my-app
   cd my-app
   pnpm install
   ```

### Структура проекта

```
my-app/
├─ public/           # статические файлы
├─ src/
│  ├─ assets/        # изображения, шрифты
│  ├─ components/    # UI-компоненты
│  ├─ store/         # управление состоянием
│  ├─ router/        # маршрутизация
│  ├─ views/         # страницы
│  ├─ App.vue        # корневой компонент
│  └─ main.ts        # точка входа
├─ index.html
├─ vite.config.ts
└─ package.json
```

### Настройка TypeScript

Установи зависимости и создай файл `tsconfig.json`:

```bash
pnpm add -D typescript vue-tsc
```

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "Node",
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### Настройка Vue 3

Добавь зависимости:

```bash
pnpm add vue vue-router pinia
```

Создай базовую инициализацию:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

### Маршрутизация

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
```

### Стилизация

Добавь PostCSS и Tailwind для быстрой разработки:

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

В файл `tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

В `src/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Запуск проекта

```bash
pnpm run dev
```

После сборки приложение будет доступно по адресу:
`http://localhost:5173`

### Сборка и деплой

```bash
pnpm run build
pnpm run preview
```

Файлы для продакшена будут в папке `dist/`.
Деплой выполняется через GitLab CI/CD, GitHub Actions, Vercel или Netlify.

### Проверка кода и форматирование

```bash
pnpm add -D eslint prettier @vue/eslint-config-typescript
pnpm run lint
pnpm run format
```

### Тестирование

```bash
pnpm add -D vitest @vue/test-utils jsdom
pnpm run test
```

### Готово

Базовая среда Vue 3 + TypeScript + Vite развернута и готова для разработки с поддержкой современного синтаксиса, типизации и горячей перезагрузки.
