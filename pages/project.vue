<script setup lang="ts">
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  // "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  // "primary",
];

const columns = [
  {
    key: "description",
    label: "项目名",
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
    key: "diff_time",
    label: "同步状态",
    sortable: true,
  },
  {
    key: "action",
    label: "操作",
  },
];

const { data } = await useFetch("/api/repos");

const getDiffTimeValue = (time: number) => {
  const isNegative = time < 0;
  const absTime = Math.abs(time);

  const diffDuration = dayjs.duration(absTime, "seconds");
  const days = Math.floor(diffDuration.asDays());
  const hours = diffDuration.hours();

  const leadOrLag = isNegative ? "落后" : "领先";

  return `${leadOrLag} ${days} 天 ${hours} 小时`;
};
</script>

<template>
  <UTable :rows="data" :columns="columns" class="m-4">
    <template #topics-data="{ row }">
      <ClientOnly>
        <UBadge
          v-for="item in row.topics"
          :key="item"
          :color="colors[(Math.random() * colors.length) | 0]"
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
    <template #homepage-data="{ row }">
      <ULink :to="row.homepage" class="hover:text-primary" target="_blank">
        {{ row.homepage }}
      </ULink>
    </template>
    <template #diff_time-data="{ row }">
      <ClientOnly>
        <UBadge
          :color="row.diff_time < 0 ? 'orange' : 'green'"
          :label="getDiffTimeValue(row.diff_time)"
        />
        <template #fallback>
          {{ getDiffTimeValue(row.diff_time) }}
        </template>
      </ClientOnly>
    </template>

    <template #action-data="{ row }">
      <div class="flex gap-2">
        <NuxtLink :to="`https://github.com/${row.origin}`" target="_blank">
          <UButton label="Git 仓库" color="gray" variant="solid" />
        </NuxtLink>
        <NuxtLink :to="`https://github.com/${row.upstream}`" target="_blank">
          <UButton label="上游仓库" color="gray" variant="solid" />
        </NuxtLink>
      </div>
    </template>
  </UTable>
</template>
