import type { Endpoints } from "@octokit/types";

export type GithubRepo =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type GithubCompare =
  Endpoints["GET /repos/{owner}/{repo}/compare/{basehead}"]["response"]["data"];
