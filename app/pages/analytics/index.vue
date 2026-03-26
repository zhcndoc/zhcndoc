<script setup lang="ts">
import AnalyticsHeader from '~/components/analytics/AnalyticsHeader.vue';

const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)

const hostname = ref('www.zhcndoc.com')
</script>

<template>
  <UContainer class="flex flex-col gap-8">
    <AnalyticsHeader
      v-model:start-at="startAt"
      v-model:end-at="endAt"
      v-model:hostname="hostname"
    />
    <AnalyticsStatsBar
      :start-at="startAt"
      :end-at="endAt"
      :hostname="hostname"
    />
    <AnalyticsPageviewsChart
      :start-at="startAt"
      :end-at="endAt"
      :hostname="hostname"
    />
  </UContainer>
</template>
