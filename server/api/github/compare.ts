import { GithubCompare } from "~/types/github";

export default defineCachedEventHandler(async (event) => {
  const { repo } = getQuery(event);

  try {
    const result = await fetchGithub<GithubCompare>(
      `/repos/${repo}/compare/main...upstream`
    );

    return result;
  } catch (error) {
    return {};
  }
});
