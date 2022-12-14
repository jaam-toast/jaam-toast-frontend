const Config = {
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  SERVER_URL_API: process.env.NEXT_PUBLIC_SERVER_URL_API,
  HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
  CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_URI: process.env.NEXT_PUBLIC_GITHUB_OAUTH_URI,
  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
  API_SCOPE: process.env.NEXT_PUBLIC_GITHUB_SCOPE,
};

const GITHUB_LOGIN_OAUTH_URI = `${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;

export { GITHUB_LOGIN_OAUTH_URI };

export default Config;
