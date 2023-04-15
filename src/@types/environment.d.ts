interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_GITHUB_CLIENT_ID: string;
  readonly VITE_GITHUB_CLIENT_SECRET: string;
  readonly VITE_GITHUB_OAUTH_URI: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_GITHUB_SCOPE: string;
  readonly VITE_SERVER_URL_API: string;
  readonly VITE_HOST_API_URL: string;
  readonly VITE_SCREENSHOT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
