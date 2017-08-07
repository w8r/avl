# AVL tree

**Fast** implementation of AVL-tree

## Install

```
npm i -S avl
```

```
import AVLTree from 'avl';
const tree = new AVLTree();
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

### Develop

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
