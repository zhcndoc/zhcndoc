export default defineCachedEventHandler(
  async () => {
    const ignoreRepos = ["zhcndoc"];

    // 使用 octokit 调用 API
    const { data } = await octokit.request("GET /orgs/{org}/repos", {
      org: "zhcndoc",
    });

    // 过滤忽略的项目
    const filteredData = data.filter(
      (repo) => !ignoreRepos.includes(repo.name)
    );

    // 只返回指定字段
    const selectedData = filteredData.map((repo) => {
      return {
        name: repo.name,
        description: repo.description,
        homepage: repo.homepage,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      };
    });

    return selectedData;
  },
  {
    maxAge: 60 * 60,
  }
);
