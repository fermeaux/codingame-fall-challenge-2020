import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: 'src/index.js',
    watch: {
      include: 'src/**/*'
    },
    output: {
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel()
    ]
  }
]
