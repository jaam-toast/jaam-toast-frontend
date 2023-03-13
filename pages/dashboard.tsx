import Head from "next/head";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import { Box, Container, Divider } from "@mui/material";

import ButtonCreate from "../src/components/ButtonCreate";
import RepoCardList from "../src/components/RepoCardList";
import NavBar from "../src/components/Navbar";
import SearchInput from "../src/components/SearchInput";
// import TemplateInitial from "../components/TemplateInitial";

import Login from "./login";

import { getUserDeployments } from "../src/lib/api";
import loginState, { isLoggedInState } from "../src/lib/recoil/auth";
import userDeploymentsState from "../src/lib/recoil/userDeployments";

import { LoginData, UserDeploymentData } from "../src/types";

function Dashboard() {
  const { data } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [userDeploymentsList, setUserDeploymentsList] =
    useRecoilState<UserDeploymentData[]>(userDeploymentsState);

  const router = useRouter();
  const [isSSR, setIsSSR] = useState(true);

  const userId = data?._id;

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }

    setIsSSR(false);
  }, [isLoggedIn, router]);

  useEffect(() => {
    const handleUserDeployments = async () => {
      try {
        const { data: userDeployments } = await getUserDeployments(userId);

        const copyUserDeployments: UserDeploymentData[] = JSON.parse(
          JSON.stringify(userDeployments),
        );

        const filteredUserDeployments = copyUserDeployments.map(deployData => {
          const filteredDeployData = deployData;
          filteredDeployData.buildingLog = [];

          return filteredDeployData;
        });

        setUserDeploymentsList(userDeployments);
        setCookie("userDeployments", JSON.stringify(filteredUserDeployments));
      } catch (error) {
        console.info(error);
      }
    };

    handleUserDeployments();
  }, [setUserDeploymentsList, userId]);

  return (
    <>
      <Head>
        <title>
          Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your
          Own Websites Quick And Easy Like Toasts
        </title>
      </Head>
      <Container maxWidth={false} disableGutters>
        {!isSSR && isLoggedIn ? (
          <>
            <NavBar />
            <Divider />
            <Container fixed maxWidth="lg" sx={{ height: "90vh" }}>
              <Box
                display="flex"
                sx={{
                  padding: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <SearchInput />
                <ButtonCreate />
              </Box>
              {userDeploymentsList.length > 0 ? (
                <RepoCardList />
              ) : (
                <Box sx={{ width: "100%" }}>
                  {/* //   <TemplateInitial /> */}
                </Box>
              )}
            </Container>
          </>
        ) : (
          <Login />
        )}
      </Container>
    </>
  );
}

export default Dashboard;
