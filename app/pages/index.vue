<script setup lang="ts"></script>

<template>
  <div class="relative">
    <UPageHero orientation="vertical">
      <template #title>
        <div class="flex flex-col gap-4 font-serif">
          <span>由开源社区提供支持的</span>
          <span class="text-[#ff3f57]">中文开发文档</span>
        </div>
      </template>
      <template #description>
        <div class="my-6">旨在为简体中文地区开发者提供优质的文档查阅体验</div>
      </template>
      <template #links>
        <UButton to="/project" variant="soft" color="neutral" size="xl">
          查看项目
        </UButton>
      </template>
    </UPageHero>
  </div>
</template>
