import { GITHUB_API_URL } from "../constants";

function client(url, endpoint, { body, ...customConfig } = {}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "token 5528c12b7fef21c8d24afb63f5bfc5739e9df958",
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
