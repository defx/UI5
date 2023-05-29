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
    const slides = [
      "/components/carousel/images/eugene-golovesov-nCRnvB-u78Q-unsplash.jpg",
      "/components/carousel//images/marek-piwnicki-xVYubikEPAE-unsplash.jpg",
      "/components/carousel//images/pascal-bullan-mI3lDsFHgMo-unsplash.jpg",
      "/components/carousel//images/shana-van-roosbroek-uk130hh9JMQ-unsplash.jpg",
    ]

    render(
      html`<c8-carousel
        slides="${slides.map((path) => html`<img src="${path}" />`)}"
      ></c8-carousel>`,
      rootNode
    )

    return

    assert.deepEqual(
      [...rootNode.querySelectorAll(`c8-carousel p`)].map((v) => v.textContent),
      ["Slide #foo", "Slide #bar", "Slide #baz"]
    )

    render(
      html`<c8-carousel
        slides="${[
          html`<p>Slide #${"baz"}</p>`,
          html`<p>Slide #${"bar"}</p>`,
          html`<p>Slide #${"foo"}</p>`,
        ]}"
      ></c8-carousel>`,
      rootNode
    )

    assert.deepEqual(
      [...rootNode.querySelectorAll(`c8-carousel p`)].map((v) => v.textContent),
      ["Slide #baz", "Slide #bar", "Slide #foo"]
    )
  })
})
