export default defineEventHandler(async (event) => {
  const { scope } = getQuery(event)
  const defaultIgnore = ['nuxt-docs', 'nuxt-examples']

  const query = `query ($after: String) {
    organization(login: "zhcndoc") {
      repositories(first: 100, after: $after) {
        nodes {
          name
          description
          homepageUrl
          licenseInfo { name }
          stargazerCount
          forkCount
          watchers { totalCount }
          openIssues: issues(states: OPEN) { totalCount }
          issues { totalCount }
          openPullRequests: pullRequests(states: OPEN) { totalCount }
          pullRequests { totalCount }
          updatedAt
          createdAt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`

  let hasNextPage = true
  let after = null

  const repos: OrgReposQuery['organization']['repositories']['nodes'] = []

  while (hasNextPage) {
    const result: OrgReposQuery = await octokit.graphql({
      query,
      after,
    })
    repos.push(...result.organization.repositories.nodes)

    hasNextPage = result.organization.repositories.pageInfo.hasNextPage
    after = result.organization.repositories.pageInfo.endCursor
  }

  const appConfig = await queryCollection(event, 'app').first()

  const filteredRepos = appConfig?.projects.filter((repo) => {
    if (scope === 'all') {
      return true
    } else {
      return !defaultIgnore.includes(repo.name)
    }
  })

  return filteredRepos?.map((project) => {
    const repo = repos.find((repo) => repo?.name === project.name)!

    return {
      ...project,
      title: repo.description || '',
      link: repo.homepageUrl || '',
      license: repo.licenseInfo?.name || '',
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      watchers: repo.watchers.totalCount,
      openIssues: repo.openIssues.totalCount,
      issues: repo.issues.totalCount,
      openPullRequests: repo.openPullRequests.totalCount,
      pullRequests: repo.pullRequests.totalCount,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
    }
  })
})
