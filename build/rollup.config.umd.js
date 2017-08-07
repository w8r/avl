import config from './rollup.config';
import buble  from 'rollup-plugin-buble';

config.format     = 'umd';
config.dest       = 'dist/avl.js';
config.moduleName = 'avl';
config.plugins    = [ buble() ];

export default config;
