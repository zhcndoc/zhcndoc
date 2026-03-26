<script setup lang="ts">
import { DateTime } from 'luxon'
import type { SelectMenuItem } from '@nuxt/ui'
import type { AnalyticsDateRange } from '#shared/types/analytics'

const TIMEZONE = 'Asia/Shanghai'
const LOCALE = 'zh-CN'

type TimeRangeValue =
  | '0day'
  | '24hour'
  | '0week'
  | '7day'
  | '0month'
  | '30day'
  | '90day'
  | '0year'
  | '6month'
  | '12month'
  | 'all'
  | 'custom'

const projects = await $fetch('/api/projects')
const { data: allTimeRange } = await useFetch<AnalyticsDateRange | null>(
  '/api/analytics/daterange',
  {
    key: 'analytics-daterange',
  },
)

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

const selectedSite = defineModel<string>('hostname')
const startAt = defineModel<number>('startAt')
const endAt = defineModel<number>('endAt')

const selectedIcon = computed(() => {
  const prefix = selectedSite.value?.replace(/\.zhcndoc\.com$/, '')
  return `/images/projects/${prefix}.svg`
})

const selectedTimeRange = ref<TimeRangeValue>('24hour')
const timeOffset = ref(0)
const isCustomRangeOpen = ref(false)
const customRange = ref<any>(null)

const TIME_RANGE_LABELS: Record<TimeRangeValue, string> = {
  '0day': '今天',
  '24hour': '最近 24 小时',
  '0week': '本周',
  '7day': '最近 7 天',
  '0month': '本月',
  '30day': '最近 30 天',
  '90day': '最近 90 天',
  '0year': '今年',
  '6month': '最近 6 个月',
  '12month': '最近 12 个月',
  all: '所有时间',
  custom: '自定义',
}

const formatLabelDate = (timestamp?: number) => {
  if (!timestamp) return ''
  return DateTime.fromMillis(timestamp)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)
    .toFormat('yyyy/MM/dd')
}

const formatLabelDateTime = (timestamp?: number) => {
  if (!timestamp) return ''
  return DateTime.fromMillis(timestamp)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)
    .toFormat('yyyy/MM/dd HH:mm')
}

const customRangeLabel = computed(() => {
  if (selectedTimeRange.value !== 'custom' || !startAt.value || !endAt.value) {
    return '自定义'
  }

  return `${formatLabelDate(startAt.value)} - ${formatLabelDate(endAt.value)}`
})

const offsetRangeLabel = computed(() => {
  if (!startAt.value || !endAt.value) return TIME_RANGE_LABELS[selectedTimeRange.value]

  if (selectedTimeRange.value === '24hour') {
    return `${formatLabelDateTime(startAt.value)} - ${formatLabelDateTime(endAt.value)}`
  }

  if (selectedTimeRange.value === '0day') {
    return formatLabelDate(startAt.value)
  }

  return `${formatLabelDate(startAt.value)} - ${formatLabelDate(endAt.value)}`
})

const selectedTimeRangeLabel = computed(() => {
  if (selectedTimeRange.value === 'custom') return customRangeLabel.value
  if (timeOffset.value !== 0) return offsetRangeLabel.value
  return TIME_RANGE_LABELS[selectedTimeRange.value]
})

const timeRangeItems: SelectMenuItem[][] = [
  [
    {
      value: '0day',
      label: TIME_RANGE_LABELS['0day'],
    },
    {
      value: '24hour',
      label: TIME_RANGE_LABELS['24hour'],
    },
  ],
  [
    {
      value: '0week',
      label: TIME_RANGE_LABELS['0week'],
    },
    {
      value: '7day',
      label: TIME_RANGE_LABELS['7day'],
    },
  ],
  [
    {
      value: '0month',
      label: TIME_RANGE_LABELS['0month'],
    },
    {
      value: '30day',
      label: TIME_RANGE_LABELS['30day'],
    },
    {
      value: '90day',
      label: TIME_RANGE_LABELS['90day'],
    },
  ],
  [
    {
      value: '0year',
      label: TIME_RANGE_LABELS['0year'],
    },
    {
      value: '6month',
      label: TIME_RANGE_LABELS['6month'],
    },
    {
      value: '12month',
      label: TIME_RANGE_LABELS['12month'],
    },
  ],
  [
    {
      value: 'all',
      label: TIME_RANGE_LABELS.all,
    },
  ],
  [
    {
      value: 'custom',
      label: TIME_RANGE_LABELS.custom,
    },
  ],
]

