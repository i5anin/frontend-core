---
layout: home
title: Подготовка по направлениям Frontend-разработки
hero:
  name: 🚀 Frontend Roadmap
  text: Комплексная подготовка по современным направлениям фронтенд-разработки
  tagline: JavaScript • TypeScript • Vue • System Design • Инфраструктура
  actions:
    - theme: brand
      text: Начать обучение
      link: /javascript/
    - theme: alt
      text: GitHub
      link: https://github.com/your-repo
features:
  - title: 💛 JavaScript
    details: Основы, ООП, Асинхронность, Работа с объектами, Engine
    link: /javascript/
  - title: 💙 TypeScript
    details: Типы, Интерфейсы, Дженерики, Объединения и пересечения
    link: /typescript/
  - title: 🎨 HTML / CSS / PCSS
    details: Flexbox, Grid, Анимации, Семантика, БЭМ
    link: /html-css/
  - title: 🧩 Vue.js
    details: Composition API, Render-функции, Router, Store, i18n
    link: /vue/
  - title: 🏗️ Системный дизайн
    details: Принципы SOLID, Паттерны, Протоколы обмена
    link: /system-design/
  - title: 🛡️ Инфраструктура и безопасность
    details: CI/CD, Сборка, Аутентификация, Безопасность клиента
    link: /infra-security/
  - title: 🧠 Анализ и проектирование
    details: Декомпозиция, Анализ требований, Проектирование решений
    link: /analysis/
  - title: 👥 Организация и управление
    details: Команда, Интервью, Организация процессов
    link: /management/
---

<style>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.feature {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}
.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
.feature h3 {
  margin: 0 0 0.5rem;
  color: var(--vp-c-brand);
  font-size: 1.15rem;
}
.feature p {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}
.feature a {
  color: var(--vp-c-brand-dark);
  font-weight: 600;
  text-decoration: none;
}
.feature a:hover {
  text-decoration: underline;
}
</style>

<div class="features">
  <div class="feature">
    <h3>💛 JavaScript</h3>
    <p>Синтаксис, типы, ООП, функциональное программирование, браузерное API.</p>
    <a href="/javascript/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>💙 TypeScript</h3>
    <p>Типизация, интерфейсы, дженерики и объединение типов.</p>
    <a href="/typescript/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>🎨 HTML / CSS / PCSS</h3>
    <p>Flexbox, Grid, адаптивность, БЭМ и анимации.</p>
    <a href="/html-css/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>🧩 Vue.js</h3>
    <p>Composition API, Router, Store, Render-функции, локализация.</p>
    <a href="/vue/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>🏗️ Системный дизайн</h3>
    <p>Паттерны, SOLID, KISS, DRY и архитектурные принципы.</p>
    <a href="/system-design/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>🛡️ Инфраструктура и безопасность</h3>
    <p>CI/CD, Vite, Webpack, авторизация, безопасность клиента.</p>
    <a href="/infra-security/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>🧠 Анализ и проектирование</h3>
    <p>Декомпозиция задач, проектирование и анализ требований.</p>
    <a href="/analysis/">Перейти к разделу →</a>
  </div>

  <div class="feature">
    <h3>👥 Организация и управление</h3>
    <p>Командная работа, развитие специалистов, процессы и интервью.</p>
    <a href="/management/">Перейти к разделу →</a>
  </div>
</div>
