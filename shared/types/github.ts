import type { Endpoints } from "@octokit/types";

export type GithubRepo =
  Endpoints["GET /orgs/{org}/repos"]["response"]["data"][number];

export type GithubCompare =
  Endpoints["GET /repos/{owner}/{repo}/compare/{base}...{head}"]["response"]["data"];
