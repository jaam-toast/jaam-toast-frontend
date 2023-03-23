import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

import Config from "src/config";

import type { ReactElement } from "react";

type User = {
  id: string;
  name: string;
  githubUri: string;
  image: string;
  githubAccessToken: string;
  accessToken: string;
};

const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  user: User;
  children: ReactElement | ReactElement[];
};

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  const router = useRouter();

  const login = () => {
    const githubOauthLoginUrl = `${Config.GITHUB_OAUTH_URI}?client_id=${Config.CLIENT_ID}&redirect_uri=${Config.REDIRECT_URI}&scope=${Config.API_SCOPE}`;
    router.push(githubOauthLoginUrl);
  };

  const logout = () => {
    deleteCookie("loginData");
    router.push("/");
  };

  if (!user) {
    throw Error("anauthorized user");
  }

  return {
    user,
    login,
    logout,
  };
}

export default useUser;
