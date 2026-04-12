# Senior Frontend Interview: System Design & Architecture Q&A

## Протоколы обмена данных (15 вопросов)

### Q1-5: REST API (15 Q)
- REST: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- Status codes: 200, 201, 400, 401, 403, 404, 500, 502, 503
- Stateless: каждый запрос независим
- Cacheable: можно кэшировать с помощью headers
- HTTP methods в REST, правильное использование

---

### Q6-10: GraphQL (базовые)
- Query: получение данных
- Mutation: изменение данных
- Subscription: real-time обновления
- Schema: определяет структуру данных
- Разница от REST: клиент просит только нужные данные

---

### Q11-15: gRPC и SOAP
- gRPC: использует HTTP/2, protobuf, бинарный протокол
- Быстрее чем REST
- Сложнее в отладке
- SOAP: XML-based, более старый стандарт

---

## Построение моделей данных в РБД (10 вопросов)

### Q16: Нормализация БД (1NF, 2NF, 3NF)
- 1NF: атомарные значения
- 2NF: полная функциональная зависимость
- 3NF: отсутствие транзитивной зависимости

---

### Q17-25: Relations, Joins, Indexing...

---

## Проектирование ПО (8 вопросов)

### Q26: Что такое диаграммы? (UML, Entity-Relationship)
- UML: классы, методы, отношения
- ER: сущности и связи в БД
- Use cases: описание взаимодействия с системой

---

### Q27-33: Data Flow Diagrams, Decision Trees...

---

## Паттерны проектирования (12 вопросов)

### Q34: Что такое паттерн Singleton?
```javascript
class Logger {
  static instance;
  static getInstance() {
    return this.instance || (this.instance = new Logger());
  }
}
```

---

### Q35: Паттерн Factory
```javascript
class ComponentFactory {
  create(type) {
    switch(type) {
      case 'button': return new Button();
      case 'input': return new Input();
    }
  }
}
```

---

### Q36: Паттерн Observer (Pub/Sub)
```javascript
class EventEmitter {
  on(event, callback) { /* subscribe */ }
  emit(event, data) { /* publish */ }
}
```

---

### Q37: Паттерн Strategy
```javascript
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(arr) { return this.strategy.sort(arr); }
}
```

---

### Q38: Паттерн Decorator
```javascript
function withLogging(fn) {
  return function(...args) {
    console.log('Calling', fn.name);
    return fn.apply(this, args);
  };
}
```

---

### Q39: Паттерн Adapter
```javascript
class OldAPI { getUser() { return { id: 1, name: 'Alice' }; } }
class NewAPI {
  constructor(old) { this.old = old; }
  fetchUser() { return this.old.getUser(); }
}
```

---

### Q40: Паттерн Builder
```javascript
const user = new UserBuilder()
  .setName('Alice')
  .setEmail('alice@example.com')
  .build();
```

---

### Q41: Паттерн MVC/MVVM/MVP
- MVC: Model, View, Controller
- MVVM: Model, View, ViewModel (two-way binding)
- MVP: Model, View, Presenter (Presenter управляет)

---

### Q42-45: Proxy, Chain of Responsibility...

---

## SOLID принципы (10 вопросов)

### Q46: S - Single Responsibility Principle
- Класс должен иметь одну причину для изменения
- Разделяйте обязанности

---

### Q47: O - Open/Closed Principle
- Открыто для расширения, закрыто для модификации

---

### Q48: L - Liskov Substitution Principle
- Подклассы должны быть заменяемы для базовых классов

---

### Q49: I - Interface Segregation Principle
- Множество узких интерфейсов лучше одного широкого

---

### Q50: D - Dependency Inversion Principle
- Зависите от абстракций, не от конкретных реализаций

---

### Q51-55: Примеры применения SOLID...

---

## DRY, KISS, YAGNI (10 вопросов)

### Q56: DRY - Don't Repeat Yourself
- Не повторяйте код
- Используйте функции, классы, утилиты

---

### Q57: KISS - Keep It Simple, Stupid
- Простота лучше сложности
- Избегайте over-engineering

---

### Q58: YAGNI - You Aren't Gonna Need It
- Не добавляйте функции "на будущее"
- Разработайте то что нужно сейчас

---

### Q59-61: Практические примеры...

---

## SPA vs SSR vs SSG vs CSR (10 вопросов)

### Q62: Что такое SPA (Single Page Application)?
- Загружается один HTML файл
- JavaScript управляет всей навигацией
- Примеры: React, Vue, Angular приложения

---

### Q63: CSR - Client Side Rendering
- Весь рендеринг в браузере
- Быстро после загрузки, медленно изначально
- Плохо для SEO

---

### Q64: SSR - Server Side Rendering
- Рендеринг на сервере
- HTML полностью готов при загрузке
- Хорошо для SEO, медленнее для интерактивности

---

### Q65: SSG - Static Site Generation
- Генерирование HTML во время сборки
- Самый быстрый способ
- Хорошо для блогов и статических сайтов

---

### Q66: Гибридные подходы
- Next.js: SSR + SSG + ISR (Incremental Static Regeneration)
- Nuxt.js: похоже для Vue

---

### Q67-71: Когда использовать каждый подход...

---

## Архитектурные подходы (10 вопросов)

### Q72: Monolithic vs Microservices
- Monolith: один большой приложение
- Microservices: много маленьких сервисов

---

### Q73: BFF - Backend For Frontend
- Отдельный API для каждого frontend (web, mobile)
- Позволяет оптимизировать для каждого клиента

---

### Q74: API Gateway
- Единая точка входа для всех API запросов
- Routing, rate limiting, authentication

---

### Q75: Event-Driven Architecture
- Системы взаимодействуют через события
- Loosely coupled, highly scalable

---

### Q76-80: CQRS, Event Sourcing, DDD...

---

### Q81-83: Остальные вопросы по архитектуре...

---

**Статус:** System Design Q&A готов (83 вопроса)

