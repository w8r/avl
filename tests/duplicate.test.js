import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe.only('Duplicate keys', () => {

  it('should allow inserting of duplicate key', () => {
    var tree = new Tree();
    tree.insert(2);
    tree.insert(12);
    tree.insert(1);
    tree.insert(1);
    tree.insert(-6);

    console.log(tree.toString())
    console.log(tree.keys());

    // assert.deepEqual(tree.keys(), [-6, 1, 1, 2, 12]);
    // assert.equal(tree.size, 5);
    // assert.isTrue(tree.isBalanced());
  });


  it('should allow multiple duplicate keys', () => {
    var tree = new Tree();
    tree.insert(2);
    tree.insert(12);
    tree.insert(1);
    tree.insert(1);
    tree.insert(-6);
    tree.insert(2);
    tree.insert(1);
    tree.insert(1);
    tree.insert(13);

    console.log(tree.toString())
    console.log(tree.keys())

    //assert.deepEqual(tree.keys(), [-6, 1, 1, 1, 1, 2, 12]);
    //assert.equal(tree.size, 8);
    assert.isTrue(tree.isBalanced());
  });

});
