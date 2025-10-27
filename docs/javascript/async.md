---
title: Асинхронное программирование в JavaScript
description: Практики 2025 event loop, microtask-и, async/await, отмена, тайм-ауты, пул конкуренции, стримы, Web Workers
outline: deep
---

# Асинхронное программирование в JavaScript

**Цель**: дать рабочие паттерны без лишней теории. Код минимален и самодостаточен.

## Модель выполнения

- **Стеки**: основной поток исполняет синхронный код.
- **Очереди**:
  - Microtasks: `Promise`-обработчики, `queueMicrotask`.
  - Macrotasks: `setTimeout`, I/O, сообщения.
- **Правило приоритета**: после каждого тика выполняются все microtasks, затем один macrotask.

### Точное упорядочивание

```ts
queueMicrotask(() => console.log('micro'))
setTimeout(() => console.log('macro'))
Promise.resolve().then(() => console.log('promise'))
console.log('sync')
```

Ожидаемо: `sync` → `micro`/`promise` (внутренний порядок зависит от реализации microtask-очереди, полагайтесь только на класс приоритета) → `macro`.

## Промисы и async/await

* `await` разворачивает промис и продолжает после microtask-фазы.
* Ошибки перехватываются через `try/catch` вокруг `await`.
* Для параллелизма используйте построение массива промисов до `await`.

### Последовательно vs параллельно

```ts
async function seq<T>(fns: Array<() => Promise<T>>) {
  const out: T[] = []
  for (const f of fns) out.push(await f())
  return out
}

async function par<T>(fns: Array<() => Promise<T>>) {
  return Promise.all(fns.map(f => f()))
}
```

## Безопасные тайм-ауты и отмена

### Тайм-аут без утечек через AbortController

```ts
function withTimeout<T>(signal: AbortSignal | null, ms: number) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  const onAbort = () => ctrl.abort()
  if (signal) signal.addEventListener('abort', onAbort, { once: true })
  return {
    signal: ctrl.signal,
    clear() {
      clearTimeout(timer)
      if (signal) signal.removeEventListener('abort', onAbort)
    }
  }
}

async function getJson(url: string, opts: { signal?: AbortSignal; timeout?: number } = {}) {
  const { signal, timeout } = opts
  const t = typeof timeout === 'number' ? withTimeout(signal ?? null, timeout) : null
  try {
    const res = await fetch(url, { signal: t?.signal ?? signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } finally {
    t?.clear()
  }
}
```

### Гонка через `Promise.race` для тайм-аутов

```ts
function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

async function withRace<T>(task: Promise<T>, ms: number) {
  const timeout = sleep(ms).then(() => { throw new Error('Timeout') })
  return Promise.race([task, timeout])
}
```

## Управление конкуренцией

Ограничение параллельных задач защищает CPU и сеть.

```ts
type Task<T> = () => Promise<T>

async function asyncPool<T>(concurrency: number, tasks: Task<T>[]) {
  const results: T[] = []
  let i = 0
  const run = async () => {
    while (i < tasks.length) {
      const cur = i++
      results[cur] = await tasks[cur]()
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, run)
  await Promise.all(workers)
  return results
}
```

## Надежные ретраи с экспоненциальной паузой и джиттером

```ts
function jitter(base: number) {
  return base * (0.5 + Math.random())
}

async function retry<T>(fn: () => Promise<T>, attempts: number, baseDelay: number) {
  let last: unknown
  for (let i = 0; i < attempts; i++) {
    try { return await fn() } catch (e) { last = e }
    await new Promise(r => setTimeout(r, jitter(baseDelay * 2 ** i)))
  }
  throw last
}
```

## Коллективные результаты: `allSettled`, частичный успех

```ts
type Settled<T> = { ok: true; value: T } | { ok: false; reason: unknown }

async function settleAll<T>(ps: Promise<T>[]) {
  const r = await Promise.allSettled(ps)
  return r.map<Settled<T>>(x => x.status === 'fulfilled'
    ? { ok: true, value: x.value }
    : { ok: false, reason: x.reason })
}
```

## Асинхронные итераторы и стримы

### Чтение ReadableStream как асинхронного итератора

```ts
async function* streamToLines(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    let i
    while ((i = buf.indexOf('\n')) >= 0) {
      yield buf.slice(0, i)
      buf = buf.slice(i + 1)
    }
  }
  if (buf) yield buf
}

async function fetchLines(url: string) {
  const res = await fetch(url)
  if (!res.body) throw new Error('No body')
  const out: string[] = []
  for await (const line of streamToLines(res.body)) out.push(line)
  return out
}
```

## Сигналы отмены в пользовательских API

```ts
type Cancellable<T> = (signal?: AbortSignal) => Promise<T>

function cancellableDelay(ms: number): Cancellable<void> {
  return signal => new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'))
    const t = setTimeout(resolve, ms)
    const onAbort = () => { clearTimeout(t); reject(new DOMException('Aborted', 'AbortError')) }
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
```

## Web Workers для CPU-нагрузки (Frontend)

```ts
// worker.js
self.onmessage = e => {
  const n = e.data
  let a = 0, b = 1
  for (let i = 0; i < n; i++) { const t = a + b; a = b; b = t }
  postMessage(b)
}
```

```ts
// main.ts
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
const run = (n: number) => new Promise<number>(r => {
  worker.onmessage = e => r(e.data as number)
  worker.postMessage(n)
})
```

## Контроль утечек: отписки и завершение

* Всегда очищайте таймеры и слушатели, присоединенные к внешним сигналам.
* Встраивайте отмену в API-границы и пробрасывайте `AbortSignal`.

## Обработка ошибок

* Внешние границы: `try/catch` вокруг `await`.
* Внутренние цепочки: возвращайте значения-результаты, не кидайте исключения, если это поток данных.
* Отмечайте фатальные ошибки отдельным каналом.

```ts
async function safe<T>(p: Promise<T>) {
  try { return { ok: true as const, value: await p } }
  catch (e) { return { ok: false as const, reason: e } }
}
```

## Параллельные окна и дедупликация запросов

```ts
function once<T>(fn: (...a: any[]) => Promise<T>) {
  let inflight: Promise<T> | null = null
  return (...a: any[]) => {
    if (!inflight) inflight = fn(...a).finally(() => { inflight = null })
    return inflight
  }
}
```

## Топ-уровневый await в ESM

```ts
const data = await getJson('/api/data', { timeout: 3000 })
export default data
```

## Чек-лист

* Управляйте конкуренцией явно.
* Всегда поддерживайте отмену (`AbortController`).
* Ставьте тайм-ауты на I/O.
* Не блокируйте основной поток, переносите CPU-нагрузку в Workers.
* Для потоков используйте асинхронные итераторы.
* В логике ретраев применяйте экспоненту и джиттер.
* Для частичных успехов используйте `allSettled`.


### Основание ответа

* Базируется на общедоступной спецификации и практике асинхронного JS на стороне клиента и Node.js. Внешние источники не использовались. Если требуются ссылки на стандарты или конкретные версии движков, уточните окружение.



