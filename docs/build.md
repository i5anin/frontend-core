# Сборка

### Общие принципы

Сборка проекта — это процесс подготовки исходного кода к продакшену: оптимизация, минификация, разделение кода на чанки, внедрение переменных окружения и генерация статических артефактов.
Основные цели — высокая скорость загрузки, малая нагрузка на сеть, минимальное время рендера и безопасность.

### Инструменты

* **Vite 6+** — основной инструмент сборки. Использует `esbuild` для дев-сервера и `rollup` для продакшена.
* **TypeScript** — статическая проверка типов и генерация `.d.ts` файлов.
* **PostCSS / Tailwind / SCSS** — препроцессинг стилей.
* **Imagemin / SVGO** — оптимизация изображений и SVG.
* **Terser / LightningCSS** — минификация JS и CSS.
* **Vitest / Playwright** — тестирование на уровне сборки.

### Конфигурация Vite

`vite.config.ts`

```ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@use "@/styles/variables.scss" as *;` },
      },
    },
    build: {
      target: 'es2022',
      outDir: 'dist',
      sourcemap: mode !== 'production',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: 5173,
      open: true,
    },
  }
})
```

### Скрипты в package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint src --ext .ts,.vue",
    "format": "prettier --write ."
  }
}
```

### Переменные окружения

* `VITE_API_URL` — базовый адрес API.
* `VITE_SENTRY_DSN` — ключ для мониторинга ошибок.
* `VITE_APP_VERSION` — версия билда.
* `VITE_ENABLE_MOCKS` — включение моков в dev-режиме.

Файлы:

```
.env
.env.development
.env.production
```

### Проверка типов и линтинг

Перед сборкой выполняется:

```bash
pnpm run typecheck
pnpm run lint
```

Ошибки типов или линта должны блокировать релиз.

### Оптимизация JS и CSS

* Используй **code-splitting** (`dynamic import()`).
* Убирай неиспользуемый код через **tree-shaking**.
* Минифицируй CSS через встроенный `cssnano` в PostCSS.
* Сжимай бандлы `gzip` и `brotli` при деплое.

Пример подключения плагина:

```bash
pnpm add -D vite-plugin-compression
```

```ts
import compression from 'vite-plugin-compression'
plugins: [vue(), compression({ algorithm: 'brotliCompress' })]
```

### Анализ размера сборки

```bash
pnpm add -D rollup-plugin-visualizer
```

```ts
import { visualizer } from 'rollup-plugin-visualizer'
plugins: [vue(), visualizer({ filename: 'stats.html' })]
```

После сборки можно открыть `stats.html` и увидеть структуру чанков.

### Оптимизация изображений

```bash
pnpm add -D vite-imagemin
```

```ts
import viteImagemin from 'vite-imagemin'
plugins: [
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
  }),
]
```

### Генерация sourcemaps

Sourcemaps создаются автоматически, если `sourcemap: true`.
В продакшене они не должны публиковаться открыто — передаются только в Sentry.

```bash
pnpm exec sentry-cli releases files "$VITE_APP_VERSION" upload-sourcemaps ./dist --rewrite
```

### Кеширование и busting

* Vite автоматически добавляет хэши к именам файлов (`[hash]`).
* HTML не кэшируется, статика отдается с `Cache-Control: immutable`.
* Для обновления клиента можно добавить версию в метаданные:

```ts
console.log('App version:', __APP_VERSION__)
```

### Автоматизация через CI/CD

Пример шага в GitLab:

```yaml
build:
  stage: build
  image: node:22-alpine
  script:
    - corepack enable
    - pnpm i --frozen-lockfile
    - pnpm run build
  artifacts:
    paths:
      - dist
```

### Проверка сборки

* Проверяй локально:

  ```bash
  pnpm run preview
  ```
* Используй **Lighthouse** или **WebPageTest** для анализа метрик (LCP, TBT, CLS).
* Убеждайся, что бандл не превышает лимиты:

    * `vendor.js` ≤ 300KB gzip
    * общий размер чанков ≤ 500KB gzip

### Итог

После успешной сборки в каталоге `dist/` лежит полностью оптимизированное, минифицированное и готовое к доставке приложение.
Эти артефакты заливаются на CDN, сервер или в контейнер для деплоя.
