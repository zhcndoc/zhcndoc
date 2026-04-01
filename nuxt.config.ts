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
  future: {
    compatibilityVersion: 5,
  },
  compatibilityDate: '2026-03-26',
  nitro: {
    rollupConfig: {
      onwarn(warning, defaultHandler) {
        if (
          warning.code === 'CIRCULAR_DEPENDENCY' ||
          warning.message?.includes('Circular dependency') ||
          warning.message?.includes('NO_SIDE_EFFECTS') ||
          warning.message?.includes('annotation that Rollup cannot interpret')
        ) {
          return
        }
        defaultHandler(warning)
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: ['luxon'],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (
            warning.code === 'PLUGIN_TIMINGS' ||
            warning.code === 'SOURCEMAP_ERROR' ||
            warning.message?.includes('Sourcemap is likely to be incorrect') ||
            warning.message?.includes('[PLUGIN_TIMINGS]')
          ) {
            return
          }
          defaultHandler(warning)
        },
      },
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
