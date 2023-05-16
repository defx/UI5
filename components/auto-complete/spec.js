import { render, html, container } from "../../src/index.js"
import "./index.js"

describe("AutoComplete", () => {
  let rootNode

  beforeEach(() => {
    rootNode = document.createElement("root-node")
    document.body.appendChild(rootNode)
  })

  afterEach(() => {
    // document.body.removeChild(rootNode)
  })

  it("...", () => {
    const suggestions = [
      {
        id: 0,
        text: "napoli",
      },
      {
        id: 1,
        text: "juventus",
      },
      {
        id: 2,
        text: "lazio",
      },
      {
        id: 3,
        text: "inter milan",
      },
      {
        id: 4,
        text: "ac milan",
      },
      {
        id: 5,
        text: "atalanta",
      },
      {
        id: 6,
        text: "roma",
      },
      {
        id: 7,
        text: "fiorentina",
      },
      {
        id: 8,
        text: "udinese",
      },
      {
        id: 9,
        text: "bologna",
      },
      {
        id: 10,
        text: "monza",
      },
      {
        id: 11,
        text: "torino",
      },
      {
        id: 12,
        text: "sassuolo",
      },
      {
        id: 13,
        text: "empoli",
      },
      {
        id: 14,
        text: "salernitana",
      },
      {
        id: 15,
        text: "lecce",
      },
      {
        id: 16,
        text: "hellas verona",
      },
      {
        id: 17,
        text: "spezia",
      },
      {
        id: 18,
        text: "cremonese",
      },
      {
        id: 19,
        text: "sampdoria",
      },
    ]

    const initialState = {
      "serie-a": { suggestions },
    }

    container("x-container", (state = initialState) => state)

    render(
      html`<x-container>
        <auto-complete ns="serie-a"></auto-complete>
      </x-container>`,
      rootNode
    )
  })
})
