# Provide / Inject

## Проблема Props Drilling

```
App
 └── Page
       └── Section
             └── Widget
                   └── Button  ← нужен theme
```

Без provide/inject нужно передавать `theme` через все компоненты — это props drilling.

## Базовое использование

```js
// Родительский компонент (App.vue или любой предок)
import { provide } from 'vue';

export default {
  setup() {
    provide('theme', 'dark');
    provide('user', { name: 'Alice', role: 'admin' });
  }
};
```

```js
// Любой дочерний компонент (на любой глубине)
import { inject } from 'vue';

export default {
  setup() {
    const theme = inject('theme');           // 'dark'
    const theme2 = inject('theme', 'light'); // 'light' — default если нет
    const user = inject('user');

    return { theme, user };
  }
};
```

## Реактивный provide

```js
// App.vue
import { provide, ref, reactive } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const user = reactive({ name: 'Alice' });

    // Предоставляем реактивные данные
    provide('count', count);
    provide('user', user);

    // Предоставляем метод изменения
    provide('increment', () => count.value++);
  }
};
```

```js
// Дочерний компонент
export default {
  setup() {
    const count = inject('count');      // ref — реактивен!
    const increment = inject('increment');

    return { count, increment };
  }
};
```

## Readonly provide (защита от изменений)

```js
import { provide, readonly, ref } from 'vue';

export default {
  setup() {
    const state = ref('value');

    // Дочерние не могут менять напрямую
    provide('state', readonly(state));

    // Но могут вызвать метод изменения
    provide('setState', (val) => { state.value = val; });
  }
};
```

## Symbol ключи (для больших приложений)

```js
// keys.js — общий файл с ключами
export const ThemeKey = Symbol('theme');
export const UserKey = Symbol('user');
```

```js
// App.vue
import { ThemeKey, UserKey } from './keys';
provide(ThemeKey, 'dark');
provide(UserKey, user);
```

```js
// Button.vue
import { ThemeKey } from './keys';
const theme = inject(ThemeKey);
```

## Options API вариант

```js
// Родитель
export default {
  provide() {
    return {
      theme: this.currentTheme,  // НЕ реактивно
      // Для реактивности:
      // theme: computed(() => this.currentTheme)
    };
  }
};

// Дочерний
export default {
  inject: ['theme'],
  // или с default:
  inject: {
    theme: { default: 'light' }
  }
};
```

## Когда использовать

✅ **Используйте provide/inject для:**
- Глобальная тема (dark/light)
- Данные текущего пользователя
- Конфигурация компонентов-библиотек
- Шина событий внутри дерева

❌ **Не используйте для:**
- Данных которые нужны 1-2 уровня вниз (лучше props)
- Глобального состояния приложения (лучше Pinia)
