export default defineAppConfig({
  ui: {
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
})
