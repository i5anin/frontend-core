---
tags:
  - веб-разработка
  - javascript
  - typescript
  - api
created: 2023-06-20
date: 2023-06-20
---
![Pasted image 20241020215232.png](#)

`Angular` — это платформа для разработки веб-приложений и фреймворк с открытым исходным кодом, поддерживаемый Google. Он используется для создания одностраничных приложений ([SPA](./SPA)) и построен на языке [../TypeScript/TypeScript](#). Angular предлагает широкий набор инструментов для разработки масштабируемых и динамичных веб-приложений, включая двустороннюю привязку данных, шаблоны, роутинг, зависимости и модульную архитектуру.

**Основные особенности Angular:**
- **TypeScript**: Angular написан на TypeScript, что улучшает поддержку типизации, рефакторинг кода и предотвращает ошибки на этапе разработки.
- **Компонентный подход**: Приложение состоит из компонентов, каждый из которых отвечает за определенную часть интерфейса. Компоненты могут быть переиспользованы и структурированы иерархически.
- **Модульность**: Angular разбивает приложение на модули, что помогает управлять масштабируемыми проектами.
- **Двусторонняя привязка данных**: Это позволяет синхронизировать данные между моделью и представлением в реальном времени.
- **Dependency Injection (DI)**: Внедрение зависимостей помогает легко управлять сервисами и другими ресурсами в приложении.
- **Роутинг**: Angular поддерживает встроенную маршрутизацию для создания многостраничных одностраничных приложений с переходами между представлениями.
- **Сервисы и HTTP-клиент**: Для взаимодействия с внешними API используются сервисы, которые можно внедрять в различные компоненты.

**Пример базовой структуры Angular-приложения:**

1. **Модуль** (`app.module.ts`):
Модуль объединяет компоненты, сервисы и другие части приложения.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. **Компонент** (`app.component.ts`):
Компонент содержит логику и шаблон для отображения данных.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>`,
  styles: []
})
export class AppComponent {
  title = 'Привет, Angular!';
}
```

3. **Шаблон компонента** (`app.component.html`):
Шаблон связывается с логикой компонента и отображает динамические данные.

```html
<h1>{{ title }}</h1>
```

4. **Маршрутизация** (`app-routing.module.ts`):
Роутинг позволяет создавать навигацию между различными представлениями.

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Пример команды для создания нового Angular-приложения:**

Для создания нового проекта используется Angular CLI (интерфейс командной строки), который облегчает управление проектом.

1. Установите Angular CLI (если ещё не установлен):
   ```bash
   npm install -g @angular/cli
   ```

2. Создайте новый проект:
   ```bash
   ng new my-app
   ```

3. Запустите сервер разработки:
   ```bash
   cd my-app
   ng serve
   ```

Приложение будет доступно по адресу `http://localhost:4200`.

**Angular — это фреймворк с богатым функционалом для создания сложных, производительных и масштабируемых приложений с поддержкой TypeScript и множеством встроенных инструментов для удобного и эффективного процесса разработки.**

---

## Связанные

- [[Frameworks]]
- [[Express.js (2)]]
- [[Express.js]]
- [[Framework7 (2)]]
- [[Framework7]]
- [[Laravel Controller]]
