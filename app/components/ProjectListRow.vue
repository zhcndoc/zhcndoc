<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  project: Pick<ProjectInfo, 'name' | 'title' | 'description'> &
    Partial<ProjectInfo>
  featured?: boolean
}>()

const title = computed(
  () => props.project.title.replace(/\s*中文文档$/, '') || props.project.name,
)
const detailLink = computed(() => `/project/${props.project.name}`)
const updatedDate = computed(
  () =>
    props.project.updatedAt &&
    DateTime.fromISO(props.project.updatedAt)
      .setZone('Asia/Shanghai')
      .toFormat('yyyy-MM-dd'),
)
</script>

<template>
  <li
    class="hover:bg-muted/60 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-4 py-3.5 transition-colors sm:gap-x-4 sm:px-5 md:grid-cols-[auto_minmax(0,1fr)_auto]"
  >
    <ULink
      :to="detailLink"
      :aria-label="title"
      tabindex="-1"
      class="border-default flex shrink-0 items-center justify-center rounded-md border bg-white p-2"
      :class="featured ? 'size-11 sm:size-12' : 'size-14 sm:size-16'"
    >
      <img
        :src="`/images/project/${project.name}.svg`"
        alt=""
        width="32"
        height="32"
        loading="lazy"
        class="size-full object-contain"
      />
    </ULink>
    <div class="min-w-0">
      <h3 class="text-highlighted text-base font-semibold tracking-tight">
        <ULink :to="detailLink">{{ title }}</ULink>
      </h3>
      <p class="text-muted mt-0.5 text-sm/6">{{ project.description }}</p>
      <div
        v-if="!featured"
        class="text-muted mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tabular-nums"
      >
        <span v-if="updatedDate">
          更新于
          <time :datetime="project.updatedAt">{{ updatedDate }}</time>
        </span>
        <ULink
          v-if="project.stars != null"
          :to="`https://github.com/zhcndoc/${project.name}/stargazers`"
          target="_blank"
          class="inline-flex items-center gap-1"
          :aria-label="`${project.stars} Stars`"
        >
          <UIcon name="tabler:star" class="size-3.5" />
          {{ project.stars }}
        </ULink>
        <ULink
          v-if="project.forks != null"
          :to="`https://github.com/zhcndoc/${project.name}/forks`"
          target="_blank"
          class="inline-flex items-center gap-1"
          :aria-label="`${project.forks} Forks`"
        >
          <UIcon name="tabler:git-fork" class="size-3.5" />
          {{ project.forks }}
        </ULink>
      </div>
    </div>
    <ULink
      v-if="featured"
      :to="detailLink"
      :aria-label="`查看 ${title} 项目`"
      class="text-muted hidden items-center gap-2 text-xs md:inline-flex"
    >
      项目详情
      <UIcon name="tabler:chevron-right" class="size-4" />
    </ULink>
    <div v-else class="col-start-2 flex flex-wrap gap-2 md:col-start-3">
      <UButton
        v-if="project.link"
        :to="project.link"
        target="_blank"
        variant="soft"
        size="sm"
        label="中文文档"
        trailing-icon="tabler:arrow-up-right"
      />
      <UButton
        v-if="project.upstream?.link"
        :to="project.upstream.link"
        target="_blank"
        variant="outline"
        size="sm"
        label="官方文档"
      />
    </div>
  </li>
</template>
