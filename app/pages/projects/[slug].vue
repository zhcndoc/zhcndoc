<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string
</script>

<template>
  <UContainer class="py-4">{{
    slug ? `Project: ${slug}` : 'No project selected'
  }}</UContainer>
</template>
