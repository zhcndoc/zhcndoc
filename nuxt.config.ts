import { $fetch } from 'ofetch'

const umamiAuth = await $fetch(
  `https://umami.ikxin.com/api/share/aHYOn5YKtcPoS5v7`,
)

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'nuxt-echarts',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    umamiToken: umamiAuth?.token,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-20',
  dayjs: {
    defaultLocale: 'zh-cn',
    defaultTimezone: 'Asia/Shanghai',
    locales: ['zh-cn'],
    plugins: ['relativeTime', 'utc', 'timezone'],
  },
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
})
