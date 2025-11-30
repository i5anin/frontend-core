### Работа с `GitLab` — уровень senior

**Архитектура репозиториев**

- Проектная структура: mono-repo, multi-repo, submodules, subtrees.
    
- Стратегии ветвления: `GitLab Flow`, `Trunk Based Development`, `Release Flow`.
    
- Политики: protected branches, required approvals, code owners, запрет force-push.
    

**CI/CD**

- Проектирование `.gitlab-ci.yml`: многоступенчатые пайплайны, re-usable jobs, anchors, includes.
    
- Оптимизация: кеши, артефакты, зависимые стадии, параллельные джобы, matrix jobs.
    
- Types: build, lint, test, security scans, deploy, rollback.
    
- Управление окружениями: `review apps`, staging, production.
    
- Автоматизация релизов: tag-pipelines, version bump, changelog генерация.
    

**GitLab Runners**

- Типы раннеров: shell, docker, Kubernetes executor.
    
- Управление пулом раннеров, масштабирование, ограничения по ресурсам.
    
- Секреты и переменные (`masked`, `protected`, `file`).
    

**Security**

- Встроенные инструменты: SAST, DAST, Dependency Scanning, License Compliance.
    
- Обработка security findings, интеграция с MR-политиками.
    
- Signing commits (GPG / SSH), контроль цепочек доверия.
    

**Релизы и сопровождение**

- Формирование `hotfix`: изоляция критической ветки, выпуск patch-релиза, обратное мерджирование в trunk и release.
    
- Управление тэгами (`semver`), линейка релизов, LTS-ветки.
    
- Аварийные пайплайны: быстрые фиксы, bypass политик с аудитом.
    

**Управление доступами**

- Группы, подгруппы, роли (`Developer`, `Maintainer`, `Owner`).
    
- Политики доступа к артефактам, к контейнерному registry, к package registry.
    
- Аудит изменений и действий пользователей.
    

**Интеграции**

- GitLab API: автоматизация MR, создание issue, запуск pipeline.
    
- Webhooks: события для CI, мониторинга, чат-уведомлений.
    
- Container Registry и Package Registry для хранений артефактов.
    
