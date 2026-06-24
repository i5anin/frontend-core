---
tags:
  - веб-разработка
  - html
  - javascript
  - telegram
created: 2025-04-13
date: 2025-04-13
---
Sergei, [05.01.2025 16:43]
+

Sergei, [05.01.2025 16:49]
https://plugins.jetbrains.com/plugin/index?xmlId=com.intellij.mermaid&utm_source=product&utm_medium=link&utm_campaign=WS&utm_content=2024.2

Sergei, [03.02.2025 20:03]
      //region Отправка в тестовую группу с темами
      await bot.telegram.sendMessage(
        LOG.id, // ID канала
        (await getUserLinkById(ctx.chat.id)) + '\n' + message,
        {
          parse_mode: 'HTML',
          message_thread_id: LOG.metrics
        }
      )
      //endregion

Sergei, [03.02.2025 23:53]
В WebStorm можно использовать систему Scope и File Templates, но нет встроенного механизма для показа поясняющих файлов в виде комментариев рядом с основным файлом. Однако, есть несколько решений:

Способ 1: Использование .info.js в виде документации (лучший вариант)

Если ты хочешь, чтобы core.info.js отображался рядом с core.js в виде пояснения, просто создай этот файл в той же папке:

/src
  ├── core.js
  ├── core.info.js

⚡ Дополнительно:
WebStorm позволяет настроить отображение этих файлов в виде Scope (Областей), чтобы видеть только нужные пары файлов.

Шаги:
 1. Открываешь File > Settings > Appearance & Behavior > Scopes
 2. Создаёшь новый Scope и добавляешь фильтр *.info.js
 3. Теперь WebStorm будет показывать их как связанные файлы

Способ 2: Использование WebStorm File Association

Можно связать core.js и core.info.js, чтобы IDE воспринимала core.info.js как часть документации:

Шаги:
 1. Открыть Settings > File Types
 2. Добавить новый тип файлов (например, *.info.js)
 3. Выбрать “Plain Text”, чтобы IDE не парсила код внутри core.info.js
 4. Теперь WebStorm не будет путать его с кодом, но оставит рядом

Способ 3: Использование JSDoc в core.js

Вместо отдельного .info.js можно добавить описание прямо в core.js:

/**
 * @fileoverview Ядро системы
 * @module Core
 */

Плюсы:
✅ WebStorm будет отображать подсказку в коде
✅ IDE автоматически распознает документацию

Минусы:
❌ Файл не отдельно, но описание рядом

Способ 4: Использование Markdown (.md)

Если хочешь видеть текст пояснения прямо в WebStorm, можно создать core.info.md:

/src
  ├── core.js
  ├── core.info.md

WebStorm поддерживает Markdown и может показывать .md файлы в предпросмотре.

Какой способ лучше?
 • Хочешь просто пояснительный файл рядом? → core.info.js (Способ 1)
 • Хочешь, чтобы WebStorm воспринимал *.info.js как не-код? → Способ 2
 • Хочешь пояснение прямо в коде? → JSDoc (Способ 3)
 • Хочешь видеть пояснение красиво оформленным? → Markdown (Способ 4)

Какой вариант тебе больше подходит?

Sergei, [04.02.2025 10:18]
шорткаты

Sergei, [04.02.2025 14:15]
// Получение пути текущего файла и директории
/**
 * @file Проверка и восстановление таблиц MySQL
 * @description Этот файл выполняет проверку наличия таблиц в БД MySQL
 *              и восстанавливает недостающие.
 */

/**
 * @fileoverview Ядро системы
 * @module Core
 */

Sergei, [05.02.2025 9:10]


Sergei, [18.02.2025 10:21]
Открыть проект

Проекты могут быть открыты в новом окне, заменить проект в текущем окне или быть прикреплены к уже открытым проектам.  
Как вы хотите открыть проект?

- Это окно
- Новое окно
- Прикрепить
- Отменить

[Не спрашивать снова]

Sergei, [03.03.2025 9:44]


Sergei, [03.03.2025 9:44]
вот для js вроед

Sergei, [25.03.2025 10:51]
WEBSTORM

Sergei, [25.03.2025 14:08]


Sergei, [26.03.2025 10:31]
Editor > Code Style > JavaScript > Wrapping and Braces > Object > Align = on value

Editor > Code Style > JavaScript > Wrapping and Braces > Variable declaration > Align = when multiline

Sergei, [08.04.2025 20:06]
PowerShell 7

---

## Связанные

- [[Tools_and_Utilities]]
- [[ABBYY FineReader PDF]]
- [[ESLint Quasar]]
- [[nexe]]
- [[npm i предупреждения]]
- [[npm и команды]]
