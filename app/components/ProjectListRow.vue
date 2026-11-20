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
const logoSrc = computed(() => `/images/project/${props.project.name}.svg`)
const updatedDate = computed(
  () =>
    props.project.updatedAt &&
    DateTime.fromISO(props.project.updatedAt)
      .setZone('Asia/Shanghai')
      .toFormat('yyyy-MM-dd'),
)
</script>

<template>
  <li v-if="featured" class="min-w-0 snap-start">
    <ULink
      :to="detailLink"
      class="group border-default bg-default hover:border-primary flex h-full flex-col overflow-hidden rounded-xl border transition-colors focus-visible:-outline-offset-2"
    >
      <div
        class="border-muted bg-muted/60 relative grid h-24 place-items-center border-b sm:h-28"
      >
        <img
          :src="logoSrc"
          alt=""
          width="76"
          height="76"
          class="size-[4.75rem] object-contain"
        />
        <UIcon
          name="i-lucide-arrow-right"
          class="text-muted group-hover:text-primary absolute end-3 top-3 size-4"
        />
      </div>
      <div class="px-3 py-2.5 sm:px-3.5 sm:py-3">
        <h3
          class="text-highlighted group-hover:text-primary text-sm font-semibold"
        >
          {{ title }}
        </h3>
        <p class="text-muted mt-1 text-xs/5">
          {{ project.description }}
        </p>
      </div>
    </ULink>
  </li>
  <li
    v-else
    class="hover:bg-muted/60 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-4 py-3.5 transition-colors sm:gap-x-4 sm:px-5 md:grid-cols-[auto_minmax(0,1fr)_auto]"
  >
    <ULink
      :to="detailLink"
      :aria-label="title"
      tabindex="-1"
      class="border-default flex size-14 shrink-0 items-center justify-center rounded-md border bg-white p-2 sm:size-16"
    >
      <img
        :src="logoSrc"
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
          <UIcon name="i-lucide-star" class="size-3.5" />
          {{ project.stars }}
        </ULink>
        <ULink
          v-if="project.forks != null"
          :to="`https://github.com/zhcndoc/${project.name}/forks`"
          target="_blank"
          class="inline-flex items-center gap-1"
          :aria-label="`${project.forks} Forks`"
        >
          <UIcon name="i-lucide-git-fork" class="size-3.5" />
          {{ project.forks }}
        </ULink>
      </div>
    </div>
    <div class="col-start-2 flex flex-wrap gap-2 md:col-start-3">
      <UButton
        v-if="project.link"
        :to="project.link"
        target="_blank"
        variant="soft"
        size="sm"
        label="中文文档"
        trailing-icon="i-lucide-arrow-up-right"
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
