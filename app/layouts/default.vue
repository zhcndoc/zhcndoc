<script lang="ts" setup></script>

<template>
  <Html lang="zh-CN" dir="ltr">
    <Body>
      <AppHeader />

      <UMain class="mt-[var(--ui-header-height)]">
        <slot></slot>
      </UMain>

      <AppFooter />
    </Body>
  </Html>
</template>
