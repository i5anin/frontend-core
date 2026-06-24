---
tags:
  - веб-разработка
  - javascript
  - docker
  - api
  - nodejs
created: 2025-03-25
date: 2025-03-25
---
Да, если тебе нужен **сервер (бэкенд) для SPA-приложения**, написанный на **Node.js (например, Express.js)**, то в Yandex Cloud есть несколько вариантов запуска. Ниже — строго по шагам и с объяснением, **какой способ лучше**.

---

## ✅ Цель: Развернуть сервер на Node.js (Express) в Yandex Cloud

---

## 🔧 Вариант 1: **Serverless Containers** (рекомендуется)

Современный способ, подходит для Docker-проектов. Идеально для Express.js.

**📌 Преимущества:**

- Нет необходимости вручную управлять виртуальной машиной
- Автошкала, быстрый старт
- Интеграция с API Gateway
- Оплата за фактическое использование

**📦 Что нужно:**

1. Собрать Docker-образ с Node.js и твоим Express-приложением
2. Залить в **Container Registry**
3. Создать **Serverless Container**
4. Подключить через **API Gateway** (если нужен публичный HTTP-доступ)

---

## 🔧 Вариант 2: **Compute Cloud** (ВМ)

Запускаешь полноценную виртуалку (например, Ubuntu), ставишь туда Node.js и запускаешь сервер.

**📌 Преимущества:**

- Полный контроль (как VPS)
- Можно запускать что угодно

**📌 Недостатки:**

- Нужно настраивать nginx / ufw / pm2 и следить за безопасностью
- Платишь даже если сервер простаивает

---

## 🔧 Вариант 3: **Cloud Functions** (если нужен только API)

Если Express используется только ради API — можно переписать его как **функции**, реагирующие на HTTP-запросы.

---

## ✅ Рекомендуемый план: **Serverless Containers + Docker + API Gateway**

---

**🔹 1. Пример Dockerfile для Express.js**

```Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY .. .

RUN npm ci --omit=dev

EXPOSE 8080

CMD ["node", "index.js"]
```

➡️ `index.js` — твой файл, где Express слушает `process.env.PORT || 8080`

---

**🔹 2. Сборка и пуш в Container Registry**

```bash
docker build -t cr.yandex/your-registry/your-app:latest .
docker push cr.yandex/your-registry/your-app:latest
```

---

**🔹 3. Создание Serverless Container**

Можно через веб-интерфейс или CLI:

```bash
yc serverless container create \
  --name my-express-app

yc serverless container revision deploy \
  --container-name my-express-app \
  --image cr.yandex/your-registry/your-app:latest \
  --memory 512Mb \
  --cores 1 \
  --execution-timeout 10s \
  --concurrency 1 \
  --service-account-id my-service-account-id
```

---

**🔹 4. Прокси через API Gateway**

Чтобы получить публичный URL:

```bash
yc api-gateway create \
  --name my-express-gw \
  --spec-from-file gateway-spec.yaml
```

`gateway-spec.yaml`:

```yaml
openapi: 3.0.0
info:
  title: Express App
  version: 1.0.0
paths:
  /{proxy+}:
    x-yc-apigateway-integration:
      type: serverless_containers
      container_id: <container-id>
      url_template: "/{proxy}"
    get:
      responses:
        '200':
          description: OK
```

---

## ❓ Хочешь:

- Готовый `Dockerfile + index.js` шаблон?
- Инструкцию для **Compute Cloud**?
- Пример для **Cloud Functions**?

Уточни стек и предпочтения — выдам готовую конфигурацию.

---

## Связанные

- [[System_Administration]]
- [[Arch Linux]]
- [[NAS (Network Attached Storage)]]
- [[NAS сервер на любом железе с софтом Synology⁠⁠]]
- [[VcXsrv]]
- [[Windows]]
