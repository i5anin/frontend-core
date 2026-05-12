# claude-mem: troubleshooting и обходные пути

Дополнение к [claude-mem-windows-install.md](./claude-mem-windows-install.md). Фокус на проблемах, возникающих после успешной установки: Generator падает, наблюдения не компрессируются, видна красная Console на `:37777`.

---

## Архитектура: как memory-agent зовёт LLM

Поток компрессии наблюдения:

```
PostToolUse-хук (bash)
  → worker-service.cjs hook claude-code observation
    → ENQUEUE в очередь воркера
      → memory-agent
        → spawn process: claude --bare -p "<prompt>"
          → stdout читается как XML-ответ
            → PARSE → запись в SQLite + Chroma
```

Ключевые точки отказа:

1. `claude` отсутствует в PATH → `Generator failed: Claude executable not found`.
2. `claude --bare -p` запускается, но возвращает `Not logged in` → `SDK returned non-XML/empty response`.
3. Память Generator-а накапливает `consecutiveFailures` → `CRITICAL: Restart guard tripped` → сессия мертва.

`CRITICAL: Restart guard tripped` останавливает попытки в текущей session-N. Новые наблюдения этой сессии не пишутся. Лечится открытием новой сессии Claude Code (создаст session-N+1) либо `Stop-Process` на воркер с последующим спавном из `SessionStart`-хука.

---

## Различие версий Claude Code

В системе одновременно могут существовать **независимые** инсталляции Claude Code с **раздельными credentials**:

| Источник | Путь | Назначение | Логин |
|---|---|---|---|
| Microsoft Store | `C:\Program Files\WindowsApps\Claude_...\app\Claude.exe` | GUI-приложение для работы пользователя | OAuth, хранится в Windows Credential Manager |
| npm `@anthropic-ai/claude-code` | `C:\Users\<USER>\AppData\Roaming\npm\claude.cmd` | CLI с поддержкой `-p`/`--bare` | Отдельный OAuth, **не наследуется** от Store-версии |
| Auto-updater | `C:\Users\<USER>\AppData\Roaming\Claude\claude-code\<ver>\claude.exe` | Внутренний бинарник Store-версии | Использует токен Store-версии |

claude-mem полагается на **npm-CLI**, потому что только он принимает `--bare -p "<prompt>"` и возвращает ответ в stdout. Логин в Store-версии для memory-agent бесполезен.

---

## Сценарий: `Not logged in` после установки CLI

### Симптомы

В Console на `:37777` после установки npm-CLI:

```
[SDK]    [session-N] ← Response received (33 chars) ... Not logged in · Please run /login
[PARSER] [session-N] SDK returned non-XML/empty response — ignoring queued batch
```

`PROMPT`-карточки записываются (хуки работают), но обработанные `learned/completed/investigated` не появляются.

### Диагностика

```powershell
where.exe claude
# Должно показать путь в AppData\Roaming\npm\

claude --version
# Возвращает версию, без ошибки

claude --bare -p "ping"
# Если возвращает "Not logged in" — подтверждено
```

