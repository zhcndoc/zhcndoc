<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'

const projects = await $fetch('/api/projects')

const sortedProjects =
  projects?.sort((a, b) => (a.stars > b.stars ? -1 : 1)) || []

const siteItems = computed(() => {
  const items = sortedProjects.map((project) => ({
    value: project.name,
    label: project.title,
    avatar: {
      src: `/images/projects/${project.name}.png`,
      alt: project.title,
    },
  }))

  items.unshift({
    value: 'www',
    label: '所有站点',
    avatar: {
      src: 'https://avatar.ikxin.com/favicon/www.zhcndoc.com',
      alt: '简中文档',
    },
  })

  return items
})

const selectedSite = ref('www')

const selectedIcon = computed(() =>
  selectedSite.value === 'www'
    ? 'https://avatar.ikxin.com/favicon/www.zhcndoc.com'
    : `/images/projects/${selectedSite.value}.png`,
)

const timeRangeItems: SelectMenuItem[][] = [
  [
    {
      value: 'today',
      label: '今天',
      onSelect: () => {
        console.log(1)
      },
    },
    {
      value: 'last24hours',
      label: '最近 24 小时',
      onSelect: () => {
        console.log(2)
      },
    },
  ],
  [
    {
      value: 'thisweek',
      label: '本周',
    },
    {
      value: 'last7days',
      label: '最近 7 天',
    },
  ],
  [
    {
      value: 'thismonth',
      label: '本月',
    },
    {
      value: 'last30days',
      label: '最近 30 天',
    },
  ],
  [
    {
      value: 'thisyear',
      label: '今年',
    },
    {
      value: 'last12months',
      label: '最近 12 个月',
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

const selectedTimeRange = ref('last24hours')
</script>

<template>
  <div class="flex items-center justify-between gap-4 py-8">
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
      placeholder="选择站点"
      size="xl"
      class="w-64"
    >
    </USelectMenu>
    <USelectMenu
      v-model="selectedTimeRange"
      :items="timeRangeItems"
      :search-input="false"
      :ui="{
        itemLeadingAvatar: 'rounded-md',
        content: 'max-h-full',
      }"
      value-key="value"
      placeholder="选择时间范围"
      size="xl"
      class="w-48"
    ></USelectMenu>
  </div>
</template>
