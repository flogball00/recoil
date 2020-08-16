import { GITHUB_API_URL } from "../constants";
//TODO remove token
function client(url, endpoint, { body, ...customConfig } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window.fetch(`${url}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    data.link = response.headers.get("Link");
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export function githubClient() {
  return client.apply(this, [GITHUB_API_URL, ...arguments]);
}
