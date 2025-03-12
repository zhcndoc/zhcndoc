<script setup lang="ts">
import projects from '@@/.nuxt/projects.json'
import type { TableColumn } from '@nuxt/ui'
import dayjs from 'dayjs'

const UButton = resolveComponent('UButton')

defineProps<{
  data: any[]
}>()

const tableColumns: TableColumn<any>[] = [
  { accessorKey: 'title', header: '项目名称' },
  { accessorKey: 'link', header: '项目链接' },
  {
    accessorKey: 'ahead_by',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: '同步状态',
        'trailing-icon': isSorted
          ? isSorted === 'asc'
            ? 'tabler:sort-ascending'
            : 'tabler:sort-descending'
          : 'tabler:arrows-sort',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  { accessorKey: 'createdAt', header: '创建时间' },
  { accessorKey: 'updatedAt', header: '更新时间' },
  { accessorKey: 'actions', header: '操作' },
]
</script>

<template>
  <UTable :data="data" :columns="tableColumns">
    <template #title-cell="{ row }">
      <UButton
        :to="row.original.homepage!"
        target="_blank"
        variant="link"
        color="neutral"
      >
        {{ row.original.title }}
      </UButton>
    </template>
    <template #link-cell="{ row }">
      <UButton
        :to="row.original.link!"
        target="_blank"
        icon="tabler:external-link"
        variant="link"
        color="neutral"
        trailing
      >
        {{ row.original.link }}
      </UButton>
    </template>
    <template #ahead_by-cell="{ row }">
      <UBadge
        v-if="row.original.ahead_by !== undefined"
        :color="row.original.ahead_by! <= 0 ? 'success' : 'error'"
        :label="
          row.original.ahead_by! <= 0
            ? '已同步最新'
            : `落后 ${row.original.ahead_by} 个提交`
        "
        variant="subtle"
      />
      <UBadge v-else color="neutral" variant="subtle" label="加载中..." />
    </template>
    <template #createdAt-cell="{ row }">
      <ClientOnly :fallback="row.original.createdAt">
        {{ dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
      </ClientOnly>
    </template>
    <template #updatedAt-cell="{ row }">
      <ClientOnly :fallback="row.original.updatedAt">
        {{ dayjs(row.original.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
      </ClientOnly>
    </template>
    <template #actions-cell="{ row }">
      <div class="flex gap-2">
        <UButton
          :to="`https://github.com/zhcndoc/${row.original.name}`"
          target="_blank"
          label="Git 仓库"
          color="neutral"
          variant="soft"
        />
        <UButton
          :to="`https://github.com/${
            projects.find((p) => p.name === row.original.name)?.upstream.repo
          }`"
          target="_blank"
          label="上游仓库"
          color="neutral"
          variant="soft"
        />
      </div>
    </template>
  </UTable>
</template>
