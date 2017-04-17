import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe ('custom comparator', () => {

  it('should function correctly given a non-reverse customCompare', () => {
    var tree = new Tree((a, b) => b - a);
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    assert.equal(tree.size, 3);
    assert.equal(tree.min(), 3);
    assert.equal(tree.max(), 1);
    tree.remove(3);
    assert.equal(tree.size, 2);
    assert.equal(tree._root.key, 2);
    assert.equal(tree._root.left, null);
    assert.equal(tree._root.right.key, 1);
  });

});
