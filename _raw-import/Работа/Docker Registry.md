---
tags:
  - веб-разработка
  - docker
  - git
created: 2025-02-04
date: 2025-02-04
---
****Docker Registry – что это?****

`Docker Registry` — это **реестр образов Docker**, который позволяет **хранить, управлять и распространять контейнерные образы**. Он может быть **публичным (Docker Hub, Quay, GitHub Container Registry)** или **локальным (самостоятельно развернутый приватный реестр)**.

---

## **Виды Docker Registry**

**✅ **Публичные реестры** (открытые, доступные в интернете)**

- **[Docker Hub](https://hub.docker.com/)** – основной публичный реестр.
- **[Quay.io](https://quay.io/)** – реестр от Red Hat.
- **[GitHub Container Registry](https://github.com/features/packages)** – встроен в GitHub.
- **[Google Artifact Registry](https://cloud.google.com/artifact-registry)** – реестр в Google Cloud.

📌 **Пример загрузки образа в публичный реестр (Docker Hub):**

```sh
docker login
docker tag myimage myusername/myimage:latest
docker push myusername/myimage:latest
```

---

**✅ **Частный (локальный) Docker Registry****

Если не хочешь хранить образы в интернете, можно развернуть свой **локальный реестр**.

📌 **Запуск приватного реестра на своём сервере:**

```sh
docker run -d -p 5000:5000 --name registry registry:2
```

Теперь можно загружать образы в этот реестр:

```sh
docker tag myimage localhost:5000/myimage
docker push localhost:5000/myimage
```

---

## **Команды для работы с Docker Registry**

|Команда|Описание|
|---|---|
|`docker login`|Вход в реестр|
|`docker logout`|Выход из реестра|
|`docker pull <image>`|Загрузка образа из реестра|
|`docker push <image>`|Загрузка образа в реестр|
|`docker tag <image> <registry>/<repo>:<tag>`|Создание тега образа для отправки в реестр|

📌 **Пример загрузки образа в приватный реестр (локальный):**

```sh
docker tag myapp localhost:5000/myapp:v1
docker push localhost:5000/myapp:v1
```

---

## **Когда использовать локальный Docker Registry?**

✅ **Если есть корпоративные образы**, которые нельзя выкладывать в интернет.  
✅ **Если нужен быстрый доступ к образам без зависимости от внешних сервисов.**  
✅ **Если хочешь снизить нагрузку на сеть** (локальный кэш образов).

📌 **Пример запуска с `docker-compose.yml`:**

```yaml
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - ./data:/var/lib/registry
```

---

## **Вывод**

- **Docker Registry** — это хранилище Docker-образов.
- Можно использовать **публичные** реестры (Docker Hub, GitHub, Quay).
- Можно развернуть **локальный Docker Registry**, если образы приватные.
- Работает по стандартным `docker push` и `docker pull`.

🔥 **Если нужен полный контроль и безопасность — используй локальный реестр!** 🚀

---

## Связанные

- [[Docker]]
- [[commands Docker min]]
- [[Cущности в docker-compose.yml]]
- [[Docker Trust]]
- [[Docker Volume]]
- [[Docker взаимодействие между контейнерами]]
