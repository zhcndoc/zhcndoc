<script lang="ts" setup></script>

<template>
  <Html lang="zh-CN" dir="ltr">
    <Body>
      <AppHeader />

      <UMain class="mt-(--ui-header-height)">
        <slot></slot>
      </UMain>

      <AppFooter />
    </Body>
  </Html>
</template>
