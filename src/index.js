import { render } from "./r5.js"
import { getState, dispatch, subscribe, ready } from "./s4.js"

export { html } from "./r5.js"
export { configure } from "./s4.js"

export const define = (name, fn) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const update = (state) => render(fn(state, dispatch), this)
        await ready
        update(getState())
        subscribe(update)
      }
    }
  )
}
