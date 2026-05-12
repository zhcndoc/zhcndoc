<script setup lang="ts">
useSeoMeta({
  title: '项目探索',
  description:
    '探索简中文档支持的中文技术文档项目，快速进入中文文档与官方文档入口。',
})

const search = ref('')

const {
  data: projects,
  status,
  error,
} = await useFetch<ProjectInfo[]>('/api/projects', {
  default: () => [],
})

const projectList = computed(() => projects.value ?? [])

const filteredProjects = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return projectList.value
  }

  return projectList.value.filter((project) =>
    [
      project.name,
      project.title,
      project.description,
      project.upstream?.owner,
      project.upstream?.repo,
    ].some((value) => value?.toLowerCase().includes(keyword)),
  )
})

const totalStars = computed(() =>
  projectList.value.reduce((sum, project) => sum + project.stars, 0),
)
const totalForks = computed(() =>
  projectList.value.reduce((sum, project) => sum + project.forks, 0),
)
const documentEntryCount = computed(
  () =>
    projectList.value.filter(
      (project) => project.link || project.upstream?.link,
    ).length,
)
const mostStarredProject = computed(
  () => [...projectList.value].sort((a, b) => b.stars - a.stars)[0],
)

const statBlocks = computed(() => [
  {
    label: '收录项目',
    value: formatNumber(projectList.value.length),
    detail:
      status.value === 'pending' ? '正在读取项目索引' : '来自 zhcndoc 项目清单',
  },
  {
    label: 'Stars 合计',
    value: totalStars.value ? formatNumber(totalStars.value) : '待同步',
    detail: '社区关注度汇总',
  },
  {
    label: 'Forks 合计',
    value: totalForks.value ? formatNumber(totalForks.value) : '待同步',
    detail: '协作与派生记录',
  },
  {
    label: '文档入口',
    value: formatNumber(documentEntryCount.value),
    detail: '中文与上游入口索引',
  },
])

function cleanProjectTitle(title: string, name: string) {
  return title.replace(/\s*中文文档$/, '') || name
}

function formatNumber(value: number) {
  return value.toLocaleString('zh-CN')
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return '待同步'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '待同步'
  }

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

</script>

