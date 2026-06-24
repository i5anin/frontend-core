---
tags:
  - веб-разработка
created: 2025-02-26
date: 2025-02-26
---
**Synology DSM** это операционная система выпускаемая в комплекте с **NAS** одноименной компании. Фактически ваше персональное облако с простым интерфейсом.

[![NAS сервер на любом железе с софтом Synology Synology, Xpenology, Nas, Сервер, Длиннопост](https://cs8.pikabu.ru/post_img/2017/10/26/6/1509009558128187242.png)](https://cs8.pikabu.ru/post_img/big/2017/10/26/6/1509009558128187242.png)

**DiskStation Manager** (DSM) представляет собой интуитивную операционную веб-систему, работающую на всех **NAS**-серверах **Synology** - говорится на их сайте.

Там же можно и посмотреть возможности этой **WebOS** - [https://www.synology.com/ru-ru/dsm/live_demo](https://www.synology.com/ru-ru/dsm/live_demo "https://www.synology.com/ru-ru/dsm/live_demo")

  

**DSM** ставится с помощью дополнительного загрузчика, практически на любое устройство (с совместимым оборудованием), загрузчик разрабатывается сообществом **XPEnology** [https://xpenology.com/forum/forum/4-russian/](https://xpenology.com/forum/forum/4-russian/ "https://xpenology.com/forum/forum/4-russian/")

  

**Установка** возможна на **x86-x64** совместимые системы, на виртуальные машины **ESXI**, **Hyper-V**, **VirtualBox**. Разница в установке только в конфигурации каждой выбранной виртуальной машины и выбора загрузчика.

  

Расскажу вам как устанавливать на **PC**, для этого необходимо:

  

1. USB Flash **любого** обьема (**250MB** достаточно) всегда должна быть вставлена в PC

2. Образ **IMG** для флешки (ds3615 v1.02b на момент написания) - [https://mega.nz/#F!yQpw0YTI!DQqIzUCG2RbBtQ6YieScWg](https://mega.nz/#F!yQpw0YTI!DQqIzUCG2RbBtQ6YieScWg "https://mega.nz/#F!yQpw0YTI!DQqIzUCG2RbBtQ6YieScWg")

3. Утилита для **разворачивания** образа (использовал [https://rufus.akeo.ie/?locale=ru_RU](https://rufus.akeo.ie/?locale=ru_RU "https://rufus.akeo.ie/?locale=ru_RU"))

4. Утилита для **редактирования** образа (использовал OSFMount [https://www.osforensics.com/tools/mount-disk-images.html](https://www.osforensics.com/tools/mount-disk-images.html "https://www.osforensics.com/tools/mount-disk-images.html"))

5. Утилита для определения **PID&VID** флешки ([http://flashboot.ru/files/file/448/](http://flashboot.ru/files/file/448/ "http://flashboot.ru/files/file/448/")) - либо в диспетчере устройств посмотрите.

  

Все действия вы выполняете на свой страх и риск!

  

**Скачиваете** образ, **монтируете** в утилите **OSFMount** для **записи** раздел **15МБ.**

[![NAS сервер на любом железе с софтом Synology Synology, Xpenology, Nas, Сервер, Длиннопост](https://cs8.pikabu.ru/post_img/2017/10/26/7/1509012430160327614.png)](https://cs8.pikabu.ru/post_img/big/2017/10/26/7/1509012430160327614.png)

На **смонтированном** диске находим папку **grub** а в ней файл **grub.cfg**

Открываем файл с помощью нормального блокнота (например Notepad++)

Находим строку с:
```
_set vid=0x058f_

_set pid=0x6387_

_set sn=C7LWN09761_

_set mac1=0011322CA785_
```
**Меняем** vid и pid на те которые на вашей флешке. **Сохраняем** grub.cfg размонтируем образ.

  

Так же можем изменить серийный номер устройства и мак адрес на валидные что бы работал удаленный доступ с любого места.

  

**Разворачиваем** отредактированный образ на флешку с помощью Rufus.

Вставляем флешку в компьютер и загружаемся с нее (компьютер должен подключен к вашей локальной сети и очень желательно что бы получил IP от вашего роутера)

[![NAS сервер на любом железе с софтом Synology Synology, Xpenology, Nas, Сервер, Длиннопост](https://cs8.pikabu.ru/post_img/2017/10/26/7/1509013898174767517.jpg)](https://cs8.pikabu.ru/post_img/big/2017/10/26/7/1509013898174767517.jpg)

Ничего не нажимаем, загрузится первый пункт меню

[![NAS сервер на любом железе с софтом Synology Synology, Xpenology, Nas, Сервер, Длиннопост](https://cs7.pikabu.ru/post_img/2017/10/26/7/1509013992124396483.jpg)](https://cs7.pikabu.ru/post_img/big/2017/10/26/7/1509013992124396483.jpg)

Все отлично - система готова к установке.

Во время установки на **жесткий диск** установленный в компьютере будет **форматирован** и  установлена файловая система (около 2GB) - остальное пространство будет не размечено и доступна в последствии для работы.

  

Заходим на в браузере на сайт [http://find.synology.com](http://find.synology.com/ "http://find.synology.com")

Находим ваше устройство в сети (либо можете подключится по IP:5000)

И с помощью мастера установки (либо онлайн скачается файл прошивки, либо вручную, скачать [здесь](https://global.download.synology.com/download/DSM/release/6.1.3/15152/DSM_DS3615xs_15152.pat "https://global.download.synology.com/download/DSM/release/6.1.3/15152/DSM_DS3615xs_15152.pat")) установить WebOS на ваш компьютер.

  

После перезагрузки по полученному IP будет доступна DiskStation Manager (DSM)

[![NAS сервер на любом железе с софтом Synology Synology, Xpenology, Nas, Сервер, Длиннопост](https://cs9.pikabu.ru/post_img/2017/10/26/7/150901479819415520.png)](https://cs9.pikabu.ru/post_img/big/2017/10/26/7/150901479819415520.png)

А дальше все по вашему желанию.

Сразу же установил свой любимый monitorrent

[https://pikabu.ru/story/monitorrent__avtomaticheskiy_zagruzchik_torrentov_4812706](https://pikabu.ru/story/monitorrent__avtomaticheskiy_zagruzchik_torrentov_4812706 "https://pikabu.ru/story/monitorrent__avtomaticheskiy_zagruzchik_torrentov_4812706")

  

Дополнительный репозитарий: [https://synocommunity.com/](https://synocommunity.com/ "https://synocommunity.com/") с полезным софтом [https://synocommunity.com/packages](https://synocommunity.com/packages "https://synocommunity.com/packages")

  

Так же можно установить контейнеры Docker коих великое множество.

  

Использовались материалы этого форума: [https://xpenology.com/forum/topic/7973-tutorial-installmigrate-dsm-52-to-61x-juns-loader/](https://xpenology.com/forum/topic/7973-tutorial-installmigrate-dsm-52-to-61x-juns-loader/ "https://xpenology.com/forum/topic/7973-tutorial-installmigrate-dsm-52-to-61x-juns-loader/")

---

## Связанные

- [[System_Administration]]
- [[Arch Linux]]
- [[NAS (Network Attached Storage)]]
- [[VcXsrv]]
- [[Windows]]
- [[X11-сервера]]
