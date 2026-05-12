<script lang="ts" setup>
interface ProjectPageData {
  project: {
    name: string
    description: string
    contributing?: string
    readme?: string
    upstream?: {
      link?: string
    }
  }
  github: {
    info: {
      stars: number
      forks: number
      openIssues: number
      openPullRequests: number | null
      watchers: number
      homepage: string | null
      htmlUrl: string
      description: string | null
      license: string | null
      language: string | null
      topics: string[]
      defaultBranch: string | null
      size: number
      networkCount: number
      createdAt: string
      pushedAt: string
      updatedAt: string
    }
    languages: Array<{
      name: string
      percent: number
    }>
    contributors: Array<{
      login: string
      avatar_url: string
      html_url: string
      contributions: number
    }>
    releases: Array<{
      name: string | null
      tagName: string
      publishedAt: string
      htmlUrl: string
      bodyExcerpt: string
      prerelease: boolean
      draft: boolean
      assetsCount: number
      downloadsCount: number
    }>
  }
}

const route = useRoute()
const slug = route.params.slug as string

const { data, status } = await useFetch<ProjectPageData>(
  `/api/projects/${slug}`,
)

const seoTitle = computed(
  () =>
    data.value?.github.info.description?.trim() ||
    `${data.value?.project.name || slug} 中文文档`,
)

const projectTitle = computed(
  () =>
    seoTitle.value.replace(/\s*中文文档$/, '') ||
    data.value?.project.name ||
    slug,
)

const projectDescription = computed(
  () =>
    data.value?.project.description ||
    data.value?.github.info.description ||
    '项目详情',
)

useSeoMeta({
  title: () => seoTitle.value,
  description: () => projectDescription.value,
})

const metricBlocks = computed(() => {
  const info = data.value?.github.info

  if (!info) {
    return []
  }

  return [
    {
      label: 'Stars',
      value: formatNumber(info.stars),
      icon: 'tabler:star',
      detail: '社区关注',
    },
    {
      label: 'Forks',
      value: formatNumber(info.forks),
      icon: 'tabler:git-fork',
      detail: '派生协作',
    },
    {
      label: 'Issues',
      value: formatNumber(info.openIssues),
      icon: 'tabler:circle-dashed',
      detail: '开放议题',
    },
    {
      label: 'Pull Requests',
      value: formatNumber(info.openPullRequests),
      icon: 'tabler:git-pull-request',
      detail: '等待合并',
    },
  ]
})

const repositoryFacts = computed(() => {
  const info = data.value?.github.info

  if (!info) {
    return []
  }

  return [
    {
      label: '主要语言',
      value: info.language,
      icon: 'tabler:code',
    },
    {
      label: '默认分支',
      value: info.defaultBranch,
      icon: 'tabler:git-branch',
    },
    {
      label: '开源协议',
      value: info.license,
      icon: 'tabler:license',
    },
    {
      label: '仓库大小',
      value: formatRepoSize(info.size),
      icon: 'tabler:database',
    },
    {
      label: '最近推送',
      value: formatDate(info.pushedAt),
      icon: 'tabler:upload',
    },
    {
      label: '创建时间',
      value: formatDate(info.createdAt),
      icon: 'tabler:calendar-plus',
    },
    {
      label: '最后更新',
      value: formatDate(info.updatedAt),
      icon: 'tabler:refresh',
    },
    {
      label: 'Fork 网络',
      value: info.networkCount ? formatNumber(info.networkCount) : '',
      icon: 'tabler:network',
    },
    {
      label: '订阅者',
      value: info.watchers ? formatNumber(info.watchers) : '',
      icon: 'tabler:eye',
    },
  ].filter((fact) => fact.value)
})

const latestRelease = computed(() => data.value?.github.releases?.[0])

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)

  if (Number.isNaN(d.getTime())) {
    return ''
  }

  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '—'
  return new Intl.NumberFormat('zh-CN').format(value)
}

