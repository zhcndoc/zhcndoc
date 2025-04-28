<script setup lang="ts">
const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)
</script>

<template>
  <UContainer class="flex flex-col gap-8">
    <AnalyticsHeader v-model:start-at="startAt" v-model:end-at="endAt" />
    <AnalyticsStatsBar :start-at="startAt" :end-at="endAt" />
    <AnalyticsPageviewsChart :start-at="startAt" :end-at="endAt" />
  </UContainer>
</template>
