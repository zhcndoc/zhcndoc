<script setup lang="ts">
import dayjs from "dayjs";

const appConfig = useAppConfig();

const colors = appConfig.ui.colors;

const columns = [
  {
    key: "description",
    label: "项目名",
    sortable: true,
  },
  {
    key: "homepage",
    label: "网址",
  },
  {
    key: "topics",
    label: "标签",
  },
  {
    key: "created_at",
    label: "创建时间",
    sortable: true,
  },
  {
    key: "pushed_at",
    label: "更新时间",
    sortable: true,
  },
];

const { data } = useFetch("https://api.github.com/orgs/zhcndoc/repos", {
  params: {
    sort: "full_name",
  },
  lazy: true,
  server: false,
});
</script>

<template>
  <UTable :rows="data || []" :columns="columns" class="m-4">
    <template #topics-data="{ row }">
      <UBadge
        v-for="item in row.topics"
        :key="item"
        :color="colors[(Math.random() * colors.length) | 0]"
        :label="item"
        class="mr-1"
      />
    </template>
    <template #homepage-data="{ row }">
      <ULink
        :to="row.homepage"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        target="_blank"
      >
        {{ row.homepage }}
      </ULink>
    </template>
    <template #created_at-data="{ row }">
      {{ dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
    <template #pushed_at-data="{ row }">
      {{ dayjs(row.pushed_at).format("YYYY-MM-DD HH:mm:ss") }}
    </template>
  </UTable>
</template>
