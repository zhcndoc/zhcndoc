export default defineEventHandler(async () => {
  const ignoreRepos = ["zhcndoc"];

  // 使用 octokit 调用 API
  const { data } = await octokit.request("GET /orgs/{org}/repos", {
    org: "zhcndoc",
  });

  return data.filter((repo) => !ignoreRepos.includes(repo.name));
});
