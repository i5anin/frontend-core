# Работа с GitLab

## Основной рабочий процесс

```bash
# 1. Создать ветку от main
git checkout main
git pull origin main
git checkout -b feature/user-auth

# 2. Работать, коммитить
git add src/auth.js
git commit -m "feat: add JWT authentication"

# 3. Запушить и создать Merge Request
git push origin feature/user-auth
# Затем в GitLab: Create Merge Request

# 4. После code review и CI — смержить
```

## Conventional Commits

```
<type>(<scope>): <description>

feat:     новая фича
fix:      исправление бага
refactor: рефакторинг (без новых фич и багфиксов)
docs:     документация
test:     тесты
chore:    настройка, зависимости
perf:     производительность
style:    форматирование (не логика)
ci:       CI/CD конфигурация

Примеры:
feat(auth): add Google OAuth
fix(cart): prevent duplicate items
feat!: breaking change (! = breaking change)
```

## GitLab CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - install
  - test
  - build
  - deploy

variables:
  NODE_VERSION: '20'

cache:
  paths:
    - node_modules/

install:
  stage: install
  script:
    - npm ci

test:
  stage: test
  script:
    - npm run lint
    - npm run test

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:
  stage: deploy
  script:
    - npm run deploy
  environment:
    name: production
  only:
    - main
```

## Формирование HotFix

```bash
# 1. Отойти от main (не от develop!)
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-crash

# 2. Исправить баг
git add .
git commit -m "fix: prevent crash on empty payment method"

# 3. Запушить, создать MR в main
git push origin hotfix/fix-payment-crash

# 4. После мержа в main — создать тег версии
git checkout main && git pull
git tag -a v1.2.1 -m "Hotfix: payment crash"
git push origin v1.2.1

# 5. Синхронизировать develop с main
git checkout develop
git merge main
git push origin develop
```

## Branching Strategy (Git Flow)

```
main      ──────────────────────────── (продакшн)
            ↑ merge                ↑ hotfix
develop   ─────────────────────── (разработка)
              ↑                ↑
feature/    branch1         branch2
```

## Git команды для ежедневной работы

```bash
# Посмотреть статус
git status
git log --oneline --graph

# Сохранить незаконченную работу
git stash
git stash pop

# Обновить ветку с main
git fetch origin
git rebase origin/main

# Отменить последний коммит (оставить изменения)
git reset --soft HEAD~1

# Посмотреть изменения
git diff
git diff --staged

# Cherry-pick — взять конкретный коммит
git cherry-pick abc1234
```
