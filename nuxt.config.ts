export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'nuxt-echarts',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://www.zhcndoc.com',
    name: '简中文档',
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-20',
  echarts: {
    charts: ['BarChart'],
    components: [
      'GridComponent',
      'LegendComponent',
      'TitleComponent',
      'TooltipComponent',
    ],
  },
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  fonts: {
    provider: 'local',
    experimental: {
      processCSSVariables: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 1024,
    },
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons',
      },
    ],
  },
  sitemap: {
    discoverImages: false,
  },
})
