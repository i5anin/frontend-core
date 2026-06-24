---
tags:
  - веб-разработка
  - docker
  - консоль
  - ui-ux
created: 2023-06-20
date: 2023-06-20
---
`yc` – это **Yandex Cloud CLI** (командная строка для работы с Yandex Cloud).

Тебе нужно **установить её** на свою систему, чтобы управлять облаком через терминал.

---

## ✅ **1. Установка Yandex Cloud CLI**

Выбери нужную команду **в зависимости от ОС**.

**🔹 **Windows****

1. Скачай [установщик](https://storage.yandexcloud.net/yandexcloud-yc/install.sh)
2. Запусти в `PowerShell` (от имени администратора):
    
    ```powershell
    irm https://storage.yandexcloud.net/yandexcloud-yc/install.sh | iex
    ```
    
3. Закрой и открой терминал.

**🔹 **Linux / macOS****

```bash
curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash
```

После установки **перезапусти терминал**.

---

## ✅ **2. Проверка установки**

```bash
yc --version
```

Если всё верно, появится версия, например:

```
Yandex Cloud CLI 0.100.0
```

---

## ✅ **3. Авторизация в Yandex Cloud**

```bash
yc init
```

**Что делать:**

1. Откроется браузер – войди в Yandex Cloud.
2. Выбери **каталог** (или создай новый).
3. Готово – теперь `yc` работает.

---

## ✅ **4. Проверка реестра контейнеров**

После авторизации можешь проверить, есть ли у тебя реестр:

```bash
yc container registry list
```

Если списка нет – создай:

```bash
yc container registry create --name my-registry
```

---

Теперь ты можешь загружать Docker-образы в Yandex Cloud.  
Если что-то не понятно – спрашивай.

---

## Связанные

- [[System_Administration]]
- [[Arch Linux]]
- [[NAS (Network Attached Storage)]]
- [[NAS сервер на любом железе с софтом Synology⁠⁠]]
- [[VcXsrv]]
- [[Windows]]
