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
      "/components/carousel/images/marek-piwnicki-xVYubikEPAE-unsplash.jpg",
      "/components/carousel/images/pascal-bullan-mI3lDsFHgMo-unsplash.jpg",
      "/components/carousel/images/shana-van-roosbroek-uk130hh9JMQ-unsplash.jpg",
    ]

    render(
      html`<c8-carousel
        slides="${slides.map(
          (path, i) =>
            html`<img src="${path}" loading="${i ? "lazy" : "eager"}" />`
        )}"
      ></c8-carousel>`,
      rootNode
    )
  })
})
