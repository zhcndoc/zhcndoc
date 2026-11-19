<script setup lang="ts">
import { DateTime } from 'luxon'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到',
    fatal: true,
  })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description'],
  }),
)

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  description,
})
</script>

<template>
  <UContainer v-if="post" class="py-5">
    <ULink
      to="/blog"
      class="text-muted mb-4 inline-flex items-center gap-1.5 text-sm"
    >
      <UIcon name="tabler:arrow-left" class="size-4" />
      站点博客
    </ULink>
    <div class="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <UContentToc
        v-if="post.body.toc?.links.length"
        :links="post.body.toc.links"
        title="文章目录"
        class="lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1"
      />
      <UCard
        as="article"
        class="lg:col-start-1 lg:row-start-1"
        :ui="{ body: 'px-5 py-6 sm:px-8 sm:py-8' }"
      >
        <div class="mx-auto max-w-3xl min-w-0">
          <header class="border-default mb-6 border-b pb-5">
            <div class="text-muted mb-3 flex items-center gap-2.5 text-sm">
              <UBadge v-if="post.badge" color="primary">
                {{ post.badge.label }}
              </UBadge>
              <time :datetime="post.date">
                {{
                  DateTime.fromISO(post.date).toFormat('yyyy 年 MM 月 dd 日')
                }}
              </time>
            </div>
            <h1
              class="text-highlighted text-2xl leading-snug font-bold tracking-tight sm:text-3xl"
            >
              {{ post.title }}
            </h1>
            <p class="text-muted mt-3 text-sm/7">{{ post.description }}</p>
            <div v-if="post.authors?.length" class="mt-3 flex flex-wrap gap-3">
              <ULink
                v-for="author in post.authors"
                :key="author.name"
                :to="author.to"
                target="_blank"
                class="inline-flex items-center gap-2 text-sm"
              >
                <UAvatar v-bind="author.avatar" :alt="author.name" size="xs" />
                {{ author.name }}
              </ULink>
            </div>
          </header>
          <ContentRenderer :value="post" class="min-w-0 wrap-break-word" />
          <UContentSurround
            v-if="surround?.some(Boolean)"
            :surround="surround"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
