---
tags:
  - веб-разработка
  - typescript
  - backend
created: 2025-04-13
date: 2025-04-13
---
Sergei, [12.02.2025 23:46]
# 📌 Глубокий разбор структуры файлов в NestJS  

## 📜 Общий принцип именования файлов  

В NestJS применяется чёткий и строгий стиль именования файлов, который соответствует чистой архитектуре и разделению ответственности.  

Формат имени файла:  
[имя_модуля].[тип_файла].ts
Где:  
- `имя_модуля` – название модуля, к которому относится файл (app, users, auth, orders и т. д.).  
- `тип_файла` – обозначает, какую роль выполняет файл (controller, service, module, entity, dto и т. д.).  

Пример структуры проекта:  
📦 src/
 ┣ 📂 users/
 ┃ ┣ 📜 users.controller.ts    &lt;-- Контроллер пользователей (принимает HTTP-запросы)
 ┃ ┣ 📜 users.service.ts       &lt;-- Логика работы с пользователями (бизнес-логика)
 ┃ ┣ 📜 users.module.ts        &lt;-- Модуль, объединяющий контроллер и сервис
 ┃ ┣ 📜 users.entity.ts        &lt;-- Описание таблицы users для базы данных
 ┃ ┣ 📜 dtos/
 ┃ ┃ ┣ 📜 create-user.dto.ts    &lt;-- Data Transfer Object для создания пользователя
 ┃ ┃ ┣ 📜 update-user.dto.ts    &lt;-- DTO для обновления пользователя
 ┣ 📂 auth/
 ┃ ┣ 📜 auth.controller.ts      &lt;-- Контроллер авторизации
 ┃ ┣ 📜 auth.service.ts         &lt;-- Логика авторизации
 ┃ ┣ 📜 auth.module.ts          &lt;-- Модуль авторизации
 ┣ 📜 app.module.ts             &lt;-- Главный модуль приложения
 ┣ 📜 main.ts                   &lt;-- Точка входа в приложение
---

## 📜 Типы файлов и их назначение  

**1️⃣ Контроллеры (`*.controller.ts`)**
Контроллеры отвечают за приём HTTP-запросов, обработку роутинга и возврат ответов клиенту.  

Пример `users.controller.ts`:  
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
📌 Принципы:
- Каждый контроллер работает с одним ресурсом (users).
- Декоратор `@Controller('users')` указывает путь API (/users).
- Методы контроллера (`@Get()`, `@Post()`) привязываются к HTTP-методам.
- Методы вызывают `users.service.ts`, где происходит обработка данных.

---

**2️⃣ Сервисы (`*.service.ts`)**
Сервисы содержат бизнес-логику, работу с базой данных и обработку данных.  

