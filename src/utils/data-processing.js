export const formatRepositoryResponse = (response) => ({
  link: response.link,
  content: response.map((repo) => ({
    name: repo.name,
    owner: { login: repo.owner.login, avatar_url: repo.owner.avatar_url },
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks,
    watchers: repo.watchers,
    created: repo.created_at,
    updated: repo.updated_at,
    url: repo.html_url,
  })),
});
