<script setup lang="ts">
const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const { data: weeklyData, status } = useFetch('/api/insight/sessions-weekly', {
  key: 'insight-weekly',
  query: props,
})

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const hours = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, '0')}:00`,
)

const palette = useChartPalette()

const seriesData = computed(() => {
  const data = weeklyData.value
  if (!data) return []
  return data.flatMap((dayRow, dayIdx) =>
    dayRow.map((val, hourIdx) => [dayIdx, hourIdx, val]),
  )
})

const maxValue = computed(() => {
  const data = weeklyData.value
  if (!data) return 1
  return Math.max(...data.flat(), 1)
})

const chartOptions = computed<ECOption>(() => {
  const chartTheme = palette.value
  if (!chartTheme) return {}
  return {
    animationDuration: 450,
    tooltip: {
      trigger: 'item',
      renderMode: 'richText',
      backgroundColor: chartTheme.tooltipBg,
      borderColor: chartTheme.tooltipBorder,
      borderWidth: 1,
      textStyle: { color: chartTheme.tooltipText },
      formatter(params: any) {
        const [dayIdx, hourIdx, value] = params.data as [number, number, number]
        return `${days[dayIdx]} ${hours[hourIdx]}\n${value.toLocaleString()} 次会话`
      },
    },
    grid: {
      left: '1%',
      right: '1%',
      top: '4%',
      bottom: '4%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: days,
      position: 'top',
      axisLine: { lineStyle: { color: chartTheme.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.axisText },
    },
    yAxis: {
      type: 'category',
      data: hours,
      inverse: true,
      axisLine: { lineStyle: { color: chartTheme.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.axisText, fontSize: 11 },
    },
    visualMap: [
      {
        type: 'continuous',
        min: 0,
        max: maxValue.value,
        show: false,
        inRange: {
          color: chartTheme.range,
        },
      },
      transparentZeroVisualMap,
    ],
    series: [
      {
        type: 'heatmap',
        data: seriesData.value,
        label: { show: false },
        itemStyle: {
          borderColor: chartTheme.splitLine,
          borderWidth: 0.5,
        },
      },
    ],
  }
})
</script>
<template>
  <UCard as="section">
    <template #header><h2 class="font-semibold">每周会话分布</h2></template>
    <p v-if="status === 'error'" role="status" class="text-muted text-sm">
      暂时无法读取会话分布。
    </p>
    <p
      v-else-if="status === 'success' && !seriesData.length"
      class="text-muted text-sm"
    >
      所选时段暂无会话
    </p>
    <div v-else class="relative h-[28rem]">
      <VChart
        v-if="palette"
        :option="chartOptions"
        :autoresize="true"
        :loading="status === 'pending'"
        class="size-full"
      />
      <USkeleton v-else class="size-full" />
    </div>
  </UCard>
</template>
