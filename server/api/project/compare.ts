import projects from '~~/.nuxt/projects.json'

export default defineEventHandler(async (event) => {
  const { repo } = getQuery(event)

  if (repo && projects.find((p) => p.name === String(repo))) {
    // 使用 octokit 调用 API
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/compare/{base}...{head}',
      {
        owner: 'zhcndoc',
        repo: String(repo),
        base: 'main',
        head: 'upstream',
      },
    )

    // 只返回指定字段
    return {
      ahead_by: data?.ahead_by,
    }
  }
})
