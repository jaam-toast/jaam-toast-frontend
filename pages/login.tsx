import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import Container from "@mui/material/Container";

import { getUserDeployments, login } from "../lib/api";
import loginState from "../lib/recoil/auth";
import userDeploymentsState from "../lib/recoil/userDeployments";

import ButtonLogin from "../components/ButtonLogin";

import { LoginData, UserDeploymentData } from "../types";

function Login() {
  const setLoginState = useSetRecoilState<LoginData | null>(loginState);
  const setUserDeploymentsState =
    useSetRecoilState<UserDeploymentData[]>(userDeploymentsState);

  const router = useRouter();
  const authCode = router.query.code;

  useEffect(() => {
    const handleLogin = async (code: string) => {
      try {
        const { data, githubAccessToken, accessToken } = await login(code);

        setLoginState({ data, githubAccessToken, accessToken });
        setCookie(
          "loginData",
          JSON.stringify({ data, githubAccessToken, accessToken }),
        );

        const { data: userDeployments } = await getUserDeployments(data._id);

        const filteredUserDeployments = userDeployments.map(deployData => {
          const filteredDeployData = deployData;
          filteredDeployData.buildingLog = [];

          return filteredDeployData;
        });

        setUserDeploymentsState(userDeployments);
        setCookie("userDeployments", JSON.stringify(filteredUserDeployments));

        router.replace("/dashboard");
      } catch (error) {
        console.info(error);
      }
    };

    if (authCode) {
      handleLogin(authCode as string);
    }
  }, [authCode, router, setLoginState, setUserDeploymentsState]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ButtonLogin />
    </Container>
  );
}

export default Login;
