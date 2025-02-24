<script setup lang="ts">
import config from '#shared/config.yaml'
import type { TableColumn } from '@nuxt/ui'
import dayjs from 'dayjs'

const { projects } = config

const UButton = resolveComponent('UButton')

defineProps<{
  data: any[]
}>()

const tableColumns: TableColumn<any>[] = [
  { accessorKey: 'name', header: '项目名称' },
  { accessorKey: 'homepage', header: '项目链接' },
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
            ? 'lucide:arrow-up-narrow-wide'
            : 'lucide:arrow-down-wide-narrow'
          : 'lucide:arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  { accessorKey: 'created_at', header: '创建时间' },
  { accessorKey: 'updated_at', header: '更新时间' },
  { accessorKey: 'actions', header: '操作' },
]
</script>

<template>
  <UTable :data="data" :columns="tableColumns">
    <template #name-cell="{ row }">
      <UButton
        :to="row.original.homepage!"
        target="_blank"
        variant="link"
        color="neutral"
      >
        {{ row.original.description }}
      </UButton>
    </template>
    <template #homepage-cell="{ row }">
      <UButton
        :to="row.original.homepage!"
        target="_blank"
        icon="lucide:external-link"
        variant="link"
        color="neutral"
        trailing
      >
        {{ row.original.homepage }}
      </UButton>
    </template>
    <template #ahead_by-cell="{ row }">
      <UBadge
        v-if="row.original.ahead_by !== undefined"
        :color="row.original.ahead_by! <= 0 ? 'success' : 'error'"
        :label="row.original.ahead_by! <= 0 ? '已同步最新' : `落后 ${row.original.ahead_by} 个提交`"
        variant="subtle"
      />
      <UBadge v-else color="neutral" variant="subtle" label="加载中..." />
    </template>
    <template #created_at-cell="{ row }">
      <ClientOnly :fallback="row.original.created_at">
        {{ dayjs(row.original.created_at).format('YYYY-MM-DD HH:mm:ss') }}
      </ClientOnly>
    </template>
    <template #updated_at-cell="{ row }">
      <ClientOnly :fallback="row.original.updated_at">
        {{ dayjs(row.original.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
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
