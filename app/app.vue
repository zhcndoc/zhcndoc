<script setup lang="ts">
useHead({
  script: [{ src: '/js/common.js', async: true }],
})

const projects = useState<GithubRepo[]>('projects', () => [])

projects.value = await $fetch<GithubRepo[]>('/api/project')

const items = [
  {
    label: '项目',
    icon: 'lucide:layout-list',
    to: '/project',
  },
]
</script>

<template>
  <NuxtLoadingIndicator />
  <UHeader>
    <template #title>
      <div class="flex items-center gap-1 font-[header-logo,_serif]">
        <Logo class="h-6 w-6"></Logo>
        <div class="text-2xl">简中<span class="text-[#ff3f57]">文档</span></div>
      </div>
    </template>
    <UNavigationMenu :items="items" />
    <template #right>
      <UColorModeButton />
      <UButton
        to="https://github.com/zhcndoc/zhcndoc"
        target="_blank"
        variant="ghost"
        icon="lucide:github"
        color="neutral"
      />
    </template>
  </UHeader>

  <UMain>
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
        <NuxtLink
          to="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="hover:text-primary"
        >
          沪ICP备2024070610号-3
        </NuxtLink>
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
