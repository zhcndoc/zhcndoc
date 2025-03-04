<script setup lang="ts"></script>

<template>
  <section
    class="lg:pt-40 lg:pb-52 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-14 xl:gap-8 my-16 lg:my-0"
  >
    <div
      class="max-w-screen-sm mx-auto lg:ml-6 lg:mr-auto lg:max-w-3xl flex flex-col items-center lg:items-start gap-6 text-center lg:text-start"
    >
      <div class="flex flex-col gap-2">
        <h1
          class="text-gray-950 dark:text-gray-50 text-[2.75rem] font-black tracking-wide leading-normal font-serif"
        >
          由
          <span class="text-[1.2em] text-primary-500">社区</span>
          提供支持的
          <br />
          <span class="text-[1.2em] text-primary-500">中文技术文档</span>
        </h1>
        <p
          class="text-gray-500 dark:text-gray-400 text-xl md:text-[1.5rem] leading-normal"
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
    <div class="relative flex justify-center shrink-0"></div>
  </section>
</template>
