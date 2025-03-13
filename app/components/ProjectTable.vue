<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

defineProps<{ data: ProjectData[] }>()

const tableColumns: TableColumn<ProjectData>[] = [
  {
    accessorKey: 'title',
    header: '项目名称',
    cell({ row }) {
      return h(UButton, {
        to: row.original.url,
        target: '_blank',
        variant: 'link',
        color: 'neutral',
        label: row.original.title,
      })
    },
  },
  {
    accessorKey: 'link',
    header: '项目链接',
    cell({ row }) {
      return h(UButton, {
        to: row.original.url,
        target: '_blank',
        trailingIcon: 'tabler:external-link',
        variant: 'link',
        color: 'neutral',
        label: row.original.url,
      })
    },
  },
  {
    accessorKey: 'type',
    header: '类型',
    cell({ row }) {
      return row.original.type
    },
  },
  {
    accessorKey: 'license',
    header: '许可证',
    cell({ row }) {
      return row.original.license
    },
  },
  {
    accessorKey: 'stars',
    header: '星标',
    cell({ row }) {
      return row.original.stars
    },
  },
  {
    accessorKey: 'forks',
    header: '分叉',
    cell({ row }) {
      return row.original.forks
    },
  },
  {
    accessorKey: 'watchers',
    header: '关注者',
    cell({ row }) {
      return row.original.watchers
    },
  },
  {
    accessorKey: 'openIssues',
    header: '问题',
    cell({ row }) {
      return row.original.openIssues
    },
  },
  {
    accessorKey: 'openPullRequests',
    header: '拉取请求',
    cell({ row }) {
      return row.original.openPullRequests
    },
  },
  {
    accessorKey: 'newCommit',
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
    header: '创建时间',
    cell({ row }) {
      return new Date(row.getValue('createdAt')).toLocaleString('zh-CN')
    },
  },
  {
    accessorKey: 'updatedAt',
    header: '更新时间',
    cell({ row }) {
      return new Date(row.getValue('updatedAt')).toLocaleString('zh-CN')
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
        h(UButton, {
          to: `https://github.com/zhcndoc/${name}`,
          target: '_blank',
          label: 'Git 仓库',
          color: 'neutral',
          variant: 'soft',
        }),
        h(UButton, {
          to: `https://github.com/${upstream.owner}/${upstream.repo}`,
          target: '_blank',
          label: '上游仓库',
          color: 'neutral',
          variant: 'soft',
        }),
      ])
    },
  },
]
</script>

<template>
  <UTable
    :data="data"
    :columns="tableColumns"
    :ui="{
      th: 'text-center',
      td: 'text-center',
    }"
  />
</template>
