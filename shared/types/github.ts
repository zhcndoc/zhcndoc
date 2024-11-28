import type { Endpoints } from "@octokit/types";

export type GithubRepo =
  Endpoints["GET /orgs/{org}/repos"]["response"]["data"][number];
