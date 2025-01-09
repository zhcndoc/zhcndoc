<script setup lang="ts">
import _projects from "../../data/projects.json";

const projects = useState<GithubRepo[]>("projects", () => []);

const compareResults = ref<Record<string, number>>({});

const newProjects = computed(() => {
  return projects.value
    .map((project) => {
      const target = _projects.find((p) => p.name === project.name);
      return {
        ...project,
        ahead_by: compareResults.value[project.name] ?? undefined,
        translate: target?.translate ?? false,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});

const getCompare = async (repo: string) => {
  const data = await $fetch(`/api/project/compare?repo=${repo}`);
  compareResults.value[repo] = data?.ahead_by ?? 0;
};

onMounted(() => {
  newProjects.value.forEach((project) => {
    getCompare(project.name);
  });
});
</script>

<template>
  <div class="max-w-7xl mx-auto my-8 flex flex-col gap-16">
    <div class="flex flex-col gap-8">
      <h2 class="text-4xl font-bold text-center">维护项目</h2>
      <div class="text-gray-500 dark:text-gray-400 text-center px-8">
        以下项目由简中文档团队负责翻译和维护，定期与上游同步并保持更新
      </div>
      <ProjectTable
        :data="newProjects.filter((project) => project.translate)"
      />
    </div>

    <div class="flex flex-col gap-8">
      <h2 class="text-4xl font-bold text-center">镜像项目</h2>
      <div class="text-gray-500 dark:text-gray-400 text-center px-8">
        以下项目仅作为镜像存储，定期同步上游仓库的翻译内容更新
      </div>
      <ProjectTable
        :data="newProjects.filter((project) => !project.translate)"
      />
    </div>
  </div>
</template>
