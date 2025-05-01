<script setup lang="ts">
const props = defineProps<{
  host: string
  startAt: number
  endAt: number
}>()

const { data, status } = await useFetch('/api/analytics/stats', {
  key: 'analytics-stats',
  query: props,
})

const metrics = computed(() => {
  if (data.value) {
    return [
      {
        ...data.value?.pageviews,
        label: '浏览量',
        change: data.value?.pageviews.value - data.value?.pageviews.prev,
        formatValue: formatLongNumber,
      },
      {
        ...data.value?.visits,
        label: '访问次数',
        change: data.value?.visits.value - data.value?.visits.prev,
        formatValue: formatLongNumber,
      },
      {
        ...data.value?.visitors,
        label: '访客',
        change: data.value?.visitors.value - data.value?.visitors.prev,
        formatValue: formatLongNumber,
      },
      {
        label: '跳出率',
        value:
          (Math.min(data.value?.visits.value, data.value?.bounces.value) /
            data.value?.visits.value) *
            100 || 0,
        prev:
          (Math.min(data.value?.visits.prev, data.value?.bounces.prev) /
            data.value?.visits.prev) *
            100 || 0,
        change:
          (Math.min(data.value?.visits.value, data.value?.bounces.value) /
            data.value?.visits.value) *
            100 -
          (Math.min(data.value?.visits.prev, data.value?.bounces.prev) /
            data.value?.visits.prev) *
            100,
        formatValue: (value: number) => Math.round(+value) + '%',
        reverseColors: true,
      },
      {
        label: '平均时间',
        value: data.value?.totaltime.value / data.value?.visits.value || 0,
        prev: data.value?.totaltime.prev / data.value?.visits.prev || 0,
        change:
          data.value?.totaltime.value / data.value?.visits.value -
            data.value?.totaltime.prev / data.value?.visits.prev || 0,
        formatValue: formatSeconds,
      },
    ]
  } else {
    return []
  }
})
</script>

<template>
  <div class="grid grid-cols-[3fr_1fr] gap-4">
    <div class="relative grid w-full grid-cols-5 gap-2">
      <template v-for="item in metrics" :key="item.label">
        <AnalyticsMetricCard
          :loading="status === 'pending'"
          :value="item.value"
          :change="item.change"
          :label="item.label"
          :reverse-colors="item.reverseColors"
          :format-value="item.formatValue"
        />
      </template>
    </div>
  </div>
</template>
