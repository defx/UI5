export { html } from "./template.js"
import { update } from "./update.js"
import { nodeFromString } from "./helpers.js"

const nodes = new WeakSet()
const isServer = typeof window === "undefined"
const eventListeners = new WeakMap()

function findTarget(node, predicate) {
  if (predicate(node)) return node
  return findTarget(node.parentNode, predicate)
}

export function bindEvents(rootNode, templateResult) {
  const {
    event: { types = [], handlers = {} },
  } = templateResult
  if (typeof window === "undefined") return

  const listeners = eventListeners.get(rootNode) || {}

  rootNode.$handlers = handlers

  types.forEach((type) => {
    if (type in listeners) return

    listeners[type] = (e) => {
      const target = findTarget(e.target, (node) => node.dataset[`on${type}`])
      const k = target?.dataset[`on${type}`]

      rootNode.$handlers[k]?.(e)
    }
    rootNode.addEventListener(type, listeners[type])
  })
  eventListeners.set(rootNode, listeners)
}

export function render(templateResult, rootNode) {
  const { markup } = templateResult

  if (isServer || !rootNode) return markup

  if (!nodes.has(rootNode)) {
    if (rootNode.innerHTML !== markup) {
      rootNode.prepend(nodeFromString(markup))
    }
    nodes.add(rootNode)
  }

  update(templateResult, rootNode.firstChild)

  bindEvents(rootNode, templateResult)
}
