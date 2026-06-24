---
tags:
  - веб-разработка
  - docker
  - git
  - npm
  - vpn
created: 2025-03-16
date: 2025-03-16
---
Настроить **CI/CD** для локального сервера можно с помощью **GitHub Actions**, **GitLab CI**, **Jenkins**, **Drone CI** или **Bitbucket Pipelines**, в зависимости от платформы.

Если сервер локальный, то деплой можно делать через **SSH + rsync**, **Docker Compose**, **Webhooks** или **Gitea Actions**.

---

## **1. Подходы к развертыванию (CI/CD) на локальном сервере**

****📌 Вариант 1: GitHub Actions + SSH (через rsync)****

- Используется для автоматического деплоя кода на сервер при коммите в `main`.
- Требуется **открытый доступ по SSH** к серверу (или VPN).

**📍 `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Local Server

on:
  push:
    branches:
      - main  # Деплой срабатывает при пуше в main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: 🚀 Клонирование репозитория
        uses: actions/checkout@v4

      - name: 📦 Установка зависимостей
        run: npm install

      - name: 🔑 Настройка SSH-доступа
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: 📂 Деплой на локальный сервер (через rsync)
        run: |
          rsync -avz --delete ./ user@192.168.1.100:/var/www/project

      - name: 🔄 Перезапуск сервера
        run: ssh user@192.168.1.100 "cd /var/www/project && docker-compose up -d --build"
```

**Как настроить:**

1. Добавить в **GitHub Secrets** → `SSH_PRIVATE_KEY` (с приватным ключом доступа к серверу).
2. Заменить `user@192.168.1.100` на свой IP и пользователя.
3. Убедиться, что `rsync` и `Docker` установлены на сервере.

---

****📌 Вариант 2: GitLab CI + SCP + systemctl****

Если используется **GitLab CI/CD**, можно настроить деплой через `scp` и `systemctl`.

**📍 `.gitlab-ci.yml`**

```yaml
stages:
  - deploy

deploy:
  stage: deploy
  script:
    - echo "🔄 Деплой на сервер..."
    - scp -r . user@192.168.1.100:/var/www/project
    - ssh user@192.168.1.100 "cd /var/www/project && npm install && pm2 restart app"
  only:
    - main
```

**Как настроить:**

1. Создать SSH-ключ (`ssh-keygen -t rsa`).
2. Добавить публичный ключ в `~/.ssh/authorized_keys` на сервере.
3. Установить `pm2` для управления процессами (`npm i -g pm2`).

---

****📌 Вариант 3: Webhooks + Local Runner****

Если сервер локальный и **нет доступа из интернета**, можно использовать **Git Webhooks**.

**📍 Настроить Webhook:**

1. В репозитории (GitHub/GitLab) добавить Webhook, указывающий на локальный сервер (`http://192.168.1.100:5000/webhook`).
2. Запустить простой Webhook-сервер на локальном хостинге.

**📍 `webhook-server.js` (Node.js)**

```js
import { exec } from "child_process";
import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("🚀 Получен webhook, начинаем деплой...");
  
  exec("cd /var/www/project && git pull && npm install && pm2 restart app", (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Ошибка деплоя: ${stderr}`);
      return res.status(500).send("Ошибка");
    }
    console.log(`✅ Деплой успешен: ${stdout}`);
    res.send("Деплой завершен");
  });
});

app.listen(5000, () => console.log("🎯 Webhook-сервер слушает порт 5000"));
```

**Запуск сервера:**

```sh
node webhook-server.js
```

Теперь при пуше изменений GitHub/GitLab автоматически отправит запрос на сервер, который выполнит деплой.

---

## **Выбор подхода**

|**Подход**|**Когда использовать**|
|---|---|
|**GitHub Actions + SSH (rsync)**|Сервер в локальной сети, есть доступ по SSH|
|**GitLab CI + SCP + systemctl**|Используется GitLab, нужен простой деплой|
|**Webhooks + Local Runner**|Сервер без публичного IP, нет доступа по SSH|

Если сервер управляется через **Docker**, то можно вместо `npm install && pm2 restart` использовать `docker-compose up -d --build`.

Какой вариант тебе подходит? 🚀

---

## Связанные

- [[Автоматизация]]
- [[CI-CD]]
- [[Автоматизация труда frontend, backend и DevOps]]
