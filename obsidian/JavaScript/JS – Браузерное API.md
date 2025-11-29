# JavaScript — Browser API (кратко)

Browser API — это набор встроенных возможностей, которые предоставляет браузер поверх языка JavaScript. Они недоступны в Node.js, потому что не относятся к самому языку.

---

# DOM API

Интерфейсы для работы с HTML-документом.

Основные операции:

- Получение элементов  
    `document.querySelector`, `querySelectorAll`, `getElementById`
    
- Управление элементами  
    `el.textContent`, `el.innerHTML`, `el.classList`, `el.style`
    
- Манипуляции  
    `append`, `prepend`, `remove`, `createElement`
    
- Навигация  
    `parentNode`, `children`, `nextElementSibling`
    

События:

```js
element.addEventListener('click', handler)
```

---

# BOM (Browser Object Model)

Часть браузера вне DOM.

Ключевые объекты:

### window

Глобальный объект.  
Таймеры:  
`setTimeout`, `setInterval`, `requestAnimationFrame`.

### navigator

Информация об окружении:  
`navigator.userAgent`, `navigator.onLine`, `clipboard`, `geolocation`.

### location

Информация о текущем URL, навигация по страницам:  
`location.href`, `location.reload()`.

### history

Управление историей:  
`history.pushState`, `history.back()`.

---

# Fetch API

HTTP-запросы.

```js
const res = await fetch('/api')
const data = await res.json()
```

Поддерживает: промисы, стримы, AbortController.

---

# Storage API

Хранение данных в браузере.

### localStorage

Синхронный, постоянный:

```js
localStorage.setItem('key', 'value')
localStorage.getItem('key')
```

### sessionStorage

Живёт в пределах вкладки.

### IndexedDB

Асинхронная, база данных в браузере. Работает как NoSQL.

---

# Web API, часто встречающиеся на собесе

### Web Workers

Фоновые потоки без доступа к DOM.

### WebSockets

Двустороннее соединение с сервером:  
`new WebSocket(url)`.

### WebRTC

P2P-соединения: голос, видео.

### File API

Работа с файлами пользователя:  
`input type="file"`, `File`, `Blob`.

### Clipboard API

Чтение/запись буфера обмена:  
`navigator.clipboard.writeText`.

### Notifications API

Браузерные уведомления.

### Drag & Drop API

События `dragenter`, `dragover`, `drop`.

### IntersectionObserver / MutationObserver

Отслеживание видимости элементов и изменений DOM.

---

# Итог

Browser API — это:  
DOM, события, таймеры, сетевые запросы, хранение данных, работа с файлами, потоками, WebSocket/WebRTC и системные возможности браузера через `navigator`, `window`, `location`.