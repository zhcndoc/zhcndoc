type GraphqlResult = {
  organization: {
    repositories: {
      nodes: {
        name: string
        title: string | null
        url: string | null
        license: { name: string } | null
        stars: number
        forks: number
        watchers: { totalCount: number }
        openIssues: { totalCount: number }
        issues: { totalCount: number }
        openPullRequests: { totalCount: number }
        pullRequests: { totalCount: number }
        updatedAt: string
        createdAt: string
      }[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
    }
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const query = `query ($after: String) {
      organization(login: "zhcndoc") {
        repositories(first: 100, after: $after) {
          nodes {
            name
            title: description
            url: homepageUrl
            license: licenseInfo { name }
            stars: stargazerCount
            forks: forkCount
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

    const repos: GraphqlResult['organization']['repositories']['nodes'] = []

    while (hasNextPage) {
      const result: GraphqlResult = await octokit.graphql({ query, after })
      repos.push(...result.organization.repositories.nodes)

      hasNextPage = result.organization.repositories.pageInfo.hasNextPage
      after = result.organization.repositories.pageInfo.endCursor
    }

    const appConfig = await queryCollection(event, 'app').first()

    return appConfig?.projects.map((project) => {
      const repo = repos.find((repo) => repo.name === project.name)!

      return {
        ...project,
        title: repo.title || '',
        url: repo.url || '',
        license: repo.license?.name || '',
        stars: repo.stars,
        forks: repo.forks,
        watchers: repo.watchers.totalCount,
        openIssues: repo.openIssues.totalCount,
        issues: repo.issues.totalCount,
        openPullRequests: repo.openPullRequests.totalCount,
        pullRequests: repo.pullRequests.totalCount,
        newCommit: null,
        oldCommit: null,
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
      }
    })
  },
  {
    maxAge: 60 * 60,
  },
)
