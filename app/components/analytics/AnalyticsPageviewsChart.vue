<script setup lang="ts">
const { data: pageviews } = await useFetch<AnalyticsPageviews>(
  '/api/analytics/pageviews',
)

const chartOptions = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['Pageviews', 'Sessions'],
    bottom: 0,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: pageviews.value?.pageviews.map((item) => item.x.slice(11, 16)),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Pageviews',
      type: 'bar',
      barWidth: '50%',
      barGap: '-100%',
      data: pageviews.value?.pageviews.map((item) => item.y),
      itemStyle: {
        color: 'rgba(84, 112, 198, 0.6)',
      },
    },
    {
      name: 'Sessions',
      type: 'bar',
      barWidth: '50%',
      data: pageviews.value?.sessions.map((item) => item.y),
      itemStyle: {
        color: 'rgba(145, 204, 117, 0.6)',
      },
    },
  ],
}
</script>

<template>
  <div class="h-96 w-full">
    <VChart :autoresize="true" :option="chartOptions" />
  </div>
</template>
