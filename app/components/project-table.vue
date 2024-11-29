<script setup lang="ts">
import dayjs from "dayjs";
import projects from "../../data/projects.json";

defineProps<{
  rows: GithubRepo[];
}>();

const tableColumns = [
  { key: "name", label: "项目名称" },
  { key: "ahead_by", label: "同步状态", sortable: true },
  { key: "created_at", label: "创建时间", sortable: true },
  { key: "updated_at", label: "更新时间", sortable: true },
  { key: "actions", label: "操作" },
];
</script>

<template>
  <UTable
    :rows="rows"
    :columns="tableColumns"
    class="border border-gray-200 dark:border-gray-700 rounded-lg"
  >
    <template #name-data="{ row }">
      <UButton
        :to="row.homepage"
        target="_blank"
        icon="i-lucide-arrow-up-right"
        variant="link"
        color="black"
        trailing
        class="w-48 text-left"
      >
        {{ row.description }}
      </UButton>
    </template>
    <template #ahead_by-data="{ row }">
      <UBadge
        :color="row.ahead_by! > 0 ? 'red' : 'green'"
        :label="
          row.ahead_by !== undefined
            ? row.ahead_by! <= 0
              ? '已同步最新'
              : `落后 ${row.ahead_by} 个提交`
            : '加载中...'
        "
      />
    </template>
    <template #created_at-data="{ row }">
      <span class="font-mono">
        {{ dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss") }}
      </span>
    </template>
    <template #updated_at-data="{ row }">
      <span class="font-mono w-48">
        {{ dayjs(row.updated_at).format("YYYY-MM-DD HH:mm:ss") }}
      </span>
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-2">
        <UButton
          :to="row.html_url"
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
