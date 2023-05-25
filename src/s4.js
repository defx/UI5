export const createStore = (initialState, updateFns) => {
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
      if (typeof updateFns[type] !== "function") return
      state = updateFns[type](store.getState(), payload)
      store.publish()
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
