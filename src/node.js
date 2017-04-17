const { max } = Math;

export function node (key, value) {
  return { left: null, right: null, height: null, key, value };
}


export function leftHeight (node) {
  return node.right ? node.right.height : -1;
}


export function rightHeight (node) {
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
export function rotateLeft (node) {
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
export function rotateRight (node) {
  var other    = node.left;
  node.left    = other.right;
  other.right  = node;

  node.height  = Math.max(leftHeight(node), rightHeight(node)) + 1;
  other.height = Math.max(leftHeight(other), node.height) + 1;
  return other;
}
