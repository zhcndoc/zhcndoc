<script setup lang="ts">
const { data: projects } = await useFetch<ProjectInfo[]>('/api/projects', {
  transform: (data) => {
    return data.sort((a, b) => {
      return a.stars > b.stars ? -1 : 1
    })
  },
})
</script>

<template>
  <UContainer class="py-8">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="project in projects" :key="project.name">
        <UPageCard
          :ui="{
            container: 'p-3 sm:p-4',
          }"
          @click="navigateTo(`/projects/${project.name}`)"
        >
          <div class="flex flex-col">
            <div class="flex gap-4">
              <div class="h-20 min-w-20 overflow-hidden rounded-xl">
                <NuxtLink :to="`/projects/${project.name}`">
                  <img
                    :src="`/images/projects/${project.name}.svg`"
                    class="bg-elevated h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </NuxtLink>
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
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <NuxtLink
                  target="_blank"
                  :to="`https://github.com/zhcndoc/${project.name}/stargazers`"
                  @click.stop
                >
                  <div class="flex items-center gap-1">
                    <UIcon name="tabler:star" />
                    {{ project.stars }}
                  </div>
                </NuxtLink>
                <NuxtLink
                  target="_blank"
                  :to="`https://github.com/zhcndoc/${project.name}/forks`"
                  @click.stop
                >
                  <div class="flex items-center gap-1">
                    <UIcon name="tabler:git-fork" />
                    {{ project.forks }}
                  </div>
                </NuxtLink>
              </div>
              <div class="flex gap-2">
                <UButton
                  label="中文文档"
                  :to="project.link"
                  target="_blank"
                  variant="soft"
                  color="primary"
                  @click.stop
                />
                <UButton
                  label="官方文档"
                  :to="project.upstream.link"
                  target="_blank"
                  variant="soft"
                  color="neutral"
                  @click.stop
                />
              </div>
            </div>
          </div>
        </UPageCard>
      </template>
    </div>
  </UContainer>
</template>
