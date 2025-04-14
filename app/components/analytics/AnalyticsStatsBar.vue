<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const startAt = defineModel<number>('startAt')
const endAt = defineModel<number>('endAt')

const { data } = await useFetch('/api/analytics/stats', {
  query: {
    startAt: startAt,
    endAt: endAt,
  },
})

const metrics = computed(() => {
  return [
    {
      ...data.value.pageviews,
      label: '浏览量',
      change: data.value.pageviews.value - data.value.pageviews.prev,
      formatValue: formatLongNumber,
    },
    {
      ...data.value.visitors,
      label: '访问次数',
      change: data.value.visitors.value - data.value.visitors.prev,
      formatValue: formatLongNumber,
    },
    {
      ...data.value.visits,
      label: '访客',
      change: data.value.visits.value - data.value.visits.prev,
      formatValue: formatLongNumber,
    },
    {
      ...data.value.bounces,
      label: '跳出率',
      change: data.value.bounces.value - data.value.bounces.prev,
      formatValue: (value: number) => {
        const { visits } = data.value
        const bounces = (Math.min(visits.value, value) / visits.value) * 100
        return Math.round(+bounces) + '%'
      },
    },
    {
      ...data.value.totaltime,
      label: '平均时间',
      change: data.value.totaltime.value - data.value.totaltime.prev,
      formatValue: (value: number) => {
        const { visits } = data.value
        return formatSeconds(value / visits.value)
      },
    },
  ]
})

const items = ref<DropdownMenuItem[]>([
  {
    label: '过去 7 天',
    value: 'last-7-days',
    onSelect: () => {
      startAt.value = Date.now() - 7 * 24 * 60 * 60 * 1000
      endAt.value = Date.now()
    },
  },
  {
    label: '过去 30 天',
    value: 'last-30-days',
    onSelect: () => {
      startAt.value = Date.now() - 30 * 24 * 60 * 60 * 1000
      endAt.value = Date.now()
    },
  },
  {
    label: '过去 90 天',
    value: 'last-90-days',
    onSelect: () => {
      startAt.value = Date.now() - 90 * 24 * 60 * 60 * 1000
      endAt.value = Date.now()
    },
  },
])
</script>

<template>
  <div class="grid grid-cols-[3fr_1fr] gap-4">
    <div class="grid w-full grid-cols-5 gap-5">
      <template v-for="item in metrics" :key="item.prop">
        <AnalyticsMetricCard
          :value="item.value"
          :change="item.change"
          :label="item.label"
          :format-value="item.formatValue"
        />
      </template>
    </div>
    <div>
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-48',
        }"
      >
        <UButton
          label="Open"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
