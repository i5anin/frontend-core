---
tags:
  - веб-разработка
  - javascript
  - backend
created: 2025-03-25
date: 2025-03-25
---
Ты открыл настройки **Code Style → JavaScript → Wrapping and Braces** в WebStorm.

На скриншоте видно, что можно гибко управлять переносами строк, выравниванием и форматированием для различных конструкций JavaScript-кода. Ниже — пояснение, что значат ключевые опции и как их настроить под Clean Code.

---

## ✅ **Что здесь важно для Clean Code 2025 (по Роберту Мартину)**

**📌 `Assignment statement` → `Assignment sign on next line`**

- **Отключено по умолчанию** — и правильно.
- ✅ Оставляем **отключённым**, чтобы `=` не уезжал на следующую строку (нечитаемо).

---

**📌 `'switch' statement` → `Indent 'case' branches`**

- ✅ **Включено** — это хорошо. Вложенность `case` читается правильно.

---

**📌 `'try' statement`**

- `catch on new line`, `finally on new line`
- Рекомендуется **включить**, если хочешь, чтобы `catch` и `finally` начинались с новой строки для читабельности.

---

**📌 `Binary expressions`**

- `Align when multiline` — ❌ Лучше **отключить**, иначе будут выравниваться операнды по знаку, что нарушает KISS.
- `Operation sign on next line` — ❌ Не нужно, знак `+`, `&&` и др. должен быть в конце строки, а не в начале следующей.
- `New line after '('` — ❌ Лучше оставить выключенным.
- `Place ')' on new line` — ❌ Обычно не требуется.

---

**📌 `Arrays` и `Objects`**

- `Align when multiline` — ✅ Выключено (и правильно), иначе будет лишнее выравнивание.
- `New line after '['` и `Place ']' on new line` — ❌ по вкусу, но чаще выключено для компактности.
- Рекомендую: `Wrap if long`

---

**📌 `Ternary operation`**

- `Align when multiline` — ❌ отключить, не выравниваем `?` и `:`
- `?` and `:` signs on next line — ❌ не нужно, это снижает читаемость

---

## 🔧 Рекомендации для твоего случая:

Чтобы соответствовать **чистому и компактному коду**, в этой вкладке:

|Опция|Состояние|
|---|---|
|`'switch' statement` → Indent case|✅ Включено|
|`'try' statement` options|⬜ (по вкусу)|
|`Assignment sign on next line`|❌ Отключено|
|`Binary expressions → align`|❌ Отключено|
|`Ternary operation`|❌ Всё отключить|
|`Arrays/Objects → Align`|❌ Отключено|
|`Wrap if long`|✅ Включить|

---

## 🧪 Как применить:

1. Измени опции.
2. Нажми `Apply`, потом `OK`.
3. Используй `Ctrl + Alt + L` для автоформатирования файла.

---

Если хочешь — могу подготовить `.editorconfig` или JSON-экспорт WebStorm-настроек в твоём стиле.

---

## Связанные

- [[JavaScript]]
- [[AJAX]]
- [[ES5 & ES6]]
- [[JavaScript]]
- [[Promise]]
- [[Реактивность]]
