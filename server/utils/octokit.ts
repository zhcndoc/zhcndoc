import { Octokit } from 'octokit'

export const octokit = new Octokit({
  baseUrl: 'https://anymeta.ikxin.workers.dev/github',
})
