import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
    },
  })
