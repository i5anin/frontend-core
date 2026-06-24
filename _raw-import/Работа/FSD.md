---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
  - state-management
created: 2025-04-14
date: 2025-04-14
---
**🔍 Методология проектирования: **Feature-Sliced Design (FSD)****

**📌 **Почему FSD?****

Feature-Sliced Design (FSD) — это методология, ориентированная на разделение кода по **фичам** и **слоям**, что особенно
хорошо подходит для проектов с **модульной структурой**, как у тебя.

**Преимущества:**

1. **Масштабируемость** — легко добавлять новые фичи, не трогая существующий код.
2. **Читаемость** — строгая структура помогает быстрее ориентироваться в проекте.
3. **Разделение ответственности** — каждый слой отвечает за свою задачу.
4. **Гибкость** — можно адаптировать под разные проекты.

---

**📂 **Структура FSD****

В FSD код делится на **секции** (разделы) и **слои**:

- **Секции (sections)**:
    1. `app` — базовая инициализация приложения
    2. `shared` — переиспользуемые компоненты, утилиты, API
    3. `entities` — сущности (например, `User`, `Order`)
    4. `features` — отдельные фичи (по ТЗ)
    5. `widgets` — крупные UI-блоки, объединяющие несколько фич
    6. `pages` — страницы
    7. `processes` — сложные бизнес-процессы

- **Слои (layers)**:
    1. `ui` — интерфейсные компоненты
    2. `model` — состояние (Pinia / Vuex)
    3. `api` — работа с API
    4. `lib` — хелперы, утилиты
    5. `config` — глобальные настройки

---

## 📂 **Обновленная структура проекта по FSD**

```
📦 src/
├── 📂 app/
│   ├── 📜 providers.js
│   ├── 📜 router.js
│   ├── 📜 store.js
│   └── 📜 main.js
│
├── 📂 shared/
│   ├── 📂 ui/
│   │   ├── 📗 BackButton.vue
│   │   ├── 📗 LoadingSpinner.vue
│   │   ├── 📗 StatusDisplay.vue
│   │   ├── 📗 StrategyDisplay.vue
│   │   └── 📗 ThinProgressBar.vue
│   │
│   ├── 📂 api/
│   │   ├── 📜 apiClient.js
│   │   ├── 📜 tokenService.js
│   │   └── 📜 responseHandlers.js
│   │
│   ├── 📂 lib/
│   │   ├── 📜 formatters.js
│   │   ├── 📜 localize-ru.js
│   │   ├── 📜 icons.js
│   │   └── 📜 statuses.js
│   │
│   ├── 📂 config/
│   │   └── 📜 locales.js
│
├── 📂 entities/
│   ├── 📂 user/
│   │   ├── 📜 model.js
│   │   └── 📜 api.js
│   │
│   ├── 📂 table/
│   │   ├── 📜 tableStore.js
│   │   └── 📜 update.js
│
├── 📂 features/
│   ├── 📂 fieldsProcessing/
│   │   ├── 📗 fieldsProcessor.vue
│   │   ├── 📗 fieldsWatch.vue
│   │   └── 📜 fieldsProcessor.js
│   │
│   ├── 📂 form2/
│   │   ├── 📜 nom_dir.js
│   │   ├── 📜 nom_list.js
│   │   ├── 📗 Form2Card.vue
│   │   └── 📗 CardComment.vue
│   │
│   ├── 📂 form3/
│   │   ├── 📜 nom_info.js
│   │   ├── 📗 Form3Card.vue
│   │   └── 📂 card/
│   │       ├── 📗 EditableField.vue
│   │       └── 📗 ReadonlyField.vue
│
├── 📂 widgets/
│   ├── 📂 modal-tools/
│   │   ├── 📂 api/
│   │   │   └── 📜 tools.js
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── 📗 AddedInstrumentsTable.vue
│   │   │   ├── 📗 PagesModalTools.vue
│   │   │   └── 📗 ProposedInstrumentsTable.vue
│
│   ├── 📂 tables/
│   │   ├── 📂 sborka/
│   │   │   ├── 📗 SborMain.vue
│   │   │   ├── 📗 SborRow.vue
│   │   │   ├── 📜 tableStore.js
│   │   │   └── 🎨 SborRow.css
│   │   │
│   │   ├── 📂 sborka-server/
│   │   │   └── 📗 ServerSideSborka.vue
│   │   │
│   │   ├── 📂 table/
│   │   │   └── 📗 BaseTable.vue
│   │   │
│   │   └── 📂 table-server/
│   │       ├── 📗 DataTable.vue
│   │       ├── 📗 EditModal.vue
│   │       └── 📗 PaginatedDataTable.vue
│
├── 📂 pages/
│   ├── 📂 admin/
│   │   ├── 📂 dynamic-docs/
│   │   │   ├── 📂 components/
│   │   │   │   ├── 📗 ChildrenList.vue
│   │   │   │   ├── 📗 CollapsibleSection.vue
│   │   │   │   ├── 📗 EmitsList.vue
│   │   │   │   ├── 📗 MethodsList.vue
│   │   │   │   └── 📗 PropsList.vue
│   │   │   │
│   │   │   ├── ⚙️ descriptionData.json
│   │   │   └── 📗 InfoComponent.vue
│   │   │
│   │   ├── 📗 Home.vue
│   │   └── 📗 Structure.vue
│   │
│   ├── 📂 form-1/
│   │   ├── 📂 api/
│   │   │   ├── 📜 clients.js
│   │   │   └── 📜 list.js
│   │   │
│   │   ├── 📗 PagesClients.vue
│   │   └── 📗 PagesTableWrapper.vue
│   │
│   ├── 📂 form-2/
│   │   └── 📗 PagesCardNoms.vue
│   │
│   ├── 📂 form-3/
│   │   └── 📗 PagesDetailNom.vue
│
├── 📂 processes/
│   └── 📜 example.js
│
├── 📂 assets/
│   └── 🎨 FormFloatingField.css
│
└── 📜 App.vue
```

