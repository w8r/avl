import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe ('empty check', () => {

  it('should return whether the tree is empty', () => {
    const tree = new Tree();

    assert.isTrue(tree.isEmpty());
    tree.insert(1);
    assert.isFalse(tree.isEmpty());
    tree.remove(1);
    assert.isTrue(tree.isEmpty());
  });

  it ('should clear the tree', () => {
    const tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);

    tree.clear();
    assert.isTrue(tree.isEmpty());
    assert.equal(tree.size, 0);
  });
});
