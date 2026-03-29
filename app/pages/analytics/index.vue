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

const locationTabs = [
  { label: '省份', type: 'region' },
  { label: '国家 / 地区', type: 'country' },
  { label: '城市', type: 'city' },
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-18 gap-4">
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="pagesTabs"
        class="lg:col-span-6"
      />
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="sourcesTabs"
        class="lg:col-span-6"
      />
      <AnalyticsMetricsPanel
        :start-at="startAt"
        :end-at="endAt"
        :hostname="hostname"
        :tabs="devicesTabs"
        class="lg:col-span-6"
      />
      <!-- Card 4 -->
      <div class="sm:order-5 sm:col-span-2 lg:order-0 lg:col-span-11">
        <AnalyticsGeoMap
          :start-at="startAt"
          :end-at="endAt"
          :hostname="hostname"
        />
      </div>
      <!-- Card 5 -->
      <div class="sm:order-4 lg:order-0 lg:col-span-7">
        <AnalyticsMetricsPanel
          :start-at="startAt"
          :end-at="endAt"
          :hostname="hostname"
          :tabs="locationTabs"
        />
      </div>
      <!-- Card 6 -->
      <div class="sm:order-6 sm:col-span-2 lg:order-0 lg:col-span-7">
        <UCard class="h-full">
          <div class="flex items-center justify-center h-full text-muted">占位</div>
        </UCard>
      </div>
      <!-- Card 7 -->
      <div class="sm:order-7 sm:col-span-2 lg:order-0 lg:col-span-11">
        <UCard class="h-full">
          <div class="flex items-center justify-center h-full text-muted">占位</div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
