<script setup lang="ts">
const projects = ref<ProjectData[]>([])

projects.value = await $fetch<ProjectData[]>('/api/project')
</script>

<template>
  <UContainer>
    <div>
      <template v-for="project in projects" :key="project.name">
        <div class="p-4 pb-8">
          {{ project }}
        </div>
      </template>
    </div>
  </UContainer>
</template>