<template>
  <div class="bg-default relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--ui-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--ui-border-muted)_1px,transparent_1px)] bg-size-[44px_44px] opacity-20"
    />

    <section class="relative">
      <UContainer class="relative py-12 lg:py-16">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div
              class="border-muted bg-default text-muted mb-6 inline-flex items-center border px-3 py-2 font-mono text-xs tracking-[0.22em]"
            >
              PROJECTS / INDEX / 中文文档
            </div>

            <h1
              class="text-highlighted font-serif text-5xl leading-none font-black sm:text-6xl lg:text-7xl"
            >
              项目索引
            </h1>

            <p class="text-toned mt-6 max-w-2xl text-lg leading-8">
              把中文文档、官方站点和 zhcndoc
              仓库并排归档，适合快速进入资料，也适合确认一个项目的维护现场。
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <UButton
                to="#project-index"
                label="浏览索引"
                trailing-icon="tabler:arrow-right"
                color="primary"
                size="xl"
                class="rounded-xs"
              />
              <UButton
                to="/overview"
                label="查看概览"
                icon="tabler:layout-dashboard"
                color="neutral"
                variant="outline"
                size="xl"
                class="rounded-xs"
              />
            </div>
          </div>

          <div
            class="border-muted bg-default border shadow-[0_22px_70px_-58px_var(--ui-text)]"
          >
            <div
              class="border-muted bg-default flex items-center justify-between border-b px-4 py-3"
            >
              <span class="text-muted font-mono text-xs tracking-[0.24em]"
                >LIVE PROJECTS</span
              >
              <span class="text-dimmed font-mono text-xs"
                >ZHCN-{{ projectList.length }}</span
              >
            </div>
            <div class="bg-border grid gap-px sm:grid-cols-2">
              <div
                v-for="stat in statBlocks"
                :key="stat.label"
                class="bg-default p-5"
              >
                <p class="text-muted mb-5 font-mono text-xs tracking-[0.18em]">
                  {{ stat.label }}
                </p>
                <div class="text-highlighted font-mono text-3xl font-semibold">
                  {{ stat.value }}
                </div>
                <p class="text-muted mt-3 text-sm">
                  {{ stat.detail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="relative">
      <UContainer>
        <div
          class="border-muted bg-border grid gap-px border md:grid-cols-3"
        >
          <div class="bg-default px-5 py-5 sm:px-6">
            <p class="text-muted font-mono text-xs tracking-[0.2em]">
              TOP FILE
            </p>
            <p class="text-highlighted mt-4 text-lg font-semibold">
              {{
                mostStarredProject
                  ? cleanProjectTitle(
                      mostStarredProject.title,
                      mostStarredProject.name,
                    )
                  : '待同步'
              }}
            </p>
          </div>
          <div class="bg-default px-5 py-5 sm:px-6">
            <p class="text-muted font-mono text-xs tracking-[0.2em]">
              SYNC STATUS
            </p>
            <p class="text-highlighted mt-4 text-lg font-semibold">
              {{ error ? '索引读取异常' : '索引可用' }}
            </p>
          </div>
          <div class="bg-default px-5 py-5 sm:px-6">
            <p class="text-muted font-mono text-xs tracking-[0.2em]">QUERY</p>
            <p class="text-highlighted mt-4 text-lg font-semibold">
              {{ search ? `${filteredProjects.length} 个匹配` : '等待检索' }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section id="project-index" class="relative py-12 lg:py-16">
      <UContainer>
        <div
          class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p class="text-muted mb-4 font-mono text-xs tracking-[0.24em]">
              ARCHIVE FILES
            </p>
            <h2 class="text-highlighted font-serif text-4xl font-black">
              全部项目
            </h2>
          </div>

          <UInput
            v-model="search"
            icon="tabler:search"
            placeholder="搜索项目、仓库或描述"
            size="lg"
            class="w-full sm:w-96"
            :ui="{
              base: 'rounded-xs font-mono text-sm',
            }"
          />
        </div>

        <div class="border-muted border-l border-t">
          <div class="grid md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="project in filteredProjects"
              :key="project.name"
              class="border-muted bg-default hover:bg-elevated flex flex-col border-r border-b p-5 transition-colors"
            >
              <div class="mb-6 flex items-start gap-4">
                <div class="flex min-w-0 items-start gap-4">
                  <NuxtLink
                    :to="`/projects/${project.name}`"
                    :aria-label="`${cleanProjectTitle(project.title, project.name)} 项目档案`"
                    class="border-muted bg-elevated hover:border-accented hover:bg-accented focus-visible:outline-primary flex size-20 shrink-0 items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <img
                      :src="`/images/projects/${project.name}.svg`"
                      :alt="`${cleanProjectTitle(project.title, project.name)} logo`"
                      class="size-full object-contain p-0"
                      loading="lazy"
                    />
                  </NuxtLink>
                  <div class="min-w-0">
                    <h3 class="text-highlighted truncate text-lg font-semibold">
                      <NuxtLink
                        :to="`/projects/${project.name}`"
                        class="hover:text-primary focus-visible:outline-primary transition-colors hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {{ cleanProjectTitle(project.title, project.name) }}
                      </NuxtLink>
                    </h3>
                    <p class="text-muted mt-2 line-clamp-2 text-sm leading-6">
                      {{ project.description }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="border-muted mt-2 border-t pt-4">
                <dl class="grid gap-3 text-sm">
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">上游</dt>
                    <dd class="text-highlighted truncate font-mono text-xs">
                      {{ project.upstream.owner }}/{{ project.upstream.repo }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <dt class="text-muted">更新</dt>
                    <dd class="text-highlighted font-mono text-xs">
                      {{ formatDate(project.updatedAt) }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div
                class="flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between"
              >
                <div class="flex flex-wrap gap-4 font-mono text-xs">
                  <NuxtLink
                    :to="`https://github.com/zhcndoc/${project.name}/stargazers`"
                    target="_blank"
                    class="text-muted hover:text-highlighted flex items-center gap-2 transition-colors"
                  >
                    <UIcon name="tabler:star" class="size-4" />
                    {{ formatNumber(project.stars) }}
                  </NuxtLink>
                  <NuxtLink
                    :to="`https://github.com/zhcndoc/${project.name}/forks`"
                    target="_blank"
                    class="text-muted hover:text-highlighted flex items-center gap-2 transition-colors"
                  >
                    <UIcon name="tabler:git-fork" class="size-4" />
                    {{ formatNumber(project.forks) }}
                  </NuxtLink>
                </div>

                <div class="flex flex-wrap gap-2 sm:justify-end">
                  <UButton
                    :to="project.link"
                    label="中文"
                    icon="tabler:external-link"
                    target="_blank"
                    color="primary"
                    variant="soft"
                    size="sm"
                    class="rounded-xs"
                  />
                  <UButton
                    :to="project.upstream.link"
                    label="官方"
                    icon="tabler:world"
                    target="_blank"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    class="rounded-xs"
                  />
                </div>
              </div>
            </article>
          </div>

          <div
            v-if="!filteredProjects.length"
            class="bg-default px-6 py-16 text-center"
          >
            <UIcon
              name="tabler:search-off"
              class="text-dimmed mx-auto mb-4 size-10"
            />
            <h3 class="text-highlighted text-lg font-semibold">
              没有找到匹配项目
            </h3>
            <p class="text-muted mt-2 text-sm">
              换一个项目名、仓库名或关键词再试试。
            </p>
          </div>
        </div>

        <p v-if="error" class="text-muted mt-4 text-sm">
          项目索引暂未完整取得，当前页面可能只显示可用缓存。
        </p>
      </UContainer>
    </section>
  </div>
</template>
