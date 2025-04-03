<script setup lang="ts">
const { data: projects } = useFetch<ProjectInfo[]>('/api/projects', {
  transform: (data) => {
    return data.sort((a, b) => {
      return a.stars > b.stars ? -1 : 1
    })
  },
})
</script>

<template>
  <UContainer class="py-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="project in projects" :key="project.name">
        <UCard
          :ui="{
            body: 'p-3 sm:p-4',
          }"
        >
          <div class="flex flex-col">
            <div class="flex gap-4">
              <div class="h-20 min-w-20 overflow-hidden rounded-xl">
                <img
                  :src="`/images/projects/${project.name}.png`"
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col gap-2">
                <h2 class="font-sans text-lg font-semibold">
                  {{ project.title.replace(' 中文文档', '') }}
                </h2>
                <span class="text-sm">
                  {{ project.description }}
                </span>
              </div>
            </div>
            <div class="mt-3 flex justify-between">
              <div class="flex gap-4 text-sm text-gray-500">
                <div class="flex items-center gap-1">
                  <UIcon name="tabler:star" />
                  {{ project.stars }}
                </div>
                <div class="flex items-center gap-1">
                  <UIcon name="tabler:git-fork" />
                  {{ project.forks }}
                </div>
              </div>
              <div class="flex gap-2">
                <UButton
                  label="中文文档"
                  :to="project.link"
                  target="_blank"
                  variant="soft"
                  color="primary"
                />
                <UButton
                  label="官方文档"
                  :to="project.upstream.link"
                  target="_blank"
                  variant="soft"
                  color="neutral"
                />
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </div>
  </UContainer>
</template>
