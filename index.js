function isObject (o) { return o && 'object' === typeof o }

function traverse (obj, each) {
  if(Buffer.isBuffer(obj) || !isObject(obj)) return
  if(!Array.isArray(obj)) each(obj)
  for(var k in obj) {
    if(isObject(obj[k])) traverse(obj[k], each)
  }
}

exports.indexLinks = function (msg, each) {
  traverse(msg, function (obj) {
    if(obj.$rel && (obj.$msg || obj.$ext || obj.$feed)) each(obj)
  })
}

exports.getLinks = function(msg, rel) {
  var links = []
  exports.indexLinks(msg, function(link) {
    if (!rel)
      links.push(link)
    else if (link.$rel == rel)
      links.push(link)
  })
  return links
}