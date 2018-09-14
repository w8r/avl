/**
 * avl v1.4.4
 * Fast AVL tree for Node and browser
 *
 * @author Alexander Milevski <info@w8r.name>
 * @license MIT
 * @preserve
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AVLTree = factory());
}(this, (function () { 'use strict';

  /**
   * Prints tree horizontally
   * @param  {Node}                       root
   * @param  {Function(node:Node):String} [printNode]
   * @return {String}
   */
  function print (root, printNode) {
    if ( printNode === void 0 ) printNode = function (n) { return n.key; };

    var out = [];
    row(root, '', true, function (v) { return out.push(v); }, printNode);
    return out.join('');
  }

  /**
   * Prints level of the tree
   * @param  {Node}                        root
   * @param  {String}                      prefix
   * @param  {Boolean}                     isTail
   * @param  {Function(in:string):void}    out
   * @param  {Function(node:Node):String}  printNode
   */
  function row (root, prefix, isTail, out, printNode) {
    if (root) {
      out(("" + prefix + (isTail ? '└── ' : '├── ') + (printNode(root)) + "\n"));
      var indent = prefix + (isTail ? '    ' : '│   ');
      if (root.left)  { row(root.left,  indent, false, out, printNode); }
      if (root.right) { row(root.right, indent, true,  out, printNode); }
    }
  }


  /**
   * Is the tree balanced (none of the subtrees differ in height by more than 1)
   * @param  {Node}    root
   * @return {Boolean}
   */
  function isBalanced(root) {
    if (root === null) { return true; } // If node is empty then return true

    // Get the height of left and right sub trees
    var lh = height(root.left);
    var rh = height(root.right);

    if (Math.abs(lh - rh) <= 1 &&
        isBalanced(root.left)  &&
        isBalanced(root.right)) { return true; }

    // If we reach here then tree is not height-balanced
    return false;
  }

  /**
   * The function Compute the 'height' of a tree.
   * Height is the number of nodes along the longest path
   * from the root node down to the farthest leaf node.
   *
   * @param  {Node} node
   * @return {Number}
   */
  function height(node) {
    return node ? (1 + Math.max(height(node.left), height(node.right))) : 0;
  }


  function loadRecursive (parent, keys, values, start, end) {
    var size = end - start;
    if (size > 0) {
      var middle = start + Math.floor(size / 2);
      var key    = keys[middle];
      var data   = values[middle];
      var node   = { key: key, data: data, parent: parent };
      node.left    = loadRecursive(node, keys, values, start, middle);
      node.right   = loadRecursive(node, keys, values, middle + 1, end);
      return node;
    }
    return null;
  }


  function markBalance(node) {
    if (node === null) { return 0; }
    var lh = markBalance(node.left);
    var rh = markBalance(node.right);

    node.balanceFactor = lh - rh;
    return Math.max(lh, rh) + 1;
  }


  function sort(keys, values, left, right, compare) {
    if (left >= right) { return; }

    // eslint-disable-next-line no-bitwise
    var pivot = keys[(left + right) >> 1];
    var i = left - 1;
    var j = right + 1;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      do { i++; } while (compare(keys[i], pivot) < 0);
      do { j--; } while (compare(keys[j], pivot) > 0);
      if (i >= j) { break; }

      var tmp = keys[i];
      keys[i] = keys[j];
      keys[j] = tmp;

      tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
    }

    sort(keys, values,  left,     j, compare);
    sort(keys, values, j + 1, right, compare);
  }

  // function createNode (parent, left, right, height, key, data) {
  //   return { parent, left, right, balanceFactor: height, key, data };
  // }

  /**
   * @typedef {{
   *   parent:        ?Node,
   *   left:          ?Node,
   *   right:         ?Node,
   *   balanceFactor: number,
   *   key:           Key,
   *   data:          Value
   * }} Node
   */

  /**
   * @typedef {*} Key
   */

  /**
   * @typedef {*} Value
   */

  /**
   * Default comparison function
   * @param {Key} a
   * @param {Key} b
   * @returns {number}
   */
  function DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }


  /**
   * Single left rotation
   * @param  {Node} node
   * @return {Node}
   */
  function rotateLeft (node) {
    var rightNode = node.right;
    node.right    = rightNode.left;

    if (rightNode.left) { rightNode.left.parent = node; }

    rightNode.parent = node.parent;
    if (rightNode.parent) {
      if (rightNode.parent.left === node) {
        rightNode.parent.left = rightNode;
      } else {
        rightNode.parent.right = rightNode;
      }
    }

    node.parent    = rightNode;
    rightNode.left = node;

    node.balanceFactor += 1;
    if (rightNode.balanceFactor < 0) {
      node.balanceFactor -= rightNode.balanceFactor;
    }

    rightNode.balanceFactor += 1;
    if (node.balanceFactor > 0) {
      rightNode.balanceFactor += node.balanceFactor;
    }
    return rightNode;
  }


  function rotateRight (node) {
    var leftNode = node.left;
    node.left = leftNode.right;
    if (node.left) { node.left.parent = node; }

    leftNode.parent = node.parent;
    if (leftNode.parent) {
      if (leftNode.parent.left === node) {
        leftNode.parent.left = leftNode;
      } else {
        leftNode.parent.right = leftNode;
      }
    }

    node.parent    = leftNode;
    leftNode.right = node;

    node.balanceFactor -= 1;
    if (leftNode.balanceFactor > 0) {
      node.balanceFactor -= leftNode.balanceFactor;
    }

    leftNode.balanceFactor -= 1;
    if (node.balanceFactor < 0) {
      leftNode.balanceFactor += node.balanceFactor;
    }

    return leftNode;
  }


  // function leftBalance (node) {
  //   if (node.left.balanceFactor === -1) rotateLeft(node.left);
  //   return rotateRight(node);
  // }


  // function rightBalance (node) {
  //   if (node.right.balanceFactor === 1) rotateRight(node.right);
  //   return rotateLeft(node);
  // }


  var AVLTree = function AVLTree (comparator, noDuplicates) {
    if ( noDuplicates === void 0 ) noDuplicates = false;

    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  };

  var prototypeAccessors = { size: { configurable: true } };


  /**
   * Clear the tree
   * @return {AVLTree}
   */
  AVLTree.prototype.destroy = function destroy () {
    return this.clear();
  };


  /**
   * Clear the tree
   * @return {AVLTree}
   */
  AVLTree.prototype.clear = function clear () {
    this._root = null;
    this._size = 0;
    return this;
  };

  /**
   * Number of nodes
   * @return {number}
   */
  prototypeAccessors.size.get = function () {
    return this._size;
  };


  /**
   * Whether the tree contains a node with the given key
   * @param{Key} key
   * @return {boolean} true/false
   */
  AVLTree.prototype.contains = function contains (key) {
    if (this._root){
      var node     = this._root;
      var comparator = this._comparator;
      while (node){
        var cmp = comparator(key, node.key);
        if    (cmp === 0) { return true; }
        else if (cmp < 0) { node = node.left; }
        else              { node = node.right; }
      }
    }
    return false;
  };


  /* eslint-disable class-methods-use-this */

  /**
   * Successor node
   * @param{Node} node
   * @return {?Node}
   */
  AVLTree.prototype.next = function next (node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor.left) { successor = successor.left; }
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor; successor = successor.parent;
        }
      }
    }
    return successor;
  };


  /**
   * Predecessor node
   * @param{Node} node
   * @return {?Node}
   */
  AVLTree.prototype.prev = function prev (node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor.right) { predecessor = predecessor.right; }
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  };
  /* eslint-enable class-methods-use-this */


  /**
   * Callback for forEach
   * @callback forEachCallback
   * @param {Node} node
   * @param {number} index
   */

  /**
   * @param{forEachCallback} callback
   * @return {AVLTree}
   */
  AVLTree.prototype.forEach = function forEach (callback) {
    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      // Reach the left most Node of the current Node
      if (current) {
        // Place pointer to a tree node on the stack
        // before traversing the node's left subtree
        s.push(current);
        current = current.left;
      } else {
        // BackTrack from the empty subtree and visit the Node
        // at the top of the stack; however, if the stack is
        // empty you are done
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);

          // We have visited the node and its left
          // subtree. Now, it's right subtree's turn
          current = current.right;
        } else { done = true; }
      }
    }
    return this;
  };


  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param{Key}    low
   * @param{Key}    high
   * @param{Function} fn
   * @param{*?}     ctx
   * @return {SplayTree}
   */
  AVLTree.prototype.range = function range (low, high, fn, ctx) {
      var this$1 = this;

    var Q = [];
    var compare = this._comparator;
    var node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) { return this$1; } // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  };


  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  AVLTree.prototype.keys = function keys () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  AVLTree.prototype.values = function values () {
    var current = this._root;
    var s = [], r = [], done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else { done = true; }
      }
    }
    return r;
  };


  /**
   * Returns node at given index
   * @param{number} index
   * @return {?Node}
   */
  AVLTree.prototype.at = function at (index) {
    // removed after a consideration, more misleading than useful
    // index = index % this.size;
    // if (index < 0) index = this.size - index;

    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index) { return current; }
          i++;
          current = current.right;
        } else { done = true; }
      }
    }
    return null;
  };


  /**
   * Returns node with the minimum key
   * @return {?Node}
   */
  AVLTree.prototype.minNode = function minNode () {
    var node = this._root;
    if (!node) { return null; }
    while (node.left) { node = node.left; }
    return node;
  };


  /**
   * Returns node with the max key
   * @return {?Node}
   */
  AVLTree.prototype.maxNode = function maxNode () {
    var node = this._root;
    if (!node) { return null; }
    while (node.right) { node = node.right; }
    return node;
  };


  /**
   * Min key
   * @return {?Key}
   */
  AVLTree.prototype.min = function min () {
    var node = this._root;
    if (!node) { return null; }
    while (node.left) { node = node.left; }
    return node.key;
  };


  /**
   * Max key
   * @return {?Key}
   */
  AVLTree.prototype.max = function max () {
    var node = this._root;
    if (!node) { return null; }
    while (node.right) { node = node.right; }
    return node.key;
  };


  /**
   * @return {boolean} true/false
   */
  AVLTree.prototype.isEmpty = function isEmpty () {
    return !this._root;
  };


  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  AVLTree.prototype.pop = function pop () {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left) { node = node.left; }
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  };


  /**
   * Find node by key
   * @param{Key} key
   * @return {?Node}
   */
  AVLTree.prototype.find = function find (key) {
    var root = this._root;
    // if (root === null)  return null;
    // if (key === root.key) return root;

    var subtree = root, cmp;
    var compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if    (cmp === 0) { return subtree; }
      else if (cmp < 0) { subtree = subtree.left; }
      else              { subtree = subtree.right; }
    }

    return null;
  };


  /**
   * Insert a node into the tree
   * @param{Key} key
   * @param{Value} [data]
   * @return {?Node}
   */
  AVLTree.prototype.insert = function insert (key, data) {
      var this$1 = this;

    if (!this._root) {
      this._root = {
        parent: null, left: null, right: null, balanceFactor: 0,
        key: key, data: data
      };
      this._size++;
      return this._root;
    }

    var compare = this._comparator;
    var node  = this._root;
    var parent= null;
    var cmp   = 0;

    if (this._noDuplicates) {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if    (cmp === 0) { return null; }
        else if (cmp < 0) { node = node.left; }
        else              { node = node.right; }
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if    (cmp <= 0){ node = node.left; } //return null;
        else              { node = node.right; }
      }
    }

    var newNode = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent: parent, key: key, data: data
    };
    var newRoot;
    if (cmp <= 0) { parent.left= newNode; }
    else       { parent.right = newNode; }

    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0) { parent.balanceFactor -= 1; }
      else       { parent.balanceFactor += 1; }

      if      (parent.balanceFactor === 0) { break; }
      else if (parent.balanceFactor < -1) {
        // inlined
        //var newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) { rotateRight(parent.right); }
        newRoot = rotateLeft(parent);

        if (parent === this$1._root) { this$1._root = newRoot; }
        break;
      } else if (parent.balanceFactor > 1) {
        // inlined
        // var newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) { rotateLeft(parent.left); }
        newRoot = rotateRight(parent);

        if (parent === this$1._root) { this$1._root = newRoot; }
        break;
      }
      parent = parent.parent;
    }

    this._size++;
    return newNode;
  };


  /**
   * Removes the node from the tree. If not found, returns null.
   * @param{Key} key
   * @return {?Node}
   */
  AVLTree.prototype.remove = function remove (key) {
      var this$1 = this;

    if (!this._root) { return null; }

    var node = this._root;
    var compare = this._comparator;
    var cmp = 0;

    while (node) {
      cmp = compare(key, node.key);
      if    (cmp === 0) { break; }
      else if (cmp < 0) { node = node.left; }
      else              { node = node.right; }
    }
    if (!node) { return null; }

    var returnValue = node.key;
    var max, min;

    if (node.left) {
      max = node.left;

      while (max.left || max.right) {
        while (max.right) { max = max.right; }

        node.key = max.key;
        node.data = max.data;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }

      node.key= max.key;
      node.data = max.data;
      node = max;
    }

    if (node.right) {
      min = node.right;

      while (min.left || min.right) {
        while (min.left) { min = min.left; }

        node.key= min.key;
        node.data = min.data;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }

      node.key= min.key;
      node.data = min.data;
      node = min;
    }

    var parent = node.parent;
    var pp   = node;
    var newRoot;

    while (parent) {
      if (parent.left === pp) { parent.balanceFactor -= 1; }
      else                  { parent.balanceFactor += 1; }

      if      (parent.balanceFactor < -1) {
        // inlined
        //var newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) { rotateRight(parent.right); }
        newRoot = rotateLeft(parent);

        if (parent === this$1._root) { this$1._root = newRoot; }
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        // inlined
        // var newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) { rotateLeft(parent.left); }
        newRoot = rotateRight(parent);

        if (parent === this$1._root) { this$1._root = newRoot; }
        parent = newRoot;
      }

      if (parent.balanceFactor === -1 || parent.balanceFactor === 1) { break; }

      pp   = parent;
      parent = parent.parent;
    }

    if (node.parent) {
      if (node.parent.left === node) { node.parent.left= null; }
      else                         { node.parent.right = null; }
    }

    if (node === this._root) { this._root = null; }

    this._size--;
    return returnValue;
  };


  /**
   * Bulk-load items
   * @param{Array<Key>}keys
   * @param{Array<Value>}[values]
   * @return {AVLTree}
   */
  AVLTree.prototype.load = function load (keys, values, presort) {
      if ( keys === void 0 ) keys = [];
      if ( values === void 0 ) values = [];

    if (this._size !== 0) { throw new Error('bulk-load: tree is not empty'); }
    var size = keys.length;
    if (presort) { sort(keys, values, 0, size - 1, this._comparator); }
    this._root = loadRecursive(null, keys, values, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  };


  /**
   * Returns true if the tree is balanced
   * @return {boolean}
   */
  AVLTree.prototype.isBalanced = function isBalanced$1 () {
    return isBalanced(this._root);
  };


  /**
   * String representation of the tree - primitive horizontal print-out
   * @param{Function(Node):string} [printNode]
   * @return {string}
   */
  AVLTree.prototype.toString = function toString (printNode) {
    return print(this._root, printNode);
  };

  Object.defineProperties( AVLTree.prototype, prototypeAccessors );

  AVLTree.default = AVLTree;

  return AVLTree;

})));
//# sourceMappingURL=avl.js.map
