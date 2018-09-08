import buble from 'rollup-plugin-buble'

const libName = `ImageLazyLoad`

export default {
  input: 'src/index.js',
  plugins: [ buble() ],
  output: {
    banner: '/*!\n' +
            ` * ${libName} | @bqliu @hxli\n` +
            ' * a simple image lazy load library\n' +
            ' */',
    footer: '\n',
    file: `dist/${libName}.umd.js`,
    format: 'umd',
    name: `$$${libName}`,
    sourcemap: true
  },
  watch: {
    include: 'src/**'
  }
}
