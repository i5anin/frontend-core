## Аутентификация / авторизация

### Основные понятия

**Аутентификация (authentication)** — подтверждение личности пользователя: *кто ты?*
**Авторизация (authorization)** — проверка прав доступа: *что тебе разрешено делать?*
В веб-приложениях эти процессы связаны, но решают разные задачи.

---

## Виды аутентификации

### 1. По логину и паролю

Классическая форма: пользователь вводит данные, сервер сверяет хеш пароля.

* Пароли хранятся только в виде **bcrypt/scrypt/Argon2** хеша.
* Передача только по **HTTPS**.
* После успешной аутентификации выдаётся **сессия** или **токен**.

### 2. Token-based (JWT)

При входе сервер выдаёт **JSON Web Token**, который клиент хранит (обычно в `httpOnly` cookie или `Authorization: Bearer`).
JWT состоит из:

```
Header.Payload.Signature
```

Пример:

```json
{
  "sub": "user_123",
  "role": "admin",
  "exp": 1735689600
}
```

Сервер проверяет подпись (`HMAC` или `RSA`), не обращаясь к БД.

Плюсы: масштабируется, stateless, легко использовать на API.
Минусы: требуется управление сроком жизни, отзыв токенов и ротация.

### 3. OAuth 2.1 / OpenID Connect

Используется для входа через внешние сервисы (Google, GitHub, Apple).

* **OAuth** управляет доступом к ресурсам.
* **OpenID Connect (OIDC)** добавляет слой идентификации пользователя.
* После успешной авторизации клиент получает **access token** и **id token**.

Потоки:

* **Authorization Code + PKCE** — безопасный стандарт для SPA и мобильных приложений.
* **Client Credentials** — для сервис-сервис взаимодействия.

### 4. SSO (Single Sign-On)

Один вход для нескольких систем, часто через **SAML** или **OIDC**.
Используется в корпоративных и облачных решениях (Okta, Keycloak, Azure AD).

---

## Авторизация

### Уровни авторизации

1. **RBAC (Role-Based Access Control)** — доступ на основе ролей.

   ```json
   { "role": "admin", "permissions": ["users:read", "users:write"] }
   ```
2. **ABAC (Attribute-Based Access Control)** — доступ по атрибутам (роль, время, IP, организация).
3. **PBAC (Policy-Based)** — политика выражается декларативно (например, в JSON или через Open Policy Agent).
4. **ACL (Access Control List)** — списки разрешений на конкретные ресурсы.

---

## Сессионная аутентификация

### Механизм

* Сервер сохраняет сессию в хранилище (`Redis`, `DB`).
* Клиент получает **session id** в cookie:

  ```http
  Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Lax
  ```
* Сервер проверяет сессию на каждом запросе.

Плюсы: легко завершить сессию, привычно для браузеров.
Минусы: требует состояния на сервере, масштабирование через shared storage.

---

## Cookie и безопасность

* `HttpOnly` — JS не имеет доступа (защита от XSS).
* `Secure` — только через HTTPS.
* `SameSite=Lax/Strict` — ограничивает CSRF.
* При logout — очистка cookie + инвалидирование сессии.

---

## Refresh Token Flow

Чтобы не держать access-токен долго живым:

1. Короткий `access_token` (5–15 мин).
2. Долгоживущий `refresh_token` (до 30 дней).
3. При истечении access — клиент запрашивает новый токен по refresh.
4. Refresh хранится в защищённом месте, может быть отозван сервером.

```ts
POST /auth/refresh
Authorization: Bearer <refresh_token>
→ { "access_token": "...", "expires_in": 900 }
```

---

## Безопасность клиента

* Никогда не хранить токены в `localStorage` (уязвим для XSS).
* Лучше использовать **httpOnly cookie**.
* При logout — сбросить refresh и access токены.
* Проверять CSRF-токен для POST/PUT/DELETE запросов.

---

## API-защита

* Все запросы должны проходить через **middleware авторизации**.
* Проверка:

  ```ts
  const token = req.headers.authorization?.split(' ')[1]
  const payload = verify(token, JWT_SECRET)
  ```
* При отказе: `401 Unauthorized` или `403 Forbidden`.
* Для REST — Bearer Token; для GraphQL — context с auth-полем; для gRPC — metadata.

---

## Безопасность с точки зрения инфраструктуры

* **TLS 1.3** и HSTS обязательны.
* Секреты (JWT keys, client_secret) — только через **Vault / Secrets Manager**.
* Логи не должны содержать токены и пароли.
* Rate limiting и защита от brute force.
* Двухфакторная аутентификация (2FA): TOTP, FIDO2, WebAuthn.

---

## OpenID Connect Flow (пример)

1. Пользователь → фронт → `/authorize?client_id=app&redirect_uri=...`.
2. Identity Provider показывает экран входа.
3. После входа → `redirect_uri?code=xyz`.
4. Клиент отправляет `code` на `/token` и получает `access_token + id_token`.
5. Фронт сохраняет id_token (JWT) и использует его для API-запросов.

---

## Авторизация в frontend (Vue 3)

### Pinia + Router Guard

```ts
import { useAuthStore } from '@/stores/auth'
import { router } from '@/router'

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

### Пример стора

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', user: null }),
  getters: { isLoggedIn: (s) => !!s.token },
  actions: {
    async login(email: string, password: string) {
      const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      const data = await res.json()
      this.token = data.access_token
      this.user = data.user
    },
    logout() {
      this.token = ''
      this.user = null
    },
  },
})
```

---

## Современные подходы

* **WebAuthn / Passkeys** — вход без пароля через криптографические ключи.
* **OIDC + PKCE** — стандарт безопасного входа в SPA.
* **Fine-grained access control** через Open Policy Agent (OPA) или Casbin.
* **Zero Trust** — каждый запрос требует проверки, даже внутри сети.
* **Short-lived tokens** и **rotating refresh tokens**.

---

## Чек-лист безопасной аутентификации

1. Все пароли — через bcrypt/scrypt/Argon2.
2. Только HTTPS и `Secure + HttpOnly` cookie.
3. JWT имеет срок жизни и проверяется подпись.
4. Refresh-токен ротуемый и может быть отозван.
5. CSRF-защита включена.
6. Логирование не хранит токены.
7. MFA доступен и рекомендуем.
8. Секреты не в коде — только в хранилищах.
9. Защита от brute-force: ограничение запросов и captcha.
10. Все токены подписаны и проверяются на каждом запросе.

---

Современная архитектура аутентификации — это сочетание **безопасных токенов**, **коротких сессий**, **контрольных политик** и **централизованного управления доступом**.
Главный принцип: *никогда не доверяй по умолчанию, проверяй каждое взаимодействие.*
