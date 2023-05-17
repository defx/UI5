import { render } from "./r5/index.js"
import { createStore } from "./s4.js"

export { html, render } from "./r5/index.js"
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
