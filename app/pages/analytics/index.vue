<script setup lang="ts">
const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)
</script>

<template>
  <UContainer class="py-4">
    <AnalyticsStatsBar v-model:start-at="startAt" v-model:end-at="endAt" />
  </UContainer>
</template>
