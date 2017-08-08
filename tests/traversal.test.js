import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe ('traversal check', () => {

  it ('should traverse the tree in order', () => {
    var tree = new Tree();
    tree.insert(3);
    tree.insert(1);
    tree.insert(0);
    tree.insert(2);

    tree.forEach((n, i) => assert.equal(n.key, i));
  });

});
