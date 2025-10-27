## Паттерны проектирования

### Зачем

Паттерны — именованные решения повторяющихся задач. Они ускоряют дизайн, повышают читаемость и создают общий язык команды. Используй их осознанно, руководствуясь принципами **KISS/DRY/SOLID** и метриками сложности.

### Категории

* **Порождающие:** Factory Method, Abstract Factory, Builder, Prototype, Singleton/Multiton, DI/Service Locator.
* **Структурные:** Adapter, Facade, Proxy, Decorator, Composite, Flyweight, Bridge.
* **Поведенческие:** Strategy, Observer, Command, Mediator, State, Memento, Iterator, Template Method, Chain of Responsibility, Visitor.

---

## Порождающие

### Factory Method

Инкапсулирует создание объектов, делегирует решение подклассам/фабрикам.

```ts
interface Transport { deliver(p: string): void }
class Truck implements Transport { deliver(p: string){/*...*/} }
class Ship implements Transport { deliver(p: string){/*...*/} }

function createTransport(kind: 'truck'|'ship'): Transport {
  return kind === 'truck' ? new Truck() : new Ship()
}
```

### Abstract Factory

Создает семейства совместимых объектов.

```ts
interface Button { render(): void }
interface Checkbox { render(): void }
interface UIFactory { button(): Button; checkbox(): Checkbox }

class MacFactory implements UIFactory { /*...*/ }
class WinFactory implements UIFactory { /*...*/ }

function buildUI(factory: UIFactory){ factory.button().render(); factory.checkbox().render() }
```

### Builder

Пошаговая сборка сложного объекта.

```ts
type Report = { title:string; body:string; footer?:string }
class ReportBuilder {
  private r: Partial<Report> = {}
  title(t:string){ this.r.title=t; return this }
  body(b:string){ this.r.body=b; return this }
  footer(f:string){ this.r.footer=f; return this }
  build(): Report { return { title: this.r.title!, body: this.r.body!, footer: this.r.footer } }
}
```

### Prototype

Копирование вместо создания с нуля.

```ts
const original = { theme:'dark', permissions:['read'] }
const copy = structuredClone(original)
```

### Singleton (осмотрительно)

Единственный глобальный экземпляр; в SPA часто заменяется DI.

```ts
class Config {
  static #i: Config
  private constructor(public readonly api:string){}
  static get(api=import.meta.env.VITE_API_URL){ return this.#i ??= new Config(api) }
}
```

---

## Структурные

### Adapter

Совместимость разных интерфейсов.

```ts
interface Notifier { send(msg:string):void }
class SlackApi { post(text:string){/*...*/} }
class SlackAdapter implements Notifier {
  constructor(private slack: SlackApi) {}
  send(msg:string){ this.slack.post(msg) }
}
```

### Facade

Упрощенный интерфейс к сложной подсистеме.

```ts
class PaymentFacade {
  constructor(private gateway: GW, private logger: L){ }
  async pay(order: Order){ /* ork: validate, reserve, capture, log */ }
}
```

### Proxy

Контроль доступа/кеш/ленивая загрузка.

```ts
function withCache<T extends object>(target: T): T {
  const cache = new Map<string, unknown>()
  return new Proxy(target, {
    get(t, k: string){ if(!cache.has(k)) cache.set(k, (t as any)[k]()); return cache.get(k) as any }
  })
}
```

### Decorator

Добавление поведения без наследования.

```ts
interface Repo { get(id:string): Promise<any> }
class CacheRepo implements Repo {
  private cache = new Map<string, any>()
  constructor(private base: Repo){}
  async get(id:string){ if(!this.cache.has(id)) this.cache.set(id, await this.base.get(id)); return this.cache.get(id) }
}
```

### Composite

Деревья «часть–целое».

```ts
interface Node { render(): string }
class Leaf implements Node { constructor(private text:string){} render(){ return this.text } }
class Group implements Node { constructor(private children:Node[]){} render(){ return this.children.map(c=>c.render()).join('') } }
```

### Bridge

Разделение абстракции и реализации.

```ts
interface Renderer { drawCircle(x:number,y:number,r:number):void }
class SvgRenderer implements Renderer {/*...*/}
class CanvasRenderer implements Renderer {/*...*/}
class Circle { constructor(private r:Renderer){} draw(){ this.r.drawCircle(0,0,10) } }
```

---

## Поведенческие

### Strategy

Взаимозаменяемые алгоритмы.

```ts
type Sorter<T> = (a:T[])=>T[]
const quickSort: Sorter<number> = (a)=>/*...*/ a
const stableSort: Sorter<number> = (a)=> structuredClone(a).sort((x,y)=>x-y)

function sortNumbers(arr:number[], strategy:Sorter<number>){ return strategy(arr) }
```

### Observer (Pub/Sub)

Реакция на события.

```ts
type Handler<T> = (p:T)=>void
class Emitter<T=any> {
  private m = new Map<string, Set<Handler<T>>>()
  on(e:string,h:Handler<T>){ (this.m.get(e) ?? this.m.set(e,new Set()).get(e)!).add(h) }
  emit(e:string,p:T){ this.m.get(e)?.forEach(h=>h(p)) }
}
```

### Command

Инкапсуляция запроса/undo/redo.

```ts
interface Command { execute(): void; undo(): void }
class AppendText implements Command {
  constructor(private buf:{v:string}, private add:string){}
  execute(){ this.buf.v += this.add } undo(){ this.buf.v = this.buf.v.slice(0, -this.add.length) }
}
```

### Mediator

Центральный объект координирует взаимодействие.

