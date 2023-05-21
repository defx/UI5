import { html, define } from "../src/index.js"

describe("c8", () => {
  it("", async () => {
    const initialState = {
      greeting: "Hello World!",
    }

    const updateFns = {
      greetinginput: (state, { value }) => ({ ...state, greetingInput: value }),
      updategreeting: (state) => ({
        ...state,
        greeting: state.greetingInput,
        greetingInput: "",
      }),
    }

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
          onclick="${() => {
            dispatch("updategreeting")
          }}"
        >
          submit
        </button>`
    }

    define("hello-world", HelloWorld, initialState, updateFns)

    const node = document.createElement("hello-world")
    document.body.appendChild(node)
    await nextFrame()

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

    node.setAttribute("greeting", "Hallo Welt!")
    assert.equal(node.querySelector("p").textContent, "Hallo Welt!")

    node.greeting = "Helló világ!"
    assert.equal(node.querySelector("p").textContent, "Helló világ!")
  })
})
