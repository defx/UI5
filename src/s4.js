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
  let state = reducer()

  const subscribers = new Set()

  const getState = () => ({ ...state })

  const publish = () => {
    for (const fn of subscribers.values()) {
      fn(getState())
    }
  }

  const dispatch = (type, payload) => {
    middleware.forEach((fn) => fn(type, payload, { getState, dispatch }))
    state = reducer(getState(), type, payload)
    publish()
  }

  const subscribe = (fn) => subscribers.add(fn)

  return {
    getState,
    dispatch,
    subscribe,
    setState: (fn) => (state = fn(state)),
  }
}
