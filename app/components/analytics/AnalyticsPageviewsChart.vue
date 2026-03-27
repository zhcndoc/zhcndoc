<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const { data: pageviews, status } = useFetch('/api/analytics/pageviews', {
  key: 'analytics-pageviews',
  query: props,
})

const unit = computed(() => {
  return getUnitByTime(props.startAt, props.endAt)
})

const xAxisData = computed(() => {
  const start = DateTime.fromMillis(props.startAt)
  const end = DateTime.fromMillis(props.endAt)
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

const chartTheme = {
  pageviews: '#36A2EB',
  sessions: '#4BC0C0',
  axisText: '#64748B',
  axisLine: 'rgba(148, 163, 184, 0.4)',
  splitLine: 'rgba(148, 163, 184, 0.18)',
  tooltipBg: 'rgba(15, 23, 42, 0.92)',
  tooltipBorder: 'rgba(148, 163, 184, 0.3)',
  tooltipText: '#F8FAFC',
}

const seriesData = computed(() => {
  const pageviewsMap = new Map(
    (pageviews.value?.pageviews ?? []).map((item) => [item.x, item.y]),
  )
  const sessionsMap = new Map(
    (pageviews.value?.sessions ?? []).map((item) => [item.x, item.y]),
  )

  return {
    pageviews: xAxisData.value.map((time) => pageviewsMap.get(time) ?? 0),
    sessions: xAxisData.value.map((time) => sessionsMap.get(time) ?? 0),
  }
})

const chartOptions = computed<ECOption>(() => {
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
        shadowStyle: {
          color: 'rgba(148, 163, 184, 0.12)',
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
          color: 'rgba(75, 192, 192, 0.85)',
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
          color: 'rgba(54, 162, 235, 0.85)',
          borderRadius: [3, 3, 0, 0],
        },
        data: seriesData.value.pageviews,
      },
    ],
  }
})

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="relative h-96 w-full">
    <VChart
      :option="chartOptions"
      :autoresize="true"
      :loading="status === 'pending'"
    />
    <USkeleton v-if="!isMounted" class="absolute top-0 h-full w-full" />
  </div>
</template>
