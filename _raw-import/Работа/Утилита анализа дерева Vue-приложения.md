---
tags:
  - веб-разработка
  - vue
  - html
  - javascript
  - typescript
created: 2026-04-24
date: 2026-04-24
---
Нужно: утилита, которая строит дерево приложения: роутер → страницы → используемые компоненты/виджеты и их импорты. Ниже — готовый CLI-скрипт (Node.js, 2025), который статически анализирует Vue 3 (Composition API), читает роутеры, страницы и компоненты `.vue`/`.ts`/`.js`, собирает граф зависимостей и сохраняет три артефакта: `graph.json`, `graph.md`, `graph.dot`.

## Техническое решение

- Поиск роутеров: `src/router/**/*.ts|js`. Извлекаются `import()` и обычные `import` компонентов в `routes`.
    
- Для каждой страницы/компонента:
    
    - Парсинг SFC через `@vue/compiler-sfc`.
        
    - Извлечение импортов через `es-module-lexer`.
        
    - Разбор шаблона через `@vue/compiler-dom` и сбор всех пользовательских тегов (PascalCase и `kebab-case`, исключая HTML-теги).
        
- Резолв путей: поддержка относительных путей и алиаса `@` → `src`.
    
- Вывод:
    
    - `graph.json` — полный граф.
        
    - `graph.md` — человекочитаемое дерево.
        
    - `graph.dot` — для Graphviz (можно отрисовать диаграмму).
        

## Установка и запуск (Windows)

```bash
# Инициализация рядом с вашим package.json проекта
npm i -D fast-glob es-module-lexer @vue/compiler-sfc @vue/compiler-dom pathe fs-extra
npm i -D tsx typescript
```

`package.json` (фрагмент):

```json
{
  "type": "module",
  "scripts": {
    "analyze:vue": "tsx tools/analyze-vue-app.ts"
  }
}
```

`tsconfig.json` (минимальный):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "jsx": "preserve",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["tools/**/*.ts", "src/**/*.ts", "src/**/*.vue"]
}
```

Запуск:

```bash
# поместите файл ниже в tools/analyze-vue-app.ts
npm run analyze:vue
```

Результаты появятся в `tools/out/graph.{json,md,dot}`.

## Код (без комментариев, самодостаточный)

`tools/analyze-vue-app.ts`

```ts
import { parse as parseSfc } from '@vue/compiler-sfc';
import { parse as parseDom } from '@vue/compiler-dom';
import fg from 'fast-glob';
import { init, parse as parseEsImports } from 'es-module-lexer';
import { promises as fs } from 'fs';
import { resolve, dirname, extname, join, relative } from 'pathe';
import { ensureDir } from 'fs-extra';

type NodeId = string;
type GraphNode = { id: NodeId; kind: 'router' | 'page' | 'component' | 'script' | 'asset'; file: string; tags?: string[] };
type GraphEdge = { from: NodeId; to: NodeId; type: 'route' | 'import' | 'uses-tag' };

const projectRoot = resolve(process.cwd());
const srcDir = resolve(projectRoot, 'src');
const outDir = resolve(projectRoot, 'tools/out');

const htmlTags = new Set([
  'div','span','p','a','ul','ol','li','table','thead','tbody','tr','td','th','input','button','label','form','select',
  'option','textarea','img','video','audio','canvas','section','article','header','footer','nav','main','aside','h1','h2','h3','h4','h5','h6',
  'template','slot','component','transition','keep-alive','teleport','svg','path','g','circle','rect','line','polyline','polygon','defs','use'
]);

const isCustomTag = (t: string) => !htmlTags.has(t) && (/[A-Z]/.test(t[0]) || t.includes('-'));

