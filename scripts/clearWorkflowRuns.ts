import * as dotenv from 'dotenv'
import { Octokit } from 'octokit'

dotenv.config()

const octokit = new Octokit({ auth: process.env.NUXT_GITHUB_TOKEN })

const owner = 'zhcndoc'
const repo = 'unjs'

const getAllWorkflowRuns = async () => {
  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/runs',
    { owner, repo, per_page: 100 }
  )
  return response.data.workflow_runs || []
}

const clearWorkflowRuns = async () => {
  const workflowRuns = await getAllWorkflowRuns()
  console.log(`Found ${workflowRuns.length} workflow runs.`)

  for (const run of workflowRuns) {
    await octokit.request(
      'DELETE /repos/{owner}/{repo}/actions/runs/{run_id}',
      { owner, repo, run_id: run.id }
    )
    console.log(`Successfully deleted run with ID ${run.id}`)
  }
}

clearWorkflowRuns()
