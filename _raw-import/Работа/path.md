---
tags:
  - веб-разработка
  - javascript
  - nodejs
created: 2024-11-03
date: 2024-11-03
---
В Node.js модуль `path` предоставляет утилиты для работы с файловыми и каталоговыми путями. Он помогает манипулировать путями, обеспечивая кросс-платформенную совместимость, так как пути могут отличаться между операционными системами (например, Windows и UNIX).

**Основные методы модуля `path`**

1. **`path.join([...paths])`**: Соединяет несколько сегментов пути в один, нормализуя их. Этот метод автоматически добавляет разделители между сегментами.
   ```javascript
   const path = require('path');

   const filePath = path.join('folder', 'subfolder', 'file.txt');
   console.log(filePath); // 'folder/subfolder/file.txt' (на UNIX) или 'folder\subfolder\file.txt' (на Windows)
   ```

2. **`path.resolve([...paths])`**: Преобразует последовательность сегментов пути в абсолютный путь. Если путь не начинается с корня, он будет создан относительно текущей рабочей директории.
   ```javascript
   const absolutePath = path.resolve('folder', 'subfolder', 'file.txt');
   console.log(absolutePath); // Абсолютный путь к файлу
   ```

3. **`path.basename(path[, ext])`**: Возвращает последний сегмент пути. Если указан второй параметр, он будет удалён из конца имени файла, если совпадает.
   ```javascript
   const fileName = path.basename('/folder/subfolder/file.txt');
   console.log(fileName); // 'file.txt'
   ```

4. **`path.dirname(path)`**: Возвращает каталог, содержащий указанный путь.
   ```javascript
   const dirName = path.dirname('/folder/subfolder/file.txt');
   console.log(dirName); // '/folder/subfolder'
   ```

5. **`path.extname(path)`**: Возвращает расширение файла, если оно есть.
   ```javascript
   const extension = path.extname('file.txt');
   console.log(extension); // '.txt'
   ```

6. **`path.parse(path)`**: Разбирает путь на его составляющие и возвращает объект с такими свойствами, как `root`, `dir`, `base`, `ext` и `name`.
   ```javascript
   const parsedPath = path.parse('/folder/subfolder/file.txt');
   console.log(parsedPath);
   // {
   //   root: '/',
   //   dir: '/folder/subfolder',
   //   base: 'file.txt',
   //   ext: '.txt',
   //   name: 'file'
   // }
   ```

7. **`path.format(pathObject)`**: Формирует путь из объекта, созданного методом `path.parse()`.
   ```javascript
   const formattedPath = path.format({
     dir: '/folder/subfolder',
     name: 'file',
     ext: '.txt'
   });
   console.log(formattedPath); // '/folder/subfolder/file.txt'
   ```

8. **`path.isAbsolute(path)`**: Проверяет, является ли указанный путь абсолютным.
   ```javascript
   console.log(path.isAbsolute('/folder/subfolder/file.txt')); // true
   console.log(path.isAbsolute('folder/subfolder/file.txt')); // false
   ```

**Пример использования**

Вот пример, который демонстрирует использование различных методов `path`:

```javascript
const path = require('path');

const filePath = path.join('folder', 'subfolder', 'file.txt');
console.log('File Path:', filePath);

const absolutePath = path.resolve(filePath);
console.log('Absolute Path:', absolutePath);

console.log('Base Name:', path.basename(absolutePath));
console.log('Directory Name:', path.dirname(absolutePath));
console.log('File Extension:', path.extname(absolutePath));

const parsed = path.parse(absolutePath);
console.log('Parsed Path:', parsed);

const formatted = path.format(parsed);
console.log('Formatted Path:', formatted);

console.log('Is Absolute:', path.isAbsolute(absolutePath));
```

**Заключение**

Модуль `path` в Node.js является мощным инструментом для работы с путями к файлам и каталогам, предоставляя функции для нормализации, анализа и форматирования путей. Он особенно полезен в приложениях, которые взаимодействуют с файловой системой, гарантируя корректность работы с путями на разных операционных системах.

---

## Связанные

- [[JavaScript]]
- [[class]]
- [[const vs let vs var]]
- [[Cобеседования на позицию Junior JavaScript (2)]]
- [[Cобеседования на позицию Junior JavaScript]]
- [[float]]
