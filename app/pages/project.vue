<script setup lang="ts">
import dayjs from "dayjs";
import _projects from "../../data/projects.json";

const projects = useState<GithubRepo[]>("projects", () => []);

const compareResults = ref<Record<string, number>>({});

const translateProjects = computed(() => {
  return projects.value
    .filter((project) => {
      const config = _projects.find((p) => p.name === project.name);
      return config?.translate === true;
    })
    .map((project) => ({
      ...project,
      ahead_by: compareResults.value[project.name] ?? undefined,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const mirrorProjects = computed(() => {
  return projects.value.filter((project) => {
    const config = _projects.find((p) => p.name === project.name);
    return config?.translate === false;
  });
});

const tableColumns = [
  { key: "name", label: "项目名称" },
  { key: "ahead_by", label: "同步状态", sortable: true },
  { key: "created_at", label: "创建时间", sortable: true },
  { key: "updated_at", label: "更新时间", sortable: true },
  { key: "actions", label: "操作" },
];

const getCompare = async (repo: string) => {
  const data = await $fetch(`/api/project/compare?repo=${repo}`);
  compareResults.value[repo] = data?.ahead_by ?? 0;
};

onMounted(async () => {
  translateProjects.value.forEach((project) => {
    getCompare(project.name);
  });
});
</script>

<template>
  <div
    class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col mt-4"
  >
    <UTable
      :rows="translateProjects"
      :columns="tableColumns"
      class="border border-gray-200 dark:border-gray-700 rounded-lg"
    >
      <template #name-data="{ row }">
        <UButton
          :to="row.homepage"
          target="_blank"
          icon="i-lucide-arrow-up-right"
          variant="link"
          trailing
        >
          {{ row.description }}
        </UButton>
      </template>
      <template #ahead_by-data="{ row }">
        <UBadge
          :color="compareResults[row.name]! > 0 ? 'red' : 'green'"
          :label="
            compareResults[row.name] !== undefined
              ? compareResults[row.name]! <= 0
                ? '已同步最新'
                : `落后 ${compareResults[row.name]} 个提交`
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
        <span class="font-mono">
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
              _projects.find((p) => p.name === row.name)?.sync[0]
            }`"
            target="_blank"
            label="上游仓库"
            color="gray"
            variant="solid"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>
