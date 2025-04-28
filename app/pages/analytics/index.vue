<script setup lang="ts">
const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)

const host = ref('www.zhcndoc.com')
</script>

<template>
  <UContainer class="flex flex-col gap-8">
    <AnalyticsHeader
      v-model:host="host"
      v-model:start-at="startAt"
      v-model:end-at="endAt"
    />
    <AnalyticsStatsBar :host="host" :start-at="startAt" :end-at="endAt" />
    <AnalyticsPageviewsChart :host="host" :start-at="startAt" :end-at="endAt" />
  </UContainer>
</template>
