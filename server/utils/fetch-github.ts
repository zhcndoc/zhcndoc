export const fetchGithub = <T>(url: string): Promise<T> => {
  const baseUrl = "https://api.github.com";
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  return $fetch(`${baseUrl}${url}`, { headers });
};
