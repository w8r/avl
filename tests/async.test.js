import { describe, it } from 'mocha';
import { assert }       from 'chai';

import Tree from '../src/index';

describe('async check', () => {
  it ('should traverse the tree in order', async () => {
    const tree = new Tree();
    tree.insert(2);
    tree.insert(0);
    tree.insert(3);
    tree.insert(1);

    await tree.asyncForEach(async (n, i) => assert.equal(n.key, i));
  });
});
