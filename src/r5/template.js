import { looksLikeATemplate } from "./helpers.js"

const isPrimitive = (v) => v === null || typeof v !== "object"

function mergeTemplateEvents(a, b) {
  a.types.push(...b.types)
  a.handlers = {
    ...a.handlers,
    ...b.handlers,
  }
  return a
}

function stars(n) {
  return new Array(n).fill("*").join("")
}

function wrap(v) {
  if (Array.isArray(v)) {
    return `<!--{-->${v
      .map(({ id, markup }) => `<!--#${id}-->${markup}`)
      .join("")}<!--}-->`
  }
  if (looksLikeATemplate(v)) {
    return `<!--[-->${v.markup}<!--]-->`
  }
  return `<!--{-->${v || ""}<!--}-->`
}

let handlerId = 0

export function html(strings, ...values) {
  const L = values.length - 1
  let p = -1

  const event = {
    types: [],
    handlers: {},
  }

  const markup = strings.reduce((markup, string, i) => {
    let str =
      markup +
      string.replace(/<\/[\n\s]*textarea[\n\s]*>/, "</textarea><!--&-->")

    if (i > L) return str

    const isElement = str.match(/<[^>]+$/)
    const isAttributeValue = str.match(/(\w+-?\w+)=['"]{1}([^'"]*)$/)

    if (looksLikeATemplate(values[i]?.[0])) {
      values[i].forEach((v) => mergeTemplateEvents(event, v.event))
    }

    if (isElement) {
      const startOpenTag = str.lastIndexOf("<")
      const placeholder = str.slice(0, startOpenTag).match(/<!--(\*+)-->$/)

      if (placeholder) {
        const n = placeholder[1].length
        str =
          str
            .slice(0, startOpenTag)
            .replace(/<!--(\*+)-->$/, `<!--${stars(n + 1)}-->`) +
          str.slice(startOpenTag)
      } else {
        str = str.slice(0, startOpenTag) + `<!--*-->` + str.slice(startOpenTag)
        p++
      }

      if (isAttributeValue) {
        if (isAttributeValue[1].startsWith("on")) {
          const type = isAttributeValue[1].slice(2)
          event.types.push(type)
          let id = handlerId++
          event.handlers[id] = values[i]
          str = str.replace(/\s(on[\w]+=['""'])$/, " data-$1")
          return str + id
        }

        const v = values[i]

        if (isPrimitive(v)) {
          return str + v
        } else {
          return str + `{{${i}}}`
        }
      } else {
        const v = values[i]
        if (v) {
          return str + `${v}`
        } else {
          return str
        }
      }
    }

    if (str.match(/<textarea[\s\n\r][^>]+>$/m)) {
      return str + values[i]
    }

    const v = values[i]

    if (v === 0) {
      return str + v
    }

    return str + wrap(v)
  }, "")

  return {
    markup,
    strings,
    values,
    event: {
      types: [...new Set(event.types)],
      handlers: event.handlers,
    },
    key(v) {
      this.id = v
      return this
    },
  }
}
