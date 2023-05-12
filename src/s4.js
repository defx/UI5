const debounce = (callback) => {
  let timeoutId = null
  return (...args) => {
    window.cancelAnimationFrame(timeoutId)
    timeoutId = window.requestAnimationFrame(() => {
      callback.apply(null, args)
    })
  }
}

export const createStore = (reducer, middleware = []) => {
  const subscribers = new Set()

  let state = reducer()

  const store = {
    getState() {
      return { ...state }
    },
    dispatch(type, payload) {
      middleware.forEach((fn) => fn(type, payload, store))
      state = reducer(store.getState(), type, payload)
      publish()
    },
    subscribe(fn) {
      subscribers.add(fn)
    },
  }

  const publish = () => {
    for (const fn of subscribers.values()) {
      fn(store.getState())
    }
  }

  return store
}
