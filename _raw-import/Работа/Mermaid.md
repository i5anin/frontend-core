---
tags:
  - веб-разработка
  - git
created: 2024-12-18
date: 2024-12-18
---
**Что такое Mermaid?**

**Mermaid** — это язык разметки, позволяющий создавать диаграммы и графики в текстовом формате. Mermaid поддерживается в документации, GitHub, Obsidian и других инструментах.

---

**Основные типы диаграмм**

Mermaid поддерживает следующие типы диаграмм:

1. **Диаграммы связей (Flowchart)**:
    
    ```mermaid
    graph TD
        A[Начало] --> B{Условие?}
        B -->|Да| C[Действие 1]
        B -->|Нет| D[Действие 2]
    ```
    
2. **Диаграммы классов (Class Diagram)**:
    
    ```mermaid
    classDiagram
        class Animal {
            +int age
            +String gender
            +isMammal()
            +mate()
        }
        class Dog {
            +String breed
            +bark()
        }
        Animal <|-- Dog
    ```
    
3. **Диаграммы Ганта (Gantt Chart)**:
    
    ```mermaid
    gantt
        title Пример диаграммы Ганта
        dateFormat  YYYY-MM-DD
        section Раздел 1
        Задача 1       :done, 2024-01-01, 3d
        Задача 2       :active, 2024-01-04, 5d
    ```
    
4. **ER-диаграммы (Entity-Relationship Diagram)**:
    
    ```mermaid
    erDiagram
        CUSTOMER {
            string name
            string address
        }
        ORDER {
            int id
            date orderDate
        }
        CUSTOMER ||--o{ ORDER : places
    ```
    
5. **Секвенс-диаграммы (Sequence Diagram)**:
    
    ```mermaid
    sequenceDiagram
        participant A as Клиент
        participant B as Сервер
        A->>B: Запрос данных
        B-->>A: Ответ данных
    ```
    
6. **Диаграммы состояний (State Diagram)**:
    
    ```mermaid
    stateDiagram
        [*] --> Ожидание
        Ожидание --> Активный : событие
        Активный --> Завершён : завершение
    ```
    
7. **Диаграммы развертывания (Deployment Diagram)**:
    
    ```mermaid
    classDiagram
        class Server {
            +IP: String
            +start()
        }
        class Database {
            +connectionString: String
            +query()
        }
        Server --> Database
    ```
    

---

**Синтаксис элементов**

- **Стрелки**:
    
    - `-->` или `---` — стандартная связь.
    - `<-->` — двусторонняя связь.
    - `-->`|`[label]` — связь с меткой.
- **Классы и их элементы (Class Diagram)**:
    
    - Атрибуты обозначаются как `+`, `-`, `#`:
        - `+` — публичный.
        - `-` — приватный.
        - `#` — защищённый.
- **Секции (Gantt)**:
    
    - `section Раздел 1` — обозначает раздел в диаграмме Ганта.
- **Участники (Sequence Diagram)**:
    
    - `participant` — добавляет участника в диаграмму.
- **Состояния (State Diagram)**:
    
    - `[state]` — определяет состояние.

---

**Пример полного использования**

```mermaid
graph TD
    A[Начало] --> B{Условие?}
    B -->|Да| C[Действие 1]
    B -->|Нет| D[Действие 2]

classDiagram
    class User {
        +String name
        +String email
        +register()
        +login()
    }
    class Admin {
        +manageUsers()
    }
    User <|-- Admin

sequenceDiagram
    participant Клиент
    participant Сервер
    Клиент->>Сервер: Отправка запроса
    Сервер-->>Клиент: Ответ
```

---

**Где использовать Mermaid**

- **GitHub**: Поддержка встроена.
- **Obsidian**: Требуется включение плагина Mermaid.
- **VS Code**: Установите расширения Markdown Preview Mermaid.
- **Markdown-редакторы**: Поддержка зависит от конкретного инструмента.

**Документация**

Для детального изучения возможностей Mermaid посетите [официальную документацию](https://mermaid-js.github.io/mermaid/).

---

## Связанные

- [[Documentation]]
- [[HTTPS]]
- [[Jest]]
- [[VitePress]]
- [[XML]]
