---
tags:
  - веб-разработка
  - vpn
  - ии
created: 2026-06-18
date: 2026-06-18
---
# Vibe-coding — список сервисов

> AI-кодинг где можно **писать ТЗ на русском**, не лезть в код, и оно само работает. Международные + российские.

> [!tip] Vibe-coding
> Стиль работы где ты **диктуешь намерение**, а не код. Агент сам читает репо, пишет, запускает, тестирует, чинит. Ты ревьюишь готовое.

---

## 🌍 Международные

**1. Claude Code (Anthropic) ⭐**

🔗 [claude.com/code](https://www.claude.com/claude-code)
💰 От $20/мес (Pro), $100+ (Max)
🖥️ CLI / VS Code / JetBrains

**Чем хорош:** топ-1 по агентскому кодингу в 2026. Лучший в сложных рефакторах, умеет планировать многошаговые задачи, держит контекст репо.

**Стиль:** CLI или встроенный в IDE.

> [!warning] Доступ из РФ
> Требует VPN ([[VPN — мой набор]]) + не российская карта для оплаты.

---

**2. Cursor (Anysphere)**

🔗 [cursor.com](https://www.cursor.com/)
💰 $20/мес (Pro)
🖥️ Свой IDE (форк VS Code)

**Чем хорош:**
- Tab-автокомплит уровня магии (predicts next change)
- Agent Mode — пишет фичи целиком
- Composer — мультифайловое редактирование
- Поддержка Claude, GPT-4, Gemini

**Стиль:** редактируешь как обычно, AI всё время рядом.

---

**3. Windsurf (Cognition / бывший Codeium)**

🔗 [windsurf.com](https://windsurf.com/)
💰 Бесплатно (есть Pro)
🖥️ Свой IDE

**Чем хорош:** Cascade — агент с памятью проекта. Купили Cognition (создатели Devin), интегрируют.

**Стиль:** IDE как Cursor, но дешевле / бесплатно.

---

**4. Devin (Cognition Labs)**

🔗 [devin.ai](https://devin.ai/)
💰 От $500/мес 😱
🌐 Web

**Чем хорош:** полностью **автономный** агент. Даёшь задачу — он сам всё делает за часы. Тебе приходит готовый PR.

**Минус:** дорого, и для серьёзных продакшен-задач.

---

**5. Bolt.new (StackBlitz)**

🔗 [bolt.new](https://bolt.new/)
💰 От $20/мес
🌐 Web

**Чем хорош:** «опиши приложение → получи готовое работающее в браузере». React/Vue/Next за 30 секунд.

**Идеально:** прототипы, MVP, лендинги.

---

**6. Lovable (бывший GPT Engineer)**

🔗 [lovable.dev](https://lovable.dev/)
💰 От $20/мес
🌐 Web

**Чем хорош:** один из лучших для **non-tech** людей. Делает full-stack приложения по описанию.

**Стек:** Vite + React + Supabase, готовая авторизация.

---

**7. v0 (Vercel)**

🔗 [v0.dev](https://v0.dev/)
💰 От $20/мес
🌐 Web

**Чем хорош:** **UI-генерация** — даёшь дизайн → получаешь готовый React/Next.js + Tailwind + shadcn.

**Для:** фронтенд интерфейсы быстро.

---

**8. Replit Agent**

🔗 [replit.com](https://replit.com/)
💰 От $25/мес
🌐 Web

**Чем хорош:** агент + готовое окружение (база, деплой, домен). От «идея» до «онлайн на проде» — 1 шаг.

---

**9. Aider (open-source)**

🔗 [aider.chat](https://aider.chat/)
💰 Бесплатно (ты платишь за API)
🖥️ CLI

**Чем хорош:** **open-source аналог Claude Code**. Использует любой LLM (Claude, GPT, Gemini, локальные). Полный контроль.

**Для:** разработчиков, кто хочет CLI-агента без подписки.

---

**10. Cline (open-source VS Code extension)**

🔗 [github.com/cline/cline](https://github.com/cline/cline)
💰 Бесплатно
🖥️ VS Code

**Чем хорош:** агент-расширение для VS Code. Сам пишет, запускает терминал, читает ошибки, чинит.

---

**11. Trae (ByteDance)**

🔗 [trae.ai](https://www.trae.ai/)
💰 Бесплатно (пока)
🖥️ Свой IDE

**Чем хорош:** китайский ответ Cursor. Часто **бесплатный доступ к Claude / GPT-4**. Работает из РФ.

---

**12. Codex CLI (OpenAI)**

🔗 [github.com/openai/codex](https://github.com/openai/codex)
💰 Бесплатно (API оплата)
🖥️ CLI

**Чем хорош:** аналог Claude Code от OpenAI. Использует GPT-5 / o-серии.

---

**13. Gemini CLI (Google)**

🔗 [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
💰 Бесплатно (щедрый free tier)
🖥️ CLI

**Чем хорош:** **миллион токенов контекста**, бесплатный лимит большой. Хорош для огромных кодовых баз.

---

## 🇷🇺 Российские

**1. GigaCode (Сбер) ⭐**

🔗 [gigacode.ru](https://gigacode.ru/) · [gigacode.ai](https://gigacode.ai/)
💰 **Бесплатно**
🖥️ Плагины для VS Code / JetBrains / Vim

**Чем хорош:**
- Аналог Copilot, но **бесплатный** и без VPN
- Понимает русские комментарии
- Автодополнение, чат с кодом, генерация тестов

**Минус:** не агент. Авто-комплит и чат, не мультифайл.

---

**2. Yandex Code Assistant**

🔗 [yandex.cloud/services/yandexgpt-code-assistant](https://yandex.cloud/ru/services/yandexgpt-code-assistant)
💰 От ~500₽/мес (через Yandex Cloud)
🖥️ Плагины VS Code / JetBrains

**Чем хорош:**
- Интеграция с Яндекс.Облаком
- YandexGPT 5 под капотом
- Хороший русский язык
- Корпоративный режим

---

**3. GigaChat (Сбер) — для общения**

🔗 [developers.sber.ru/portal/products/gigachat](https://developers.sber.ru/portal/products/gigachat)
💰 Бесплатный лимит + API
🌐 Web / API

**Чем хорош:** **российский ChatGPT**. Подходит как чат для кода. Можно гонять через API в свой workflow.

---

**4. YandexGPT 5**

🔗 [chat.ya.ru](https://ya.ru/chat) · [yandex.cloud/services/yandexgpt](https://yandex.cloud/ru/services/yandexgpt)
💰 Бесплатно в чате / API платно
🌐 Web / API

**Чем хорош:** чат с поддержкой кода. Уровня GPT-3.5/4. Полностью российский.

---

**5. Cotype Pro (MTS AI)**

🔗 [mts.ai](https://mts.ai/) · [cotype.mts.ai](https://cotype.mts.ai/)
💰 От ~990₽/мес
🌐 Web

**Чем хорош:** **российский Claude/GPT**. Большой контекст, понимает русский, корпоративный режим.

---

**6. T-Lite / T-Pro (T-Bank / Тинькофф)**

🔗 [t.tech](https://t.tech/) · [github.com/T-Tech-Group/T-Lite](https://github.com/Tinkoff/T-Lite)
💰 Open-source модели
🖥️ Локально

**Чем хорош:** open-source LLM от Тинькофф. Хороши в русском. Можно запустить локально через Ollama.

---

**7. Kandinsky 4 (Сбер)**

🔗 [fusionbrain.ai](https://fusionbrain.ai/)
💰 Бесплатно
🌐 Web

**Чем хорош:** в основном картинки, но Kandinsky 4 умеет и текст/код. Не главное предназначение.

---

## Сравнительная таблица

| Сервис | Тип | Цена | Стиль | Из РФ без VPN |
|---|---|---|---|---|
| **Claude Code** | CLI агент | $20+/мес | Полный агент | ❌ |
| **Cursor** | IDE | $20/мес | IDE-агент | ❌ |
| **Windsurf** | IDE | Free/Pro | IDE-агент | ❌ |
| **Devin** | Web | $500/мес | Автономный | ❌ |
| **Bolt.new** | Web | $20+ | One-shot app | ❌ |
| **Lovable** | Web | $20+ | One-shot app | ❌ |
| **v0** | Web | $20+ | UI-генератор | ❌ |
| **Replit Agent** | Web | $25+ | App + deploy | ❌ |
| **Aider** | CLI | Free + API | Open-source агент | ⚠️ зависит от API |
| **Cline** | VSCode | Free + API | Расширение | ⚠️ зависит от API |
| **Trae** | IDE | Free | IDE-агент | ✅ часто да |
| **Codex CLI** | CLI | Free + API | OpenAI агент | ❌ |
| **Gemini CLI** | CLI | Free tier | Google агент | ⚠️ |
| **GigaCode** | Plugin | **Бесплатно** | Автокомплит + чат | ✅ |
| **Yandex Code** | Plugin | от 500₽ | Автокомплит + чат | ✅ |
| **GigaChat** | Web/API | Free + API | Чат | ✅ |
| **YandexGPT** | Web/API | Free + API | Чат | ✅ |
| **Cotype** | Web | от 990₽ | Чат | ✅ |
| **T-Lite** | Local | Free | Локально | ✅ |

---

## По степени «не смотреть код»

```
1. Devin              ← полностью автономный, дорого
2. Claude Code        ← CLI агент, лучший по качеству
3. Cursor / Windsurf  ← IDE-агент, мультифайл
4. Replit Agent       ← готовое веб-приложение от идеи
5. Bolt.new / Lovable ← MVP за 30 секунд
6. Aider / Cline      ← open-source агент
7. Cursor Tab         ← полу-вибе (нужно править)
8. GigaCode           ← автокомплит (полу-вибе)
9. ChatGPT/Claude чат ← вручную копировать (старый стиль)
```

---

## Мои рекомендации

**Если есть VPN + не российская карта**
**Claude Code** (то, чем ты сейчас пользуешься) или **Cursor**.

**Без VPN, нужно агентское поведение**
- **Trae** — IDE-агент бесплатно, доступен из РФ
- **Aider** + Cotype Pro API — open-source CLI агент на российском LLM
- **GigaCode** — для повседневного автокомплита

**Для быстрого MVP / прототипа**
- **Bolt.new** (через VPN)
- **Lovable** (через VPN)
- **Replit Agent** (через VPN)

**Локально на своём железе**
- **Aider** + **T-Lite / T-Pro** через Ollama
- Полная приватность, нет лимитов, бесплатно

---

## Идеальный стек 2026 для разработчика из РФ

```
Основное (агент):     Claude Code (через VPN) или Trae
Автокомплит:          GigaCode (бесплатно, из РФ)
Чат для вопросов:     GigaChat / YandexGPT / ChatGPT
Локальный fallback:   Aider + T-Lite (Ollama)
```

---

## Связанные

- [[Топ расширений 2026]]
- [[VPN — мой набор]]
- [[Сводка проектов E-development]]
- [[Local AI]]
