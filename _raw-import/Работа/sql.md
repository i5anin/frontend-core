---
tags:
  - веб-разработка
  - sql
created: 2024-09-16
date: 2024-09-16
---
**[sql](./sql)** (Structured Query Language) — это язык для управления и взаимодействия с реляционными базами данных. [sql](./sql) позволяет выполнять такие операции, как:

1. **Запрос данных**: Извлечение информации из баз данных с помощью команды [SELECT](#).
2. **Манипуляция данными**: Вставка ([INSERT](#)), обновление ([UPDATE](#)), удаление ([DELETE](#)) данных в таблицах базы данных.
3. **Управление структурой базы данных**: Создание ([CREATE](#)), изменение ([ALTER](#)) и удаление ([DROP](#)) таблиц и других объектов базы данных.
4. **Управление доступом**: Управление пользователями и правами доступа к данным.

**Основные команды [sql](./sql):**

1. **`SELECT`** — извлечение данных:
   ```sql
   SELECT * FROM employees WHERE age > 30;
   ```

2. **`INSERT`** — добавление новых данных:
   ```sql
   INSERT INTO employees (name, age) VALUES ('Anna', 25);
   ```

3. **`UPDATE`** — обновление существующих данных:
   ```sql
   UPDATE employees SET age = 26 WHERE name = 'Anna';
   ```

4. **`DELETE`** — удаление данных:
   ```sql
   DELETE FROM employees WHERE age < 20;
   ```

5. **`CREATE`** — создание таблицы:
   ```sql
   CREATE TABLE employees (
     id INT PRIMARY KEY,
     name VARCHAR(50),
     age INT
   );
   ```

6. **`ALTER`** — изменение структуры таблицы:
   ```sql
   ALTER TABLE employees ADD salary DECIMAL(10, 2);
   ```

7. **`DROP`** — удаление таблицы:
   ```sql
   DROP TABLE employees;
   ```

SQL — это основной язык для работы с реляционными базами данных (например, PostgreSQL, MySQL, SQL Server). Он помогает управлять и структурировать данные, а также извлекать нужную информацию для анализа и обработки.

![cheat-SQL.jpg](#)
![SQL-CHEATSHEET.png](#)

---

## Связанные

- [[SQL]]
- [[Data Scientist]]
- [[ILIKE]]
- [[MySQL]]
- [[PostgreSQL]]
- [[Запросы]]
