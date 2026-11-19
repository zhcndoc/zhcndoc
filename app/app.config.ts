import { controls, focus } from './theme/controls'
import { prose } from './theme/prose'

export default defineAppConfig({
  ui: {
    ...controls,
    colors: { primary: 'brand', neutral: 'zinc' },
    icons: { dark: 'tabler:moon', light: 'tabler:sun-high' },
    container: {
      base: 'mx-auto min-w-0 w-full max-w-(--ui-container) px-4 sm:px-6',
    },
    main: { base: 'flex-1 min-w-0' },
    header: {
      slots: {
        root: 'sticky top-0 z-40 h-(--ui-header-height) border-b border-default bg-default',
        container: 'flex h-full items-center gap-6 lg:gap-12',
        left: 'flex shrink-0 items-center',
        center: 'hidden h-full items-stretch md:flex',
        right: 'ms-auto flex items-center gap-1.5',
        title: 'inline-flex items-center',
        toggle: 'md:hidden',
        content: 'md:hidden',
        overlay: 'md:hidden',
        header:
          'flex h-(--ui-header-height) shrink-0 items-center justify-between border-b border-default px-4',
        body: 'min-h-0 flex-1 overflow-y-auto p-4',
      },
    },
    navigationMenu: {
      slots: {
        root: 'flex',
        list: 'flex list-none',
        item: 'flex',
        link: [
          'flex items-center gap-2 border-transparent text-sm font-medium text-muted hover:bg-muted hover:text-highlighted',
          focus,
        ],
        linkLeadingIcon: 'size-4 shrink-0',
      },
      variants: {
        orientation: {
          horizontal: { list: 'h-full gap-1', link: 'border-b-2 px-4 pt-0.5' },
          vertical: {
            root: 'w-full',
            list: 'w-full flex-col gap-1',
            link: 'w-full border-s-2 px-3 py-3',
          },
        },
        active: { true: { link: 'border-brand-500 text-primary' } },
      },
    },
    card: {
      slots: {
        root: 'min-w-0 rounded-md border border-default bg-default',
        header:
          'flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-muted px-4 py-3.5 sm:px-5',
        title: 'font-semibold text-highlighted',
        body: 'min-w-0 p-4 sm:p-5',
        footer: 'border-t border-muted px-4 py-3 sm:px-5',
      },
    },
    badge: {
      slots: {
        base: 'inline-flex w-fit items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        leadingIcon: 'size-3.5 shrink-0',
      },
      variants: {
        color: {
          neutral: 'bg-elevated text-muted',
          primary: 'bg-primary/10 text-primary',
          success:
            'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
          warning:
            'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
          error: 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300',
        },
      },
    },
    avatar: {
      slots: {
        root: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-elevated align-middle',
        image: 'size-full object-cover',
        fallback: 'font-medium text-muted',
        icon: 'size-4 text-muted',
      },
      variants: {
        size: {
          '3xs': { root: 'size-4 text-[9px]' },
          '2xs': { root: 'size-5 text-[10px]' },
          xs: { root: 'size-6 text-xs' },
          sm: { root: 'size-7 text-xs' },
          md: { root: 'size-8 text-sm' },
          lg: { root: 'size-10 text-base' },
        },
      },
    },
    skeleton: { base: 'rounded-sm bg-elevated motion-safe:animate-pulse' },
    table: {
      slots: {
        root: 'relative isolate min-w-0 w-full overflow-x-auto',
        base: 'w-full border-separate border-spacing-0 text-sm tabular-nums',
        caption: 'sr-only',
        thead: 'bg-muted',
        th: 'border-b border-default bg-muted px-3 py-2 text-start text-xs font-semibold whitespace-nowrap text-muted',
        td: 'border-b border-muted px-3 py-2.5 text-start whitespace-nowrap group-last:border-b-0',
        tr: 'group hover:bg-muted/60',
        separator: 'hidden',
        empty: 'p-8 text-center text-sm text-muted',
        loading: 'p-8 text-center text-sm text-muted',
      },
      variants: {
        pinned: {
          true: {
            th: 'sticky z-20 border-e border-default',
            td: 'sticky z-10 border-e border-default bg-default group-hover:bg-muted',
          },
        },
      },
    },
    contentToc: {
      slots: {
        root: 'min-w-0 rounded-md border border-default bg-default',
        container: 'flex min-h-0 flex-col',
        trigger: [
          'group flex w-full items-center gap-2 px-4 py-3.5 text-start font-semibold text-highlighted',
          focus,
        ],
        trailing: 'ms-auto inline-flex items-center',
        trailingIcon: 'size-4 group-data-[state=open]:rotate-180 lg:hidden',
        content:
          'min-h-0 overflow-y-auto border-t border-muted px-4 py-2 lg:max-h-[calc(100dvh-10rem)]',
        list: 'min-w-0',
        listWithChildren: 'ps-3',
        link: [
          'block py-1.5 text-sm leading-5 text-muted hover:text-primary',
          focus,
        ],
      },
      variants: { active: { true: { link: 'font-medium text-primary' } } },
    },
    contentSurround: {
      slots: {
        root: 'mt-8 grid gap-3 border-t border-default pt-5 sm:grid-cols-2',
        link: ['rounded border border-default p-4 hover:border-primary', focus],
        linkLeading: 'mb-1 text-primary',
        linkLeadingIcon: 'size-4',
        linkTitle: 'font-semibold',
        linkDescription: 'mt-1 text-sm text-muted',
      },
    },
    prose,
  },
})
