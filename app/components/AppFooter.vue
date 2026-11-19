<script setup lang="ts">
import { DateTime } from 'luxon'

const year = DateTime.now().setZone('Asia/Shanghai').year
const links = [
  { label: '项目目录', to: '/project' },
  { label: '项目概览', to: '/overview' },
  { label: '访问统计', to: '/insight' },
  { label: '站点博客', to: '/blog' },
  { label: '开源组织', to: 'https://github.com/zhcndoc' },
  { label: '提交项目', to: 'https://github.com/zhcndoc/zhcndoc/issues/new' },
]
</script>

<template>
  <footer class="border-default bg-default mt-8 border-t text-sm">
    <UContainer class="py-5">
      <div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <ULink to="/" aria-label="简中文档首页"><Logo /></ULink>
        <nav
          aria-label="页脚导航"
          class="text-muted flex flex-wrap gap-x-5 gap-y-2"
        >
          <ULink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :target="link.to.startsWith('https:') ? '_blank' : undefined"
          >
            {{ link.label }}
          </ULink>
        </nav>
      </div>
      <div
        class="border-muted text-muted mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-xs"
      >
        <span class="me-auto">
          © {{ year }}
          <ULink to="https://www.zhcndoc.com">简中文档</ULink>
        </span>
        <ULink
          to="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="inline-flex items-center gap-1.5"
        >
          <UIcon name="icon:miit" class="size-3.5" />
          沪ICP备2024070610号-3
        </ULink>
        <ULink
          to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44200002445480"
          target="_blank"
          class="inline-flex items-center gap-1.5"
        >
          <UIcon name="icon:mps" class="size-3.5" />
          粤公网安备44200002445480号
        </ULink>
      </div>
    </UContainer>
  </footer>
</template>
