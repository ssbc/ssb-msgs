var ref = require('ssb-ref')

function isObject (o) { return o && 'object' === typeof o }
function isBool (o) { return 'boolean' === typeof o }
function isString (s) { return 'string' === typeof s }

function toArray (v, force) {
  if (Array.isArray(v))
    return v

  // maybe it's an array-like object? (object with ordered numeric keys)
  var i=0, arr=[]
  if (isObject(v)) {
    while (v[i]) {
      arr[i] = v[i]
      i++
    }
    if (Object.keys(arr).length > 0)
      return arr // it was!
  }

  // it wasnt...
  if (force) {
    // ...just put v in the arr
    arr.push(v)
    return arr
  }
  return v
}

function traverse (obj, each) {
  for (var k in obj) {
    if (!obj[k])
      continue
    var arr = toArray(obj[k], false)
    if (Array.isArray(arr)) {
      arr.forEach(function (v) {
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
  var arr = toArray(obj, true)
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
