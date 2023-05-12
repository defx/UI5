import { render } from "./r5.js"
import { createStore } from "./s4.js"

export { html, render } from "./r5.js"
export { createStore } from "./s4.js"

export const define = (name, templateFn, reducer = () => ({})) => {
  if (customElements.get(name)) return

  let c = 0

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const ns = this.getAttribute("ns") || `${name}/${++c}`
        let store = createStore(reducer)

        this.dispatchEvent(
          new CustomEvent("container.subscribe", {
            bubbles: true,
            detail: {
              ns,
              callback: (wrappedStore) => (store = wrappedStore),
              store,
            },
          })
        )

        const { subscribe, dispatch, getState } = store

        const update = (state) => render(templateFn(state, dispatch), this)

        update(getState())
        subscribe(update)
      }
    }
  )
}

export const container = (name, reducer = () => ({})) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const { subscribe, dispatch, getState } = createStore(reducer)
        this.addEventListener("container.subscribe", (e) => {
          const { callback, store, ns } = e.detail
          // @todo: wrap store
          callback(store)
          e.stopPropagation()
        })
      }
    }
  )
}
