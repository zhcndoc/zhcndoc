<script setup lang="ts">
const props = defineProps<{
  value: number
  change: number
  label: string
  reverseColors?: boolean
  loading?: boolean
  formatValue: (value: number) => string
}>()
const percent = computed(() => {
  const previous = props.value - props.change
  return previous > 0 ? (Math.abs(props.change) / previous) * 100 : null
})
const color = computed(() =>
  props.change >= 0 === !props.reverseColors ? 'success' : 'error',
)
</script>
<template>
  <div class="bg-default min-w-0 px-4 py-4">
    <div class="text-muted text-sm">{{ label }}</div>
    <USkeleton v-if="loading" class="mt-2 h-8 w-16" />
    <div v-else class="mt-2 flex flex-wrap items-baseline gap-2 tabular-nums">
      <strong
        :title="String(value)"
        class="text-highlighted text-2xl font-semibold tracking-tight"
      >
        {{ formatValue(value) }}
      </strong>
      <UBadge
        v-if="percent !== null && change"
        :color="color"
        :icon="change >= 0 ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
        :aria-label="`较上期${change >= 0 ? '上升' : '下降'} ${percent < 1 ? '不到 1' : Math.round(percent)}%`"
      >
        {{ percent < 1 ? '<1' : Math.round(percent) }}%
      </UBadge>
    </div>
  </div>
</template>
