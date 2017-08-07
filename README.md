# AVL tree

[AVL-tree](https://en.wikipedia.org/wiki/AVL_tree): **[fast](#benchmarks)**(non-recursive) and **simple**(< 500 lines of code)

## Install

```
npm i -S avl
```

```
import AVLTree from 'avl';
const tree = new AVLTree();
```

Or get it from CDN
```
<script src="https://unpkg.com/avl@1.1.0"></script>
<script>
  var tree = new avl();
  ...
</script>
```

## API

* `new AVLTree([compare])`, where `compare` is optional comparison function
* `tree.insert(key:any, [data:any])` - Insert item
* `tree.remove(key:any)` - Remove item
* `tree.find(key):Node|Null` - Return node by its key
* `tree.contains(key):Boolean` - Whether a node with the given key is in the tree
* `tree.forEach(function(node) {...})` In-order traversal
* `tree.keys():Array<key>` - Returns the array of keys in order
* `tree.values():Array<*>` - Returns the array of data fields in order
* `tree.pop():Node` - Removes smallest node
* `tree.min():key` - Returns min key
* `tree.max():key` - Returns max key
* `tree.minNode():Node` - Returns the node with smallest key
* `tree.maxNode():Node` - Returns the node with highest key
* `tree.prev(node):Node` - Predecessor node
* `tree.next(node):Node` - Successor node

## Benchmarks

```shell
npm run benchmark
```

```
Insert (x1000)
Bintrees x 3,695 ops/sec ±1.71% (87 runs sampled)
Functional red black tree x 2,233 ops/sec ±1.12% (87 runs sampled)
AVL (current) x 7,340 ops/sec ±1.35% (87 runs sampled)
- Fastest is AVL (current)

Random read (x1000)
Bintrees x 7,454 ops/sec ±1.21% (83 runs sampled)
Functional red black tree x 13,360 ops/sec ±0.80% (89 runs sampled)
AVL (current) x 12,662 ops/sec ±0.75% (87 runs sampled)
- Fastest is Functional red black tree

Remove (x1000)
Bintrees x 21,853 ops/sec ±1.42% (87 runs sampled)
Functional red black tree x 14,884 ops/sec ±1.58% (87 runs sampled)
AVL (current) x 107,429 ops/sec ±0.79% (86 runs sampled)
- Fastest is AVL (current)
```

## Develop

```shell
npm i
npm t
npm run build
```

## License

The MIT License (MIT)

Copyright (c) 2017 Alexander Milevski <info@w8r.name>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
