---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
  - api
created: 2024-10-11
date: 2024-10-11
---
# [Vue.js](./Basics — Vue.js) component

## [](https://datatables.net/blog/2022/vue#Complete-documentation)Complete documentation

Документация по использованию компонента `datatables.net-vue3` теперь доступна [в руководстве по DataTables](https://datatables.net/manual/vue). Пожалуйста, ознакомьтесь с этой документацией для получения наиболее подробной информации.

[Vue.js](https://vuejs.org/) - это интерфейсный Javascript-фреймворк, который широко используется для создания реактивных веб-приложений. Это неизменно [один из самых популярных](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks) фреймворков в мире, и в этом посте я представлю пакет [`datatables.net-vue3`](https://npmjs.com/package/datatables.net-vue3), который предоставляет таблицы данных для использования в качестве компонента в приложениях Vue3.

Хотите сразу погрузиться в код с примерами? Это блог о программировании, конечно, вы это делаете! В следующих примерах показаны таблицы данных, используемые в приложении Vue3 на [Stackblitz](https://stackblitz.com/), что позволяет нам запускать все приложение на основе Node.js. В примерах для процесса сборки используются [API composition  Vue3](https://vuejs.org/api/composition-api-setup.html) и [Vite](https://vitejs.dev/).

- [Simple DataTable with local data](https://stackblitz.com/edit/datatables-net-vue3-simple?file=src%2FApp.vue)
- [Ajax loaded data](https://stackblitz.com/edit/datatables-net-vue3-ajax?file=src%2FApp.vue)
- [Using DataTables' Extensions](https://stackblitz.com/edit/datatables-net-vue3-extensions?file=src%2FApp.vue)
- [Reactive data](https://stackblitz.com/edit/datatables-net-vue3-reactive?file=src%2FApp.vue)
- [Styling with Bootstrap 5](https://stackblitz.com/edit/datatables-net-vue3-bootstrap5?file=src%2FApp.vue)

## [](https://datatables.net/blog/2022/vue#Installation)Installation

First thing to do is install the `datatables.net-vue3` application with:

[Plain text](https://datatables.net/blog/2022/vue#)

```cmd
# npm
npm install --save datatables.net-vue3

# yarn
yarn add datatables.net-vue3
````

Пакет имеет зависимости от `datatables.net` и `jquery`, которые автоматически включаются в пакет, поэтому вам не нужны никакие другие пакеты, если вы просто хотите отобразить интерактивную таблицу.

Чтобы затем использовать этот компонент в своих собственных компонентах, импортируйте его с помощью:

[Javascript](https://datatables.net/blog/2022/vue#)

```
import DataTable from 'datatables.net-vue3';
```

это даст вам компонент Vue `<DataTable>`, который вы сможете использовать в своих шаблонах.


## Extensions

Вы также можете установить расширения DataTables из их собственных пакетов npm и использовать их стандартным образом - например, для Select, который вы могли бы использовать:

```
# npm
npm install --save datatables.net-select

# yarn
yarn add datatables.net-select
```

Каждое добавляемое расширение должно быть зарегистрировано в компоненте `DataTable`, что выполняется с помощью статического метода `DataTable.use()` в компоненте, например:

```js
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
DataTable.use(Select);
```

То же самое относится и ко всем другим расширениям DataTables. Используйте [конструктор загрузок](https://datatables.net/download), чтобы получить список пакетов npm для нужных вам расширений (а также пакеты для создания стилей - смотрите ниже).

## Use

Once installed and registered in your component you will have a `<DataTable>` component available - it as a single optional slot which can be used to describe the table with headers and footers:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8|`<``DataTable` `class``=``"display"``>`<br><br>    `<``thead``>`<br><br>        `<``tr``>`<br><br>            `<``th``>First</``th``>`<br><br>            `<``th``>Second</``th``>`<br><br>        `</``tr``>`<br><br>    `</``thead``>`<br><br>`</``DataTable``>`|

> Important: Do not use a Vue `for` statement to populate the table with data unless the data is static (i.e. not reactive). Doing so would cause both DataTables and Vue to try and control the same [DOM](./DOM) elements, resulting in unpredictable behaviour. Bind data using the `data` parameter!

The `<DataTable>` component has the following parameters available:

- `columns` - Define the columns array used for [DataTables initialisation](https://datatables.net/reference/option/#datatables%20-%20columns)
- `data` - [Data array for DataTables](https://datatables.net/reference/option/data). This is _optional_ and if you are using Ajax to load the DataTable data is not required.
- `ajax` - [Ajax option for DataTables](https://datatables.net/reference/option/ajax) - to load data for the table over Ajax.
- `class` - Class name to assign to the `table` tag
- `options` - The [DataTables options](https://datatables.net/reference/option) for the table. Note that this can include `columns`, `data` and `ajax` - if they are provided by one of the properties from above that will override a matching option given here.

**[](https://datatables.net/blog/2022/vue#Simple-example)Simple example**

The most basic example use of DataTables in a Vue application (Composition API) is:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22|`<``script` `setup` `lang``=``"ts"``>`<br><br>`import DataTable from 'datatables.net-vue3';`<br><br>`import DataTablesCore from 'datatables.net';`<br><br>`DataTable.use(DataTablesCore);`<br><br>`const data = [`<br><br>  `[1, 2],`<br><br>  `[3, 4],`<br><br>`];`<br><br>`</``script``>`<br><br>`<``template``>`<br><br>    `<``DataTable` `:data``=``"data"` `class``=``"display"``>`<br><br>        `<``thead``>`<br><br>            `<``tr``>`<br><br>                `<``th``>A</``th``>`<br><br>                `<``th``>B</``th``>`<br><br>            `</``tr``>`<br><br>        `</``thead``>`<br><br>    `</``DataTable``>`<br><br>`</``template``>`|

You can see this [live on Stackblitz](https://stackblitz.com/edit/datatables-net-vue3-simple?file=src%2FApp.vue).

**[](https://datatables.net/blog/2022/vue#Ajax-data-example)Ajax data example**

You might wish to load data for the table to display via Ajax rather than using local Vue data. That can be done with the `ajax` parameter directed at the URL to load the data from:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6|`<``DataTable`<br><br>    `:columns``=``"columns"`<br><br>    `ajax``=``"/data.json"`<br><br>    `class``=``"display"`<br><br>    `width``=``"100%"`<br><br>`/>`|

I've shortened the boiler plate code in the above for brevity. [This example has the full code and running example](https://stackblitz.com/edit/datatables-net-vue3-ajax?file=src%2FApp.vue) including demonstrating how to use object properties to populate the table via the [`columns.data`](https://datatables.net/reference/option/columns.data) option.

**[](https://datatables.net/blog/2022/vue#Extensions-example)Extensions example**

I showed above how to install and register a DataTables extension. Once they are registered they can be used in the standard DataTables way, through their initialisation options. In this example we initialise the Select extension using the [`select`](https://datatables.net/reference/option/select) option:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7|`<``DataTable`<br><br>    `:columns``=``"columns"`<br><br>    `:options``=``"{select: true}"`<br><br>    `ajax``=``"/data.json"`<br><br>    `class``=``"display"`<br><br>    `width``=``"100%"`<br><br>`/>`|

Again for brevity I've shorted the code here, but the [full working example can be seen here](https://stackblitz.com/edit/datatables-net-vue3-extensions?file=src%2FApp.vue).

## [](https://datatables.net/blog/2022/vue#Reactive-data)Reactive data

One for the most exciting and useful parts of Vue is [Reactive data](https://vuejs.org/guide/essentials/reactivity-fundamentals.html). In summary this is where you update data (e.g. `variable = 1`) the UI will automatically update to reflect this change - however complex that change might be. The `datatables.net-vue3` package fully supports Vue's reactive data and will automatically reflect the changes made to the data.

To demonstrate that, consider the following:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11|`<``button` `@``click``=``"add"``>Add new row</``button``><``br` `/>`<br><br>`<``button` `@``click``=``"update"``>Update selected rows</``button``><``br` `/>`<br><br>`<``button` `@``click``=``"remove"``>Delete selected rows</``button``>`<br><br>`<``DataTable`<br><br>    `class``=``"display"`<br><br>    `:columns``=``"columns"`<br><br>    `:data``=``"data"`<br><br>    `:options``=``"{ select: true }"`<br><br>    `ref``=``"table"`<br><br>`/>`|

You will see that we have three buttons which can perform actions on the `data` array that is bound to the `data` property. For `add()` our test function simply looks like:

[Javascript](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3|`function` `add() {`<br><br>  `data.value.push( ... );`<br><br>`}`|

Note how we don't need to tell DataTables about the new data through any method calls - it just updates automatically.

**[](https://datatables.net/blog/2022/vue#DataTables-API)DataTables API**

Update and delete are very similar in that we just manipulate the array of data, but we will need to access the DataTables API to know which rows have been selected by the end user. The `DataTable` component provides a `dt` value that we can use to get this via a Vue reference:

[Javascript](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6|`let` `dt;`<br><br>`const` `table = ref();`<br><br>`onMounted(``function` `() {`<br><br>  `dt = table.value.dt;`<br><br>`});`|

Now to delete a row we can simply get the data for the selected row using [`row().data()`](https://datatables.net/reference/api/row().data()), find it in the array and slice it out:

[Javascript](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6|`function` `remove() {`<br><br>  `dt.rows({ selected:` `true` `}).every(``function` `() {`<br><br>    `let` `idx = data.value.indexOf(``this``.data());`<br><br>    `data.value.splice(idx, 1);`<br><br>  `});`<br><br>`}`|

The update process is very similar and is shown in the [full working code example](https://stackblitz.com/edit/datatables-net-vue3-reactive?file=src%2FApp.vue).

It is important to note that we do not use the DataTables API methods to manipulate the data here - we just modify the underlying data and it reacts to those changes.

## [](https://datatables.net/blog/2022/vue#Styling)Styling

So far we have a working table, but we want it to look pretty and similar to the other components on our page. Thankfully DataTables' support for various styling libraries is equally easy to use in a Vue application. For example consider that we are using Bootstrap 5 - the rest of our page is Bootstrap 5 style based and our DataTable should reflect that. We have npm packages for DataTables core and all of its extensions that work with Bootstrap 5 (and other styling frameworks) - they end in `-bs5` (e.g. `datatables.net-bs5` for Bootstrap 5 and DataTables core). The default styling has the `-dt` postfix. See the [download builder](https://datatables.net/download) to get the styling packages needs for your preferred framework.

With the default styling simply install the styling package:

[Plain text](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5|`# npm`<br><br>`npm install --save datatables.net-dt`<br><br>`# yarn`<br><br>`yarn add datatables.net-dt`|

And then include it in your `<style>` tag (note that we are using Vite to build the package here, which will resolve CSS styles from node packages as well as Javascript, allowing this to work):

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3|`<``style``>`<br><br>`@import 'datatables.net-dt';`<br><br>`</``style``>`|

For the other styling frameworks, you need to also include a Javascript element, which configures DataTables and its extensions to use the styles and [DOM](./DOM) structure suitable for the framework selected - e.g. for Bootstrap 5:

[Plain text](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5|`# npm`<br><br>`npm install --save datatables.net-bs5`<br><br>`# yarn`<br><br>`yarn add datatables.net-bs5`|

And in your Vue component register the style in exactly the same way as you do with the extensions:

[HTML](https://datatables.net/blog/2022/vue#)

|   |   |
|---|---|
|1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20|`<``script` `setup` `lang``=``"ts"``>`<br><br>`import DataTable from 'datatables.net-vue3';`<br><br>`import DataTablesCore from 'datatables.net-bs5';`<br><br>`DataTable.use(DataTablesCore);`<br><br>`const columns = [`<br><br>  `{ data: 'name' },`<br><br>  `{ data: 'position' },`<br><br>  `{ data: 'office' },`<br><br>  `{ data: 'extn' },`<br><br>  `{ data: 'start_date' },`<br><br>  `{ data: 'salary' },`<br><br>`];`<br><br>`</``script``>`<br><br>`<``style``>`<br><br>`@import 'bootstrap';`<br><br>`@import 'datatables.net-bs5';`<br><br>`</``style``>`|

You can see [Vue + DataTables + Bootstrap 5 in action here](https://stackblitz.com/edit/datatables-net-vue3-bootstrap5?file=src%2FApp.vue).

## [](https://datatables.net/blog/2022/vue#Source)Source

The DataTables component for Vue is open source under the [MIT license](https://datatables.net/license/mit). The source [is available on Github](https://github.com/DataTables/Vue/).

## [](https://datatables.net/blog/2022/vue#Feedback)Feedback

We use Vue extensively in our [CloudTables configuration UI](https://cloudtables.com/) and this component builds upon that experience. However, as always, there will be room for improvement! [Get in touch](https://datatables.net/forums) with any suggestions and questions that you might have, or even just a little note to say that you are using it, so we can feed that back into our own development and documentation work. The likely next step for this component will be to formalise the documentation in our [manual](https://datatables.net/manual). Stay tuned for that and more.

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
