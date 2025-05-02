<script setup lang="ts">
useHead({
  title: '简中文档 - 由开源社区提供支持的中文技术文档',
  meta: [
    {
      name: 'description',
      content:
        '由开源社区提供支持的中文技术文档，旨在为中文地区开发者提供优质的技术文档查阅体验。',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
  ],
  link: [
    {
      href: '/site.webmanifest',
      rel: 'manifest',
      crossorigin: 'use-credentials',
    },
  ],
  script: [{ src: '/js/common.js', async: true }],
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
