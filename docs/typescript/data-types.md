# Типы данных TypeScript

## Базовые типы

```ts
let name: string = 'Alice';
let age: number = 30;
let active: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;
let id: symbol = Symbol('id');
let big: bigint = 100n;
```

## Массивы и Tuple

```ts
// Массивы
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ['a', 'b'];

// Tuple — фиксированная длина и типы
let pair: [string, number] = ['Alice', 30];
pair[0].toUpperCase(); // string методы
pair[1].toFixed(2);    // number методы

// Named tuple
let point: [x: number, y: number] = [10, 20];
```

## Any, Unknown, Never

```ts
// any — отключает типизацию (избегать)
let x: any = 5;
x = 'hello';   // ✓
x = true;      // ✓
x.foo.bar;     // ✓ — ошибка только в runtime

// unknown — безопасная альтернатива any
let val: unknown = 5;
val.toFixed(); // ✗ Ошибка компиляции
if (typeof val === 'number') {
  val.toFixed(); // ✓ После type guard
}

// never — значение которое никогда не бывает
function crash(): never {
  throw new Error('Fatal');
}

function infiniteLoop(): never {
  while (true) {}
}
```

## Union и Intersection

```ts
// Union — одно ИЛИ другое
let id: string | number;
id = '123'; // ✓
id = 123;   // ✓

// Intersection — одно И другое
interface A { x: number; }
interface B { y: number; }
type AB = A & B;
let point: AB = { x: 1, y: 2 }; // оба свойства обязательны
```

## Literal Types

```ts
type Direction = 'up' | 'down' | 'left' | 'right';
type HttpStatus = 200 | 301 | 404 | 500;

function move(dir: Direction) { }
move('up');       // ✓
move('diagonal'); // ✗ Ошибка

// as const
const config = {
  env: 'production',
  port: 3000
} as const;
// config.env → тип 'production', не string
```

## Enum

```ts
// Numeric enum
enum Direction { Up, Down, Left, Right }
Direction.Up;    // 0
Direction[0];    // 'Up' — двусторонний маппинг

// String enum
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

// Const enum — инлайнится при компиляции
const enum Color { Red, Green, Blue }
```

## Discriminated Union

```ts
interface SuccessResponse {
  type: 'success'; // discriminator
  data: string;
}

interface ErrorResponse {
  type: 'error'; // discriminator
  error: Error;
}

type Response = SuccessResponse | ErrorResponse;

function handle(res: Response) {
  switch (res.type) {
    case 'success': return res.data;   // ts знает тип
    case 'error':   return res.error;  // ts знает тип
  }
}
```

## Readonly и Optional

```ts
interface Config {
  readonly apiUrl: string;     // нельзя изменить
  timeout?: number;            // необязательное
}

const cfg: Config = { apiUrl: 'https://api.com' };
cfg.apiUrl = 'other'; // ✗ Ошибка

// ReadonlyArray
const arr: ReadonlyArray<number> = [1, 2, 3];
arr.push(4); // ✗ Ошибка
```
