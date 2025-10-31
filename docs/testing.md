# 🧩 Основы тестирования

**Тестирование** — это процесс проверки соответствия программы ожиданиям и требованиям. Главная цель — обнаружить ошибки **до** того, как их найдут пользователи.

### Основные цели:

* Проверить корректность работы кода
* Повысить стабильность и предсказуемость поведения приложения
* Упростить рефакторинг (с тестами можно смело менять код)
* Автоматизировать проверку критически важных сценариев

---

## 🧠 Виды тестирования

### 1. **Unit tests (модульные тесты)**

Проверяют отдельные функции, модули или компоненты в изоляции.

* Проверяем «чистую» логику: функции, методы, вычисления.
* Не взаимодействуют с сетью или DOM (в идеале).

**Инструменты:**

* Jest
* Vitest (аналог Jest для Vite-проектов)
* Mocha + Chai

**Пример (Jest):**

```js
import { sum } from './math';

test('adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});
```

---

### 2. **Integration tests (интеграционные тесты)**

Проверяют, как несколько модулей взаимодействуют между собой.
Например: компонент + store, или API + логика обработки данных.

**Инструменты:**

* Jest
* Testing Library (`@testing-library/vue`, `@testing-library/react`)

**Пример (Vue Testing Library):**

```js
import { render, screen } from '@testing-library/vue';
import Counter from './Counter.vue';

test('increments counter on click', async () => {
  render(Counter);
  const button = screen.getByRole('button');
  await button.click();
  expect(button).toHaveTextContent('1');
});
```

---

### 3. **E2E tests (сквозные тесты)**

Проверяют приложение «целиком», как его видит пользователь.
Запускается браузер (реальный или эмулированный), проходят клики, навигация, формы.

**Инструменты:**

* Cypress
* Playwright
* Puppeteer

**Пример (Cypress):**

```js
describe('Login flow', () => {
  it('should log in successfully', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

### 4. **Snapshot-тестирование**

Фиксирует текущее состояние компонента/функции и сравнивает с сохранённым эталоном.
Часто используется в UI-тестах для Vue/React.

```js
import { render } from '@testing-library/vue';
import MyButton from './MyButton.vue';

test('renders correctly', () => {
  const { container } = render(MyButton);
  expect(container).toMatchSnapshot();
});
```

---

### 5. **Performance, Security, Accessibility tests**

Более специализированные направления:

* **Performance:** Lighthouse, WebPageTest
* **Accessibility (a11y):** axe-core, Cypress + axe
* **Security:** линтеры и анализаторы уязвимостей (npm audit, snyk)

---

## 🧰 Инструменты и окружение

* **Jest / Vitest** — для unit и integration тестов
* **Testing Library** — для симуляции пользовательского поведения
* **Cypress / Playwright** — для e2e
* **MSW (Mock Service Worker)** — для имитации API-запросов
* **Vue Test Utils** — для тестирования Vue-компонентов

---

## 🧩 Подходы и практики

* **TDD (Test-Driven Development)** — сначала пишем тест, потом код, который его проходит.
* **BDD (Behavior-Driven Development)** — описываем тесты человеческим языком (например, `describe('User logs in')`).
* **Mocks / Stubs / Spies** — подмена зависимостей, чтобы изолировать тестируемый код.
* **Code coverage (покрытие кода тестами)** — метрика, показывающая, какая часть кода реально проверена.

---

## 🪄 Как тестировать Vue-приложение

1. **Юнит-тесты компонентов:**
   Используем `@vue/test-utils` и `vitest/jest`.
2. **Интеграция с store/router:**
   При рендере компонента можно передать mock Vuex/Pinia или router.
3. **E2E:**
   Cypress или Playwright проверяют полное приложение в браузере.

---

## 🚨 Типичные ошибки

* Тесты слишком завязаны на реализацию (ломаются при любом рефакторинге).
* Избыточное мокирование (тест не отражает реальность).
* Отсутствие тестов для критических путей.
* Игнорирование тестов на ошибки и исключения.

---

## 💬 Резюме для собеседования

Ты должен уметь:

* Объяснить, зачем нужны тесты и какие виды существуют
* Написать простой unit-тест
* Понимать, как тестировать компонент и API-запрос
* Отличать TDD от «тестируем по факту»
* Назвать основные инструменты: Jest, Vitest, Cypress, Vue Test Utils