const getPresetRange = (
  value: TimeRangeValue,
  offset = 0,
): AnalyticsDateRange | null => {
  const now = DateTime.now().setZone(TIMEZONE).setLocale(LOCALE)

  if (value === '0day') {
    const target = now.plus({ days: offset })
    return {
      startAt: target.startOf('day').toMillis(),
      endAt: target.endOf('day').toMillis(),
    }
  }

  if (value === '24hour') {
    return {
      startAt: now
        .startOf('hour')
        .minus({ hours: 23 })
        .plus({ hours: offset * 24 })
        .toMillis(),
      endAt: now.endOf('hour').plus({ hours: offset * 24 }).toMillis(),
    }
  }

  if (value === '0week') {
    const target = now.plus({ weeks: offset })
    return {
      startAt: target.startOf('week').toMillis(),
      endAt: target.endOf('week').toMillis(),
    }
  }

  if (value === '7day') {
    return {
      startAt: now
        .startOf('day')
        .minus({ days: 6 })
        .plus({ days: offset * 7 })
        .toMillis(),
      endAt: now.endOf('day').plus({ days: offset * 7 }).toMillis(),
    }
  }

  if (value === '0month') {
    const target = now.plus({ months: offset })
    return {
      startAt: target.startOf('month').toMillis(),
      endAt: target.endOf('month').toMillis(),
    }
  }

  if (value === '30day') {
    return {
      startAt: now
        .startOf('day')
        .minus({ days: 29 })
        .plus({ days: offset * 30 })
        .toMillis(),
      endAt: now.endOf('day').plus({ days: offset * 30 }).toMillis(),
    }
  }

  if (value === '90day') {
    return {
      startAt: now
        .startOf('day')
        .minus({ days: 89 })
        .plus({ days: offset * 90 })
        .toMillis(),
      endAt: now.endOf('day').plus({ days: offset * 90 }).toMillis(),
    }
  }

  if (value === '0year') {
    const target = now.plus({ years: offset })
    return {
      startAt: target.startOf('year').toMillis(),
      endAt: target.endOf('year').toMillis(),
    }
  }

  if (value === '6month') {
    return {
      startAt: now
        .startOf('month')
        .minus({ months: 5 })
        .plus({ months: offset * 6 })
        .toMillis(),
      endAt: now.endOf('month').plus({ months: offset * 6 }).toMillis(),
    }
  }

  if (value === '12month') {
    return {
      startAt: now
        .startOf('month')
        .minus({ months: 11 })
        .plus({ months: offset * 12 })
        .toMillis(),
      endAt: now.endOf('month').plus({ months: offset * 12 }).toMillis(),
    }
  }

  if (value === 'all') {
    return allTimeRange.value || null
  }

  return null
}

const applyPresetRange = (value: TimeRangeValue, offset = 0) => {
  const range = getPresetRange(value, offset)
  if (!range) return

  startAt.value = range.startAt
  endAt.value = range.endAt
}

const openCustomRange = () => {
  customRange.value = null

  isCustomRangeOpen.value = true
}

const handleTimeRangeChange = (value: string) => {
  const selected = value as TimeRangeValue

  if (selected === 'custom') {
    openCustomRange()
    return
  }

  selectedTimeRange.value = selected
  timeOffset.value = 0
  applyPresetRange(selected, 0)
}

const shiftTimeRange = (increment: number) => {
  if (selectedTimeRange.value === 'custom' || selectedTimeRange.value === 'all') {
    if (!startAt.value || !endAt.value) return

    const windowSize = endAt.value - startAt.value + 1
    startAt.value += windowSize * increment
    endAt.value += windowSize * increment

    if (selectedTimeRange.value === 'all') {
      selectedTimeRange.value = 'custom'
    }

    timeOffset.value = 0
    return
  }

  timeOffset.value += increment
  applyPresetRange(selectedTimeRange.value, timeOffset.value)
}

const customRangeInvalid = computed(() => {
  const startDate = customRange.value?.start?.toDate?.(TIMEZONE)
  const endDate = customRange.value?.end?.toDate?.(TIMEZONE)
  if (!startDate || !endDate) return true

  const startDateTime = DateTime.fromJSDate(startDate)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)
  const endDateTime = DateTime.fromJSDate(endDate)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)

  return startDateTime.toMillis() > endDateTime.toMillis()
})

const applyCustomRange = () => {
  const startDate = customRange.value?.start?.toDate?.(TIMEZONE)
  const endDate = customRange.value?.end?.toDate?.(TIMEZONE)
  if (!startDate || !endDate) return

  selectedTimeRange.value = 'custom'
  timeOffset.value = 0
  startAt.value = DateTime.fromJSDate(startDate)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)
    .startOf('day')
    .toMillis()
  endAt.value = DateTime.fromJSDate(endDate)
    .setZone(TIMEZONE)
    .setLocale(LOCALE)
    .endOf('day')
    .toMillis()
  isCustomRangeOpen.value = false
}

watch(allTimeRange, () => {
  if (selectedTimeRange.value === 'all') {
    applyPresetRange('all', 0)
  }
})

onMounted(() => {
  applyPresetRange(selectedTimeRange.value, 0)
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 pt-8">
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
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="outline"
          size="xl"
          @click="shiftTimeRange(-1)"
        />
        <UButton
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="outline"
          size="xl"
          @click="shiftTimeRange(1)"
        />
      </div>
      <USelectMenu
        :model-value="selectedTimeRange"
        :ui="{
          base: 'w-fit min-w-48 max-w-[calc(100vw-2rem)]',
          content: 'max-h-full w-48 min-w-48',
          value: 'whitespace-nowrap !overflow-visible !text-clip',
          item: 'transition-colors hover:bg-elevated/80 data-[highlighted]:bg-elevated/80',
        }"
        :search-input="false"
        :items="timeRangeItems"
        value-key="value"
        size="xl"
        class="w-fit"
        @update:model-value="handleTimeRangeChange"
      >
        <template #default>
          <span class="inline-flex text-left whitespace-nowrap">
            {{ selectedTimeRangeLabel }}
          </span>
        </template>
      </USelectMenu>
    </div>
  </div>

  <UModal v-model:open="isCustomRangeOpen" title="选择日期范围">
    <template #body>
      <div class="overflow-x-auto py-1">
        <UCalendar
          v-model="customRange"
          range
          :number-of-months="2"
          class="mx-auto"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          @click="isCustomRangeOpen = false"
        >
          取消
        </UButton>
        <UButton :disabled="customRangeInvalid" @click="applyCustomRange">
          应用
        </UButton>
      </div>
    </template>
  </UModal>
</template>
