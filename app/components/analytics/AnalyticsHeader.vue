<script setup lang="ts">
import { DateTime } from 'luxon'
import type { SelectMenuItem } from '@nuxt/ui'

const projects = await $fetch('/api/projects')

const sortedProjects =
  projects?.sort((a, b) => (a.stars > b.stars ? -1 : 1)) || []

const siteItems = computed(() => {
  const items = sortedProjects.map((project) => ({
    value: `${project.name}.zhcndoc.com`,
    label: project.title,
    avatar: {
      src: `/images/projects/${project.name}.svg`,
      alt: project.title,
    },
  }))

  items.unshift({
    value: 'www.zhcndoc.com',
    label: '所有站点',
    avatar: {
      src: `/images/projects/www.svg`,
      alt: '简中文档',
    },
  })

  return items
})

const selectedSite = defineModel<string>('host')

const selectedIcon = computed(() => {
  const prefix = selectedSite.value?.replace(/.zhcndoc.com/, '')
  return `/images/projects/${prefix}.svg`
})

const timeRangeItems: SelectMenuItem[][] = [
  [
    {
      value: 'today',
      label: '今天',
      onSelect() {
        startAt.value = DateTime.now().startOf('day').toMillis()
        endAt.value = DateTime.now().endOf('day').toMillis()
      },
    },
    {
      value: 'last24hours',
      label: '最近 24 小时',
      onSelect() {
        startAt.value = DateTime.now()
          .startOf('hour')
          .minus({ hours: 23 })
          .toMillis()
        endAt.value = DateTime.now().endOf('hour').toMillis()
      },
    },
  ],
  [
    {
      value: 'thisweek',
      label: '本周',
      onSelect() {
        startAt.value = DateTime.now().startOf('week').toMillis()
        endAt.value = DateTime.now().endOf('week').toMillis()
      },
    },
    {
      value: 'last7days',
      label: '最近 7 天',
      onSelect() {
        startAt.value = DateTime.now()
          .startOf('day')
          .minus({ days: 6 })
          .toMillis()
        endAt.value = DateTime.now().endOf('day').toMillis()
      },
    },
  ],
  [
    {
      value: 'thismonth',
      label: '本月',
      onSelect() {
        startAt.value = DateTime.now().startOf('month').toMillis()
        endAt.value = DateTime.now().endOf('month').toMillis()
      },
    },
    {
      value: 'last30days',
      label: '最近 30 天',
      onSelect() {
        startAt.value = DateTime.now()
          .startOf('day')
          .minus({ days: 29 })
          .toMillis()
        endAt.value = DateTime.now().endOf('day').toMillis()
      },
    },
  ],
  [
    {
      value: 'thisyear',
      label: '今年',
      onSelect() {
        startAt.value = DateTime.now().startOf('year').toMillis()
        endAt.value = DateTime.now().endOf('year').toMillis()
      },
    },
    {
      value: 'last12months',
      label: '最近 12 个月',
      onSelect() {
        startAt.value = DateTime.now()
          .startOf('month')
          .minus({ months: 11 })
          .toMillis()
        endAt.value = DateTime.now().endOf('month').toMillis()
      },
    },
  ],
  [
    {
      value: 'all',
      label: '所有时间',
    },
    {
      value: 'custom',
      label: '自定义',
    },
  ],
]

const startAt = defineModel<number>('startAt')
const endAt = defineModel<number>('endAt')

const selectedTimeRange = ref('last24hours')
</script>

<template>
  <div class="flex items-center justify-between gap-4 pt-8">
    <USelectMenu
      v-model="selectedSite"
      :items="siteItems"
      :avatar="{
        src: selectedIcon,
      }"
      :ui="{
        itemLeadingAvatar: 'rounded-md',
      }"
      value-key="value"
      size="xl"
      placeholder="选择站点"
      class="w-64"
    >
    </USelectMenu>
    <USelectMenu
      v-model="selectedTimeRange"
      :ui="{
        content: 'max-h-full',
      }"
      :search-input="false"
      :items="timeRangeItems"
      value-key="value"
      size="xl"
      class="w-48"
    >
    </USelectMenu>
  </div>
</template>
