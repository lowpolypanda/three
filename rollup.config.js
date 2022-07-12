import resolve from '@rollup/plugin-node-resolve';
export default {
  input: './JS/viewer.js',
  output: [
    {
      format: 'esm',
      file: './JS/bundle.js'
    },
  ],
  plugins: [
    resolve(),
  ]
};