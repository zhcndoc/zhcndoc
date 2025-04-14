<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'
const props = defineProps<{
  value: number
  change: number
  label: string
  reverseColors?: boolean
  formatValue: (value: number) => string
}>()

const { value, change, label, formatValue } = toRefs(props)

const changeIcon = ref('tabler:equal')
const changeColor = ref<'neutral' | 'error' | 'success'>('neutral')

watchEffect(() => {
  if (props.change > 0) {
    changeIcon.value = props.reverseColors
      ? 'tabler:arrow-down'
      : 'tabler:arrow-up'
    changeColor.value = props.reverseColors ? 'error' : 'success'
  }
  if (props.change < 0) {
    changeIcon.value = props.reverseColors
      ? 'tabler:arrow-up'
      : 'tabler:arrow-down'
    changeColor.value = props.reverseColors ? 'success' : 'error'
  }
})

const _value = useTransition(value, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const _change = useTransition(change, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
</script>

<template>
  <div>
    <div class="text-sm font-bold">{{ label }}</div>
    <div class="text-4xl leading-[1.5] font-bold" :title="value.toString()">
      {{ formatValue(_value) }}
    </div>
    <UBadge :icon="changeIcon" :color="changeColor" variant="soft">
      {{ formatValue(_change) }}
    </UBadge>
  </div>
</template>
