<script setup lang="ts">
const props = defineProps<{
  startAt: number
  endAt: number
}>()

const { data: pageviews, status } = await useFetch<AnalyticsPageviews>(
  '/api/analytics/pageviews',
  {
    query: props,
  },
)

const chartOptions = computed<ECOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['浏览量', '访客'],
      bottom: 0,
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: pageviews.value?.pageviews.map((item) => item.x),
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          opacity: 0.2,
        },
      },
    },
    series: [
      {
        name: '浏览量',
        type: 'bar',
        barWidth: '50%',
        barGap: '-100%',
        data: pageviews.value?.pageviews.map((item) => item.y),
      },
      {
        name: '访客',
        type: 'bar',
        barWidth: '50%',
        data: pageviews.value?.sessions.map((item) => item.y),
      },
    ],
  }
})
</script>

<template>
  <div class="h-96 w-full">
    <VChart
      :option="chartOptions"
      :autoresize="true"
      :loading="status === 'pending'"
    />
  </div>
</template>
