---
tags:
  - веб-разработка
  - docker
created: 2025-03-07
date: 2025-03-07
---
📌 **Обновленный `docker-compose.yml` с `secrets` для Docker Swarm (без версии):**

```yaml
services:
  app:
    image: myapp:latest
    secrets:
      - db_password

secrets:
  db_password:
    external: true
```

📌 **Создание секрета перед запуском**:

```sh
echo "supersecurepassword" | docker secret create db_password -
```

📌 **Проверка доступности секрета в контейнере**:

```sh
cat /run/secrets/db_password
```

Теперь Docker автоматически разберет файл без явного указания `version`. 🚀

---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
