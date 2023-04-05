# @defx/c8

## [![gzip size](https://img.badgesize.io/https://unpkg.com/@defx/c8/dist/c8.min.js?compression=gzip&label=gzip)]()

The little JavaScript library for building pure, functional, UI components connected via a single state container.

## Rationale

Many modern UI applications quickly become hard to maintain due to indirection and fragmentation of state. "prop-drilling" is one form of passing state within an application from component to component and is something that doesn't scale well as a project evolves, - as more and more components are introduced, it becomes harder to trace the source of a value, and more cumbersome to introduce new values where they are needed in the document tree. Internal component state via hooks (React) or some other mechanism is a second way that state exists within many UI apps, increasing the complexity of components (and in turn the application) by making components non-idempotent (calling a component with the same arguments doesn't necessarily yield the same result). Finally, there is almost always some requirement for shared state within a UI application that cannot be met be either of the first two approaches and necessitates the introduction of a third state layer, whether that be shared hooks, "data providers", a state container, or whatever. Having state fragmented between 2 or 3 layers like this makes applications unnecessarily difficult to reason about, with states that can be difficult to recreate, and seemingly innocuous changes requiring multiple changes throughout the application due to coupling between components and their dependencies. Components often require dependencies in order to enable their shared (or even internal) state, and then these dependencies need to be mocked within component tests, making the tests dependent on the internal implementation and also harder to maintain.

c8 is designed to reduce the problem space by enabling components that do not communicate via props/attributes, only via the central store container. components are described as pure render functions using ES Template Literals that accept two arguments, the current state of the application, and the store containers `dispatch` function. this makes testing a breeze, because a components inputs and outputs flow through these two arguments, so there should be no need for mocking a components internals because we already have everything we need to define and test all of the inputs and outputs. state is always shared via the same container, so capturing and/or recreating a particular state is much simpler.

### Install via NPM

```sh
npm install @defx/c8
```

### Import via CDN

```js
import { html } from "https://www.unpkg.com/@defx/c8"
```

## Common Types

```ts
type Primitive = string | boolean | number | null

type SerialisableObject = Record<string, Primitive | SerialisableObject>

type dispatch = {
  (
    /**
     * The identifying type of the action
     */
    type: string,
    /**
     * An object containing any values required to update state
     */
    payload: SerialisableObject
  )
}

/**
 * A Reducer function takes the current application state, the type of the dispatched action, and the action payload, and it returns the next state of the application.
 */
type Reducer = {
  (state: SerialisableObject, type: string, payload: SerialisableObject)
}

type RenderFunction = {
  (state: SerialisableObject, dispatch: Dispatch)
}
```

## API

### define

c8 uses standard Custom Elements as reusable component containers. This is the only part of the Web Component API that is currently utilised. As per the design constraints, there is no attribute/property reflection.

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
