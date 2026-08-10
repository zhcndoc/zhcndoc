<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UTooltip = resolveComponent('UTooltip')

defineProps<{ data?: ProjectInfo[] }>()

const defaultColumnVisibility: Record<string, boolean> = {}

const columnOptions = [
  { id: 'license', label: '开源协议' },
  { id: 'stars', label: 'Star' },
  { id: 'forks', label: 'Fork' },
  { id: 'watchers', label: 'Watch' },
  { id: 'issues', label: 'Issue 总数' },
  { id: 'openIssues', label: 'Open Issue' },
  { id: 'pullRequests', label: 'Pull 总数' },
  { id: 'openPullRequests', label: 'Open PR' },
  { id: 'newCommit', label: '同步状态' },
  { id: 'createdAt', label: '创建时间' },
  { id: 'updatedAt', label: '更新时间' },
  { id: 'actions', label: '操作' },
] as const

const columnVisibility = useCookie<Record<string, boolean>>(
  'overview-table-column-visibility',
  {
    default: () => ({ ...defaultColumnVisibility }),
  },
)

const getDefaultVisibility = (columnId: string) =>
  defaultColumnVisibility[columnId] ?? true

const columnMenuItems = computed<DropdownMenuItem[][]>(() => [
  columnOptions.map(({ id, label }) => ({
    label,
    type: 'checkbox' as const,
    checked: columnVisibility.value[id] ?? getDefaultVisibility(id),
    onUpdateChecked(checked: boolean) {
      columnVisibility.value = {
        ...columnVisibility.value,
        [id]: checked,
      }
    },
    onSelect(event: Event) {
      event.preventDefault()
    },
  })),
  [
    {
      label: '恢复默认',
      icon: 'i-lucide-rotate-ccw',
      disabled: columnOptions.every(
        ({ id }) =>
          (columnVisibility.value[id] ?? getDefaultVisibility(id)) ===
          getDefaultVisibility(id),
      ),
      onSelect() {
        columnVisibility.value = { ...defaultColumnVisibility }
      },
    },
  ],
])

const tableColumns: TableColumn<ProjectInfo>[] = [
  {
    accessorKey: 'title',
    header: '项目',
    enableHiding: false,
    cell({ row }) {
      return h(UButton, {
        color: 'neutral',
        label: row.original.title,
        target: '_blank',
        to: row.original.link,
        trailingIcon: row.original.link ? 'tabler:external-link' : undefined,
        variant: 'ghost',
      })
    },
  },
  {
    accessorKey: 'license',
    header: '开源协议',
    cell({ row }) {
      switch (row.original.license) {
        case 'Apache License 2.0':
          return 'Apache License 2.0'
        case 'MIT License':
          return 'MIT License'
        case 'Creative Commons Attribution 4.0 International':
          return 'CC BY 4.0'
        case 'Other':
          return '其他'
        default:
          return '无'
      }
    },
  },
  {
    accessorKey: 'stars',
    header: ({ column }) => {
      return getHeader(column, 'Star')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:star',
        label: row.original.stars.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'forks',
    header: ({ column }) => {
      return getHeader(column, 'Fork')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:git-fork',
        label: row.original.forks.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'watchers',
    header: ({ column }) => {
      return getHeader(column, 'Watch')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:eyeglass',
        label: row.original.watchers.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'issues',
    header: ({ column }) => {
      return getHeader(column, 'Issue')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:message',
        label: row.original.issues.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'openIssues',
    header: ({ column }) => {
      return getHeader(column, 'Open Issue')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:message',
        label: row.original.openIssues.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'pullRequests',
    header: ({ column }) => {
      return getHeader(column, 'Pull')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:git-pull-request',
        label: row.original.pullRequests.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'openPullRequests',
    header: ({ column }) => {
      return getHeader(column, 'Open PR')
    },
    cell({ row }) {
      return h(UBadge, {
        color: 'neutral',
        icon: 'tabler:git-pull-request',
        label: row.original.openPullRequests.toString(),
        variant: 'soft',
      })
    },
  },
  {
    accessorKey: 'newCommit',
    header: ({ column }) => {
      return getHeader(column, '同步状态')
    },
    cell({
      row: {
        original: { newCommit },
      },
    }) {
      if (newCommit === undefined) {
        return h(UBadge, {
          color: 'neutral',
          variant: 'subtle',
          label: '加载中...',
        })
      } else {
        return h(UBadge, {
          color: newCommit <= 0 ? 'success' : 'error',
          variant: 'subtle',
          label: newCommit <= 0 ? '已同步最新' : `落后 ${newCommit} 个提交`,
        })
      }
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return getHeader(column, '创建时间')
    },
    cell({ row }) {
      return new Date(row.getValue('createdAt')).toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
      })
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return getHeader(column, '更新时间')
    },
    cell({ row }) {
      return new Date(row.getValue('updatedAt')).toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
      })
    },
  },
  {
    accessorKey: 'actions',
    header: '操作',
    cell({
      row: {
        original: { name, upstream },
      },
    }) {
      return h('div', { class: 'flex gap-2 justify-center' }, [
        h(
          UTooltip,
          {
            arrow: true,
            delayDuration: 100,
            text: '查看项目',
          },
          () =>
            h(UButton, {
              color: 'neutral',
              icon: 'tabler:brand-github',
              target: '_blank',
              to: `https://github.com/zhcndoc/${name}`,
              variant: 'soft',
            }),
        ),
        h(
          UTooltip,
          {
            arrow: true,
            delayDuration: 100,
            text: '上游仓库',
          },
          () =>
            h(UButton, {
              color: 'neutral',
              icon: 'tabler:git-pull-request',
              target: '_blank',
              to: `https://github.com/${upstream.owner}/${upstream.repo}`,
              variant: 'soft',
            }),
        ),
      ])
    },
  },
]

const getHeader = (
  column: {
    getIsSorted: () => false | 'asc' | 'desc'
    toggleSorting: (desc?: boolean) => void
    clearSorting: () => void
  },
  label: string,
) => {
  const isSorted = column.getIsSorted()
  return h(UButton, {
    label,
    variant: 'ghost',
    color: 'neutral',
    trailingIcon: isSorted
      ? isSorted === 'asc'
        ? 'tabler:sort-ascending'
        : 'tabler:sort-descending'
      : 'tabler:arrows-sort',
    class: '-mx-2.5',
    onClick: () => {
      if (isSorted === false) {
        column.toggleSorting(true)
      } else if (isSorted === 'desc') {
        column.toggleSorting(false)
      } else {
        column.clearSorting()
      }
    },
  })
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex justify-end">
      <UDropdownMenu
        :items="columnMenuItems"
        :content="{ align: 'end' }"
        :ui="{ content: 'w-48' }"
      >
        <UButton
          color="neutral"
          icon="i-lucide-columns-settings"
          label="显示列"
          trailing-icon="i-lucide-chevron-down"
          variant="outline"
        />
      </UDropdownMenu>
    </div>

    <UTable
      v-model:column-visibility="columnVisibility"
      :data="data"
      :columns="tableColumns"
      :ui="{
        th: 'text-center text-nowrap',
        td: 'text-center',
      }"
    />
  </div>
</template>
