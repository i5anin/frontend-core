---
tags:
  - веб-разработка
  - vue
  - html
created: 2024-10-16
date: 2024-10-16
---
Для написания универсальных компонентов во Vue 3, придерживайся следующих рекомендаций:

1. **Параметризация через [props](./props)**:
   Используй [props](./props) для передачи данных в компонент. Это позволяет сделать компонент гибким и переиспользуемым.

   ```html
   <template>
     <button 
     :class="btnClass" 
     @click="handleClick">{{ label }}
     </button>
   </template>

   <script>
   export default {
     props: {
       label: {
         type: String,
         required: true
       },
       type: {
         type: String,
         default: 'button'
       }
     },
     computed: {
       btnClass() {
         return `btn-${this.type}`;
       }
     },
     methods: {
       handleClick() {
         this.$emit('click');
       }
     }
   }
   </script>
   ```

2. **Слоты для гибкости**:
   Используй слоты, чтобы позволить пользователю компонента передавать контент внутрь.

   ```html
   <template>
     <div class="card">
       <slot name="header"></slot>
       <div class="card-body">
         <slot></slot>
       </div>
       <slot name="footer"></slot>
     </div>
   </template>
   ```

3. **[Emit](#) событий**:
   Для взаимодействия между компонентом и родительским элементом используй события через [emit](#).

   ```html
   <template>
     <input @input="$emit('update:modelValue', $event.target.value)" :value="modelValue" />
   </template>

   <script>
   export default {
     props: ['modelValue']
   }
   </script>
   ```

4. **Переиспользование логики с [composables](#)**:
   Если нужна общая логика между компонентами, выноси её в функции через [../../Vue/Composition API](#).

   ```js
   export function useToggle(initialValue = false) {
     const state = ref(initialValue);
     function toggle() {
       state.value = !state.value;
     }
     return { state, toggle };
   }
   ```

   Использование:

   ```html
   <template>
     <button @click="toggle">{{ isToggled ? 'On' : 'Off' }}</button>
   </template>

   <script>
   import { useToggle } from '@/composables/useToggle';

   export default {
     setup() {
       const { state: isToggled, toggle } = useToggle();
       return { isToggled, toggle };
     }
   }
   </script>
   ```

5. **Контролируй стили через классы или [CSS](./CSS)-переменные**:
   Сделай компонент настраиваемым через классы или [CSS](./CSS)-переменные, чтобы пользователи могли легко изменять внешний вид компонента.

   ```html
   <template>
     <div class="box" :style="{ '--box-color': color }">
       <slot></slot>
     </div>
   </template>

   <script>
   export default {
     props: {
       color: {
         type: String,
         default: 'blue'
       }
     }
   }
   </script>

   <style scoped>
   .box {
     background-color: var(--box-color);
     padding: 1rem;
     border-radius: 5px;
   }
   </style>
   ```

Эти подходы помогут тебе создавать универсальные компоненты, которые легко адаптируются для разных сценариев использования.

---

## Связанные

- [[Advanced]]
- [[Vue.js архитектура структуры]]
- [[Vue.js архитектура структуры2]]
- [[Привязка повторяющегося кода]]
- [[универсальные компоненты Vue 3]]
