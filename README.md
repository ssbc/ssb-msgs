# SSB Messages

Message-processing tools for secure-scuttlebutt

```js
var mlib = require('ssb-msgs')
```

### indexLinks(msg: Object, each: Function(link: Object))

Traverses an object and extracts all links in it.

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