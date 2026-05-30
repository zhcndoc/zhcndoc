<script lang="ts" setup></script>

<template>
  <Html lang="zh-CN" dir="ltr">
    <Body>
      <AppHeader />

      <UMain class="mt-18">
        <slot></slot>
      </UMain>

      <AppFooter />
    </Body>
  </Html>
</template>
