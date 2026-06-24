---
tags:
  - веб-разработка
  - vue
  - react
  - javascript
  - typescript
created: 2025-02-23
date: 2025-02-23
---
Выбор правильного стиля именования файлов 📄 помогает организовать код, улучшить читабельность и упростить навигацию в проекте. Рассмотрим **четыре основных стиля** и где каждый из них используется.

---

## **1️⃣ Kebab-case (тире между словами) 🔗**

✅ **Пример:** `user-profile.vue`, `api-request.js`

🟢 **Когда использовать:**

- **🎨 Фронтенд-проекты (Vue, React, Angular)** – стандарт для имен файлов компонентов
- **🌐 URL и маршруты** – `/user-profile/`, `/login-page/`
- **🖥️ Node.js (REST API)** – `user-profile-controller.js`, `auth-service.js`

🔴 **Когда НЕ использовать:**

- ❌ Для переменных (JavaScript не поддерживает `kebab-case` в названиях переменных)

---

## **2️⃣ Snake_case (нижнее подчеркивание) 🐍**

✅ **Пример:** `user_profile.py`, `db_connection.js`

🟢 **Когда использовать:**

- **🐍 Python** – стандарт именования файлов (`database_connection.py`)
- **📂 Конфигурационные файлы** – `server_config.json`, `backup_script.sh`
- **📡 Микросервисы** – используются в некоторых API (`user_profile_service.js`)

🔴 **Когда НЕ использовать:**

- ❌ В JavaScript и TypeScript (не является стандартом)
- ❌ Для именования компонентов Vue/React

---

## **3️⃣ CamelCase (первая буква маленькая, последующие с заглавной) 🐫**

✅ **Пример:** `userProfile.js`, `userService.js`

🟢 **Когда использовать:**

- **📜 JavaScript / TypeScript** – стандарт для переменных и функций (`fetchUserData()`)
- **📡 API-интерфейсы** – `getUserProfile()`, `updateUserInfo()`
- **⚙️ Логика и утилиты** – `apiRequest.js`, `dataFormatter.js`

🔴 **Когда НЕ использовать:**

- ❌ Для файлов компонентов (лучше `kebab-case`)

---

## **4️⃣ PascalCase (первая буква каждого слова заглавная) 🏛️**

✅ **Пример:** `UserProfile.vue`, `UserService.js`

🟢 **Когда использовать:**

- **📦 Классы и компоненты** – `UserProfile.vue`, `AuthService.js`
- **📁 Модели и контроллеры** – `UserModel.js`, `UserController.js`

🔴 **Когда НЕ использовать:**

- ❌ Для утилит и сервисов (там чаще `camelCase`)

---

## **📌 Резюме: Какой стиль где использовать?**

|**Стиль**|**Где использовать?**|**Пример**|
|---|---|---|
|**🔗 kebab-case**|📄 Файлы компонентов, маршруты, API|`user-profile.vue`, `api-request.js`|
|**🐍 snake_case**|🐍 Python, конфиги, скрипты|`db_connection.py`, `server_config.json`|
|**🐫 camelCase**|📜 JavaScript-функции, утилиты|`fetchUserData()`, `apiRequest.js`|
|**🏛️ PascalCase**|📦 Классы, компоненты Vue/React|`UserProfile.vue`, `AuthService.js`|

---

## **📁 Пример структуры проекта Vue.js**

```
src/  
  components/  
    📄 UserProfile.vue     // PascalCase для компонентов  
    📄 UserAvatar.vue  
  services/  
    🛠️ userService.js      // camelCase для сервисов  
  utils/  
    🔧 api-request.js      // kebab-case для утилит  
  views/  
    📄 user-profile.vue    // kebab-case для страниц  
```

Point.case (точечный стиль) практически **не используется** для именования файлов в современных проектах.

---

****❌ Почему точечный стиль (`point.case`) не используется?****

1. **⚠️ Может конфликтовать с расширениями файлов**
    
    - `user.profile.js` может быть воспринят как `profile.js` внутри `user/`
    - `config.file.json` может вызвать путаницу
2. **🚀 Не поддерживается большинством стандартов**
    
    - В JavaScript, TypeScript, Python, PHP и других языках не принято использовать `point.case`
    - Например, `import user.profile.js` не будет работать
3. **💡 Читаемость ухудшается**
    
    - `config.file.name.js` сложнее понимать, чем `configFileName.js`

---

****📌 Где точечный стиль (`point.case`) может встречаться?****

✅ **Форматы файлов и конфигурации:**

- `docker-compose.override.yml`
- `eslint.config.js`

✅ **Названия модулей в некоторых старых проектах:**

- В старых Node.js модулях: `lodash.core.js`
- В конфигурациях системных файлов

🔴 **Где лучше НЕ использовать `point.case`?**

- ❌ В коде JavaScript, Vue.js, React
- ❌ Для компонентов и сервисов

---

****✅ Итог****

📌 **Используйте `kebab-case`, `snake_case`, `camelCase` или `PascalCase` вместо `point.case`** 🚀

---

✅ **Выбирайте правильные названия файлов – это залог чистого кода!** 🚀

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
