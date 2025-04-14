<script setup lang="ts">
const timeRange = ref(getTimeRange())
</script>

<template>
  <UContainer class="py-4">
    <AnalyticsStatsBar :time-range="timeRange"></AnalyticsStatsBar>
  </UContainer>
</template>
