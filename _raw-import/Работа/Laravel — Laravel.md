---
tags:
  - веб-разработка
  - api
created: 2025-04-13
date: 2025-04-13
---
http://127.0.0.1:8000/clockwork/app

composer require itsgoingd/clockwork
обновить на стороне сервера


http://192.168.0.11:8002/clockwork/app
http://192.168.0.11:8002/api/tools

http://127.0.0.1:8002/api/tools

http://192.168.0.11:4000/api/tools


`php artisan serve --host=192.168.0.11 --port=8002`


работают параметры 
```php
    public function getTools(Request $request)
    {
        // Получение параметров из запроса
        $search = $request->query('search');
        $parentId = $request->query('parent_id');
        $onlyInStock = $request->query('onlyInStock');
        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 50);
        $offset = ($page - 1) * $limit;

        $query = ToolNom::query();

        // Добавление условий поиска
        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%");
        }
        if ($parentId) {
            $query->where('parent_id', $parentId);
        }
        if ($onlyInStock === 'true') {
            $query->where('sklad', '>', 0);
        }

        // Добавление динамических параметров
        collect($request->all())
            ->filter(function ($value, $key) {
                return str_starts_with($key, 'param_') && $value;
            })
            ->each(function ($value, $key) use ($query) {
                $paramId = str_after($key, 'param_');
                $query->whereRaw("CAST(property->>'{$paramId}' AS TEXT) = ?", [$value]);
            });

        // Получить общее количество элементов без ограничения
        $totalCount = $query->count();

        // Получить элементы с учетом пагинации и сортировки
        $tools = $query
            ->orderByRaw('sklad > 0 DESC, name')
            ->offset($offset)
            ->limit($limit)
            ->get(['id', 'name', 'property', 'sklad', 'norma', 'group_id', 'group_standard']);

        // Создать параметры property для ответа
        $formattedTools = $tools->map(function ($tool) {
            $properties = json_decode($tool->property, true);
            $tool->property = collect($properties)->mapWithKeys(function ($value, $key) {
                return [$key => ['info' => $this->paramInfo($key), 'value' => $value]];
            })->all();
            return $tool;
        });

        return response()->json([
            'currentPage' => $page,
            'itemsPerPage' => $limit,
            'totalCount' => $totalCount,
            'tools' => $formattedTools,
        ]);
    }

    protected function paramInfo($id)
    {
        static $params = null;

        if ($params === null) {
            $params = DB::table('tool_params')->pluck('info', 'id');
        }

        return $params[$id] ?? null;
    }

```
работает поиск 
```php
    public function getTools(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Объединяем параметры из запроса
            $params = array_merge($request->query(), $request->input());

            $search = $params['search'] ?? null;
            $parentId = $params['parent_id'] ?? null;
            $onlyInStock = $params['onlyInStock'] ?? null;
            $page = $params['page'] ?? 1;
            $limit = $params['limit'] ?? 50;
            $offset = ($page - 1) * $limit;

            $conditions = [];

            // Обработка стандартных условий
            if ($search) {
                $conditions[] = "tool_nom.name LIKE '%{$search}%'";
            }
            if ($parentId) {
                $conditions[] = "tool_nom.parent_id = {$parentId}";
            }
            if ($onlyInStock === 'true') {
                $conditions[] = "tool_nom.sklad > 0";
            }

            // Обработка динамических условий
            $dynamicParams = collect($params)->filter(function ($value, $key) {
                return str_starts_with($key, 'param_') && $value;
            })->map(function ($value, $key) {
                $paramId = explode('_', $key)[1];
                return "tool_nom.property->>'{$paramId}' = '{$value}'";
            })->toArray();

            $conditions = array_merge($conditions, $dynamicParams);

            $whereClause = count($conditions) > 0 ? 'WHERE ' . implode(' AND ', $conditions) : '';

            // SQL запросы для получения инструментов и их количества
            $countQuery = "SELECT COUNT(*) FROM dbo.tool_nom as tool_nom {$whereClause}";
            $toolQuery = "
                SELECT
                    tool_nom.id,
                    tool_nom.name,
                    tool_nom.property,
                    tool_nom.sklad,
                    tool_nom.norma,
                    tool_nom.group_id,
                    tool_nom.group_standard
                FROM dbo.tool_nom as tool_nom
                {$whereClause}
                ORDER BY
                    CASE WHEN tool_nom.sklad > 0 THEN 1 ELSE 2 END,
                    tool_nom.name
                LIMIT {$limit} OFFSET {$offset}
            ";

            // Выполнение запросов
            $totalCount = DB::select($countQuery)[0]->count;
            $tools = DB::select($toolQuery);

            // Обработка инструментов и параметров для ответа
            $uniqueParams = collect($tools)->pluck('property')->flatten()->unique()->toArray();
            $propertyValues = [];

            $formattedTools = collect($tools)->map(function ($tool) use (&$propertyValues, $uniqueParams) {
                $formattedProperty = [];
                if ($tool->property) {
                    $propertyObj = json_decode($tool->property, true);
                    if (is_array($propertyObj)) {
                        foreach ($propertyObj as $key => $value) {
                            if (!empty($value) && in_array($key, $uniqueParams)) {
                                $formattedProperty[$key] = ['info' => $this->getParamsMapping()[$key] ?? null, 'value' => $value];
                                if (!isset($propertyValues[$key])) {
                                    $propertyValues[$key] = [];
                                }
                                $propertyValues[$key][] = $value;
                            }
                        }
                    }
                }
                return [
                    'id' => $tool->id,
                    'name' => $tool->name,
                    'property' => $formattedProperty,
                    'sklad' => $tool->sklad,
                    'norma' => $tool->norma,
                    'group_id' => $tool->group_id,
                    'group_standard' => $tool->group_standard,
                ];
            })->toArray();

            foreach ($propertyValues as $key => $values) {
                $propertyValues[$key] = array_unique($values);
            }
            $paramsList = array_map(function ($key) use ($propertyValues) {
                if (count($propertyValues[$key]) > 1) {
                    return [
                        'key' => $key,
                        'label' => $this->getParamsMapping()[$key] ?? $key,
                        'values' => $propertyValues[$key],
                    ];
                }
                return null;
            }, array_keys($propertyValues));
            $paramsList = array_filter($paramsList);

            return response()->json([
                'currentPage' => $page,
                'itemsPerPage' => $limit,
                'totalCount' => $totalCount,
                'tools' => $formattedTools,
                'paramsList' => $paramsList,
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    private function getParamsMapping(): array
    {
        $query = 'SELECT id, info FROM dbo.tool_params';
        $result = DB::select($query);

        return collect($result)->reduce(function ($acc, $row) {
            $acc[$row->id] = ['info' => $row->info];
            return $acc;
        }, []);
    }
```
сборки 
http://localhost:5173/orders/1840
http://localhost:5173/noms/418

---

## Связанные

- [[Laravel]]
- [[Controller]]
