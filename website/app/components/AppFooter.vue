<script setup lang="ts">
const currentYear = new Date().getFullYear()

const linkGroups = [
  {
    code: 'A',
    title: '文档索引',
    links: [
      { label: '探索项目', to: '/projects' },
      { label: '项目概览', to: '/projects/overview' },
      { label: '访问统计', to: '/analytics' },
    ],
  },
  {
    code: 'B',
    title: '社区',
    links: [
      { label: '博客', to: '/blog' },
      {
        label: 'GitHub',
        to: 'https://github.com/zhcndoc/zhcndoc',
        external: true,
      },
      {
        label: '提交项目',
        to: 'https://github.com/zhcndoc/zhcndoc/issues/new',
        external: true,
      },
    ],
  },
  {
    code: 'C',
    title: '站点',
    links: [
      { label: '首页', to: '/' },
      { label: 'zhcndoc.com', to: 'https://www.zhcndoc.com', external: true },
      {
        label: '开源仓库',
        to: 'https://github.com/zhcndoc',
        external: true,
      },
    ],
  },
]
</script>

<template>
  <footer class="relative overflow-hidden border-t border-muted bg-default">
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--ui-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--ui-border-muted)_1px,transparent_1px)] opacity-20 [background-size:44px_44px] [mask-image:linear-gradient(180deg,transparent,black_22%,black_72%,transparent)]"
    />

    <UContainer class="relative py-12 lg:py-16">
      <div class="mb-10 grid gap-px border border-muted bg-border lg:grid-cols-[1.2fr_repeat(3,1fr)]">
        <section
          class="relative bg-default p-5 before:pointer-events-none before:absolute before:right-0 before:top-0 before:size-[18px] before:border-r before:border-t before:border-accented before:opacity-60 sm:p-6"
        >
          <Logo />
          <p class="mt-5 max-w-sm text-sm leading-7 text-muted">
            收录、维护并索引开源项目的简体中文文档，让中文开发者更快进入可靠资料。
          </p>
          <div class="mt-8 flex flex-wrap gap-2">
            <UButton
              to="/projects"
              label="进入索引"
              icon="tabler:folder-search"
              color="neutral"
              variant="subtle"
              class="rounded-[2px]"
            />
            <UButton
              to="https://github.com/zhcndoc/zhcndoc"
              target="_blank"
              aria-label="GitHub"
              icon="tabler:brand-github"
              color="neutral"
              variant="ghost"
              class="rounded-[2px]"
            />
          </div>
        </section>

        <nav
          v-for="group in linkGroups"
          :key="group.title"
          class="relative bg-default p-5 before:pointer-events-none before:absolute before:right-0 before:top-0 before:size-[18px] before:border-r before:border-t before:border-accented before:opacity-60 sm:p-6"
        >
          <div class="mb-6 flex items-center justify-between border-b border-muted pb-3">
            <h2 class="text-sm font-semibold text-highlighted">
              {{ group.title }}
            </h2>
            <span class="font-mono text-xs text-dimmed">{{ group.code }}</span>
          </div>
          <ul class="space-y-3">
            <li v-for="link in group.links" :key="link.label">
              <NuxtLink
                :to="link.to"
                :target="link.external ? '_blank' : undefined"
                class="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-highlighted"
              >
                <span class="h-px w-4 bg-border transition-all group-hover:w-6 group-hover:bg-primary" />
                <span>{{ link.label }}</span>
                <UIcon
                  v-if="link.external"
                  name="tabler:external-link"
                  class="size-3.5 text-dimmed"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="flex flex-col gap-5 border-t border-muted pt-6 text-sm text-muted lg:flex-row lg:items-center lg:justify-between"
      >
        <p>
          Copyright © {{ currentYear }}
          <NuxtLink to="https://www.zhcndoc.com" class="text-highlighted hover:text-primary">
            简中文档
          </NuxtLink>
        </p>

        <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
          <NuxtLink
            to="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            class="inline-flex items-center gap-2 hover:text-primary"
          >
            <img src="~/assets/icons/miit.svg" alt="" class="size-4" />
            <span>沪ICP备2024070610号-3</span>
          </NuxtLink>
          <NuxtLink
            to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44200002445480"
            target="_blank"
            class="inline-flex items-center gap-2 hover:text-primary"
          >
            <img src="~/assets/icons/mps.svg" alt="" class="size-4" />
            <span>粤公网安备44200002445480号</span>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
