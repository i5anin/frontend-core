# Composition API

## setup() и script setup

```js
// Вариант 1: setup() функция
export default {
  props: ['title'],
  setup(props, { emit, slots, attrs }) {
    const count = ref(0);
    const double = computed(() => count.value * 2);

    function increment() { count.value++; }

    // Обязательно возвращать
    return { count, double, increment };
  }
};
```

```html
<!-- Вариант 2: <script setup> — рекомендуется -->
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ title: String });
const emit = defineEmits(['update']);

const count = ref(0);
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
  emit('update', count.value);
}
</script>
```

## ref vs reactive

```js
import { ref, reactive, isRef, toRef, toRefs } from 'vue';

// ref — для примитивов и объектов, доступ через .value
const count = ref(0);
count.value++;
count.value = 42;

// reactive — только для объектов, без .value
const state = reactive({
  user: { name: 'Alice' },
  loading: false
});
state.user.name = 'Bob';
state.loading = true;

// Когда использовать?
// ref:      примитивы, одиночные значения
// reactive: связанные данные в одном объекте

// ВНИМАНИЕ: деструктуризация reactive теряет реактивность!
const { loading } = state;         // ❌ не реактивно
const { loading } = toRefs(state); // ✅ реактивно (возвращает Ref)
```

## computed

```js
import { ref, computed } from 'vue';

const first = ref('Alice');
const last = ref('Smith');

// Только чтение
const fullName = computed(() => `${first.value} ${last.value}`);

// Чтение и запись
const fullName = computed({
  get: () => `${first.value} ${last.value}`,
  set: (val) => {
    [first.value, last.value] = val.split(' ');
  }
});
```

## watch и watchEffect

```js
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);
const user = reactive({ name: 'Alice' });

// watch — явное указание зависимостей
watch(count, (newVal, oldVal) => {
  console.log(`${oldVal} → ${newVal}`);
}, { immediate: true });

// watch объект — нужен deep для вложенных свойств
watch(user, (newVal) => { console.log(newVal); }, { deep: true });

// watch несколько источников
watch([count, () => user.name], ([newCount, newName]) => {
  console.log(newCount, newName);
});

// watchEffect — автоматически отслеживает зависимости
watchEffect(() => {
  // Вызывается при изменении count.value или user.name
  console.log(count.value, user.name);
});

// Остановить наблюдение
const stop = watch(count, () => {});
stop(); // больше не отслеживает
```

## Хуки жизненного цикла

```js
import {
  onMounted, onUpdated, onUnmounted,
  onBeforeMount, onBeforeUpdate, onBeforeUnmount,
  onErrorCaptured
} from 'vue';

export default {
  setup() {
    onMounted(() => {
      // DOM готов, можно работать с refs
    });

    onUnmounted(() => {
      // Очистка: таймеры, обработчики, соединения
    });

    onErrorCaptured((err, component, info) => {
      // Перехват ошибок дочерних компонентов
      return false; // остановить распространение
    });
  }
};
```

## Composables — переиспользование логики

```js
// useFetch.js
import { ref } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function fetch() {
    loading.value = true;
    try {
      const res = await window.fetch(url);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, fetch };
}
```

```js
// В компоненте
import { useFetch } from './useFetch';
import { onMounted } from 'vue';

const { data: users, loading, error, fetch } = useFetch('/api/users');
onMounted(() => fetch());
```
