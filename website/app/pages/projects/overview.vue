<script setup lang="ts">
const projects = ref<ProjectInfo[]>([])

projects.value = await $fetch('/api/projects', {
  query: {
    scope: 'all',
  },
})

const getCompare = async (repo: string) => {
  const project = projects.value.find((project) => project.name === repo)
  const { newCommit } = await $fetch(`/api/projects/compare?repo=${repo}`)
  if (project) project.newCommit = newCommit
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
