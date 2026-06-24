---
tags:
  - веб-разработка
  - vue
  - javascript
  - api
  - ui-ux
created: 2025-03-22
date: 2025-03-22
---
**📌 Диагноз: можешь временно оставить в `shared/ui`, но с условиями**

На основе анализа твоего кода — **бизнес-логики минимум**, всё, что там есть — это:

- локальное состояние (`selectedRow`, `isModalVisible`)
    
- сортировка (`handleSort`)
    
- отображение статуса и модалка
    
- нормализация заголовков (`permissions`, `showStatusColumn`)
    

Это всё **не нарушает принципов `shared/ui`**, если:

- **функции `formatValue`, `getTextAlignment`, `watch`, `handleSort`** — извлекаются
    
- **модалка `EditModal`** — оформляется как отдельный `shared/ui` компонент
    
- и ты избегаешь доступа к API или хранения состояния в компоненте
    

---

## ✅ Что делать **прямо сейчас**

**1. Расположи так:**

```
shared/
├── ui/
│   ├── BaseTable.vue               ← простейший шаблон
│   ├── ClientTable.vue             ← если только визуал + computed
│   └── ServerTable.vue             ← твоя текущая таблица (временно)
├── lib/
│   ├── formatValue.js
│   └── getTextAlignment.js
├── model/
│   └── useTableLoader.js           ← перенеси watch → ref + watch сюда
```

---

## 🧩 Что вытащить из `DataTable.vue`

|Что|Куда перенести|
|---|---|
|`formatValue`|`shared/lib/formatValue.js`|
|`getTextAlignment`|`shared/lib/getTextAlignment.js`|
|`watch(items)`|`shared/model/useTableLoader.js`|
|`handleSort`|`shared/model/useSortTable.js` (если сложнее станет)|
|`EditModal`|`shared/ui/EditModal.vue`|

---

## 🚨 Важное правило

Если в будущем:

- появится `useQuery()` внутри;
    
- появится `emit('save')` с валидацией;
    
- появятся внешние зависимости на `store`, `session`, `route`…
    

❌ немедленно **вынеси в `widgets/SmartTable/`**  
или даже `features/edit-table/`.

---

## ✅ Заключение

|Пункт|Статус|
|---|---|
|Много бизнес-логики|❌ Нет|
|Привязка к API или auth|❌ Нет|
|Повторное использование|✅ Да|
|Вызывается `useQuery`, `store`|❌ Нет|
|Можно временно в `shared/ui`|✅ Да, с выносом логики|

---

Хочешь — могу:

- 📦 Сделать тебе шаблон `BaseTable` + `ClientTable` + `ServerTable`
    
- 🧩 Сделать `widget/UserTable` и миграционный README
    

Нужно?

---

## Связанные

- [[FSD]]
- [[3 главные проблемы FSD]]
- [[Feature-Sliced Design (FSD), SOLID и ООП]]
- [[Feature-Sliced Design – альтернативный подход к организации кода приложений]]
- [[FSD для моего проекта таблиц]]
- [[FSD под Telegram-бота]]
