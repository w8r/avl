export type Node<Key extends any, Value extends any> = {
  parent?:       Node<Key, Value>,
  left?:         Node<Key, Value>,
  right?:        Node<Key, Value>,
  balanceFactor: number,
  key?:          Key,
  data?:         Value
};
export type Comparator<Key> = (a: Key, b: Key) => number
export type ForEachCallback<Key, Value> = (node: Node<Key, Value>, index: number) => void
export type TraverseCallback<Key, Value> = (node: Node<Key, Value>) => (void | boolean)

export default class AVLTree<Key extends any, Value extends any> {
  constructor (comparator?: Comparator<Key>, noDuplicates?: boolean);
  size: number;
  insert(key: Key, data?: Value): Node<Key, Value>;
  remove(key: Key): Node<Key, Value>;
  find(key: Key): Node<Key, Value> | null;
  at(index: number): Node<Key, Value> | null;
  contains(key: Key): boolean;
  isEmpty(): boolean;
  keys(): Array<Key>;
  values(): Array<Value>;
  pop(): Node<Key, Value> | null;
  popMax(): Node<Key, Value> | null;
  min(): Key | null;
  max(): Key | null;
  minNode(): Node<Key, Value> | null;
  maxNode(): Node<Key, Value> | null;
  forEach(callback: ForEachCallback<Key, Value>): AVLTree<Key, Value>;
  range(minKey: Key, maxKey: Key, visit: TraverseCallback<Key, Value>, context?: any): AVLTree<Key, Value>;
  load(keys: Array<Key>, values?: Array<Value>, presort?: boolean): AVLTree<Key, Value>;
  prev(node: Node<Key, Value>): Node<Key, Value> | null;
  next(node: Node<Key, Value>): Node<Key, Value> | null;
  isBalanced(): boolean;
  toString(): string;
  destroy(): AVLTree<Key, Value>;
  clear(): AVLTree<Key, Value>;
}
