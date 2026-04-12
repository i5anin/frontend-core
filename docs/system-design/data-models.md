# Модели данных в реляционных БД

## Основные концепции

**Сущность** — объект реального мира (User, Product, Order)  
**Атрибут** — свойство сущности (name, price, created_at)  
**Связь** — отношение между сущностями (User имеет Orders)

## Типы связей

```
One-to-One (1:1)
  User ──── Profile
  (у каждого пользователя один профиль)

One-to-Many (1:N)
  User ──┬── Order
         ├── Order
         └── Order
  (у пользователя много заказов)

Many-to-Many (M:N)
  Product ─── OrderItem ─── Order
  (промежуточная таблица)
```

## Нормализация

```sql
-- ❌ Ненормализованная таблица
| id | name  | orders                    |
| 1  | Alice | "Book, Pen"               | ← несколько значений в ячейке
| 2  | Bob   | "Notebook"                |

-- ✅ 1NF — атомарные значения
| user_id | name  |     | order_id | user_id | product |
| 1       | Alice |     | 101      | 1       | Book    |
| 2       | Bob   |     | 102      | 1       | Pen     |
                        | 103      | 2       | Notebook|

-- ✅ 3NF — убираем транзитивные зависимости
Users: id, name, city_id
Cities: id, city_name, country_name  ← city_name определяет country_name
```

## ER Диаграмма (пример интернет-магазина)

```
┌─────────────┐       ┌─────────────┐
│    Users    │       │  Products   │
├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │
│ name        │       │ name        │
│ email       │       │ price       │
│ created_at  │       │ stock       │
└──────┬──────┘       └──────┬──────┘
       │ 1:N                 │ M:N через
       ▼                     ▼ OrderItems
┌─────────────┐       ┌─────────────┐
│   Orders    │       │ OrderItems  │
├─────────────┤       ├─────────────┤
│ id (PK)     │──────▶│ order_id FK │
│ user_id FK  │       │ product_id FK│
│ total       │       │ quantity    │
│ status      │       │ price       │
│ created_at  │       └─────────────┘
└─────────────┘
```

## Индексы

```sql
-- Первичный ключ — автоматически индексируется
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,  -- уникальный индекс
  name VARCHAR(100)
);

-- Составной индекс для частых запросов
CREATE INDEX idx_orders_user_status
  ON orders (user_id, status);

-- Запрос использует индекс
SELECT * FROM orders
WHERE user_id = 5 AND status = 'pending';
```

## SQL для Frontend разработчика

```sql
-- JOIN — объединение таблиц
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY order_count DESC;

-- Подзапрос
SELECT * FROM products
WHERE id IN (
  SELECT product_id FROM order_items
  WHERE order_id = 123
);

-- Транзакция — атомарность операций
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- или ROLLBACK если ошибка
```

## Проектирование БП (Бизнес-процессов)

```
Описание бизнес-логики:
  - Use Case: "Пользователь оформляет заказ"
  - Actor: пользователь, система оплаты
  - Steps: добавить в корзину → оформить → оплатить → подтвердить

BPMN (Business Process Model and Notation):
  [Начало] → [Выбрать товар] → [Корзина] → [Оформить заказ]
          → [Шлюз: баланс достаточен?]
          → YES → [Списать деньги] → [Уведомить] → [Конец]
          → NO  → [Сообщение об ошибке] → [Конец]
```
