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

### asLinks

```
asLinks(obj: Any, [requiredAttr: String])
```

Helper to get links from a message in a regular array form.

```js
var msg = {
  foo: { msg: 'msgid' },
  bar: [{ feed: 'feedid' }]
}
mlib.asLinks(msg.foo) // => [{ msg: 'msgid' }]
mlib.asLinks(msg.bar) // => [{ feed: 'feedid' }]
mlib.asLinks(msg.bar, 'feed') // => [{ feed: 'feedid' }]
mlib.asLinks(msg.bar, 'msg') // => []
mlib.asLinks(msg.baz) // => []
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