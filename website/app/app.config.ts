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
    prose: {
      blockquote: {
        base: 'not-italic',
      },
      ul: {
        base: 'my-4 list-none ps-0 sm:my-5 [&_ul]:mt-2 [&_ul]:ps-4 sm:[&_ul]:ps-5',
      },
      li: {
        base: "relative ps-0 indent-4 leading-6 sm:leading-7 before:absolute before:start-0 before:top-[0.82em] before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-muted before:content-[''] [&_code]:indent-0 [&>ul]:mb-0",
      },
      table: {
        slots: {
          base: 'min-w-full w-max',
        },
      },
      th: {
        base: 'whitespace-nowrap',
      },
      td: {
        base: 'whitespace-nowrap',
      },
    },
    navigationMenu: {
      slots: {
        list: 'list-none',
      },
    },
    table: {
      slots: {
        th: 'whitespace-nowrap',
      },
    },
  },
}
