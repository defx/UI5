import { render, html } from "../src/index.js"

import "../components/carousel/index.js"

describe("components/carousel", () => {
  let rootNode

  beforeEach(() => {
    rootNode = document.createElement("root-node")
    document.body.appendChild(rootNode)
  })

  afterEach(() => {
    // document.body.removeChild(rootNode)
  })

  it("...", () => {
    render(
      html`
        <c8-carousel>
          <img src="http://placekitten.com/200/300" />
          <img src="http://placekitten.com/250/300" />
          <img src="http://placekitten.com/300/250" />
          <img src="http://placekitten.com/300/200" />
        </c8-carousel>
      `,
      rootNode
    )
  })
})
