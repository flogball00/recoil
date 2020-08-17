export const formatRepositoryResponse = (response) => ({
  link: response.link,
  content: response.map((repo) => ({
    name: repo.name,
    owner: { login: repo.owner?.login, avatar_url: repo.owner?.avatar_url },
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks,
    watchers: repo.watchers,
    created: repo.created_at,
    updated: repo.updated_at,
    url: repo.html_url,
    language: repo.language,
  })),
});

export const formatCommitResponse = (response) => {
  return response.map((data) => ({
    author: data.commit?.author?.name,
    message: data.commit?.message,
    url: data.html_url,
    date: data.commit?.author?.date,
    sha: data.sha,
    authorUrl: data.author?.html_url,
  }));
};

export const formatDescription = (description) => {
  if (description?.length > 1000) {
    return description.substring(0, 1050) + "...";
  }
  return description || "No Description Provided";
};

export const getOrgNumber = (link) => {
  const pattern = /([0-9]+)/g;
  const numbers = link.match(pattern) || [];
  return numbers[0];
};
