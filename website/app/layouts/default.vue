<script lang="ts" setup></script>

<template>
  <Html lang="zh-CN" dir="ltr">
    <Body>
      <AppHeader />

      <UMain class="mt-[72px]">
        <slot></slot>
      </UMain>

      <AppFooter />
    </Body>
  </Html>
</template>
