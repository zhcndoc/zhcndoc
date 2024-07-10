import { defineCronHandler } from "#nuxt/cron";
import dayjs from "dayjs";
import { writeFileSync } from "fs";

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

export interface GithubRepo extends BaseRepo {
  description: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks: number;
  pushed_at: string;
}

export default defineCronHandler("everyMinute", async () => {
  const baseUrl = "https://api.github.com";
  const authHeader = {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  };

  const fetchRepoInfo = async (repo: BaseRepo): Promise<BaseRepo> => {
    const { origin, upstream } = repo;

    const [originInfo, upstreamInfo]: [GithubRepo, GithubRepo] =
      await Promise.all([
        $fetch<GithubRepo>(`${baseUrl}/repos/${origin}`, authHeader),
        $fetch<GithubRepo>(`${baseUrl}/repos/${upstream}`, authHeader),
      ]);

    const timeDiff =
      dayjs(originInfo.pushed_at).unix() - dayjs(upstreamInfo.pushed_at).unix();

    return {
      description: originInfo.description,
      homepage: originInfo.homepage,
      topics: originInfo.topics,
      stars: originInfo.stargazers_count,
      watchers: originInfo.stargazers_count,
      forks: originInfo.forks,
      origin_pushed_at: originInfo.pushed_at,
      upstream_pushed_at: upstreamInfo.pushed_at,
      diff_time: timeDiff,
      ...repo,
    };
  };

  const newRepos: BaseRepo[] = await Promise.all(allRepos.map(fetchRepoInfo));

  writeFileSync("repos-data.json", JSON.stringify(newRepos, null, 2));
});
