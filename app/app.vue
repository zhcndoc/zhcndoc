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
      name: 'wwads-cn-verify',
      content: 'f74909ace68e51891440e4da0b65a70c',
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

// const projects = useState<GithubRepo[]>('projects', () => [])

// projects.value = await $fetch<GithubRepo[]>('/api/project')
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
