export interface ProjectInfo {
  name: string
  type: string
  upstream: {
    owner: string
    repo: string
    branch: string
  }
}

export interface ProjectData extends ProjectInfo {
  title: string
  url: string
  license: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  issues: number
  openPullRequests: number
  pullRequests: number
  newCommit: number
  oldCommit: number
  createdAt: string
  updatedAt: string
}
