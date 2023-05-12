import { define, container, render, html } from "../src/index.js"

describe("container", () => {
  let rootNode

  beforeEach(() => {
    rootNode = document.createElement("root-node")
    document.body.appendChild(rootNode)
  })

  afterEach(() => {
    // document.body.removeChild(rootNode)
  })

  it("...", () => {
    const initialState = {
      french: {
        greeting: "Salut tout le monde!",
      },
      german: {
        greeting: "Hallo Welt!",
      },
    }

    container("container-x", (state = initialState, type, payload) => {
      switch (type) {
        case "reset": {
          return initialState
        }
        default: {
          return state
        }
      }
    })

    define(
      "component-a",
      ({ greeting = "Hello world!", greetingInput = "" }, dispatch) =>
        html`<p>${greeting}</p>
          <input
            oninput="${(e) =>
              dispatch("greetingInput", { text: e.target.value })}"
            value="${greetingInput}"
          />
          <button onclick="${() => dispatch("updateGreeting")}">
            update
          </button>`,
      (state, type, payload) => {
        switch (type) {
          case "greetingInput": {
            return {
              ...state,
              greetingInput: payload.text,
            }
          }
          case "updateGreeting": {
            return {
              ...state,
              greeting: state.greetingInput,
              greetingInput: "",
            }
          }
          default: {
            return state
          }
        }
      }
    )

    render(
      html`
        <container-x>
          <component-a ns="french"></component-a>
          <component-a ns="german"></component-a>
        </container-x>
      `,
      rootNode
    )

    assert.equal(
      rootNode.querySelector(`component-a[ns="french"] p`).textContent,
      initialState.french.greeting
    )

    assert.equal(
      rootNode.querySelector(`component-a[ns="german"] p`).textContent,
      initialState.german.greeting
    )

    rootNode.querySelector(`component-a[ns="french"] input`).value = "bonjour!"
    rootNode
      .querySelector(`component-a[ns="french"] input`)
      .dispatchEvent(new Event("input", { bubbles: true }))
    rootNode.querySelector(`component-a[ns="french"] button`).click()

    assert.equal(
      rootNode.querySelector(`component-a[ns="french"] p`).textContent,
      "bonjour!"
    )

    rootNode.querySelector(`container-x`).$dispatch("reset")

    assert.equal(
      rootNode.querySelector(`component-a[ns="french"] p`).textContent,
      initialState.french.greeting
    )

    assert.equal(
      rootNode.querySelector(`component-a[ns="german"] p`).textContent,
      initialState.german.greeting
    )
  })
})
