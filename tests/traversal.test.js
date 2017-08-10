import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe.only ('traversal check', () => {

  it ('should traverse the tree in order', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(0);
    tree.insert(2);

    tree.forEach((n, i) => assert.equal(n.key, i));
  });

  it('should find predecessor for the node', () => {
    const tree = new Tree();
    const keys = [];
    for (let i = 0; i < 10; i++) tree.insert(i);

    for (let i = 1; i < 10; i++) {
      assert.strictEqual(tree.prev(tree.find(i)), tree.find(i - 1));
    }
  });

  it('should find successor for a node', () => {
    const tree = new Tree();
    for (let i = 0; i < 10; i++) tree.insert(i);

    for (let i = 0; i < 9; i++) {
      assert.strictEqual(tree.next(tree.find(i)), tree.find(i + 1));
    }
  });
});
