<script setup lang="ts">
useSeoMeta({
  title: '站点统计',
  description: '简中文档站点统计面板，仅供站内浏览。',
})

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

const locationTabs = [
  { label: '省份', type: 'region' },
  { label: '国家 / 地区', type: 'country' },
  { label: '城市', type: 'city' },
]
const filters = computed(() => ({
  startAt: startAt.value,
  endAt: endAt.value,
  hostname: hostname.value,
}))
const breakdowns = [
  { title: '访问页面', tabs: pagesTabs },
  { title: '流量来源', tabs: sourcesTabs },
  { title: '终端设备', tabs: devicesTabs },
]
</script>
<template>
  <UContainer class="space-y-4 py-5">
    <InsightHeader
      v-model:start-at="startAt"
      v-model:end-at="endAt"
      v-model:hostname="hostname"
    />
    <InsightStatsBar v-bind="filters" />
    <InsightPageviewsChart v-bind="filters" />
    <div class="grid gap-4 lg:grid-cols-3">
      <InsightMetricsPanel
        v-for="panel in breakdowns"
        :key="panel.title"
        v-bind="filters"
        :tabs="panel.tabs"
        :title="panel.title"
      />
      <InsightGeoMap v-bind="filters" class="lg:col-span-2" />
      <InsightMetricsPanel
        v-bind="filters"
        :tabs="locationTabs"
        title="地理位置"
      />
      <InsightSessionsWeekly v-bind="filters" />
      <InsightSessions v-bind="filters" class="lg:col-span-2" />
    </div>
  </UContainer>
</template>
