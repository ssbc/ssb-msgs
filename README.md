# SSB Messages

Message-processing tools for secure-scuttlebutt

```js
var mlib = require('ssb-msgs')
```

### indexLinks

`indexLinks(msg: Object, [opts: { rel: String, tomsg: Bool, tofeed: Bool, toext: Bool },] each: Function(link: Object))`

Traverses an message and runs the `each` function on all found links. All `opts` fields are optional. `Opts` may also be a string, in which case it is the rel attribute

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
mlib.indexLinks(msg, { rel: 'foo-link' }, function(link) {
  console.log(link.rel, link.msg || link.feed || link.ext)
})
// output:
// 'foo-link' 'id...'
mlib.indexLinks(msg, 'foo-link', function(link) {
  console.log(link.rel, link.msg || link.feed || link.ext)
})
// output:
// 'foo-link' 'id...'
mlib.indexLinks(msg, { tofeed: true }, function(link) {
  console.log(link.rel, link.feed)
})
// output:
// 'baz-link' 'id...'
```

### getLinks

`getLinks(msg: Object, [opts: { rel: String, tomsg: Bool, tofeed: Bool, toext: Bool }])`

Traverses a message and returns all found links. `Opts` works as in the `indexLinks` function

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
console.log(mlib.getLinks(msg, { rel: 'foo-link' }))
// output:
// [ {rel: 'foo-link', msg: 'id...'}]
console.log(mlib.getLinks(msg, 'foo-link'))
// output:
// [ {rel: 'foo-link', msg: 'id...'}]
console.log(mlib.getLinks(msg, { tofeed: true }))
// output:
// [ {rel: 'baz-link', feed: 'id...'}]
```