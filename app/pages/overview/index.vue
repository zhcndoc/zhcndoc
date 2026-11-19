<script setup lang="ts">
useSeoMeta({
  title: '项目概览',
  description: '简中文档项目仓库的整体概览数据，仅供站内浏览。',
})

const {
  data: projects,
  status,
  refresh,
} = await useLazyFetch<ProjectInfo[]>('/api/project', {
  default: () => [],
  query: { scope: 'all' },
})
</script>

<template>
  <div class="w-full min-w-0 px-4 py-5">
    <ProjectTable :data="projects" :status="status" @retry="refresh()" />
  </div>
</template>
