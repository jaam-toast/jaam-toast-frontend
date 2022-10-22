declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_HOST_URL: string;
    NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_GITHUB_OAUTH_URI: string;
    NEXT_PUBLIC_REDIRECT_URI: string;
    NEXT_PUBLIC_GITHUB_SCOPE: string;
  }
}
