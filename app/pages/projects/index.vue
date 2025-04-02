<script setup lang="ts">
const { data } = await useFetch<ProjectInfo[]>('/api/projects')
</script>

<template>
  <UContainer class="py-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="project in data" :key="project.name">
        <UCard
          :ui="{
            body: 'p-3 sm:p-4',
          }"
        >
          <div class="flex flex-col">
            <div class="flex gap-4">
              <div class="h-16 min-w-16 overflow-hidden rounded-xl">
                <!-- <img
                  :src="`/images/project/${project.name}.svg`"
                  class="h-full w-full object-cover object-center"
                /> -->
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <span>{{ project.title }}</span>
                <span class="break-words">{{ project.link }}</span>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </div>
  </UContainer>
</template>
