---
tags:
  - веб-разработка
  - docker
  - консоль
created: 2025-01-24
date: 2025-01-24
---
**Основные команды [Docker](./Docker) и примеры их использования**

---

**1. **[docker](#) run****

Создаёт и запускает контейнер.

```bash
docker run -d -p 8080:80 --name my_container nginx
```

- `-d` — запускает контейнер в фоновом режиме.
- `-p 8080:80` — пробрасывает порт 80 контейнера на порт 8080 хоста.
- `--name my_container` — задаёт имя контейнера.
- `nginx` — образ, который используется для создания контейнера.

---

**2. **docker ps****

Показывает список запущенных контейнеров.

```bash
docker ps
```

Вывод:

```
CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS       PORTS                  NAMES
12345abcde     nginx     "/docker-entrypoint.…"   5 seconds ago  Up 3 seconds 0.0.0.0:8080->80/tcp   my_container
```

Если нужно увидеть **все контейнеры** (включая остановленные):

```bash
docker ps -a
```

---

**3. **docker images****

Показывает список локально сохранённых Docker-образов.

```bash
docker images
```

Вывод:

```
REPOSITORY      TAG       IMAGE ID       CREATED       SIZE
nginx           latest    12345abcde     2 weeks ago   133MB
```

---

**4. **docker pull****

Скачивает образ из Docker Hub или другого реестра.

```bash
docker pull ubuntu:20.04
```

- `ubuntu:20.04` — имя образа и его версия (тег).

---

**5. **docker build****

Создаёт новый образ из Dockerfile.

```bash
docker build -t my_image:1.0 .
```

- `-t my_image:1.0` — задаёт имя и тег для создаваемого образа.
- `.` — путь к Dockerfile (в данном случае текущая директория).

---

**6. **docker exec****

Выполняет команду внутри запущенного контейнера.

```bash
docker exec -it my_container bash
```

- `-it` — включает интерактивный режим.
- `bash` — команда, которая будет выполнена (в данном случае открывается терминал контейнера).

---

**7. **docker stop****

Останавливает запущенный контейнер.

```bash
docker stop my_container
```

---

**8. **docker start****

Запускает ранее остановленный контейнер.

```bash
docker start my_container
```

---

**9. **docker rm****

Удаляет контейнер.

```bash
docker rm my_container
```

Если контейнер запущен, сначала его нужно остановить:

```bash
docker stop my_container
docker rm my_container
```

---

**10. **docker rmi****

Удаляет образ.

```bash
docker rmi nginx
```

Если образ используется контейнером, нужно удалить контейнер, прежде чем удалить образ.

---

**11. **docker logs****

Показывает логи контейнера.

```bash
docker logs my_container
```

Если нужно следить за логами в реальном времени:

```bash
docker logs -f my_container
```

---

**12. **docker volume****

Управление volume (хранилищами данных):

- Создать volume:
    
    ```bash
    docker volume create my_volume
    ```
    
- Список volumes:
    
    ```bash
    docker volume ls
    ```
    
- Удалить volume:
    
    ```bash
    docker volume rm my_volume
    ```
    

---

**13. **docker network****

Управление сетями Docker:

- Создать сеть:
    
    ```bash
    docker network create my_network
    ```
    
- Список сетей:
    
    ```bash
    docker network ls
    ```
    
- Подключить контейнер к сети:
    
    ```bash
    docker network connect my_network my_container
    ```
    

---

**14. **docker-compose up****

Запускает сервисы из `docker-compose.yml`.

```bash
docker-compose up -d
```

- `-d` — запускает сервисы в фоновом режиме.

---

**15. **docker stats****

Показывает использование ресурсов (CPU, память и т.д.) контейнеров.

```bash
docker stats
```

---

**Быстрая шпаргалка**

- **Создать и запустить контейнер**: `docker run -d -p 8080:80 nginx`
- **Посмотреть запущенные контейнеры**: `docker ps`
- **Остановить контейнер**: `docker stop <container_name>`
- **Удалить контейнер**: `docker rm <container_name>`
- **Посмотреть образы**: `docker images`
- **Удалить образ**: `docker rmi <image_name>`
- **Скачать образ**: `docker pull <image_name>`

Если нужно больше примеров или пояснений, пиши! 😊

---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
