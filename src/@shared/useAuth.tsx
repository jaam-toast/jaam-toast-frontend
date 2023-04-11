import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Config from "../config";

export function useAuth() {
  // const navigate = useNavigate();

  const user = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData") as string)
    : null;

  // const login = () => {
  //   const githubOauthLoginUrl = `//${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;
  //   navigate(githubOauthLoginUrl);
  // };

  // const logout = () => {
  //   Cookies.remove("loginData");
  //   navigate("/");
  // };

  return {
    user,
    // login,
    // logout,
  };
}
