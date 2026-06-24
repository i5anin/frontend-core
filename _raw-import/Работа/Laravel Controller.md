---
tags:
  - веб-разработка
created: 2024-03-21
date: 2024-03-21
---
**[Laravel](./Laravel — Laravel)**

**1. LoginController**

- **login()** - для обработки [POST](#) запроса на аутентификацию пользователя.
- **checkLogin()** - для проверки статуса аутентификации пользователя через [POST](#) запрос.
- **getDatabaseInfo()** - для получения информации о базе данных через [GET](./GET) запрос.

**2.1 ToolController**

Отвечает за операции с инструментами, такие как создание, получение, редактирование и удаление.

- **getToolById()** - получение детальной информации об инструменте по ID.
- **getTools()** - получение списка всех инструментов. Поддерживает фильтрацию и пагинацию.
- **addTool()** - добавление нового инструмента.
- **editTool()** - редактирование существующего инструмента.
- **deleteTool()** - удаление инструмента по ID.

**2.2 ToolParamController**

Управляет параметрами инструментов, включая их добавление, получение и удаление.

- **getToolParams()** - получение списка всех параметров инструментов.
- **getToolParamsParentId()** - получение параметров для инструмента с определённым родительским ID.
- **addToolParam()** - добавление параметра к инструменту.
- **updateToolParam()** - обновление параметра инструмента.
- **deleteToolParam()** - удаление параметра инструмента.

**2.3 ToolTreeController**

Специализируется на работе со структурой "дерева" инструментов, позволяя добавлять, изменять и удалять узлы.

- **getToolsTree()** - получение структуры дерева всех инструментов.
- **addBranch()** - добавление нового узла (ветки) в дерево инструментов.
- **updateFolderTree()** - обновление узла (папки) в дереве инструментов.
- **dellFolderTree()** - удаление узла из дерева инструментов.

**3. SkladController**

- **updateToolInventory()** - обновление инвентаря инструмента.

**4. HistoryController**

- **getToolHistoryId()**, **getToolHistory()**, **getToolHistoryByPartId()** - получение истории инструмента по различным критериям.

**5. DamagedController**

- **getDamaged()** - получение истории повреждений.
- **addToolHistoryDamaged()** - добавление записи о повреждении инструмента.

**6. IssueController**

- **findDetailProduction()**, **getFioOperators()**, **issueTool()**, **getCncData()** - управление выдачей инструментов и связанными данными.

**7. ReportsController (может объединять reportBuchWeekController, reportBuchEndOpController, reportBuchMonthController, reportZakazController)**

- **genBuchWeek()** - генерация недельного отчета для бухгалтерии.
- **checkStatusChanges()**, **genBuchEndOp()** - проверка изменений статуса для отчетов по завершении операций.
- **genBuchMonth()** - генерация месячного отчета для бухгалтерии.
- **genZayavInstr()** - создание заявки на инструмент.

---

## Связанные

- [[Frameworks]]
- [[Angular.js]]
- [[Express.js (2)]]
- [[Express.js]]
- [[Framework7 (2)]]
- [[Framework7]]
