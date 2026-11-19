<script setup lang="ts">
import { DateTime } from 'luxon'

const {
  data: posts,
  status,
  refresh,
} = await useAsyncData('posts', () =>
  queryCollection('posts').order('date', 'DESC').all(),
)

useSeoMeta({
  title: '博客',
  description: '简中文档的最新动态和文章',
})
</script>

<template>
  <UContainer class="py-5">
    <UCard as="section" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <div>
          <h1 class="text-highlighted text-2xl font-bold tracking-tight">
            站点博客
          </h1>
          <p class="text-muted mt-1 text-sm">简中文档的最新动态和文章</p>
        </div>
      </template>
      <ul v-if="posts?.length" class="divide-muted divide-y">
        <li
          v-for="post in posts"
          :key="post.path"
          class="hover:bg-muted/50 flex items-center gap-4 px-4 py-5 sm:gap-6 sm:px-5"
        >
          <img
            v-if="post.image"
            :src="post.image.src"
            :alt="post.image.alt || ''"
            class="border-default hidden aspect-video w-36 shrink-0 rounded border object-cover sm:block"
          />
          <div class="min-w-0">
            <div
              class="text-muted mb-2 flex flex-wrap items-center gap-2.5 text-xs"
            >
              <UBadge v-if="post.badge" color="primary">
                {{ post.badge.label }}
              </UBadge>
              <time :datetime="post.date">
                {{
                  DateTime.fromISO(post.date).toFormat('yyyy 年 MM 月 dd 日')
                }}
              </time>
              <span v-for="author in post.authors" :key="author.name">
                {{ author.name }}
              </span>
            </div>
            <h2 class="text-highlighted font-semibold sm:text-lg">
              <ULink :to="post.path">{{ post.title }}</ULink>
            </h2>
            <p class="text-muted mt-1.5 max-w-3xl text-sm/6">
              {{ post.description }}
            </p>
          </div>
        </li>
      </ul>
      <div v-else class="text-muted p-5 text-sm" role="status">
        {{
          status === 'error'
            ? '文章暂时无法加载。'
            : status === 'pending'
              ? '正在加载文章…'
              : '暂无文章'
        }}
        <UButton
          v-if="status === 'error'"
          label="重试"
          variant="link"
          @click="refresh()"
        />
      </div>
    </UCard>
  </UContainer>
</template>
