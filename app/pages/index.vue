<script setup lang="ts"></script>

<template>
  <section
    class="my-16 flex flex-col gap-14 lg:my-0 lg:flex-row lg:items-center lg:justify-between lg:pt-40 lg:pb-52 xl:gap-8"
  >
    <div
      class="mx-auto flex max-w-screen-sm flex-col items-center gap-6 text-center lg:mr-auto lg:ml-6 lg:max-w-3xl lg:items-start lg:text-start"
    >
      <div class="flex flex-col gap-2">
        <h1
          class="font-serif text-[2.75rem] leading-normal font-black tracking-wide text-gray-950 dark:text-gray-50"
        >
          由
          <span class="text-primary-500 text-[1.2em]">社区</span>
          提供支持的
          <br />
          <span class="text-primary-500 text-[1.2em]">中文技术文档</span>
        </h1>
        <p
          class="text-xl leading-normal text-gray-500 md:text-[1.5rem] dark:text-gray-400"
        >
          旨在为中文地区开发者提供优质的技术文档查阅体验
        </p>
      </div>
      <div class="mt-8">
        <UButton
          color="primary"
          size="xl"
          to="/project"
          trailing-icon="tabler:chevron-right"
          variant="solid"
        >
          探索项目
        </UButton>
      </div>
    </div>
    <div class="relative flex shrink-0 justify-center"></div>
  </section>
</template>
