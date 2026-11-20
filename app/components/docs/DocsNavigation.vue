<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const props = defineProps<{
  items: ContentNavigationItem[]
}>()

const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/+$/, ''))
const directory = computed(() =>
  currentPath.value.slice(0, currentPath.value.lastIndexOf('/')),
)
const navigation = computed(() =>
  withRouteState(props.items, currentPath.value),
)

function withRouteState(
  items: ContentNavigationItem[],
  path: string,
): ContentNavigationItem[] {
  return items.map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        defaultOpen: path.startsWith(`${item.path}/`),
        children: withRouteState(item.children, path),
      }
    }

    const active = item.path === path
    return {
      ...item,
      exact: true,
      active,
      'aria-current': active ? 'page' : undefined,
    }
  })
}
</script>

<template>
  <UContentNavigation
    :key="directory"
    :navigation="navigation"
    aria-label="文档章节"
    trailing-icon="i-lucide-chevron-right"
  />
</template>
