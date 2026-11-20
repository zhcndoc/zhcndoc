<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import { DateTime } from 'luxon'

defineProps<{
  data: ProjectInfo[]
  status: 'idle' | 'pending' | 'success' | 'error'
}>()
defineEmits<{ retry: [] }>()

const fields = [
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
const sortableFields = fields.filter(
  (field) => field.id !== 'license' && field.id !== 'actions',
)
const defaultColumnVisibility: Record<string, boolean> = {
  watchers: false,
  issues: false,
  pullRequests: false,
  updatedAt: false,
}
const savedColumnVisibility = useCookie<Record<string, boolean>>(
  'overview-table-column-visibility',
  { default: () => ({}) },
)
const columnVisibility = computed(() => ({
  ...defaultColumnVisibility,
  ...savedColumnVisibility.value,
}))
const columnMenuItems = computed<DropdownMenuItem[][]>(() => [
  fields.map(({ id, label }) => ({
    label,
    type: 'checkbox',
    checked: columnVisibility.value[id] ?? true,
    onUpdateChecked(checked: boolean) {
      savedColumnVisibility.value = {
        ...savedColumnVisibility.value,
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
      disabled: fields.every(
        ({ id }) =>
          (columnVisibility.value[id] ?? true) ===
          (defaultColumnVisibility[id] ?? true),
      ),
      onSelect() {
        savedColumnVisibility.value = {}
      },
    },
  ],
])

const columns: TableColumn<ProjectInfo>[] = [
  {
    accessorKey: 'title',
    header: '项目',
    enableHiding: false,
    enableSorting: false,
    meta: { class: { th: 'text-center', td: 'text-center' } },
  },
  ...fields.map(({ id, label }) => ({
    accessorKey: id,
    header: label,
    enableSorting: id !== 'license' && id !== 'actions',
    sortDescFirst: true,
    meta: { class: { th: 'text-center', td: 'text-center' } },
  })),
]
const licenses: Record<string, string> = {
  'Apache License 2.0': 'Apache License 2.0',
  'MIT License': 'MIT License',
  'Creative Commons Attribution 4.0 International': 'CC BY 4.0',
  Other: '其他',
}

const loadFavicons = ref(false)
onMounted(() => {
  // Wait until the avatar can handle image errors.
  loadFavicons.value = true
})

function projectFaviconUrl(link: string) {
  try {
    const { hostname } = new URL(link)
    return hostname
      ? `https://markhub.top/favicon/${encodeURIComponent(hostname)}`
      : undefined
  } catch {
    return undefined
  }
}

function repositoryLinks({ name, upstream }: ProjectInfo) {
  return [
    {
      label: `${name} 项目仓库`,
      to: `https://github.com/zhcndoc/${name}`,
      icon: 'i-lucide-github',
    },
    {
      label: `${name} 上游仓库`,
      to: `https://github.com/${upstream.owner}/${upstream.repo}`,
      icon: 'i-lucide-git-fork',
    },
  ]
}

const dateFields = ['createdAt', 'updatedAt'] as const
const formatTime = (date: string) =>
  DateTime.fromISO(date)
    .setZone('Asia/Shanghai')
    .toFormat('yyyy-MM-dd HH:mm:ss')
</script>

<template>
  <section
    aria-labelledby="overview-heading"
    class="border-default bg-default min-w-0 rounded-md border"
  >
    <div
      class="border-default flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4"
    >
      <div class="flex items-baseline gap-3">
        <h1
          id="overview-heading"
          class="text-highlighted text-2xl font-bold tracking-tight"
        >
          项目概览
        </h1>
        <span
          v-if="status === 'success'"
          class="text-muted text-sm tabular-nums"
        >
          {{ data.length }} 个项目
        </span>
      </div>
      <UDropdownMenu
        :items="columnMenuItems"
        :content="{ align: 'end' }"
        :ui="{ content: 'w-48' }"
      >
        <UButton
          variant="outline"
          icon="i-lucide-columns-3"
          trailing-icon="i-lucide-chevron-down"
          label="显示列"
        />
      </UDropdownMenu>
    </div>
    <div
      v-if="status === 'error'"
      role="status"
      class="text-muted p-6 text-center text-sm"
    >
      暂时无法读取项目数据。
      <UButton size="sm" variant="link" label="重试" @click="$emit('retry')" />
    </div>
    <p
      v-else-if="!data.length"
      role="status"
      class="text-muted p-6 text-center text-sm"
    >
      {{ status === 'success' ? '暂无项目数据' : '正在加载项目数据…' }}
    </p>
    <UTable
      v-else
      :column-visibility="columnVisibility"
      :column-pinning="{ left: ['title'] }"
      :data="data"
      :columns="columns"
      :loading="status === 'pending'"
      caption="项目仓库与同步状态"
      tabindex="0"
      aria-label="项目数据，可横向滚动"
      class="focus-visible:outline-brand-500 rounded-b-md"
      :ui="{ base: 'min-w-full w-max' }"
    >
      <template
        v-for="field in sortableFields"
        :key="field.id"
        #[`${field.id}-header`]="{ column }"
      >
        <UButton
          variant="ghost"
          size="xs"
          :label="field.label"
          :trailing-icon="
            column.getIsSorted() === 'desc'
              ? 'i-lucide-arrow-down-wide-narrow'
              : column.getIsSorted() === 'asc'
                ? 'i-lucide-arrow-up-narrow-wide'
                : 'i-lucide-arrow-down-up'
          "
          @click="column.toggleSorting()"
        />
      </template>
      <template #title-cell="{ row }">
        <ULink
          :to="row.original.link || `/project/${row.original.name}`"
          :target="row.original.link ? '_blank' : undefined"
          class="text-primary mx-auto flex w-fit max-w-32 items-center gap-2 font-medium sm:max-w-60"
        >
          <UAvatar
            v-if="row.original.link"
            :src="
              loadFavicons ? projectFaviconUrl(row.original.link) : undefined
            "
            alt=""
            icon="i-lucide-globe"
            size="2xs"
            loading="lazy"
            decoding="async"
            class="rounded-sm bg-transparent"
            :ui="{ image: 'object-contain', icon: 'size-4' }"
          />
          <span class="whitespace-normal">
            {{ row.original.title || row.original.name }}
          </span>
        </ULink>
      </template>
      <template #license-cell="{ row }">
        {{ licenses[row.original.license] || row.original.license || '无' }}
      </template>
      <template #newCommit-cell="{ row }">
        <UBadge v-if="row.original.newCommit === null" color="neutral">
          获取失败
        </UBadge>
        <UBadge v-else-if="row.original.newCommit <= 0" color="success">
          已同步最新
        </UBadge>
        <UBadge v-else color="error">
          落后 {{ row.original.newCommit }} 个提交
        </UBadge>
      </template>
      <template
        v-for="field in dateFields"
        :key="field"
        #[`${field}-cell`]="{ row }"
      >
        <time :datetime="row.original[field]">
          {{ formatTime(row.original[field]) }}
        </time>
      </template>
      <template #actions-cell="{ row }">
        <div class="flex justify-center gap-1">
          <UTooltip
            v-for="link in repositoryLinks(row.original)"
            :key="link.label"
            :text="link.label"
          >
            <UButton
              :to="link.to"
              target="_blank"
              size="sm"
              variant="ghost"
              :icon="link.icon"
              :aria-label="link.label"
            />
          </UTooltip>
        </div>
      </template>
    </UTable>
  </section>
</template>
