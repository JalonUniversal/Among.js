const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

export default {
  input: 'lib/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'umd',
    name: 'among',
    globals: {
      among: 'among'
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',

    })
  ]
}