---
tags:
  - веб-разработка
  - api
  - telegram
  - vpn
  - ии
created: 2026-06-18
date: 2026-06-18
---
# Vibe-coding — топ в России

> Лучшие российские vibe-coding сервисы. Что доступно **из РФ без VPN, с российской картой**.

> [!warning] Реальность
> **В РФ нет сервиса уровня Fable 5.** Российские LLM отстают на 1–2 поколения — примерно GPT-4-Turbo / Claude 3.5 Sonnet уровень. Зато доступны, работают, не требуют VPN.

---

## 🥇 Топ-3 — лучшие в России

**1. GigaCode Pro + GigaChat MAX 2 (Сбер) ⭐**

**Основные ссылки:**
- 🌐 GigaCode (плагин, бесплатно): https://gigacode.ru/
- 🌐 GigaCode AI (web): https://gigacode.ai/
- 🧠 GigaChat MAX 2 (модель + API): https://developers.sber.ru/portal/products/gigachat
- 💰 Тарифы GigaChat: https://developers.sber.ru/portal/products/gigachat-api
- 🤖 Telegram-бот: https://t.me/gigachat_bot

**Плагины для IDE:**
- 🔵 VS Code: https://marketplace.visualstudio.com/items?itemName=GigaCode.gigacode
- 🟠 JetBrains: https://plugins.jetbrains.com/plugin/23439-gigacode

💰 **Free / ~3500₽/мес** через API
🖥️ Плагины VS Code / JetBrains / Vim / Cursor

**Что есть:**
- **GigaChat MAX 2** — флагман Сбера, ~уровень GPT-4o
- Автокомплит (как Copilot)
- Чат с кодом, генерация тестов
- Понимает русский **лучше всех западных**
- Reasoning-режим
- Multi-file refactor

**Цена:** GigaCode сам **бесплатно**, GigaChat MAX через API ~3500₽/мес за 1М токенов.

**Когда выбирать:** **№1 для работы из РФ**. Особенно если код с русскими комментариями / переменными.

---

**2. Yandex Code Assistant + YandexGPT 5 Pro**

**Основные ссылки:**
- 🌐 Yandex Code Assistant: https://yandex.cloud/ru/services/yandexgpt-code-assistant
- 🧠 YandexGPT 5 (модель): https://yandex.cloud/ru/services/yandexgpt
- 💬 Чат YandexGPT (free): https://ya.ru/chat
- 💰 Цены Yandex Cloud AI: https://yandex.cloud/ru/docs/foundation-models/pricing
- 📖 Документация: https://yandex.cloud/ru/docs/code-assistant/

**Плагины для IDE:**
- 🔵 VS Code: https://marketplace.visualstudio.com/items?itemName=YandexCloud.yandex-cloud-code-assistant
- 🟠 JetBrains: https://plugins.jetbrains.com/plugin/24509-yandex-cloud-code-assistant

💰 **От 500₽/мес** + плата за токены
🖥️ VS Code / JetBrains

**Что есть:**
- **YandexGPT 5 Pro** — топ Яндекса, ~уровень GPT-4
- Интеграция с Yandex Cloud
- Чат, автокомплит, объяснение кода
- Reasoning-цепочки

**Когда выбирать:** если уже **в экосистеме Яндекс.Облака** (БД, S3, K8s). Корпоративный режим, аудит, compliance.

---

**3. Cotype Pro (MTS AI)**

**Основные ссылки:**
- 🌐 Cotype Pro: https://cotype.mts.ai/
- 🏢 MTS AI (платформа): https://mts.ai/
- 💰 Тарифы: https://cotype.mts.ai/#pricing
- 📖 API доки: https://cotype.mts.ai/api/docs

💰 **От 990₽/мес** (Pro) · Enterprise по запросу
🌐 Web / API

**Что есть:**
- **Cotype Pro** — российский Claude/GPT, ~Claude 3.5 Sonnet уровень
- **128k контекст** — большой для российской модели
- Reasoning-режим
- API для интеграции в любой IDE через Aider/Cline
- On-premise deployment

**Когда выбирать:** когда **нужен большой контекст** + российский провайдер. Особенно для корпоративных задач с NDA.

---

## Сравнение топ-3 РФ

