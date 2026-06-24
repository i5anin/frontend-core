---
tags:
  - веб-разработка
  - vue
  - typescript
  - docker
created: 2025-04-14
date: 2025-04-14
---
## 📌 Предложение по терминологии (в стиле Yandex.Cloud / AWS / GCP)

|Уровень|Название (рус)|Название (англ)|Примеры / Пояснение|
|---|---|---|---|
|1. Организация|**Организация**|`Organization`|Например: `organization-pf-forum`|
|2. Облако|**Облако**|`Cloud`|Например: `cloud-isa-pf-forum`|
|3. Проект / Контейнер|**Проект** или **Сервис**|`Project` / `Service`|Например: `freezer`, `docker`, `main`|
|4. Объект внутри|**Ресурс** или конкретный тип: `Бакет`, `БД`, `ВМ`|`Resource` / `Bucket` / `Instance` / `Database`|Например: `Object Storage`, `MongoDB`, `VM`|

---

## 📌 Иерархия хлебных крошек (пример)

```txt
Организация → Облако → Проект → Бакет (или Ресурс)
```

**Пример:**

```txt
pf-forum → cloud-isa → freezer → bucket-124
```

---

## 📂 Названия роутов (и крошек)

|Путь|Название в крошке|
|---|---|
|`/organizations`|Организации|
|`/organization/:orgId/clouds`|Облака|
|`/cloud/:cloudId/projects`|Проекты|
|`/project/:projectId/resources`|Ресурсы|
|`/project/:projectId/storage/:bucketId`|Бакет `bucketId`|

---

## ✅ Как назвать бакеты

- **Технически**: `bucket-124`, `images-prod`, `archive-2024`
    
- **Пользовательски**: `Хранилище для фото`, `Резервные копии`, `S3-бакет для сайта`
    

В крошках можно выводить:  
`Бакет: archive-2024` или просто `archive-2024`

---

## ✅ Как реализовать универсальные хлебные крошки

На основе `vue-router`:

```ts
const routes = [
  {
    path: '/organizations',
    name: 'Organizations',
    meta: { breadcrumb: 'Организации' },
  },
  {
    path: '/organization/:orgId/clouds',
    name: 'Clouds',
    meta: { breadcrumb: 'Облака' },
  },
  {
    path: '/cloud/:cloudId/projects',
    name: 'Projects',
    meta: { breadcrumb: 'Проекты' },
  },
  {
    path: '/project/:projectId/storage/:bucketId',
    name: 'Bucket',
    meta: {
      breadcrumb: (route) => `Бакет: ${route.params.bucketId}`,
    },
  },
]
```

---

Хочешь — соберу готовую реализацию крошек (универсальный компонент), который поддерживает `meta.breadcrumb`, а также динамические заголовки из API (`clientName`, `bucketName`, и т.д.).

---

## Связанные

- [[System_Administration]]
- [[Arch Linux]]
- [[NAS (Network Attached Storage)]]
- [[NAS сервер на любом железе с софтом Synology⁠⁠]]
- [[VcXsrv]]
- [[Windows]]
