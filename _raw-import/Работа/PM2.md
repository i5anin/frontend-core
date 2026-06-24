---
tags:
  - веб-разработка
  - javascript
  - npm
  - консоль
created: 2024-09-09
date: 2024-09-09
---
[PM2 - Quick Start (keymetrics.io)](https://pm2.keymetrics.io/docs/usage/quick-start/)

**Основные команды:**

* **`pm2 start <app.js>`:** Запуск приложения.
* **`pm2 stop <app_name|id>`:** Остановка приложения.
* **`pm2 restart <app_name|id>`:** Перезапуск приложения.
* **`pm2 reload <app_name|id>`:** Перезагрузка приложения без остановки.
* **`pm2 list`:** Вывод списка запущенных процессов.
* **`pm2 show <app_name|id>`:** Вывод подробной информации о процессе.
* **`pm2 logs <app_name|id>`:** Просмотр логов приложения.
* **`pm2 monit`:** Мониторинг производительности приложений.
* **`pm2 kill`:** Остановка демона PM2.
* **`pm2 startup`:** Настройка автоматического запуска PM2 при загрузке системы.
* **`pm2 deploy <ecosystem_file.json>`:** Развертывание приложения на удаленном сервере.

**Пример использования:**

```bash
# Запуск приложения app.js с именем "my-app" и отслеживанием изменений в папке "src"
pm2 start app.js --name "my-app" --watch src

# Просмотр списка запущенных процессов
pm2 list

# Перезагрузка приложения "my-app"
pm2 reload my-app

# Просмотр логов приложения "my-app"
pm2 logs my-app
```



---

## Связанные

- [[Tools_and_Utilities]]
- [[ABBYY FineReader PDF]]
- [[ESLint Quasar]]
- [[nexe]]
- [[npm i предупреждения]]
- [[npm и команды]]
