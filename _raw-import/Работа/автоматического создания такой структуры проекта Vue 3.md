---
tags:
  - веб-разработка
  - vue
  - javascript
  - git
  - npm
created: 2024-12-18
date: 2024-12-18
---
Для автоматического создания такой структуры проекта Vue 3 с описанием компонентов, их зависимостей и взаимодействий, я рекомендую использовать следующие инструменты:

---

****1. Madge** (Для анализа и визуализации зависимостей файлов)**

- **Почему использовать:**  
    Madge может построить граф зависимостей между файлами и показать связь между `App.vue`, дочерними компонентами и другими модулями, такими как `APIService.js`.
    
- **Как настроить:**
    
    1. Установите Madge:
        
        ```bash
        npm install -g madge
        ```
        
    2. Запустите анализ:
        
        ```bash
        madge src/ --json > dependencies.json
        ```
        
    3. Преобразуйте JSON-вывод в читаемую структуру или граф.

[GitHub: Madge](https://github.com/pahen/madge)

---

****2. vue-docgen-cli** (Для создания документации по Vue-компонентам)**

- **Почему использовать:**  
    Автоматически извлекает информацию о компонентах, их props, событиях, методах и слотов.
    
- **Как настроить:**
    
    1. Установите vue-docgen-cli:
        
        ```bash
        npm install -g vue-docgen-cli
        ```
        
    2. Генерируйте документацию:
        
        ```bash
        vue-docgen src/**/*.vue --out component-docs/
        ```
        
    3. Откройте сгенерированные файлы Markdown, чтобы увидеть описания и зависимости компонентов.

[GitHub: vue-docgen-cli](https://github.com/vue-styleguidist/vue-docgen-cli)

---

****3. Dependency Cruiser** (Для анализа зависимостей и структуры проекта)**

- **Почему использовать:**  
    Dependency Cruiser может выявить связи между файлами, включая `App.vue`, `UserList.vue`, `APIService.js` и Pinia Store, с возможностью настроить описание в текстовом формате.
    
- **Как настроить:**
    
    1. Установите Dependency Cruiser:
        
        ```bash
        npm install -g dependency-cruiser
        ```
        
    2. Запустите анализ с выводом в текстовый формат:
        
        ```bash
        depcruise src/ --output-type text > structure.txt
        ```
        
    3. Отредактируйте файл `structure.txt`, чтобы получить формат, похожий на требуемый.

[GitHub: Dependency Cruiser](https://github.com/sverweij/dependency-cruiser)

---

****4. Custom Script (Скрипт для кастомного описания)****

- Если требуемый формат специфичен, можно написать свой скрипт на Node.js для автоматического анализа файлов и генерации документации.

**Пример скрипта:**

```javascript
const fs = require('fs');
const path = require('path');

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  const structure = files.map(file => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      return { [file]: scanDirectory(filePath) };
    } else if (file.endsWith('.vue')) {
      return analyzeVueFile(filePath);
    }
    return null;
  }).filter(Boolean);
  return structure;
}

function analyzeVueFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const name = path.basename(filePath);
  const dependencies = [];
  if (content.includes('import')) {
    const matches = content.match(/import\s+.*\s+from\s+['"](.*)['"]/g) || [];
    matches.forEach(match => {
      const dep = match.match(/from\s+['"](.*)['"]/);
      if (dep) dependencies.push(dep[1]);
    });
  }
  return {
    name,
    dependencies,
  };
}

const projectStructure = scanDirectory('./src');
fs.writeFileSync('structure.json', JSON.stringify(projectStructure, null, 2));
console.log('Project structure saved to structure.json');
```

Запустите скрипт:

```bash
node analyze.js
```

Этот скрипт создаст файл `structure.json` с информацией о компонентах и их зависимостях.

---

****5. Дополнительно: Визуализация****

Если нужно визуализировать дерево компонентов:

- **D3.js** или **Graphviz** (работает с выводом Madge и Dependency Cruiser).
- Преобразуйте JSON-вывод в граф:
    
    ```bash
    depcruise src/ --output-type dot | dot -Tpng > project-graph.png
    ```
    

---

**Итоговая рекомендация**

- Для автоматической структуры: **Madge** или **Dependency Cruiser**.
- Для описания компонентов: **vue-docgen-cli**.
- Для кастомизации: свой скрипт или их комбинирование.

---

## Связанные

- [[Tools]]
- [[библиотеки и инструменты, которые могут просканировать ваш проект Vue 3]]
