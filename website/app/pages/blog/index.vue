<script setup lang="ts">
import { DateTime } from 'luxon'

const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('posts').order('date', 'DESC').all(),
)

useSeoMeta({
  title: '博客',
  ogTitle: '博客 - 简中文档',
  description: '简中文档的最新动态和文章',
  ogDescription: '简中文档的最新动态和文章',
})
</script>

<template>
  <UContainer>
    <UPageHeader
      title="博客"
      description="简中文档的最新动态和文章"
      class="py-12.5"
    />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="post.path"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="DateTime.fromISO(post.date).toFormat('yyyy 年 MM 月 dd 日')"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2',
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
