export type Key = any;

export type Node = {
  parent?:       Node,
  left?:         Node,
  right?:        Node,
  balanceFactor: Number,
  key?:          Key,
  data?:         any
};

export default class AVLTree {
  constructor(comparator?: ((a: Key, b: Key) => number));
  size: Number;
  insert(key: Key, data?: any): void;
  remove(key: Key): Node;
  find(key: Key): Node;
  contains(key: Key): Boolean;
  isEmpty(): Boolean;
  keys(): Array<Key>;
  values(): Array<any>;
  pop(): Node;
  min(): Key;
  max(): Key;
  minNode(): Node;
  maxNode(): Node;
  forEach(fn:((node: Node) => (any))):AVLTree;
  load(keys:Array<Key>, values?:Array<any>):AVLTree;
  prev(node: Node): Node;
  next(node: Node): Node;
  isBalanced(): Boolean;
  toString(): String;
}
