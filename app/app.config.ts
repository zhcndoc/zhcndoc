import type { AppConfigInput } from 'nuxt/schema'

export default {
  ui: {
    colors: {
      primary: 'cyan',
      neutral: 'gray',
    },
    calendar: {
      slots: {
        cellTrigger: 'rounded-md',
      },
      variants: {
        size: {
          md: {
            cellTrigger: 'size-7',
          },
        },
      },
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
