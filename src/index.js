import { render } from "./r5.js"
import { createStore } from "./s4.js"

export { html, render } from "./r5.js"
export { createStore } from "./s4.js"

export const define = (name, templateFn, reducer = () => ({})) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const { subscribe, dispatch, getState } = createStore(reducer)
        const update = (state) => render(templateFn(state, dispatch), this)

        update(getState())
        subscribe(update)
      }
    }
  )
}
