import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
    },
  })
