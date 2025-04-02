export default defineEventHandler(async (event) => {
  const { repo } = getQuery(event)

  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/compare/{base}...{head}',
    {
      owner: 'zhcndoc',
      repo: String(repo),
      base: 'main',
      head: 'upstream',
    },
  )

  return {
    newCommit: data?.ahead_by,
    oldCommit: data?.behind_by,
  }
})
