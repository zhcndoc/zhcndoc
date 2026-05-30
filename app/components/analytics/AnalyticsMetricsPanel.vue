<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
  tabs: { label: string; type: string }[]
}>()

const activeTab = ref(props.tabs[0]?.type ?? '')

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map((tab) => ({ label: tab.label, value: tab.type })),
)

const { data, status } = useFetch<AnalyticsMetricExpanded[]>(
  '/api/analytics/metrics-expanded',
  {
    query: computed(() => ({
      type: activeTab.value,
      startAt: props.startAt,
      endAt: props.endAt,
      hostname: props.hostname,
      limit: 10,
    })),
    transform: (items) =>
      [...items].sort(
        (left, right) => Number(right.pageviews) - Number(left.pageviews),
      ),
  },
)

const totalPageviews = computed(() =>
  (data.value ?? []).reduce((sum, item) => sum + Number(item.pageviews), 0),
)
</script>

<template>
  <UCard>
    <template #header>
      <UTabs
        v-model="activeTab"
        :items="tabItems"
        variant="pill"
        :content="false"
        size="sm"
        class="mt-1"
      />
    </template>

    <div class="divide-default flex flex-col divide-y">
      <template v-if="status === 'pending'">
        <div
          v-for="i in 10"
          :key="i"
          class="flex items-center justify-between py-2"
        >
          <USkeleton class="h-5 w-40" />
          <USkeleton class="h-5 w-20" />
        </div>
      </template>
      <template v-else>
        <div
          v-for="item in data"
          :key="item.name"
          class="flex items-center justify-between gap-4 py-2"
        >
          <span class="flex-1 truncate text-sm">{{ item.name }}</span>
          <div class="flex shrink-0 items-center gap-2 text-sm">
            <span class="font-bold">{{
              Number(item.pageviews).toLocaleString()
            }}</span>
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
