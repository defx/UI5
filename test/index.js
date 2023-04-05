import { html, define, configure } from "../src/index.js"

describe("ui5", () => {
  it("", async () => {
    const initialState = {
      greeting: "Hello World!",
    }

    configure((state = initialState, type, payload) => {
      switch (type) {
        case "greetinginput": {
          return {
            ...state,
            greetingInput: payload.value,
          }
        }
        case "updategreeting": {
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
    })

    const HelloWorld = ({ greeting, greetingInput = "" }, dispatch) => {
      return html`<p>${greeting}</p>
        <input
          type="text"
          oninput="${(e) => {
            dispatch("greetinginput", {
              value: e.target.value,
            })
          }}"
          value="${greetingInput}"
        />
        <button
          ${greetingInput?.length ? "" : "disabled"}
          type="button"
          onclick="${() => dispatch("updategreeting")}"
        >
          submit
        </button>`
    }

    define("hello-world", HelloWorld)

    const wc = document.createElement("hello-world")
    document.body.appendChild(wc)
    await nextFrame()

    const node = document.querySelector(`hello-world`)
    assert.equal(node.querySelector("p").textContent, "Hello World!")
    assert.ok(node.querySelector("button").disabled)
    node.querySelector("input").value = "Hola Mundo!"
    node
      .querySelector("input")
      .dispatchEvent(new Event("input", { bubbles: true }))
    await nextFrame()
    assert.notOk(node.querySelector("button").disabled)
    node.querySelector("button").click()
    await nextFrame()
    assert.equal(node.querySelector("p").textContent, "Hola Mundo!")
    assert.equal(node.querySelector("input").value, "")
  })
})
