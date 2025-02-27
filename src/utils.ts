import type { AVLNode, NodePrinter } from "./types";
import { Comparator } from "bintrees";

/**
 * Prints tree horizontally
 */
export function print<K, V>(
  root: AVLNode<K, V> | null,
  printNode: NodePrinter<K, V> = (n) => n.key as string
) {
  const out: string[] = [];
  row(root, "", true, (v) => out.push(v), printNode);
  return out.join("");
}

/**
 * Prints level of the tree
 */
function row<K, V>(
  root: AVLNode<K, V> | null,
  prefix: string,
  isTail: boolean,
  out: (str: string) => void,
  printNode: NodePrinter<K, V>
) {
  if (root) {
    out(`${prefix}${isTail ? "└── " : "├── "}${printNode(root)}\n`);
    const indent = prefix + (isTail ? "    " : "│   ");
    if (root.left) row(root.left, indent, false, out, printNode);
    if (root.right) row(root.right, indent, true, out, printNode);
  }
}

/**
 * Is the tree balanced (none of the subtrees differ in height by more than 1)
 */
export function isBalanced<K, V>(root: AVLNode<K, V> | null): boolean {
  if (root === null) return true; // If node is empty then return true

  // Get the height of left and right sub trees
  const lh = height(root.left);
  const rh = height(root.right);

  if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right))
    return true;

  // If we reach here then tree is not height-balanced
  return false;
}

/**
 * The function Compute the 'height' of a tree.
 * Height is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 */
function height<K, V>(node: AVLNode<K, V> | null): number {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
}

export function loadRecursive<K, V>(
  parent: AVLNode<K, V> | null,
  keys: K[],
  values: V[],
  start: number,
  end: number
) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys[middle];
    const data = values[middle];
    const node = { key, data, parent } as AVLNode<K, V>;
    node.left = loadRecursive(node, keys, values, start, middle);
    node.right = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }
  return null;
}

export function markBalance<K, V>(node: AVLNode<K, V> | null): number {
  if (node === null) return 0;
  const lh = markBalance(node.left);
  const rh = markBalance(node.right);

  node.balanceFactor = lh - rh;
  return Math.max(lh, rh) + 1;
}

export function sort<K, V>(
  keys: K[],
  values: V[],
  left: number,
  right: number,
  compare: Comparator<K>
) {
  if (left >= right) return;

  const pivot = keys[(left + right) >> 1];
  let i = left - 1;
  let j = right + 1;

  while (true) {
    do i++;
    while (compare(keys[i], pivot) < 0);
    do j--;
    while (compare(keys[j], pivot) > 0);
    if (i >= j) break;

    const tmpk = keys[i];
    keys[i] = keys[j];
    keys[j] = tmpk;

    const tmpv = values[i];
    values[i] = values[j];
    values[j] = tmpv;
  }

  sort(keys, values, left, j, compare);
  sort(keys, values, j + 1, right, compare);
}
