import projects from '~~/.nuxt/projects.json'

type Result = {
  organization: {
    repositories: {
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
      nodes: {
        name: string
        homepageUrl: string | null
        description: string | null
        stargazerCount: number
        forkCount: number
        watchers: { totalCount: number }
        openIssues: { totalCount: number }
        issues: { totalCount: number }
        openPullRequests: { totalCount: number }
        pullRequests: { totalCount: number }
        pushedAt: string
        createdAt: string
        updatedAt: string
      }[]
    }
  }
}

export default defineCachedEventHandler(
  async () => {
    const query = `query ($after: String) {
      organization(login: "zhcndoc") {
        repositories(first: 100, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            homepageUrl
            description
            stargazerCount
            forkCount
            watchers { totalCount }
            openIssues: issues(states: OPEN) { totalCount }
            issues { totalCount }
            openPullRequests: pullRequests(states: OPEN) { totalCount }
            pullRequests { totalCount }
            createdAt
            updatedAt
          }
        }
      }
    }`

    let hasNextPage = true
    let after = null

    const repos: Result['organization']['repositories']['nodes'] = []

    while (hasNextPage) {
      const result: Result = await octokit.graphql({ query, after })
      repos.push(...result.organization.repositories.nodes)

      hasNextPage = result.organization.repositories.pageInfo.hasNextPage
      after = result.organization.repositories.pageInfo.endCursor
    }

    return projects.map((project) => {
      const repo = repos.find((repo) => repo.name === project.name)!

      return {
        link: repo.homepageUrl || '',
        title: repo.description || '',
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        watchers: repo.watchers.totalCount,
        openIssues: repo.openIssues.totalCount,
        issues: repo.issues.totalCount,
        openPullRequests: repo.openPullRequests.totalCount,
        pullRequests: repo.pullRequests.totalCount,
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
        ...project,
      }
    })
  },
  {
    maxAge: 60 * 60,
  },
)
