---
tags:
  - карьера
  - vue
  - react
  - javascript
  - typescript
created: 2025-04-06
date: 2025-04-06
---
На изображении — мем в стиле «сильный доге vs грустный доге», иллюстрирующий разницу между настоящим синьором [frontend](#)-разработки (слева) и тем, кто формально работает с [React](#), но остался на уровне [jQuery](#) (справа). Образ слева — гипертрофированно сильный, с акцентом на зрелую архитектуру и функциональный подход.

---

## 🎯 Цель: как стать "таким как слева"

---

**🧱 1. Архитектура и принципы**

**🔹 Clean Architecture:**

- Разделение ответственности (SRP).
    
- Domain-driven design (DDD).
    
- Уровни: `UI -> Application -> Domain -> Infrastructure`.
    
- Инверсия зависимостей (Dependency Inversion).
    

**🔹 MVVM:**

- UI через ViewModel.
    
- React или Vue с composition API и реактивными хранилищами.
    

**🔹 Dependency Injection:**

- IoC-контейнеры (например, InversifyJS, tsyringe).
    

---

**🔣 2. Функциональное программирование (FP)**

**Фреймворки:**

- [`fp-ts`](https://gcanti.github.io/fp-ts/)
    
- [`RxJS`](https://rxjs.dev/) (реактивные потоки)
    

**Ключевые концепции:**

- **Каррирование**
    
- **Монады** и **Аппликативные функторы**
    
- Пайплайны через `pipe()` и `flow()`
    

📚 Учебные источники:

- YouTube: «Functional Programming in TypeScript» (GCanti)
    
- Книга: _Functional Programming in JavaScript_ (Luis Atencio)
    

---

**🧪 3. TypeScript на максималках**

**Maximum TS:**

- `strict: true` в `tsconfig.json`.
    
- Использование `unknown` вместо `any`.
    
- Типизация каждого уровня данных: DTO, Entity, ViewModel.
    
- Типобезопасная работа с API, Events, Stores, DI.
    

---

**⚙️ 4. Практика и стек**

**Технологии:**

- React или Vue 3 с Composition API
    
- Zustand / Redux Toolkit с RTK Query
    
- GraphQL / REST
    
- WebSocket через RxJS
    
- TailwindCSS / CSS-in-JS
    

**Проектные практики:**

- Feature-Sliced Design (FSD)
    
- Lint + Prettier + Husky + Commitlint
    
- CI/CD: GitHub Actions + Docker
    

---

**📌 Пошаговый план**

1. **Понять архитектуру:**
    
    - Изучить Clean Architecture и применить на pet-проекте.
        
    - Изучить паттерны MVVM и DI.
        
2. **Изучить fp-ts и RxJS:**
    
    - Пройти туториалы на [https://dev.to](https://dev.to/), [https://egghead.io](https://egghead.io/) и официальной доке.
        
    - Собрать простое приложение с RxJS: чат, поиск с debounce и cancel.
        
3. **Повысить уровень TypeScript:**
    
    - Пройти курс от Миши Подгорного или [https://typescript-exercises.github.io](https://typescript-exercises.github.io/).
        
    - Заменить все `any`, `unknown`, `Record<string, any>` → строгими типами.
        
4. **Внедрить FSD и модульную структуру:**
    
    - Разбить логику на `features/`, `shared/`, `entities/`, `processes/`.
        
5. **Регулярная практика:**
    
    - Участвовать в open source, читать код библиотек.
        
    - Вести свой pet-проект и рефакторить его по мере роста.
        

---

## 📘 Вывод

Чтобы стать таким "слева", нужен не просто React, а глубокое понимание **архитектурных принципов**, **типобезопасности**, **реактивного программирования** и **функциональных парадигм**. Это синьор, который мыслит системно, пишет код, устойчивый к росту проекта и изменениям, и масштабирует не только компоненты, но и мышление.

Хочешь — могу помочь составить пошаговый учебный план на месяц или квартал.

---

## Связанные

- [[Карьера]]
- [[Junior]]
- [[Собеседования]]
