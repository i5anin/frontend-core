---
tags:
  - веб-разработка
  - vue
  - react
  - git
  - api
created: 2025-04-13
date: 2025-04-13
---
# 🛠 Supabase — Альтернатива Firebase с открытым исходным кодом

![../_resoures/Pasted image 20250413224322.png](#)
## 📌 Что такое Supabase?

**Supabase** — это **бэкенд как сервис (BaaS)** с открытым исходным кодом, построенный на основе **PostgreSQL**. Он позиционируется как **альтернатива Firebase**, предоставляя разработчикам инструменты для создания полноценных серверных приложений без необходимости вручную настраивать сервер.

🔗 Официальный сайт: [https://supabase.com](https://supabase.com/)

---

## 🔍 Основные возможности

|Возможность|Описание|
|---|---|
|✅ **База данных**|Полноценный PostgreSQL с REST и GraphQL API.|
|🔐 **Аутентификация**|Встроенные провайдеры: Email, Google, GitHub и др.|
|☁ **Хранилище**|Файловое хранилище с публичным и приватным доступом.|
|🔄 **Подписки (Realtime)**|Поддержка WebSocket и обновлений в реальном времени.|
|📦 **Edge Functions**|Обработка логики через серверные функции на Deno.|
|📈 **Панель администратора**|Supabase Studio для управления базой, пользователями, файлами и функциями.|

---

## ⚙ Архитектура

```mermaid
graph TD
    A[Frontend (Vue/React)] --> B[Supabase Client]
    B --> C[PostgreSQL DB]
    B --> D[Auth]
    B --> E[Storage]
    B --> F[Realtime]
    B --> G[Edge Functions]
```

---

## 🧱 Почему Supabase?

**🔓 Открытый исходный код**

В отличие от Firebase, Supabase полностью **open-source**, можно развернуть у себя локально или на собственном сервере.

**📈 Использует PostgreSQL**

Возможность использовать SQL-запросы, индексы, триггеры, представления и все возможности настоящей реляционной базы.

**⚡ Быстрый старт**

Можно развернуть за 2 минуты. Готовые шаблоны и авто-генерация API для таблиц.

**🔄 Realtime на базе PostgreSQL**

Под капотом используется **`realtime`** — сервер на Elixir, который подписывается на события PostgreSQL и передаёт обновления по WebSocket.

---

## 🚀 Быстрый старт

```bash
npx create-next-app my-project
cd my-project
npm install @supabase/supabase-js
```

**Инициализация клиента**

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
```

---

## 📦 Основные модули

**📄 `@supabase/supabase-js`**

Официальный JS-клиент, совместим с:

- Node.js
    
- Deno
    
- Bun
    
- Web и мобильными браузерами
    

**🔐 Аутентификация**

```js
const { data, error } = await supabase.auth.signUp({
  email: 'email@example.com',
  password: 'securepassword',
})
```

**🗃 Работа с таблицей**

```js
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('username', 'sergey')
```

---

## 🧪 Для кого подходит?

|Тип проекта|Supabase|
|---|---|
|MVP / стартапы|✅ Да|
|SaaS-продукты|✅ Да|
|Кастомные панели|✅ Да|
|Сложные BI-системы|⚠ Ограничено|
|IoT / стриминг видео|❌ Нет|

---

## 🧩 Полезные плагины и интеграции

- 📊 **Grafana / Metabase** — через PostgreSQL-коннектор
    
- 🔌 **Zapier / Make** — через Webhook
    
- 💡 **Vercel / Netlify** — для фронтенда
    

---

## 📚 Ресурсы

- [Документация Supabase](https://supabase.com/docs)
    
- [Supabase GitHub](https://github.com/supabase/supabase)
    
- [Плейлист YouTube "Supabase Full Course"](https://www.youtube.com/results?search_query=supabase+full+course)
    

---

## 🧠 Личное мнение

Supabase — отличное решение, если тебе нужно:

- Быстро поднять backend с базой данных, авторизацией и хранилищем
    
- Избежать vendor lock-in
    
- Работать с привычным SQL
    

---

## 🧰 Что добавить в свою Vault (обсидиан-хранилище)?

- [Supabase CLI команды](#)
    
- [Шаблоны запросов Supabase](#)
    
- [Сравнение: Firebase vs Supabase](#)
    
- [Supabase архитектура проекта](#)
    
- [Интеграция Supabase с Vue 3](#)
    
- [Edge Functions: примеры](#)
    

---

Если хочешь, могу подготовить готовый vault с шаблонами, базой команд и визуальной архитектурой проекта на Supabase.

---

## Связанные

- [[Frameworks]]
- [[Angular.js]]
- [[Express.js (2)]]
- [[Express.js]]
- [[Framework7 (2)]]
- [[Framework7]]
