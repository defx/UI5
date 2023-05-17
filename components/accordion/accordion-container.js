import { container } from "../../src/index.js"

const initialState = {
  items: [],
}

const reducer = (state = initialState, type, payload) => {
  switch (type) {
    default: {
      return {
        ...state,
      }
    }
  }
}

container("x-accordion", reducer)