const formatRepoSize = (sizeInKb: number | null | undefined) => {
  if (!sizeInKb) return ''
  if (sizeInKb >= 1024) return `${(sizeInKb / 1024).toFixed(1)} MB`
  return `${sizeInKb} KB`
}
</script>

<template>
  <div class="bg-default relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--ui-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--ui-border-muted)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20"
    />

    <template v-if="data">
      <section class="relative">
        <UContainer class="py-12 lg:py-16">
          <div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div class="mb-6 flex flex-wrap items-center gap-3">
                <UButton
                  to="/projects"
                  label="返回项目索引"
                  icon="tabler:arrow-left"
                  color="neutral"
                  variant="ghost"
                  class="rounded-xs"
                />

                <div
                  class="border-muted bg-default text-muted inline-flex items-center border px-3 py-2 font-mono text-xs tracking-[0.22em]"
                >
                  PROJECT FILE / {{ data.project.name.toUpperCase() }}
                </div>
              </div>

              <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
                <img
                  :src="`/images/projects/${slug}.svg`"
                  :alt="`${data.project.name} logo`"
                  class="border-muted bg-elevated size-24 shrink-0 border object-contain p-0 sm:size-32 lg:size-36"
                />
                <div>
                  <h1
                    class="text-highlighted font-serif text-5xl leading-tight font-black sm:text-6xl lg:text-7xl"
                  >
                    {{ projectTitle }}
                  </h1>
                  <p class="text-toned mt-6 max-w-3xl text-lg leading-8">
                    {{ projectDescription }}
                  </p>
                </div>
              </div>

              <div
                v-if="data.github.info.topics?.length"
                class="mt-8 flex flex-wrap gap-2"
              >
                <UBadge
                  v-for="topic in data.github.info.topics"
                  :key="topic"
                  color="neutral"
                  variant="subtle"
                  class="rounded-xs font-mono"
                >
                  {{ topic }}
                </UBadge>
              </div>
            </div>

            <div
              class="border-muted bg-default border shadow-[0_22px_70px_-58px_var(--ui-text)]"
            >
              <div
                class="border-muted bg-default flex items-center justify-between border-b px-4 py-3"
              >
                <span class="text-muted font-mono text-xs tracking-[0.24em]"
                  >ENTRY POINTS</span
                >
                <span class="text-dimmed font-mono text-xs">OPEN</span>
              </div>
              <div class="divide-muted flex flex-col divide-y">
                <UButton
                  :to="data.github.info.homepage || data.project.upstream?.link"
                  target="_blank"
                  label="中文文档"
                  icon="tabler:external-link"
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  class="bg-default text-highlighted hover:bg-elevated justify-start rounded-none px-5 py-4"
                />
                <UButton
                  :to="data.project.upstream?.link"
                  target="_blank"
                  label="官方文档"
                  icon="tabler:world"
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  class="bg-default justify-start rounded-none px-5 py-4"
                />
                <UButton
                  :to="data.github.info.htmlUrl"
                  target="_blank"
                  label="GitHub 仓库"
                  icon="tabler:brand-github"
                  color="neutral"
                  variant="ghost"
                  size="lg"
                  class="bg-default justify-start rounded-none px-5 py-4"
                />
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <section class="relative">
        <UContainer>
          <div
            class="border-muted bg-border grid gap-px border sm:grid-cols-2 lg:grid-cols-4"
          >
            <div
              v-for="metric in metricBlocks"
              :key="metric.label"
              class="bg-default px-5 py-6 sm:px-6"
            >
              <div class="mb-5 flex items-center justify-between gap-4">
                <p class="text-muted font-mono text-xs tracking-[0.2em]">
                  {{ metric.label }}
                </p>
                <UIcon :name="metric.icon" class="text-dimmed size-4" />
              </div>
              <div class="text-highlighted font-mono text-4xl font-semibold">
                {{ metric.value }}
              </div>
              <p class="text-muted mt-3 text-sm">
                {{ metric.detail }}
              </p>
            </div>
          </div>
        </UContainer>
      </section>

      <section class="relative py-12 lg:py-16">
        <UContainer>
          <div
            class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
          >
            <main class="flex min-w-0 flex-col gap-8">
              <section
                v-if="data.project.contributing !== undefined"
                class="border-muted bg-default border"
              >
                <div class="border-muted bg-default border-b px-5 py-4">
                  <p class="text-muted font-mono text-xs tracking-[0.24em]">
                    CONTRIBUTING
                  </p>
                  <h2 class="text-highlighted mt-4 text-2xl font-semibold">
                    贡献指南
                  </h2>
                </div>
                <div class="bg-default p-5 sm:p-7">
                  <div class="project-markdown">
                    <MDC
                      v-if="data.project.contributing"
                      :value="data.project.contributing"
                      tag="article"
                    />
                    <p v-else class="text-muted text-sm">
                      当前项目暂未收录贡献指南内容。
                    </p>
                  </div>
                </div>
              </section>

              <section
                v-if="data.project.readme !== undefined"
                class="border-muted bg-default border"
              >
                <div class="border-muted bg-default border-b px-5 py-4">
                  <p class="text-muted font-mono text-xs tracking-[0.24em]">
                    README
                  </p>
                  <h2 class="text-highlighted mt-4 text-2xl font-semibold">
                    项目说明
                  </h2>
                </div>
                <div class="bg-default p-5 sm:p-7">
                  <div class="project-markdown">
                    <MDC
                      v-if="data.project.readme"
                      :value="data.project.readme"
                      tag="article"
                    />
                    <p v-else class="text-muted text-sm">
                      当前项目暂未收录 README 内容。
                    </p>
                  </div>
                </div>
              </section>

              <section
                v-if="data.github.releases?.length"
                class="border-muted bg-default border"
              >
                <div
                  class="border-muted bg-default flex items-center justify-between gap-4 border-b px-5 py-4"
                >
                  <div>
                    <p class="text-muted font-mono text-xs tracking-[0.24em]">
                      RELEASES
                    </p>
                    <h2 class="text-highlighted mt-4 text-2xl font-semibold">
                      最新版本
                    </h2>
                  </div>
                  <p
                    v-if="latestRelease"
                    class="text-dimmed hidden font-mono text-xs sm:block"
                  >
                    {{ latestRelease.tagName }}
                  </p>
                </div>

                <div class="divide-muted divide-y">
                  <article
                    v-for="release in data.github.releases"
                    :key="release.tagName"
                    class="bg-default hover:bg-elevated p-5 transition-colors"
                  >
                    <div
                      class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div class="min-w-0 flex-1">
                        <NuxtLink
                          :to="release.htmlUrl"
                          target="_blank"
                          class="text-highlighted hover:text-primary inline-flex items-center gap-2 font-semibold"
                        >
                          {{ release.name || release.tagName }}
                          <UIcon name="tabler:arrow-up-right" class="size-4" />
                        </NuxtLink>
                        <div class="mt-3 flex flex-wrap gap-2">
                          <UBadge
                            v-if="release.prerelease"
                            color="warning"
                            variant="subtle"
                            class="rounded-xs"
                          >
                            预发布
                          </UBadge>
                          <UBadge
                            v-if="release.draft"
                            color="neutral"
                            variant="subtle"
                            class="rounded-xs"
                          >
                            草稿
                          </UBadge>
                          <UBadge
                            v-if="release.assetsCount"
                            color="neutral"
                            variant="subtle"
                            class="rounded-xs"
                          >
                            资产 {{ formatNumber(release.assetsCount) }}
                          </UBadge>
                          <UBadge
                            v-if="release.downloadsCount"
                            color="neutral"
                            variant="subtle"
                            class="rounded-xs"
                          >
                            下载 {{ formatNumber(release.downloadsCount) }}
                          </UBadge>
                        </div>
                      </div>
                      <span class="text-dimmed shrink-0 font-mono text-xs">
                        {{ formatDate(release.publishedAt) }}
                      </span>
                    </div>
                    <p
                      v-if="release.bodyExcerpt"
                      class="text-muted mt-5 text-sm leading-7"
                    >
                      {{ release.bodyExcerpt }}
                    </p>
                  </article>
                </div>
              </section>
            </main>

            <aside class="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24">
              <section class="border-muted bg-default border">
                <div class="border-muted bg-default border-b px-5 py-4">
                  <p class="text-muted font-mono text-xs tracking-[0.24em]">
                    REPOSITORY
                  </p>
                  <h2 class="text-highlighted mt-4 text-xl font-semibold">
                    仓库档案
                  </h2>
                </div>
                <dl class="divide-muted divide-y">
                  <div
                    v-for="fact in repositoryFacts"
                    :key="fact.label"
                    class="bg-default flex items-start justify-between gap-4 px-5 py-4 text-sm"
                  >
                    <dt class="text-muted flex items-center gap-2">
                      <UIcon :name="fact.icon" class="text-dimmed size-4" />
                      {{ fact.label }}
                    </dt>
                    <dd class="text-highlighted text-right font-mono text-xs">
                      {{ fact.value }}
                    </dd>
                  </div>
                </dl>
              </section>

              <section
                v-if="data.github.contributors?.length"
                class="border-muted bg-default border"
              >
                <div class="border-muted bg-default border-b px-5 py-4">
                  <p class="text-muted font-mono text-xs tracking-[0.24em]">
                    CONTRIBUTORS
                  </p>
                  <h2 class="text-highlighted mt-4 text-xl font-semibold">
                    贡献者墙
                  </h2>
                </div>
                <div class="bg-default p-5">
                  <div class="flex flex-wrap gap-2">
                    <NuxtLink
                      v-for="user in data.github.contributors"
                      :key="user.login"
                      :to="user.html_url"
                      target="_blank"
                      :title="`${user.login} (${user.contributions} contributions)`"
                    >
                      <UAvatar
                        :src="user.avatar_url"
                        :alt="user.login"
                        size="md"
                        class="ring-muted ring-1"
                      />
                    </NuxtLink>
                  </div>
                </div>
              </section>

              <section
                v-if="data.github.languages?.length"
                class="border-muted bg-default border"
              >
                <div class="border-muted bg-default border-b px-5 py-4">
                  <p class="text-muted font-mono text-xs tracking-[0.24em]">
                    LANGUAGES
                  </p>
                  <h2 class="text-highlighted mt-4 text-xl font-semibold">
                    语言分布
                  </h2>
                </div>
                <div class="divide-muted divide-y">
                  <div
                    v-for="language in data.github.languages.slice(0, 6)"
                    :key="language.name"
                    class="bg-default px-5 py-4"
                  >
                    <div
                      class="mb-2 flex items-center justify-between gap-4 text-sm"
                    >
                      <div
                        class="text-highlighted flex items-center gap-2 font-medium"
                      >
                        <span class="bg-primary size-2" />
                        {{ language.name }}
                      </div>
                      <div class="text-muted font-mono text-xs">
                        {{ language.percent }}%
                      </div>
                    </div>
                    <div class="bg-muted h-1.5 overflow-hidden">
                      <div
                        class="bg-primary h-full transition-all"
                        :style="{ width: `${Math.max(language.percent, 3)}%` }"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </UContainer>
      </section>
    </template>

    <UContainer v-else-if="status === 'error'" class="relative py-20">
      <div class="border-muted bg-default border">
        <div class="bg-default px-6 py-16 text-center">
          <UIcon
            name="tabler:alert-triangle"
            class="text-dimmed mx-auto mb-4 size-12"
          />
          <h2 class="text-highlighted text-xl font-semibold">
            项目加载失败或不存在
          </h2>
          <p class="text-muted mt-3 text-sm">当前项目档案暂时无法读取。</p>
          <UButton
            to="/projects"
            label="返回项目列表"
            icon="tabler:arrow-left"
            class="mt-6 rounded-xs"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
