<script setup lang="ts">
const projects = ref<ProjectData[]>([])

projects.value = await $fetch<ProjectData[]>('/api/project')

const getCompare = async (repo: string) => {
  const result = await $fetch(`/api/project/compare?repo=${repo}`)
  const project = projects.value.find((project) => project.name === repo)
  if (project && result) project.newCommit = result.newCommit
}

onMounted(() => {
  projects.value.forEach((project) => {
    getCompare(project.name)
  })
})
</script>

<template>
  <div class="p-4 pb-8">
    <ProjectTable :data="projects" />
  </div>
</template>
