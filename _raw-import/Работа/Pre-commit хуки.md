---
tags: [git, hooks, автоматизация]
created: 2026-06-20
---

# Pre-commit хуки

> Скрипт, который запускается **автоматически перед каждым коммитом**. Если скрипт завершается с ошибкой — коммит отменяется.

---

## Зачем

- Автогенерация файлов (README, документация)
- Проверка кода (lint, type-check)
- Сканирование на секреты
- Форматирование

---

## Создать вручную

```sh
# Файл должен быть исполняемым shell-скриптом
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Содержимое `.git/hooks/pre-commit`:

```sh
#!/bin/sh
node scripts/generate-readme.js && git add README.md
```

> [!warning] Не попадает в git
> `.git/hooks/` не версионируется. Каждый клон репозитория нужно настраивать заново — или использовать Husky.

---

## Через Husky (рекомендуется для команды)

```sh
npm install --save-dev husky
npx husky init
```

Создаётся `.husky/pre-commit` — этот файл **попадает в git**.

```sh
# .husky/pre-commit
node scripts/generate-readme.js && git add README.md
```

> [!tip]
> `husky init` автоматически добавляет `"prepare": "husky"` в `package.json` — хуки установятся у всех после `npm install`.

---

## Пропустить хук разово

```sh
git commit --no-verify -m "fix: hotfix"
```

> [!danger]
> `--no-verify` обходит все хуки. Использовать только в крайнем случае.

---

## Отладка

```sh
# Запустить хук вручную
sh .git/hooks/pre-commit

# Посмотреть код выхода
echo $?   # 0 = успех, не 0 = коммит будет отменён
```

---

## Связанные

- [[conventional-commits]]
- [[git-safe-commit]]
