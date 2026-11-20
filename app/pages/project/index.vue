<script setup lang="ts">
useSeoMeta({
  title: '项目探索',
  description:
    '探索简中文档支持的中文技术文档项目，快速进入中文文档与官方文档入口。',
})

const search = ref('')
const {
  data: projects,
  status,
  refresh,
} = await useLazyFetch<ProjectInfo[]>('/api/project', { default: () => [] })
const filteredProjects = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return projects.value
  return projects.value.filter((project) =>
    [
      project.name,
      project.title,
      project.description,
      project.upstream.owner,
      project.upstream.repo,
      `${project.upstream.owner}/${project.upstream.repo}`,
    ].some((value) => value.toLowerCase().includes(keyword)),
  )
})
</script>

<template>
  <UContainer
    class="grid items-start gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_16rem]"
  >
    <UCard id="project-index" as="section" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div>
          <h1 class="text-highlighted text-2xl font-bold tracking-tight">
            项目目录
          </h1>
          <p
            v-if="status === 'success'"
            aria-live="polite"
            class="text-muted mt-1 text-sm"
          >
            {{ search.trim() ? '匹配' : '收录' }}
            {{ filteredProjects.length }} 个项目
          </p>
        </div>
        <UInput
          v-model="search"
          type="search"
          icon="i-lucide-search"
          aria-label="搜索项目"
          placeholder="搜索项目、描述或上游仓库"
          class="w-full sm:w-72"
        />
      </template>
      <div
        v-if="status === 'pending'"
        role="status"
        class="text-muted p-5 text-sm"
      >
        正在加载项目…
      </div>
      <div
        v-else-if="status === 'error'"
        role="status"
        class="text-muted space-y-3 p-6 text-sm"
      >
        <p>暂时无法读取项目目录。</p>
        <UButton
          label="重新加载"
          variant="outline"
          size="sm"
          @click="refresh()"
        />
      </div>
      <ul v-else-if="filteredProjects.length" class="divide-muted divide-y">
        <ProjectListRow
          v-for="project in filteredProjects"
          :key="project.name"
          :project="project"
        />
      </ul>
      <div v-else class="text-muted p-8 text-center text-sm">
        <p>{{ search ? '没有找到匹配项目' : '暂无收录项目' }}</p>
        <UButton
          v-if="search"
          class="mt-2"
          variant="link"
          label="清除搜索"
          @click="search = ''"
        />
      </div>
    </UCard>
    <aside><ProjectStats :projects="projects" :status="status" /></aside>
  </UContainer>
</template>
