<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  host: string
  startAt: number
  endAt: number
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

const chartOptions = computed<ECOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['浏览量', '访客'],
      bottom: 0,
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData.value,
      axisLabel: {
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
      splitLine: {
        lineStyle: {
          opacity: 0.2,
        },
      },
    },
    series: [
      {
        name: '浏览量',
        type: 'bar',
        barWidth: '50%',
        barGap: '-100%',
        data: xAxisData.value.map((time) => {
          const found = pageviews.value?.pageviews.find(function (item) {
            return item.x === time
          })
          return found ? found.y : 0
        }),
      },
      {
        name: '访客',
        type: 'bar',
        barWidth: '50%',
        data: xAxisData.value.map((time) => {
          const found = pageviews.value?.sessions.find(function (item) {
            return item.x === time
          })
          return found ? found.y : 0
        }),
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
