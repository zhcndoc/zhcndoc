<script setup lang="ts">
useHead({ titleTemplate: '%s' })
useSeoMeta({
  title: '简中文档 - 由社区提供支持的中文文档',
  description:
    '由开源社区提供支持的中文技术文档，帮助中文开发者更稳定地查阅优质开源项目文档。',
})

const { data: projects, status } = useFetch<ProjectInfo[]>('/api/project', {
  server: false,
  default: () => [],
})
const selected = [
  {
    name: 'nuxt',
    title: 'Nuxt',
    description: '基于 Vue.js 的全栈框架，支持服务端渲染和静态站点生成。',
  },
  {
    name: 'vue',
    title: 'Vue.js',
    description: '渐进式 JavaScript 框架，提供组件化开发模式。',
  },
  {
    name: 'vite',
    title: 'Vite',
    description: '面向现代 Web 开发的前端构建工具。',
  },
  {
    name: 'bun',
    title: 'Bun',
    description: '集成包管理器、测试和构建工具的 JavaScript 运行时。',
  },
  {
    name: 'nitro',
    title: 'Nitro',
    description: '支持多种部署环境的服务端工具包。',
  },
  {
    name: 'tailwindcss',
    title: 'Tailwind CSS',
    description: '使用工具类构建界面的 CSS 框架。',
  },
]
const featured = computed(() =>
  selected.map(
    (item) =>
      projects.value.find((project) => project.name === item.name) ?? item,
  ),
)
const community = [
  { label: '站点博客', to: '/blog', icon: 'i-lucide-file-text' },
  {
    label: 'GitHub 仓库',
    to: 'https://github.com/zhcndoc/zhcndoc',
    icon: 'i-lucide-github',
  },
  {
    label: '提交项目',
    to: 'https://github.com/zhcndoc/zhcndoc/issues/new',
    icon: 'i-lucide-circle-plus',
  },
]

const comments = [
  {
    quote: `这文档真是我的开发好帮手，从基础概念到高阶应用都讲得透彻，特别是那些实战案例，每次卡壳的时候总能在这里找到灵感。`,
    user: {
      name: 'Liang',
      description: '@lianginx',
      avatar: {
        src: 'https://markhub.top/github/lianginx',
      },
    },
  },
  {
    quote: `国内服务器的加载速度就像本地文件一样流畅，文档结构设计得很贴心，每次我需要某个方案时，总能快速定位到想要的内容。`,
    user: {
      name: '馬腊咯稽',
      description: '@ElementRef',
      avatar: {
        src: 'https://markhub.top/github/ElementRef',
      },
    },
  },
  {
    quote: `开源技术指南整合得很系统，上周调试后端接口时，按着指南操作一次就成功了，同事也来问我要链接。`,
    user: {
      name: 'libchaos',
      description: '@libchaos',
      avatar: {
        src: 'https://markhub.top/github/libchaos',
      },
    },
  },
  {
    quote: `作为一个转行过来的程序员，这里的实例分析像同事在旁边讲重点，原本两周才能消化的新框架现在三天就能上手。`,
    user: {
      name: 'Ali_Eljerrari',
      description: '@ali-eljerrari',
      avatar: {
        src: 'https://markhub.top/github/ali-eljerrari',
      },
    },
  },
  {
    quote: `最近把这个网站设为浏览器首页了，知识点覆盖全面，更新推送也及时，现在写代码遇到瓶颈会先来这里找思路。`,
    user: {
      name: 'Yu Hengliang',
      description: '@yuhengliang',
      avatar: {
        src: 'https://markhub.top/github/yuhengliang',
      },
    },
  },
  {
    quote: `中文文档能做到这种专业程度实在难得，每个技术点都深入浅出，示例代码也方便复制到项目里调试。`,
    user: {
      name: 'David Muriithi',
      description: '@BarriosXJavier',
      avatar: {
        src: 'https://markhub.top/github/BarriosXJavier',
      },
    },
  },
]
</script>

