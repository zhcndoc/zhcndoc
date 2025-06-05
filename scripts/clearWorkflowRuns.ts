import * as dotenv from 'dotenv'
import { Octokit } from 'octokit'

dotenv.config()

const octokit = new Octokit({ auth: process.env.NUXT_GITHUB_TOKEN })

const getAllRepos = async () => {
  const repos = []
  let hasNextPage = true
  let after = null

  while (hasNextPage) {
    const result: any = await octokit.graphql({
      query: `query ($after: String) {
        organization(login: "zhcndoc") {
          repositories(first: 100, after: $after) {
            nodes { name }
            pageInfo { hasNextPage, endCursor }
          }
        }
      }`,
      after,
    })
    repos.push(...result.organization.repositories.nodes)
    hasNextPage = result.organization.repositories.pageInfo.hasNextPage
    after = result.organization.repositories.pageInfo.endCursor
  }
  return repos
}

const getAllWorkflowRuns = async (owner: string, repo: string) => {
  const runs = []
  let page = 1

  while (true) {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/actions/runs',
      { owner, repo, per_page: 100, page },
    )

    const workflowRuns = response.data.workflow_runs || []
    runs.push(...workflowRuns)

    if (workflowRuns.length < 100) {
      break
    }

    page++
  }

  return runs
}

const clearWorkflowRuns = async () => {
  const repos = await getAllRepos()
  console.log(`找到 ${repos.length} 个仓库`)

  for (const repoObj of repos) {
    const owner = 'zhcndoc'
    const repo = repoObj.name

    const workflowRuns = await getAllWorkflowRuns(owner, repo)
    console.log(`仓库 ${repo} 找到 ${workflowRuns.length} 个工作流运行`)

    for (const run of workflowRuns) {
      try {
        await octokit.request(
          'DELETE /repos/{owner}/{repo}/actions/runs/{run_id}',
          { owner, repo, run_id: run.id },
        )
        console.log(`成功删除运行 ID 为 ${run.id} 的工作流`)
      } catch (error) {
        console.error(`删除运行 ID 为 ${run.id} 的工作流时出错:`, error)
      }
    }
  }
}

clearWorkflowRuns()
