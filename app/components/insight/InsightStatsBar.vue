<script setup lang="ts">
const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const { data, status } = await useFetch('/api/insight/stats', {
  key: 'insight-stats',
  query: props,
})

const metrics = computed(() => {
  if (data.value) {
    const prev = data.value.comparison

    const pageviews = data.value.pageviews || 0
    const visits = data.value.visits || 0
    const visitors = data.value.visitors || 0
    const bounces = data.value.bounces || 0
    const totaltime = data.value.totaltime || 0

    const prevPageviews = prev?.pageviews || 0
    const prevVisits = prev?.visits || 0
    const prevVisitors = prev?.visitors || 0
    const prevBounces = prev?.bounces || 0
    const prevTotaltime = prev?.totaltime || 0

    const bounceRate = visits ? (Math.min(visits, bounces) / visits) * 100 : 0
    const prevBounceRate = prevVisits
      ? (Math.min(prevVisits, prevBounces) / prevVisits) * 100
      : 0

    const avgTime = visits ? totaltime / visits : 0
    const prevAvgTime = prevVisits ? prevTotaltime / prevVisits : 0

    return [
      {
        value: pageviews,
        label: '浏览量',
        change: pageviews - prevPageviews,
        formatValue: formatLongNumber,
      },
      {
        value: visits,
        label: '访问次数',
        change: visits - prevVisits,
        formatValue: formatLongNumber,
      },
      {
        value: visitors,
        label: '访客',
        change: visitors - prevVisitors,
        formatValue: formatLongNumber,
      },
      {
        label: '跳出率',
        value: bounceRate,
        change: bounceRate - prevBounceRate,
        formatValue: (value: number) => Math.round(+value) + '%',
        reverseColors: true,
      },
      {
        label: '平均时间',
        value: avgTime,
        change: avgTime - prevAvgTime,
        formatValue: formatSeconds,
      },
    ]
  } else {
    return []
  }
})
</script>
<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <p v-if="status === 'error'" role="status" class="text-muted p-4 text-sm">
      暂时无法读取访问指标。
    </p>
    <div
      v-else-if="metrics.length"
      class="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-(--ui-border-muted) sm:grid-cols-3 lg:grid-cols-5"
    >
      <InsightMetricCard
        v-for="item in metrics"
        :key="item.label"
        v-bind="item"
        :loading="status === 'pending'"
      />
    </div>
    <USkeleton v-else-if="status === 'pending'" class="h-24" />
    <p v-else class="text-muted p-4 text-sm">暂无访问指标</p>
  </UCard>
</template>
