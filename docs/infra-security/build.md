# Механизмы сборки

## Что делает бандлер

```
src/
  index.js  (import → import → import)
  components/...
  utils/...
         ↓ Бандлер
dist/
  bundle.js  (один файл или несколько чанков)
  bundle.css
  index.html
```

**Задачи бандлера:**
- Объединение модулей в файлы
- Трансформация (Babel, TypeScript, SASS)
- Минификация и оптимизация
- Code splitting (разделение по чанкам)
- Tree shaking (удаление неиспользуемого кода)

## Webpack vs Vite

| | Webpack | Vite |
|---|---|---|
| Dev сервер | Собирает весь бандл | Нативные ES modules |
| Cold start | 10-60 сек | < 1 сек |
| HMR | Медленнее | Почти мгновенно |
| Конфигурация | Сложная | Минимальная |
| Продакшн | webpack | rollup |
| Когда | Легаси, сложные конфиги | Новые проекты |

## Vite конфигурация

```js
// vite.config.js / vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
});
```

## Tree Shaking

```js
// utils.js — экспортирует 3 функции
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }

// main.js — импортирует только 1
import { add } from './utils'; // subtract и multiply удалятся!
```

```json
// package.json
{
  "sideEffects": false  // разрешить tree shaking
  // или список файлов с побочными эффектами
}
```

## Code Splitting

```js
// Динамический импорт — создаёт отдельный чанк
const AdminPanel = () => import('./AdminPanel.vue');

// Vue Router — автоматическое разделение по страницам
const routes = [
  {
    path: '/admin',
    component: () => import('./pages/Admin.vue') // отдельный чанк
  }
];
```

## Анализ бандла

```bash
# Rollup Plugin Visualizer (для Vite)
npm install rollup-plugin-visualizer --save-dev
```

```js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true }) // откроет карту бандла
  ]
});
```

## Оптимизация сборки

```js
// vite.config.js
build: {
  // Разделение вендора
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      }
    }
  },

  // Сжатие
  minify: 'terser',
  terserOptions: {
    compress: { drop_console: true }
  }
}
```
