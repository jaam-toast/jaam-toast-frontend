import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

import Config from "src/config";

function useAuth() {
  const router = useRouter();

  const login = () => {
    const githubOauthLoginUrl = `${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;
    router.push(githubOauthLoginUrl);
  };
  const logout = () => {
    deleteCookie("loginData", {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    router.push("/");
  };

  return {
    login,
    logout,
  };
}

export default useAuth;
