Grid — двумерная система раскладки, позволяющая управлять строками и колонками одновременно. Подходит для сложных макетов, сеток, лендингов и адаптивной структуры страницы.

**Включение grid-контейнера**

```css
.container {
  display: grid;
}
```

**Определение колонок и строк**  
`grid-template-columns` и `grid-template-rows` задают структуру:

```css
grid-template-columns: 200px 1fr 200px;
grid-template-rows: auto 1fr auto;
```

Поддерживаются единицы: `px`, `%`, `fr`, `min-content`, `max-content`, `minmax()`.

Пример автоадаптивной сетки:

```css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

**Gap**  
Расстояния между строками и колонками:

```css
gap: 20px;
```

**Размещение элементов**  
`grid-column` и `grid-row` управляют позицией:

```css
item {
  grid-column: 1 / 3; /* от 1-й до 3-й колонки */
  grid-row: 2 / span 2; /* занять 2 строки */
}
```

**Автоматическое размещение**  
`grid-auto-flow`:  
`row`, `column`, `dense` (плотная укладка).

**Выравнивание**  
`justify-items`, `align-items` — внутри ячеек.  
`justify-content`, `align-content` — вся сетка.

**Особенности поведения**

- Grid работает в **двух измерениях**, в отличие от Flexbox.
    
- Макет можно определить полностью на контейнере, без стилей на элементах.
    
- Фракции `fr` автоматически распределяют свободное пространство.
    
- `auto-fill` и `auto-fit` позволяют строить резиновые галереи и адаптивные карточки.
    
- Grid создаёт более предсказуемую структуру, чем flex, при сложном дизайне.
    

**Типичные паттерны**

Карточная сетка:

```css
display: grid;
gap: 24px;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

Базовый лендинг:

```css
display: grid;
grid-template-columns: 200px 1fr;
grid-template-rows: auto 1fr auto;
```

Grid — основной инструмент для построения современного сложного интерфейсного layout'a с точным контролем над геометрией и адаптивностью.