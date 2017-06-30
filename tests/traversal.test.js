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

});
