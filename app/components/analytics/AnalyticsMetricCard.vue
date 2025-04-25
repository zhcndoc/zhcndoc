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
  <div>
    <div class="text-sm font-bold text-nowrap">{{ label }}</div>
    <div
      v-if="!loading"
      class="text-4xl leading-[1.5] font-bold text-nowrap"
      :title="value.toString()"
    >
      {{ formatValue(_value) }}
    </div>
    <USkeleton v-else class="my-2 h-[38px] w-36" />
    <UBadge
      v-if="!loading"
      :icon="changeIcon"
      :color="changeColor"
      variant="soft"
      class="font-bold"
    >
      {{ `${Math.abs(~~_pct)}%` }}
    </UBadge>
    <USkeleton v-else class="h-6 w-16" />
  </div>
</template>
