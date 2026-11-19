import type { VisualMapComponentOption } from 'echarts/components'

export const transparentZeroVisualMap = {
  type: 'piecewise',
  show: false,
  pieces: [{ value: 0 }],
  inRange: { colorAlpha: 0 },
  // The continuous scale supplies the colors for all other values.
  outOfRange: {},
} satisfies VisualMapComponentOption

function readChartPalette() {
  const css = getComputedStyle(document.documentElement)
  const color = (key: string) => css.getPropertyValue(key).trim()
  return {
    pageviews: color('--ui-primary'),
    sessions: color('--chart-secondary'),
    axisText: color('--ui-text-muted'),
    axisLine: color('--ui-border'),
    splitLine: color('--ui-border-muted'),
    tooltipBg: color('--ui-bg'),
    tooltipBorder: color('--ui-border'),
    tooltipText: color('--ui-text-muted'),
    range: [
      '--chart-range-low',
      '--chart-range-mid',
      '--chart-range-high',
      '--ui-primary',
    ].map(color),
  }
}

export function useChartPalette() {
  const mode = useColorMode()
  const palette = shallowRef<ReturnType<typeof readChartPalette>>()
  function update() {
    palette.value = readChartPalette()
  }
  onMounted(update)
  if (import.meta.client) watch(() => mode.value, update, { flush: 'post' })
  return palette
}
