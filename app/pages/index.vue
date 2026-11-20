<script setup lang="ts">
useHead({ titleTemplate: '%s' })
useSeoMeta({
  title: '简中文档 - 由社区提供支持的中文文档',
  description:
    '由开源社区提供支持的中文技术文档，帮助中文开发者更稳定地查阅优质开源项目文档。',
})

const homeTitle = useTemplateRef<HTMLHeadingElement>('home-title')
const homeLogoDocked = useState('home-logo-docked', () => false)
const { y: scrollY } = useWindowScroll()
const logoTravel = ref(0)
const dockedScale = ref(1)

function measureLogo() {
  const title = homeTitle.value
  const headerLogo = document.querySelector<HTMLElement>(
    'header [data-header-logo]',
  )
  if (!title || !headerLogo) return

  const start = title.getBoundingClientRect()
  const end = headerLogo.getBoundingClientRect()
  logoTravel.value = window.scrollY + start.top - end.top
  dockedScale.value = end.width / start.width
}

onMounted(measureLogo)
useResizeObserver(homeTitle, measureLogo)
useEventListener('resize', measureLogo, { passive: true })

const logoProgress = computed(() => {
  if (logoTravel.value <= 0) return 0
  return Math.min(1, Math.max(0, scrollY.value / logoTravel.value))
})
const logoScale = computed(
  () => 1 + logoProgress.value * (dockedScale.value - 1),
)

watchEffect(() => {
  homeLogoDocked.value = logoProgress.value === 1
})
onBeforeUnmount(() => {
  homeLogoDocked.value = false
})

const { data: projects, status } = useFetch<ProjectInfo[]>('/api/project', {
  server: false,
  default: () => [],
})
const search = ref('')

function submitProjectSearch() {
  const keyword = search.value.trim()
  return navigateTo({
    path: '/project',
    query: keyword ? { q: keyword } : {},
  })
}

const featured = [
  { name: 'nuxt', title: 'Nuxt' },
  { name: 'tailwindcss', title: 'Tailwind CSS' },
  { name: 'mise', title: 'Mise' },
  { name: 'rolldown', title: 'Rolldown' },
  { name: 'hono', title: 'Hono' },
  { name: 'openclaw', title: 'OpenClaw' },
  { name: 'elysia', title: 'Elysia' },
  { name: 'bun', title: 'Bun' },
  { name: 'better-auth', title: 'Better Auth' },
  { name: 'deno', title: 'Deno' },
]
const featuredList = useTemplateRef<HTMLUListElement>('featured-list')
const { arrivedState, measure } = useScroll(featuredList)
useResizeObserver(featuredList, measure)

function scrollFeatured(direction: -1 | 1) {
  const list = featuredList.value
  const firstCard = list?.firstElementChild
  const secondCard = firstCard?.nextElementSibling
  if (!list || !firstCard || !secondCard) return

  const step =
    secondCard.getBoundingClientRect().left -
    firstCard.getBoundingClientRect().left
  list.scrollBy({ left: direction * step })
}

