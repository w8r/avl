import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe('balance', () => {

  it('should be balance after in order insert', () => {
    const tree = new Tree();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    tree.insert(4);
    tree.insert(0);
    tree.insert(-10);
    tree.insert(20);

    // console.log(tree.toString());

    assert.isTrue(tree.isBalanced());
  });

  it('should be balance after random insert', () => {
    const tree = new Tree();
    const min = -100, max = 100;

    for (let i = 0; i < 20; i++) {
      tree.insert(min + Math.floor((max - min) * Math.random()));
    }

    console.log(tree.toString());

    // console.log(Tree.verifyBalanceFactor(tree._root));
    assert.isTrue(tree.isBalanced());
  });

});
