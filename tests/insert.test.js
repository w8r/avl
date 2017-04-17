import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';


describe ('insert', () => {

  it('should return the size of the tree', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    assert.equal(tree.size, 5);
  });

  it('should ignore insert of duplicate key', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.insert(1);
    assert.equal(tree.size, 1);
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
  it('should correctly balance the left left case', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    assert.equal(tree._root.key, 2);
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
  it('should correctly balance the left right case', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    assert.equal(tree._root.key, 2);
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
  it('should correctly balance the right right case', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    assert.equal(tree._root.key, 2);
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
  it('should correctly balance the right left case', () => {
    var tree = new Tree();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    assert.equal(tree._root.key, 2);
  });
});
