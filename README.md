# @defx/c8

## [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/c8/dist/c8.min.js?compression=gzip&label=gzip)]()

The little JavaScript library for building pure, functional, UI components connected via a single state container.

### Install via NPM

```sh
npm install @defx/c8
```

### Import via CDN

```js
import { html, define, configure } from "https://www.unpkg.com/@defx/c8"
```

## API

### define

c8 uses standard Custom Elements as reusable component containers. This is the only part of the Web Component API that is currently utilised. As c8 components all get their data directly from the central state container, there is no attribute/property reflection taking place.

```ts
define(
    /**
     * As per the Web Component spec, the name of a Custom Element must be at least two words separated by a hyphen, so as to differentiate from native built-in elements
    */
    name: string,
    /**
     * See the Reducer type definition above
    */
    templateFn: RenderFunction)
```

### configure

```ts
function configure(
  /**
   * See the Reducer type definition above
   */
  fn: Reducer,
  /**
   * (optional) An array of middleware functions that will be invoked immediately after an action is dispatched and before it is passed to the reducer.
   * Unlike redux, the current design does not pass any continuation function (i.e., "next()"), the functions are all simply invoked with no way to delay or cancel the current action, however, by use of the provided getState and dispatch methods they may dispatch their own actions at a later time (e.g., after the completion of some asynchronous work)
   */
  middleware?: Middleware[]
): void
```

### html

The HTML function is a Tag Function that accepts an HTML Template Literal. It returns an [R5](https://github.com/defx/r5) template object, which is essentially a description of what needs to be rendered. You can use any JS logic you like here, as long as you return valid HTML...the only exception being event handlers, - you can bind any event to a node using `on-*` attributes, - the value you supply here should be a function that invokes the provided `dispatch` function to send an action ({ type, payload }) to the store reducer.

## Rationale

Many modern UI applications quickly become hard to maintain due to coupling between components and state fragmentation. _"Prop-drilling"_ is one form of passing state within an application from component to component and is something that doesn't scale well as a project evolves, - as more and more components are introduced, it becomes harder to trace the source of a value, and harder to introduce new values where they are needed in the document tree. Internal component state via hooks (React) or some other mechanism is a second way that state exists within many UI apps, increasing the complexity of components (and in turn the application) by making components non-idempotent (calling a component with the same arguments doesn't necessarily yield the same result). Finally, there is almost always some requirement for shared state within a UI application that cannot be met be either of the first two approaches and necessitates the introduction of a third state layer, whether that be shared hooks, data "providers", a state container, or suchlike. Having state fragmented across multiple zones like this makes applications unnecessarily difficult to reason about, with states that can be difficult to recreate, and seemingly innocuous changes requiring multiple changes throughout the application due to coupling between components and their dependencies. Components often require dependencies in order to enable their shared and/or internal state, and then these dependencies need to be mocked within component tests, thus making the tests dependent on the internal implementation and also brittle to change.

c8 employs patterns that are designed to reduce the UI problem space by enabling components that do not communicate via props/attributes, only via a central state container. Components are described as pure render functions using ES Template Literals that accept two arguments, the current state of the application, and the state containers `dispatch` function. Following this approach ensures that components are idempotent, and makes component testing a breeze because the sum of a components inputs and outputs flow through these two arguments. state is always shared via the same container, so capturing and/or recreating a particular state becomes trivial, and the flow of data is always predictable and easy to understand.
