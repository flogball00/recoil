import { GITHUB_API_URL } from "../constants";

function client(url, endpoint, { body, ...customConfig } = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "token 77a73e87c1d9fd071669f5f2f668eec80c31c5ce",
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
