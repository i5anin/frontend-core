---
tags:
  - веб-разработка
  - docker
  - консоль
created: 2025-01-16
date: 2025-01-16
---
**Методичка по основным командам [Docker](./Docker)**

[Docker](./Docker) — это инструмент для создания, развертывания и управления контейнерами. Вот основные команды, которые вам понадобятся для работы.

---

## 1. **Работа с образами**

- Скачивание образа:
    
    ```bash
    docker pull <image_name>:<tag>
    ```
    
- Список загруженных образов:
    
    ```bash
    docker images
    ```
    
- Удаление образа:
    
    ```bash
    docker rmi <image_id>
    ```
    

---

## 2. **Работа с контейнерами**

- Запуск контейнера:
    
    ```bash
    docker run <options> <image_name>
    ```
    
- Список запущенных контейнеров:
    
    ```bash
    docker ps
    ```
    
- Список всех контейнеров (включая остановленные):
    
    ```bash
    docker ps -a
    ```
    
- Остановка контейнера:
    
    ```bash
    docker stop <container_id_or_name>
    ```
    
- Удаление контейнера:
    
    ```bash
    docker rm <container_id_or_name>
    ```
    

---

## 3. **Управление контейнерами**

- Вход внутрь контейнера:
    
    ```bash
    docker exec -it <container_id_or_name> bash
    ```
    
- Просмотр логов контейнера:
    
    ```bash
    docker logs <container_id_or_name>
    ```
    
- Перезапуск контейнера:
    
    ```bash
    docker restart <container_id_or_name>
    ```
    

---

## 4. **Создание собственных образов**

- Сборка образа из Dockerfile:
    
    ```bash
    docker build -t <image_name>:<tag> <path_to_dockerfile>
    ```
    

---

## 5. **Управление данными**

- Список томов Docker:
    
    ```bash
    docker volume ls
    ```
    
- Удаление тома:
    
    ```bash
    docker volume rm <volume_name>
    ```
    
- Проброс локальной директории в контейнер:
    
    ```bash
    docker run -v <host_path>:<container_path> <image_name>
    ```
    

---

## 6. **Сети в Docker**

- Список сетей:
    
    ```bash
    docker network ls
    ```
    
- Создание пользовательской сети:
    
    ```bash
    docker network create <network_name>
    ```
    
- Привязка контейнера к сети:
    
    ```bash
    docker network connect <network_name> <container_id_or_name>
    ```
    

---

## 7. **Утилиты и информация**

- Информация о системе Docker:
    
    ```bash
    docker info
    ```
    
- Проверка конфигурации Docker:
    
    ```bash
    docker system df
    ```
    
- Очистка неиспользуемых данных:
    
    ```bash
    docker system prune
    ```
    

---

## 8. **Работа с Docker Compose**

- Запуск всех сервисов:
    
    ```bash
    docker-compose up
    ```
    
- Остановка всех сервисов:
    
    ```bash
    docker-compose down
    ```
    
- Перезапуск с пересборкой:
    
    ```bash
    docker-compose up --build
    ```
    
- Список сервисов Docker Compose:
    
    ```bash
    docker-compose ps
    ```
    

---

Эта методичка содержит ключевые команды Docker для ежедневного использования. Если нужны дополнительные подробности, пишите! 😊

---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
