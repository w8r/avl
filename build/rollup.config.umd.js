import config from './rollup.config';

config.format     = 'umd';
config.dest       = 'dist/avl.js';
config.moduleName = 'avl';

export default config;
