export default defineAppConfig({
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
})
