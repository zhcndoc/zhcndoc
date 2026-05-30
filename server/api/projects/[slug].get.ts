import { queryCollection } from '@nuxt/content/server'
import { withContentDatabaseRetry } from '../../utils/content'

const stripMarkdown = (content: string) => {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

const extractExcerpt = (content: string, fallback?: string | null) => {
  const cleaned = stripMarkdown(content)
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length >= 40)

  const excerpt = paragraphs
    .find((paragraph) => paragraph !== fallback)
    ?.replace(/\n/g, ' ')

  if (!excerpt) {
    return fallback || ''
  }

  return excerpt.length > 220
    ? `${excerpt.slice(0, 217).trimEnd()}...`
    : excerpt
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project slug is required',
    })
  }

  const project = await withContentDatabaseRetry(() =>
    queryCollection(event, 'projects').where('name', '=', slug).first(),
  )

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  try {
    const [
      { data: repo },
      { data: contributors },
      { data: releases },
      { data: languages },
      pullRequestsResponse,
    ] = await Promise.all([
      octokit.rest.repos.get({
        owner: 'zhcndoc',
        repo: slug,
      }),
      octokit.rest.repos
        .listContributors({
          owner: 'zhcndoc',
          repo: slug,
          per_page: 35,
        })
        .catch(() => ({ data: [] })),
      octokit.rest.repos
        .listReleases({
          owner: 'zhcndoc',
          repo: slug,
          per_page: 5,
        })
        .catch(() => ({ data: [] })),
      octokit.rest.repos
        .listLanguages({
          owner: 'zhcndoc',
          repo: slug,
        })
        .catch(() => ({ data: {} })),
      octokit.rest.search
        .issuesAndPullRequests({
          q: `repo:zhcndoc/${slug} is:pr is:open`,
          per_page: 1,
        })
        .catch(() => ({ data: null })),
    ])

    const openPullRequests = pullRequestsResponse?.data?.total_count ?? null
    const openIssues =
      openPullRequests === null
        ? repo.open_issues_count
        : Math.max(repo.open_issues_count - openPullRequests, 0)

    const languageBytes = (languages || {}) as Record<string, number>

    const languageEntries = Object.entries(languageBytes).sort(
      ([, a], [, b]) => b - a,
    )

    const totalLanguageBytes = languageEntries.reduce(
      (total, [, bytes]) => total + bytes,
      0,
    )

    return {
      project,
      github: {
        info: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues,
          openPullRequests,
          watchers: repo.subscribers_count,
          homepage: repo.homepage,
          htmlUrl: repo.html_url,
          description: repo.description,
          license: repo.license?.name || null,
          language: repo.language || languageEntries[0]?.[0] || null,
          topics: repo.topics || [],
          defaultBranch: repo.default_branch,
          size: repo.size,
          networkCount: repo.network_count,
          createdAt: repo.created_at,
          pushedAt: repo.pushed_at,
          updatedAt: repo.updated_at,
        },
        languages: languageEntries.map(([name, bytes]) => ({
          name,
          bytes,
          percent:
            totalLanguageBytes > 0
              ? Number(((bytes / totalLanguageBytes) * 100).toFixed(1))
              : 0,
        })),
        contributors: contributors.map((c) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions,
        })),
        releases: releases.map((r) => ({
          name: r.name,
          tagName: r.tag_name,
          publishedAt: r.published_at,
          htmlUrl: r.html_url,
          body: r.body,
          bodyExcerpt: r.body ? extractExcerpt(r.body) : '',
          prerelease: r.prerelease,
          draft: r.draft,
          assetsCount: r.assets.length,
          downloadsCount: r.assets.reduce(
            (total, asset) => total + asset.download_count,
            0,
          ),
        })),
      },
    }
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch github data',
    })
  }
})
