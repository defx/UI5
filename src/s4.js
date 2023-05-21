const debounce = (callback) => {
  let timeoutId = null
  return (...args) => {
    window.cancelAnimationFrame(timeoutId)
    timeoutId = window.requestAnimationFrame(() => {
      callback.apply(null, args)
    })
  }
}

export const createStore = (initialState, updateFns, middleware = []) => {
  const subscribers = new Set()
  let state = { ...initialState }

  const store = {
    setState(fn) {
      state = fn(state)
    },
    getState() {
      return { ...state }
    },
    dispatch(type, payload) {
      middleware.forEach((fn) => fn(type, payload, store))

      if (typeof updateFns[type] === "function") {
        state = updateFns[type](store.getState(), payload)
        store.publish()
      }
    },
    subscribe(fn) {
      subscribers.add(fn)
    },
    publish() {
      for (const fn of subscribers.values()) {
        fn(store.getState())
      }
    },
  }

  return store
}
