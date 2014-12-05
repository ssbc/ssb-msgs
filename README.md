# SSB Messages

Message-processing tools for secure-scuttlebutt

```js
var mlib = require('ssb-msgs')
```

### indexLinks(msg: Object, each: Function(link: Object))

Traverses an message and runs the `each` function on all found links.

```js
var msg = {
  foo: { rel: 'foo-link', msg: 'id...' },
  bar: {
    baz: { rel: 'baz-link', feed: 'id...' }
  }
}
mlib.indexLinks(msg, function(link) {
  console.log(link.rel, link.msg || link.feed || link.ext)
})
// output:
// 'foo-link' 'id...'
// 'baz-link' 'id...'
```

### getLinks(msg: Object, [rel: String])

Traverses a message and returns all found links.

```js
var msg = {
  foo: { rel: 'foo-link', msg: 'id...' },
  bar: {
    baz: { rel: 'baz-link', feed: 'id...' }
  }
}
console.log(mlib.getLinks(msg))
// output:
// [ {rel: 'foo-link', msg: 'id...'}, {rel: 'baz-link', feed: 'id...'}]
console.log(mlib.getLinks(msg, 'foo-link'))
// output:
// [ {rel: 'foo-link', msg: 'id...'}]
```