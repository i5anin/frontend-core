---
tags:
  - веб-разработка
  - vue
  - html
  - api
created: 2024-09-09
date: 2024-09-09
---
```html
<table id="orderTable">
	<thead>
		<tr>
			<th 
        v-for="field in filteredTableFields" 
        :key="field.name">
        {{ field.title }}
        </th>
		</tr>
	</thead>
	<tbody>
		<tr 
      v-for="row in nomtable" 
      :key="row.ordersnom_id">
			<td 
        v-for="field in filteredTableFields" 
        :key="field.name">
				<span 
          v-if="field.name === 'statuses'" 
          v-html="renderStatus(row)"></span>
				<span v-else>{{ row[field.name] }}</span>
			</td>
		</tr>
	</tbody>
</table>  
```

filteredTableFields = [ field.name ]

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
