# @defx/c8

## [![npm](https://img.shields.io/npm/v/@defx/c8.svg)](http://npm.im/@defx/c8) [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/c8/dist/c8.min.js?compression=gzip&label=gzip)]()

The little JavaScript library for building UI as a pure function of state

```js
import { html, define } from "@defx/c8"

const template = (state, dispatch) => html`
  <p>${state.count}</p>
  <button onclick="${() => dispatch("incrementCount")}"></button>
`

const initialState = { count: 0 }

const store = {
  count: 0,
  incrementCount: (state) => ({ ...state, count: state.count + 1 }),
}

define("simple-counter", template, store)
```

c8 components...

- are described as pure / idempotent functions
- are easy to test (no need to mock the internals)
- use standard ES Template Literals
- require no pre-compilation

## UI as a function of state

...

## Components that are easy to test

...

### Install via NPM

```sh
npm install @defx/c8
```

### Import via CDN

```js
import { html, define } from "https://www.unpkg.com/@defx/c8"
```

## API

### define

c8 uses standard Custom Elements as reusable component containers. attribute and property reflection is inferred from usage rather than declaraed implicitly.

```ts
define(
    /**
     * As per the Web Component spec, the name of a Custom Element must be at least two words separated by a hyphen, so as to differentiate from native built-in elements
    */
    name: string,
    template: TemplateFunction,
    reducer: ReducerFunction
    )
```

### html

The HTML function is a Tag Function that accepts an HTML Template Literal. It returns an [R5](https://github.com/defx/r5) template object, which is essentially a description of what needs to be rendered. You can use any synchronous JavaScript logic you like here, as long as you return a string of valid HTML. The only non-standard syntax supported is to enable event binding; bind any event to a node using `on-*` attributes, - the value you supply here should be a function that invokes the `dispatch` function to send a payload to a named handler.