```ts
class FormMediator {
  constructor(private api:Api){}
  async submit(state:{email:string; pass:string}){ /* validate, call api, route */ }
}
```

### State

Поведение зависит от внутреннего состояния.

```ts
interface AuthState { label():string; next():AuthState }
class LoggedOut implements AuthState { label(){return 'Login'}; next(){ return new LoggedIn() } }
class LoggedIn implements AuthState { label(){return 'Logout'}; next(){ return new LoggedOut() } }
```

### Chain of Responsibility

Конвейер обработчиков.

```ts
type Handler = (ctx: Ctx, next: ()=>Promise<void>)=>Promise<void>
const chain = (...h:Handler[]) => (ctx:Ctx) => h.reduceRight((n,f)=>()=>f(ctx,n), async()=>{})()
```

### Template Method

Скелет алгоритма, шаги переопределяются.

```ts
abstract class Exporter { export(){ this.prepare(); this.write(); this.finish() } protected abstract write():void; protected prepare(){} protected finish(){} }
```

### Visitor

Добавление операций к иерархии.

```ts
interface Expr { accept(v: Visitor): number }
interface Visitor { number(n:NumberExpr): number; add(a:AddExpr): number }
```

---

## Паттерны в фронтенде (Vue 3)

### Компонентные уровни

* **Presentational/Container**: разделение UI и данных.
* **Smart/Dumb**: умные компоненты подключают стор/сервис; тупые — только props/emit.
* **Render-функции/Slots как Strategy** для гибких UI.

### DI через provide/inject (Service Locator/DI)

```ts
// service.ts
export interface Api { get<T>(url:string):Promise<T> }
export const ApiKey: InjectionKey<Api> = Symbol('Api')

// app
app.provide(ApiKey, createApi())

// component
const api = inject(ApiKey)!
```

### Repository + Mapper

Отделение транспорта от домена.

```ts
type UserDto = { id:string; email:string }
type User = { id:string; email:string; displayName:string }

class UserRepo {
  constructor(private api: Api){}
  async byId(id:string): Promise<User>{
    const dto = await this.api.get<UserDto>(`/users/${id}`)
    return { id: dto.id, email: dto.email, displayName: dto.email.split('@')[0] }
  }
}
```

### Strategy для форматирования и локализации

```ts
type MoneyFmt = (v:number)=>string
const ru: MoneyFmt = v => new Intl.NumberFormat('ru-RU', {style:'currency', currency:'RUB'}).format(v)
const en: MoneyFmt = v => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(v)
```

### Command + Undo для UI

```ts
class History {
  private stack: Command[] = []
  exec(c:Command){ c.execute(); this.stack.push(c) }
  undo(){ this.stack.pop()?.undo() }
}
```

### Observer с Event Bus

Слабое зацепление фич.

```ts
export const bus = new Emitter()
bus.on('cart:add', (p)=>{/* ... */})
bus.emit('cart:add', { id:'p1' })
```

### Facade для API

```ts
class ApiFacade {
  constructor(private user: UserRepo, private orders: OrderRepo){}
  async dashboard(){ return Promise.all([this.user.me(), this.orders.list()]) }
}
```

### Proxy для кеша/троттлинга

```ts
function throttle<T extends(...a:any)=>any>(fn:T, ms=200):T {
  let t=0; let lastArgs:any[]|null=null
  return ((...args:any[])=>{ const now=Date.now(); if(now-t>ms){ t=now; return fn(...args) } lastArgs=args }) as T
}
```

---

## Конкурентность и надёжность

### Circuit Breaker (Proxy + State)

```ts
class Circuit {
  private fail=0; private open=false
  async call<T>(fn:()=>Promise<T>): Promise<T> {
    if(this.open) throw new Error('circuit')
    try { const r = await fn(); this.fail=0; return r } 
    catch(e){ if(++this.fail>3) this.open=true; throw e }
  }
}
```

### Retry с экспоненциальным джиттером (Strategy)

```ts
async function retry<T>(fn:()=>Promise<T>, attempts=3){
  for(let i=0;i<attempts;i++){
    try { return await fn() } 
    catch { await new Promise(r=>setTimeout(r, (2**i*200) + Math.random()*100)) }
  }
  throw new Error('failed')
}
```

### Идемпотентность (Command Idempotent)

Команды должны безопасно повторяться: ключ `Idempotency-Key`, проверка версий (ETag/If-Match).

---

## Архитектурные паттерны

### CQRS

Команды и запросы разделены; чтение — через проекции/кеши; запись — через валидаторы и доменные команды.

### BFF (Facade)

Единая точка агрегации для фронта; скрывает топологию микросервисов, упрощает версионность.

### Event Sourcing + Observer

События — источник истины; UI подписывается на потоки изменений; устойчивость к отказам через replay.

---

## Анти-паттерны

* **God Object/Smart Component**: перегруженные компоненты и сторы.
* **Cargo Cult**: механическое применение паттерна без нужды.
* **Shared Mutable State**: глобальные объекты без инкапсуляции.
* **Over-Factory**: фабрики на каждом шаге, где достаточно функции.
* **Singleton-лавина**: скрытые зависимости и неявный порядок инициализации.

---

## Практические рекомендации

* Фиксируй принятые решения в **ADR** и указывай, какие паттерны применены и зачем.
* Начинай с простой реализации; вводи паттерн при появлении повторения/сложности.
* Паттерн — контракт: добавляй тесты на поведение (Strategy/Command/State).
* Ограничивай область действия: паттерн на границе слоя, а не во всём проекте.
* Комбинируй: Facade + Adapter, Strategy + Template Method, Decorator + Proxy.
