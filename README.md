# SSB Messages

Message-processing tools for secure-scuttlebutt

```js
var mlib = require('ssb-msgs')
```

### indexLinks(msg: Object, each: Function(link: Object))

Traverses an message and runs the `each` function on all found links.

```js
var msg = {
  foo: { $rel: 'foo-link', $msg: Buffer(...) },
  bar: {
    baz: { $rel: 'baz-link', $feed: Buffer(...) }
  }
}
mlib.indexLinks(msg, function(link) {
  console.log(link.$rel, link.$msg || link.$feed || link.$ext)
})
// output:
// 'foo-link' <Buffer ...>
// 'baz-link' <Buffer ...>
```

### getLinks(msg: Object, [rel: String])

Traverses a message and returns all found links.

```js
var msg = {
  foo: { $rel: 'foo-link', $msg: Buffer(...) },
  bar: {
    baz: { $rel: 'baz-link', $feed: Buffer(...) }
  }
}
console.log(mlib.getLinks(msg))
// output:
// [ {$rel: 'foo-link', $msg: <Buffer ...>}, {$rel: 'baz-link', $feed: <Buffer ...>}]
console.log(mlib.getLinks(msg, 'foo-link'))
// output:
// [ {$rel: 'foo-link', $msg: <Buffer ...>}]
```