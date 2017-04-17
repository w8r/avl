import {
  node,
  rotateLeft, rotateRight,
  leftHeight, rightHeight
} from './node';


const UNBALANCED_LEFT           = -2;
const SLIGHTLY_UNBALANCED_LEFT  = -1;
const UNBALANCED_RIGHT          =  2;
const SLIGHTLY_UNBALANCED_RIGHT =  1;

const DEFAULT_COMPARE = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

/**
 * @param  {node} node
 * @return {number}
 */
const balanceFactor = (node) => leftHeight(node) - rightHeight(node);


export default class AVL {

  constructor (comparator = DEFAULT_COMPARE) {
    this._root = null;
    this._size = 0;
    this._compare = comparator;
  }

  get size ()    { return this._size; }
  get isEmpty () { return this._size === 0; }

  /**
   * @param {*} key
   * @param {*} value
   */
  insert (key, value) {
    this._root = this._insert(this._root, key, value);
    this._size++;
  }


  _insert (root, key, value) {
    if (root === null) return node(key, value);

    var cmp = this._compare(key, root.key);
    if (cmp < 0) {
      root.left  = this._insert(root.left, key, value);
    } else if (cmp > 0) { //allow repeating keys?
      root.right = this._insert(root.right, key, value);
    } else {
      // It's a duplicate so insertion failed, decrement size to make up for it
      this._size--;
      return root;
    }

    // Update height and rebalance tree
    root.height = Math.max(leftHeight(root), rightHeight(root)) + 1;
    var balance = balanceFactor(root);

    if (balance === UNBALANCED_LEFT) {
      if (this._compare(key, root.left.key) < 0) { // left left
        root = rotateRight(root);
      } else { // Left right case
        root.left = rotateLeft(root.left);
        return rotateRight(root);
      }
    }

    if (balance === UNBALANCED_RIGHT) {
      if (this._compare(key, root.right.key) > 0) { // right right
        root = rotateLeft(root);
      } else { // Right left case
        root.right = rotateRight(root.right);
        return rotateLeft(root);
      }
    }

    return root;
  }


  remove (key) {
    this._root = this._remove(this._root, key);
    this._size--;
  }


  /**
   * @param  {node} root
   * @param  {*}    key
   * @return {node}
   */
  _remove (root, key) {
    if (root === null) {  // BST deletion
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
      if (!root.left && !root.right)      root = null;
      else if (!root.left && root.right)  root = root.right;
      else if (root.left  && !root.right) root = root.left;
      else {
        // Node has 2 children, get the in-order successor
        var successor = minNode(root.right);
        root.key   = successor.key;
        root.right = this._remove(root.right, successor.key);
      }
    }

    if (root === null) return root;

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
  }


  /**
   * @param {*} key
   * @return {node}
   */
  findNode (key) {
    return this._findNode(this._root, key);
  }


  find (key) {
    var node = this._findNode(this._root, key);
    return node ? node.value : null;
  }


  /**
   * @param  {node} root
   * @param  {*}    key
   * @return {node}
   */
  _findNode (root, key) {
    if (this._root === null) return null;
    if (key === root.key)    return root;


    if (this._compare(key, root.key) < 0) {
      if (!root.left) return null;
      return this._findNode(root.left, key);
    }

    if (!root.right) return null;

    return this._findNode(root.right, key);
  }


  /**
   * @param  {*}
   * @return {boolean}
   */
  contains (key) {
    return this._root === null ? false : (this._findNode(this._root, key) !== null);
  }


  /**
   * @return {*}
   */
  min () {
    return minNode(this._root).key;
  }


  /**
   * @return {*}
   */
  max () {
    return maxNode(this._root).key;
  }


  pop () {
    var min = this.min();
    this._remove(this._root, min);
    return min;
  }

}


/**
 * @param  {node} root
 * @return {node}
 */
function minNode (root) {
  var node = root;
  while (node.left) node = node.left;
  return node;
}


/**
 * @param  {node} root
 * @return {node}
 */
function maxNode (root) {
  var node = root;
  while (node.right) node = node.right;
  return node;
}
