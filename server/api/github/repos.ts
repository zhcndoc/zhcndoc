import { GithubRepo } from "~/types/github";

export default defineCachedEventHandler(async (event) => {
  const { repo } = getQuery(event);

  const result = await fetchGithub<GithubRepo>(`/repos/${repo}`);

  return result;
});
