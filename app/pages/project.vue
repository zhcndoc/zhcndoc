<script setup lang="ts">
const projects = useState<GithubRepo[]>('projects', () => [])

projects.value = await $fetch<GithubRepo[]>('/api/project')

const compareResults = ref<Record<string, number>>({})

const newProjects = computed(() => {
  return projects.value
    .map((project) => {
      return {
        ...project,
        ahead_by: compareResults.value[project.name] ?? undefined,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

const getCompare = async (repo: string) => {
  const data = await $fetch(`/api/project/compare?repo=${repo}`)
  compareResults.value[repo] = data?.ahead_by ?? 0
}

onMounted(() => {
  projects.value.forEach((project) => {
    getCompare(project.name)
  })
})
</script>

<template>
  <div class="p-4 pb-8">
    <ProjectTable :data="newProjects" />
  </div>
</template>
