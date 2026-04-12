# Псевдоклассы и псевдоэлементы

## Псевдоэлементы (::)

```css
/* ::before и ::after — виртуальные элементы */
p::before { content: '→ '; color: blue; }
p::after  { content: ' ←'; }

/* Иконка через ::before */
.btn::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('icon.svg') no-repeat;
}

/* ::placeholder — текст-подсказка */
input::placeholder { color: #999; font-style: italic; }

/* ::selection — выделенный текст */
::selection { background: #3498db; color: white; }

/* ::first-line, ::first-letter */
p::first-letter { font-size: 2em; float: left; }
p::first-line   { font-weight: bold; }
```

## Псевдоклассы состояний

```css
/* Взаимодействие */
a:hover  { color: blue; }              /* наведение */
a:focus  { outline: 2px solid blue; } /* фокус (tab) */
a:active { color: red; }              /* нажатие */

/* :focus-within — фокус внутри контейнера */
.form:focus-within { border-color: blue; }

/* :focus-visible — только при навигации с клавиатуры */
button:focus-visible { outline: 2px solid blue; }
button:focus:not(:focus-visible) { outline: none; }
```

## Структурные псевдоклассы

```css
/* :first-child, :last-child */
li:first-child { font-weight: bold; }
li:last-child  { border-bottom: none; }

/* :nth-child(n) */
li:nth-child(2n)     { background: #f0f0f0; } /* чётные */
li:nth-child(2n+1)   { background: white; }   /* нечётные */
li:nth-child(3)      { color: red; }           /* ровно 3-й */

/* :nth-of-type — только среди своего типа */
p:nth-of-type(1)   { font-size: 1.2em; }
p:first-of-type    { margin-top: 0; }
p:last-of-type     { margin-bottom: 0; }

/* :only-child, :only-of-type */
li:only-child { list-style: none; }
```

## Логические псевдоклассы

```css
/* :not() — исключение */
button:not(.disabled) { cursor: pointer; }
p:not(:last-child)    { margin-bottom: 20px; }
input:not([type=submit]):not([type=reset]) { }

/* :is() — группировка (специфичность берётся от аргумента) */
:is(h1, h2, h3) { font-weight: bold; }
:is(.card, .panel) > p { margin: 0; }

/* :where() — то же но специфичность 0 */
:where(h1, h2, h3) { color: inherit; }

/* :has() — "если содержит" (CSS parent selector) */
.card:has(img) { padding: 0; }
label:has(+ input:required)::after { content: ' *'; color: red; }
```

## Формы и состояния

```css
input:valid   { border-color: green; }
input:invalid { border-color: red; }
input:required { background: #fff9c4; }
input:optional { opacity: 0.8; }

input:disabled { opacity: 0.5; cursor: not-allowed; }
input:enabled  { cursor: text; }
input:readonly { background: #f5f5f5; }

input[type="checkbox"]:checked + label { font-weight: bold; }
input[type="radio"]:checked + label   { color: blue; }
```

## Ссылки

```css
/* Порядок важен! (LVHA) */
a:link    { color: blue; }    /* непосещённая */
a:visited { color: purple; }  /* посещённая */
a:hover   { color: red; }     /* наведение */
a:active  { color: orange; }  /* нажатие */
```

## Комбинаторы

```css
div p    { }  /* descendant — все p внутри div */
div > p  { }  /* child — только прямые дети p */
h1 + p   { }  /* adjacent sibling — p сразу после h1 */
h1 ~ p   { }  /* general sibling — все p после h1 */
```
