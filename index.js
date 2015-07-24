var ref = require('ssb-ref')

function isObject (o) { return o && 'object' === typeof o }
function isBool (o) { return 'boolean' === typeof o }
function isString (s) { return 'string' === typeof s }

function traverse (obj, each) {
  for (var k in obj) {
    if (!obj[k])
      continue
    if (Array.isArray(obj[k])) {
      obj[k].forEach(function (v) {
        each(v, k)
      })
    } else
      each(obj[k], k)
  }
}

exports.indexLinks = function (message, opts, each) {
  if (typeof opts == 'function') {
    each = opts
    opts = null
  }
  if (typeof opts == 'string')
    opts = { rel: opts }
  if (!opts)
    opts = {}
  var msg  = opts.msg
  var feed = opts.feed
  var blob = opts.blob
  var any  = !(msg || feed || blob)

  traverse(message, function (obj, rel) {
    if (opts.rel && rel !== opts.rel) return

    var r = (typeof obj == 'string') ? obj : obj.link
    if (any) {
      if (!ref.isLink(r)) return
    } else {
      if (msg) {
        if (isBool(msg) && ref.type(r) != 'msg') return 
        if (!isBool(msg) && r != msg) return
      }

      if (feed) {
        if (isBool(feed) && ref.type(r) != 'feed') return 
        if (!isBool(feed) && r != feed) return
      }

      if (blob) {
        if (isBool(blob) && ref.type(r) != 'blob') return 
        if (!isBool(blob) && r != blob) return
      }
    }

    each((typeof obj == 'string') ? { link: obj } : obj, rel)
  })
}

exports.link =
exports.asLink = function (obj, type) {
  if (!obj)
    return null
  if (isString(obj))
    obj = { link: obj }
  return isLink(obj, type) ? obj : null
}

exports.links =
exports.asLinks = function (obj, type) {
  if (!obj)
    return []
  var arr = Array.isArray(obj) ? obj : [obj]
  return arr
    .filter(function (l) { return isLink(l, type) })
    .map(function (o) { return (typeof o == 'string') ? { link: o } : o })
}

var isLink =
exports.isLink = function (obj, type) {
  if (!obj)
    return false
  var r = (isString(obj)) ? obj : obj.link
  return (type) ? (ref.type(r) == type) : ref.isLink(r)
}
