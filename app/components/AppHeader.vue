<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const homeLogoDocked = useState('home-logo-docked', () => false)
const showHeroLogo = computed(() => route.path === '/' && !homeLogoDocked.value)

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: '指南',
    icon: 'i-lucide-book-open',
    to: '/docs',
    active: route.path === '/docs' || route.path.startsWith('/docs/'),
    description: '查阅中文技术文档的语言风格、结构与排版',
  },
  {
    label: '项目',
    icon: 'i-lucide-list',
    to: '/project',
    active: route.path === '/project' || route.path.startsWith('/project/'),
    description: '浏览已收录的中文技术文档项目',
  },
  {
    label: '概览',
    icon: 'i-lucide-layout-dashboard',
    to: '/overview',
    description: '查看项目仓库与同步状态的整体图景',
    active: route.path.startsWith('/overview'),
  },
  {
    label: '博客',
    icon: 'i-lucide-file-text',
    to: '/blog',
    description: '简中文档的更新记录和文章',
    active: route.path.startsWith('/blog'),
  },
  {
    label: '统计',
    icon: 'i-lucide-chart-pie',
    to: '/insight',
    description: '查看简中文档访问和项目数据',
    active: route.path.startsWith('/insight'),
  },
])
</script>

<template>
  <UHeader
    title="简中文档"
    class="motion-safe:transition-colors"
    :class="{
      'border-transparent **:data-[slot=title]:invisible': showHeroLogo,
    }"
  >
    <template #title>
      <Logo data-header-logo />
    </template>

    <UNavigationMenu :items="items" />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" />
    </template>

    <template #right>
      <UColorModeButton />
      <UButton
        aria-label="GitHub"
        to="https://github.com/zhcndoc/zhcndoc"
        target="_blank"
        variant="ghost"
        icon="i-lucide-github"
        color="neutral"
      />
    </template>
  </UHeader>
</template>
