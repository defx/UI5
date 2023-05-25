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

  it("renders slides with custom html", async () => {
    render(
      html`<c8-carousel
        slides="${[
          html`<p>Slide #foo</p>`,
          html`<p>Slide #bar</p>`,
          html`<p>Slide #baz</p>`,
        ]}"
      ></c8-carousel>`,
      rootNode
    )

    assert.deepEqual(
      [...rootNode.querySelectorAll(`c8-carousel p`)].map((v) => v.textContent),
      ["Slide #foo", "Slide #bar", "Slide #baz"]
    )

    render(
      html`<c8-carousel
        slides="${[
          html`<img src="http://placekitten.com/200/200" />`,
          html`<img src="http://placekitten.com/300/200" />`,
          html`<img src="http://placekitten.com/g/200/300" />`,
        ]}"
      ></c8-carousel>`,
      rootNode
    )
  })
})
