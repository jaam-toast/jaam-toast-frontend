import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { deleteCookie, setCookie } from "cookies-next";

import { login } from "src/api";
import loginState from "src/recoil/auth";

import { LoginData, UserLoginData } from "types/auth";

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

        router.push("/");
      } catch (error) {
        console.info(error);
      }
    };

    handleLogin(authCode as string);
  }, [authCode, router, setLoginState]);

  const handleLogout = () => {
    // deleteCookie("loginData");
    // deleteCookie("userOrgs");
    // deleteCookie("userDeployments");
    setLoginState(null);

    router.push("/login");
  };

  return { loginData, handleLogout };
}

export default useAuth;
