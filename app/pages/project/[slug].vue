<script lang="ts" setup>
import { DateTime } from 'luxon'
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
const slug = computed(() => String(route.params.slug))

const { data, status, refresh } = await useLazyFetch<ProjectPageData>(
  () => `/api/project/${slug.value}`,
)

const seoTitle = computed(
  () =>
    data.value?.github.info.description?.trim() ||
    `${data.value?.project.name || slug.value} 中文文档`,
)

const projectTitle = computed(
  () =>
    seoTitle.value.replace(/\s*中文文档$/, '') ||
    data.value?.project.name ||
    slug.value,
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
      icon: 'i-lucide-star',
      detail: '社区关注',
    },
    {
      label: 'Forks',
      value: formatNumber(info.forks),
      icon: 'i-lucide-git-fork',
      detail: '派生协作',
    },
    {
      label: 'Issues',
      value: formatNumber(info.openIssues),
      icon: 'i-lucide-circle-dashed',
      detail: '开放议题',
    },
    {
      label: 'Pull Requests',
      value: formatNumber(info.openPullRequests),
      icon: 'i-lucide-git-pull-request',
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
      icon: 'i-lucide-code',
    },
    {
      label: '默认分支',
      value: info.defaultBranch,
      icon: 'i-lucide-git-branch',
    },
    {
      label: '开源协议',
      value: info.license,
      icon: 'i-lucide-file-badge',
    },
    {
      label: '仓库大小',
      value: formatRepoSize(info.size),
      icon: 'i-lucide-database',
    },
    {
      label: '最近推送',
      value: formatDate(info.pushedAt),
      icon: 'i-lucide-upload',
    },
    {
      label: '创建时间',
      value: formatDate(info.createdAt),
      icon: 'i-lucide-calendar-plus',
    },
    {
      label: '最后更新',
      value: formatDate(info.updatedAt),
      icon: 'i-lucide-refresh-cw',
    },
    {
      label: 'Fork 网络',
      value: info.networkCount ? formatNumber(info.networkCount) : '',
      icon: 'i-lucide-network',
    },
    {
      label: '订阅者',
      value: info.watchers ? formatNumber(info.watchers) : '',
      icon: 'i-lucide-eye',
    },
  ].filter((fact) => fact.value)
})

