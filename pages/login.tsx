import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import { Box, Container, Divider, Typography } from "@mui/material";

import { getUserDeployments, login } from "../lib/api";
import loginState from "../lib/recoil/auth";
import userDeploymentsState from "../lib/recoil/userDeployments";

import ButtonLogin from "../components/ButtonLogin";
import NavBar from "../components/Navbar";

import { LoginData, UserDeploymentData } from "../types";

function Login() {
  const [isSSR, setIsSSR] = useState(true);
  const setLoginState = useSetRecoilState<LoginData | null>(loginState);
  const setUserDeploymentsState =
    useSetRecoilState<UserDeploymentData[]>(userDeploymentsState);

  const router = useRouter();
  const authCode = router.query.code;

  useEffect(() => {
    setIsSSR(false);
  }, []);

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
    <Container maxWidth={false} disableGutters>
      {!isSSR ? (
        <>
          <NavBar />
          <Divider />
          <Box
            component="div"
            display="flex"
            sx={{
              padding: 15,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Log in to Vercel
            </Typography>
            <Box sx={{ padding: 5 }}>
              <ButtonLogin />
              <Divider sx={{ padding: 1 }} />
            </Box>
          </Box>
          <Divider sx={{ marginTop: 20 }} />
        </>
      ) : null}
    </Container>
  );
}

export default Login;
