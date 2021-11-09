# AVL tree [![npm version](https://badge.fury.io/js/avl.svg)](https://badge.fury.io/js/avl) 

[AVL-tree](https://en.wikipedia.org/wiki/AVL_tree): **[fast](#benchmarks)**(non-recursive) and **simple**(< 800 lines of code)

![AVL-tree](https://upload.wikimedia.org/wikipedia/commons/a/ad/AVL-tree-wBalance_K.svg)

| Operation     | Average       | Worst case   |
| ------------- | ------------- | ------------ |
| Space         | **O(n)**      | **O(n)**     |
| Search        | **O(log n)**  | **O(log n)** |
| Insert        | **O(log n)**  | **O(log n)** |
| Delete        | **O(log n)**  | **O(log n)** |


## Install

```shell
yarn add avl
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

## Usage

```Typescript
import { AVLTree } from "@foxglove/avl";

const tree = new AVLTree<number, string>();
tree.set(0, "zero");
tree.set(1, "1");
tree.set(1, "one");
tree.set(3, "three");
tree.set(2, "two");
tree.delete(0);
console.log(tree.has(0)); // false
console.log(tree.get(1)); // "one"
console.log(tree.size); // 3
console.log(tree.minEntry()); // [1, "one"]
console.log(tree.maxEntry()); // [3, "three"]
console.log(tree.findLessThan(2)); // [1, "one"]
console.log(tree.findGreaterThanOrEqual(2)); // [2, "two"]
tree.forEach((value, key) => console.log(value)); // "one" "two" "three"
tree.range(2, 3, (value, key) => console.log(value)); // "two" "three"
console.log(tree.pop()); // [3, "three"]
console.log(tree.shift()); // [1, "one"]
tree.clear();

// Use a custom comparator for non-Number keys
const bigintTree = new AVLTree<bigint, string>((a, b) => Number(a - b));
bigintTree.set(1n, "one");
```

## Benchmarks

```shell
yarn benchmark
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
yarn
yarn build
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