Известный баг: anthropics/claude-code [#51047](https://github.com/anthropics/claude-code/issues/51047) — `claude --bare -p` может возвращать `Not logged in` даже после успешного `/login`. Если попал — `claude /login` не поможет, переходи к обходу через альтернативный провайдер.

### Решение 1: `claude /login` (попытка)

```powershell
claude /login
```

Открывает браузер с OAuth-флоу Anthropic. После успешного логина токен записывается в `~/.claude/credentials.json` (или в keychain, в зависимости от версии CLI).

Проверка после логина:

```powershell
claude --bare -p "say ok"
```

Если возвращает `ok` — Generator починен, перезапуск воркера не требуется. Если по-прежнему `Not logged in` — баг #51047, см. Решение 2.

### Решение 2: Альтернативный провайдер (Gemini) — рекомендуемое

Полный обход CLI Claude. Generator делает HTTPS-вызов напрямую к Gemini API через SDK воркера. Никаких локальных бинарников и OAuth.

#### 2.1 Получение API-ключа

1. <https://aistudio.google.com/app/apikey>
2. Create API key → в новом или существующем GCP-проекте.
3. Скопировать ключ (формат `AIzaSy...`).

Free tier `gemini-2.5-flash`: 15 RPM, 1500 RPD, без привязки карты. Достаточно для типичной нагрузки claude-mem.

#### 2.2 Конфигурация

Отредактировать `C:\Users\<USER>\.claude-mem\settings.json`:

```json
{
  "CLAUDE_MEM_RUNTIME": "worker",
  "CLAUDE_MEM_PROVIDER": "gemini",
  "CLAUDE_MEM_GEMINI_API_KEY": "AIzaSy...",
  "CLAUDE_MEM_GEMINI_MODEL": "gemini-2.5-flash"
}
```

Альтернатива — положить ключ в `~/.claude-mem/.env`:

```
CLAUDE_MEM_GEMINI_API_KEY=AIzaSy...
```

#### 2.3 Применение

```powershell
$pid = Get-Content "$env:USERPROFILE\.claude-mem\worker.pid"
Stop-Process -Id $pid -Force
```

Воркер автоматически респавнится при следующем `SessionStart`-хуке (любое действие в Claude Code). Альтернативно — рестарт Claude Code: `Get-Process | Where-Object Name -like "*claude*" | Stop-Process -Force` и запуск из меню Пуск.

#### 2.4 Проверка

```powershell
$h = (Invoke-WebRequest "http://localhost:37777/api/health" -UseBasicParsing).Content | ConvertFrom-Json
$h.ai.provider          # ожидается: gemini
$h.ai.authMethod        # ожидается: API key
```

После следующего действия в Claude Code в Console должны исчезнуть ERROR-строки и появиться:

```
[SDK]    ← Response received (~XXX chars) {promptNumber=N}
[PARSER] Parsed N observations from response
[DB]     INSERT observation id=...
```

В UI `:37777` появляются карточки с иконками `learned/completed/investigated/next-steps`.

### Решение 3: Альтернативный провайдер (OpenRouter / LiteLLM)

Для пользователей с готовой gateway-инфраструктурой. Поддерживается:

```json
{
  "CLAUDE_MEM_PROVIDER": "openrouter",
  "CLAUDE_MEM_OPENROUTER_API_KEY": "sk-or-...",
  "CLAUDE_MEM_OPENROUTER_MODEL": "anthropic/claude-3.5-haiku"
}
```

Или generic LiteLLM:

```json
{
  "CLAUDE_MEM_PROVIDER": "litellm",
  "CLAUDE_MEM_LITELLM_BASE_URL": "https://<gateway>/v1",
  "CLAUDE_MEM_LITELLM_API_KEY": "...",
  "CLAUDE_MEM_LITELLM_MODEL": "claude-3-5-haiku-20241022"
}
```

Применение — как в 2.3.

### Решение 4: `CLAUDE_CODE_PATH` (не работает для Store-версии)

Документировано в issue [thedotmack/claude-mem#1062](https://github.com/thedotmack/claude-mem/issues/1062):

```json
{
  "CLAUDE_CODE_PATH": "C:\\Users\\<USER>\\AppData\\Roaming\\npm\\claude.cmd"
}
```

Имеет смысл только если npm-CLI установлен в нестандартное место и не подхватывается через PATH. **На Store-бинарник `Claude.exe` указывать бесполезно** — он не принимает `-p`/`--bare`, по issue [thedotmack/claude-mem#2427](https://github.com/thedotmack/claude-mem/issues/2427) этот путь не работает.

---

## Сценарий: `Generator failed: Claude executable not found`

### Симптомы

```
[SESSION] Generator failed (provider=claude, error=Claude executable not found.
  Please either:
  1. Add "claude" to your system PATH, or
  2. Set CLAUDE_CODE_PATH in ~/.claude-mem/settings.json)
```

### Решение

```powershell
npm install -g @anthropic-ai/claude-code
claude --version
```

CLI ставится в `C:\Users\<USER>\AppData\Roaming\npm\` — этот путь уже в PATH у стандартной Node-инсталляции. Перезапуск Claude Code не требуется, Generator проверяет PATH на каждом запуске.

После этого, как правило, появляется ошибка `Not logged in` — см. предыдущий сценарий.

---

## Сценарий: `Chroma MCP error -32000: Connection closed`

### Симптомы

```
[CHROMA] User prompt sync failed, continuing without vector search
  MCP error -32000: Connection closed
```

### Объяснение

Chroma — векторный индекс для семантического поиска. Поднимается как отдельный MCP-сервер по требованию. Падает, когда:

1. Generator не отрабатывает → Chroma нечего индексировать → MCP-сервер закрывает соединение. **Решается автоматически** после починки Generator.
2. uv не установлен или не в PATH → Chroma-сервер не стартует. Проверить: `uv --version`. Установить: `winget install astral-sh.uv` и перезапустить терминал и Claude Code.
3. Корруптированный Chroma-индекс в `~/.claude-mem/corpora/`. Лечится удалением `corpora/` (claude-mem пересоберёт индекс из SQLite).

Глубокая диагностика:

```powershell
Invoke-WebRequest "http://localhost:37777/api/chroma/status?deep=1" -UseBasicParsing
```

Логи MCP-сервера Chroma:

```powershell
Get-ChildItem "$env:USERPROFILE\.claude-mem\logs\" | Select-String "CHROMA_SYNC"
```

---

## Сценарий: `CRITICAL: Restart guard tripped`

### Симптомы

```
[SESSION] [session-N] CRITICAL: Restart guard tripped — session is dead,
  clearing pending and terminating
  {pendingCount=2, restartsInWindow=6, windowMs=60000, maxRestarts=10,
   consecutiveFailures=6, maxConsecutiveFailures=5}
```

### Объяснение

Защита от циклического перезапуска. Memory-agent делает 5 последовательных неудачных попыток сжать наблюдение → плагин помечает сессию как «dead», очищает очередь и не предпринимает новых попыток до начала новой сессии Claude Code.

### Решение

1. Устранить корневую причину (отсутствие CLI / Not logged in / Chroma).
2. Открыть новую сессию Claude Code: рестарт приложения. Создаст `session-N+1` с пустым счётчиком ошибок.

Если воркер не реагирует — принудительный респавн:

```powershell
$pid = Get-Content "$env:USERPROFILE\.claude-mem\worker.pid"
Stop-Process -Id $pid -Force
# SessionStart-хук поднимет воркер заново
```

---

## Полезные эндпоинты воркера

Все доступны на `http://localhost:37777`:

| Endpoint | Назначение |
|---|---|
| `GET /api/health` | Статус воркера, версия, PID, провайдер AI, метод аутентификации |
| `GET /api/stats` | Размер БД, количество observations/sessions/summaries, uptime |
| `GET /api/version` | Версия плагина |
| `GET /api/settings` | Полный набор `CLAUDE_MEM_*` переменных воркера |
| `GET /api/observations?limit=N&offset=M` | Список наблюдений |
| `GET /api/projects` | Список проектов (по cwd) |
| `GET /api/timeline?query=<text>` | Поиск по timeline (требует query/anchor) |
| `GET /api/search?query=<text>` | Семантический поиск через Chroma |
| `GET /api/chroma/status?deep=1` | Диагностика Chroma-сервера |

---

## Список настроек `CLAUDE_MEM_*`

Получены через `GET /api/settings` на работающем воркере. Все правятся в `~/.claude-mem/settings.json` или через `.env`.

| Переменная | Значение по умолчанию | Описание |
|---|---|---|
| `CLAUDE_MEM_RUNTIME` | `worker` | `worker` (stable) или `server` (beta) |
| `CLAUDE_MEM_PROVIDER` | `claude` | `claude`, `gemini`, `openrouter`, `litellm` |
| `CLAUDE_MEM_MODEL` | `claude-haiku-4-5-20251001` | Модель для компрессии (Claude provider) |
| `CLAUDE_MEM_CLAUDE_AUTH_METHOD` | `subscription` | `subscription` или `api_key` |
| `CLAUDE_MEM_GEMINI_API_KEY` | — | Ключ Google AI Studio |
| `CLAUDE_MEM_GEMINI_MODEL` | `gemini-2.5-flash` | Модель Gemini |
| `CLAUDE_MEM_WORKER_PORT` | `37777` | Порт HTTP-сервера воркера |
| `CLAUDE_MEM_WORKER_HOST` | `127.0.0.1` | Хост биндинга (только loopback) |
| `CLAUDE_MEM_CONTEXT_OBSERVATIONS` | `50` | Сколько наблюдений подмешивать на старте сессии |
| `CLAUDE_MEM_SKIP_TOOLS` | `ListMcpResourcesTool,SlashCommand,Skill,TodoWrite,AskUserQuestion` | Инструменты, для которых не создаются наблюдения |
| `CLAUDE_MEM_WELCOME_HINT_ENABLED` | `true` | Показывать ли подсказку при первой сессии |
| `CLAUDE_CODE_PATH` | — | Явный путь к `claude` бинарнику |

---

## Известные баги (issues)

| Issue | Репо | Статус | Описание |
|---|---|---|---|
| [#51047](https://github.com/anthropics/claude-code/issues/51047) | anthropic/claude-code | open | `claude --bare -p` возвращает `Not logged in` при валидном логине |
| [#44585](https://github.com/anthropics/claude-code/issues/44585) | anthropic/claude-code | open | `/login` отчитывается успехом, но токен не сохраняется на Windows |
| [#1062](https://github.com/thedotmack/claude-mem/issues/1062) | thedotmack/claude-mem | — | PATH-проблемы worker-хуков на Windows + Git Bash |
| [#2427](https://github.com/thedotmack/claude-mem/issues/2427) | thedotmack/claude-mem | open | knowledge-agent игнорирует provider routing, требует Claude login |
| [#2352](https://github.com/thedotmack/claude-mem/issues/2352) | thedotmack/claude-mem | closed | Видимое окно консоли при daemon lazy-spawn на Windows |

---

## Рекомендация

Для Windows-окружения с десктоп-Store-версией Claude Code как первичной средой: **сразу настраивать provider=gemini** на этапе установки. Это исключает три категории проблем (#51047, #44585, #2427) и снимает зависимость от npm-CLI как такового.

Минимальная команда после `npx claude-mem install`:

```powershell
$cfg = "$env:USERPROFILE\.claude-mem\settings.json"
$j = Get-Content $cfg -Raw | ConvertFrom-Json
$j.CLAUDE_MEM_PROVIDER = "gemini"
$j | Add-Member -NotePropertyName CLAUDE_MEM_GEMINI_API_KEY -NotePropertyValue "<key>" -Force
$j | Add-Member -NotePropertyName CLAUDE_MEM_GEMINI_MODEL -NotePropertyValue "gemini-2.5-flash" -Force
$j | ConvertTo-Json | Set-Content $cfg

$pid = Get-Content "$env:USERPROFILE\.claude-mem\worker.pid"
Stop-Process -Id $pid -Force
```
