---
tags:
  - веб-разработка
  - typescript
  - npm
  - api
  - telegram
created: 2024-11-13
date: 2024-11-13
---
Вот полная версия проекта, настроенного для взаимодействия исключительно через API с использованием `GET` и `POST` запросов. Это приложение будет получать данные об устройствах из удаленного API и обновлять их статусы через `POST`, а также отправлять результаты проверок в Telegram через бота.

**Структура файлов проекта**

1. `src/config.ts` - конфигурация проекта.
2. `src/pingService.ts` - логика проверки доступности устройств.
3. `src/bot.ts` - конфигурация Telegram-бота.
4. `src/scheduler.ts` - планировщик задач.
5. `src/index.ts` - основная точка запуска приложения.

**Установка и настройка**

Перед началом установите зависимости:

```bash
npm init -y
npm install axios telegraf ping node-schedule
npm install --save-dev typescript @types/node @types/ping @types/telegraf
```

Создайте файл `tsconfig.json` для компиляции TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"]
}
```

**Файлы проекта**

**1. Файл `src/config.ts`**

Этот файл содержит конфигурацию для доступа к API и Telegram:

```typescript
export const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
export const API_URL = 'https://reg.ru/ping.php';
```

**2. Файл `src/pingService.ts`**

Этот файл включает функции для получения списка устройств и проверки их статусов:

```typescript
import axios from 'axios';
import ping from 'ping';
import { API_URL } from './config';

interface Device {
  ip: string;
  title: string;
  group: string;
  rank: number;
  active: boolean;
  test: Record<string, any>;
}

export async function fetchDevices(): Promise<Device[]> {
  try {
    const { data }: { data: Device[] } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error('Ошибка при получении списка устройств:', error);
    return [];
  }
}

export async function checkDevice(device: Device) {
  const pingResult = await ping.promise.probe(device.ip);
  const webStatus = await checkWebInterface(device.ip);

  const status = {
    ping: pingResult.alive,
    webUI: webStatus,
  };

  await axios.post(`${API_URL}/update`, {
    ip: device.ip,
    status,
  });

  return { ...device, status };
}

async function checkWebInterface(ip: string): Promise<boolean> {
  try {
    const response = await axios.get(`http://${ip}`, { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
}
```

**3. Файл `src/bot.ts`**

Здесь определяется логика для отправки сообщений о статусе устройств в Telegram.

```typescript
import { Telegraf } from 'telegraf';
import { TELEGRAM_TOKEN } from './config';
import { fetchDevices, checkDevice } from './pingService';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply('Мониторинг устройств запущен!'));

export async function sendPingResults() {
  const devices = await fetchDevices();

  for (const device of devices) {
    const result = await checkDevice(device);
    const message = `${result.title} (${result.ip}) - Пинг: ${result.status.ping ? 'Доступен' : 'Недоступен'}, Веб UI: ${result.status.webUI ? 'Доступен' : 'Недоступен'}`;
    await bot.telegram.sendMessage(ctx.chat.id, message);
  }
}

export default bot;
```

**4. Файл `src/scheduler.ts`**

В этом файле настраивается расписание для периодического запуска задач:

```typescript
import schedule from 'node-schedule';
import { sendPingResults } from './bot';
import { fetchDevices } from './pingService';

export function startScheduler() {
  schedule.scheduleJob('*/5 * * * *', async () => {
    // Каждые 5 минут проверка доступности устройств
    await sendPingResults();
  });

  schedule.scheduleJob('0 * * * *', async () => {
    // Обновление списка устройств каждый час
    await fetchDevices();
  });
}
```

**5. Файл `src/index.ts`**

Основной файл для запуска приложения:

```typescript
import bot from './bot';
import { startScheduler } from './scheduler';

bot.launch();
startScheduler();
console.log('Telegram бот запущен и мониторинг активен');
```

**Запуск проекта**

Компилируйте TypeScript и запустите приложение:

```bash
npx tsc
node dist/index.js
```

**Описание**

- **GET запрос** к `API_URL` (`https://reg.ru/ping.php`) получает список устройств для проверки.
- **POST запрос** на тот же API отправляет результаты проверки доступности (пинг и веб-интерфейс).
- **Telegram уведомления** автоматически отправляются каждые 5 минут с результатами проверки.

---

## Связанные

- [[Vue]]
- [[$emit]]
- [[component]]
- [[Composition API и Options API — это два подхода к созданию компонентов в Vue. Давайте рассмотрим основные элементы каждого из них и чем они отличаются.]]
- [[Composition API]]
- [[destroyed]]
