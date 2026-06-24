---
tags:
  - веб-разработка
  - docker
created: 2025-01-21
date: 2025-01-21
---
[Docker](./Docker)
****Образы (Images):****

- Список: `docker images`
- Скачать: `docker pull <image>:<tag>`
- Удалить: `docker rmi <image>`
- Построить: `docker build -t <image>:<tag> <path>`

---

****Контейнеры (Containers):****

- Список: `docker ps -a`
- Запустить: `docker run <image>`
- Запустить с портами: `docker run -d -p <host>:<container> --name <name> <image>`
- Остановить: `docker stop <container>`
- Запустить: `docker start <container>`
- Перезапустить: `docker restart <container>`
- Удалить: `docker rm <container>`

---

****Логи и статистика:****

- Логи: `docker logs <container>`
- Ресурсы: `docker stats`

---

****Тома (Volumes):****

- Список: `docker volume ls`
- Создать: `docker volume create <name>`
- Удалить: `docker volume rm <name>`

---

****Сети (Networks):****

- Список: `docker network ls`
- Создать: `docker network create <name>`
- Удалить: `docker network rm <name>`

---

****Docker Compose:****

- Запустить сервисы: `docker-compose up [-d]`
- Остановить и удалить: `docker-compose down`
- Логи: `docker-compose logs`

---

****Очистка:****

- Удалить неиспользуемые ресурсы: `docker system prune`
- Удалить всё: `docker system prune -a`


---

## Связанные

- [[Docker]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
- [[Docker взаимодействие между контейнерами]]
