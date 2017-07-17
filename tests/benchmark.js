const Tree = require('../dist/avl');
const FRB = require('functional-red-black-tree');
const RBTree = require('bintrees').RBTree;


const N = 1000;
const values = new Array(N).fill(0).map((n, i) => Math.floor(Math.random() * N));
console.time('AVL insert');
const tree = new Tree();
for (let i = 0; i < N; i++) tree.insert(values[i]);
console.timeEnd('AVL insert');

console.time('Functional RBTree insert');
let frb = new FRB();
for (let i = 0; i < N; i++) frb = frb.insert(values[i]);
console.timeEnd('Functional RBTree insert');

console.time('Bintrees insert');
let rb = new RBTree((a, b) => a - b);
for (let i = 0; i < N; i++) rb.insert(values[i]);
console.timeEnd('Bintrees insert');
