<script lang="ts" setup>
const items = [
  {
    label: '项目',
    icon: 'tabler:list-details',
    to: '/project',
  },
]
</script>

<template>
  <UHeader title="简中文档" class="fixed top-0 w-full">
    <template #title>
      <Logo />
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
</template>
