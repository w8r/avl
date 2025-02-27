export interface AVLNode<K, V> {
  parent: AVLNode<K, V> | null;
  left: AVLNode<K, V> | null;
  right: AVLNode<K, V> | null;
  balanceFactor: number;
  key: K;
  data?: V;
}

/** Callback for comparator */
export type Comparator<K> = (a: K, b: K) => number | 1 | 0 | -1;
export type Visitor<K, V> = (node: AVLNode<K, V>, i: number) => void;
export type NodeCallback<K, V, T = unknown> = (
  this: T | undefined,
  node: AVLNode<K, V>
) => void | boolean;
export type NodePrinter<K, V> = (node: AVLNode<K, V>) => string;
