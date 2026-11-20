<script setup lang="ts">
definePageMeta({
  key: (route) => route.path.replace(/\/+$/, ''),
})
</script>

<template>
  <DocsArticle />
</template>
