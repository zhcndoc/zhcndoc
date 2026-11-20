<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'

const route = useRoute()
const path = route.path.replace(/\/+$/, '')
const { data: navigation } =
  useNuxtData<ContentNavigationItem[]>('docs-navigation')

const { data, error } = await useFetch('/api/docs/page', {
  key: `docs-page:${path}`,
  query: { path },
})

if (error.value) {
  const notFound = error.value.statusCode === 404
  throw createError({
    cause: error.value,
    statusCode: notFound ? 404 : 500,
    message: notFound ? '文档未找到' : '文档加载失败',
    fatal: true,
  })
}

const page = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)
const breadcrumbs = computed(() => findPageBreadcrumb(navigation.value, path))
const editUrl = computed(
  () =>
    page.value &&
    `https://github.com/zhcndoc/zhcndoc/edit/main/content/${page.value.stem}.md`,
)

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
})
</script>

<template>
  <div
    v-if="page"
    class="grid min-w-0 items-start gap-y-5 pt-7 pb-10 md:ps-7 lg:grid-cols-[minmax(0,1fr)_10.5rem] lg:gap-x-7 lg:gap-y-7 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-x-10 xl:ps-10"
  >
    <header
      id="doc-content"
      tabindex="-1"
      class="border-muted scroll-mt-20 border-b pb-6 lg:col-start-1 lg:row-start-1"
    >
      <nav v-if="breadcrumbs.length" aria-label="当前位置" class="mb-3">
        <ol class="text-muted flex flex-wrap items-center gap-2 text-sm">
          <li
            v-for="(item, index) in breadcrumbs"
            :key="item.path"
            class="flex items-center gap-2"
          >
            <UIcon
              v-if="index > 0"
              name="i-lucide-chevron-right"
              class="size-3.5"
              aria-hidden="true"
            />
            <span v-if="item.page === false">{{ item.title }}</span>
            <ULink v-else :to="item.path">
              {{ item.path === '/docs' ? '指南' : item.title }}
            </ULink>
          </li>
        </ol>
      </nav>
      <h1
        class="text-highlighted text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
      >
        {{ page.title }}
      </h1>
      <p class="text-muted mt-3 text-base/7 sm:text-lg/8">
        {{ page.description }}
      </p>
    </header>

    <UContentToc
      v-if="page.body.toc?.links.length"
      :links="page.body.toc.links"
      title="本页目录"
      aria-label="本页目录"
      class="lg:sticky lg:top-[calc(var(--ui-header-height)+2.5rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1"
      :ui="{
        root: 'rounded-none border-0 bg-transparent',
        trigger: 'px-0 py-2 text-sm lg:pt-0',
        content: 'mt-1 border-s border-t-0 py-0 ps-3 pe-0',
        list: 'w-full',
      }"
    >
      <template #leading>
        <UIcon name="i-lucide-list-tree" class="text-muted size-4" />
      </template>
    </UContentToc>

    <article class="min-w-0 lg:col-start-1 lg:row-start-2">
      <ContentRenderer :value="page" class="min-w-0 wrap-break-word" />
      <footer class="border-muted mt-8 border-t pt-4">
        <ULink
          :to="editUrl"
          target="_blank"
          class="text-muted inline-flex items-center gap-2 text-sm"
        >
          <UIcon name="i-lucide-square-pen" class="size-4" />
          在 GitHub 编辑此页
        </ULink>
        <UContentSurround
          v-if="surround?.some(Boolean)"
          as="nav"
          aria-label="相邻文档"
          :surround="surround"
          :ui="{ root: 'mt-4 border-0 pt-0', link: 'rounded-md' }"
        >
          <template #link-leading="{ link }">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium">
              <template v-if="link.path === surround?.[0]?.path">
                <UIcon name="i-lucide-arrow-left" class="size-3.5" />
                上一页
              </template>
              <template v-else>
                下一页
                <UIcon name="i-lucide-arrow-right" class="size-3.5" />
              </template>
            </span>
          </template>
        </UContentSurround>
      </footer>
    </article>
  </div>
</template>
