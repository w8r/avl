import {
  AVLNode,
  prevNode,
  printNodes,
  rotateLeft,
  rotateRight,
} from "./AVLNode";

function DEFAULT_COMPARE<K>(a: K, b: K) {
  return a > b ? 1 : a < b ? -1 : 0;
}

/**
 * Implements a Adelson-Velsky-Landis (AVL) tree, a self-balancing binary tree.
 * Lookup, insertion, and deletion all take O(log n) time in both the average
 * and worst cases, where n is the number of nodes in the tree prior to the
 * operation.
 */
export class AVLTree<K, V> {
  private readonly _comparator: (a: K, b: K) => number;
  private _root?: AVLNode<K, V>;
  private _size: number;

  constructor(comparator?: (a: K, b: K) => number) {
    this._comparator = comparator ?? DEFAULT_COMPARE;
    this._size = 0;
  }

  /**
   * Number of nodes
   */
  get size(): number {
    return this._size;
  }

  /**
   * Clear the tree
   * @return {AVLTree}
   */
  clear(): AVLTree<K, V> {
    this._root = undefined;
    this._size = 0;
    return this;
  }

  /**
   * Whether the tree contains a node with the given key
   */
  has(key: K): boolean {
    if (this._root) {
      let node: AVLNode<K, V> | undefined = this._root;
      const comparator = this._comparator;
      while (node) {
        const cmp = comparator(key, node.key);
        if (cmp === 0) {
          return true;
        } else if (cmp < 0) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
    return false;
  }

  /**
   * Returns all keys in order
   */
  *keys(): IterableIterator<K> {
    let current = this._root;
    const s: AVLNode<K, V>[] = [];
    let done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop()!;
          yield current.key;
          current = current.right;
        } else {
          done = true;
        }
      }
    }
  }

  /**
   * Returns all values in order
   */
  *values(): IterableIterator<V> {
    let current = this._root;
    const s: AVLNode<K, V>[] = [];
    let done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop()!;
          yield current.value;
          current = current.right;
        } else {
          done = true;
        }
      }
    }
  }

  /**
   * Returns all key/value pairs in order
   */
  *entries(): IterableIterator<[K, V]> {
    let current = this._root;
    const s: AVLNode<K, V>[] = [];
    let done = false;

    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop()!;
          yield [current.key, current.value];
          current = current.right;
        } else {
          done = true;
        }
      }
    }
  }

  /**
   * Returns the entry with the minimum key
   */
  minEntry(): [K, V] | undefined {
    let node = this._root;
    if (!node) {
      return undefined;
    }
    while (node.left) {
      node = node.left;
    }
    return [node.key, node.value];
  }

  /**
   * Returns the entry with the maximum key
   */
  maxEntry(): [K, V] | undefined {
    let node = this._root;
    if (!node) {
      return undefined;
    }
    while (node.right) {
      node = node.right;
    }
    return [node.key, node.value];
  }

  /**
   * Minimum key
   */
  minKey(): K | undefined {
    let node = this._root;
    if (!node) {
      return undefined;
    }
    while (node.left) {
      node = node.left;
    }
    return node.key;
  }

  /**
   * Maximum key
   */
  maxKey(): K | undefined {
    let node = this._root;
    if (!node) {
      return undefined;
    }
    while (node.right) {
      node = node.right;
    }
    return node.key;
  }

  /**
   * Removes and returns the entry with smallest key
   */
  shift(): [K, V] | undefined {
    let node = this._root;
    let returnValue: [K, V] | undefined;
    if (node) {
      while (node.left) {
        node = node.left;
      }
      returnValue = [node.key, node.value];
      this.delete(node.key);
    }
    return returnValue;
  }

  /**
   * Removes and returns the entry with largest key
   */
  pop(): [K, V] | undefined {
    let node = this._root;
    let returnValue: [K, V] | undefined;
    if (node) {
      while (node.right) {
        node = node.right;
      }
      returnValue = [node.key, node.value];
      this.delete(node.key);
    }
    return returnValue;
  }

  /**
   * Search for an entry by key
   */
  get(key: K): V | undefined {
    const compare = this._comparator;

    let node = this._root;
    while (node) {
      const cmp = compare(key, node.key);
      if (cmp === 0) {
        return node.value;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return undefined;
  }

  /**
   * Execute a callback for each key/value entry in order
   */
  forEach(
    callbackfn: (value: V, key: K, tree: AVLTree<K, V>) => void
  ): AVLTree<K, V> {
    let current = this._root;
    const s: AVLNode<K, V>[] = [];
    let done = false;

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
          current = s.pop()!;
          callbackfn(current.value, current.key, this);

          // We have visited the node and its left
          // subtree. Now, it's right subtree's turn
          current = current.right;
        } else {
          done = true;
        }
      }
    }
    return this;
  }

  /**
   * Walk key range from `low` to `high` in order
   */
  range(
    low: K,
    high: K,
    callbackfn: (value: V, key: K, tree: AVLTree<K, V>) => void
  ): AVLTree<K, V> {
    const Q: AVLNode<K, V>[] = [];
    const compare = this._comparator;
    let node = this._root;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        if (compare(node.key, low) <= 0) {
          node = undefined;
        } else {
          node = node.left;
        }
      } else {
        node = Q.pop()!;
        if (compare(node.key, high) > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          callbackfn(node.value, node.key, this);
        }
        node = node.right;
      }
    }
    return this;
  }

  findLessThan(key: K): [K, V] | undefined {
    let node = this.findGreaterThanOrEqualNode(key);
    if (!node) {
      // Check if there is any key less than `key`
      node = this._root;
      if (!node) {
        return undefined;
      }
      while (node.right) {
        node = node.right;
      }
      return this._comparator(node.key, key) < 0
        ? [node.key, node.value]
        : undefined;
    }

    // Return the node just before the first node with key greater than or equal to `key`, if any
    const lt = prevNode(node);
    return lt ? [lt.key, lt.value] : undefined;
  }

  findLessThanOrEqual(key: K): [K, V] | undefined {
    let node = this.findGreaterThanOrEqualNode(key);
    if (!node) {
      // Check if there is any key less than `key`
      node = this._root;
      if (!node) {
        return undefined;
      }
      while (node.right) {
        node = node.right;
      }
      return this._comparator(node.key, key) < 0
        ? [node.key, node.value]
        : undefined;
    }

    // Check if the found node is an exact match
    if (this._comparator(node.key, key) === 0) {
      return [node.key, node.value];
    }

    // Return the node just before the first node with key greater than or equal to `key`, if any
    const lt = prevNode(node);
    return lt ? [lt.key, lt.value] : undefined;
  }

  findGreaterThan(key: K): [K, V] | undefined {
    const Q: AVLNode<K, V>[] = [];
    const compare = this._comparator;
    let node = this._root;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        if (compare(node.key, key) <= 0) {
          node = undefined;
        } else {
          node = node.left;
        }
      } else {
        node = Q.pop()!;
        if (compare(node.key, key) > 0) {
          return [node.key, node.value];
        }
        node = node.right;
      }
    }
    return undefined;
  }

  findGreaterThanOrEqual(key: K): [K, V] | undefined {
    const node = this.findGreaterThanOrEqualNode(key);
    return node ? [node.key, node.value] : undefined;
  }

  private findGreaterThanOrEqualNode(key: K): AVLNode<K, V> | undefined {
    const Q: AVLNode<K, V>[] = [];
    const compare = this._comparator;
    let node = this._root;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        if (compare(node.key, key) <= 0) {
          node = undefined;
        } else {
          node = node.left;
        }
      } else {
        node = Q.pop()!;
        if (compare(node.key, key) >= 0) {
          return node;
        }
        node = node.right;
      }
    }
    return undefined;
  }

  /**
   * Insert a new key/value pair into the tree or update an existing entry
   */
  set(key: K, value: V): this {
    if (!this._root) {
      this._root = {
        parent: undefined,
        left: undefined,
        right: undefined,
        balanceFactor: 0,
        key,
        value,
      };
      this._size++;
      return this;
    }

    const compare = this._comparator;
    let node: AVLNode<K, V> | undefined = this._root;
    let parent: AVLNode<K, V> | undefined;
    let cmp = 0;

    while (node) {
      cmp = compare(key, node.key);
      parent = node;
      if (cmp === 0) {
        node.value = value;
        return this;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (parent == undefined) {
      throw new Error(`failed to find parent node for insert`);
    }

    const newNode: AVLNode<K, V> = {
      left: undefined,
      right: undefined,
      balanceFactor: 0,
      parent,
      key,
      value,
    };

    if (cmp <= 0) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    let newRoot: AVLNode<K, V> | undefined;
    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0) {
        parent.balanceFactor -= 1;
      } else {
        parent.balanceFactor += 1;
      }

      if (parent.balanceFactor === 0) {
        break;
      } else if (parent.balanceFactor < -1) {
        if (parent.right?.balanceFactor === 1) {
          rotateRight(parent.right);
        }
        newRoot = rotateLeft(parent);

        if (parent === this._root) {
          this._root = newRoot;
        }
        break;
      } else if (parent.balanceFactor > 1) {
        if (parent.left?.balanceFactor === -1) {
          rotateLeft(parent.left);
        }
        newRoot = rotateRight(parent);

        if (parent === this._root) {
          this._root = newRoot;
        }
        break;
      }
      parent = parent.parent;
    }

    this._size++;
    return this;
  }

  /**
   * Finds the first matching node by key and removes it
   */
  delete(key: K): boolean {
    if (!this._root) {
      return false;
    }

    let node: AVLNode<K, V> | undefined = this._root;
    const compare = this._comparator;
    let cmp = 0;

    while (node) {
      cmp = compare(key, node.key);
      if (cmp === 0) {
        break;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    if (!node) {
      return false;
    }

    let max, min;

    if (node.left) {
      max = node.left;

      while (max.left || max.right) {
        while (max.right) {
          max = max.right;
        }

        node.key = max.key;
        node.value = max.value;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }

      node.key = max.key;
      node.value = max.value;
      node = max;
    }

    if (node.right) {
      min = node.right;

      while (min.left || min.right) {
        while (min.left) {
          min = min.left;
        }

        node.key = min.key;
        node.value = min.value;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }

      node.key = min.key;
      node.value = min.value;
      node = min;
    }

    let parent = node.parent;
    let pp: AVLNode<K, V> | undefined = node;
    let newRoot: AVLNode<K, V> | undefined;

    while (parent) {
      if (parent.left === pp) {
        parent.balanceFactor -= 1;
      } else {
        parent.balanceFactor += 1;
      }

      if (parent.balanceFactor < -1) {
        if (parent.right?.balanceFactor === 1) {
          rotateRight(parent.right);
        }
        newRoot = rotateLeft(parent);

        if (parent === this._root) {
          this._root = newRoot;
        }
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        if (parent.left?.balanceFactor === -1) {
          rotateLeft(parent.left);
        }
        newRoot = rotateRight(parent);

        if (parent === this._root) {
          this._root = newRoot;
        }
        parent = newRoot;
      }

      const parentBalanceFactor = parent?.balanceFactor;
      if (parentBalanceFactor === -1 || parentBalanceFactor === 1) {
        break;
      }

      pp = parent;
      parent = parent?.parent;
    }

    if (node.parent) {
      if (node.parent.left === node) {
        node.parent.left = undefined;
      } else {
        node.parent.right = undefined;
      }
    }

    if (node === this._root) {
      this._root = undefined;
    }

    this._size--;
    return true;
  }

  /**
   * Returns a string representation of the tree - primitive horizontal print-out
   */
  toString(printEntry?: (entry: [K, V]) => string): string {
    return printNodes(this._root, printEntry).trimEnd();
  }
}
