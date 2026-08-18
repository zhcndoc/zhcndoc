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
        {
          name: 'google-adsense-account',
          content: 'ca-pub-7563908414744328',
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
  routeRules: {
    '/analytics': {
      redirect: {
        to: '/insight',
        statusCode: 301,
      },
    },
    '/api/insight/**': {
      cache: {
        maxAge: 60,
        staleMaxAge: 5 * 60,
        swr: true,
      },
    },
    '/api/project/**': {
      cache: {
        maxAge: 10 * 60,
        staleMaxAge: 60 * 60,
        swr: true,
      },
    },
    '/api/projects': {
      redirect: {
        to: '/api/project',
        statusCode: 301,
      },
    },
    '/api/projects/**': {
      redirect: {
        to: '/api/project/**',
        statusCode: 301,
      },
    },
    '/images/projects/**': {
      redirect: {
        to: '/images/project/**',
        statusCode: 301,
      },
    },
    '/projects': {
      redirect: {
        to: '/project',
        statusCode: 301,
      },
    },
    '/projects/overview': {
      redirect: {
        to: '/overview',
        statusCode: 301,
      },
    },
    '/projects/**': {
      redirect: {
        to: '/project/**',
        statusCode: 301,
      },
    },
  },
  experimental: {
    serverAppConfig: false,
  },
  compatibilityDate: '2026-03-26',
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'luxon'],
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
