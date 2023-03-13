import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { deleteCookie, setCookie } from "cookies-next";

import { login } from "../api";
import loginState from "../recoil/auth";

import { LoginData, UserLoginData } from "../../types/index";

function useAuth(authCode?: string | string[] | undefined) {
  const setLoginState = useSetRecoilState<LoginData | null>(loginState);

  const [loginData, setLoginData] = useState<UserLoginData>();
  const router = useRouter();

  useEffect(() => {
    if (!authCode) return;

    const handleLogin = async (code: string) => {
      try {
        const { data, githubAccessToken, accessToken } = await login(code);
        setLoginData(data);

        setLoginState({ data, githubAccessToken, accessToken });
        setCookie(
          "loginData",
          JSON.stringify({ data, githubAccessToken, accessToken }),
        );

        router.push("/dashboard");
      } catch (error) {
        console.info(error);
      }
    };

    handleLogin(authCode as string);
  }, [authCode, router, setLoginState]);

  const handleLogout = () => {
    deleteCookie("loginData");
    deleteCookie("userOrgs");
    deleteCookie("userDeployments");
    setLoginState(null);

    router.push("/login");
  };

  return { loginData, handleLogout };
}

export default useAuth;