<template>
  <UContainer
    class="grid items-start gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_16rem]"
  >
    <div class="min-w-0 space-y-5">
      <section
        class="border-default bg-default relative isolate overflow-hidden rounded-md border px-5 py-7 sm:px-8 sm:py-9"
      >
        <div class="relative z-10 max-w-2xl sm:pe-32 xl:pe-0">
          <h1
            class="text-highlighted text-[clamp(1.8rem,3vw,2.875rem)] leading-tight font-bold tracking-tight"
          >
            开源项目的
            <span class="text-primary">中文文档</span>
          </h1>
          <p class="text-muted mt-3 max-w-xl text-sm/7 sm:text-base/7">
            我们收录开发者常用的开源项目，持续对照上游翻译和校订。你可以在这里查阅中文文档，找到官方原文，了解仓库的同步进度。
          </p>
          <UButton
            to="/project"
            label="浏览项目"
            trailing-icon="i-lucide-arrow-right"
            class="mt-5"
          />
        </div>
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-0 end-0 hidden w-1/4 items-center justify-center overflow-hidden sm:flex"
        >
          <div
            class="border-brand-200 bg-brand-100 dark:border-brand-800 dark:bg-brand-950 absolute h-28 w-[5.6rem] translate-x-4 rotate-12 rounded border"
          ></div>
          <div
            class="border-default bg-default relative flex h-28 w-[5.6rem] -rotate-6 flex-col items-start justify-between rounded border p-3 shadow-sm"
          >
            <UIcon
              name="icon:logo"
              mode="svg"
              class="text-highlighted size-10"
            />
            <div class="space-y-1.5">
              <div class="bg-brand-400 h-0.5 w-11"></div>
              <div class="bg-border h-0.5 w-8"></div>
            </div>
          </div>
        </div>
      </section>
      <UCard as="section" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <h2
            class="text-highlighted flex items-center gap-2.5 text-lg font-semibold"
          >
            <UIcon name="i-lucide-library-big" class="text-primary size-5" />
            精选项目
          </h2>
          <ULink
            to="/project"
            class="text-muted inline-flex items-center gap-1 text-sm"
          >
            全部项目
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </ULink>
        </template>
        <ul class="divide-muted divide-y">
          <ProjectListRow
            v-for="project in featured"
            :key="project.name"
            :project="project"
            featured
          />
        </ul>
      </UCard>
    </div>
    <aside class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <ProjectStats :projects="projects" :status="status" />
      <UCard :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <h2 class="flex items-center gap-2 font-semibold">
            <UIcon name="i-lucide-users" class="text-primary size-4" />
            社区
          </h2>
        </template>
        <nav aria-label="社区" class="divide-muted divide-y">
          <ULink
            v-for="link in community"
            :key="link.to"
            :to="link.to"
            :target="link.to.startsWith('https:') ? '_blank' : undefined"
            class="hover:bg-muted flex items-center gap-2.5 px-4 py-3 text-sm"
          >
            <UIcon :name="link.icon" class="text-muted size-4" />
            {{ link.label }}
            <UIcon
              :name="
                link.to.startsWith('https:')
                  ? 'i-lucide-arrow-up-right'
                  : 'i-lucide-chevron-right'
              "
              class="text-muted ms-auto size-3.5"
            />
          </ULink>
        </nav>
      </UCard>
    </aside>
    <UCard
      as="section"
      aria-labelledby="community-excerpts-heading"
      class="lg:col-start-1"
      :ui="{ body: 'p-0 sm:p-0' }"
    >
      <template #header>
        <h2
          id="community-excerpts-heading"
          class="text-highlighted flex items-center gap-2 font-semibold"
        >
          <UIcon name="i-lucide-message-circle" class="text-primary size-5" />
          社区摘录
        </h2>
        <span class="text-muted text-xs"> {{ comments.length }} 条评价 </span>
      </template>
      <ul class="grid md:grid-cols-2">
        <li
          v-for="item in comments"
          :key="item.user.description"
          class="border-muted border-b p-5 last:border-b-0 md:odd:border-e md:odd:nth-last-2:border-b-0"
        >
          <blockquote class="text-sm/6">{{ item.quote }}</blockquote>
          <p class="text-muted mt-3 flex items-center gap-2 text-xs">
            <UAvatar
              :src="item.user.avatar.src"
              :alt="item.user.name"
              size="xs"
              loading="lazy"
            />
            {{ item.user.name }} · {{ item.user.description }}
          </p>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>
