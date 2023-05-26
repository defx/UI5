export const first = (v) => v[0]

export const last = (v) => v[v.length - 1]

export const walk = (node, callback, deep = true) => {
  if (!node) return

  let v = callback(node)
  if (v === false || v === null) return
  if (v?.nodeName) return walk(v, callback, deep)

  if (deep) walk(node.firstChild, callback, deep)
  if (v === 1) return
  walk(node.nextSibling, callback, deep)
}

export function templateNodeFromString(str) {
  let node = document.createElement("template")
  node.innerHTML = str.trim()
  return node
}

export function looksLikeATemplate(o) {
  return !!(o?.markup && o?.strings)
}

export const debounce = (callback) => {
  let timeoutId = null
  return (...args) => {
    window.cancelAnimationFrame(timeoutId)
    timeoutId = window.requestAnimationFrame(() => {
      callback.apply(null, args)
    })
  }
}

export function nodeFromString(str) {
  console.log(str)

  /*
  
  oh this is weird, if my top-level node is a template, then it gets attached to the head instead of the body :/
  
  */

  const doc = new DOMParser().parseFromString(str.trim(), "text/html", {
    includeShadowRoots: true,
  })

  const errorNode = doc.querySelector("parsererror")

  if (errorNode) {
    console.log("error!")
  } else {
    return doc.head.firstChild || doc.body.firstChild
  }

  let tpl = document.createElement("template")
  console.log("NO WAY", str)
  tpl.innerHTML = str.trim()
  return tpl.content.cloneNode(true)
}
