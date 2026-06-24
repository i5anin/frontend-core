---
tags:
  - веб-разработка
  - javascript
  - консоль
created: 2026-05-12
date: 2026-05-12
---
# 📥 yt-dlp — скачивание видео и субтитров с YouTube

`yt-dlp` — это форк `youtube-dl`, утилита командной строки для скачивания видео, аудио и субтитров с YouTube и тысячи других сайтов. Активно поддерживается (в отличие от оригинального `youtube-dl`), быстрее, поддерживает больше форматов и сайтов.

> [!info]
> Самый ходовой инструмент для скачивания YouTube-контента из CLI. Работает с обычными видео, Shorts, плейлистами, прямыми эфирами.


---

## 🔧 Установка

Три варианта на выбор:

```powershell
# через winget (встроен в Windows 11) — ✅ проверенный путь
winget install yt-dlp.yt-dlp

# через scoop (если установлен)
scoop install yt-dlp

# через pip (если есть Python)
pip install -U yt-dlp
```

> [!tip]
> Winget тянет вместе с yt-dlp нужные зависимости: **ffmpeg** (`yt-dlp.FFmpeg`) и **Deno** (`DenoLand.Deno`). Отдельно ставить не надо.


> [!important]
> После установки **открой новое окно PowerShell**, чтобы переменная `PATH` подхватилась — иначе ни `yt-dlp`, ни `ffmpeg`, ни `deno` не найдутся.


Проверить, что встало:

```powershell
yt-dlp --version
```

---

## 🎬 Зависимости: ffmpeg и Deno

**ffmpeg**

> [!important]
> Для конвертации субтитров в `.srt`, извлечения аудио (`-x`) и склейки потоков видео+аудио в один файл yt-dlp требует **ffmpeg**. Без него многие команды отвалятся с предупреждением.


Если ставил через winget — уже есть (`yt-dlp.FFmpeg`). Отдельно:

```powershell
winget install Gyan.FFmpeg
```

**Deno (JS runtime)**

> [!warning]
> С 2026 года yt-dlp требует JavaScript-runtime для извлечения форматов с YouTube. По умолчанию используется **Deno**. Если его нет — вылетит warning:
>
> `WARNING: [youtube] No supported JavaScript runtime could be found.`
>
> Видео всё ещё скачается, но некоторые форматы пропадут.


Через winget Deno ставится автоматически как зависимость yt-dlp. Вручную:

```powershell
winget install DenoLand.Deno
```

Можно подсунуть другой runtime через флаг `--js-runtimes`. Подробнее: https://github.com/yt-dlp/yt-dlp/wiki/EJS

---

## 📝 Субтитры

Главный кейс — скачать субтитры без видео.

**Флаги**

| Флаг | Что делает |
|---|---|
| `--list-subs` | показать какие дорожки доступны |
| `--write-subs` | скачать ручные субтитры (от автора) |
| `--write-auto-subs` | скачать авто-сгенерированные (YouTube ASR) |
| `--sub-langs "ru,en"` | какие языки нужны |
| `--sub-langs "ru-orig"` | **оригинальный язык говорящего** (без перевода YouTube) |
| `--convert-subs srt` | конвертнуть из `.vtt` в `.srt` (нужен ffmpeg) |
| `--skip-download` | не качать само видео — только субтитры |
| `--sleep-subtitles 2` | пауза между запросами субов (спасает от 429) |

> [!tip]
> Дорожка `<lang>-orig` (например `ru-orig`) — это **оригинальные субтитры на языке говорящего**, до автоматического перевода. Обычное `ru` на иностранном ролике — это машинный перевод YouTube. На русскоязычном ролике `ru` и `ru-orig` часто отличаются мелкими словами (`ru-orig` = распознавание речи, `ru` = "очищенная" версия).


**Примеры**

```powershell
# посмотреть какие субы доступны
yt-dlp --list-subs "https://www.youtube.com/watch?v=..."

# ручные субы (от автора)
yt-dlp --write-subs --skip-download "URL"

# авто-сгенерированные (для Shorts обычно только они)
yt-dlp --write-auto-subs --skip-download "URL"

# выбрать языки
yt-dlp --write-auto-subs --sub-langs "ru,en" --skip-download "URL"

# сразу в .srt
yt-dlp --write-auto-subs --sub-langs ru --convert-subs srt --skip-download "URL"

# забрать и оригинал, и переводной русский одной командой
yt-dlp --write-auto-subs --sub-langs "ru-orig,ru" --skip-download "URL"
```

> [!tip]
> Для **YouTube Shorts** ручные субтитры авторы почти не делают — сразу используй `--write-auto-subs`.


