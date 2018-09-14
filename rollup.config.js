import buble from 'rollup-plugin-buble';
import { version, author, name as moduleName, license, description } from './package.json';

const banner = `\
/**
 * ${moduleName} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

const name = 'AVLTree';


export default [{
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/avl.js',
    name, banner,
    sourcemap: true,
  },
  plugins: [ buble() ]
}, {
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/avl.es6.js',
    name, banner,
    sourcemap: true,
  }
}];
