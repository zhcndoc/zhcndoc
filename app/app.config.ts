export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
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