Пример `users.service.ts`:  
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find(user => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
📌 Принципы:
- `@Injectable()` делает сервис доступным для DI (Dependency Injection).
- Методы `findAll()`, `findById()`, `create()` содержат логику работы с пользователями.
- В контроллере сервис вызывается через DI (private readonly usersService: UsersService).

---

**3️⃣ Модули (`*.module.ts`)**
Модули группируют контроллеры, сервисы и другие зависимости в единое целое.  

Пример `users.module.ts`:  
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
📌 Принципы:
- Каждый модуль регистрирует контроллеры и сервисы.
- Экспортируем `UsersService`, чтобы другие модули могли его использовать.
- Главный модуль (`app.module.ts`) подключает `UsersModule`.

---

**4️⃣ Главный модуль (`app.module.ts`)**
Файл app.module.ts объединяет все модули приложения.

Sergei, [12.02.2025 23:46]
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
📌 Принципы:
- Каждый модуль импортируется в `app.module.ts`.
- Это точка входа в приложение.

---

**5️⃣ Точка входа (`main.ts`)**
Файл main.ts запускает NestJS-приложение.  

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
📌 Принципы:
- Создаётся NestJS-приложение (`NestFactory.create(AppModule)`).
- Сервер запускается на порту `3000`.

---

**6️⃣ Data Transfer Objects (`*.dto.ts`)**
DTO (Data Transfer Object) – это объекты для передачи данных между клиентом и сервером.  

Пример `create-user.dto.ts`:  
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
📌 Принципы:
- В NestJS DTO используется для валидации входных данных.
- `@IsString()`, `@IsEmail()`, `@IsNotEmpty()` – это декораторы из class-validator.

---

**7️⃣ Сущности (Entity) (`*.entity.ts`)**
Сущности описывают структуру базы данных и используются с ORM (TypeORM, Prisma).  

Пример `users.entity.ts`:  
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
📌 Принципы:
- `@Entity()` указывает, что это таблица в базе.
- `@PrimaryGeneratedColumn()` – автоинкрементное поле `id`.
- `@Column()` – обычное поле таблицы.

---

## 📌 Итог
1. NestJS использует строгий стиль именования файлов → [имя_модуля].[тип_файла].ts.  
2. Каждый файл выполняет чётко определённую роль:  
   - *.controller.ts – обработка HTTP-запросов.  
   - *.service.ts – бизнес-логика.  
   - *.module.ts – объединение компонентов.  
   - *.dto.ts – передача данных и валидация.  
   - *.entity.ts – ORM-модель для базы данных.  
3. Принципы NestJS соответствуют Чистой Архитектуре и SOLID.  

🔥 Теперь ты понимаешь, зачем нужен каждый файл в NestJS! 🚀

Sergei, [13.02.2025 8:24]
Ты перешел на Telegraf вместо Express, поэтому логика структуры проекта должна учитывать:  
- Чистую модульность – каждый модуль выполняет строго свою задачу.  
- Современные именования файлов и директорий.  
- Гибкость – лёгкое расширение функционала.  
- Логичность – быстрое понимание кода новым разработчиком.  

---

## 🚀 Оптимизированная структура проекта Telegraf
С учетом современных стандартов TypeScript (2025 год) и удобства поддержки.

**📂 `src` – корневая директория кода**
Всё внутри src/ делится на четко определенные модули.

📂 src
├── 📂 bot                 # Главная логика бота
│   ├── bot.ts             # Конфигурация Telegraf, запуск
│   ├── context.ts         # Расширение контекста Telegraf
│   ├── middleware.ts      # Глобальные middleware
│   ├── commands.ts        # Основные команды (start, help и т.д.)
│   ├── handlers.ts        # Обработчики сообщений/кнопок
│   ├── events.ts          # Реакции на события
│   ├── scenes.ts          # Управление сценами (WizardScene)
│   ├── session.ts         # Настройки сессий пользователей
│   ├── filters.ts         # Фильтры контента (антиспам, мат)
│   └── keyboard.ts        # Создание клавиатур
│
├── 📂 modules             # Логические модули бота (по функциям)
│   ├── 📂 admin           # Логика администрирования
│   │   ├── admin.service.ts  # Бизнес-логика админки
│   │   ├── admin.controller.ts  # API-обработчики админки
│   │   ├── admin.model.ts  # Модели данных админки
│   │   └── admin.keyboard.ts  # Клавиатуры админки
│   │
│   ├── 📂 user            # Обычные пользователи
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── user.model.ts
│   │   └── user.keyboard.ts
│   │
│   ├── 📂 payments        # Оплата
│   │   ├── payments.service.ts
│   │   ├── payments.controller.ts
│   │   ├── payments.model.ts
│   │   ├── payments.keyboard.ts
│   │   └── payments.gateway.ts  # Интеграция с платежными сервисами
│   │
│   ├── 📂 metrics         # Метрики и аналитика
│   │   ├── metrics.service.ts
│   │   ├── metrics.controller.ts
│   │   ├── metrics.model.ts
│   │   └── metrics.dashboard.ts  # Визуализация данных
│   │
│   └── 📂 notifications   # Рассылки и уведомления
│       ├── notify.service.ts
│       ├── notify.controller.ts
│       ├── notify.model.ts
│       ├── notify.keyboard.ts
│       └── notify.cron.ts  # Автоматические рассылки по расписанию
│
├── 📂 config              # Конфигурации проекта
│   ├── config.ts          # Главные настройки
│   ├── env.ts             # Обёртка для переменных окружения
│   ├── logger.ts          # Логирование событий
│   ├── database.ts        # Подключение к БД
│   ├── redis.ts           # Настройка Redis
│   └── rateLimiter.ts     # Ограничение запросов
│
├── 📂 database            # Работа с базой данных
│   ├── prisma.ts          # Инициализация Prisma ORM
│   ├── migrations/        # Миграции
│   ├── seeds/             # Данные для начального заполнения
│   └── queries.ts         # Общие SQL-запросы
│
├── 📂 utils               # Вспомогательные утилиты
│   ├── helpers.ts         # Общие вспомогательные функции
│   ├── validators.ts      # Валидация данных
│   ├── time.ts            # Работа с датами и временем
│   └── security.ts        # Хеширование, JWT, защита
│
└── 📂 assets              # Медиафайлы
    ├── images/            # Картинки
    ├── audio/             # Аудиофайлы
    ├── video/             # Видеофайлы
    ├── docs/              # Документы
    └── stickers/          # Наборы стикеров

---

## 📌 Принципы и объяснение структуры
1. Модульность:  
   - Каждый модуль (`admin`, `user`, `payments`) имеет строгую структуру:  
     - service.ts – бизнес-логика.  
     - controller.ts – обработка событий Telegraf.  
     - model.ts – работа с БД.  
     - keyboard.ts – клавиатуры для данного модуля.  

2. Глобальная конфигурация (`config/`)  
   - Здесь хранятся настройки БД, логирования, Redis, лимиты запросов и конфиги .env.

Sergei, [13.02.2025 8:24]
3. Четкое разделение кода  
   - bot/ – отвечает за запуск бота, middleware и основные обработчики.  
   - modules/ – содержит конкретные модули логики (юзеры, платежи и т. д.).  
   - database/ – только работа с БД.  
   - utils/ – вспомогательные функции.  
   - assets/ – медиафайлы.  

---

## 📂 Именование файлов
Формат имени файла:  
[имя_модуля].[тип_файла].ts
Примеры:
- payments.service.ts – бизнес-логика платежей.  
- metrics.controller.ts – обработчик событий метрик.  
- notify.cron.ts – рассылки по расписанию.  
- config.ts – конфигурация.  

✅ Четко и понятно, без лишних сокращений.

---

## 🔥 Чем эта структура лучше твоей старой?
| ❌ Текущая структура | ✅ Новая структура |
|------------------|------------------|
| Всё в одной папке | Разделение по модулям |
| Непонятные имена файлов | Четкое именование (модуль.тип.ts) |
| Отсутствует логика Middleware | Добавлены middleware.ts, session.ts |
| Много дублирования кода | Вынесены сервисы (service.ts) |
| Смешение бизнес-логики и API | Отдельно controller.ts и service.ts |
| Нет единого места для утилит | Все utils/ в одной папке |
| Нет конфигов в одном месте | Вся конфигурация в config/ |

---

## 🚀 Итог
- 🔥 Современная и логичная структура.  
- 💎 Четкие названия файлов (`module.type.ts`).  
- ⚡️ Готово к масштабированию.  
- 🚀 Использует передовые подходы (Telegraf, Redis, Prisma, TypeScript).  

💡 Теперь код чистый, понятный и легко расширяемый.

Sergei, [16.02.2025 12:42]
Вот гайд по именованию файлов бэкенда в разных стилях (kebab-case, camelCase, snake_case, dot.case), их преимущества и недостатки.  

---

## 1. Kebab-case (`kebab-case`)  
📌 Пример:  
workout-sets.controller.js
exercise-types.service.js
muscle-groups.model.js
✅ Плюсы:  
- Хорошо читается.  
- Поддерживается во всех ОС (Windows, Linux, macOS).  
- Часто используется в Node.js, Express, NestJS.  

❌ Минусы:  
- Нельзя использовать в require() как объект (require('workout-sets') → ошибка).  

📌 Когда использовать:  
✔️ В файловых именах в Node.js-проектах.  
✔️ В модулях Express/NestJS (routes, controllers, services).  

---

## 2. CamelCase (`camelCase`)  
📌 Пример:  
workoutSetsController.js
exerciseTypesService.js
muscleGroupsModel.js
✅ Плюсы:  
- Подходит для использования внутри кода (const WorkoutSets = require('./workoutSetsController');).  
- Поддерживается всеми ОС.  
- Хорошо читается в JS-коде.  

❌ Минусы:  
- В файлах сложнее быстро читать (особенно длинные названия).  
- Не является стандартом для файлов в Node.js.  

📌 Когда использовать:  
✔️ В импортах классов и модулей, но не в названиях файлов.  
✔️ Для файлов с классами (WorkoutService.js, если это класс class WorkoutService).  

---

## 3. Snake_case (`snake_case`)  
📌 Пример:  
workout_sets_controller.js
exercise_types_service.js
muscle_groups_model.js
✅ Плюсы:  
- Хорошо читается, особенно в логах и больших системах.  
- Часто используется в Python и базах данных (table_names).  
- Поддерживается всеми ОС.  

❌ Минусы:  
- Не является стандартом в JavaScript/Node.js.  
- Длинные названия сложнее читать, чем в kebab-case.  

📌 Когда использовать:  
✔️ Для именования SQL-таблиц и файлов в Python.  
✔️ В проектах, где принято snake_case (например, Django, Flask).  

---

## 4. Dot.case (`dot.case`)  
📌 Пример:  
workout.sets.controller.js
exercise.types.service.js
muscle.groups.model.js
✅ Плюсы:  
- Визуально разделяет слова.  
- Можно группировать файлы (например, workout.sets.controller.js).  

❌ Минусы:  
- Windows может неправильно работать с файлами (.controller.js может восприниматься как расширение).  
- Не поддерживается в некоторых IDE при автодополнении.  

📌 Когда использовать:  
✔️ В маленьких проектах, если вам так удобнее.  
❌ Не рекомендуется для больших проектов.  

---

## Лучшие практики по именованию файлов в Node.js  
**✔️ Рекомендуемые стили:**
- Для обычных файлов: kebab-case  
- Для классов: PascalCase (WorkoutService.js)  
- Для моделей (базы данных): snake_case  
- Для больших проектов: kebab-case (user-routes.js, user-controller.js, user-service.js)  

📌 Пример хорошей структуры (Kebab-case)  
/controllers
  ├── workout-sets.controller.js
  ├── exercise-types.controller.js
  ├── muscle-groups.controller.js
/models
  ├── workout-set.model.js
  ├── exercise-type.model.js
  ├── muscle-group.model.js
/routes
  ├── workouts.routes.js
  ├── exercises.routes.js
  ├── muscles.routes.js
/services
  ├── workout-sets.service.js
  ├── exercise-types.service.js
  ├── muscle-groups.service.js

---

**❌ Антипаттерны именования**
🚫 workoutsetscontroller.js – нечитаемо.  
🚫 WORKOUT_SETS_CONTROLLER.JS – заглавные буквы нежелательны для файлов.  
🚫 WorkoutSets_Controller.js – странное сочетание стилей.  
🚫 workoutSets.Controller.js – точка после camelCase ухудшает автодополнение.  

---

## Вывод: какой стиль выбрать?  
| Стиль       | Лучше всего для...               | Рекомендован в Node.js? |
|-----------------|------------------------------------|----------------------------|
| Kebab-case  | Файлы в Node.js (контроллеры, сервисы, роуты) | ✅ Да |
| CamelCase   | Названия классов (WorkoutService.js) | ✅ Да (но не для файлов) |
| Snake_case  | SQL-таблицы, Python-код            | ❌ Нет (для JS) |
| Dot.case    | Внутренние модули (редко)          | ❌ Не рекомендуется |

🚀 Итог: используйте kebab-case для файлов, PascalCase для классов и snake_case для баз данных.

Sergei, [03.04.2025 21:30]
https://www.youtube.com/watch?v=tTiWRWCc0Aw

---

## Связанные

- [[Backend]]
- [[Именование файлов бэкенда]]
