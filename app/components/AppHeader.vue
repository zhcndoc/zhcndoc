<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '项目',
    icon: 'tabler:list-details',
    to: '/projects',
    active: route.path.startsWith('/projects'),
    description: '浏览已收录的中文技术文档项目',
  },
  {
    label: '概览',
    icon: 'tabler:layout-dashboard',
    to: '/overview',
    description: '查看项目仓库与同步状态的整体图景',
    active: route.path.startsWith('/overview'),
  },
  {
    label: '统计',
    icon: 'tabler:chart-pie',
    to: '/insight',
    description: '查看简中文档访问和项目数据',
    active: route.path.startsWith('/insight'),
  },
  {
    label: '博客',
    icon: 'tabler:article',
    to: '/blog',
    description: '简中文档的更新记录和文章',
    active: route.path.startsWith('/blog'),
  },
])
</script>

<template>
  <UHeader title="简中文档">
    <template #title>
      <Logo />
    </template>

    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <UColorModeButton />
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
</template>
