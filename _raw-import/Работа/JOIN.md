---
tags:
  - веб-разработка
  - sql
created: 2024-10-12
date: 2024-10-12
---
**`JOIN`** в [../Programming_Fundamentals/Backend/SQL/sql](#) — это операция, которая используется для объединения строк из двух или более таблиц на основе связанного столбца между ними. `JOIN` позволяет извлекать данные, которые распределены по нескольким таблицам, при этом соединяя их логически по общему полю (например, по `id` или другим ключам).

**Виды `JOIN` в [../Programming_Fundamentals/Backend/SQL/sql](#):**

1. **`INNER JOIN`** (внутреннее соединение):
   - Возвращает только те строки, у которых есть совпадение в обеих таблицах.
   - Если хотя бы одна из таблиц не содержит соответствующей строки, эта строка не будет включена в результат.

   Пример:
   ```sql
   SELECT employees.name, departments.name
   FROM employees
   INNER JOIN departments ON employees.department_id = departments.id;
   ```

2. **`LEFT JOIN`** (левое внешнее соединение):
   - Возвращает все строки из левой таблицы и совпадающие строки из правой таблицы. Если нет совпадений в правой таблице, поля из правой таблицы будут заполнены значением `NULL`.

   Пример:
   ```sql
   SELECT employees.name, departments.name
   FROM employees
   LEFT JOIN departments ON employees.department_id = departments.id;
   ```

3. **`RIGHT JOIN`** (правое внешнее соединение):
   - Возвращает все строки из правой таблицы и совпадающие строки из левой таблицы. Если нет совпадений в левой таблице, поля из левой таблицы будут заполнены значением `NULL`.

   Пример:
   ```sql
   SELECT employees.name, departments.name
   FROM employees
   RIGHT JOIN departments ON employees.department_id = departments.id;
   ```

4. **`FULL JOIN`** (полное внешнее соединение):
   - Возвращает строки, когда есть совпадения в любой из таблиц. Если совпадения нет в одной из таблиц, в результирующем наборе будет значение `NULL` для отсутствующих данных.

   Пример:
   ```sql
   SELECT employees.name, departments.name
   FROM employees
   FULL OUTER JOIN departments ON employees.department_id = departments.id;
   ```

5. **`CROSS JOIN`** (перекрестное соединение):
   - Возвращает декартово произведение (каждая строка из одной таблицы будет соединена с каждой строкой из другой таблицы).

   Пример:
   ```sql
   SELECT employees.name, departments.name
   FROM employees
   CROSS JOIN departments;
   ```

**Пример использования `INNER JOIN`:**

Есть две таблицы: `orders` и `customers`.

**Таблица `orders`**:
| order_id | customer_id | total |
|----------|-------------|-------|
| 1        | 101         | 150   |
| 2        | 102         | 200   |

**Таблица `customers`**:
| customer_id | name    |
|-------------|---------|
| 101         | Анна    |
| 102         | Борис   |
| 103         | Виктор  |

Запрос для получения данных о заказах вместе с именами клиентов:

```sql
SELECT orders.order_id, customers.name, orders.total
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```

**Результат**:

| order_id | name  | total |
|----------|-------|-------|
| 1        | Анна  | 150   |
| 2        | Борис | 200   |

Этот запрос вернет только те заказы, для которых есть соответствующий клиент в таблице `customers` (совпадение по `customer_id`).

---

## Связанные

- [[Изучение]]
- [[API (2)]]
- [[API]]
- [[App.vue (2)]]
- [[App.vue]]
- [[array (2)]]
