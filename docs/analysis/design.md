# Проектирование

## Процесс проектирования

```
Требования → Архитектура → Детальное проектирование → Реализация
```

Проектирование — это принятие решений **до** написания кода. Хорошее проектирование снижает стоимость изменений в будущем.

---

## Выбор архитектурного подхода

### Монолит vs Микросервисы (Frontend)

```
Монолит (Monorepo SPA):
- Один репозиторий, одно приложение
- Просто в разработке и деплое
- Подходит для небольших команд

Микрофронтенды:
- Несколько независимых приложений
- Независимый деплой команд
- Сложнее в интеграции
```

### Feature-Sliced Design (FSD)

```
src/
├── app/        ← инициализация, провайдеры
├── pages/      ← страницы приложения
├── widgets/    ← составные блоки из features
├── features/   ← бизнес-функции (добавить в корзину)
├── entities/   ← бизнес-сущности (Product, User, Cart)
└── shared/     ← утилиты, UI-kit, константы
```

**Правило зависимостей:** слои могут импортировать только ниже себя.

---

## Проектирование компонентов

### Atomic Design

```
Atoms → Molecules → Organisms → Templates → Pages

Atom:      Button, Input, Icon
Molecule:  SearchBar (Input + Button)
Organism:  Header (Logo + Nav + SearchBar)
Template:  PageLayout (Header + Content + Footer)
Page:      HomePage с реальными данными
```

### Принципы проектирования компонентов

```vue
<!-- ❌ Компонент, который знает слишком много -->
<ProductCard
  :userId="currentUser.id"
  @add-to-cart="cartStore.addItem"
/>

<!-- ✅ Компонент без бизнес-логики (presentational) -->
<ProductCard
  :product="product"
  @add-to-cart="$emit('add-to-cart', product)"
/>
```

**Разделение:**
- **Smart (Container) компоненты** — знают о store, API
- **Dumb (Presentational) компоненты** — только props и emits

---

## Проектирование State (состояния)

### Где хранить состояние?

```
Локальный state (ref/reactive):
- Данные нужны только одному компоненту
- UI состояние (открыт/закрыт, активный таб)

Родительский компонент (props):
- 2-3 уровня иерархии
- Нужно передать вниз на 1-2 уровня

Store (Pinia):
- Данные нужны в нескольких несвязанных компонентах
- Бизнес-данные (пользователь, корзина, настройки)

URL параметры:
- Состояние, которое должно сохраняться при обновлении
- Фильтры, сортировка, ID записи
```

### Нормализация данных в store

```js
// ❌ Денормализованные данные — дублирование
const state = {
  cart: [
    { id: 1, name: 'Phone', price: 999, quantity: 2 },
    { id: 1, name: 'Phone', price: 999, quantity: 1 } // дубль!
  ]
};

// ✅ Нормализованные данные
const state = {
  products: {
    1: { id: 1, name: 'Phone', price: 999 }
  },
  cart: {
    1: { productId: 1, quantity: 3 }
  }
};
```

---

## Проектирование API взаимодействия

### Repository Pattern

```ts
// Абстракция над API
interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  create(data: CreateProductDto): Promise<Product>;
  update(id: number, data: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<void>;
}

class ApiProductRepository implements ProductRepository {
  async getAll() {
    const { data } = await axios.get('/api/products');
    return data;
  }
  // ...
}

// В тестах легко заменить на мок
class MockProductRepository implements ProductRepository {
  async getAll() { return mockProducts; }
}
```

### Service Layer

```ts
// Бизнес-логика отделена от HTTP
class CartService {
  constructor(private cartRepo: CartRepository, private productRepo: ProductRepository) {}

  async addItem(productId: number, quantity: number) {
    const product = await this.productRepo.getById(productId);
    if (product.stock < quantity) throw new Error('Недостаточно товара');
    return this.cartRepo.addItem({ productId, quantity });
  }
}
```

---

## UML диаграммы

### Диаграмма классов

```
┌─────────────────┐       ┌─────────────────┐
│     User        │       │     Order       │
├─────────────────┤  1..* ├─────────────────┤
│ id: number      │───────│ id: number      │
│ name: string    │       │ userId: number  │
│ email: string   │       │ status: string  │
├─────────────────┤       ├─────────────────┤
│ getOrders()     │       │ getItems()      │
└─────────────────┘       └─────────────────┘
```

### Диаграмма последовательностей

```
User     Browser      API       DB
 │           │           │         │
 │──click──▶ │           │         │
 │           │──POST /──▶│         │
 │           │           │──query─▶│
 │           │           │◀─result─│
 │           │◀──200 ───│         │
 │◀─update──│           │         │
```

---

## Проектирование ошибок и состояний

```ts
// Типы состояний для каждого async запроса
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Явные состояния лучше флагов
type RequestState = 'idle' | 'loading' | 'success' | 'error';
```

```vue
<template>
  <Spinner v-if="state === 'loading'" />
  <ErrorMessage v-else-if="state === 'error'" :message="error" />
  <ProductList v-else-if="state === 'success'" :products="products" />
  <EmptyState v-else />
</template>
```

---

## Чеклист проектирования

```
Перед началом реализации убедиться:
□ Понятны все требования и граничные случаи
□ Выбрана подходящая архитектура (FSD / Atomic / другая)
□ Определена структура компонентов
□ Спроектирован state (что где хранится)
□ Определены API-контракты (endpoints, типы)
□ Продуманы состояния ошибок и загрузки
□ Оценена трудоёмкость задач
```
