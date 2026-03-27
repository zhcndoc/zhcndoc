<script setup lang="ts">
import AnalyticsHeader from '~/components/analytics/AnalyticsHeader.vue';

const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)

const hostname = ref('www.zhcndoc.com')

const pagesTabs = [
  { label: '路径', type: 'path' },
  { label: '入口', type: 'entry' },
  { label: '出口', type: 'exit' },
]

const sourcesTabs = [
  { label: '引荐来源', type: 'referrer' },
  { label: '渠道', type: 'channel' },
]

const devicesTabs = [
  { label: '浏览器', type: 'browser' },
  { label: '操作系统', type: 'os' },
  { label: '设备', type: 'device' },
]
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AnalyticsMetricsPanel
        title="页面"
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="pagesTabs"
      />
      <AnalyticsMetricsPanel
        title="来源"
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="sourcesTabs"
      />
      <AnalyticsMetricsPanel
        title="设备"
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="devicesTabs"
      />
    </div>
  </UContainer>
</template>
