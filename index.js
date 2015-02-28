function isObject (o) { return o && 'object' === typeof o }
function isBool (o) { return 'boolean' === typeof o }
function isString (s) { return 'string' === typeof s }

function isHash (data) {
  return isString(data) && /^[A-Za-z0-9\/+]{43}=\.blake2s$/.test(data)
}
exports.isHash = isHash

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
  var _msg  = opts.msg || opts.tomsg
  var _feed = opts.feed || opts.tofeed
  var _ext  = opts.ext || opts.toext
  var _any  = !(_msg || _feed || _ext)
  traverse(msg, function (obj, rel) {
    if (opts.rel && rel !== opts.rel) return

    if (_any) {
      if (!obj.msg && !obj.feed && !obj.ext) return
    }
    else {
      if (_msg) {
        if (isBool(_msg) && !obj.msg) return 
        if (!isBool(_msg) && obj.msg != _msg) return
      }

      if (_feed) {
        if (isBool(_feed) && !obj.feed) return 
        if (!isBool(_feed) && obj.feed != _feed) return
      }

      if (_ext) {
        if (isBool(_ext) && !obj.ext) return 
        if (!isBool(_ext) && obj.ext != _ext) return
      }
    }

    each(obj, rel.toLowerCase())
  })
}

exports.asLinks = function (obj) {
  if (!obj || !isObject(obj))
    return []
  var arr = Array.isArray(obj) ? obj : [obj]
  return arr.filter(function (obj) { return (!!obj.msg || !!obj.feed || !!obj.ext) })
}