---

## 📊 **Обновленная статистика проекта**

- 📄 **Всего файлов**: 71
- 📜 **Всего строк кода**: 5564

Теперь структура четко разделена, улучшена масштабируемость, а FSD делает код удобным для расширения и поддержки.

**📌 **Перенос файлов таблиц в FSD: Старая vs. Новая структура****

| **Файл**                    | **Старый путь**                                                 | **Новый путь (FSD)**                                |
|-----------------------------|-----------------------------------------------------------------|-----------------------------------------------------|
| `BaseTable.vue`             | `src/modules/shared/tables/table/BaseTable.vue`                 | `src/shared/table/BaseTable.vue`                    |
| `DataTable.vue`             | `src/modules/shared/tables/table-server/DataTable.vue`          | `src/shared/table/PaginatedTable.vue`               |
| `EditModal.vue`             | `src/modules/shared/tables/table-server/EditModal.vue`          | `src/widgets/formX-table/EditModal.vue`             |
| `PaginatedDataTable.vue`    | `src/modules/shared/tables/table-server/PaginatedDataTable.vue` | `src/shared/table/PaginatedTable.vue`               |
| `SborMain.vue`              | `src/modules/shared/tables/sborka/SborMain.vue`                 | `src/widgets/form1-table/Form1Table.vue`            |
| `SborRow.vue`               | `src/modules/shared/tables/sborka/SborRow.vue`                  | `src/shared/table/TableRow.vue`                     |
| `PendingUpdatesOverlay.vue` | `src/modules/shared/tables/sborka/PendingUpdatesOverlay.vue`    | `src/widgets/form1-table/PendingUpdatesOverlay.vue` |
| `ServerSideSborka.vue`      | `src/modules/shared/tables/sborka-server/ServerSideSborka.vue`  | `src/widgets/form1-table/ServerSideTable.vue`       |
| `tableStore.js`             | `src/modules/shared/tables/sborka/tableStore.js`                | `src/entities/table/tableStore.js`                  |
| `update.js`                 | `src/modules/shared/tables/sborka/api/update.js`                | `src/entities/table/tableApi.js`                    |

---

**🎯 **Что изменилось?****

1. **Общие таблицы → `shared/table/`**

- `BaseTable.vue`, `PaginatedTable.vue`, `TableRow.vue` теперь лежат в **`shared/`**, так как они **универсальны**.

2. **Логика таблиц → `entities/table/`**

- API и Store теперь находятся в `entities/table/`, так как они **работают с данными**, а не с UI.

3. **Форма-специфичные таблицы → `widgets/formX-table/`**

- `Form1Table.vue`, `Form2Table.vue`, `Form3Table.vue` теперь в **`widgets/`**, т.к. каждая адаптирует `BaseTable.vue`
  под свою форму.

Теперь все файлы организованы **по FSD**, код стал **чистым, переиспользуемым и масштабируемым**. 🚀

---

## Связанные

- [[FSD]]
- [[3 главные проблемы FSD]]
- [[DataTable — анализ размещения в shared-ui]]
- [[Feature-Sliced Design (FSD), SOLID и ООП]]
- [[Feature-Sliced Design – альтернативный подход к организации кода приложений]]
- [[FSD для моего проекта таблиц]]
