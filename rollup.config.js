const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

export default {
  input: 'lib/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'umd',
    name: 'Among'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      
    })
  ]
}