import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';


describe ('find min and max', () => {

  it('should return the maximum key in the tree', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    assert.equal(tree.max(), 5);
  });

  it('should return the minimum key in the tree', () => {
    var tree = new Tree();
    tree.insert(5);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    assert.equal(tree.min(), 1);
  });

  it ('should support removing min node', () => {
    var tree = new Tree();
    tree.insert(5);
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    assert.equal(tree.pop(), 1);
  });

});
