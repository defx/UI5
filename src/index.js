import { render } from "./r5/index.js"
import { createStore } from "./s4.js"
import { appendStyles } from "./css.js"

export { html, render } from "./r5/index.js"
export { createStore } from "./s4.js"

export const define = (name, templateFn, _store = {}, css) => {
  if (customElements.get(name)) return

  if (css) appendStyles(name, css)

  const initialState = JSON.parse(JSON.stringify(_store))

  customElements.define(
    name,
    class extends HTMLElement {
      async connectedCallback() {
        const store = createStore(initialState, _store)
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
