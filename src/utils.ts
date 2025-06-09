export const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

export const searchUsers = async (
  username: string,
  controller: AbortController,
  page: number = 1
) => {
  const url = `https://api.github.com/search/users?q=${username}
  &per_page=10&page=${page}&sort=created&order=desc`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await fetch(url, { headers, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  [key: string]: any;
};

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  html_url: string;
};