const guideChapters = [
  {
    label: '语言风格',
    description: '用词、语气与句式',
    to: '/docs/style/language',
    icon: 'i-lucide-pen-line',
  },
  {
    label: '中文排版',
    description: '中英文混排、标点和数字',
    to: '/docs/typography/overview',
    icon: 'i-lucide-type',
  },
  {
    label: '文档翻译',
    description: '从上游跟踪到译文校对',
    to: '/docs/translation/workflow',
    icon: 'i-lucide-languages',
  },
]
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
  <div class="space-y-10 pt-12 pb-8 sm:space-y-12 sm:pt-20">
    <UContainer as="section" aria-labelledby="home-title">
      <h1 id="home-title" ref="home-title" class="w-fit">
        <span class="sr-only">简中文档，开源项目的中文文档</span>
        <Logo
          large
          aria-hidden="true"
          class="pointer-events-none relative origin-top-left motion-safe:z-40 motion-safe:scale-(--home-logo-scale)"
          :class="{ invisible: homeLogoDocked }"
          :style="{ '--home-logo-scale': logoScale }"
        />
      </h1>
      <p class="text-muted mt-4 max-w-152 text-base/7 sm:text-lg/8">
        由开源社区维护的中文技术文档。查阅译文、官方原文和项目同步进度。
      </p>
      <form
        action="/project"
        role="search"
        class="mt-7 max-w-152"
        @submit.prevent="submitProjectSearch"
      >
        <label
          for="home-project-search"
          class="text-highlighted mb-2 block text-sm font-medium"
        >
          查找项目
        </label>
        <div class="flex gap-2">
          <UInput
            id="home-project-search"
            v-model="search"
            name="q"
            type="search"
            icon="i-lucide-search"
            placeholder="搜索项目名称或上游仓库"
            class="min-w-0 flex-1"
            :ui="{ base: 'min-h-11 rounded-lg' }"
          />
          <UButton
            type="submit"
            label="搜索"
            class="min-h-11 rounded-lg px-5"
          />
        </div>
      </form>
    </UContainer>

    <section aria-labelledby="featured-heading">
      <UContainer class="mb-3 flex min-h-9 items-center justify-between gap-3">
        <h2
          id="featured-heading"
          class="text-highlighted text-lg font-semibold tracking-tight sm:text-xl"
        >
          热门文档
        </h2>
        <div class="flex items-center gap-3 sm:gap-4">
          <div class="flex gap-1">
            <UButton
              aria-label="向左浏览热门文档"
              aria-controls="featured-projects"
              icon="i-lucide-chevron-left"
              color="neutral"
              variant="ghost"
              class="size-9 rounded-md"
              :disabled="arrivedState.left"
              @click="scrollFeatured(-1)"
            />
            <UButton
              aria-label="向右浏览热门文档"
              aria-controls="featured-projects"
              icon="i-lucide-chevron-right"
              color="neutral"
              variant="ghost"
              class="size-9 rounded-md"
              :disabled="arrivedState.right"
              @click="scrollFeatured(1)"
            />
          </div>
          <UButton
            to="/project"
            label="全部项目"
            trailing-icon="i-lucide-arrow-up-right"
            color="neutral"
            variant="ghost"
            class="gap-1 rounded-md font-normal"
          />
        </div>
      </UContainer>
      <ul
        id="featured-projects"
        ref="featured-list"
        class="grid w-full snap-x snap-proximity scroll-px-(--featured-gutter) scrollbar-none auto-cols-[min(16rem,72vw)] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-(--featured-gutter) pt-1 pb-2 [--featured-gutter:1rem] motion-reduce:scroll-auto sm:auto-cols-72 sm:[--featured-gutter:max(1.5rem,calc((100%-var(--ui-container))/2+1.5rem))] motion-safe:pointer-fine:[@media(hover:hover)]:py-4"
        :class="[
          'motion-safe:pointer-fine:[@media(hover:hover)]:*:*:transition-[scale,translate]',
          'motion-safe:pointer-fine:[@media(hover:hover)]:*:*:duration-360',
          'motion-safe:pointer-fine:[@media(hover:hover)]:*:*:ease-[cubic-bezier(0.22,1,0.36,1)]',
          'motion-safe:pointer-fine:*:hover:*:relative',
          'motion-safe:pointer-fine:*:hover:*:z-1',
          'motion-safe:pointer-fine:*:hover:*:scale-[1.12]',
          'motion-safe:pointer-fine:[@media(hover:hover)]:*:has-[~_li:hover]:*:translate-x-[-6%]',
          'motion-safe:pointer-fine:[@media(hover:hover)]:[&>li:hover~li>*]:translate-x-[6%]',
        ]"
      >
        <ProjectListRow
          v-for="project in featured"
          :key="project.name"
          :project="project"
          :preview-src="`/images/screenshot/${project.name}.webp`"
          featured
        />
      </ul>
    </section>

    <UContainer
      class="grid items-start gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]"
    >
      <section aria-labelledby="guide-heading" class="min-w-0">
        <div
          class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pb-3"
        >
          <h2
            id="guide-heading"
            class="text-highlighted text-lg font-semibold tracking-tight sm:text-xl"
          >
            中文技术写作指南
          </h2>
          <ULink
            to="/docs"
            class="text-primary inline-flex items-center gap-1 text-sm"
          >
            阅读指南
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </ULink>
        </div>
        <ul class="border-muted divide-muted divide-y border-y">
          <li v-for="chapter in guideChapters" :key="chapter.to">
            <ULink
              :to="chapter.to"
              class="group hover:bg-muted/60 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-1 py-3 transition-colors sm:px-2"
            >
              <span
                class="bg-muted text-primary grid size-9 place-items-center rounded-lg"
              >
                <UIcon :name="chapter.icon" class="size-4" />
              </span>
              <span class="min-w-0">
                <span
                  class="text-highlighted group-hover:text-primary block text-sm font-medium"
                >
                  {{ chapter.label }}
                </span>
                <span class="text-muted mt-0.5 block text-xs/5">
                  {{ chapter.description }}
                </span>
              </span>
              <UIcon
                name="i-lucide-chevron-right"
                class="text-muted group-hover:text-primary size-4"
              />
            </ULink>
          </li>
        </ul>
      </section>
      <ProjectStats
        :projects="projects"
        :status="status"
        class="overflow-hidden rounded-xl"
      />
    </UContainer>

    <UContainer as="section" aria-labelledby="community-excerpts-heading">
      <div
        class="border-muted mb-4 flex flex-wrap items-center justify-between gap-3 border-t pt-6"
      >
        <h2
          id="community-excerpts-heading"
          class="text-highlighted text-lg font-semibold tracking-tight sm:text-xl"
        >
          社区摘录
        </h2>
        <nav aria-label="社区链接" class="flex flex-wrap gap-2">
          <UButton
            v-for="link in community"
            :key="link.to"
            :to="link.to"
            :target="link.to.startsWith('https:') ? '_blank' : undefined"
            :icon="link.icon"
            :label="link.label"
            color="neutral"
            variant="outline"
            class="rounded-lg"
          />
        </nav>
      </div>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in comments"
          :key="item.user.description"
          class="border-muted flex flex-col justify-between rounded-xl border p-4 sm:p-5"
        >
          <blockquote class="text-sm/6">{{ item.quote }}</blockquote>
          <p class="text-muted mt-4 flex items-center gap-2 text-xs">
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
    </UContainer>
  </div>
</template>
