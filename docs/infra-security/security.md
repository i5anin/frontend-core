# Безопасность клиента

## XSS — Cross-Site Scripting

```js
// ❌ Уязвимость — вставка HTML без санитизации
element.innerHTML = userInput;

// ✅ Безопасно — текстовый контент
element.textContent = userInput;

// ✅ Санитизация через DOMPurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

**Типы XSS:**
- **Stored XSS** — скрипт сохранён в БД и выполняется у каждого посетителя
- **Reflected XSS** — скрипт в URL параметре, выполняется сразу
- **DOM-based XSS** — скрипт из DOM-источника (location.hash, document.referrer)

**Content Security Policy (CSP):**
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'
```

```html
<!-- Через meta-тег -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

---

## CSRF — Cross-Site Request Forgery

```
Атака:
1. Пользователь залогинен на bank.com (кука сессии)
2. Открывает evil.com → там форма POST /transfer
3. Браузер автоматически отправляет куку bank.com
4. Перевод выполняется от имени пользователя
```

**Защита — CSRF токен:**
```js
// Сервер генерирует токен и кладёт в форму
<input type="hidden" name="_csrf" value="xyz123">

// Каждый POST запрос должен содержать токен
// Токен проверяется на сервере
```

**Защита — SameSite cookie:**
```http
Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly
```

| SameSite | Поведение |
|----------|-----------|
| `Strict` | Кука не отправляется с cross-site запросов |
| `Lax` | Кука не отправляется с POST cross-site |
| `None` | Кука всегда отправляется (требует Secure) |

---

## Безопасное хранение данных

```js
// ❌ Небезопасно — доступно через JS
localStorage.setItem('token', accessToken);

// ✅ Лучше — HttpOnly cookie (недоступна через JS)
// Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict

// Если LocalStorage — только кратковременные данные
// НИКОГДА не хранить пароли, ПДн, секретные ключи
```

**Сравнение хранилищ:**

| Хранилище | XSS | CSRF | Доступность |
|-----------|-----|------|-------------|
| HttpOnly Cookie | Защищено | Уязвимо | Только HTTP |
| LocalStorage | Уязвимо | Защищено | JS + HTTP |
| SessionStorage | Уязвимо | Защищено | JS, только вкладка |
| Memory (переменная) | Защищено | Защищено | Только текущая сессия |

---

## HTTPS и сертификаты

```
HTTP  — данные передаются в открытом виде
HTTPS — данные зашифрованы через TLS/SSL
```

**HSTS (HTTP Strict Transport Security):**
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
Браузер принудительно использует HTTPS для всех запросов к домену.

---

## CORS — Cross-Origin Resource Sharing

```
Origin = protocol + hostname + port
http://site.com:3000 ≠ https://site.com:3000 ≠ http://api.site.com:3000
```

**Preflight запрос (OPTIONS):**
```
Browser → OPTIONS /api/data → Server
         ← Access-Control-Allow-Origin: https://site.com
Browser → GET /api/data → Server
```

```js
// Сервер (Node.js / Express)
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Заголовки CORS:**
```http
Access-Control-Allow-Origin: https://site.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

---

## Аутентификация и JWT

```js
// JWT структура: header.payload.signature
// Декодируется Base64 — НЕ зашифрован, только подписан!

const payload = {
  sub: 'user123',
  role: 'admin',
  exp: Math.floor(Date.now() / 1000) + 3600 // 1 час
};
```

**Access + Refresh токены:**
```
Access Token:  короткий срок (15 мин), для API запросов
Refresh Token: долгий срок (30 дней), для обновления access
```

```js
// Хранение токенов
// Access Token → memory (переменная) или sessionStorage
// Refresh Token → HttpOnly cookie (защита от XSS)

// Обновление токена
async function refreshAccessToken() {
  const response = await fetch('/auth/refresh', {
    method: 'POST',
    credentials: 'include' // отправляет HttpOnly cookie
  });
  const { accessToken } = await response.json();
  return accessToken;
}
```

---

## Валидация и санитизация

```js
// ❌ SQL Injection
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Параметризованные запросы
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// Валидация на клиенте (UX) + на сервере (безопасность)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**Принцип наименьших привилегий:**
- API возвращает только необходимые поля
- Роли и разрешения проверяются на сервере
- Никогда не доверяй данным от клиента

---

## Subresource Integrity (SRI)

```html
<!-- Проверка целостности внешних ресурсов -->
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

Если файл изменён (CDN взломан) — браузер заблокирует загрузку.

---

## Заголовки безопасности

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

| Заголовок | Защищает от |
|-----------|-------------|
| `X-Frame-Options: DENY` | Clickjacking (встраивания в iframe) |
| `X-Content-Type-Options: nosniff` | MIME type sniffing |
| `Referrer-Policy` | Утечки URL в заголовке Referrer |
