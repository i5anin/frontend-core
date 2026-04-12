# Browser API

## DOM API

```js
// Поиск элементов
document.querySelector('.btn');         // первый элемент
document.querySelectorAll('.item');     // NodeList всех
document.getElementById('app');
document.getElementsByClassName('box');

// Создание и вставка
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
parent.insertBefore(div, parent.firstChild);
parent.removeChild(div);

// Атрибуты и классы
el.setAttribute('data-id', '123');
el.getAttribute('data-id');
el.classList.add('active');
el.classList.remove('active');
el.classList.toggle('active');
el.classList.contains('active');
```

## События (Event Delegation)

```js
// Event Bubbling — события всплывают вверх
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Клик по li:', e.target.textContent);
  }
});

// Отличия addEventListener vs onclick
el.onclick = handler;                // только 1 обработчик
el.addEventListener('click', handler);       // несколько
el.addEventListener('click', handler, true); // capture фаза

// Удаление обработчика
el.removeEventListener('click', handler);

// Предотвращение
e.preventDefault();  // отменить действие по умолчанию
e.stopPropagation(); // остановить всплытие
```

## Storage

```js
// localStorage — постоянное хранение
localStorage.setItem('key', JSON.stringify(data));
const data = JSON.parse(localStorage.getItem('key'));
localStorage.removeItem('key');
localStorage.clear();

// sessionStorage — до закрытия вкладки
sessionStorage.setItem('temp', 'value');

// Cookie — передаётся на сервер
document.cookie = 'name=Alice; expires=...'; 

// IndexedDB — для больших данных
```

## Fetch API

```js
// GET
const data = await fetch('/api/users').then(r => r.json());

// POST с телом
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
});

// Обработка ошибок
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

// Отмена запроса
const controller = new AbortController();
fetch('/api', { signal: controller.signal });
controller.abort();
```

## Intersection Observer (Lazy Loading)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('img[data-src]')
  .forEach(img => observer.observe(img));
```

## WebSockets

```js
const ws = new WebSocket('wss://example.com/socket');

ws.onopen = () => ws.send(JSON.stringify({ type: 'hello' }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));
ws.onclose = () => console.log('Disconnected');
ws.onerror = (e) => console.error(e);
```

## History API

```js
// Добавить запись в историю
history.pushState({ page: 1 }, 'Title', '/page/1');

// Заменить текущую запись
history.replaceState({ page: 2 }, 'Title', '/page/2');

// Слушать навигацию
window.addEventListener('popstate', (e) => {
  console.log('Назад/вперёд:', e.state);
});
```
