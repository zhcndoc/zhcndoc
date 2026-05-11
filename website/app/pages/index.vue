<script setup lang="ts">
type FeaturedProject = Pick<ProjectInfo, 'description' | 'link' | 'name' | 'stars' | 'forks'> & {
  title: string
}

type GsapInstance = typeof import('gsap').gsap
type ScrollTriggerPlugin = typeof import('gsap/ScrollTrigger').ScrollTrigger

useHead({
  titleTemplate: '%s',
})

useSeoMeta({
  title: '简中文档 - 由社区提供支持的中文文档',
  description:
    '由开源社区提供支持的中文技术文档，帮助中文开发者更稳定地查阅优质开源项目文档。',
})

const homeRoot = ref<HTMLElement | null>(null)

const { data: projects, status: projectsStatus, error: projectsError } = useFetch<ProjectInfo[]>(
  '/api/projects',
  {
    default: () => [],
    server: false,
  },
)

const featuredOrder = ['nuxt', 'vue', 'vite', 'bun', 'nitro', 'tailwindcss']

const fallbackFeatured: FeaturedProject[] = [
  {
    name: 'nuxt',
    title: 'Nuxt',
    description: 'Vue 全栈框架的中文文档入口。',
    link: '/projects/nuxt',
    stars: 0,
    forks: 0,
  },
  {
    name: 'vue',
    title: 'Vue',
    description: '渐进式 JavaScript 框架的中文资料。',
    link: '/projects/vue',
    stars: 0,
    forks: 0,
  },
  {
    name: 'vite',
    title: 'Vite',
    description: '现代前端工具链的中文文档索引。',
    link: '/projects/vite',
    stars: 0,
    forks: 0,
  },
  {
    name: 'bun',
    title: 'Bun',
    description: 'JavaScript 运行时与工具链中文入口。',
    link: '/projects/bun',
    stars: 0,
    forks: 0,
  },
  {
    name: 'nitro',
    title: 'Nitro',
    description: '服务端运行时的中文文档卷宗。',
    link: '/projects/nitro',
    stars: 0,
    forks: 0,
  },
  {
    name: 'tailwindcss',
    title: 'Tailwind CSS',
    description: '实用优先 CSS 框架的中文资料。',
    link: '/projects/tailwindcss',
    stars: 0,
    forks: 0,
  },
]

const comments = [
  {
    quote: `这文档真是我的开发好帮手，从基础概念到高阶应用都讲得透彻，特别是那些实战案例，每次卡壳的时候总能在这里找到灵感。`,
    user: {
      name: 'Liang',
      description: '@lianginx',
      avatar: {
        src: 'https://mark.ikxin.com/github/lianginx',
      },
    },
  },
  {
    quote: `国内服务器的加载速度就像本地文件一样流畅，文档结构设计得很贴心，每次我需要某个方案时，总能快速定位到想要的内容。`,
    user: {
      name: '馬腊咯稽',
      description: '@ElementRef',
      avatar: {
        src: 'https://mark.ikxin.com/github/ElementRef',
      },
    },
  },
  {
    quote: `开源技术指南整合得很系统，上周调试后端接口时，按着指南操作一次就成功了，同事也来问我要链接。`,
    user: {
      name: 'libchaos',
      description: '@libchaos',
      avatar: {
        src: 'https://mark.ikxin.com/github/libchaos',
      },
    },
  },
  {
    quote: `作为一个转行过来的程序员，这里的实例分析像同事在旁边讲重点，原本两周才能消化的新框架现在三天就能上手。`,
    user: {
      name: 'Ali_Eljerrari',
      description: '@ali-eljerrari',
      avatar: {
        src: 'https://mark.ikxin.com/github/ali-eljerrari',
      },
    },
  },
  {
    quote: `最近把这个网站设为浏览器首页了，知识点覆盖全面，更新推送也及时，现在写代码遇到瓶颈会先来这里找思路。`,
    user: {
      name: 'Yu Hengliang',
      description: '@yuhengliang',
      avatar: {
        src: 'https://mark.ikxin.com/github/yuhengliang',
      },
    },
  },
  {
    quote: `中文文档能做到这种专业程度实在难得，每个技术点都深入浅出，示例代码也方便复制到项目里调试。`,
    user: {
      name: 'David Muriithi',
      description: '@BarriosXJavier',
      avatar: {
        src: 'https://mark.ikxin.com/github/BarriosXJavier',
      },
    },
  },
]

