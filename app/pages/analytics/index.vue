<script setup lang="ts">
import AnalyticsHeader from '~/components/analytics/AnalyticsHeader.vue'

const timeRange = reactive(getTimeRange())
const { startAt, endAt } = toRefs(timeRange)

const hostname = ref('www.zhcndoc.com')

const pagesTabs = [
  { label: '标题', type: 'title' },
  { label: '路径', type: 'path' },
  { label: '入口', type: 'entry' },
  { label: '出口', type: 'exit' },
  { label: '查询', type: 'query' },
]

const sourcesTabs = [
  { label: '来源', type: 'referrer' },
  { label: '平台', type: 'domain' },
  { label: '语言', type: 'language' },
  { label: '渠道', type: 'channel' },
]

const devicesTabs = [
  { label: '浏览器', type: 'browser' },
  { label: '操作系统', type: 'os' },
  { label: '设备', type: 'device' },
  { label: '分辨率', type: 'screen' },
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
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="pagesTabs"
      />
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="sourcesTabs"
      />
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="devicesTabs"
      />
    </div>
  </UContainer>
</template>
