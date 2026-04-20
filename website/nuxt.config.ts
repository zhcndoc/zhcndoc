export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-echarts',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://www.zhcndoc.com',
    name: '简中文档',
  },
  runtimeConfig: {
    umamiToken: '',
  },
  compatibilityDate: '2026-03-26',
  vite: {
    optimizeDeps: {
      include: ['luxon'],
    },
  },
  echarts: {
    charts: ['BarChart', 'HeatmapChart', 'MapChart'],
    components: [
      'GridComponent',
      'LegendComponent',
      'TitleComponent',
      'TooltipComponent',
      'VisualMapComponent',
    ],
  },
  eslint: {
    config: {
      typescript: true,
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
    mode: 'css',
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
