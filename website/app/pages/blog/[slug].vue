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
  <UContainer v-if="post">
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <UBadge v-if="post.badge" v-bind="post.badge" variant="subtle" />
        <span v-if="post.badge" class="text-muted">&middot;</span>
        <time class="text-muted">{{
          DateTime.fromISO(post.date).toFormat('yyyy 年 MM 月 dd 日')
        }}</time>
      </template>

      <div
        v-if="post.authors?.length"
        class="mt-4 flex flex-wrap items-center gap-3"
      >
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" alt="作者头像" size="2xs" />
          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="post?.body?.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
