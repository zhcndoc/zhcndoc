<script setup lang="ts">
const props = defineProps<{
  timeRange: {
    startAt: number
    endAt: number
  }
}>()

const { data } = await useFetch('/api/analytics/stats', {
  query: {
    startAt: props.timeRange.startAt,
    endAt: props.timeRange.endAt,
  },
})

const statsItem = [
  {
    prop: 'pageviews',
    name: '浏览量',
    format: (value: number) => {
      return formatLongNumber(value)
    },
    change: (value: number, prev: number) => {
      const change = ((value - prev) / prev) * 100
      return Math.round(+change) + '%'
    },
  },
  {
    prop: 'visitors',
    name: '访问次数',
    format: (value: number) => {
      return formatLongNumber(value)
    },
    change: (value: number, prev: number) => {
      const change = ((value - prev) / prev) * 100
      return Math.round(+change) + '%'
    },
  },
  {
    prop: 'visits',
    name: '访客',
    format: (value: number) => {
      return formatLongNumber(value)
    },
    change: (value: number, prev: number) => {
      const change = ((value - prev) / prev) * 100
      return Math.round(+change) + '%'
    },
  },
  {
    prop: 'bounces',
    name: '跳出率',
    format: (value: number) => {
      const { visits } = data.value
      const bounces = (Math.min(visits.value, value) / visits.value) * 100
      return Math.round(+bounces) + '%'
    },
    change: (value: number, prev: number) => {
      const change = ((value - prev) / prev) * 100
      return Math.round(+change) + '%'
    },
  },
  {
    prop: 'totaltime',
    name: '平均时间',
    format: (value: number) => {
      const { visits } = data.value
      return formatSeconds(value / visits.value)
    },
    change: (value: number, prev: number) => {
      const change = ((value - prev) / prev) * 100
      return Math.round(+change) + '%'
    },
  },
]
</script>

<template>
  <div class="grid grid-cols-[2fr_1fr]">
    <div class="grid w-full grid-cols-5 gap-5">
      <template v-for="item in statsItem" :key="item.prop">
        <div>
          <div class="text-sm font-bold">{{ item.name }}</div>
          <div class="text-4xl leading-[1.5] font-bold">
            {{ item.format(data[item.prop].value) }}
          </div>
          <div>
            <UBadge icon="tabler:arrow-up" color="success" variant="soft">
              {{ item?.change(data[item.prop].value, data[item.prop].prev) }}
            </UBadge>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
