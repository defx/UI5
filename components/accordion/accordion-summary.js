import { define, html } from "../../src/index.js"

const initialState = {
  items: [],
}

const template = (state, dispatch) => html`
  <div>
    <button onclick="${() => dispatch("toggleDetails")}">toggle</button>
  </div>
`

const reducer = (state = initialState, type, payload) => {
  switch (type) {
    default: {
      return {
        ...state,
      }
    }
  }
}

define("accordion-summary", template, reducer)
