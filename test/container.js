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

    container("container-x", () => initialState)

    define(
      "component-a",
      ({ greeting = "Hello world!" }, dispatch) =>
        html`<p>${greeting}</p>
          <input
            oninput="${(e) =>
              dispatch({ type: "foo", payload: { text: e.target.value } })}"
          />`,
      (v) => v
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
  })
})
