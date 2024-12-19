<script setup lang="ts">
import dayjs from "dayjs";
import projects from "../../data/projects.json";

defineProps<{
  rows: GithubRepo[];
}>();

const tableColumns = [
  { key: "name", label: "项目名称" },
  { key: "homepage", label: "项目链接" },
  { key: "ahead_by", label: "同步状态", sortable: true },
  { key: "created_at", label: "创建时间", sortable: true },
  { key: "updated_at", label: "更新时间", sortable: true },
  { key: "actions", label: "操作" },
];
</script>

<template>
  <UTable :rows="rows" :columns="tableColumns">
    <template #name-data="{ row }">
      <UButton :to="row.homepage" target="_blank" variant="link" color="black">
        {{ row.description }}
      </UButton>
    </template>
    <template #homepage-data="{ row }">
      <UButton
        :to="row.homepage"
        target="_blank"
        icon="i-mdi-link-variant"
        variant="link"
        color="black"
        trailing
      >
        {{ row.homepage }}
      </UButton>
    </template>
    <template #ahead_by-data="{ row }">
      <ClientOnly>
        <UBadge
          v-if="row.ahead_by !== undefined"
          :color="row.ahead_by! <= 0 ? 'green' : 'red'"
          :label="row.ahead_by! <= 0 ? '已同步最新' : `落后 ${row.ahead_by} 个提交`"
        />
        <UBadge v-else color="gray" label="加载中..." />
        <template #fallback>
          <UBadge color="gray" label="加载中..." />
        </template>
      </ClientOnly>
    </template>
    <template #created_at-data="{ row }">
      <span>
        {{ dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss") }}
      </span>
    </template>
    <template #updated_at-data="{ row }">
      <span>
        {{ dayjs(row.updated_at).format("YYYY-MM-DD HH:mm:ss") }}
      </span>
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-2">
        <UButton
          :to="`https://github.com/zhcndoc/${row.name}`"
          target="_blank"
          label="Git 仓库"
          color="gray"
          variant="solid"
        />
        <UButton
          :to="`https://github.com/${
            projects.find((p) => p.name === row.name)?.sync[0]
          }`"
          target="_blank"
          label="上游仓库"
          color="gray"
          variant="solid"
        />
      </div>
    </template>
  </UTable>
</template>
