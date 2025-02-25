import yaml from '@rollup/plugin-yaml'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-20',
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    plugins: [yaml()],
  },
  nitro: {
    rollupConfig: {
      // @ts-ignore https://github.com/rollup/plugins/discussions/1592
      plugins: [yaml()],
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],
  fonts: {
    provider: 'local',
    experimental: {
      processCSSVariables: true,
    },
  },
  i18n: {
    baseUrl: 'https://www.zhcndoc.com',
    defaultLocale: 'zh-cn',
    locales: [
      {
        code: 'zh-cn',
        language: 'zh-CN',
        file: 'zh-cn.json',
        icon: 'cn',
        name: '简体中文',
      },
    ],
  },
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons',
      },
    ],
  },
})
