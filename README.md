# SSB Messages

Message-processing tools for secure-scuttlebutt

```js
var mlib = require('ssb-msgs')
```

### indexLinks

```
indexLinks(msg: Object, [opts: Options], each: Function(link: Object, rel: String))
where Options = { rel: String, msg: Bool/String, feed: Bool/String, ext: Bool/String }
```

Traverses a message and runs the `each` function on all found links. All `opts` fields are optional. `Opts` may also be a string, in which case it is the rel attribute

```js
var msg = {
  foo: { msg: 'msgid' },
  bar: [{ feed: 'feedid' }]
}
function print (link, rel) {
  console.log(rel, link.msg || link.feed || link.ext)  
}
mlib.indexLinks(msg, print)
// => foo msgid
// => bar feedid
mlib.indexLinks(msg, 'foo', print)
// => foo msgid
mlib.indexLinks(msg, { rel: 'foo' }, print)
// => foo msgid
mlib.indexLinks(msg, { feed: true }, print)
// => bar feedid
mlib.indexLinks(msg, { feed: 'feedid' }, print)
// => bar feedid
```

### links (or asLinks)

```
links(obj: Any, [requiredAttr: String])
```

Helper to get links from a message in a regular array form.

```js
var msg = {
  foo: { msg: 'msgid' },
  bar: [{ feed: 'feedid' }]
}
mlib.links(msg.foo) // => [{ msg: 'msgid' }]
mlib.links(msg.bar) // => [{ feed: 'feedid' }]
mlib.links(msg.bar, 'feed') // => [{ feed: 'feedid' }]
mlib.links(msg.bar, 'msg') // => []
mlib.links(msg.baz) // => []
```

### link (or asLink)

```
link(obj: Any, [requiredAttr: String])
```

Helper to get a link from a message in a regular object form. If an array is found, will use the first element.

```js
var msg = {
  foo: { msg: 'msgid' },
  bar: [{ feed: 'feedid' }]
}
mlib.link(msg.foo) // => { msg: 'msgid' }
mlib.link(msg.bar) // => { feed: 'feedid' }
mlib.link(msg.bar, 'feed') // => { feed: 'feedid' }
mlib.link(msg.bar, 'msg') // => null
mlib.link(msg.baz) // => null
```

### isLink

```
isLink(obj: Any, [requiredAttr: String])
```

Predicate to test whether an object is a well-formed link. Returns false if given an array.

```js
var msg = {
  foo: { msg: 'msgid' },
  bar: [{ feed: 'feedid' }]
}
mlib.isLink(msg.foo) // => true
mlib.isLink(msg.bar) // => true
mlib.isLink(msg.bar, 'feed') // => true
mlib.isLink(msg.bar, 'msg') // => false
mlib.isLink(msg.baz) // => false
```

### isHash

```
isHash(v: Any)
```

Is the given value a base64-encoded blake2s hash?

```js
mlib.isHash('y2L+rXVdNBLAR4Rc5/2UrIYnm8BS/4srQ60FPxYYqPo=.blake2s')
// => true
mlib.isHash('foo')
// => false
```

```js