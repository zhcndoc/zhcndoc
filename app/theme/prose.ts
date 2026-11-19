import { focus } from './controls'

const heading = {
  link: ['group inline-flex items-baseline gap-1', focus],
  leading: 'sr-only',
}
const articleHeading = 'scroll-mt-20 font-bold tracking-tight text-highlighted'

export const prose = {
  h1: { slots: { ...heading, base: ['mt-8 mb-4 text-3xl', articleHeading] } },
  h2: {
    slots: {
      ...heading,
      base: ['mt-9 mb-3 text-2xl first:mt-0', articleHeading],
    },
  },
  h3: { slots: { ...heading, base: ['mt-6 mb-2 text-xl', articleHeading] } },
  h4: { slots: { ...heading, base: ['mt-5 mb-2 text-lg', articleHeading] } },
  p: { base: 'my-4 leading-7 first:mt-0 last:mb-0' },
  strong: { base: 'font-semibold text-highlighted' },
  a: {
    base: [
      'text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-current',
      focus,
    ],
  },
  ul: { base: 'my-4 list-disc space-y-1.5 ps-6 marker:text-muted' },
  ol: { base: 'my-4 list-decimal space-y-1.5 ps-6' },
  li: { base: 'leading-7 [&>p]:my-1' },
  hr: { base: 'my-8 border-default' },
  blockquote: {
    base: 'my-5 border-s-3 border-brand-400 bg-muted px-4 py-3 text-muted',
  },
  code: { base: 'rounded-sm bg-elevated px-1.5 py-0.5 font-mono text-[0.9em]' },
  pre: {
    slots: {
      root: 'group relative my-5 min-w-0',
      header:
        'flex items-center gap-2 rounded-t border border-default bg-elevated px-4 py-2 text-sm',
      icon: 'size-4',
      copy: 'absolute end-2 top-2',
      base: [
        'overflow-x-auto rounded border border-default bg-muted px-4 py-3 pe-12 font-mono text-sm/6 whitespace-pre [&_code]:bg-transparent [&_code]:p-0 [&_.line]:block',
        focus,
      ],
    },
  },
  table: {
    slots: {
      root: [
        'my-5 max-w-full overflow-x-auto rounded border border-default',
        focus,
      ],
      base: 'w-max min-w-full border-collapse text-sm',
    },
  },
  thead: { base: 'bg-muted text-highlighted' },
  th: {
    base: 'border-b border-default px-3 py-2 text-start font-semibold whitespace-nowrap',
  },
  td: { base: 'max-w-prose border-b border-muted px-3 py-2 align-top' },
  img: {
    slots: {
      base: 'max-w-full rounded object-contain',
      overlay: 'fixed inset-0 z-50 bg-black/70',
      content: 'fixed inset-0 z-50 flex items-center justify-center',
      zoomedImage: 'max-h-[95dvh] max-w-[95vw] object-contain',
    },
  },
  callout: {
    slots: {
      base: 'relative my-5 rounded border-s-3 border-primary bg-primary/5 px-4 py-3 text-sm/6 [&>p]:inline [&>p]:leading-6',
      icon: 'me-2 inline-block size-4 align-text-bottom text-primary',
      externalIcon: 'absolute end-2 top-2 size-3',
    },
    variants: {
      color: {
        neutral: 'border-accented bg-muted',
        success: 'border-success bg-success/5',
        warning: 'border-warning bg-warning/5',
        error: 'border-error bg-error/5',
        info: 'border-info bg-info/5',
      },
    },
  },
}
