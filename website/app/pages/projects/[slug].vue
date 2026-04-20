<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

useSeoMeta({
  title: slug ? `${slug} 项目详情` : '项目详情',
  description: '项目详情页面正在建设中。',
})
</script>

<template>
  <UContainer class="py-4">{{
    slug ? `Project: ${slug}` : 'No project selected'
  }}</UContainer>
</template>
