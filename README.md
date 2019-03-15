# AVL tree [![npm version](https://badge.fury.io/js/avl.svg)](https://badge.fury.io/js/avl) [![TravisCI](https://travis-ci.org/w8r/avl.svg?branch=master)](https://travis-ci.org/w8r/avl)

[AVL-tree](https://en.wikipedia.org/wiki/AVL_tree): **[fast](#benchmarks)**(non-recursive) and **simple**(< 500 lines of code)

![AVL-tree](https://upload.wikimedia.org/wikipedia/commons/a/ad/AVL-tree-wBalance_K.svg)

| Operation     | Average       | Worst case   |
| ------------- | ------------- | ------------ |
| Space         | **O(n)**      | **O(n)**     |
| Search        | **O(log n)**  | **O(log n)** |
| Insert        | **O(log n)**  | **O(log n)** |
| Delete        | **O(log n)**  | **O(log n)** |


## Install

```shell
npm i -S avl
```

```js
import AVLTree from 'avl';
const tree = new AVLTree();
```

Or get it from CDN
```html
<script src="https://unpkg.com/avl"></script>
<script>
  var tree = new AVLTree();
  ...
</script>
```
Or use the compiled version 'dist/avl.js'.

[Try it in your browser](https://npm.runkit.com/avl)

## API

* `new AVLTree([comparator], [noDuplicates:Boolean])`, where `compare` is optional comparison function
* `tree.insert(key:any, [data:any])` - Insert item
* `tree.remove(key:any)` - Remove item
* `tree.find(key):Node|Null` - Return node by its key
* `tree.at(index:Number):Node|Null` - Return node by its index in sorted order of keys
* `tree.contains(key):Boolean` - Whether a node with the given key is in the tree
* `tree.forEach(function(node) {...}):Tree` In-order traversal
* `tree.range(lo, high, function(node) {} [, context]):Tree` - Walks the range of keys in order. Stops, if the visitor function returns a non-zero value.
* `tree.keys():Array<key>` - Returns the array of keys in order
* `tree.values():Array<*>` - Returns the array of data fields in order
* `tree.pop():Node` - Removes smallest node
* `tree.popMax():Node` - Removes highest node
* `tree.min():key` - Returns min key
* `tree.max():key` - Returns max key
* `tree.minNode():Node` - Returns the node with smallest key
* `tree.maxNode():Node` - Returns the node with highest key
* `tree.prev(node):Node` - Predecessor node
* `tree.next(node):Node` - Successor node
* `tree.load(keys:Array<*>, [values:Array<*>]):Tree` - Bulk-load items
* `tree.destroy():Tree, tree.clear():Tree` - Empty the tree

**Comparator**

`function(a:key,b:key):Number` - Comparator function between two keys, it returns
 * `0` if the keys are equal
 * `<0` if `a < b`
 * `>0` if `a > b`

 The comparator function is extremely important, in case of errors you might end
 up with a wrongly constructed tree or would not be able to retrieve your items.
 It is crucial to test the return values of your `comparator(a,b)` and `comparator(b,a)`
 to make sure it's working correctly, otherwise you may have bugs that are very
 unpredictable and hard to catch.

 **Duplicate keys**

 By default, tree allows duplicate keys. You can disable that by passing `true`
 as a second parameter to the tree constructor. In that case if you would try to
 instert an item with the key, that is already present in the tree, it will not
 be inserted.
 However, the default behavior allows for duplicate keys, cause there are cases
 where you cannot predict that the keys would be unique (example: overlapping
 points in 2D).

## Example

```js
import Tree from 'avl';

const t = new Tree();
t.insert(5);
t.insert(-10);
t.insert(0);
t.insert(33);
t.insert(2);

console.log(t.keys()); // [-10, 0, 2, 5, 33]
console.log(t.size);   // 5
console.log(t.min());  // -10
console.log(t.max());  // -33

t.remove(0);
console.log(t.size);   // 4
```

**Custom comparator (reverse sort)**

```js
import Tree from 'avl';

const t = new Tree((a, b) => b - a);
t.insert(5);
t.insert(-10);
t.insert(0);
t.insert(33);
t.insert(2);

console.log(t.keys()); // [33, 5, 2, 0, -10]
```

**Bulk insert**

```js
import Tree from 'avl';

const t = new Tree();
t.load([3,2,-10,20], ['C', 'B', 'A', 'D']);
console.log(t.keys());   // [-10, 2, 3, 20]
console.log(t.values()); // ['A', 'B', 'C', 'D']
```

## Benchmarks

```shell
npm run benchmark
```

```
Insert (x1000)
Bintrees x 3,742 ops/sec ±0.89% (90 runs sampled)
Functional red black tree x 1,880 ops/sec ±4.02% (78 runs sampled)
Google Closure library AVL x 622 ops/sec ±4.22% (81 runs sampled)
AVL (current) x 6,151 ops/sec ±8.50% (72 runs sampled)
- Fastest is AVL (current)

Random read (x1000)
Bintrees x 7,371 ops/sec ±2.69% (83 runs sampled)
Functional red black tree x 13,010 ops/sec ±2.93% (83 runs sampled)
Google Closure library AVL x 27.63 ops/sec ±1.04% (49 runs sampled)
AVL (current) x 12,921 ops/sec ±1.83% (86 runs sampled)
- Fastest is AVL (current)

Remove (x1000)
Bintrees x 106,837 ops/sec ±0.74% (86 runs sampled)
Functional red black tree x 25,368 ops/sec ±0.89% (88 runs sampled)
Google Closure library AVL x 31,719 ops/sec ±1.21% (89 runs sampled)
AVL (current) x 108,131 ops/sec ±0.70% (88 runs sampled)
- Fastest is AVL (current)
```

Adding google closure library to the benchmark is, of course, unfair, cause the
node.js version of it is not optimised by the compiler, but in this case it
plays the role of straight-forward robust implementation.

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
