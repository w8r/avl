import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';


describe('remove', () => {

  it('should not change the size of a tree with no root', () => {
    var tree = new Tree();
    tree.remove(1);
    assert.equal(tree.size, 0);
  });

  it('should remove a single key', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.remove(1);
    assert.isTrue(tree.isEmpty);
  });

  /**
   *       _4_                       _2_
   *      /   \                     /   \
   *     2     6  -> remove(6) ->  1     4
   *    / \                             /
   *   1   3                           3
   */
  it('should correctly balance the left left case', () => {
    var tree = new Tree();
    tree.insert(4);
    tree.insert(2);
    tree.insert(6);
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(7);
    tree.remove(7);
    tree.remove(5);
    tree.remove(6);
    assert.equal(tree._root.key, 2);
    assert.equal(tree._root.left.key, 1);
    assert.equal(tree._root.right.key, 4);
    assert.equal(tree._root.right.left.key, 3);
  });

  /**
   *       _4_                       _6_
   *      /   \                     /   \
   *     2     6  -> remove(2) ->  4     7
   *          / \                   \
   *         5   7                  5
   */
  it('should correctly balance the right right case', () => {
    var tree = new Tree();
    tree.insert(4);
    tree.insert(2);
    tree.insert(6);
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(7);
    tree.remove(1);
    tree.remove(3);
    tree.remove(2);
    assert.equal(tree._root.key, 6);
    assert.equal(tree._root.left.key, 4);
    assert.equal(tree._root.left.right.key, 5);
    assert.equal(tree._root.right.key, 7);
  });

  /**
   *       _6_                       _4_
   *      /   \                     /   \
   *     2     7  -> remove(8) ->  2     6
   *    / \     \                 / \   / \
   *   1   4     8               1   3 5   7
   *      / \
   *     3   5
   */
  it('should correctly balance the left right case', () => {
    var tree = new Tree();
    tree.insert(6);
    tree.insert(2);
    tree.insert(7);
    tree.insert(1);
    tree.insert(8);
    tree.insert(4);
    tree.insert(3);
    tree.insert(5);
    tree.remove(8);
    assert.equal(tree._root.key, 4);
    assert.equal(tree._root.left.key, 2);
    assert.equal(tree._root.left.left.key, 1);
    assert.equal(tree._root.left.right.key, 3);
    assert.equal(tree._root.right.key, 6);
    assert.equal(tree._root.right.left.key, 5);
    assert.equal(tree._root.right.right.key, 7);
  });

  /**
   *       _3_                       _5_
   *      /   \                     /   \
   *     2     7  -> remove(1) ->  3     7
   *    /     / \                 / \   / \
   *   1     5   8               2   4 6   8
   *        / \
   *       4   6
   */
  it('should correctly balance the right left case', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(2);
    tree.insert(7);
    tree.insert(1);
    tree.insert(8);
    tree.insert(5);
    tree.insert(4);
    tree.insert(6);
    tree.remove(1);
    assert.equal(tree._root.key, 5);
    assert.equal(tree._root.left.key, 3);
    assert.equal(tree._root.left.left.key, 2);
    assert.equal(tree._root.left.right.key, 4);
    assert.equal(tree._root.right.key, 7);
    assert.equal(tree._root.right.left.key, 6);
    assert.equal(tree._root.right.right.key, 8);
  });

  it('should take the right child if the left does not exist', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.remove(1);
    assert.equal(tree._root.key, 2);
  });

  it('should take the left child if the right does not exist', () => {
    var tree = new Tree();
    tree.insert(2);
    tree.insert(1);
    tree.remove(2);
    assert.equal(tree._root.key, 1);
  });

  it('should get the right child if the node has 2 leaf children', () => {
    var tree = new Tree();
    tree.insert(2);
    tree.insert(1);
    tree.insert(3);
    tree.remove(2);
    assert.equal(tree._root.key, 3);
  });

  it('should get the in-order successor if the node has both children', () => {
    var tree = new Tree();
    tree.insert(2);
    tree.insert(1);
    tree.insert(4);
    tree.insert(3);
    tree.insert(5);
    tree.remove(2);
    assert.equal(tree._root.key, 3);
  });
});
