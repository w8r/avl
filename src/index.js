import { print, isBalanced } from './utils';


// function createNode (parent, left, right, height, key, data) {
//   return { parent, left, right, balanceFactor: height, key, data };
// }

/**
 * @typedef {{
 *   parent:        Node|Null,
 *   left:          Node|Null,
 *   right:         Node|Null,
 *   balanceFactor: Number,
 *   key:           any,
 *   data:          object?
 * }} Node
 */

/**
 * @typedef {*} Key
 */

/**
 * Default comparison function
 * @param {*} a
 * @param {*} b
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

  if (rightNode.left) rightNode.left.parent = node;

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
  if (node.left) node.left.parent = node;

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


export default class Tree {

  /**
   * @class AVLTree
   * @constructor
   * @param  {Function(a:Key, b:Key):Number} [comparator]
   * @param  {Boolean}                       [noDuplicates=false] Disallow duplicates
   */
  constructor (comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }


  /**
   * Clear the tree
   * @return {Tree}
   */
  destroy() {
    this._root = null;
    return this;
  }

  /**
   * Number of nodes
   * @return {Number}
   */
  get size () {
    return this._size;
  }


  /**
   * Whether the tree contains a node with the given key
   * @param  {Key} key
   * @return {Boolean}
   */
  contains (key) {
    if (this._root)  {
      var node       = this._root;
      var comparator = this._comparator;
      while (node)  {
        var cmp = comparator(key, node.key);
        if      (cmp === 0) return true;
        else if (cmp < 0)   node = node.left;
        else                node = node.right;
      }
    }
    return false;
  }


  /* eslint-disable class-methods-use-this */

  /**
   * Successor node
   * @param  {Node} node
   * @return {Node|Null}
   */
  next (node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor && successor.left) successor = successor.left;
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor; successor = successor.parent;
        }
      }
    }
    return successor;
  }


  /**
   * Predecessor node
   * @param  {Node} node
   * @return {Node|Null}
   */
  prev (node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor && predecessor.right) predecessor = predecessor.right;
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  }
  /* eslint-enable class-methods-use-this */


  /**
   * @param  {Function(node:Node, index:number):void} callback
   * @return {AVLTree}
   */
  forEach(callback) {
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
        } else done = true;
      }
    }
    return this;
  }


  /**
   * Returns all keys in order
   * @return {Array<Key>}
   */
  keys () {
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
        } else done = true;
      }
    }
    return r;
  }


  /**
   * Returns `data` fields of all nodes in order.
   * @return {Array<Value>}
   */
  values () {
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
        } else done = true;
      }
    }
    return r;
  }


  at (index) {
    index = index % this.size;
    if (index < 0) index = this.size - index;

    var current = this._root;
    var s = [], done = false, i = 0;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index) return current;
          i++;
          current = current.right;
        } else done = true;
      }
    }
    return null;
  }


  /**
   * Returns node with the minimum key
   * @return {Node|Null}
   */
  minNode () {
    var node = this._root;
    if (!node) return null;
    while (node.left) node = node.left;
    return node;
  }


  /**
   * Returns node with the max key
   * @return {Node|Null}
   */
  maxNode () {
    var node = this._root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node;
  }


  /**
   * Min key
   * @return {Key}
   */
  min () {
    var node = this._root;
    if (!node) return null;
    while (node.left) node = node.left;
    return node.key;
  }

  /**
   * Max key
   * @return {Key|Null}
   */
  max () {
    var node = this._root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node.key;
  }


  /**
   * @return {Boolean}
   */
  isEmpty() {
    return !this._root;
  }


  /**
   * Removes and returns the node with smallest key
   * @return {Node|Null}
   */
  pop () {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left) node = node.left;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }


  /**
   * Find node by key
   * @param  {Key} key
   * @return {Node|Null}
   */
  find (key) {
    var root = this._root;
    if (root === null)    return null;
    if (key === root.key) return root;

    var subtree = root, cmp;
    var compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if      (cmp === 0) return subtree;
      else if (cmp < 0)   subtree = subtree.left;
      else                subtree = subtree.right;
    }

    return null;
  }


  /**
   * Insert a node into the tree
   * @param  {Key} key
   * @param  {Value}   [data]
   * @return {Node|Null}
   */
  insert (key, data) {
    if (!this._root) {
      this._root = {
        parent: null, left: null, right: null, balanceFactor: 0,
        key, data
      };
      this._size++;
      return this._root;
    }

    var compare = this._comparator;
    var node    = this._root;
    var parent  = null;
    var cmp     = 0;

    if (this._noDuplicates) {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if      (cmp === 0) return null;
        else if (cmp < 0)   node = node.left;
        else                node = node.right;
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if      (cmp <= 0)  node = node.left; //return null;
        else                node = node.right;
      }
    }

    var newNode = {
      left: null, right: null, balanceFactor: 0,
      parent, key, data
    };
    if (cmp <= 0) parent.left  = newNode;
    else         parent.right = newNode;

    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0) parent.balanceFactor -= 1;
      else         parent.balanceFactor += 1;

      if        (parent.balanceFactor === 0) break;
      else if   (parent.balanceFactor < -1) {
        //let newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) rotateRight(parent.right);
        let newRoot = rotateLeft(parent);

        if (parent === this._root) this._root = newRoot;
        break;
      } else if (parent.balanceFactor > 1) {
        // let newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
        let newRoot = rotateRight(parent);

        if (parent === this._root) this._root = newRoot;
        break;
      }
      parent = parent.parent;
    }

    this._size++;
    return newNode;
  }


  /**
   * Removes the node from the tree. If not found, returns null.
   * @param  {Key} key
   * @return {Node:Null}
   */
  remove (key) {
    if (!this._root) return null;

    var node = this._root;
    var compare = this._comparator;

    while (node) {
      var cmp = compare(key, node.key);
      if      (cmp === 0) break;
      else if (cmp < 0)   node = node.left;
      else                node = node.right;
    }
    if (!node) return null;
    var returnValue = node.key;

    if (node.left) {
      var max = node.left;

      while (max.left || max.right) {
        while (max.right) max = max.right;

        node.key = max.key;
        node.data = max.data;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }

      node.key  = max.key;
      node.data = max.data;
      node = max;
    }

    if (node.right) {
      var min = node.right;

      while (min.left || min.right) {
        while (min.left) min = min.left;

        node.key  = min.key;
        node.data = min.data;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }

      node.key  = min.key;
      node.data = min.data;
      node = min;
    }

    var parent = node.parent;
    var pp     = node;

    while (parent) {
      if (parent.left === pp) parent.balanceFactor -= 1;
      else                    parent.balanceFactor += 1;

      if        (parent.balanceFactor < -1) {
        //let newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) rotateRight(parent.right);
        let newRoot = rotateLeft(parent);

        if (parent === this._root) this._root = newRoot;
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        // let newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) rotateLeft(parent.left);
        let newRoot = rotateRight(parent);

        if (parent === this._root) this._root = newRoot;
        parent = newRoot;
      }

      if (parent.balanceFactor === -1 || parent.balanceFactor === 1) break;

      pp     = parent;
      parent = parent.parent;
    }

    if (node.parent) {
      if (node.parent.left === node) node.parent.left  = null;
      else                           node.parent.right = null;
    }

    if (node === this._root) this._root = null;

    this._size--;
    return returnValue;
  }


  /**
   * Bulk-load items
   * @param  {Array<Key>}  keys
   * @param  {Array<Value>}  [values]
   * @return {Tree}
   */
  load(keys = [], values = []) {
    if (Array.isArray(keys)) {
      for (var i = 0, len = keys.length; i < len; i++) {
        this.insert(keys[i], values[i]);
      }
    }
    return this;
  }


  /**
   * Returns true if the tree is balanced
   * @return {Boolean}
   */
  isBalanced() {
    return isBalanced(this._root);
  }


  /**
   * String representation of the tree - primitive horizontal print-out
   * @param  {Function(Node):String} [printNode]
   * @return {String}
   */
  toString (printNode) {
    return print(this._root, printNode);
  }

}

