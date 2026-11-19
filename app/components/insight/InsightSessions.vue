<script setup lang="ts">
import { h } from 'vue'
import { DateTime } from 'luxon'
import type { TableColumn } from '@nuxt/ui'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const page = ref(1)
const pageSize = ref(10)

watch(
  () => [props.hostname, props.startAt, props.endAt, pageSize.value],
  () => {
    page.value = 1
  },
  { flush: 'sync' },
)

const { data, status } = useFetch<InsightSessionsResponse>(
  '/api/insight/sessions',
  {
    key: 'insight-sessions',
    query: computed(() => ({
      startAt: props.startAt,
      endAt: props.endAt,
      hostname: props.hostname,
      page: page.value,
      pageSize: pageSize.value,
    })),
  },
)

const columns: TableColumn<InsightSession>[] = [
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
        DateTime.fromISO(row.original.lastAt)
          .setZone('Asia/Shanghai')
          .toFormat('MM-dd HH:mm'),
      ),
  },
]
</script>

<template>
  <UCard as="section" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header><h2 class="font-semibold">最近会话</h2></template>
    <UTable
      :data="data?.data ?? []"
      :columns="columns"
      :loading="status === 'pending'"
      :empty="
        status === 'error' ? '暂时无法读取会话记录。' : '所选时段暂无会话'
      "
    >
      <template #loading>正在加载会话…</template>
    </UTable>

    <template #footer>
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span class="text-muted text-sm tabular-nums">
          共 {{ data?.count ?? 0 }} 条记录
        </span>
        <USelectMenu
          v-model="pageSize"
          :items="[10, 20, 50, 100]"
          :search-input="false"
          aria-label="每页记录数"
        >
          <template #default>每页 {{ pageSize }} 条</template>
        </USelectMenu>
        <UPagination
          v-model:page="page"
          :items-per-page="pageSize"
          :total="data?.count ?? 0"
          :sibling-count="0"
          show-controls
          size="sm"
        />
      </div>
    </template>
  </UCard>
</template>
