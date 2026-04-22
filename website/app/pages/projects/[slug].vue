<script lang="ts" setup>
interface ProjectPageData {
  project: {
    name: string
    description: string
    contributing?: string
    readme?: string
    type: string
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

useSeoMeta({
  title:
    data.value?.project?.type === 'ecosystem'
      ? `${data.value?.project?.name} - 生态项目`
      : `${data.value?.project?.name} - 中文文档`,
  description: data.value?.project?.description || '项目详情',
})

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
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
  <UContainer class="py-12">
    <!-- 骨架屏或加载中状态可以放到外部 Suspense，这里使用 status 处理也可以，但 nuxt 默认 Suspense 会阻塞直到 useFetch 完成 -->
    <div v-if="data" class="flex flex-col gap-8 md:flex-row md:items-start">
      <!-- 主内容区域 -->
      <div class="flex flex-1 flex-col gap-6">
        <div class="flex items-center gap-4">
          <div
            class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-neutral-800 dark:ring-gray-800"
          >
            <img
              :src="`/images/projects/${slug}.svg`"
              class="h-12 w-12 object-contain"
            />
          </div>
          <div>
            <h1
              class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            >
              {{ data.project.name }}
            </h1>
            <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">
              {{ data.github.info.description || data.project.description }}
            </p>
          </div>
        </div>

        <!-- 详细数据 Cards -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <UCard
            :ui="{
              body: 'flex flex-col items-center justify-center gap-1 p-4 sm:p-6',
            }"
          >
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Stars</span
            >
            <div
              class="flex items-center gap-1.5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <UIcon name="tabler:star-filled" class="text-yellow-400" />
              {{ formatNumber(data.github.info.stars) }}
            </div>
          </UCard>
          <UCard
            :ui="{
              body: 'flex flex-col items-center justify-center gap-1 p-4 sm:p-6',
            }"
          >
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Forks</span
            >
            <div
              class="flex items-center gap-1.5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <UIcon name="tabler:git-fork" class="text-primary-500" />
              {{ formatNumber(data.github.info.forks) }}
            </div>
          </UCard>
          <UCard
            :ui="{
              body: 'flex flex-col items-center justify-center gap-1 p-4 sm:p-6',
            }"
          >
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Issues</span
            >
            <div
              class="flex items-center gap-1.5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <UIcon name="tabler:exclamation-circle" class="text-red-500" />
              {{ formatNumber(data.github.info.openIssues) }}
            </div>
          </UCard>
          <UCard
            :ui="{
              body: 'flex flex-col items-center justify-center gap-1 p-4 sm:p-6',
            }"
          >
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Pull Requests</span
            >
            <div
              class="flex items-center gap-1.5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <UIcon name="tabler:git-pull-request" class="text-green-500" />
              {{ formatNumber(data.github.info.openPullRequests) }}
            </div>
          </UCard>
        </div>

        <div
          v-if="data.github.info.topics?.length"
          class="flex flex-wrap gap-2"
        >
          <UBadge
            v-for="topic in data.github.info.topics"
            :key="topic"
            color="neutral"
            variant="subtle"
          >
            {{ topic }}
          </UBadge>
        </div>

        <UCard v-if="data.project.contributing !== undefined">
          <template #header>
            <h3 class="flex items-center gap-2 text-lg font-semibold">
              <UIcon name="tabler:git-pull-request" /> 贡献指南
            </h3>
          </template>
          <div class="project-markdown">
            <MDC
              v-if="data.project.contributing"
              :value="data.project.contributing"
              tag="article"
            />
          </div>
        </UCard>

        <UCard v-if="data.project.readme !== undefined">
          <template #header>
            <h3 class="flex items-center gap-2 text-lg font-semibold">
              <UIcon name="tabler:file-description" /> README
            </h3>
          </template>
          <div class="project-markdown">
            <MDC
              v-if="data.project.readme"
              :value="data.project.readme"
              tag="article"
            />
          </div>
        </UCard>

        <!-- 发行版本 -->
        <UCard v-if="data.github.releases?.length" class="mt-4">
          <template #header>
            <h3 class="flex items-center gap-2 text-lg font-semibold">
              <UIcon name="tabler:tag" /> 最新的版本
            </h3>
          </template>
          <div class="flex flex-col gap-4">
            <div
              v-for="release in data.github.releases"
              :key="release.tagName"
              class="flex flex-col gap-3 rounded-2xl border border-gray-100 p-4 dark:border-neutral-800"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0 flex-1">
                  <NuxtLink
                    :to="release.htmlUrl"
                    target="_blank"
                    class="text-primary font-medium hover:underline"
                  >
                    {{ release.name || release.tagName }}
                  </NuxtLink>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <UBadge
                      v-if="release.prerelease"
                      color="warning"
                      variant="subtle"
                      >预发布</UBadge
                    >
                    <UBadge
                      v-if="release.draft"
                      color="neutral"
                      variant="subtle"
                      >草稿</UBadge
                    >
                    <UBadge
                      v-if="release.assetsCount"
                      color="neutral"
                      variant="subtle"
                    >
                      资产 {{ formatNumber(release.assetsCount) }}
                    </UBadge>
                    <UBadge
                      v-if="release.downloadsCount"
                      color="neutral"
                      variant="subtle"
                    >
                      下载 {{ formatNumber(release.downloadsCount) }}
                    </UBadge>
                  </div>
                </div>
                <span class="shrink-0 text-sm text-gray-500">{{
                  formatDate(release.publishedAt)
                }}</span>
              </div>
              <p
                v-if="release.bodyExcerpt"
                class="text-sm leading-6 text-gray-600 dark:text-gray-300"
              >
                {{ release.bodyExcerpt }}
              </p>
            </div>
          </div>
        </UCard>

      </div>

      <!-- 侧边栏 -->
      <div class="flex w-full shrink-0 flex-col gap-6 md:w-80">
        <UCard>
          <div class="flex flex-col gap-3">
            <UButton
              block
              label="中文文档"
              :to="data.github.info.homepage || data.project.upstream?.link"
              target="_blank"
              icon="tabler:external-link"
              size="lg"
            />
            <UButton
              block
              label="官方文档"
              :to="data.project.upstream?.link"
              target="_blank"
              color="neutral"
              variant="subtle"
              icon="tabler:world"
              size="lg"
            />
            <UButton
              block
              label="GitHub 仓库"
              :to="data.github.info.htmlUrl"
              target="_blank"
              color="neutral"
              variant="subtle"
              icon="tabler:brand-github"
              size="lg"
            />
          </div>

          <USeparator class="my-6" />

          <dl class="flex flex-col gap-4 text-sm">
            <div v-if="data.github.info.language" class="flex justify-between">
              <dt class="text-gray-500">主要语言</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                <div class="flex items-center gap-1.5">
                  <span class="bg-primary-500 h-2.5 w-2.5 rounded-full" />
                  {{ data.github.info.language }}
                </div>
              </dd>
            </div>
            <div
              v-if="data.github.info.defaultBranch"
              class="flex justify-between"
            >
              <dt class="text-gray-500">默认分支</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ data.github.info.defaultBranch }}
              </dd>
            </div>
            <div v-if="data.github.info.license" class="flex justify-between">
              <dt class="text-gray-500">开源协议</dt>
              <dd
                class="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white"
              >
                <UIcon name="tabler:license" />
                {{ data.github.info.license }}
              </dd>
            </div>
            <div v-if="data.github.info.size" class="flex justify-between">
              <dt class="text-gray-500">仓库大小</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatRepoSize(data.github.info.size) }}
              </dd>
            </div>
            <div v-if="data.github.info.pushedAt" class="flex justify-between">
              <dt class="text-gray-500">最近推送</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(data.github.info.pushedAt) }}
              </dd>
            </div>
            <div v-if="data.github.info.createdAt" class="flex justify-between">
              <dt class="text-gray-500">创建时间</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(data.github.info.createdAt) }}
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-500">最后更新</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(data.github.info.updatedAt) }}
              </dd>
            </div>
            <div
              v-if="data.github.info.networkCount"
              class="flex justify-between"
            >
              <dt class="text-gray-500">Fork 网络</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatNumber(data.github.info.networkCount) }}
              </dd>
            </div>
            <div v-if="data.github.info.watchers" class="flex justify-between">
              <dt class="text-gray-500">订阅者</dt>
              <dd class="font-medium text-gray-900 dark:text-white">
                {{ formatNumber(data.github.info.watchers) }}
              </dd>
            </div>
          </dl>
        </UCard>

        <!-- 贡献者墙 -->
        <UCard v-if="data.github.contributors?.length">
          <template #header>
            <h3 class="text-md flex items-center gap-2 font-semibold">
              <UIcon name="tabler:users" /> 贡献者墙
            </h3>
          </template>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="user in data.github.contributors"
              :key="user.login"
              :to="user.html_url"
              target="_blank"
              :title="`${user.login} (${user.contributions} contributions)`"
            >
              <UAvatar :src="user.avatar_url" :alt="user.login" size="md" />
            </NuxtLink>
          </div>
        </UCard>

        <UCard v-if="data.github.languages?.length">
          <template #header>
            <h3 class="flex items-center gap-2 text-lg font-semibold">
              <UIcon name="tabler:code" /> 语言分布
            </h3>
          </template>
          <div class="flex flex-col gap-4">
            <div
              v-for="language in data.github.languages.slice(0, 6)"
              :key="language.name"
              class="flex flex-col gap-2"
            >
              <div class="flex items-center justify-between text-sm">
                <div
                  class="flex items-center gap-2 font-medium text-gray-900 dark:text-white"
                >
                  <span class="bg-primary-500 h-2.5 w-2.5 rounded-full" />
                  {{ language.name }}
                </div>
                <div class="text-gray-500">{{ language.percent }}%</div>
              </div>
              <div
                class="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800"
              >
                <div
                  class="bg-primary-500 h-full rounded-full transition-all"
                  :style="{ width: `${Math.max(language.percent, 3)}%` }"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    <div
      v-else-if="status === 'error'"
      class="flex min-h-[50vh] flex-col items-center justify-center gap-4"
    >
      <UIcon name="tabler:alert-triangle" class="h-12 w-12 text-red-500" />
      <h2 class="text-xl font-semibold">项目加载失败或不存在</h2>
      <UButton to="/projects" label="返回项目列表" />
    </div>
  </UContainer>
</template>
