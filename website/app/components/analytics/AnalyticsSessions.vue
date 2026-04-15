<script setup lang="ts">
import { h } from 'vue'
import { DateTime } from 'luxon'
import type { TableColumn } from '@nuxt/ui'
import type {
  AnalyticsSession,
  AnalyticsSessionsResponse,
} from '#shared/types/analytics'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const page = ref(1)
const pageSize = ref(10)

const { data, status } = useFetch<AnalyticsSessionsResponse>(
  '/api/analytics/sessions',
  {
    query: computed(() => ({
      startAt: props.startAt,
      endAt: props.endAt,
      hostname: props.hostname,
      page: page.value,
      pageSize: pageSize.value,
    })),
    watch: [page, pageSize],
  },
)

const columns: TableColumn<AnalyticsSession>[] = [
  {
    accessorKey: 'browser',
    header: '浏览器',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'text-sm' }, row.original.browser),
        h('span', { class: 'text-xs text-muted' }, row.original.os),
      ]),
  },
  {
    accessorKey: 'device',
    header: '设备',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'text-sm' }, row.original.device),
        h('span', { class: 'text-xs text-muted' }, row.original.screen),
      ]),
  },
  {
    accessorKey: 'country',
    header: '位置',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'text-sm' }, row.original.country),
        h('span', { class: 'text-xs text-muted' }, row.original.city),
      ]),
  },
  {
    accessorKey: 'visits',
    header: '访问',
    cell: ({ row }) =>
      h('span', { class: 'text-sm font-medium' }, row.original.visits),
  },
  {
    accessorKey: 'views',
    header: '浏览',
    cell: ({ row }) =>
      h('span', { class: 'text-sm font-medium' }, row.original.views),
  },
  {
    accessorKey: 'lastAt',
    header: '最后访问',
    cell: ({ row }) =>
      h(
        'span',
        { class: 'text-sm text-muted' },
        DateTime.fromISO(row.original.lastAt).toFormat('MM-dd HH:mm'),
      ),
  },
]
</script>

<template>
  <UCard class="flex h-full flex-col">
    <UTable
      :data="data?.data ?? []"
      :columns="columns"
      :loading="status === 'pending'"
      class="flex-1"
    />

    <template #footer>
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="text-muted text-sm">共 {{ data?.count ?? 0 }} 条记录</div>
        <UPagination
          v-model:page="page"
          v-model:items-per-page="pageSize"
          :total="data?.count ?? 0"
          :items-per-page-options="[10, 20, 50, 100]"
          show-controls
          size="sm"
        />
      </div>
    </template>
  </UCard>
</template>
