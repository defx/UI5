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
    container("app-container", () => {})
    define(
      "component-a",
      () => html`<p>hello world!</p>`,
      () => {}
    )

    render(
      html`
        <app-container>
          <component-a></component-a>
          <component-a></component-a>
        </app-container>
      `,
      rootNode
    )
  })
})
