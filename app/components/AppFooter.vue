<script setup lang="ts">
const columns = [
  {
    label: 'Resources',
    children: [
      {
        label: 'Help center',
      },
      {
        label: 'Docs',
      },
      {
        label: 'Roadmap',
      },
      {
        label: 'Changelog',
      },
    ],
  },
  {
    label: 'Features',
    children: [
      {
        label: 'Affiliates',
      },
      {
        label: 'Portal',
      },
      {
        label: 'Jobs',
      },
      {
        label: 'Sponsors',
      },
    ],
  },
  {
    label: 'Company',
    children: [
      {
        label: 'About',
      },
      {
        label: 'Pricing',
      },
      {
        label: 'Careers',
      },
      {
        label: 'Blog',
      },
    ],
  },
]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: "You've been subscribed to our newsletter.",
  })
}
</script>

<template>
  <USeparator icon="icon:logo" class="h-px" />
  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      label="Subscribe"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Copyright © {{ new Date().getFullYear() }}
        <NuxtLink to="https://www.zhcndoc.com" class="hover:text-primary">
          简中文档
        </NuxtLink>
      </p>
    </template>

    <template #right>
      <div
        class="flex flex-col items-center gap-2 text-sm text-gray-500 lg:flex-row lg:gap-3 dark:text-gray-400"
      >
        <NuxtLink
          to="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="hover:text-primary-500 flex items-center"
        >
          <Icon name="icon:miit" />
          <span class="ml-2">沪ICP备2024070610号-3</span>
        </NuxtLink>
        <NuxtLink
          to="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44200002445480"
          target="_blank"
          class="hover:text-primary-500 flex items-center"
        >
          <Icon name="icon:mps" />
          <span class="ml-2">粤公网安备44200002445480号</span>
        </NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