const aliasAt = (p: string) => p.startsWith('@/') ? resolve(srcDir, p.slice(2)) : p;
const withExts = (p: string) => {
  const exts = ['.vue','.ts','.tsx','.js','.jsx','.mjs','.cjs'];
  if (extname(p)) return [p];
  return exts.map(e => p + e);
};
const fileExistsAny = async (candidates: string[]) => {
  for (const c of candidates) {
    try { const st = await fs.stat(c); if (st.isFile()) return c; } catch {}
  }
  return null;
};
const resolveImport = async (fromFile: string, spec: string) => {
  const base = dirname(fromFile);
  if (/^(https?:)?\/\//.test(spec)) return null;
  if (spec.startsWith('.') || spec.startsWith('/')) {
    const full = spec.startsWith('/') ? resolve(projectRoot, spec) : resolve(base, spec);
    const found = await fileExistsAny(withExts(full));
    if (found) return found;
    const idx = await fileExistsAny(withExts(join(full, 'index')));
    return idx;
  }
  const aliased = aliasAt(spec);
  if (aliased !== spec) {
    const found = await fileExistsAny(withExts(aliased));
    if (found) return found;
    const idx = await fileExistsAny(withExts(join(aliased, 'index')));
    if (idx) return idx;
  }
  return null;
};

const readText = (p: string) => fs.readFile(p, 'utf8');

const nodeId = (absPath: string) => relative(projectRoot, absPath).replaceAll('\\','/');
const makeNode = (file: string, kind: GraphNode['kind']): GraphNode => ({ id: nodeId(file), kind, file });

const scanRouterFiles = async () => {
  const files = await fg(['src/router/**/*.{ts,js}'], { cwd: projectRoot, absolute: true });
  return files;
};

const extractRouteComponentPaths = async (routerFile: string) => {
  await init;
  const text = await readText(routerFile);
  const [imports] = parseEsImports(text);
  const importMap = new Map<string,string>();
  for (const i of imports) {
    const s = text.slice(i.s, i.e);
    if (i.n) {
      const spec = i.n;
      const m = text.slice(i.ss, i.se);
      const mName = m.match(/import\s+([\s\S]*?)\s+from/)?.[1] ?? '';
      const def = mName.match(/^([A-Za-z0-9_$]+)/)?.[1];
      if (def) importMap.set(def, spec);
      const named = [...mName.matchAll(/\{\s*([A-Za-z0-9_$]+)\s*(?:as\s*[A-Za-z0-9_$]+)?\s*\}/g)].map(x=>x[1]);
      for (const n of named) importMap.set(n, spec);
    }
  }
  const lazy = [...text.matchAll(/component\s*:\s*\(\s*\)\s*=>\s*import\(\s*['"](.+?)['"]\s*\)/g)].map(m=>m[1]);
  const sync = [...text.matchAll(/component\s*:\s*([A-Za-z0-9_$]+)/g)].map(m=>m[1]).filter(x=>x!=='defineAsyncComponent');
  const resolved: string[] = [];
  for (const l of lazy) {
    const p = await resolveImport(routerFile, l);
    if (p) resolved.push(p);
  }
  for (const s of sync) {
    const spec = importMap.get(s);
    if (!spec) continue;
    const p = await resolveImport(routerFile, spec);
    if (p) resolved.push(p);
  }
  return Array.from(new Set(resolved));
};

const extractImportsFromScript = async (ownerFile: string, script: string) => {
  await init;
  const out: string[] = [];
  const [imports] = parseEsImports(script);
  for (const i of imports) {
    const spec = i.n;
    if (!spec) continue;
    const p = await resolveImport(ownerFile, spec);
    if (p) out.push(p);
  }
  return Array.from(new Set(out));
};

const extractTagsFromTemplate = (tpl: string) => {
  const ast = parseDom(tpl, { comments: false });
  const tags = new Set<string>();
  const stack: any[] = [ast];
  while (stack.length) {
    const n: any = stack.pop();
    if (!n) continue;
    if (n.type === 1 && typeof n.tag === 'string') {
      const t = n.tag;
      if (isCustomTag(t)) tags.add(t);
    }
    if (Array.isArray(n.children)) for (const c of n.children) stack.push(c);
    if (Array.isArray(n.branches)) for (const b of n.branches) stack.push(b);
  }
  return Array.from(tags);
};

const analyzeVueSfc = async (file: string) => {
  const src = await readText(file);
  const sfc = parseSfc(src);
  const scr = sfc.descriptor.scriptSetup?.content ?? sfc.descriptor.script?.content ?? '';
  const tpl = sfc.descriptor.template?.content ?? '';
  const imports = await extractImportsFromScript(file, scr);
  const tags = tpl ? extractTagsFromTemplate(tpl) : [];
  return { imports, tags };
};

const analyzeScriptModule = async (file: string) => {
  const src = await readText(file);
  const imports = await extractImportsFromScript(file, src);
  return { imports };
};

const isVueFile = (p: string) => p.endsWith('.vue');
const isScript = (p: string) => /\.(mjs|cjs|ts|js|tsx|jsx)$/.test(p);

const buildGraph = async () => {
  const nodes = new Map<NodeId, GraphNode>();
  const edges: GraphEdge[] = [];

  const routerFiles = await scanRouterFiles();
  for (const rf of routerFiles) nodes.set(nodeId(rf), makeNode(rf, 'router'));

  const pages = new Set<string>();
  for (const rf of routerFiles) {
    const comps = await extractRouteComponentPaths(rf);
    for (const c of comps) {
      pages.add(c);
      edges.push({ from: nodeId(rf), to: nodeId(c), type: 'route' });
    }
  }

  for (const p of pages) nodes.set(nodeId(p), makeNode(p, 'page'));

  const queue = new Set<string>(pages);
  const visited = new Set<string>();

  while (queue.size) {
    const [cur] = queue;
    queue.delete(cur);
    if (visited.has(cur)) continue;
    visited.add(cur);

    if (isVueFile(cur)) {
      const { imports, tags } = await analyzeVueSfc(cur);
      const n = nodes.get(nodeId(cur));
      if (n) n.tags = tags;
      for (const imp of imports) {
        const kind: GraphNode['kind'] =
          imp.endsWith('.vue') ? 'component' :
          isScript(imp) ? 'script' : 'asset';
        if (!nodes.has(nodeId(imp))) nodes.set(nodeId(imp), makeNode(imp, kind));
        edges.push({ from: nodeId(cur), to: nodeId(imp), type: 'import' });
        if (kind === 'component') queue.add(imp);
      }
      for (const t of tags) {
        edges.push({ from: nodeId(cur), to: t, type: 'uses-tag' });
      }
    } else if (isScript(cur)) {
      const { imports } = await analyzeScriptModule(cur);
      for (const imp of imports) {
        const kind: GraphNode['kind'] =
          imp.endsWith('.vue') ? 'component' :
          isScript(imp) ? 'script' : 'asset';
        if (!nodes.has(nodeId(imp))) nodes.set(nodeId(imp), makeNode(imp, kind));
        edges.push({ from: nodeId(cur), to: nodeId(imp), type: 'import' });
        if (kind === 'component') queue.add(imp);
      }
    }
  }

  const nodesArr = Array.from(nodes.values());
  await ensureDir(outDir);
  await fs.writeFile(resolve(outDir, 'graph.json'), JSON.stringify({ nodes: nodesArr, edges }, null, 2), 'utf8');

  const byKind = (k: GraphNode['kind']) => nodesArr.filter(n=>n.kind===k);
  const md: string[] = [];
  for (const r of byKind('router')) {
    md.push(`- [router] ${r.id}`);
    const rEdges = edges.filter(e=>e.type==='route' && e.from===r.id);
    for (const e of rEdges) {
      md.push(`  - [page] ${e.to}`);
      const deps = edges.filter(x=>x.from===e.to && x.type==='import');
      for (const d of deps) md.push(`    - [import] ${d.to}`);
      const tagNode = nodes.get(e.to);
      if (tagNode?.tags?.length) for (const t of tagNode.tags) md.push(`    - [uses-tag] ${t}`);
    }
  }
  await fs.writeFile(resolve(outDir, 'graph.md'), md.join('\n'), 'utf8');

  const dotLines: string[] = ['digraph G {', 'rankdir=LR;'];
  const shape = (k: GraphNode['kind']) => k==='router'?'folder':k==='page'?'box':k==='component'?'component':k==='script'?'note':'ellipse';
  for (const n of nodesArr) {
    dotLines.push(`"${n.id}" [shape=${shape(n.kind)}, label="${n.kind}\\n${n.id.replaceAll('"','\\"')}"];`);
  }
  for (const e of edges) {
    const lbl = e.type;
    const to = e.to.includes('/') ? e.to : `"tag:${e.to}"`;
    if (!e.to.includes('/')) dotLines.push(`"tag:${e.to}" [shape=oval, label="tag\\n${e.to}"];`);
    dotLines.push(`"${e.from}" -> ${to} [label="${lbl}"];`);
  }
  dotLines.push('}');
  await fs.writeFile(resolve(outDir, 'graph.dot'), dotLines.join('\n'), 'utf8');

  return { nodes: nodesArr.length, edges: edges.length };
};

const main = async () => {
  const res = await buildGraph();
  process.stdout.write(JSON.stringify(res) + '\n');
};
main().catch(e => { process.stderr.write(String(e) + '\n'); process.exit(1); });
```

## Использование результатов

- Быстрый обзор: откройте `tools/out/graph.md`.
    
- Полный анализ: `tools/out/graph.json`.
    
- Диаграмма Graphviz:
    
    ```bash
    dot -Tpng tools/out/graph.dot -o tools/out/graph.png
    ```
    

## Ограничения и предположения

- Поддерживаются алиасы вида `@/…` → `src/…`. При специфичных alias из Vite/Webpack добавьте их в `paths` `tsconfig.json`.
    
- Статический анализ: динамические вычисления путей не разрешаются.
    
- Пользовательские теги в шаблоне выводятся как `uses-tag`. Связка тега с реальным файлом возможна через локальную регистрацию, но это зависит от вашего кода; при необходимости можно расширить резолвер.
    

## Варианты расширения

- Разбор `vite.config.ts` для автоматического чтения алиасов.
    
- Слияние нескольких роутеров.
    
- Экспорт отчёта в Mermaid (`flowchart`) или PlantUML.
    

Если нужно, адаптирую скрипт под ваш конкретный layout (`views/`, `pages/`, несколько роутеров, alias из Vite).

---

## Связанные

- [[JavaScript]]
- [[class]]
- [[const vs let vs var]]
- [[Cобеседования на позицию Junior JavaScript (2)]]
- [[Cобеседования на позицию Junior JavaScript]]
- [[float]]
