<script setup lang="ts">
import { TransitionPresets } from '@vueuse/core'

const props = defineProps<{
  value: number
  change: number
  label: string
  reverseColors?: boolean
  loading?: boolean
  formatValue: (value: number) => string
}>()

const { value, change } = toRefs(props)

const changeIcon = computed(() => {
  return change.value >= 0 ? 'tabler:arrow-up' : 'tabler:arrow-down'
})

const changeColor = computed(() => {
  return change.value >= 0
    ? props.reverseColors
      ? 'error'
      : 'success'
    : props.reverseColors
      ? 'success'
      : 'error'
})

const pct = computed(() => {
  const diff = value.value - change.value
  return ((value.value - diff) / diff) * 100
})

const _value = useTransition(value, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const _pct = useTransition(pct, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="text-sm font-bold text-nowrap">{{ label }}</div>
    <div
      v-if="!loading"
      class="h-10 text-4xl font-bold text-nowrap"
      :title="value.toString()"
    >
      {{ formatValue(_value) }}
    </div>
    <USkeleton v-else class="h-10 w-36" />
    <UBadge
      v-if="!loading"
      :icon="changeIcon"
      :color="changeColor"
      variant="soft"
      class="w-fit font-bold"
    >
      {{ `${Math.abs(~~_pct)}%` }}
    </UBadge>
    <USkeleton v-else class="h-6 w-16" />
  </div>
</template>
