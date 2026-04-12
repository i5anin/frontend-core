# KISS, DRY, SOLID и другие принципы

## SOLID

### S — Single Responsibility Principle
```js
// ❌ Нарушение — класс делает всё
class User {
  constructor(name) { this.name = name; }
  save() { db.save(this); }           // БД
  sendEmail() { mailer.send(this); }  // Email
  render() { return `<div>${this.name}</div>`; } // UI
}

// ✅ Каждый класс — одна ответственность
class User { constructor(name) { this.name = name; } }
class UserRepository { save(user) { db.save(user); } }
class UserMailer { sendWelcome(user) { mailer.send(user); } }
```

### O — Open/Closed Principle
```js
// ❌ При добавлении нового типа — меняем существующий код
function getDiscount(type) {
  if (type === 'vip') return 0.2;
  if (type === 'student') return 0.1; // добавили сюда
}

// ✅ Расширяем без изменений
class VipDiscount { calc() { return 0.2; } }
class StudentDiscount { calc() { return 0.1; } }
class NoDiscount { calc() { return 0; } }

function getPrice(price, discount) {
  return price * (1 - discount.calc());
}
```

### L — Liskov Substitution Principle
```js
// ❌ Дочерний класс ломает поведение
class Bird {
  fly() { return 'flying'; }
}
class Penguin extends Bird {
  fly() { throw new Error('Я не умею летать!'); } // нарушение
}

// ✅ Правильная иерархия
class Bird {}
class FlyingBird extends Bird { fly() {} }
class SwimmingBird extends Bird { swim() {} }
class Penguin extends SwimmingBird {}
```

### I — Interface Segregation Principle
```ts
// ❌ Жирный интерфейс
interface Worker {
  work(): void;
  eat(): void;   // Роботы не едят
  sleep(): void; // Роботы не спят
}

// ✅ Разбитый на части
interface Workable { work(): void; }
interface Eatable  { eat(): void; }
interface Sleepable { sleep(): void; }

class Human implements Workable, Eatable, Sleepable {}
class Robot implements Workable {}
```

### D — Dependency Inversion Principle
```js
// ❌ Прямая зависимость от конкретной реализации
class EmailService {
  send(msg) { /* SMTP */ }
}
class UserService {
  constructor() {
    this.emailService = new EmailService(); // жёсткая привязка
  }
}

// ✅ Зависимость от абстракции
class UserService {
  constructor(notifier) { // принимаем любой notifier
    this.notifier = notifier;
  }
  register(user) {
    this.notifier.send(`Welcome, ${user.name}`);
  }
}

new UserService(new EmailService());
new UserService(new SMSService());
new UserService(new PushService());
```

---

## DRY — Don't Repeat Yourself

```js
// ❌ Дублирование кода
function validateEmail(email) {
  return email.includes('@') && email.length > 5;
}
function validateAdminEmail(email) {
  return email.includes('@') && email.length > 5; // то же самое!
}

// ✅ Один раз
function isValidEmail(email) {
  return email.includes('@') && email.length > 5;
}
```

---

## KISS — Keep It Simple, Stupid

```js
// ❌ Переусложнено
function getUserAge(user) {
  return user && user.profile && user.profile.personal
    ? user.profile.personal.dateOfBirth
      ? new Date().getFullYear() - new Date(user.profile.personal.dateOfBirth).getFullYear()
      : null
    : null;
}

// ✅ Просто
function getUserAge(user) {
  const dob = user?.profile?.personal?.dateOfBirth;
  if (!dob) return null;
  return new Date().getFullYear() - new Date(dob).getFullYear();
}
```

---

## YAGNI — You Aren't Gonna Need It

```js
// ❌ Добавляем "на будущее"
class UserService {
  constructor(db, cache, queue, logger, metrics, featureFlags) {}
  getUser() {}
  getUserV2() {}   // может пригодится
  getUserV3() {}   // и это тоже
  exportToXML() {} // вдруг попросят
}

// ✅ Только то что нужно сейчас
class UserService {
  constructor(db) {}
  getUser(id) {}
  saveUser(user) {}
}
```
