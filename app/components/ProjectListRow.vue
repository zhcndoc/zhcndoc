<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps<{
  project: Pick<ProjectInfo, 'name' | 'title'> & Partial<ProjectInfo>
  featured?: boolean
  previewSrc?: string
}>()

const title = computed(
  () => props.project.title.replace(/\s*中文文档$/, '') || props.project.name,
)
const detailLink = computed(() => `/project/${props.project.name}`)
const logoSrc = computed(() => `/images/project/${props.project.name}.svg`)
const previewImage = useTemplateRef<HTMLImageElement>('preview-image')
const failedPreviewSrc = ref<string>()
const updatedDate = computed(
  () =>
    props.project.updatedAt &&
    DateTime.fromISO(props.project.updatedAt)
      .setZone('Asia/Shanghai')
      .toFormat('yyyy-MM-dd'),
)

function handlePreviewError() {
  failedPreviewSrc.value = props.previewSrc
}

onMounted(() => {
  const image = previewImage.value
  // The server-rendered image can fail before Vue attaches its error listener.
  if (image?.complete && image.naturalWidth === 0) handlePreviewError()
})
</script>

<template>
  <li v-if="featured" class="min-w-0 snap-start">
    <div
      class="border-muted bg-default flex h-full flex-col overflow-hidden rounded-md border shadow-sm shadow-black/5"
    >
      <div
        class="bg-muted dark:bg-elevated grid min-h-8 flex-1 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-2 px-2.5 py-1 sm:px-3"
      >
        <span aria-hidden="true" class="flex shrink-0 items-center gap-1">
          <span class="size-2.5 rounded-full bg-[#ff6058]"></span>
          <span class="size-2.5 rounded-full bg-[#ffbd38]"></span>
          <span class="size-2.5 rounded-full bg-[#2dc844]"></span>
        </span>
        <h3
          class="text-highlighted w-fit max-w-full min-w-0 justify-self-center rounded-sm bg-zinc-200 px-2 py-1 text-center text-[10px]/3 font-medium dark:bg-zinc-700"
        >
          {{ title }} <span class="whitespace-nowrap">中文文档</span>
        </h3>
      </div>
      <ULink
        :to="detailLink"
        :aria-label="`${title} 中文文档预览`"
        class="focus-visible:outline-primary bg-muted/60 relative grid aspect-video w-full shrink-0 place-items-center overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <img
          v-if="previewSrc && previewSrc !== failedPreviewSrc"
          ref="preview-image"
          :src="previewSrc"
          alt=""
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 size-full object-cover"
          @error="handlePreviewError"
        />
        <img
          v-else
          :src="logoSrc"
          alt=""
          width="76"
          height="76"
          class="size-14 object-contain sm:size-19"
        />
      </ULink>
    </div>
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
