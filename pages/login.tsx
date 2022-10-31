import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import { setCookies } from "cookies-next";

import Container from "@mui/material/Container";

import { login } from "../lib/api";
import loginState from "../lib/recoil/auth";

import ButtonLogin from "../components/ButtonLogin";

import { LoginData } from "../types";

function Login() {
  const setLoginState = useSetRecoilState<LoginData | null>(loginState);
  const router = useRouter();
  const authCode = router.query.code;

  useEffect(() => {
    const handleLogin = async (code: string) => {
      try {
        const { data, githubAccessToken, accessToken } = await login(code);

        setLoginState({ data, githubAccessToken, accessToken });
        setCookies(
          "loginData",
          JSON.stringify({ data, githubAccessToken, accessToken }),
        );

        router.replace("/dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    if (authCode) {
      handleLogin(authCode as string);
    }
  }, [authCode, router, setLoginState]);

  return (
    <Container maxWidth="lg">
      <ButtonLogin />
    </Container>
  );
}

export default Login;
