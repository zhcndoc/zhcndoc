import { defineCronHandler } from "#nuxt/cron";
import dayjs from "dayjs";
import { writeFileSync } from "fs";
import { GithubCommit, GithubRepo } from "~/types/github";

export interface BaseRepo {
  name: string;
  type: string;
  origin: string;
  origin_branch: string;
  upstream: string;
  upstream_branch: string;
  origin_pushed_at?: string;
  upstream_pushed_at?: string;
  diff_time?: number;
  homepage?: string;
  description?: string;
  topics?: string[];
  watchers?: number;
  forks?: number;
  stars?: number;
}

export default defineCronHandler("everyMinute", async () => {
  const baseUrl = "https://api.github.com";
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const fetchRepoInfo = async (repo: BaseRepo): Promise<BaseRepo> => {
    const { origin, origin_branch, upstream, upstream_branch } = repo;

    const [originCommits, upstreamCommits, originInfo] = await Promise.all([
      $fetch<GithubCommit>(`${baseUrl}/repos/${origin}/commits`, {
        headers,
        params: { per_page: 1, sha: origin_branch },
      }),
      $fetch<GithubCommit>(`${baseUrl}/repos/${upstream}/commits`, {
        headers,
        params: { per_page: 1, sha: upstream_branch },
      }),
      $fetch<GithubRepo>(`${baseUrl}/repos/${origin}`, { headers }),
    ]);

    const diffTime =
      dayjs(originCommits[0].commit.committer?.date).unix() -
      dayjs(upstreamCommits[0].commit.committer?.date).unix();

    return {
      ...repo,
      description: originInfo.description!,
      diff_time: diffTime,
      forks: originInfo.forks,
      homepage: originInfo.homepage!,
      stars: originInfo.stargazers_count,
      topics: originInfo.topics,
      watchers: originInfo.stargazers_count,
    };
  };

  const newRepos: BaseRepo[] = await Promise.all(allRepos.map(fetchRepoInfo));

  writeFileSync("repos-data.json", JSON.stringify(newRepos, null, 2));
});
