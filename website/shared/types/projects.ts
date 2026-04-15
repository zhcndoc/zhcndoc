import type { PageInfo, Repository } from '@octokit/graphql-schema'

export interface ProjectInfo {
  name: string
  title: string
  link: string
  description: string
  type: string
  license: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  issues: number
  openPullRequests: number
  pullRequests: number
  newCommit?: number
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
        openIssues: { totalCount: number }
        openPullRequests: { totalCount: number }
      })[]
      pageInfo: PageInfo
    }
  }
}
