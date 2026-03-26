import type { AppConfigInput } from 'nuxt/schema'

export default {
  ui: {
    colors: {
      primary: 'cyan',
      neutral: 'gray',
    },
    icons: {
      // @ts-ignore
      dark: 'tabler:moon',
      light: 'tabler:sun-high',
    },
    navigationMenu: {
      slots: {
        list: 'list-none',
      },
    },
  },
} satisfies AppConfigInput
