export const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

const icon = 'size-4 shrink-0'
const control =
  'border border-default bg-default text-highlighted rounded px-3 py-2 text-sm'
const menuItem =
  'relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-start text-sm text-default outline-none data-highlighted:bg-elevated data-disabled:pointer-events-none data-disabled:opacity-45'
const menu = {
  viewport: 'min-h-0 overflow-y-auto p-1',
  group: 'flex flex-col',
  separator: 'my-1 h-px bg-border',
  item: menuItem,
  itemLeadingIcon: icon,
  itemTrailing: 'ms-auto inline-flex shrink-0 items-center',
  itemTrailingIcon: 'size-4 text-primary',
  itemWrapper: 'flex min-w-0 flex-1 flex-col',
  itemLabel: 'truncate',
  empty: 'p-3 text-center text-sm text-muted',
}
const menuSurface =
  'z-60 flex min-w-32 flex-col overflow-hidden rounded border border-default bg-default shadow-lg'

export const controls = {
  button: {
    slots: {
      base: [
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-45',
        focus,
      ],
      label: 'min-w-0 truncate',
      leadingIcon: icon,
      trailingIcon: icon,
    },
    variants: {
      size: {
        xs: { base: 'min-h-6 px-1.5 text-xs' },
        sm: { base: 'min-h-8 px-2.5 text-xs' },
        md: { base: 'min-h-9 px-3 text-sm' },
        lg: { base: 'min-h-10 px-4 text-sm' },
        xl: { base: 'min-h-11 px-5 text-base' },
      },
      variant: {
        solid:
          'bg-primary text-white hover:bg-brand-800 dark:text-neutral-950 dark:hover:bg-brand-300',
        outline:
          'border border-default bg-default text-default hover:border-accented hover:bg-elevated',
        ghost: 'text-muted hover:bg-elevated hover:text-highlighted',
        soft: 'bg-brand-50 text-primary hover:bg-brand-100 dark:bg-brand-950 dark:hover:bg-brand-900',
        subtle: 'bg-elevated text-default hover:text-primary',
        link: 'text-primary hover:underline underline-offset-4',
      },
      square: { true: 'aspect-square px-0' },
      block: { true: 'w-full' },
      loading: { true: { leadingIcon: 'animate-spin' } },
    },
  },
  link: { base: ['rounded-xs hover:text-primary', focus] },
  input: {
    slots: {
      root: 'relative inline-flex min-w-0',
      base: [
        control,
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
        'w-full min-w-0 placeholder:text-muted',
      ],
      leading:
        'pointer-events-none absolute inset-y-0 start-3 flex items-center text-muted',
      trailing: 'absolute inset-y-0 end-2 flex items-center',
      leadingIcon: icon,
      trailingIcon: icon,
    },
    compoundVariants: [
      { leading: true, class: { base: 'ps-9' } },
      { trailing: true, class: { base: 'pe-10' } },
    ],
  },
  selectMenu: {
    slots: {
      ...menu,
      base: [
        control,
        focus,
        'inline-flex min-h-9 min-w-0 cursor-pointer items-center gap-2 text-start',
      ],
      value: 'flex-1 truncate',
      placeholder: 'flex-1 truncate text-muted',
      leading: 'inline-flex items-center',
      leadingIcon: icon,
      leadingAvatar: 'size-5',
      itemLeadingAvatar: 'size-5',
      trailing: 'ms-auto inline-flex shrink-0 items-center text-muted',
      trailingIcon: icon,
      content: [
        menuSurface,
        'max-h-[min(20rem,var(--reka-combobox-content-available-height))] w-(--reka-combobox-trigger-width)',
      ],
      focusScope: 'flex min-h-0 flex-col',
      input: 'm-1',
    },
  },
  dropdownMenu: {
    slots: {
      ...menu,
      content: [
        menuSurface,
        'max-h-[min(28rem,var(--reka-dropdown-menu-content-available-height))]',
      ],
      arrow: 'fill-default',
    },
  },
  tooltip: {
    slots: {
      content: 'z-70 rounded bg-inverted px-2 py-1 text-xs text-inverted',
      arrow: 'fill-inverted',
    },
  },
  modal: {
    slots: {
      overlay: 'fixed inset-0 z-50 bg-black/45',
      content:
        'fixed z-50 flex min-w-0 flex-col bg-default text-default outline-none',
      header:
        'flex items-center justify-between border-b border-default px-5 py-4',
      title: 'text-lg font-semibold text-highlighted',
      description: 'mt-1 text-sm text-muted',
      close: 'absolute end-3 top-3',
      body: 'min-h-0 flex-1 overflow-y-auto p-4 sm:p-5',
      footer: 'flex items-center gap-2 border-t border-default p-4',
    },
    variants: {
      fullscreen: {
        true: { content: 'inset-0' },
        false: {
          content:
            'top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-1/2 rounded-md border border-default shadow-xl',
        },
      },
    },
  },
  calendar: {
    slots: {
      root: 'w-full text-sm tabular-nums',
      header: 'flex items-center justify-between gap-2',
      heading: 'flex min-w-0 flex-1 justify-center',
      headingLabel: 'cursor-pointer rounded p-1 font-semibold',
      body: 'mt-3 grid gap-4 sm:grid-flow-col sm:auto-cols-fr',
      grid: 'w-full border-collapse text-center',
      gridRow: 'grid',
      gridWeekDaysRow: 'grid grid-cols-7',
      headCell: 'py-1 text-xs font-medium text-muted',
      cell: 'min-w-0 p-px',
      cellTrigger: [
        'mx-auto flex min-h-8 w-full cursor-pointer items-center justify-center rounded-sm hover:bg-elevated data-disabled:pointer-events-none data-disabled:opacity-40 data-outside-view:text-dimmed data-today:font-bold data-highlighted:bg-primary/10 data-selected:bg-primary/15 data-[selection-start]:bg-primary data-[selection-start]:text-inverted data-[selection-end]:bg-primary data-[selection-end]:text-inverted',
        focus,
      ],
    },
    variants: {
      view: {
        day: { gridRow: 'grid-cols-7' },
        month: { gridRow: 'grid-cols-4' },
        year: { gridRow: 'grid-cols-4' },
      },
    },
  },
  tabs: {
    slots: {
      list: 'flex max-w-full flex-wrap items-center gap-1',
      trigger: [
        'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-sm px-2.5 text-sm text-muted hover:bg-elevated data-[state=active]:bg-brand-50 data-[state=active]:font-semibold data-[state=active]:text-primary dark:data-[state=active]:bg-brand-950',
        focus,
      ],
      indicator: 'hidden',
      content: 'mt-3',
    },
  },
  pagination: {
    slots: {
      list: 'flex flex-wrap items-center justify-center gap-1',
      label: 'min-w-4 text-center tabular-nums',
    },
  },
}
