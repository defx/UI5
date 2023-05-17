import { render } from "./r5/index.js"
import { createStore } from "./s4.js"

export { html, render } from "./r5/index.js"
export { createStore } from "./s4.js"

export const define = (name, templateFn, reducer = () => ({})) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const store = createStore(reducer)

        const update = (state) =>
          render(templateFn(state, store.dispatch), this)

        update(store.getState())
        store.subscribe(update)
      }
    }
  )
}
