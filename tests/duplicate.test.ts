import { describe, it, assert } from "vitest";
import { Tree } from "../src/";

describe("Duplicate keys", () => {
  it("should allow inserting of duplicate key", () => {
    const tree = new Tree();
    const values = [2, 12, 1, -6, 1];

    values.forEach((v) => {
      tree.insert(v);
      assert.isTrue(tree.isBalanced());
    });

    assert.deepEqual(tree.keys(), [-6, 1, 1, 2, 12]);
    assert.equal(tree.size, 5);
    assert.isTrue(tree.isBalanced());
  });

  it("should allow multiple duplicate keys in a row", () => {
    const tree = new Tree();
    const values = [2, 12, 1, 1, -6, 2, 1, 1, 13];

    values.forEach((v) => {
      tree.insert(v);
      assert.isTrue(tree.isBalanced());
    });

    assert.deepEqual(tree.keys(), [-6, 1, 1, 1, 1, 2, 2, 12, 13]);
    assert.equal(tree.size, 9);
    assert.isTrue(tree.isBalanced());
  });

  it("should remove from a tree with duplicate keys correctly", () => {
    const tree = new Tree();
    const values = [2, 12, 1, 1, -6, 1, 1];

    values.forEach((v) => tree.insert(v));

    let size = tree.size;
    for (let i = 0; i < 4; i++) {
      tree.remove(1);

      if (i < 3) assert.isTrue(tree.contains(1));
      assert.isTrue(tree.isBalanced());
      assert.equal(tree.size, --size);
    }

    assert.isFalse(tree.contains(1));
    assert.isTrue(tree.isBalanced());
  });

  it("should remove from a tree with multiple duplicate keys correctly", () => {
    const tree = new Tree();
    const values = [2, 12, 1, 1, -6, 1, 1, 2, 0, 2];

    values.forEach((v) => tree.insert(v));

    let size = tree.size;
    while (!tree.isEmpty()) {
      tree.pop();

      assert.isTrue(tree.isBalanced());
      assert.equal(tree.size, --size);
    }
  });

  it("should disallow duplicates if noDuplicates is set", () => {
    const tree = new Tree(undefined, true);
    const values = [2, 12, 1, -6, 1];

    values.forEach((v) => {
      tree.insert(v);
      assert.isTrue(tree.isBalanced());
    });

    assert.deepEqual(tree.keys(), [-6, 1, 2, 12]);
    assert.equal(tree.size, 4);
    assert.isTrue(tree.isBalanced());
  });
});
