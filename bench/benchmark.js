const Benchmark = require('benchmark');
const Tree   = require('../dist/avl');
const FRB    = require('functional-red-black-tree');
const RBTree = require('bintrees').RBTree;


const N = 1000;
const values = new Array(N).fill(0).map((n, i) => i/*Math.floor(Math.random() * N)*/);

new Benchmark.Suite()
  .add('Bintrees insert', () => {
    let rb = new RBTree((a, b) => a - b);
    for (let i = 0; i < N; i++) rb.insert(values[i]);
  })
  .add('Functional red black tree insert', () => {
    let frb = new FRB();
    for (let i = 0; i < N; i++) frb = frb.insert(values[i]);
  })
  .add('AVL insert', () => {
    const tree = new Tree();
    for (let i = 0; i < N; i++) tree.insert(values[i]);
  })
  .on('error', function(event) {
    console.log(event.target.error);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .run();
