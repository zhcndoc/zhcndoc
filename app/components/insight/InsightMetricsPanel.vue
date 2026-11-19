<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
  title: string
  tabs: { label: string; type: string }[]
}>()

const activeTab = ref(props.tabs[0]?.type ?? '')

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map((tab) => ({ label: tab.label, value: tab.type })),
)

const query = computed(() => ({
  type: activeTab.value,
  startAt: props.startAt,
  endAt: props.endAt,
  hostname: props.hostname,
  limit: 10,
}))

const { data, status, error, refresh } = useFetch<InsightMetricExpanded[]>(
  '/api/insight/metrics-expanded',
  {
    key: `insight-metrics-${props.tabs[0]?.type ?? 'hostname'}`,
    query,
    watch: false,
  },
)

const displayedTab = ref(activeTab.value)
watch(data, () => {
  if (status.value === 'success') displayedTab.value = activeTab.value
})

const skeletonDelay = 180
const minimumSkeletonDuration = 200
const pending = computed(() => status.value === 'pending')
const skeletonShownAt = shallowRef<number>()
const showSkeleton = computed(() => skeletonShownAt.value !== undefined)

if (import.meta.client) {
  // Refresh directly so an earlier request cannot delay the next tab.
  watch(query, () => refresh({ dedupe: 'cancel' }))

  watch(
    [pending, query],
    ([isPending], _, onCleanup) => {
      const shownAt = skeletonShownAt.value
      const isVisible = shownAt !== undefined
      if (isPending === isVisible) return

      let delay = 0
      if (shownAt !== undefined) {
        delay = minimumSkeletonDuration - (performance.now() - shownAt)
      } else if (data.value !== undefined || error.value) {
        delay = skeletonDelay
      }

      const updateSkeleton = () => {
        skeletonShownAt.value = isPending ? performance.now() : undefined
      }
      if (delay <= 0) {
        updateSkeleton()
        return
      }

      const timer = setTimeout(updateSkeleton, delay)
      onCleanup(() => clearTimeout(timer))
    },
    { immediate: true },
  )
}

const metrics = computed(() =>
  [...(data.value ?? [])].sort(
    (left, right) => Number(right.pageviews) - Number(left.pageviews),
  ),
)
const totalPageviews = computed(() =>
  metrics.value.reduce((sum, item) => sum + Number(item.pageviews), 0),
)

const getFaviconUrl = (name: string | null) =>
  name ? `https://markhub.top/favicon/${encodeURIComponent(name)}` : undefined
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="font-semibold">{{ title }}</h2>
      <UTabs
        v-model="activeTab"
        :items="tabItems"
        variant="pill"
        :content="false"
        size="sm"
      />
    </template>

    <div
      class="divide-default flex flex-col divide-y"
      :aria-busy="pending || showSkeleton"
    >
      <template v-if="showSkeleton">
        <div
          v-for="i in 10"
          :key="i"
          aria-hidden="true"
          class="flex items-center justify-between py-2"
        >
          <USkeleton class="h-5 w-40" />
          <USkeleton class="h-5 w-20" />
        </div>
      </template>
      <p v-else-if="error" role="status" class="text-muted text-sm">
        暂时无法读取数据。
      </p>
      <p v-else-if="!metrics.length" class="text-muted text-sm">
        所选时段暂无记录
      </p>
      <template v-else>
        <div
          v-for="item in metrics"
          :key="item.name"
          class="flex items-center justify-between gap-4 py-2"
        >
          <div class="flex min-w-0 flex-1 items-center gap-2">
            <UAvatar
              v-if="displayedTab === 'referrer'"
              :src="getFaviconUrl(item.name)"
              alt=""
              icon="i-lucide-globe"
              size="2xs"
              loading="lazy"
              decoding="async"
              class="rounded-sm bg-transparent"
              :ui="{ image: 'object-contain', icon: 'size-4' }"
            />
            <span class="truncate text-sm">{{ item.name || '未标注' }}</span>
          </div>
          <div class="flex shrink-0 items-center gap-2 text-sm">
            <span class="font-semibold tabular-nums">
              {{ Number(item.pageviews).toLocaleString() }}
            </span>
            <span class="text-muted border-default w-10 border-l pl-2">
              {{
                totalPageviews > 0
                  ? `${Math.round((Number(item.pageviews) / totalPageviews) * 100)}%`
                  : '0%'
              }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </UCard>
</template>
