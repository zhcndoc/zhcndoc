import { focus } from './controls'

export const docs = {
  contentNavigation: {
    slots: {
      list: 'space-y-3',
      listWithChildren: 'ms-4 space-y-0.5 border-s border-muted ps-2',
      content: 'mt-1',
      link: [
        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-start text-sm/5 font-medium text-muted hover:bg-muted hover:text-highlighted',
        focus,
      ],
      trigger: 'group cursor-pointer',
      linkLeadingIcon: 'size-4 shrink-0',
      linkTrailing: 'ms-auto flex shrink-0 items-center',
      linkTrailingIcon:
        'size-3.5 text-muted transition-transform group-data-[state=open]:rotate-90',
    },
    variants: {
      level: { true: { link: 'font-normal' } },
      active: {
        true: {
          link: 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
        },
      },
    },
    compoundVariants: [
      { level: true, active: true, class: { link: 'font-semibold' } },
    ],
  },
  contentSearchButton: {
    slots: {
      base: 'border-default bg-muted text-muted w-full justify-start rounded-md text-sm',
      trailing: 'ms-auto hidden items-center gap-0.5 sm:flex',
    },
  },
  kbd: {
    base: 'border-muted bg-default text-muted inline-flex min-w-5 justify-center rounded border px-1 font-mono text-xs uppercase',
  },
  contentSearch: {
    slots: {
      modal: 'top-[min(15dvh,8rem)] max-w-2xl -translate-x-1/2 translate-y-0',
    },
  },
  commandPalette: {
    slots: {
      root: 'flex min-h-0 flex-col',
      input: 'border-default w-full shrink-0 border-b p-2',
      content: 'min-h-0 overflow-y-auto',
      viewport: 'p-2',
      group: 'space-y-0.5',
      label: 'text-muted px-2 pt-2 pb-1 text-xs font-medium',
      item: 'data-highlighted:bg-elevated flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm outline-none',
      itemLeadingIcon: 'text-muted size-4 shrink-0',
      itemWrapper: 'flex min-w-0 grow items-center gap-2',
      itemLabel:
        'flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 [&_mark]:rounded-xs [&_mark]:bg-primary/15 [&_mark]:text-primary',
      itemLabelBase: 'text-highlighted order-first basis-full font-medium',
      itemLabelPrefix: 'text-muted max-w-28 truncate text-xs sm:max-w-48',
      itemLabelSuffix: 'text-muted min-w-0 flex-1 truncate text-xs',
      empty: 'text-muted px-4 py-8 text-center text-sm',
    },
  },
}
