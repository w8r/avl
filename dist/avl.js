(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.avl = factory());
}(this, (function () { 'use strict';

function leftHeight (node) {
  return node.right ? node.right.height : -1;
}


function rightHeight (node) {
  return node.left ? node.left.height : -1;
}


/**
 *   a                             b
 *  / \                           / \
 * c   b   -> rotate left a ->   a   e
 *    / \                       / \
 *   d   e                     c   d
 * @param  {node}
 * @return {node}
 */
function rotateLeft (node) {
  var other    = node.right;
  node.right   = other.left;
  other.left   = node;

  node.height  = Math.max(leftHeight(node), rightHeight(node)) + 1;
  other.height = Math.max(rightHeight(other), node.height) + 1;
  return other;
}


/**
 *     b                          a
 *    / \                        / \
 *   a   e -> rotate right b -> c   b
 *  / \                            / \
 * c   d                          d   e
 * @param  {node}
 * @return {node}
 */
function rotateRight (node) {
  var other    = node.left;
  node.left    = other.right;
  other.right  = node;

  node.height  = Math.max(leftHeight(node), rightHeight(node)) + 1;
  other.height = Math.max(leftHeight(other), node.height) + 1;
  return other;
}

var UNBALANCED_LEFT           = -2;
var SLIGHTLY_UNBALANCED_LEFT  = -1;
var UNBALANCED_RIGHT          =  2;
var SLIGHTLY_UNBALANCED_RIGHT =  1;

var DEFAULT_COMPARE = function (a, b) { return (a > b ? 1 : a < b ? -1 : 0); };

/**
 * @param  {node} node
 * @return {number}
 */
function balanceFactor(node$$1) {
  return (node$$1.right ? node$$1.right.height : -1) -
         (node$$1.left  ? node$$1.left.height  : -1);
}


var AVL = function AVL (comparator) {
  if ( comparator === void 0 ) comparator = DEFAULT_COMPARE;

  this._root = null;
  this._size = 0;
  this._compare = comparator;
};

var prototypeAccessors = { size: {},isEmpty: {} };

prototypeAccessors.size.get = function ()  { return this._size; };
prototypeAccessors.isEmpty.get = function () { return this._size === 0; };

/**
 * @param {*} key
 * @param {*} value
 */
AVL.prototype.insert = function insert (key, value) {
  this._root = this._insert(this._root, key, value);
  this._size++;
};


// _insert (root, key, value) {
// if (root === null) return { key, value, left: null, right: null, height: null };

// var cmp = this._compare(key, root.key);
// if (cmp < 0) {
//   root.left= this._insert(root.left, key, value);
// } else if (cmp > 0) { //allow repeating keys?
//   root.right = this._insert(root.right, key, value);
// } else {
//   // It's a duplicate so insertion failed, decrement size to make up for it
//   this._size--;
//   return root;
// }

// // Update height and rebalance tree
// var lh= root.right ? root.right.height : -1;
// var rh= root.left? root.left.height: -1;
// root.height = Math.max(lh, rh) + 1;
// //var balance = balanceFactor(root);
// var balance = lh - rh;

// if (balance === UNBALANCED_LEFT) {
//   if (this._compare(key, root.left.key) < 0) { // left left
//     root = rotateRight(root);
//   } else { // Left right case
//     root.left = rotateLeft(root.left);
//     return rotateRight(root);
//   }
// } else

// if (balance === UNBALANCED_RIGHT) {
//   if (this._compare(key, root.right.key) > 0) { // right right
//     root = rotateLeft(root);
//   } else { // Right left case
//     root.right = rotateRight(root.right);
//     return rotateLeft(root);
//   }
// }

// return root;
// }


AVL.prototype._insert = function _insert (root, key, value) {
    var this$1 = this;

  var newNode = { key: key, value: value, left: null, right: null, height: null };
  if (root === null) { return newNode; }

  var compare = this._compare;
  var cmp, parent, result;
  var subtree = root;
  var toBalance = [];

  while (subtree) {
    //parent = subtree;
    toBalance.push(subtree);
    cmp  = compare(key, subtree.key);

    if (cmp < 0) {
      if (subtree.left === null){
        subtree.left = newNode;
        subtree    = newNode;
        toBalance.pop();
      }
      subtree = subtree.left; // null will stop the loop
    } else if (cmp > 0) {
      if (subtree.right === null) {
        subtree.right = newNode;
        subtree     = newNode;
        toBalance.pop();
      }
      subtree = subtree.right; // null will stop the loop
    } else {
      this$1._size--;
      subtree = null;
    }
  }


  while (toBalance.length !== 0) {
    subtree = toBalance.pop();
    result = this$1._balance(subtree, key);
    if (subtree === root) { root = result; }
  }

  return root;
};


AVL.prototype._balance = function _balance (root, key) {
  // Update height and rebalance tree
  var lh= root.right ? root.right.height : -1;
  var rh= root.left? root.left.height: -1;
  root.height = Math.max(lh, rh) + 1;
  //var balance = balanceFactor(root);
  var balance = lh - rh;

  if (balance === UNBALANCED_LEFT) {
    if (this._compare(key, root.left.key) < 0) { // left left
      root = rotateRight(root);
    } else { // Left right case
      root.left = rotateLeft(root.left);
      return rotateRight(root);
    }
  } else

  if (balance === UNBALANCED_RIGHT) {
    if (this._compare(key, root.right.key) > 0) { // right right
      root = rotateLeft(root);
    } else { // Right left case
      root.right = rotateRight(root.right);
      return rotateLeft(root);
    }
  }

  return root;
};


AVL.prototype.remove = function remove (key) {
  this._root = this._remove(this._root, key);
  this._size--;
};


/**
 * @param{node} root
 * @param{*}  key
 * @return {node}
 */
AVL.prototype._remove = function _remove (root, key) {
  if (root === null) {// BST deletion
    this._size++;
    return root;
  }

  var cmp = this._compare(key, root.key);
  if (cmp < 0) {
    // The key to be deleted is in the left sub-tree
    root.left = this._remove(root.left, key);
  } else if (cmp > 0) {
    // The key to be deleted is in the right sub-tree
    root.right = this._remove(root.right, key);
  } else if (cmp === 0) {
    // root is the node to be deleted
    if (!root.left && !root.right)    { root = null; }
    else if (!root.left && root.right){ root = root.right; }
    else if (root.left&& !root.right) { root = root.left; }
    else {
      // Node has 2 children, get the in-order successor
      var successor = minNode(root.right);
      root.key = successor.key;
      root.right = this._remove(root.right, successor.key);
    }
  }

  if (root === null) { return root; }

  // Update height and rebalance tree
  root.height = Math.max(leftHeight(root), rightHeight(root)) + 1;
  var balance = balanceFactor(root);

  if (balance === UNBALANCED_LEFT) {
    var leftBalance = balanceFactor(root.left);
    // Left left case
    if (leftBalance === 0 ||
        leftBalance === SLIGHTLY_UNBALANCED_LEFT) {
      return rotateRight(root);
    }

    // Left right case
    if (leftBalance === SLIGHTLY_UNBALANCED_RIGHT) {
      root.left = rotateLeft(root.left);
      return rotateRight(root);
    }
  }

  if (balance === UNBALANCED_RIGHT) {
    var rightBalance = balanceFactor(root.right);
    // Right right case
    if (rightBalance === 0 ||
        rightBalance === SLIGHTLY_UNBALANCED_RIGHT) {
      return rotateLeft(root);
    }
    // Right left case
    if (rightBalance === SLIGHTLY_UNBALANCED_LEFT) {
      root.right = rotateRight(root.right);
      return rotateLeft(root);
    }
  }

  return root;
};


/**
 * @param {*} key
 * @return {node}
 */
AVL.prototype.findNode = function findNode (key) {
  return this._findNode(this._root, key);
};


AVL.prototype.find = function find (key) {
  var node$$1 = this._findNode(this._root, key);
  return node$$1 ? node$$1.value : null;
};


/**
 * Non-recursive search
 * @param{node} root
 * @param{*}  key
 * @return {node}
 */
AVL.prototype._findNode = function _findNode (root, key) {
    var this$1 = this;

  if (this._root === null) { return null; }
  if (key === root.key)  { return root; }

  var subtree = root, cmp;
  while (subtree) {
    cmp = this$1._compare(key, subtree.key);
    if    (cmp === 0) { return subtree; }
    else if (cmp < 0) { subtree = subtree.left; }
    else              { subtree = subtree.right; }
  }

  return subtree;
};


/**
 * @param{*}
 * @return {boolean}
 */
AVL.prototype.contains = function contains (key) {
  return this._root === null ? false : (this._findNode(this._root, key) !== null);
};


/**
 * @return {*}
 */
AVL.prototype.min = function min () {
  return minNode(this._root).key;
};


/**
 * @return {*}
 */
AVL.prototype.max = function max () {
  return maxNode(this._root).key;
};


AVL.prototype.pop = function pop () {
  var min = this.min();
  this._remove(this._root, min);
  return min;
};


AVL.prototype.forEach = function forEach (fn) {
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
        fn(current, i++);

        // We have visited the node and its left
        // subtree. Now, it's right subtree's turn
        current = current.right;
      } else { done = true; }
    }
  }
  return this;
};

Object.defineProperties( AVL.prototype, prototypeAccessors );

/**
 * @param  {node} root
 * @return {node}
 */
function minNode (root) {
  var node$$1 = root;
  while (node$$1.left) { node$$1 = node$$1.left; }
  return node$$1;
}


/**
 * @param  {node} root
 * @return {node}
 */
function maxNode (root) {
  var node$$1 = root;
  while (node$$1.right) { node$$1 = node$$1.right; }
  return node$$1;
}

return AVL;

})));
//# sourceMappingURL=avl.js.map
