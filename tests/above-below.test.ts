import { describe, it, assert } from "vitest";
import { Tree } from "../src/";
import { AVLNode } from "../src/types";

describe("above and below", () => {
  it("should return the first node strictly greater than the key for above", () => {
    const tree = new Tree<number>();
    const keys = [10, 20, 30, 40];
    keys.forEach((v) => {
      for (let i = 0; i < 4; i++) tree.insert(v);
    });

    const node = tree.above(20)!;

    const collected: number[] = [];
    let n: AVLNode<number, unknown> | null = node;
    while (n) {
      collected.push(n.key);
      n = tree.next(n);
    }
    assert.deepEqual(collected, [30, 30, 30, 30, 40, 40, 40, 40]);
  });

  it("should return the first node strictly less than the key for below", () => {
    const tree = new Tree<number>();
    const keys = [10, 20, 30, 40];
    keys.forEach((v) => {
      for (let i = 0; i < 4; i++) tree.insert(v);
    });

    const node = tree.below(30)!;

    const collected: number[] = [];
    let n: AVLNode<number, unknown> | null = node;
    while (n) {
      collected.push(n.key);
      n = tree.prev(n);
    }
    assert.deepEqual(collected, [20, 20, 20, 20, 10, 10, 10, 10]);
  });

  it("should return null if no node is above", () => {
    const tree = new Tree<number>();
    [10, 20, 30].forEach((v) => {
      for (let i = 0; i < 4; i++) tree.insert(v);
    });

    assert.isNull(tree.above(30));
    assert.isNull(tree.above(40));
  });

  it("should return null if no node is below", () => {
    const tree = new Tree<number>();
    [10, 20, 30].forEach((v) => {
      for (let i = 0; i < 4; i++) tree.insert(v);
    });

    assert.isNull(tree.below(10));
    assert.isNull(tree.below(5));
  });

  it("should work for keys not in tree", () => {
    const tree = new Tree<number>();
    const keys = [10, 20, 30, 40];
    keys.forEach((v) => {
      for (let i = 0; i < 4; i++) tree.insert(v);
    });

    let node: AVLNode<number, unknown> | null = tree.above(15)!;
    assert.equal(node.key, 20);

    node = tree.below(25)!;
    assert.equal(node.key, 20);

    node = tree.above(5)!;
    assert.equal(node.key, 10);

    node = tree.below(5);
    assert.isNull(node);

    node = tree.above(50);
    assert.isNull(node);

    node = tree.below(50)!;
    assert.equal(node.key, 40);
  });
});
