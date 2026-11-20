<script setup lang="ts">
defineProps<{ large?: boolean }>()
</script>

<template>
  <span
    class="block max-w-full"
    :class="large ? 'aspect-36/7 w-60 sm:w-72' : 'h-7 w-36'"
  >
    <img
      src="~/assets/brand/logo-light.svg?no-inline"
      alt="简中文档"
      width="160"
      height="32"
      class="size-full object-contain dark:hidden"
    />
    <img
      src="~/assets/brand/logo-dark.svg?no-inline"
      alt="简中文档"
      width="160"
      height="32"
      class="hidden size-full object-contain dark:block"
    />
  </span>
</template>
