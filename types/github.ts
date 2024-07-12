import type { Endpoints } from "@octokit/types";

export type GithubCommit =
  Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

export type GithubRepo =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
