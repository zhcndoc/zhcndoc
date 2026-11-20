<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const props = defineProps<{
  navigation: ContentNavigationItem[]
}>()

const searchNavigation = computed(() =>
  props.navigation.map((item) =>
    item.children?.length ? item : { ...item, children: [item] },
  ),
)
const searchInput = {
  name: 'docs-search',
  'aria-label': '搜索文档指南',
}
const { open } = useContentSearch()
const {
  data: files,
  status,
  execute,
} = useFetch('/api/docs/search', {
  key: 'docs-search',
  server: false,
  immediate: false,
})

watch(open, (isOpen) => {
  if (isOpen && !files.value) void execute({ dedupe: 'defer' })
})

onBeforeUnmount(() => {
  open.value = false
})
</script>

<template>
  <UContentSearch
    title="搜索文档指南"
    placeholder="输入关键词…"
    :input="searchInput"
    :files="files ?? []"
    :navigation="searchNavigation"
    :loading="status === 'pending'"
    :color-mode="false"
    :fuse="{ fuseOptions: { ignoreLocation: true, threshold: 0.2 } }"
  >
    <template #empty="{ searchTerm }">
      <p v-if="status === 'pending'" role="status">正在加载文档索引…</p>
      <p v-else-if="status === 'error'" role="status">
        文档索引加载失败。
        <UButton variant="link" label="重试" @click="execute()" />
      </p>
      <p v-else>
        {{ searchTerm ? '没有匹配的章节。' : '输入关键词开始搜索。' }}
      </p>
    </template>
  </UContentSearch>
</template>
