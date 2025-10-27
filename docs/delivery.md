## Доставка

### Среда и стратегии релизов

* **Окружения:** `dev` → `stage` → `prod`. Каждое окружение имеет свой набор переменных (`.env.*`) и секретов (CI/CD vault).
* **Стратегии:**

    * **Blue–Green** — два прод-окружения, переключение трафика через LB/CDN.
    * **Canary** — постепенное раскатывание (1% → 10% → 50% → 100%) с метриками отката.
    * **Rolling** — поинстансная замена без простоя.
* **Версионирование:** SemVer + `CHANGELOG.md`. Автоматизация через **semantic-release**.
* **Артефакты:** билд в `dist/`, sourcemaps загружаются в систему мониторинга (Sentry).

### Переменные окружения

```
VITE_API_URL=
VITE_SENTRY_DSN=
VITE_RELEASE_VERSION=
VITE_FEATURE_FLAGS=
```

* Никогда не хранить секреты в репозитории. Для приватных ключей используем секреты CI + KMS (например, Vault/Secrets Manager).
* Конфиги для статики подменяются на этапе деплоя (runtime env-injection) через `window.__APP_CONFIG__` или замену плейсхолдеров.

### GitHub Actions (SSR/SSG/SPA)

```yaml
name: deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'pnpm' }
      - run: pnpm i --frozen-lockfile
      - run: pnpm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with: { name: web-dist, path: dist }
      - name: Invalidate CDN
        run: |
          # пример: cloudflare cache purge
          curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache" \
            -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
            --data '{"purge_everything":true}'
      - name: Deploy to static hosting
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### GitLab CI/CD

```yaml
stages: [install, test, build, deploy]

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths: [node_modules/.pnpm-store]

variables:
  NODE_ENV: production

install:
  stage: install
  image: node:22-alpine
  script:
    - corepack enable
    - pnpm i --frozen-lockfile
  artifacts:
    paths: [node_modules]
    expire_in: 1h

test:
  stage: test
  image: node:22-alpine
  script:
    - pnpm run lint && pnpm run test:ci

build:
  stage: build
  image: node:22-alpine
  dependencies: [install]
  script:
    - pnpm run build
  artifacts:
    paths: [dist]
    expire_in: 1 week

deploy_prod:
  stage: deploy
  image: alpine:3
  environment:
    name: production
    url: https://example.com
  script:
    - apk add --no-cache rsync openssh
    - rsync -az --delete dist/ user@server:/var/www/app/
    - curl -X POST "$CF_PURGE_URL" -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" --data '{"purge_everything":true}'
  only:
    - main
```

### Docker + NGINX

**Dockerfile**

```dockerfile
# build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

# serve
FROM nginx:1.27-alpine
COPY .infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
ENV VERSION=${VERSION}
```

**nginx.conf**

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;

  add_header Content-Security-Policy "default-src 'self'; img-src * data: blob:; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'" always;
  add_header X-Content-Type-Options nosniff always;
  add_header Referrer-Policy no-referrer-when-downgrade always;
  add_header Permissions-Policy "geolocation=(), microphone=()" always;

  location / {
    try_files $uri $uri/ /index.html;
    expires 1h;
    etag on;
  }

  location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  error_page 404 /index.html;
}
```

### Kubernetes (Helm) — статическая выдача

`values.yaml` (фрагмент):

```yaml
image:
  repository: registry.example.com/web
  tag: "1.2.3"
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix
  annotations:
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/from-to-www-redirect: "true"
resources:
  limits: { cpu: "200m", memory: "256Mi" }
  requests: { cpu: "50m", memory: "64Mi" }
```

### Vercel/Netlify/Cloudflare Pages

* Vercel: Framework — Vite/Nuxt, Build Command: `pnpm run build`, Output: `dist/`.
* Netlify: `netlify.toml`

  ```toml
  [build]
    command = "pnpm run build"
    publish = "dist"
  [[headers]]
    for = "/*"
    [headers.values]
      Content-Security-Policy = "default-src 'self'"
  ```
* Cloudflare Pages: связываем репозиторий, `Build command: pnpm run build`, `Build output: dist`.

### Sourcemaps и Sentry релизы

```bash
SENTRY_AUTH_TOKEN=... SENTRY_ORG=... SENTRY_PROJECT=web \
pnpm exec sentry-cli releases new "$VITE_RELEASE_VERSION" && \
pnpm exec sentry-cli releases files "$VITE_RELEASE_VERSION" upload-sourcemaps ./dist --url-prefix "~/" --rewrite && \
pnpm exec sentry-cli releases finalize "$VITE_RELEASE_VERSION"
```

* Sourcemaps в проде — загружаем в Sentry, не раздаем публично.
* Версию прокидываем из CI: `VITE_RELEASE_VERSION=$CI_COMMIT_TAG`.

### Инвалидация кеша и cache-busting

* Имена файлов с хешем (`vite` генерирует `assets/*.hash.js`).
* CDN purge по тегам/префиксам.
* Stale-while-revalidate для HTML, immutable для статики.

### Feature Flags

* Включение фич через `VITE_FEATURE_FLAGS` или удаленный конфиг.
* Переключение канареек по cookie/заголовку `X-Canary` через CDN Rules.

### Контроль качества перед релизом

* **Performance budget**: LCP ≤ 2.5s, TBT ≤ 200ms, JS ≤ 200KB gz.
* **Автотесты**: unit (Vitest), e2e (Playwright/Cypress), визуальные (Chromatic/Applitools).
* **Lint/Typecheck**: `pnpm run lint && pnpm run typecheck`.
* **Bundle audit**: `pnpm run build && vite-bundle-visualizer`.

### Безопасность доставки

* TLS 1.3, HSTS, строгие CSP, SRI для внешних скриптов.
* Подпись артефактов (provenance, SLSA), проверка зависимостей (SCA).
* Secret scanning в CI, доступ к секретам по принципу наименьших привилегий.
* WAF/CDN для смягчения DDoS и блокировки известных сигнатур атак.

### Откат

* Хранить N последних артефактов.
* Rollback — переключение трафика на предыдущую версию (blue/green) или `helm rollback`.
* Инциденты фиксируются в трекере, релиз помечается `reverted`.

### Чек-лист релиза

1. Тесты и линтинг пройдены.
2. Обновлен `CHANGELOG.md` и версия.
3. Sourcemaps загружены в Sentry.
4. Проставлен `VERSION`/`VITE_RELEASE_VERSION`.
5. CDN кеш инвалидации выполнен.
6. Мониторинг и алерты включены (5xx, LCP, JS errors).
7. Канареечный трафик проверен, раскатку довести до 100%.

