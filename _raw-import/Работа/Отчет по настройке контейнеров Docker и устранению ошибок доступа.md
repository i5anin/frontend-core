---
tags:
  - веб-разработка
  - vue
  - html
  - docker
  - api
created: 2025-02-04
date: 2025-02-04
---
## 1. **Список доступных Docker-образов**

```bash
docker images
```

```plaintext
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
tg_bot-bot   latest    5e3104b04a27   31 minutes ago   1.39GB
tg_bot-vue   latest    18ccb2d02c54   31 minutes ago   79.6MB
tg_bot-api   latest    3f1e2ceb4086   33 minutes ago   778MB
mysql        5.7       4bc6bc963e6d   13 months ago    689MB
```

---

## 2. **Попытка выполнения запроса из `admin_service` к `php_api`**

```bash
docker exec -it admin_service sh
```

```plaintext
/ # curl http://php_api:8080
curl: (7) Failed to connect to php_api port 8080 after 0 ms: Could not connect to server
/ #
```

---

## 3. **Проверка локального доступа к API**

```bash
curl http://localhost:8080
```

```html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body>
<h1>Forbidden</h1>
<p>You don't have permission to access this resource.</p>
<hr>
<address>Apache/2.4.62 (Debian) Server at localhost Port 8080</address>
</body></html>
```

---

## 4. **Попытка повторного подключения контейнеров к сети `tg_bot_http_api`**

**4.1. Подключение `php_api`:**

```bash
docker network connect tg_bot_http_api php_api
```

```plaintext
Error response from daemon: endpoint with name php_api already exists in network tg_bot_http_api
```

**4.2. Подключение `admin_service`:**

```bash
docker network connect tg_bot_http_api admin_service
```

---

## 5. **Повторная проверка запроса к API**

**5.1. Из хост-машины:**

```bash
curl http://php_api:80
```

```plaintext
curl: (6) Could not resolve host: php_api
```

**5.2. Из контейнера `admin_service`:**

```bash
docker exec -it admin_service sh
```

```plaintext
/ # curl http://php_api:80
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body>
<h1>Forbidden</h1>
<p>You don't have permission to access this resource.</p>
<hr>
<address>Apache/2.4.62 (Debian) Server at php_api Port 80</address>
</body></html>
/ #
```

---

## 6. **Вывод и следующая задача**

**Проблемы:**

1. **403 Forbidden**:
    
    - Сервер Apache работает, но запрещает доступ к ресурсам.
    - Проблема может быть в правах на файлы или в конфигурации Apache.
2. **DNS-имя `php_api` не резолвится в некоторых случаях**:
    
    - Необходима проверка сетевых настроек.

**Рекомендации для устранения:**

1. Проверить и исправить права доступа к файлам в контейнере `php_api`:
    
    ```bash
    chown -R www-data:www-data /var/www/html
    chmod -R 755 /var/www/html
    ```
    
2. Убедиться, что конфигурация Apache позволяет доступ:
    
    - Изменить `/etc/apache2/sites-available/000-default.conf`:
        
        ```apache
        <Directory /var/www/html>
            AllowOverride All
            Require all granted
        </Directory>
        ```
        
    - Перезапустить Apache:
        
        ```bash
        service apache2 restart
        ```
        
3. Проверить инициализацию сети `tg_bot_http_api` и подключение контейнеров:
    
    ```bash
    docker network inspect tg_bot_http_api
    ```
    
4. Пересобрать и перезапустить контейнеры:
    
    ```bash
    docker-compose down && docker-compose up -d
    ```
    

---


---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Registry]]
- [[Docker Trust]]
- [[Docker Volume]]
