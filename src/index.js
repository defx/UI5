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
        const store = createStore(reducer)

        this.dispatchEvent(
          new CustomEvent("c8/subscribe", {
            bubbles: true,
            detail: {
              ns,
              store,
            },
          })
        )

        const update = (state) =>
          render(templateFn(state, store.dispatch), this)

        update(store.getState())
        store.subscribe(update)
      }
    }
  )
}

export const container = (name, reducer = () => ({}), middleware = []) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const storeA = createStore(reducer, middleware)
        this.addEventListener("c8/subscribe", (e) => {
          const { store: storeB, ns } = e.detail

          storeB.setState((current) => ({
            ...current,
            ...storeA.getState()[ns],
          }))

          storeA.subscribe(() => {
            storeB.setState((current) => ({
              ...current,
              ...storeA.getState()[ns],
            }))
            storeB.publish()
          })

          storeB.subscribe(() => {
            storeA.setState((current) => ({
              ...current,
              [ns]: storeB.getState(),
            }))
          })

          e.stopPropagation()
        })

        this.$dispatch = storeA.dispatch
      }
    }
  )
}
