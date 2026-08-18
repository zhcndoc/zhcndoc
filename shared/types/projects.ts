import type { Comparison, PageInfo, Repository } from '@octokit/graphql-schema'

export interface ProjectInfo {
  name: string
  title: string
  link: string
  description: string
  license: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  issues: number
  openPullRequests: number
  pullRequests: number
  newCommit: number | null
  oldCommit?: number
  upstream: {
    owner: string
    repo: string
    branch: string
    link: string
  }
  createdAt: string
  updatedAt: string
}

export interface OrgReposQuery {
  organization: {
    repositories: {
      nodes: (Repository & {
        baseRef: {
          comparison: Pick<Comparison, 'aheadBy'> | null
        } | null
        openIssues: { totalCount: number }
        openPullRequests: { totalCount: number }
      })[]
      pageInfo: PageInfo
    }
  }
}
