<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const { data: pageviews, status } = useFetch('/api/insight/pageviews', {
  key: 'insight-pageviews',
  query: props,
})

const unit = computed(() => {
  return getUnitByTime(props.startAt, props.endAt)
})

const xAxisData = computed(() => {
  const start = DateTime.fromMillis(props.startAt).setZone('Asia/Shanghai')
  const end = DateTime.fromMillis(props.endAt).setZone('Asia/Shanghai')
  const labels: string[] = []

  if (unit.value === 'hour') {
    let current = start.startOf('hour')
    while (current <= end) {
      labels.push(current.toFormat('yyyy-MM-dd HH:00:00'))
      current = current.plus({ hours: 1 })
    }
  } else if (unit.value === 'day') {
    let current = start.startOf('day')
    while (current <= end) {
      labels.push(current.toFormat('yyyy-MM-dd 00:00:00'))
      current = current.plus({ days: 1 })
    }
  } else if (unit.value === 'month') {
    let current = start.startOf('month')
    while (current <= end) {
      labels.push(current.toFormat('yyyy-MM-01 00:00:00'))
      current = current.plus({ months: 1 })
    }
  }

  return labels
})

const palette = useChartPalette()

const seriesData = computed(() => {
  const pageviewsMap = new Map(
    (pageviews.value?.pageviews ?? []).map((item) => [
      DateTime.fromISO(item.x, { setZone: true }).toFormat(
        'yyyy-MM-dd HH:mm:ss',
      ),
      item.y,
    ]),
  )
  const sessionsMap = new Map(
    (pageviews.value?.sessions ?? []).map((item) => [
      DateTime.fromISO(item.x, { setZone: true }).toFormat(
        'yyyy-MM-dd HH:mm:ss',
      ),
      item.y,
    ]),
  )

  return {
    pageviews: xAxisData.value.map((time) => pageviewsMap.get(time) ?? 0),
    sessions: xAxisData.value.map((time) => sessionsMap.get(time) ?? 0),
  }
})

const chartOptions = computed<ECOption>(() => {
  const chartTheme = palette.value
  if (!chartTheme) return {}
  return {
    color: [chartTheme.pageviews, chartTheme.sessions],
    animationDuration: 450,
    tooltip: {
      trigger: 'axis',
      backgroundColor: chartTheme.tooltipBg,
      borderColor: chartTheme.tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: chartTheme.tooltipText,
      },
      axisPointer: {
        type: 'shadow',
        z: -1,
        shadowStyle: {
          color: chartTheme.splitLine,
        },
      },
    },
    legend: {
      data: ['访客', '浏览量'],
      bottom: 0,
      icon: 'roundRect',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: chartTheme.axisText,
      },
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '12%',
      top: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData.value,
      axisLine: {
        lineStyle: {
          color: chartTheme.axisLine,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: chartTheme.axisText,
        fontSize: 12,
        hideOverlap: true,
        margin: 10,
        formatter(value: string) {
          if (unit.value === 'hour') {
            return DateTime.fromSQL(value).toFormat('HH:mm')
          } else if (unit.value === 'day') {
            return DateTime.fromSQL(value).toFormat('MM-dd')
          } else if (unit.value === 'month') {
            return DateTime.fromSQL(value).toFormat('yyyy-MM')
          }
          return value
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: chartTheme.axisText,
        fontSize: 12,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: chartTheme.splitLine,
        },
      },
    },
    series: [
      {
        name: '访客',
        type: 'bar',
        barGap: '20%',
        barCategoryGap: '35%',
        itemStyle: {
          color: chartTheme.sessions,
          borderRadius: [3, 3, 0, 0],
        },
        data: seriesData.value.sessions,
      },
      {
        name: '浏览量',
        type: 'bar',
        barGap: '20%',
        barCategoryGap: '35%',
        itemStyle: {
          color: chartTheme.pageviews,
          borderRadius: [3, 3, 0, 0],
        },
        data: seriesData.value.pageviews,
      },
    ],
  }
})
</script>
<template>
  <UCard as="section">
    <template #header><h2 class="font-semibold">访问趋势</h2></template>
    <div
      v-if="status === 'error'"
      role="status"
      class="text-muted py-8 text-center text-sm"
    >
      暂时无法读取访问趋势。
    </div>
    <div
      v-else-if="
        status === 'success' &&
        !pageviews?.pageviews?.length &&
        !pageviews?.sessions?.length
      "
      class="text-muted py-8 text-center text-sm"
    >
      所选时段暂无访问记录
    </div>
    <div v-else class="relative h-64 w-full sm:h-72">
      <VChart
        v-if="palette"
        :option="chartOptions"
        :autoresize="true"
        :loading="status === 'pending'"
        class="size-full"
      />
      <USkeleton v-else class="size-full" />
    </div>
  </UCard>
</template>
