const Config = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL,
  SERVER_URL_API: import.meta.env.VITE_SERVER_URL_API,
  HOST_URL: import.meta.env.VITE_HOST_URL,
  HOST_API_URL: import.meta.env.VITE_HOST_API_URL,
  CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_URI: import.meta.env.VITE_GITHUB_OAUTH_URI,
  REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI,
  API_SCOPE: import.meta.env.VITE_GITHUB_SCOPE,
};

export default Config;
