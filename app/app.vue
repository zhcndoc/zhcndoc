<script setup lang="ts">
const links = [
  {
    label: "项目",
    icon: "i-heroicons-square-3-stack-3d",
    to: "/project",
  },
];
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <div class="flex items-center gap-2 font-source-han-serif">
        <Logo class="h-8 w-8"></Logo>
        <div class="text-2xl">简中<span class="text-primary">文档</span></div>
      </div>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        color="gray"
        variant="ghost"
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
  <UNotifications />
</template>
