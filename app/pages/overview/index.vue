<script setup lang="ts">
useSeoMeta({
  title: '项目概览',
  description: '简中文档项目仓库的整体概览数据，仅供站内浏览。',
})

const { data: projects } = await useFetch<ProjectInfo[]>('/api/project', {
  default: () => [],
  query: {
    scope: 'all',
  },
})
</script>

<template>
  <div class="p-4 pb-8">
    <ProjectTable :data="projects" />
  </div>
</template>
