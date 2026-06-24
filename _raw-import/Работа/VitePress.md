---
tags:
  - веб-разработка
  - vue
  - javascript
  - npm
  - сборка
created: 2026-05-18
date: 2026-05-18
---
# VitePress

> Генератор статических сайтов на базе Vite + Vue 3. Идеален для документации.

🔗 [vitepress.dev](https://vitepress.dev)

---

## Установка

```bash
mkdir my-docs && cd my-docs
npm init -y
npm add -D vitepress
npx vitepress init   # мастер настройки
```

---

## Скрипты в package.json

```json
{
  "type": "module",
  "scripts": {
    "docs:dev":     "vitepress dev",
    "docs:build":   "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

```bash
npm run docs:dev      # http://localhost:5173
npm run docs:build    # сборка в .vitepress/dist
npm run docs:preview  # превью сборки
```

---

## Структура проекта

```
my-docs/
├── .vitepress/
│   └── config.mjs     ← конфиг навигации и темы
├── index.md            ← главная страница
├── guide/
│   └── getting-started.md
└── package.json
```

---

## config.mjs — основной конфиг

```js
export default {
  title: 'My Docs',
  description: 'Документация',
  lang: 'ru-RU',

  themeConfig: {
    // Верхняя навигация
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Гайд',    link: '/guide/getting-started' },
    ],

    // Боковая панель
    sidebar: [
      {
        text: 'Введение',
        items: [
          { text: 'Начало', link: '/guide/getting-started' },
          { text: 'Конфиг', link: '/guide/config' },
        ]
      }
    ],

    // Поиск
    search: { provider: 'local' },

    // Локализация
    outline:         { label: 'На этой странице', level: [2, 3] },
    docFooter:       { prev: 'Назад', next: 'Вперёд' },
    returnToTopLabel: 'Наверх',
  }
}
```

---

## Главная страница (Hero)

`index.md`:

```md
---
layout: home

hero:
  name: "My Docs"
  text: "Быстрая документация"
  tagline: На базе Vite + Vue 3
  actions:
    - theme: brand
      text: Начать
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/...

features:
  - icon: ⚡️
    title: Быстро
    details: Мгновенный hot-reload через Vite
  - icon: 🖊️
    title: Markdown
    details: Пишешь в md — получаешь сайт
---
```

---

## Markdown — возможности

**Контейнеры (callouts)**

```md
> [!tip] Совет
> Текст подсказки

> [!warning] Внимание
> Текст предупреждения

> [!danger] Опасно
> Критическое предупреждение

> [!info] Информация
> Просто информация

> [!details] Спойлер
> Скрытый контент
```

**Подсветка строк в коде**

````md
```js{1,3-5}
const a = 1      // ← подсвечена
const b = 2
const c = 3      // ← подсвечены
const d = 4      // ← подсвечены
const e = 5      // ← подсвечены
```
````

**Вставка кода из файла**

```md
<<< @/snippets/example.js
<<< @/snippets/example.js{2-4}   # только строки 2–4
```

---

## Sidebar — автогенерация

```js
// config.mjs
import { readdirSync, statSync } from 'fs'
import { join, basename, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function buildSidebar(dir) {
  return readdirSync(dir)
    .filter(f => !f.startsWith('.'))
    .map(f => {
      const full = join(dir, f)
      if (statSync(full).isDirectory()) {
        return { text: f, collapsed: true, items: buildSidebar(full) }
      }
      if (extname(f) === '.md') {
        return {
          text: basename(f, '.md'),
          link: '/' + relative(ROOT, full).replace(/\\/g, '/').replace(/\.md$/, '')
        }
      }
    })
    .filter(Boolean)
}
```

---

## Деплой

**GitHub Pages**

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vitepress/dist
```

**Netlify / Vercel**

| Поле | Значение |
|---|---|
| Build command | `npm run docs:build` |
| Publish dir | `.vitepress/dist` |

---

## .gitignore

```
node_modules
.vitepress/cache
.vitepress/dist
```

---

## Полезные плагины

| Плагин | Назначение |
|---|---|
| `vitepress-plugin-mermaid` | Диаграммы Mermaid |
| `@shikijs/vitepress-twoslash` | TypeScript hover в коде |
| `vitepress-sidebar` | Автосайдбар из папок |

```bash
npm add -D vitepress-plugin-mermaid
```

```js
// config.mjs
import { withMermaid } from 'vitepress-plugin-mermaid'
export default withMermaid({ /* твой конфиг */ })
```


---

## Связанные

- [[Documentation]]
- [[HTTPS]]
- [[Jest]]
- [[Mermaid]]
- [[XML]]