const projectList = computed(() => projects.value ?? [])
const hasProjectData = computed(() => projectList.value.length > 0)
const hasProjectError = computed(() => Boolean(projectsError.value))

const totalStars = computed(() =>
  projectList.value.reduce((sum, project) => sum + project.stars, 0),
)
const totalForks = computed(() =>
  projectList.value.reduce((sum, project) => sum + project.forks, 0),
)
const documentEntryCount = computed(
  () => projectList.value.filter((project) => project.link || project.upstream?.link).length,
)

const statBlocks = computed(() => [
  {
    label: '项目卷宗',
    value: hasProjectData.value ? projectList.value.length : 55,
    suffix: hasProjectData.value ? '' : '+',
    detail: hasProjectData.value ? '实时读取项目索引' : '本地内容目录快照',
  },
  {
    label: 'Stars 合计',
    value: totalStars.value,
    suffix: '',
    detail: totalStars.value ? '来自 zhcndoc 组织仓库' : '等待 GitHub 数据',
  },
  {
    label: 'Forks 合计',
    value: totalForks.value,
    suffix: '',
    detail: totalForks.value ? '社区协作痕迹' : '等待 GitHub 数据',
  },
  {
    label: '文档入口',
    value: hasProjectData.value ? documentEntryCount.value : 55,
    suffix: '',
    detail: hasProjectData.value ? '实时读取可访问路径' : '等待项目索引',
  },
])

const featuredProjects = computed<FeaturedProject[]>(() => {
  const selected = featuredOrder
    .map((name) => projectList.value.find((project) => project.name === name))
    .filter((project): project is ProjectInfo => Boolean(project))
    .map((project) => ({
      description: project.description,
      forks: project.forks,
      link: project.link || `/projects/${project.name}`,
      name: project.name,
      stars: project.stars,
      title: cleanProjectTitle(project.title, project.name),
    }))

  return selected.length >= 4 ? selected : fallbackFeatured
})

const archiveSignals = ['DOCS', 'SYNC', 'UPSTREAM', 'README', 'ISSUE', 'RELEASE']

function cleanProjectTitle(title: string, name: string) {
  return title.replace(/\s*中文文档$/, '') || name
}

function formatNumber(value: number) {
  return value.toLocaleString('zh-CN')
}

function formatProjectMetric(value: number) {
  return value > 0 ? value.toLocaleString('zh-CN') : '待同步'
}

let cleanupAnimations: (() => void) | undefined

