<script setup lang="ts">
useHead({
  title: '简中文档 - 由开源社区提供支持的中文技术文档',
  meta: [
    {
      name: 'description',
      content:
        '由开源社区提供支持的中文技术文档，旨在为中文地区开发者提供优质的技术文档查阅体验。',
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

const projects = useState<GithubRepo[]>('projects', () => [])

projects.value = await $fetch<GithubRepo[]>('/api/project')

const items = [
  {
    label: '项目',
    icon: 'tabler:list-details',
    to: '/project',
  },
]
</script>

<template>
  <NuxtLoadingIndicator />
  <UHeader title="简中文档">
    <template #title>
      <HeaderLogo />
    </template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UColorModeButton>
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
      <UButton
        aria-label="GitHub"
        to="https://github.com/zhcndoc/zhcndoc"
        target="_blank"
        variant="ghost"
        icon="tabler:brand-github"
        color="neutral"
      />
    </template>
  </UHeader>

  <UMain class="px-4 container mx-auto xl:max-w-7xl">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}
        <NuxtLink to="https://www.zhcndoc.com" class="hover:text-primary">
          简中文档
        </NuxtLink>
      </p>
    </template>

    <template #right>
      <div
        class="text-gray-500 dark:text-gray-400 text-sm flex flex-col items-center lg:flex-row lg:gap-3 gap-1"
      >
        <Icon name="icon:miit" />
        <NuxtLink
          to="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="hover:text-primary"
        >
          沪ICP备2024070610号-3
        </NuxtLink>
        <Icon name="icon:mps" />
        <NuxtLink
          to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44200002445480"
          target="_blank"
          class="hover:text-primary"
        >
          粤公网安备44200002445480号
        </NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
