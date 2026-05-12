# Установка `claude-mem` в Claude Code на Windows

Инструкция собрана по реальной установке 2026-05-13 на Windows 11 Pro + Claude Code из Microsoft Store + PowerShell 7. Покрывает грабли, на которые легко наступить из РФ (npm-блок, сломанные модули PS, отсутствие CLI Claude Code).

---

## TL;DR

```powershell
# 1. Зависимости
winget install Oven-sh.Bun
winget install astral-sh.uv
# закрыть и снова открыть терминал

bun --version   # проверка
uv --version

# 2. Установщик плагина
npx -y claude-mem@latest install
# Визард: Claude Code → Worker → Claude Agent SDK → Subscription plan → Haiku 4.5

# 3. Перезапустить Claude Code (закрыть-открыть приложение)
```

После рестарта Claude Code хуки активируются, наблюдения начинают копиться. Веб-UI: <http://localhost:37777>.

---

## Что это

[claude-mem](https://github.com/thedotmack/claude-mem) — плагин «постоянной памяти» для Claude Code. Каждый `Read` / `Edit` / `Bash`, который Claude делает в сессии, проходит через lifecycle-хуки, сжимается дешёвой моделью (Haiku 4.5) и кладётся в локальную SQLite. На **второй** сессии в том же проекте релевантные куски памяти автоматически подмешиваются в контекст — не надо переобъяснять кодбазу.

- Данные локальные: `~/.claude-mem/claude-mem.db` (SQLite + FTS5 + Chroma vector).
- Воркер крутится на `http://localhost:37777` с веб-UI.
- Поиск из Claude Code: skill `/mem-search <запрос>` или MCP-tools `search` / `timeline` / `get_observations`.
- Compression-запросы идут через твою залогиненную подписку Claude (отдельный API-ключ не нужен).

---

## Требования

- Windows 10/11
- Node.js 18+ в PATH (`node --version`)
- Свободный порт `37777`
- Залогиненный Claude Code (десктоп или CLI — claude-mem работает с обоими, конфиг общий: `~/.claude/`)
- Подписка Claude (Pro/Max/Team) — для бесплатного memory-agent

---

## Шаг 1. Pre-checks

```powershell
node --version              # >= v18
npm --version
Get-NetTCPConnection -LocalPort 37777 -ErrorAction SilentlyContinue
```

Если порт занят — освободи или потом поменяй в `~/.claude-mem/settings.json`. Если Node нет — поставь LTS с https://nodejs.org и перезапусти терминал.

---

## Шаг 2. Поставить Bun и uv заранее (важно для Windows)

Установщик claude-mem попытается сам подтянуть **Bun** (рантайм воркера) и **uv** (Python-менеджер для векторного поиска), но на Windows эти автоинсталлеры падают, если PowerShell имеет проблемы со стандартными модулями (см. раздел «Грабли»). Поэтому ставим заранее через `winget`:

```powershell
winget install Oven-sh.Bun
winget install astral-sh.uv
```

**Закрой и снова открой терминал**, чтобы PATH обновился. Проверь:

```powershell
bun --version       # 1.x.x
uv --version        # 0.x.x
```

---

## Шаг 3. Запустить установщик

В терминале (рекомендую PowerShell 7):

```powershell
npx -y claude-mem@latest install
```

Установщик задаст вопросы — ниже что выбирать **и почему**.

### 3.1 «Claude Code is not installed. Install Claude Code now?»

Если у тебя уже стоит **Claude Code (Microsoft Store / GUI)** — установщик его не видит, потому что ищет npm-CLI пакет `@anthropic-ai/claude-code`. Выбери **`Yes — install Claude Code (recommended)`**. Скрипт скорее всего упадёт с ошибкой `Get-FileHash` (см. «Грабли») — **это нормально и не блокирующее**: плагин всё равно прописывает хуки в общий конфиг `~/.claude/`, который читает твоя Store-версия.

### 3.2 «Which IDEs do you use?»

Поставь галку (пробелом) на **`Claude Code`** и подтверди.

### 3.3 «Which runtime should claude-mem start after install?»

→ **`Worker (stable compatibility path)`**

`Server (beta)` пока не нужен — Worker гарантированно работает.

### 3.4 «Which memory provider do you want to use?»

→ **`Claude Agent SDK (recommended)`**

### 3.5 «Subscription plan or API key/gateway?»

→ **`Subscription plan (recommended — uses your logged-in Claude SDK account)`**

Это значит memory-agent будет ходить через **твою уже активную подписку** (Claude Pro/Max), без отдельного API-ключа и без оплаты сверху.

> ⚠ Если выбрать «API key» — каждое наблюдение пойдёт через платный API, и при автоматических хуках на каждое касание файла это быстро превратится в копеечку. Для прямого Anthropic API из РФ ещё нужен VPN — registry режется.

### 3.6 «Which Claude model should claude-mem use to compress observations?»

→ **`Haiku 4.5 (recommended)`**

Хук срабатывает на каждое касание файла (сотни вызовов в день). Sonnet/Opus тут — лишний расход.

### 3.7 Что увидишь в конце

```
✓ Plugin files copied OK
✓ Plugin cached (v13.2.0) OK
✓ Marketplace registered OK
✓ Plugin registered OK
✓ Plugin enabled OK
✓ Runtime ready (Bun ..., uv ...) OK
✓ Worker ready at http://localhost:37777 OK
✓ Installation Complete
   Plugin dir:  C:\Users\<USER>\.claude\plugins\marketplaces\thedotmack
   Auto-memory: disabled (CLAUDE_CODE_DISABLE_AUTO_MEMORY=1)
```

---

## Шаг 4. Перезапустить Claude Code

Хуки регистрируются Claude Code **на старте**, поэтому уже открытая сессия их не видит. **Закрой приложение полностью** и открой заново.

После рестарта в новой сессии должны появиться:

- Skill `/mem-search <query>` в автокомплите `/`.
- MCP-tools `search`, `timeline`, `get_observations` (доступны для AI).
- Команда `/learn-codebase` — опционально, прокачать память по всему репо за ~5 минут.
- Команда `/how-it-works` — встроенная справка.

---

## Шаг 5. Проверка работы

```powershell
# Воркер отвечает
Invoke-WebRequest -Uri "http://localhost:37777/" -UseBasicParsing | Select-Object StatusCode

# Плагин включён в Claude Code
Get-Content "$env:USERPROFILE\.claude\settings.json"
# Должно быть: "enabledPlugins": { "claude-mem@thedotmack": true }

# Файлы плагина
ls "$env:USERPROFILE\.claude\plugins\marketplaces\thedotmack"

# БД и состояние
ls "$env:USERPROFILE\.claude-mem"
# Ожидается: claude-mem.db, settings.json, supervisor.json, worker.pid, .env, corpora/, logs/, backups/
```

Открой <http://localhost:37777> в браузере — увидишь панель **claude-mem**. Сначала там пусто («No items to display»). Открой Claude Code в любом проекте, поработай — observations начнут литься в реальном времени.

> ⚠ Память подмешивается **со ВТОРОЙ сессии** в проекте. Первая сессия проекта только сеет данные.

---

## Шаг 6. (опционально) Решить с встроенной auto-memory

Установщик пишет в `~/.claude/settings.json`:

```json
{
  "enabledPlugins": { "claude-mem@thedotmack": true },
  "env": { "CLAUDE_CODE_DISABLE_AUTO_MEMORY": "1" }
}
```

Флаг `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` **отключает встроенную file-based память Claude Code** (та, что в `~/.claude/projects/.../memory/MEMORY.md`). По задумке claude-mem — он хочет быть единственным движком памяти.

Варианты:

| Сценарий | Действие |
|----------|----------|
| **Только claude-mem** | Ничего не трогать. Встроенная отключена, всё идёт через плагин. |
| **Обе системы параллельно** | Удалить блок `"env"` из `~/.claude/settings.json`. Встроенная (курируемые заметки про пользователя) + claude-mem (автолог всех действий) работают одновременно — не конфликтуют. |
| **Только встроенная** | Удалить плагин: `npx claude-mem uninstall`. |

---

## Откат

> Перед удалением закрой **все** окна Claude Code, иначе активные хуки воссоздадут `~/.claude-mem`.

```powershell
npx claude-mem uninstall
```

Плюс вручную, если хочется чисто:

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude-mem"
# в ~/.claude/settings.json убрать "claude-mem@thedotmack": true из enabledPlugins
# и блок "env" если он есть
```

---

## Грабли (специфика Windows / РФ)

### 1. `/plugin` команда отсутствует в Claude Code

> `/plugin isn't available in this environment.`

В Microsoft Store-сборке Claude Code менеджер плагинов выключен. Поэтому ставим через `npx claude-mem install` — он сам прописывает плагин в `enabledPlugins` без `/plugin`.

### 2. npm ECONNRESET при `npx claude-mem install`

> `npm error code ECONNRESET ... aborted`

Российские провайдеры режут npm-тарбол-стримы. HTTP `GET` к registry проходит, а длинная загрузка пакета — нет.

**Варианты обхода:**
- **VPN** — самое надёжное.
- **Зеркало** — для одной команды без правки глобального конфига:
  ```powershell
  npx -y --registry=https://registry.npmmirror.com/ claude-mem@latest install
  ```
- **Tarball вручную** — `https://registry.npmjs.org/claude-mem/latest` → JSON → поле `dist.tarball` → скачать `.tgz` → `npm install -g .\claude-mem-X.Y.Z.tgz`.

### 3. PowerShell: `Get-FileHash` / `Expand-Archive` не распознаются

> `имя 'Get-FileHash' не распознается как командлет...`
> `командлет "Expand-Archive" найден в модуле "Microsoft.PowerShell.Archive", но загрузить модуль не удалось`

У PowerShell сломан `$env:PSModulePath` или модули `Microsoft.PowerShell.Utility` / `Microsoft.PowerShell.Archive` не загружаются. Это бьёт по автоинсталлерам Bun (`irm bun.sh/install.ps1 | iex`) и Claude Code CLI (`irm claude.ai/install.ps1 | iex`).

**Решение** — поставить зависимости через `winget` (он не зависит от модулей PS):
```powershell
winget install Oven-sh.Bun
winget install astral-sh.uv
```

Скрипт `claude.ai/install.ps1` для CLI Claude Code можно **пропустить** — десктоп-версия Claude Code и без CLI работает.

> Глубже фиксить PowerShell можно через `Get-Module -ListAvailable` и проверку `$env:PSModulePath`, но это уже отдельная задача.

### 4. npm cache `EPERM` на cleanup

> `EPERM: operation not permitted, rmdir 'C:\Users\<USER>\AppData\Local\npm-cache\_npx\...'`

Antivirus / Defender держит файлы частично загруженного пакета.

```powershell
# Закрыть все процессы node / bun / claude в Task Manager, затем:
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\npm-cache\_npx" -ErrorAction SilentlyContinue
```

---

## Структура файлов после установки

```
C:\Users\<USER>\.claude\
├── settings.json                              # enabledPlugins, env
├── plugins\
│   └── marketplaces\thedotmack\
│       ├── plugin\
│       │   ├── .claude-plugin\plugin.json     # манифест
│       │   ├── hooks\hooks.json               # SessionStart, PostToolUse, ...
│       │   ├── skills\
│       │   │   ├── mem-search\
│       │   │   └── how-it-works\
│       │   ├── scripts\
│       │   │   ├── worker-service.cjs
│       │   │   ├── bun-runner.js
│       │   │   └── version-check.js
│       │   └── ui\viewer.html                 # веб-UI
│       └── .mcp.json                          # MCP-серверы: search/timeline/...
│
C:\Users\<USER>\.claude-mem\
├── claude-mem.db                              # SQLite (FTS5 + Chroma)
├── settings.json                              # runtime, provider, model
├── supervisor.json                            # PID воркера
├── worker.pid
├── .env                                       # для API key/gateway (пусто на subscription)
├── corpora\                                   # данные по проектам
├── logs\
└── backups\                                   # автобэкапы перед миграциями
```

---

## Хуки claude-mem (для понимания «откуда что»)

| Хук | Когда срабатывает | Что делает |
|-----|-------------------|------------|
| `Setup` | при настройке плагина | `version-check.js` |
| `SessionStart` (startup/clear/compact) | старт сессии Claude Code | запускает воркер + **подмешивает прошлую память в контекст** |
| `UserPromptSubmit` | каждое твоё сообщение | session-init |
| `PreToolUse(Read)` | перед чтением файла | подмешивает файловый контекст |
| `PostToolUse(*)` | **после каждого** Read/Edit/Bash/... | сжимает результат → SQLite (главный хук) |
| `Stop` | завершение ответа AI | финальная суммаризация сессии |

---

## Полезные команды плагина

| Команда | Что делает |
|---------|------------|
| `/mem-search <q>` | поиск в памяти из Claude Code |
| `/learn-codebase` | разовая прокачка всего репо в память (~5 мин) |
| `/how-it-works` | встроенная справка |
| `npx claude-mem install` | переустановка / обновление |
| `npx claude-mem uninstall` | удалить плагин |

---

## Ссылки

- Репозиторий: <https://github.com/thedotmack/claude-mem>
- Web UI: <http://localhost:37777>
- Лицензия: Apache-2.0
