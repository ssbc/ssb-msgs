var ref = require('ssb-ref')

function isObject (o) { return o && 'object' === typeof o }
function isBool (o) { return 'boolean' === typeof o }
function isString (s) { return 'string' === typeof s }

function traverse (obj, each) {
  for (var k in obj) {
    if (!isObject(obj[k]))
      continue
    if (Array.isArray(obj[k])) {
      obj[k].forEach(function (v) {
        each(v, k)
      })
    } else
      each(obj[k], k)
  }
}

exports.indexLinks = function (msg, opts, each) {
  if (typeof opts == 'function') {
    each = opts
    opts = null
  }
  if (typeof opts == 'string')
    opts = { rel: opts }
  if (!opts)
    opts = {}
  var msg  = opts.msg  || opts.tomsg
  var feed = opts.feed || opts.tofeed
  var blob = opts.blob || opts.toblob
  var any  = !(msg || feed || blob)
  traverse(msg, function (obj, rel) {
    if (opts.rel && rel !== opts.rel) return

    if (any) {
      if (!ref.isLink(obj.link)) return
    } else {
      var t = ref.type(obj.link)
      if (msg) {
        if (isBool(msg) && t != 'msg') return 
        if (!isBool(msg) && obj.link != msg) return
      }

      if (feed) {
        if (isBool(feed) && t != 'feed') return 
        if (!isBool(feed) && obj.link != feed) return
      }

      if (blob) {
        if (isBool(blob) && t != 'blob') return 
        if (!isBool(blob) && obj.link != blob) return
      }
    }

    each(obj, rel)
  })
}

exports.link =
exports.asLink = function (obj, type) {
  if (!obj || !isObject(obj))
    return null
  return isLink(obj, type) ? obj : null
}

exports.links =
exports.asLinks = function (obj, type) {
  if (!obj || !isObject(obj))
    return []
  var arr = Array.isArray(obj) ? obj : [obj]
  return arr.filter(function (l) { return isLink(l, type) })
}

var isLink =
exports.isLink = function (obj, type) {
  if (type)
    return obj.link && ref.type(obj.link) == type
  return ref.isLink(obj.link)
}
