import { define, html } from "../src/index.js"

const initialState = {
  searchText: "",
  suggestions: [],
}

const reducer = (state = initialState, type, payload) => {
  switch (type) {
    case "searchTextInput": {
      return {
        ...state,
        searchText: payload.text,
        filteredSuggestions: state.suggestions.filter(({ text }) =>
          text.includes(payload.text)
        ),
      }
    }
    case "suggestionClick": {
      return {
        ...state,
        searchText: state.suggestions.find(({ id }) => id === payload.id).text,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

const template = (
  { suggestions = [], filteredSuggestions = suggestions },
  dispatch
) =>
  html`
    <input
      type="text"
      oninput="${(e) => dispatch("searchTextInput", { text: e.target.value })}"
    />
    <ul>
      ${filteredSuggestions.map(({ id, text }) =>
        html`<li onclick="${() => dispatch("suggestionClick", { id })}">
          ${text}
        </li> `.key(id)
      )}
    </ul>
  `

define("auto-complete", template, reducer)
