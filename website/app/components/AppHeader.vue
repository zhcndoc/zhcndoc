<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '项目',
    icon: 'tabler:list-details',
    to: '/projects',
    active: route.path.startsWith('/projects'),
    children: [
      {
        label: '探索',
        icon: 'tabler:search',
        to: '/projects',
        description: '全面探索各类中文文档项目，发现更多优质资源',
      },
      {
        label: '概览',
        icon: 'tabler:layout-dashboard',
        to: '/projects/overview',
        description: '查看中文文档项目在 Github 仓库的整体概览情况',
      },
    ],
  },
  {
    label: '统计',
    icon: 'tabler:chart-pie',
    to: '/analytics',
    description: '深入了解各项数据的统计信息，掌握业务动态',
    active: route.path.startsWith('/analytics'),
  },
])
</script>

<template>
  <UHeader
    title="简中文档"
    class="fixed top-0 w-full"
    :ui="{
      center: 'flex-2',
    }"
  >
    <template #title>
      <Logo />
    </template>
    <UNavigationMenu :items="items" class="w-full justify-center" />
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
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
</template>
