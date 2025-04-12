export default defineNuxtConfig({
  compatibilityDate: '2025-01-20',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/ui-pro', '@nuxt/eslint', 'nuxt-echarts'],

  css: ['~/assets/css/main.css'],
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
  echarts: {
    charts: ['BarChart'],
    components: [
      'TooltipComponent',
      'GridComponent',
      'TitleComponent',
      'LegendComponent',
    ],
  },
})