> [!warning]
> Если просить много языков сразу (`--sub-langs "ru,en,fr,de,..."`) — YouTube может ответить **HTTP 429 Too Many Requests** на середине списка. Решение: добавить `--sleep-subtitles 2` (пауза 2 сек между языками) или качать языки отдельными вызовами.


**Чистый текст из .srt / .vtt (без таймкодов и повторов)**

yt-dlp сам в plain text не конвертит — даёт `.vtt` или `.srt`, оба с таймкодами.

> [!warning]
> YouTube авто-субтитры используют **rolling-формат**: каждая фраза дублируется в 2–3 подряд идущих блоках с разными таймкодами (чтобы текст дольше висел на экране). Простая регулярка по таймкодам оставит все эти повторы — нужно ещё дедуплицировать соседние строки.


Однострочник для PowerShell — фильтрует таймкоды и схлопывает повторы:

```powershell
$prev = ""
Get-Content ".\*.ru-orig.srt" |
  Where-Object { $_ -notmatch '^\d+$|^\d{2}:\d{2}:\d{2},\d+|^\s*$' } |
  ForEach-Object { if ($_ -ne $prev) { $_; $prev = $_ } } |
  Set-Content "transcript.txt"
```

Для `.vtt` (с word-timing `<00:00:00.500><c>слово</c>`) сначала уберём inline-теги:

```powershell
$prev = ""
(Get-Content ".\*.ru-orig.vtt" -Raw) -replace '<[^>]+>', '' -split "`r?`n" |
  Where-Object { $_ -notmatch '^WEBVTT|^Kind:|^Language:|^\d{2}:\d{2}:\d{2}\.\d+|^\s*$|align:start' } |
  ForEach-Object { if ($_ -ne $prev) { $_; $prev = $_ } } |
  Set-Content "transcript.txt"
```

Альтернатива — Python-либа `webvtt-py` (`pip install webvtt-py`) или сразу `youtube-transcript-api`, который отдаёт чистый текст без скачивания файла.

---

## ⬇ Скачивание видео и аудио

```powershell
# видео в лучшем доступном качестве
yt-dlp "URL"

# только аудио в mp3 (нужен ffmpeg)
yt-dlp -x --audio-format mp3 "URL"

# посмотреть список доступных форматов
yt-dlp --list-formats "URL"

# выбрать конкретный формат по ID
yt-dlp -f 137+140 "URL"

# 1080p mp4 (короткий синтаксис)
yt-dlp -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[height<=1080]" "URL"
```

---

## 🛠 Полезные флаги

| Флаг | Назначение |
|---|---|
| `-o "%(title)s.%(ext)s"` | шаблон имени файла |
| `--restrict-filenames` | убрать из имени файла спецсимволы (безопасно для Windows) |
| `--playlist-items 1-5` | скачать только N-ные ролики из плейлиста |
| `--cookies-from-browser firefox` | взять куки из браузера (для возрастных/приватных видео) |
| `--proxy "socks5://127.0.0.1:1080"` | через прокси (актуально при блокировках) |
| `-P "E:\downloads"` | папка вывода |
| `--embed-subs` | вшить субтитры в файл видео |
| `--embed-thumbnail` | вшить превью |

---

## ⚠ Когда субтитров вообще нет

> [!warning]
> Если у видео нет ни ручных, ни авто-субтитров (например, фоновая музыка без речи, или очень старый ролик) — yt-dlp ничего не даст. Тогда — связка с **whisper**.


```powershell
# 1. вытащить аудио
yt-dlp -x --audio-format mp3 -o "audio.%(ext)s" "URL"

# 2. распознать локально через whisper.cpp / faster-whisper
whisper audio.mp3 --language ru --model medium --output_format srt
```

`faster-whisper` или `whisper.cpp` работают быстрее официального `openai-whisper` на CPU. На GPU (NVIDIA) — flat-out быстро даже с моделью `large-v3`.

---

## 🌐 Прокси / блокировки

YouTube периодически блокирует IP-диапазоны (особенно с РФ). Если yt-dlp падает с `HTTP Error 403` или `Sign in to confirm you're not a bot`:

- проверь, не нужен ли `--cookies-from-browser`
- попробуй с прокси через `[VPN клиент NekoRay](./VPN клиент NekoRay)` (SOCKS5 порт обычно `2080`):

```powershell
yt-dlp --proxy "socks5://127.0.0.1:2080" "URL"
```

---

## 🔗 Ссылки

- Репозиторий: https://github.com/yt-dlp/yt-dlp
- Полный список флагов: `yt-dlp --help` или [README на GitHub](https://github.com/yt-dlp/yt-dlp#usage-and-options)
- Список поддерживаемых сайтов: https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md


---

## Связанные

- [[Tools_and_Utilities]]
- [[ABBYY FineReader PDF]]
- [[ESLint Quasar]]
- [[nexe]]
- [[npm i предупреждения]]
- [[npm и команды]]