const documentSections = computed(() => {
  const sections = [
    { title: '贡献指南', content: data.value?.project.contributing },
    { title: 'README', content: data.value?.project.readme },
  ]
  return sections
    .filter((section) => section.content)
    .map((section) => ({
      ...section,
      showTitle:
        section.content
          ?.trimStart()
          .match(/^#{1,6}\s+([^\n]+)/)?.[1]
          ?.trim() !== section.title,
    }))
})

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return ''
  const date = DateTime.fromISO(dateStr).setZone('Asia/Shanghai')
  return date.isValid ? date.toFormat('yyyy-MM-dd') : ''
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
  <UContainer class="py-5">
    <ULink
      to="/project"
      class="text-muted mb-4 inline-flex items-center gap-1.5 text-sm"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      项目目录
    </ULink>
    <template v-if="data">
      <div class="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div class="min-w-0 space-y-5">
          <UCard as="section">
            <div
              class="flex flex-col items-start gap-4 xl:flex-row xl:justify-between"
            >
              <div class="flex min-w-0 flex-1 items-center gap-3.5">
                <img
                  :src="`/images/project/${slug}.svg`"
                  alt=""
                  class="border-default size-14 shrink-0 rounded-md border bg-white object-contain p-2.5"
                />
                <div class="min-w-0">
                  <h1
                    class="text-highlighted text-2xl font-bold tracking-tight wrap-break-word sm:text-3xl"
                  >
                    {{ projectTitle }}
                  </h1>
                  <p class="text-muted mt-1 text-sm/6">
                    {{ projectDescription }}
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-if="data.github.info.homepage"
                  :to="data.github.info.homepage"
                  target="_blank"
                  label="中文文档"
                  trailing-icon="i-lucide-arrow-up-right"
                />
                <UButton
                  v-if="data.project.upstream?.link"
                  :to="data.project.upstream.link"
                  target="_blank"
                  label="官方文档"
                  variant="outline"
                />
                <UButton
                  :to="data.github.info.htmlUrl"
                  target="_blank"
                  aria-label="GitHub 仓库"
                  icon="i-lucide-github"
                  variant="outline"
                />
              </div>
            </div>
            <div
              v-if="data.github.info.topics.length"
              class="mt-4 flex flex-wrap gap-2"
            >
              <UBadge
                v-for="topic in data.github.info.topics"
                :key="topic"
                color="neutral"
              >
                {{ topic }}
              </UBadge>
            </div>
            <template #footer>
              <dl class="flex flex-wrap gap-x-6 gap-y-2 text-sm tabular-nums">
                <div
                  v-for="metric in metricBlocks"
                  :key="metric.label"
                  :title="metric.detail"
                  class="flex items-center gap-1.5"
                >
                  <dt class="text-muted flex items-center gap-1.5">
                    <UIcon :name="metric.icon" class="size-4" />
                    {{ metric.label }}
                  </dt>
                  <dd class="text-highlighted font-semibold">
                    {{ metric.value }}
                  </dd>
                </div>
              </dl>
            </template>
          </UCard>
          <UCard
            v-for="section in documentSections"
            :key="section.title"
            as="section"
          >
            <template v-if="section.showTitle" #header>
              <h2 class="text-highlighted font-semibold">
                {{ section.title }}
              </h2>
            </template>
            <MDC
              v-if="section.content"
              :value="section.content"
              tag="article"
              class="max-w-3xl min-w-0 wrap-break-word"
            />
          </UCard>
          <UCard v-if="!documentSections.length" as="section">
            <p class="text-muted text-sm">
              本站暂未收录此项目的 README 与贡献指南，可前往文档或仓库查阅。
            </p>
          </UCard>
          <UCard
            v-if="data.github.releases.length"
            as="section"
            :ui="{ body: 'p-0 sm:p-0' }"
          >
            <template #header>
              <h2 class="text-highlighted font-semibold">最新版本</h2>
            </template>
            <ul class="divide-muted divide-y">
              <li
                v-for="release in data.github.releases"
                :key="release.tagName"
                class="p-4 sm:px-5"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <ULink
                    :to="release.htmlUrl"
                    target="_blank"
                    class="text-primary min-w-0 font-semibold wrap-anywhere"
                  >
                    {{ release.name || release.tagName }}
                  </ULink>
                  <UBadge v-if="release.prerelease" color="warning">
                    预发布
                  </UBadge>
                  <UBadge v-if="release.draft" color="neutral">草稿</UBadge>
                  <span v-if="release.assetsCount" class="text-muted text-xs">
                    资产 {{ release.assetsCount }}
                  </span>
                  <span
                    v-if="release.downloadsCount"
                    class="text-muted text-xs"
                  >
                    下载 {{ release.downloadsCount }}
                  </span>
                  <time
                    :datetime="release.publishedAt"
                    class="text-muted ms-auto text-xs tabular-nums"
                  >
                    {{ formatDate(release.publishedAt) }}
                  </time>
                </div>
                <p
                  v-if="release.bodyExcerpt"
                  class="text-muted mt-2 max-w-3xl text-sm/6 wrap-anywhere"
                >
                  {{ release.bodyExcerpt }}
                </p>
              </li>
            </ul>
          </UCard>
        </div>
        <aside class="min-w-0 space-y-4">
          <UCard>
            <template #header><h2 class="font-semibold">仓库资料</h2></template>
            <dl class="space-y-3 text-sm">
              <div
                v-for="fact in repositoryFacts"
                :key="fact.label"
                class="flex justify-between gap-2"
              >
                <dt class="text-muted shrink-0">{{ fact.label }}</dt>
                <dd class="text-end wrap-anywhere tabular-nums">
                  {{ fact.value }}
                </dd>
              </div>
            </dl>
          </UCard>
          <UCard v-if="data.github.contributors.length">
            <template #header><h2 class="font-semibold">贡献者</h2></template>
            <div class="flex flex-wrap gap-2">
              <ULink
                v-for="user in data.github.contributors"
                :key="user.login"
                :to="user.html_url"
                target="_blank"
                :title="`${user.login} · ${user.contributions} 次贡献`"
              >
                <UAvatar
                  :src="user.avatar_url"
                  :alt="user.login"
                  size="sm"
                  loading="lazy"
                />
              </ULink>
            </div>
          </UCard>
          <UCard v-if="data.github.languages.length">
            <template #header><h2 class="font-semibold">语言分布</h2></template>
            <ul class="space-y-3">
              <li
                v-for="language in data.github.languages.slice(0, 6)"
                :key="language.name"
              >
                <div class="mb-1.5 flex justify-between text-sm">
                  <span>{{ language.name }}</span>
                  <span class="text-muted tabular-nums">
                    {{ language.percent }}%
                  </span>
                </div>
                <progress
                  :value="language.percent"
                  max="100"
                  :aria-label="language.name"
                  class="bg-elevated accent-primary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-elevated [&::-webkit-progress-value]:bg-primary block h-1.5 w-full overflow-hidden rounded-full"
                ></progress>
              </li>
            </ul>
          </UCard>
        </aside>
      </div>
    </template>
    <UCard v-else-if="status === 'error'" role="status">
      <h1 class="text-xl font-semibold">项目加载失败或不存在</h1>
      <UButton
        label="重新加载"
        class="mt-3"
        variant="outline"
        @click="refresh()"
      />
    </UCard>
    <USkeleton v-else class="h-32 w-full" aria-label="正在加载项目" />
  </UContainer>
</template>
