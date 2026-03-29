<script setup lang="ts">
const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const { data: weeklyData, status } = useFetch('/api/analytics/sessions-weekly', {
  key: 'analytics-weekly',
  query: props,
})

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)

const chartTheme = {
  axisText: '#64748B',
  axisLine: 'rgba(148, 163, 184, 0.4)',
  splitArea: ['rgba(148, 163, 184, 0.04)', 'rgba(148, 163, 184, 0.09)'],
  tooltipBg: 'rgba(15, 23, 42, 0.92)',
  tooltipBorder: 'rgba(148, 163, 184, 0.3)',
  tooltipText: '#F8FAFC',
}

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

const chartOptions = computed<ECOption>(() => ({
  animationDuration: 450,
  tooltip: {
    trigger: 'item',
    backgroundColor: chartTheme.tooltipBg,
    borderColor: chartTheme.tooltipBorder,
    borderWidth: 1,
    textStyle: { color: chartTheme.tooltipText },
    formatter(params: any) {
      const [dayIdx, hourIdx, value] = params.data as [number, number, number]
      return `${days[dayIdx]} ${hours[hourIdx]}<br/><span style="font-size: 14px; font-weight: 700;">${value.toLocaleString()}</span> 次会话`
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
    axisLine: { lineStyle: { color: chartTheme.axisLine } },
    axisTick: { show: false },
    axisLabel: { color: chartTheme.axisText },
    splitArea: { show: true, areaStyle: { color: chartTheme.splitArea } },
  },
  yAxis: {
    type: 'category',
    data: hours,
    inverse: true,
    axisLine: { lineStyle: { color: chartTheme.axisLine } },
    axisTick: { show: false },
    axisLabel: { color: chartTheme.axisText, fontSize: 11 },
    splitArea: { show: true, areaStyle: { color: chartTheme.splitArea } },
  },
  visualMap: {
    min: 0,
    max: maxValue.value,
    show: false,
    inRange: {
      color: [
        'rgba(8,145,178,0.06)',
        'rgba(8,145,178,0.3)',
        'rgba(8,145,178,0.6)',
        '#0891b2',
      ],
    },
  },
  series: [
    {
      type: 'heatmap',
      data: seriesData.value,
      label: { show: false },
      emphasis: {
        label: { show: false },
        itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.4)' },
      },
    },
  ],
}))

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <UCard :ui="{ body: 'p-4 sm:p-4' }">
    <div class="relative" style="height: 660px">
      <VChart
        :option="chartOptions"
        :autoresize="true"
        :loading="status === 'pending'"
        class="h-full w-full"
      />
      <USkeleton v-if="!isMounted" class="absolute top-0 h-full w-full" />
    </div>
  </UCard>
</template>
