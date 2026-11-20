<script setup lang="ts">
const route = useRoute()
const navigationOpen = ref(false)
const {
  data: navigation,
  status,
  refresh,
} = await useFetch('/api/docs/navigation', { key: 'docs-navigation' })
const chapters = computed(
  () => navigation.value?.find((item) => item.path === '/docs')?.children ?? [],
)

watch(
  () => route.path,
  () => {
    navigationOpen.value = false
  },
)

function closeOnLink(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a[href]')) {
    navigationOpen.value = false
  }
}
</script>

<template>
  <div class="bg-default min-h-[calc(100dvh-var(--ui-header-height))]">
    <UContainer class="grid items-start md:grid-cols-[13rem_minmax(0,1fr)]">
      <a
        href="#doc-content"
        class="text-primary bg-default sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:p-3"
      >
        跳到正文
      </a>
      <div
        class="border-muted flex items-center justify-between gap-3 border-b py-2 md:hidden"
      >
        <USlideover
          v-model:open="navigationOpen"
          side="left"
          title="文档导航"
          :ui="{
            overlay: 'fixed inset-0 z-50 bg-black/45',
            content:
              'bg-default fixed inset-y-0 start-0 z-50 flex w-[min(21rem,90vw)] flex-col shadow-xl',
            header:
              'border-default relative flex min-h-14 shrink-0 items-center border-b px-4',
            title: 'text-highlighted font-semibold',
            body: 'min-h-0 flex-1 overflow-y-auto px-4 py-5',
            close: 'absolute end-3 top-3',
          }"
        >
          <UButton
            label="文档导航"
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
          />
          <template #body>
            <DocsNavigation :items="chapters" @click="closeOnLink" />
            <UButton
              v-if="status === 'error'"
              label="重试加载章节"
              variant="link"
              @click="refresh()"
            />
          </template>
        </USlideover>
        <UContentSearchButton
          label="搜索文档"
          :collapsed="false"
          :kbds="[]"
          class="w-auto"
        />
      </div>

      <aside
        class="border-muted sticky top-(--ui-header-height) hidden h-[calc(100dvh-var(--ui-header-height))] overflow-y-auto border-e py-7 pe-5 md:block"
      >
        <UContentSearchButton
          label="搜索文档"
          :collapsed="false"
          class="mb-5"
        />
        <DocsNavigation :items="chapters" />
        <UButton
          v-if="status === 'error'"
          label="重试加载章节"
          variant="link"
          @click="refresh()"
        />
      </aside>

      <NuxtPage />
    </UContainer>
    <DocsSearch :navigation="chapters" />
  </div>
</template>
