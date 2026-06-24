---
tags:
  - веб-разработка
  - vue
  - javascript
  - docker
  - git
created: 2025-02-04
date: 2025-02-04
---
****GitHub на 300%: CI/CD, тесты, оптимизация, плагины** 🚀**

GitHub – это не просто хостинг для кода, а мощный инструмент DevOps.  
Разберём **полный цикл**: от автоматизации тестов и развертывания до **оптимизации репозитория и безопасности**.

---

# **1️⃣ GitHub Actions (CI/CD) – автоматизация процессов**

****Что можно автоматизировать?****

✅ **Сборка проекта** (npm, yarn, webpack, vite, rollup).  
✅ **Запуск тестов** (Jest, Mocha, PHPUnit, Pytest).  
✅ **Анализ кода** (ESLint, Stylelint, SonarQube).  
✅ **Развертывание** (Docker, Kubernetes, Vercel, Cloudflare Pages).  
✅ **Обновление зависимостей** (Dependabot).  
✅ **Безопасность кода** (CodeQL, SAST).

****Пример CI для Vue + Node.js (тесты + линтеры + сборка)****

📌 **`.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout репозитория
        uses: actions/checkout@v4

      - name: Установка Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Установка зависимостей
        run: npm ci

      - name: Линтинг кода
        run: npm run lint

      - name: Запуск тестов
        run: npm run test

      - name: Сборка проекта
        run: npm run build
```

📌 **Этот workflow делает следующее:**

- Запускается при `push` в `main` и `develop`
- Устанавливает Node.js и зависимости
- Прогоняет **ESLint**, тесты и сборку

💡 **🔥 Можно добавить кэширование npm/yarn для ускорения!**

```yaml
with:
  cache: npm
```

---

# **2️⃣ CD: Автоматический деплой на сервер**

Если хочешь **авторазвертывание на сервере**, можно использовать:

- **Vercel/Netlify** для фронта
- **Docker + SSH** для серверного кода
- **GitHub Pages** для статических сайтов

📌 **Пример деплоя в Docker через SSH**

```yaml
name: Deploy to Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Подключение к серверу и деплой
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app
            git pull origin main
            docker-compose up --build -d
```

📌 **Что делает этот workflow?**

- Подключается по SSH
- Забирает новый код
- Запускает `docker-compose up --build`

💡 **🔥 Можно улучшить!**

- **Zero-downtime деплой через Docker Swarm/Kubernetes**
- **Автооткат при неудаче (`if: failure()`)**
- **Кэширование слоёв Docker**

---

# **3️⃣ GitHub для тестирования (CI)**

**✅ **Юнит-тесты****

- Jest, Mocha (JavaScript)
- PHPUnit (PHP)
- Pytest (Python)

📌 **Запуск тестов в GitHub Actions**

```yaml
- name: Запуск тестов
  run: npm run test
```

**✅ **E2E-тесты (автоматизированные)****

- Playwright, Cypress – тесты браузера
- Selenium – тесты UI

📌 **Запуск Playwright-тестов**

```yaml
- name: Установка Playwright
  run: npx playwright install
- name: Запуск тестов
  run: npm run test:e2e
```

**✅ **Performance-тесты****

- **Lighthouse** для веб-проектов
- **wrk** или **k6** для API

📌 **Запуск Lighthouse**

```yaml
- name: Lighthouse тест
  run: npx lighthouse-ci
```

---

# **4️⃣ Оптимизация репозитория**

**✅ **Грамотная структура репозитория****

- `src/` – исходный код
- `tests/` – тесты
- `.github/workflows/` – CI/CD
- `docs/` – документация
- `Dockerfile` / `docker-compose.yml` – контейнеризация

💡 **🔥 Обязательно добавь `.gitignore`!**

```gitignore
node_modules/
dist/
.env
.vscode/
```

**✅ **Автоматическое форматирование кода****

📌 **Prettier + ESLint**

```yaml
- name: Линтинг кода
  run: npm run lint
```

---

# **5️⃣ Полезные плагины и GitHub Apps**

🔥 **Лучшие плагины для GitHub!**

|Название|Описание|
|---|---|
|**Dependabot**|Автообновление зависимостей|
|**CodeQL**|Автоматический поиск уязвимостей|
|**SonarCloud**|Анализ качества кода|
|**Renovate**|Гибкое обновление зависимостей|
|**Pull Reminders**|Напоминания о ревью PR|

📌 **Подключение Dependabot** Создай файл `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

Теперь **GitHub сам обновит зависимости** каждую неделю!

---

# **6️⃣ Безопасность и контроль**

**✅ **Секреты (`GitHub Secrets`)****

Скрывай API-ключи, пароли, SSH-ключи.

📌 **Пример использования секретов**

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**✅ **SAST (анализ кода на уязвимости)****

Используй **CodeQL** для поиска уязвимостей:

```yaml
- name: CodeQL Analysis
  uses: github/codeql-action/init@v2
```

---

# **7️⃣ GitHub API и автоматизация**

**✅ **GitHub API****

Можно **автоматизировать PR, репозитории, коммиты**.

📌 **Пример: Получить список PR через API**

```sh
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/OWNER/REPO/pulls
```

📌 **Создание issue через API**

```sh
curl -X POST -H "Authorization: token YOUR_TOKEN" \
     -d '{"title": "Баг найден!", "body": "Опишите проблему"}' \
     https://api.github.com/repos/OWNER/REPO/issues
```

---

# **Вывод: GitHub на 300%**

1️⃣ **CI/CD через GitHub Actions** (сборка, тесты, деплой)  
2️⃣ **Полный контроль через API, автообновления (Dependabot)**  
3️⃣ **Максимальная автоматизация тестов** (Unit, E2E, Performance)  
4️⃣ **Оптимизация кода и репозитория** (Prettier, ESLint, `.gitignore`)  
5️⃣ **Безопасность (CodeQL, Secrets, SAST, Dependabot)**  
6️⃣ **GitHub API – автоматизация PR, issue, коммитов**

🚀 **Итог**: С GitHub можно **автоматизировать 90% процессов** и **ускорить разработку в 2-3 раза**.

---

## Связанные

- [[Git]]
- [[Commit]]
- [[Git соглашение о коммитах]]
- [[git соглашение]]
