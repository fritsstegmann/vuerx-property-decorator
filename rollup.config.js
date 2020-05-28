export default {
  input: 'lib/vuerx-property-decorator.js',
  output: {
    file: 'lib/vuerx-property-decorator.umd.js',
    format: 'umd',
    name: 'VuePropertyDecorator',
    globals: {
      vue: 'Vue',
      'vuerx-class-component': 'VueClassComponent',
    },
    exports: 'named',
  },
  external: ['vue', 'vue-class-component', 'reflect-metadata'],
}
