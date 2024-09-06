<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import type { GithubCompare, GithubRepo } from "~/types/github";

dayjs.extend(duration);

const appConfig = useAppConfig();

const getRandomColor = (): any => {
  const { colors } = appConfig.ui;
  return colors[(Math.random() * colors.length) | 0];
};

const columns = [
  {
    key: "description",
    label: "名称",
  },
  {
    key: "type",
    label: "类型",
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
    key: "ahead_by",
    label: "同步状态",
    sortable: true,
  },
  {
    key: "action",
    label: "操作",
  },
];

const fetchGithubRepos = async (item: any) => {
  const [details, compare] = await Promise.all([
    $fetch<GithubRepo>(`/api/github/repos`, {
      query: {
        repo: item.origin.repo,
      },
    }),
    $fetch<GithubCompare>("/api/github/compare", {
      query: {
        repo: item.origin.repo,
      },
    }),
  ]);

  return {
    ...item,
    ...details,
    ...compare,
  };
};

project.sort((last, next) => last.id.localeCompare(next.id));
const tableData = ref(await Promise.all(project.map(fetchGithubRepos)));
</script>

<template>
  <UTable :rows="tableData" :columns="columns" class="m-4">
    <template #homepage-data="{ row }">
      <ULink :to="row.homepage" class="hover:text-primary" target="_blank">
        {{ row.homepage }}
      </ULink>
    </template>
    <template #type-data="{ row }">
      <span v-if="row.type === 0">
        <UBadge color="yellow">维护</UBadge>
      </span>
      <span v-if="row.type === 1">
        <UBadge color="cyan">镜像</UBadge>
      </span>
    </template>
    <template #topics-data="{ row }">
      <ClientOnly>
        <UBadge
          v-for="item in row.topics"
          :key="item"
          :color="getRandomColor()"
          :label="item"
          class="mr-1"
        />
        <template #fallback>
          <span v-for="item in row.topics" :key="item" class="mr-1">
            {{ item }}
          </span>
        </template>
      </ClientOnly>
    </template>
    <template #ahead_by-data="{ row }">
      <UBadge
        :color="row.ahead_by > 0 ? 'red' : 'green'"
        :label="
          row.ahead_by <= 0 ? `已同步最新` : `落后 ${row.ahead_by} 个提交`
        "
      />
    </template>

    <template #action-data="{ row }">
      <div class="flex gap-2">
        <NuxtLink :to="`https://github.com/${row.origin.repo}`" target="_blank">
          <UButton label="Git 仓库" color="gray" variant="solid" />
        </NuxtLink>
        <NuxtLink :to="`https://github.com/${row.upstream.repo}`" target="_blank">
          <UButton label="上游仓库" color="gray" variant="solid" />
        </NuxtLink>
      </div>
    </template>
  </UTable>
</template>
