# 🔧 Патч плагина JetBrains — until-build

Когда плагин выдаёт «Incompatible: requires IDE build N.* or earlier» — это значит, что
автор не обновил метаданные совместимости. Плагин при этом **работает нормально**.

---

## Суть проблемы

Внутри JAR-файла плагина лежит `META-INF/plugin.xml`:

```xml
<idea-version since-build="231" until-build="252.*" />
```

IDE сравнивает свой build-номер с `until-build` и блокирует плагин, если он выше.

## Фикс — поднять until-build

```powershell
$jar = "C:\Users\PizZzA\AppData\Roaming\JetBrains\<IDE>\plugins\<plugin>.jar"
$tmp = "$env:TEMP\plugin-patch"

# Распаковать
New-Item -ItemType Directory -Force $tmp | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($jar, $tmp)

# Патч
$xml = "$tmp\META-INF\plugin.xml"
(Get-Content $xml -Raw) -replace 'until-build="[\d.*]+"', 'until-build="999.*"' |
    Set-Content $xml -Encoding UTF8

# Переупаковать
Remove-Item $jar
[System.IO.Compression.ZipFile]::CreateFromDirectory($tmp, $jar)
Remove-Item -Recurse -Force $tmp
```

> [!important]
> `until-build="999.*"` — ставить сразу, чтобы не патчить при каждом обновлении IDE.

## Распространить на другие IDE

Скопировать пропатченный JAR в папки остальных IDE:

```
C:\Users\PizZzA\AppData\Roaming\JetBrains\<ProductName><Version>\plugins\
```

---

> [!warning]
> Патч меняет только метаданные совместимости, логика плагина не затрагивается.
> Если плагин реально несовместим (использует удалённое API) — сломается при работе, не при загрузке.
