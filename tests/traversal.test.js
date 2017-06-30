import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe ('traversal check', () => {

  it ('should traverse the tree in order', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    var st = 1;
    tree.forEach((n) => {
      assert.equal(n.key, st++);
    });
  });

  it ('should pass the index', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    var st = 0;
    tree.forEach((n, i) => {
      assert.equal(i, st++);
    });
  });

  it ('should use the provided context', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    var obj = {};
    tree.forEach(function (n, i) {
      assert.equal(this, obj);
    }, obj);
  });

  it ('should find next node', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    var min = tree.minNode();
    var node = tree.next(min);
    assert.equal(min.key, 1);
    assert.equal(node.key, 2);
    assert.equal(tree.next(node).key, 3);

    assert.isNull(tree.next(tree.next(node)), 'next of last is null');
  });

  it ('should find prev node', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    var max = tree.maxNode();
    var node = tree.prev(max);
    assert.equal(max.key, 3, 'max');
    assert.equal(node.key, 2, 'prev');
    assert.equal(tree.prev(node).key, 1);

    assert.isNull(tree.prev(tree.prev(node)), 'prev of first is null');
  });

  it('should support map operation', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    assert.deepEqual(tree.map((n) => n.key), [1, 2, 3]);
  });

});
