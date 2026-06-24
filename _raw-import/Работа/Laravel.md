---
tags:
  - веб-разработка
  - javascript
  - api
  - backend
created: 2024-03-21
date: 2024-03-21
---
маршрутов API используется файл `api.php`
для обычных веб-маршрутов используется файл `web.php`


1. **`php artisan migrate`** — команда запускает миграции базы данных, что позволяет создавать и модифицировать таблицы базы данных. Файлы миграций обычно находятся в директории `database/migrations`.
    
2. **`php artisan make:model Task -mf`** — создаёт модель `Task` для взаимодействия с таблицей `tasks` в базе данных. Параметры `-m` и `-f` указывают на то, что вместе с моделью будут созданы миграция (`-m`) и фабрика (`-f`) для модели. Миграция будет добавлена в директорию `database/migrations`, а фабрика — в `database/factories`.
    
3. **`php artisan make:model Desk -mf`** и **`php artisan make:model DeskList -mf`** работают аналогично предыдущей команде, создавая модели `Desk` и `DeskList` соответственно, а также соответствующие миграции и фабрики.
[PHP](./PHP)

---

## Связанные

- [[Frameworks]]
- [[Angular.js]]
- [[Express.js (2)]]
- [[Express.js]]
- [[Framework7 (2)]]
- [[Framework7]]
