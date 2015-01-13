function isObject (o) { return o && 'object' === typeof o }

function traverse (obj, each) {
  if(Buffer.isBuffer(obj) || !isObject(obj)) return
  if(!Array.isArray(obj)) each(obj)
  for(var k in obj) {
    if(isObject(obj[k])) traverse(obj[k], each)
  }
}

exports.indexLinks = function (msg, opts, each) {
  if (typeof opts == 'function') {
    each = opts
    opts = null
  }
  if (typeof opts == 'string')
    opts = { rel: opts }
  var _rel    = (opts && opts.rel)
  var _tomsg  = (opts && opts.tomsg)
  var _tofeed = (opts && opts.tofeed)
  var _toext  = (opts && opts.toext)
  traverse(msg, function (obj) {
    if (!obj.rel || (_rel && obj.rel !== _rel)) return
    if (_tomsg  && !obj.msg) return
    if (_tofeed && !obj.feed) return
    if (_toext  && !obj.ext) return
    each(obj)
  })
}

exports.getLinks = function(msg, opts) {
  var links = []
  exports.indexLinks(msg, opts, function (link) {
    links.push(link)
  })
  return links
}