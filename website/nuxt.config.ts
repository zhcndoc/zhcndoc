export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-echarts',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
      ],
      link: [
        {
          href: '/site.webmanifest',
          rel: 'manifest',
          crossorigin: 'use-credentials',
        },
      ],
      script: [{ src: '/js/common.js', async: true }],
      templateParams: {
        separator: ' - ',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    umamiToken: '',
  },
  experimental: {
    serverAppConfig: false,
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
})
