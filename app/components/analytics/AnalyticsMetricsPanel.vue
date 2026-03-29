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
  props.tabs.map(tab => ({ label: tab.label, value: tab.type })),
)

const { data, status } = useFetch('/api/analytics/metrics-expanded', {
  query: computed(() => ({
    type: activeTab.value,
    startAt: props.startAt,
    endAt: props.endAt,
    hostname: props.hostname,
    limit: 10,
  })),
})

const totalVisitors = computed(() =>
  (data.value ?? []).reduce((sum, item) => sum + item.visitors, 0),
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

    <div class="flex flex-col divide-y divide-default">
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
          <span class="truncate text-sm flex-1">{{ item.name }}</span>
          <div class="flex items-center gap-3 shrink-0 text-sm">
            <span class="text-muted hidden sm:inline">
              {{ item.pageviews.toLocaleString() }} PV
            </span>
            <span class="font-bold">{{ item.visitors.toLocaleString() }}</span>
            <span class="text-muted w-10 text-right">
              {{ totalVisitors > 0 ? `${Math.round((item.visitors / totalVisitors) * 100)}%` : '0%' }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </UCard>
</template>
