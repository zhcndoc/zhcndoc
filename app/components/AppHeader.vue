<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 16)

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
    to: '/analytics',
    description: '查看简中文档访问和项目数据',
    active: route.path.startsWith('/analytics'),
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
  <UHeader
    title="简中文档"
    :class="[
      'fixed inset-x-0 top-0 z-50 border-b border-muted bg-default/85 backdrop-blur-xl transition-[height,box-shadow,background-color] duration-300 before:pointer-events-none before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent_0,transparent_33px,var(--ui-border-muted)_34px)] before:opacity-20 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-linear-to-r after:from-transparent after:via-primary/60 after:to-transparent after:opacity-45 after:animate-pulse motion-reduce:after:animate-none',
      isScrolled
        ? 'h-15! bg-default/95 shadow-[0_22px_60px_-44px_var(--ui-text)]'
        : 'h-18!',
    ]"
    :ui="{
      container: 'h-full max-w-7xl border-x border-muted px-3 sm:px-4 lg:px-6',
      left: 'lg:flex-1',
      center: 'hidden flex-2 lg:flex',
      right: 'gap-1.5 lg:flex-1',
      title: 'shrink-0',
      content: 'border-b border-muted bg-default/95 backdrop-blur-xl',
      body: 'border-t border-muted p-4 sm:p-6',
    }"
  >
    <template #title>
      <Logo />
    </template>

    <UNavigationMenu
      :items="items"
      class="w-full justify-center"
      color="neutral"
      highlight
      :ui="{
        link: 'rounded-none px-3 py-2 text-xs font-semibold tracking-[0.18em] before:rounded-none data-[active=true]:text-highlighted aria-[current=page]:text-highlighted',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
        viewport: 'rounded-none border border-muted bg-default shadow-2xl',
        childList: 'gap-px bg-border p-px',
        childLink: 'rounded-none bg-default px-3 py-3 before:rounded-none',
      }"
    />

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
        color="neutral"
        :ui="{
          link: 'rounded-none before:rounded-none',
          childLink: 'rounded-none before:rounded-none',
        }"
      />
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
        class="rounded-xs"
      />
    </template>
  </UHeader>
</template>
