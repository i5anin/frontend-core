---
tags:
  - веб-разработка
  - javascript
  - api
  - state-management
created: 2023-06-10
date: 2023-06-10
---
[Pinia](./Pinia)
```js
// Импортируем необходимые функции из 
import { defineStore } from 'pinia'

// Импортируем API для работы с инструментами
import { toolApi } from '@/api'

// Импортируем API для работы с деревом инструментов
import { toolTreeApi } from '@/modules/tools/tree/api/tree'

// Экспортируем Store
export const useEditorToolStore = defineStore('editorToolStore', {
  // Определяем состояние Store
  state: () => ({
    isLoading: false, // Флаг загрузки данных
    parentCatalog: { id: 1, label: null },  // Данные о родительской категории
    dynamicFilters: [],   // Список динамических фильтров
    nameOptions: [], // Опции для выбора имени (не используется в текущем коде)
    tool: null, // Текущий инструмент (детальная информация)
    tools: [], // Список инструментов
    toolsTotalCount: 0, // Общее количество инструментов

    // Фильтры для поиска и сортировки инструментов
    filters: {
      currentPage: 1,   // Номер текущей страницы
      itemsPerPage: 15, // Количество элементов на странице
      search: '',  // Строка поиска
      includeNull: false, // Включить null значения
      onlyInStock: null,  // Фильтр "Только в наличии" 
      selectedDynamicFilters: {},  // Выбранные динамические фильтры
    },
    tree: [],  // Дерево каталога
    currentItem: null, // Текущий элемент дерева
  }),

  // Определяем действия (actions) Store
  actions: {
    // Загружает дерево категорий
    async fetchTree() {
      try {
        // Вызываем API для получения дерева инструментов
        const toolsTree = await toolTreeApi.getTree()

        // Если дерево загружено успешно
        if (toolsTree && toolsTree.length > 0) {
          // Обновляем состояние Store
          this.tree = toolsTree
          this.currentItem = toolsTree[0]
        }
      } catch (error) {
        // Выводим сообщение об ошибке в консоль
        console.error('Ошибка при получении дерева инструментов:', error)
      }
    },

    // Обновляет дерево категорий
    async refreshTree() {
      await this.fetchTree()
    },

    // Добавляет папку в дерево
    async addFolderToTree(id, label) {
      // Создаем новую папку
      const newFolder = {
        id,
        label,
        elements: 0,
        available: 0,
        nodes: [],
        totalAvailable: 0,
        totalElements: 0,
      }

      // Добавляем папку в текущую ветку дерева
      this.currentItem.nodes.push(newFolder)

      // Устанавливаем текущую папку
      this.currentItem = newFolder

      // Добавляем папку в основное дерево
      this.tree.push(newFolder)
    },

    // Переименовывает папку в дереве
    async renameFolderInTree(id, label) {
      // Находим папку по идентификатору
      const folder = this.findFolderById(id)

      // Если папка найдена, переименовываем ее
      if (folder) {
        folder.label = label
      }
    },

    // Переходит на уровень вверх в дереве
    goBackInTree() {
      // Если в дереве есть более одного элемента
      if (this.tree.length > 1) {
        // Удаляем последний элемент из дерева
        this.tree.pop()

        // Устанавливаем текущий элемент как последний в дереве
        this.currentItem = this.tree[this.tree.length - 1]
      }
    },

    // Находит папку по идентификатору
    findFolderById(id, nodes = this.tree) {
      // Итерируем по узлам дерева
      for (const node of nodes) {
        // Если найден узел с совпадающим идентификатором
        if (node.id === id) {
          return node
        }

        // Если у узла есть дочерние узлы
        if (node.nodes) {
          // Рекурсивно ищем папку в дочерних узлах
          const found = this.findFolderById(id, node.nodes)

          // Если папка найдена, возвращаем ее
          if (found) {
            return found
          }
        }
      }

      // Если папка не найдена
      return null
    },

    // Загружает информацию об инструменте по идентификатору
    async fetchToolById(id) {
      try {
        // Вызываем API для получения информации об инструменте
        this.tool = await toolApi.getToolById(id)
      } catch (error) {
        // Выводим сообщение об ошибке в консоль
        console.error('Ошибка при загрузке инструмента:', error)
      }
    },

    // Загружает динамические фильтры для инструментов
    async fetchToolsDynamicFilters() {
      console.log('fetchToolsDynamicFilters')
      // Получаем id родительской категории
      const { id = null } = this.parentCatalog

      // Если id не задан, выходим из функции
      if (id === null) {
        return
      }

      try {
        // Вызываем API для получения динамических фильтров
        const dynamicFilters = await toolApi.filterParamsByParentId(id)

        // Инициализируем selectedDynamicFilters с null значениями для каждого фильтра
        this.filters.selectedDynamicFilters = dynamicFilters.reduce(
          (acc, { key }) => ({ ...acc, [key]: null }),
          {}
        )

        // Обновляем список динамических фильтров
        this.dynamicFilters = dynamicFilters
      } catch (e) {
        // Выводим сообщение об ошибке в консоль
        console.error('Ошибка при загрузке динамических фильтров:', e)
      }
    },

    // Загружает список инструментов с учетом фильтрации
    async fetchToolsByFilter() {
      // Устанавливаем флаг загрузки
      this.isLoading = true

      // Очищаем список инструментов
      this.tools = []

      try {
        // Получаем значения фильтров
        const {
          currentPage,
          itemsPerPage,
          search,
          includeNull,
          onlyInStock,
          selectedDynamicFilters,
        } = this.filters

        // Получаем id родительской категории
        const { id: parentId } = this.parentCatalog

        // Вызываем API для получения инструментов с учетом фильтров
        const { tools, totalCount } = await toolApi.getTools(
          search,
          currentPage,
          itemsPerPage,
          includeNull,
          parentId,
          onlyInStock,
          // Преобразуем selectedDynamicFilters в формат, необходимый для API
          Object.entries(selectedDynamicFilters).reduce(
            (acc, [key, value]) => ({ ...acc, [`param_${key}`]: value }),
            {}
          )
        )

        // Обновляем список инструментов и общее количество инструментов
        this.tools = tools
        this.toolsTotalCount = totalCount
      } catch (error) {
        // Выводим сообщение об ошибке в консоль
        console.error('getTools. Ошибка при получении данных:', error)
      } finally {
        // Снимаем флаг загрузки
        this.isLoading = false
      }
    },

    // Устанавливает строку поиска
    setSearch(search) {
      this.filters.search = search
    },

    // Устанавливает родительскую категорию
    setParentCatalog(parentCatalog) {
      this.parentCatalog = { ...parentCatalog }
      this.currentItem.id = parentCatalog.id // Добавлено обновление currentItem.id
    },

    // Устанавливает список динамических фильтров
    setDynamicFilters(dynamicFilters) {
      this.dynamicFilters = dynamicFilters
    },

    // Устанавливает выбранные динамические фильтры
    setSelectedDynamicFilters(selectedDynamicFilters) {
      this.filters.selectedDynamicFilters = selectedDynamicFilters
    },

    // Устанавливает флаг загрузки
    setIsLoading(isLoading) {
      this.isLoading = isLoading
    },

    // Устанавливает номер текущей страницы
    setCurrentPage(page) {
      this.filters.currentPage = page
    },

    // Устанавливает фильтры
    setFilters(filters) {
      this.filters = { ...filters }
    },

    // Устанавливает текущий инструмент
    setTool(tool) {
      this.tool = tool
    },

    // Устанавливает количество элементов на странице
    setItemsPerPage(itemsPerPage) {
      this.filters.itemsPerPage = itemsPerPage
    },

    // Устанавливает общее количество инструментов
    setToolsTotalCount(toolTotalCount) {
      this.toolsTotalCount = toolTotalCount
    },

    // Устанавливает список инструментов
    setTools(tools) {
      this.tools = tools
    },

    // Переходит к элементу в дереве по индексу
    goToInTree(index) {
      this.currentItem = this.tree[index]
      this.tree = this.tree.slice(0, index + 1)
      this.currentItem.id = this.currentItem.id // Добавлено обновление currentItem.id
    },

    // Выбирает элемент в дереве
    selectItemInTree(item) {
      this.currentItem = item
      this.parentCatalog.id = item.id
      this.currentItem.id = item.id // Добавлено обновление currentItem.id
      if (!this.tree.includes(item)) {
        this.tree.push(item)
      }
    },
  },

  // Определяем геттеры (getters) Store
  getters: {
    // Возвращает данные о родительской категории
    getParentCatalog: (state) => state.parentCatalog,

    // Возвращает список динамических фильтров
    getDynamicFilters: (state) => state.dynamicFilters,

    // Возвращает фильтры
    getFilters: (state) => ({ ...state.filters }),

    // Возвращает информацию о текущем инструменте
    getTool: (state) => {
      if (state.tool) {
        return {
          ...state.tool,
          property: state.tool.property,
          parent_id: state.tool.parent_id,
          folder_name: state.tool.folder_name,
        }
      }
      return null
    },

    // Возвращает список инструментов
    getTools: (state) => [...state.tools],

    // Форматирует список инструментов
    getFormattedTools: (state) =>
      state.tools.map((tool) => ({
        ...tool,
        // Извлекает значения свойств из объекта property
        ...Object.entries(tool.property).reduce(
          (acc, [key, { value }]) => ({ ...acc, [key]: value }),
          {}
        ),
      })),

    // Возвращает флаг загрузки
    getIsLoading: (state) => state.isLoading,

    // Возвращает опции для выбора имени (не используется в текущем коде)
    getNameOptions: (state) => state.nameOptions,

    // Возвращает общее количество инструментов
    getToolsTotalCount: (state) => state.toolsTotalCount,

    // Возвращает текущий элемент дерева
    getCurrentItem: (state) => state.currentItem,

    // Возвращает дерево категорий
    getTree: (state) => state.tree,
  },
})
```

---

## Связанные

- [[store]]
- [[Стор пример pinia (2)]]
