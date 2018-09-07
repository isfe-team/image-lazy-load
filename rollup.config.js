import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  plugins: [ buble() ],
  output: {
    banner: '/*!\n' +
            ' * hxli\n' +
            ' * a simple picture lazy load\n' +
            ' * use methods scrollLoadPic({ preLoadHeight: 0, delay: 2000 }, container)\n' +
            ' * preLoadHeight: 向下多加载的高度,delay: 延迟加载时间,container: 在哪个容器里加载(获取到的dom)\n' +
            ' */',
    footer: '\n',
    file: 'dist/loadImage.umd.js',
    format: 'umd',
    name: '$$scrollLoadPic',
    sourcemap: true
  },
  watch: {
    include: 'src/**'
  }
}