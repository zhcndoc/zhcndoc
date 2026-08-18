import { queryCollection } from '@nuxt/content/server'
import { withContentDatabaseRetry } from '../../utils/content'

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
            baseRef: ref(qualifiedName: "refs/heads/main") {
              comparison: compare(headRef: "upstream") {
                aheadBy
              }
            }
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
    let result: OrgReposQuery

    try {
      result = await octokit.graphql({ query, after })
    } catch (error) {
      if (!isMissingComparisonError(error)) throw error
      result = error.data
    }

    repos.push(...result.organization.repositories.nodes)

    hasNextPage = result.organization.repositories.pageInfo.hasNextPage
    after = result.organization.repositories.pageInfo.endCursor
  }

  const projects = await withContentDatabaseRetry(() =>
    queryCollection(event, 'projects').order('name', 'ASC').all(),
  )

  const filteredRepos = projects.filter((repo) => {
    if (scope === 'all') {
      return true
    } else {
      return !defaultIgnore.includes(repo.name)
    }
  })

  return filteredRepos?.map((project) => {
    const repo = repos.find((repo) => repo?.name === project.name)!

    return {
      name: project.name,
      description: project.description,
      upstream: project.upstream,
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
      newCommit: repo.baseRef?.comparison?.aheadBy ?? null,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
    }
  })
})

const isMissingComparisonError = (
  error: unknown,
): error is {
  data: OrgReposQuery
  errors: { type: string; path?: (string | number)[] }[]
} => {
  if (!error || typeof error !== 'object') return false

  const { data, errors } = error as {
    data?: OrgReposQuery
    errors?: { type: string; path?: (string | number)[] }[]
  }

  return (
    Boolean(data) &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.every(
      ({ type, path }) => type === 'NOT_FOUND' && path?.at(-1) === 'comparison',
    )
  )
}
