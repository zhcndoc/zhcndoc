<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UTooltip = resolveComponent('UTooltip')

defineProps<{ data: ProjectData[] }>()

const tableColumns: TableColumn<ProjectData>[] = [
  {
    accessorKey: 'title',
    header: '项目',
    cell({ row }) {
      return h(UButton, {
        color: 'neutral',
        label: row.original.title,
        target: '_blank',
        to: row.original.url,
        trailingIcon: 'tabler:external-link',
        variant: 'ghost',
      })
    },
  },
  {
    accessorKey: 'type',
    header: '类型',
    cell({ row }) {
      switch (row.original.type) {
        case 'translate':
          return h(UBadge, {
            color: 'info',
            icon: 'tabler:pencil-code',
            label: '翻译',
            variant: 'solid',
          })
        case 'mirror':
          return h(UBadge, {
            color: 'warning',
            icon: 'tabler:copy',
            label: '镜像',
            variant: 'solid',
          })
        default:
          return '无'
      }
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
      return getHeader(column, 'Wtach')
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
    accessorKey: 'openIssues',
    header: ({ column }) => {
      return getHeader(column, 'Issue')
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
    accessorKey: 'openPullRequests',
    header: ({ column }) => {
      return getHeader(column, 'Pull')
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
      if (newCommit === null) {
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

const getHeader = (column: Column<ProjectData>, label: string) => {
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
  <UTable
    :data="data"
    :columns="tableColumns"
    :ui="{
      th: 'text-center text-nowrap',
      td: 'text-center',
    }"
  />
</template>
