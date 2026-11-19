<script setup lang="ts">
const props = defineProps<{
  projects?: ProjectInfo[]
  status: 'idle' | 'pending' | 'success' | 'error'
}>()
const stats = computed(() => {
  const projects = props.projects ?? []
  return [
    { label: '收录项目', value: projects.length },
    {
      label: '文档入口',
      value: projects.filter(
        (project) => project.link || project.upstream?.link,
      ).length,
    },
    {
      label: 'Stars 合计',
      value: projects.reduce((sum, project) => sum + project.stars, 0),
    },
    {
      label: 'Forks 合计',
      value: projects.reduce((sum, project) => sum + project.forks, 0),
    },
  ]
})
</script>

<template>
  <UCard as="section" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <h2 class="inline-flex items-center gap-2 text-base font-semibold">
        <UIcon name="tabler:chart-bar" class="text-primary size-4" />
        收录数据
      </h2>
    </template>
    <dl class="grid grid-cols-2 gap-px bg-(--ui-border-muted)">
      <div v-for="stat in stats" :key="stat.label" class="bg-default px-4 py-3">
        <dt class="text-muted text-xs">{{ stat.label }}</dt>
        <dd
          class="text-highlighted mt-1 text-2xl font-semibold tracking-tight tabular-nums"
        >
          <USkeleton
            v-if="status === 'pending' || status === 'idle'"
            class="my-2 h-5 w-12"
          />
          <template v-else>
            {{
              status === 'success' ? stat.value.toLocaleString('zh-CN') : '—'
            }}
          </template>
        </dd>
      </div>
    </dl>
    <template #footer>
      <ULink
        to="/overview"
        class="text-primary flex items-center justify-between text-sm"
      >
        查看项目概览
        <UIcon name="tabler:arrow-right" class="size-4" />
      </ULink>
    </template>
  </UCard>
</template>