| | GigaCode + GigaChat MAX | Yandex Code + GPT 5 Pro | Cotype Pro |
|---|---|---|---|
| **Цена** | ~3500₽/мес API | от 500₽/мес | от 990₽/мес |
| **Качество модели** | ~GPT-4o | ~GPT-4 | ~Claude 3.5 Sonnet |
| **Контекст** | 128k | 32k–64k | **128k** |
| **Reasoning** | ✅ | ✅ | ✅ |
| **IDE плагин** | ✅ родной | ✅ родной | через Aider/Cline |
| **Из РФ** | ✅ | ✅ | ✅ |
| **Российская карта** | ✅ | ✅ | ✅ |
| **Русский язык** | 🥇 | 🥈 | 🥉 |
| **Multi-file агент** | базовый | базовый | через Aider |
| **Авто-сама-всё-сделай** | ❌ | ❌ | ❌ |

---

## Сравнение с Fable 5 (честно)

| Параметр | Fable 5 (Claude) | Топ-3 РФ |
|---|---|---|
| **Reasoning** | 🥇 эталон | ⚠️ 60–70% от Fable 5 |
| **Контекст** | 200k+ | 64–128k |
| **Многошаговые задачи** | сложные планы | простые цепочки |
| **Качество кода** | продакшен | **нужен ревью** |
| **Стоимость** | $200/мес + VPN | от 500₽/мес |
| **Из РФ** | ❌ | ✅ |

> [!warning] Главное отличие
> Fable 5 / Devin — **«дай задачу — забудь о ней»**.
> Российские — **«дай задачу — проверь результат»**.

---

## Как **максимизировать** качество с российскими сервисами

**Стратегия 1: Гибрид через Aider**

Использовать **Aider** ([aider.chat](https://aider.chat/)) как агента, но **подключить российский LLM**:

```bash
# Подключаем Cotype Pro через OpenAI-совместимый API
aider --openai-api-base https://api.cotype.mts.ai/v1 \
      --openai-api-key sk-... \
      --model cotype-pro
```

Получаешь **multi-file агента** + российский провайдер.

**Стратегия 2: Локально + T-Pro**

🔗 [github.com/Tinkoff/T-Lite](https://github.com/Tinkoff/T-Lite)

- **T-Pro** — open-source LLM от Тинькофф (~уровень Llama 3.1 70B)
- Запуск через **Ollama** + GPU 24GB+
- **Бесплатно, приватно, без интернета**

Подключаешь через Aider / Continue → получаешь полностью локального агента.

**Стратегия 3: VPN-friendly fallback**

🔗 [Trae](https://trae.ai/) — китайский IDE-агент, **часто работает из РФ без VPN**, доступ к Claude / GPT-4 бесплатно.

> [!tip] Лайфхак
> Trae даёт бесплатный доступ к Claude через ByteDance. Может работать как премиум-агент **без подписки и VPN**, если повезёт.

---

## Идеальный российский стек 2026

```
Основной (агент):    GigaCode Pro + GigaChat MAX 2  (~3500₽/мес)
Чат для вопросов:    GigaChat MAX  /  Cotype Pro  (~990₽/мес)
Бэкап локально:      T-Pro через Ollama  (бесплатно)
Fallback западный:   Trae IDE  (бесплатно, без VPN)
```

**Итого:** ~4500₽/мес = **~$45**

Уровень не Fable 5, но **«в полтора раза дешевле Cursor Pro и работает из РФ без головной боли»**.

---

## Чего не хватает в РФ

❌ **Полностью автономного агента** уровня Devin
❌ **Reasoning-моделей** уровня Fable 5 / o-серий
❌ **200k+ контекста** на флагмане
❌ **Background-агентов** (Cursor Ultra)
❌ **One-shot app-генераторов** (Bolt.new / Lovable)

---

## Прогноз 2026–2027

| Что ждать | Когда |
|---|---|
| **GigaChat MAX 3** с reasoning уровня o1 | Конец 2026 |
| **YandexGPT 6** с агентским режимом | 2027 |
| **Российский Devin-аналог** от Сбера/Яндекса | 2027+ |
| **T-Bank / T-Tech** агенты | Следить за релизами |

Пока что — **лучшее из России = GigaCode + GigaChat MAX**.

---

## Связанные

- [[Vibe-coding — список сервисов]] — все 20 сервисов мира
- [[Vibe-coding — топ платных уровня Fable 5]] — международный премиум
- [[Local AI]] — локальный стек
- [[VPN — мой набор]] — для доступа к зарубежным
