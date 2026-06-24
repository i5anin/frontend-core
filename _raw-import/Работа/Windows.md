---
tags:
  - веб-разработка
created: 2025-04-13
date: 2025-04-13
---
Sergei, [12.01.2025 3:59]


Sergei, [12.01.2025 3:59]
Power Toys (https://powertoys.io/)

https://powertoys.io/

Sergei, [12.01.2025 3:59]
https://www.youtube.com/watch?v=AXK5Zhx3GZM

Sergei, [12.01.2025 3:59]
https://www.youtube.com/watch?v=9zewiGf7j-A&t=412s

Sergei, [12.01.2025 3:59]
https://www.youtube.com/watch?v=kYYqyjjNtfc

Sergei, [12.01.2025 3:59]
QuickLook

https://apps.microsoft.com/detail/9nv4bs3l1h4s?hl=en-US&gl=US

Sergei, [12.01.2025 3:59]
ModernFlyouts

https://apps.microsoft.com/detail/9mt60qv066rp?hl=en-US&gl=US

Sergei, [12.01.2025 3:59]
Power Toys (https://powertoys.io/)

https://powertoys.io/

Sergei, [12.01.2025 3:59]


Sergei, [21.01.2025 13:44]


Sergei, [31.01.2025 10:34]
winget install Neofetch
neofetch

Sergei, [04.02.2025 11:15]
Как удалить файл hiberfil.sys
Если вы не используете функции гибернации и вам не требуется функция «Быстрый запуск» (которая не всегда приводит к его ускорению), вы можете удалить файл hiberfil.sys, полностью отключив гибернацию в Windows. Для этого достаточно использовать следующие шаги:

Запустите командную строку или Терминал Windows от имени администратора. Сделать это можно в меню по правому клику на кнопке «Пуск» (или по сочетанию клавиш Win+X) и многими другими способами.
Введите команду отключения гибернации в одном из следующих форматов (обычно работают оба, но бывают исключения):
powercfg -h off
powercfg /h off

Sergei, [05.02.2025 12:35]
Ошибка BlueScreen (код 133) связана с проблемами в обработке прерываний и таймингов в системе. Код ошибки DPC_WATCHDOG_VIOLATION (0x133) указывает, что система зафиксировала слишком долгую работу DPC (Deferred Procedure Call), что может быть вызвано следующими причинами:

**Возможные причины**
1. Проблемы с драйверами (особенно чипсета, видеоадаптера, NVMe или сетевого адаптера).
2. Аппаратные неисправности (SSD, RAM, процессор, материнская плата).
3. Конфликты программного обеспечения (антивирусы, разгон, сторонние утилиты).
4. Неправильные настройки BIOS (разгон, нестандартные тайминги).
5. Перегрев (особенно для ноутбуков и слабых систем охлаждения).
6. Ошибки на диске (плохие сектора или сбои контроллера).

**Разбор параметров ошибки**
- Параметр 1: 0 → Триггер события DPC Watchdog.
- Параметр 2: 500 → Лимит времени в миллисекундах, который был превышен.
- Параметр 3: 500 → Фактическое время ожидания (также 500 мс).
- Параметр 4: fffff804bdfc33a0 → Адрес в памяти, связанный с проблемным драйвером.

**Решение проблемы**
**1. Обновить драйверы**
   - Чипсет (AMD или Intel, скачать с официального сайта производителя).
   - Видеоадаптер (NVIDIA, AMD или Intel).
   - Сетевой адаптер (LAN/Wi-Fi, особенно Realtek).
   - Драйвер NVMe (если установлен SSD NVMe).

**2. Проверить SSD и диск**
   - Запустить команду:
     
     chkdsk /f /r
     
   - Проверить SMART-статус диска с помощью CrystalDiskInfo.
   - Если установлен SSD NVMe – обновить его прошивку.

**3. Отключить разгон**
   - Сбросить BIOS до default settings.
   - Отключить XMP-профиль в BIOS.

**4. Проверить ОЗУ**
   - Запустить диагностику памяти Windows:
     
     mdsched.exe
     
   - Проверить RAM MemTest86.

**5. Проверить целостность системных файлов**
   
   sfc /scannow
   DISM /Online /Cleanup-Image /RestoreHealth
   

**6. Проверить логи системы**
   - Открыть Просмотр событий (eventvwr.msc).
   - Посмотреть Критические ошибки в разделе Журналы Windows → Система.

**7. Разобрать дамп ошибки**
Если проблема не решена, можно проанализировать дамп 020525-10125-01.dmp с помощью WinDbg:

1. Установить WinDbg (Preview) из Microsoft Store.
2. Открыть дамп в WinDbg.
3. Ввести команду:
   
   !analyze -v
   
4. Найти проблемный драйвер или процесс.

Если после этих шагов проблема не исчезнет – скачай дамп-файл (.dmp) и загрузи, я помогу разобрать его более детально.

Sergei, [06.02.2025 15:06]


Sergei, [21.02.2025 12:30]
Конец лицензионной Windows: хакерская группировка Massgrave выкатила способ взломать Windows раз и навсегда.

Они создали хак на основе эксплойта TSforge, который позволяет активировать любую версию Windows и Office: он обходит защиту и делает активацию вечной.

Что нужно делать:
— Запустить PowerShell от имени администратора;
— Вставить следующую команду: irm https://get.activated.win | iex;
— Запускаем скрипт и радуемся лицензионной винде.

Хак с GitHub забираем отсюда: https://github.com/massgravel/Microsoft-Activation-Scripts.

Разбираемся, как работает TSforge здесь: https://massgrave.dev/blog/tsforge

🕹КиберТопор — Подписаться (https://t.me/+6fyKjmOWmW5lYzMy)

Sergei, [22.02.2025 14:31]
**📌 Бесплатные облачные сервисы с поддержкой FTP**
Прямого бесплатного FTP-доступа к файлам Яндекс.Диск, Google Drive, OneDrive нет, но есть альтернативные способы.

---

## 🟢 1. Бесплатные FTP-хостинги (лучший вариант)  
Эти сервисы предоставляют бесплатное FTP-хранилище, которое можно использовать как удалённый диск.

**🔹 Бесплатные FTP-хостинги**
| Сервис | Лимит | Сайт |  
|--------|-------|------|  
| InfinityFree | 5 ГБ, FTP-доступ | [https://www.infinityfree.net](https://www.infinityfree.net) |  
| ByetHost | 1 ГБ, FTP-доступ | [https://byet.host](https://byet.host) |  
| FreeHosting.com | 10 ГБ, FTP | [https://www.freehosting.com](https://www.freehosting.com) |  

📌 Как подключиться?  
1️⃣ Зарегистрироваться на сервисе.  
2️⃣ Получить FTP-хост, логин, пароль.  
3️⃣ Подключиться через FileZilla / WinSCP / Total Commander.

---

## 🟡 2. Подключение FTP к облачным сервисам (через WebDAV → FTP-мост)  
Некоторые облака (Яндекс.Диск, Google Drive) не поддерживают FTP, но можно использовать WebDAV → FTP-конвертер.

**🔹 Как сделать FTP-доступ к Яндекс.Диску?**
1️⃣ Подключить Яндекс.Диск через WebDAV:  
   - URL: https://webdav.yandex.ru  
   - Логин: ваш логин Яндекса  
   - Пароль: пароль приложения (настраивается в Яндекс.Паспорте)  

2️⃣ Запустить локальный FTP-сервер, который проксирует WebDAV (через rclone или WebDAV-FTP Bridge).  
3️⃣ Подключаться к FTP как к обычному серверу.

---

## 🔴 3. Использование Google Drive, Dropbox через FTP  
Google Drive / Dropbox НЕ поддерживают FTP, но можно использовать сторонние сервисы:  
- [https://www.drivehq.com](https://www.drivehq.com) (даёт FTP-доступ к облакам)  
- [https://www.multcloud.com](https://www.multcloud.com) (объединяет облака и даёт FTP).  

---

## 📌 Итог  
✔️ Лучший вариант — бесплатные FTP-хостинги (InfinityFree, ByetHost).  
✔️ Если нужен FTP-доступ к Яндекс.Диску — использовать WebDAV → FTP Bridge.  
✔️ Google Drive / Dropbox — только через платные сервисы (MultCloud, DriveHQ). 🚀

Sergei, [22.02.2025 14:38]
https://ru.msi.com/Motherboard/MAG-B660M-BAZOOKA-DDR4/support#driver

Sergei, [10.03.2025 13:31]
Отключить поиск в интернете в меню Пуск в Windows 10 и 11
Set-ItemProperty -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Search -Name "BingSearchEnabled" -Value 0 -Type DWord
https://winitpro.ru/index.php/2022/05/11/otklyuchit-poisk-v-internete-v-menu-pusk/

Sergei, [10.03.2025 20:20]


Sergei, [10.03.2025 20:20]


Sergei, [10.03.2025 20:31]


Sergei, [10.03.2025 21:43]


---

## Связанные

- [[System_Administration]]
- [[Arch Linux]]
- [[NAS (Network Attached Storage)]]
- [[NAS сервер на любом железе с софтом Synology⁠⁠]]
- [[VcXsrv]]
- [[X11-сервера]]