onMounted(() => {
  const root = homeRoot.value
  const { $gsap, $ScrollTrigger } = useNuxtApp() as unknown as {
    $ScrollTrigger: ScrollTriggerPlugin
    $gsap: GsapInstance
  }

  if (!root || !$gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const gsap = $gsap
  const ScrollTrigger = $ScrollTrigger
  let didAnimateCounts = false

  const animateCounts = () => {
    if (didAnimateCounts) {
      return
    }

    didAnimateCounts = true

    root.querySelectorAll<HTMLElement>('[data-zh-count]').forEach((element) => {
      const end = Number(element.dataset.zhCount || 0)
      const proxy = { value: 0 }

      gsap.to(proxy, {
        duration: 1.25,
        ease: 'power2.out',
        value: end,
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
        onUpdate() {
          element.textContent = Math.round(proxy.value).toLocaleString('zh-CN')
        },
      })
    })
  }

  const ctx = gsap.context(() => {
    gsap
      .timeline({ defaults: { duration: 0.8, ease: 'power3.out' } })
      .from('[data-zh-hero-kicker]', { autoAlpha: 0, y: 16 })
      .from('[data-zh-title-line]', { autoAlpha: 0, stagger: 0.08, yPercent: 90 }, '-=0.45')
      .from('[data-zh-hero-copy]', { autoAlpha: 0, y: 20 }, '-=0.35')
      .from('[data-zh-hero-actions]', { autoAlpha: 0, y: 18 }, '-=0.4')
      .from('[data-zh-archive-card]', { autoAlpha: 0, stagger: 0.05, y: 22 }, '-=0.45')

    gsap.utils.toArray<HTMLElement>('[data-zh-reveal]').forEach((element, index) => {
      gsap.from(element, {
        delay: (index % 4) * 0.04,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 96%',
          once: true,
        },
        y: 22,
      })
    })
  }, root)

  const mm = gsap.matchMedia()
  mm.add(
    '(min-width: 768px)',
    () => {
      gsap.to('[data-zh-parallax="wall"]', {
        ease: 'none',
        scrollTrigger: {
          end: 'bottom top',
          scrub: 1,
          start: 'top top',
          trigger: '[data-zh-hero]',
        },
        y: -38,
      })

      gsap.to('[data-zh-parallax="grid"]', {
        ease: 'none',
        scrollTrigger: {
          end: 'bottom top',
          scrub: 1.4,
          start: 'top top',
          trigger: root,
        },
        y: 70,
      })
    },
    root,
  )

  const stopCountWatcher = watch(
    () => projectsStatus.value,
    async (status) => {
      if (status === 'success' || status === 'error') {
        await nextTick()
        animateCounts()
        ScrollTrigger.refresh()
      }
    },
    { immediate: true },
  )

  cleanupAnimations = () => {
    stopCountWatcher()
    mm.revert()
    ctx.revert()
  }
})

onBeforeUnmount(() => {
  cleanupAnimations?.()
})
</script>

