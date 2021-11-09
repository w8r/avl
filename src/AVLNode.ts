export type AVLNode<K, V> = {
  parent?: AVLNode<K, V>;
  left?: AVLNode<K, V>;
  right?: AVLNode<K, V>;
  balanceFactor: number;
  key: K;
  value: V;
};

/**
 * Single left rotation
 */
export function rotateLeft<K, V>(node: AVLNode<K, V>): AVLNode<K, V> {
  const rightNode = node.right!;
  node.right = rightNode.left;

  if (rightNode.left) {
    rightNode.left.parent = node;
  }

  rightNode.parent = node.parent;
  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode;
    } else {
      rightNode.parent.right = rightNode;
    }
  }

  node.parent = rightNode;
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

/**
 * Single right rotation
 */
export function rotateRight<K, V>(node: AVLNode<K, V>): AVLNode<K, V> {
  const leftNode = node.left!;
  node.left = leftNode.right;
  if (node.left) {
    node.left.parent = node;
  }

  leftNode.parent = node.parent;
  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode;
    } else {
      leftNode.parent.right = leftNode;
    }
  }

  node.parent = leftNode;
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

/**
 * Return the node immediately after the given node in the in-order traversal
 */
export function nextNode<Key, Value>(
  node: AVLNode<Key, Value>
): AVLNode<Key, Value> | undefined {
  let curNode: AVLNode<Key, Value> = node;
  let successor: AVLNode<Key, Value> | undefined = node;
  if (successor.right) {
    successor = successor.right;
    while (successor.left) {
      successor = successor.left;
    }
  } else {
    successor = curNode.parent;
    while (successor && successor.right === curNode) {
      curNode = successor;
      successor = successor.parent;
    }
  }
  return successor;
}

/**
 * Return the node immediately before the given node in the in-order traversal
 */
export function prevNode<Key, Value>(
  node: AVLNode<Key, Value>
): AVLNode<Key, Value> | undefined {
  let curNode: AVLNode<Key, Value> = node;
  let predecessor: AVLNode<Key, Value> | undefined = node;
  if (predecessor.left) {
    predecessor = predecessor.left;
    while (predecessor.right) {
      predecessor = predecessor.right;
    }
  } else {
    predecessor = curNode.parent;
    while (predecessor && predecessor.left === curNode) {
      curNode = predecessor;
      predecessor = predecessor.parent;
    }
  }
  return predecessor;
}

/**
 * Prints tree horizontally
 */
export function printNodes<K, V>(
  root: AVLNode<K, V> | undefined,
  printEntry: (entry: [K, V]) => string = (n) => String(n[0])
): string {
  const out: string[] = [];
  row(root, "", true, (v) => out.push(v), printEntry);
  return out.join("");
}

/**
 * Prints a level of the tree
 */
function row<K, V>(
  root: AVLNode<K, V> | undefined,
  prefix: string,
  isTail: boolean,
  callback: (output: string) => void,
  printEntry: (entry: [K, V]) => string
) {
  if (root) {
    callback(
      `${prefix}${isTail ? "└── " : "├── "}${printEntry([
        root.key,
        root.value,
      ])}\n`
    );
    const indent = prefix + (isTail ? "    " : "│   ");
    if (root.left) {
      row(root.left, indent, false, callback, printEntry);
    }
    if (root.right) {
      row(root.right, indent, true, callback, printEntry);
    }
  }
}
