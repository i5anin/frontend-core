# Конфигурация сборки

## Environment Variables

```bash
# .env                — все окружения
# .env.local          — локально (gitignore)
# .env.development    — только dev
# .env.production     — только prod

# Vite: переменные должны начинаться с VITE_
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

```js
// В коде
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;    // boolean
const isProd = import.meta.env.PROD;  // boolean
const mode = import.meta.env.MODE;    // 'development' или 'production'
```

## TypeScript для переменных окружения

```ts
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Конфигурация окружений

```js
// vite.config.ts
export default defineConfig(({ command, mode }) => {
  // command: 'serve' | 'build'
  // mode: 'development' | 'production' | custom

  return {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },

    build: {
      sourcemap: mode === 'development'
    }
  };
});
```

## Пути и алиасы

```js
// vite.config.ts
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@':          resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils':     resolve(__dirname, 'src/utils'),
      '@api':       resolve(__dirname, 'src/api')
    }
  }
});
```

```json
// tsconfig.json — для TypeScript
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
  }
}
```

## ESLint + Prettier

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off'
  }
};
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Husky + lint-staged (pre-commit хуки)

```bash
npm install husky lint-staged --save-dev
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["prettier --write"]
  }
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```
