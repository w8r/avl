import { describe, it, assert } from "vitest";
import { AVLTree as Tree } from "../src/";

describe("insert", () => {
  it("should return the size of the tree", () => {
    const tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    assert.equal(tree.size, 5);
  });

  /**
   *         c
   *        / \           _b_
   *       b   z         /   \
   *      / \     ->    a     c
   *     a   y         / \   / \
   *    / \           w   x y   z
   *   w   x
   */
  it("should correctly balance the left left case", () => {
    const tree = new Tree();
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    assert.equal(tree.root!.key, 2);
  });

  /**
   *       c
   *      / \           _b_
   *     a   z         /   \
   *    / \     ->    a     c
   *   w   b         / \   / \
   *      / \       w   x y   z
   *     x   y
   */
  it("should correctly balance the left right case", () => {
    const tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    assert.equal(tree.root!.key, 2);
  });

  /**
   *     a
   *    / \               _b_
   *   w   b             /   \
   *      / \     ->    a     c
   *     x   c         / \   / \
   *        / \       w   x y   z
   *       y   z
   */
  it("should correctly balance the right right case", () => {
    const tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    assert.equal(tree.root!.key, 2);
  });

  /**
   *     a
   *    / \             _b_
   *   w   c           /   \
   *      / \   ->    a     c
   *     b   z       / \   / \
   *    / \         w   x y   z
   *   x   y
   */
  it("should correctly balance the right left case", () => {
    const tree = new Tree();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    assert.equal(tree.root!.key, 2);
  });

  it("should allow bulk-insert", () => {
    const tree = new Tree();
    const keys = [1, 2, 3, 4];
    const values = [4, 3, 2, 1];
    tree.load(keys, values, true);

    assert.deepEqual(tree.keys(), keys);
    assert.deepEqual(tree.values(), values);
  });

  it("should allow bulk-insert without values", () => {
    const tree = new Tree();
    const keys = [1, 2, 3, 4, 5, 6, 7, 8];
    tree.load(keys, undefined, true);

    assert.deepEqual(tree.keys(), keys);
    assert.deepEqual(
      tree.values(),
      keys.map(() => undefined)
    );

    //assert.isTrue(tree.isBalanced());
  });

  it("should mark balance properly after bulk-load", () => {
    const tree = new Tree();
    const keys = [1, 2, 3, 4, 5, 6, 7, 8];
    tree.load(keys, undefined, true);

    //tree.insert(0);

    assert.isTrue(tree.isBalanced());
  });
});
