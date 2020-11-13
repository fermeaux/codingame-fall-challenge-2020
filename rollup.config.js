import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const extensions = ['.js'];

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
    plugins: [
      resolve({
        mainFields: ['module', 'main', 'jsnext:main', 'browser'],
        extensions,
      }),
      commonjs(),
      babel({
        exclude: './node_modules/**',
        extensions,
      }),
    ],
  },
];
