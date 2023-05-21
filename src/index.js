import { render } from "./r5/index.js"
import { createStore } from "./s4.js"

export { html, render } from "./r5/index.js"
export { createStore } from "./s4.js"

export const define = (name, templateFn, initialState = {}, updateFns = {}) => {
  if (customElements.get(name)) return

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const store = createStore(initialState, updateFns)
        const observed = new Set()
        const host = this

        const update = (state) => {
          const proxy = new Proxy(state, {
            get(_, name) {
              if (observed.has(name) === false) {
                Object.defineProperty(host, name, {
                  get() {
                    return store.getState()[property]
                  },
                  set(value) {
                    store.setState((state) => ({ ...state, [name]: value }))
                    update(store.getState())
                  },
                })

                observed.add(name)
              }
              return Reflect.get(...arguments)
            },
          })

          render(templateFn(proxy, store.dispatch), this)
        }

        const sa = this.setAttribute
        this.setAttribute = (name, value) => {
          if (observed.has(name)) {
            store.setState((state) => ({ ...state, [name]: value }))
            update(store.getState())
          }
          return sa.apply(this, [name, value])
        }
        const ra = this.removeAttribute
        this.removeAttribute = (name) => {
          if (observed.has(name)) {
            store.setState((state) => ({ ...state, [name]: null }))
            update(store.getState())
          }
          return ra.apply(this, [name])
        }

        update(store.getState())
        store.subscribe(update)
      }
    }
  )
}
