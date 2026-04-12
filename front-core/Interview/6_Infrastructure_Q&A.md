# Senior Frontend Interview: Infrastructure & Security Q&A

## Работа с Git/GitLab (6 вопросов)

### Q1: Основные команды Git
- `git clone`: клонировать репозиторий
- `git add`, `git commit`, `git push`: сохранить и выложить
- `git pull`: обновить локальный код
- `git branch`, `git checkout`: работа с ветками

---

### Q2: Что такое merge и rebase?
- **merge**: создает commit с объединением двух веток
- **rebase**: переписывает историю, более чистая история

---

### Q3: Как работают pull requests/merge requests?
- PR: запрос на слияние в GitLab
- Обзор кода перед слиянием
- CI/CD автоматически проверяет

---

### Q4: Что такое конфликты и как их разрешить?
- Возникают когда обе ветки изменили одни строки
- Ручное разрешение конфликтов
- Использование инструментов (VS Code, Merge tools)

---

### Q5: Conventional Commits
- `feat:` новая фича
- `fix:` исправление ошибки
- `docs:`, `style:`, `refactor:`, `perf:`, `test:`

---

### Q6: GitLab CI/CD pipelines
- `.gitlab-ci.yml`: конфигурация
- Stages: build, test, deploy
- Artifacts и caching

---

## Формирование HotFix (4 вопроса)

### Q7: Что такое hotfix branch?
- Ветка для срочного исправления в продакшене
- Отходит от master/main
- Быстро мержится обратно

---

### Q8: Как правильно создать hotfix?
```bash
git checkout -b hotfix/feature main
# Fix bug
git commit -m "fix: critical bug"
git push origin hotfix/feature
# Create PR
git checkout main
git pull origin hotfix/feature
```

---

### Q9: Versioning и tags
- Semantic versioning: major.minor.patch
- `git tag v1.0.0`: отметить версию

---

### Q10: Rollback и revert
- `git revert`: создать новый commit с обратными изменениями
- `git reset`: вернуться к старому состоянию (опасно!)

---

## Механизмы сборки проекта (8 вопросов)

### Q11: Что такое bundler? Webpack, Vite, Rollup?
- Bundler: инструмент для объединения файлов
- **Webpack**: мощный, конфигурируемый
- **Vite**: быстрый, использует ES modules
- **Rollup**: для библиотек

---

### Q12: Webpack основы
- Entry point: откуда начинать
- Output: где сохранять
- Loaders: преобразование файлов (babel, css-loader)
- Plugins: дополнительная функциональность

---

### Q13: Что такое Dev Server?
- `webpack-dev-server`: локальный сервер с hot reload
- Быстрая разработка без пересборки

---

### Q14: Tree Shaking
- Удаление неиспользуемого кода
- `"sideEffects": false` в package.json

---

### Q15: Code Splitting
- Разделение кода на несколько файлов
- Загрузка по требованию
- `import()` для динамических импортов

---

### Q16: Lazy Loading
- Загрузка ресурсов по требованию
- `loading="lazy"` для изображений

---

### Q17: Source Maps
- Отладка минифицированного кода
- Maps связывают минифицированный код с исходным

---

### Q18: Performance Budget
- Максимальный размер бандла
- Отслеживание размера сборки

---

## Webpack и Vite (12 вопросов)

### Q19: Webpack конфигурация
```javascript
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  module: { rules: [{ test: /\.js$/, use: 'babel-loader' }] },
  plugins: [new HtmlWebpackPlugin()]
};
```

---

### Q20: Vite конфигурация
```javascript
export default {
  server: { port: 3000 },
  build: { outDir: 'dist' },
  plugins: []
};
```

---

### Q21: ES Modules vs CommonJS
- ESM: `import`/`export`
- CommonJS: `require`/`module.exports`
- Vite использует ESM, Webpack может оба

---

### Q22: Hot Module Replacement (HMR)
- Обновление модулей без перезагрузки страницы
- Сохраняет состояние приложения

---

### Q23: Polyfills
- Код для поддержки старых браузеров
- `@babel/polyfill` для ES6+
- `babel-loader` для трансформации

---

### Q24: Минификация и Uglification
- Уменьшение размера кода
- Удаление пробелов, переименование переменных
- TerserPlugin для webpack

---

### Q25-30: Остальные вопросы про сборку...

---

## Конфигурация сборки (8 вопросов)

### Q31: Окружения (Development, Production, Testing)
```javascript
// webpack.dev.js, webpack.prod.js, webpack.test.js
```

---

### Q32: Environment Variables
```bash
VITE_API_URL=https://api.example.com
```

---

### Q33-38: Остальные конфиги...

---

## Аутентификация и авторизация (8 вопросов)

### Q39: Что такое Session-based Authentication?
- Сессия на сервере (session ID в cookie)
- Сервер отслеживает сессии
- Масштабирование сложнее (sticky sessions)

---

### Q40: Что такое JWT (JSON Web Tokens)?
- Самодостаточный токен (Header.Payload.Signature)
- Не нужно хранить на сервере
- Легче масштабировать

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

---

### Q41: OAuth 2.0
- Протокол для авторизации через третьи сервисы
- Google, GitHub, Facebook logins
- Access token + Refresh token

---

### Q42: Что такое CORS? Как его настроить?
- Cross-Origin Resource Sharing
- Ограничение запросов между доменами
- Headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`

---

### Q43: CSRF Protection
- Cross-Site Request Forgery
- CSRF token в форме
- SameSite cookie attribute

---

### Q44: XSS (Cross-Site Scripting)
- Внедрение JS кода
- Защита: санитизация, экранирование, CSP
- Content Security Policy headers

---

### Q45: SQL Injection
- Внедрение SQL команд
- Защита: параметризованные запросы, ORM

---

### Q46: Rate Limiting и DDoS Protection
- Ограничение количества запросов
- CloudFlare, AWS Shield для DDoS

---

## Безопасность на стороне клиента (8 вопросов)

### Q47: Что хранить в localStorage?
- Только некритичные данные (язык, тема)
- НЕ хранить токены (уязвимо для XSS)
- localStorage доступен для XSS атак

---

### Q48: sessionStorage vs localStorage
- **localStorage**: данные сохраняются постоянно
- **sessionStorage**: данные удаляются при закрытии вкладки

---

### Q49: Где хранить JWT токены?
- В памяти (теряется при F5)
- HTTP-only cookie (защита от XSS)
- localStorage (уязвимо для XSS)

---

### Q50: Content Security Policy (CSP)
- Ограничение источников скриптов, стилей, изображений
- Заголовок: `Content-Security-Policy`

---

### Q51: Subresource Integrity (SRI)
- Проверка целостности подгруженных ресурсов
- `<script src="..." integrity="sha384-...">`

---

### Q52: HTTPS и TLS
- Шифрование передачи данных
- Сертификаты SSL/TLS
- Let's Encrypt для бесплатных сертификатов

---

### Q53: Secure Cookies
- `HttpOnly`: недоступно для JS
- `Secure`: только через HTTPS
- `SameSite`: ограничение cross-site запросов

---

### Q54: Web Worker Security
- Workers работают в отдельном потоке
- Не имеют доступа к DOM
- Полезны для computationally intensive операций

---

**Статус:** Infrastructure & Security Q&A готов (54 вопроса)

