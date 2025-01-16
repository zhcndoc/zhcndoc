<script setup lang="ts"></script>

<template>
  <div class="relative">
    <UPageHero orientation="vertical">
      <template #title>
        <div class="flex flex-col gap-4">
          <span>由开源社区提供支持的</span>
          <span class="text-[#ff3f57]">中文技术文档</span>
        </div>
      </template>
      <template #description>
        <div class="my-6">旨在为中文地区开发者提供优质的技术文档查阅体验</div>
      </template>
      <template #links>
        <UButton
          icon="lucide:github"
          to="https://github.com/zhcndoc"
          target="_blank"
          variant="soft"
          color="neutral"
          size="lg"
        >
          Github
        </UButton>
        <UButton
          icon="lucide:layout-list"
          to="/project"
          variant="soft"
          color="neutral"
          size="lg"
        >
          查看项目
        </UButton>
      </template>
    </UPageHero>
  </div>
</template>