<template>
  <div ref="homeRoot" class="relative overflow-hidden bg-default">
    <div
      data-zh-parallax="grid"
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--ui-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--ui-border-muted)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20 mask-[linear-gradient(180deg,transparent,black_22%,black_72%,transparent)]"
    />

    <section data-zh-hero class="relative">
      <UContainer class="relative grid min-h-[calc(100svh-var(--ui-header-height))] items-center gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div class="relative z-10">
          <div
            data-zh-hero-kicker
            class="mb-6 inline-flex items-center border border-muted bg-default px-3 py-2 font-mono text-xs tracking-[0.22em] text-muted"
          >
            INDEX / OPEN SOURCE / 中文文档
          </div>

          <h1 class="overflow-hidden font-serif text-6xl font-black leading-[0.92] text-highlighted sm:text-7xl lg:text-8xl">
            <span data-zh-title-line class="block">简中文档</span>
          </h1>

          <p
            data-zh-hero-copy
            class="mt-8 max-w-2xl text-lg leading-8 text-toned sm:text-xl"
          >
            把散落在 GitHub、官方站点和社区维护仓库里的中文技术文档整理成一座可检索的开源档案库。
          </p>

          <div data-zh-hero-actions class="mt-9 flex flex-col gap-3 sm:flex-row">
            <UButton
              to="/projects"
              label="打开项目索引"
              trailing-icon="tabler:arrow-right"
              color="primary"
              size="xl"
              class="rounded-xs"
            />
            <UButton
              to="https://github.com/zhcndoc/zhcndoc"
              target="_blank"
              label="查看仓库"
              icon="tabler:brand-github"
              color="neutral"
              variant="outline"
              size="xl"
              class="rounded-xs"
            />
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-muted py-4 text-sm text-muted">
            <span class="font-mono tracking-[0.18em]">DOCS ARE PUBLIC INFRA</span>
            <span class="hidden h-px w-12 bg-border sm:block" />
            <span>中文入口、上游线索、同步状态，一并归档。</span>
          </div>
        </div>

        <div data-zh-parallax="wall" class="relative z-10">
          <div class="border border-muted bg-border p-px shadow-[0_34px_90px_-62px_var(--ui-text)]">
            <div class="flex items-center justify-between border-b border-muted bg-default px-4 py-3">
              <span class="font-mono text-xs tracking-[0.24em] text-muted">LIVE INDEX</span>
              <span class="font-mono text-xs text-dimmed">ZHCN-{{ featuredProjects.length }}</span>
            </div>
            <div class="grid gap-px bg-border sm:grid-cols-2">
              <NuxtLink
                v-for="(project, index) in featuredProjects"
                :key="project.name"
                data-zh-archive-card
                :to="`/projects/${project.name}`"
                class="group relative min-h-56 bg-default p-4 transition-colors after:pointer-events-none after:absolute after:bottom-3 after:right-3 after:size-1.75 after:border-b after:border-r after:border-accented after:opacity-0 after:transition-opacity hover:bg-elevated hover:after:opacity-100"
              >
                <div class="mb-6 flex items-start justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="`/images/projects/${project.name}.svg`"
                      :alt="`${project.title} logo`"
                      class="size-10 border border-muted bg-elevated object-contain p-1.5"
                      loading="lazy"
                    />
                    <div>
                      <h2 class="font-semibold text-highlighted">
                        {{ project.title }}
                      </h2>
                      <p class="font-mono text-xs text-dimmed">
                        {{ archiveSignals[index % archiveSignals.length] }}
                      </p>
                    </div>
                  </div>
                  <span class="font-mono text-xs text-dimmed">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>
                <p class="line-clamp-2 min-h-10 text-sm leading-5 text-muted">
                  {{ project.description }}
                </p>
                <div class="mt-6 flex items-center justify-between border-t border-muted pt-3 font-mono text-xs text-dimmed">
                  <span>ST {{ formatProjectMetric(project.stars) }}</span>
                  <span>FK {{ formatProjectMetric(project.forks) }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="relative border-y border-muted bg-elevated/30">
      <UContainer>
        <div class="grid gap-px bg-border md:grid-cols-4">
          <div
            v-for="stat in statBlocks"
            :key="stat.label"
            data-zh-reveal
            class="bg-default px-5 py-6 sm:px-6"
          >
            <p class="mb-5 font-mono text-xs tracking-[0.2em] text-muted">
              {{ stat.label }}
            </p>
            <div class="font-mono text-4xl font-semibold text-highlighted">
              <span :data-zh-count="stat.value">{{ formatNumber(stat.value) }}</span>{{ stat.suffix }}
            </div>
            <p class="mt-3 text-sm text-muted">
              {{ stat.detail }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="relative py-16 lg:py-24">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-zh-reveal>
            <p class="mb-4 font-mono text-xs tracking-[0.24em] text-muted">
              ARCHIVE METHOD
            </p>
            <h2 class="font-serif text-4xl font-black text-highlighted">
              不只是入口，更像一套文档整理方法。
            </h2>
          </div>

          <div class="grid gap-px border border-muted bg-border md:grid-cols-3">
            <article data-zh-reveal class="bg-default p-6">
              <span class="font-mono text-xs text-dimmed">01</span>
              <h3 class="mt-8 text-lg font-semibold text-highlighted">
                整理
              </h3>
              <p class="mt-3 text-sm leading-6 text-muted">
                对高频开源项目建立中文入口，优先保留技术上下文与原始结构。
              </p>
            </article>
            <article data-zh-reveal class="bg-default p-6">
              <span class="font-mono text-xs text-dimmed">02</span>
              <h3 class="mt-8 text-lg font-semibold text-highlighted">
                同步
              </h3>
              <p class="mt-3 text-sm leading-6 text-muted">
                记录上游入口、仓库状态与更新时间，降低访问和检索成本。
              </p>
            </article>
            <article data-zh-reveal class="bg-default p-6">
              <span class="font-mono text-xs text-dimmed">03</span>
              <h3 class="mt-8 text-lg font-semibold text-highlighted">
                对照
              </h3>
              <p class="mt-3 text-sm leading-6 text-muted">
                保留上游入口、仓库状态和同步线索，方便开发者确认资料新鲜度。
              </p>
            </article>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="relative border-y border-muted py-16 lg:py-24">
      <UContainer>
        <div class="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div data-zh-reveal>
            <p class="mb-4 font-mono text-xs tracking-[0.24em] text-muted">
              PROJECT FILES
            </p>
            <h2 class="font-serif text-4xl font-black text-highlighted">
              精选文档索引
            </h2>
          </div>
          <UButton
            data-zh-reveal
            to="/projects"
            label="查看全部项目"
            trailing-icon="tabler:arrow-right"
            color="neutral"
            variant="outline"
            class="w-fit rounded-xs"
          />
        </div>

        <div class="border border-muted bg-border">
          <NuxtLink
            v-for="(project, index) in featuredProjects"
            :key="project.name"
            data-zh-reveal
            :to="`/projects/${project.name}`"
            class="grid gap-px border-b border-muted bg-border last:border-b-0 lg:grid-cols-[88px_1fr_180px_120px]"
          >
            <div class="flex items-center bg-default px-5 py-4 font-mono text-sm text-dimmed">
              {{ String(index + 1).padStart(2, '0') }}
            </div>
            <div class="bg-default px-5 py-4">
              <h3 class="text-lg font-semibold text-highlighted">
                {{ project.title }}
              </h3>
              <p class="mt-1 text-sm text-muted">
                {{ project.description }}
              </p>
            </div>
            <div class="flex items-center bg-default px-5 py-4 font-mono text-sm text-muted">
              STARS / {{ formatProjectMetric(project.stars) }}
            </div>
            <div class="flex items-center justify-between bg-default px-5 py-4 text-sm text-muted">
              <span>打开</span>
              <UIcon name="tabler:arrow-up-right" class="size-4" />
            </div>
          </NuxtLink>
        </div>

        <p v-if="hasProjectError" class="mt-4 text-sm text-muted">
          GitHub 项目数据暂未取得，当前展示本地索引快照。
        </p>
      </UContainer>
    </section>

    <section class="relative py-16 lg:py-24">
      <UContainer>
        <div class="mb-10 max-w-2xl" data-zh-reveal>
          <p class="mb-4 font-mono text-xs tracking-[0.24em] text-muted">
            COMMUNITY NOTES
          </p>
          <h2 class="font-serif text-4xl font-black text-highlighted">
            社区摘录
          </h2>
          <p class="mt-4 text-muted">
            留下一点使用现场，而不是把首页变成夸张的证言墙。
          </p>
        </div>

        <div class="grid gap-px border border-muted bg-border md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="(testimonial, index) in comments"
            :key="testimonial.user.description"
            data-zh-reveal
            class="bg-default p-6"
          >
            <div class="mb-8 flex items-center justify-between border-b border-muted pb-3">
              <span class="font-mono text-xs text-dimmed">
                NOTE {{ String(index + 1).padStart(2, '0') }}
              </span>
              <UIcon name="tabler:quote" class="size-4 text-dimmed" />
            </div>
            <p class="min-h-28 text-sm leading-7 text-toned">
              {{ testimonial.quote }}
            </p>
            <div class="mt-8 border-t border-muted pt-4">
              <UUser v-bind="testimonial.user" size="md" />
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="relative pb-16 lg:pb-24">
      <UContainer>
        <div
          data-zh-reveal
          class="border border-muted bg-border p-px"
        >
          <div class="grid gap-px bg-border lg:grid-cols-[1fr_0.8fr]">
            <div class="bg-default p-6 sm:p-8">
              <p class="font-mono text-xs tracking-[0.24em] text-muted">
                NEXT ACTION
              </p>
              <h2 class="mt-6 font-serif text-4xl font-black text-highlighted">
                从一个项目开始查阅。
              </h2>
              <div class="mt-8 border border-muted bg-elevated/50 p-4 font-mono text-sm text-muted">
                <span class="text-primary">zhcndoc</span>
                <span class="text-dimmed"> / </span>
                open --index projects
              </div>
            </div>
            <div class="flex flex-col justify-end bg-default p-6 sm:p-8">
              <p class="mb-8 text-sm leading-7 text-muted">
                项目索引会带你进入中文文档、官方文档和上游仓库，适合查资料，也适合确认某个生态的文档维护状态。
              </p>
              <div class="flex flex-col gap-3 sm:flex-row">
                <UButton
                  to="/projects"
                  label="探索项目"
                  trailing-icon="tabler:arrow-right"
                  color="primary"
                  size="xl"
                  class="rounded-xs"
                />
                <UButton
                  to="/analytics"
                  label="查看统计"
                  icon="tabler:chart-bar"
                  color="neutral"
                  variant="outline"
                  size="xl"
                  class="rounded-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
