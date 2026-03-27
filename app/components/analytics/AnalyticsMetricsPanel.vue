<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const props = defineProps<{
  title: string
  startAt: number
  endAt: number
  hostname: string
  tabs: { label: string; type: string }[]
}>()

const activeTab = ref(props.tabs[0]?.type ?? '')

const tabItems = computed<TabsItem[]>(() =>
  props.tabs.map(tab => ({ label: tab.label, value: tab.type })),
)

const { data, status } = useFetch('/api/analytics/metrics', {
  query: computed(() => ({
    type: activeTab.value,
    startAt: props.startAt,
    endAt: props.endAt,
    hostname: props.hostname,
    limit: 8,
  })),
})

const total = computed(() =>
  (data.value ?? []).reduce((sum, item) => sum + item.y, 0),
)
</script>

<template>
  <UCard>
    <template #header>
      <div class="font-bold">{{ title }}</div>
      <UTabs
        v-model="activeTab"
        :items="tabItems"
        variant="link"
        :content="false"
        size="sm"
        class="mt-1"
      />
    </template>

    <div class="flex flex-col divide-y divide-default">
      <template v-if="status === 'pending'">
        <div
          v-for="i in 8"
          :key="i"
          class="flex items-center justify-between py-2"
        >
          <USkeleton class="h-4 w-40" />
          <USkeleton class="h-4 w-20" />
        </div>
      </template>
      <template v-else>
        <div
          v-for="item in data"
          :key="item.x"
          class="flex items-center justify-between gap-4 py-2"
        >
          <span class="truncate text-sm flex-1">{{ item.x }}</span>
          <div class="flex items-center gap-2 shrink-0 text-sm">
            <span class="font-bold">{{ item.y }}</span>
            <span class="text-muted w-10 text-right">
              {{ total > 0 ? `${Math.round((item.y / total) * 100)}%` : '0%' }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </UCard>
</template>
