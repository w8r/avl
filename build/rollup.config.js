import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/index.js',
  sourceMap: true,
  plugins:   [ buble() ]
};
