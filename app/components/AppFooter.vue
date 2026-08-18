<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const currentYear = new Date().getFullYear()

const columns: FooterColumn[] = [
  {
    label: '文档索引',
    children: [
      { label: '探索项目', to: '/project' },
      { label: '项目概览', to: '/overview' },
      { label: '访问统计', to: '/insight' },
    ],
  },
  {
    label: '社区',
    children: [
      { label: '博客', to: '/blog' },
      {
        label: 'GitHub',
        to: 'https://github.com/zhcndoc/zhcndoc',
        target: '_blank',
      },
      {
        label: '提交项目',
        to: 'https://github.com/zhcndoc/zhcndoc/issues/new',
        target: '_blank',
      },
    ],
  },
  {
    label: '站点',
    children: [
      { label: '首页', to: '/' },
      {
        label: 'zhcndoc.com',
        to: 'https://www.zhcndoc.com',
        target: '_blank',
      },
      {
        label: '开源仓库',
        to: 'https://github.com/zhcndoc',
        target: '_blank',
      },
    ],
  },
]
</script>

<template>
  <USeparator />

  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #left>
            <div class="max-w-sm">
              <Logo />
              <p class="text-muted mt-4 text-sm leading-6">
                收录、维护并索引开源项目的简体中文文档，让中文开发者更快进入可靠资料。
              </p>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ currentYear }}
        <ULink to="https://www.zhcndoc.com" class="hover:text-default">
          简中文档
        </ULink>
      </p>
    </template>

    <template #right>
      <div
        class="text-muted flex flex-col items-center gap-2 text-sm xl:flex-row xl:gap-4"
      >
        <ULink
          to="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="hover:text-default inline-flex items-center gap-2"
        >
          <UIcon name="icon:miit" class="size-4" />
          <span>沪ICP备2024070610号-3</span>
        </ULink>
        <ULink
          to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44200002445480"
          target="_blank"
          class="hover:text-default inline-flex items-center gap-2"
        >
          <UIcon name="icon:mps" class="size-4" />
          <span>粤公网安备44200002445480号</span>
        </ULink>
      </div>
    </template>
  </UFooter>
</template>
