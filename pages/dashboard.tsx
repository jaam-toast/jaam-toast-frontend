import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { setCookie } from "cookies-next";

import { Box, Container, Divider } from "@mui/material";

import ButtonCreate from "../components/ButtonCreate";
import RepoCardList from "../components/RepoCardList";
import NavBar from "../components/Navbar";
import SearchInput from "../components/SearchInput";
import TemplateInitial from "../components/TemplateInitial";

import Login from "./login";

import { getUserDeployments } from "../lib/api";
import loginState, { isLoggedInState } from "../lib/recoil/auth";
import userDeploymentsState from "../lib/recoil/userDeployments";

import { LoginData, UserDeploymentData } from "../types";

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

        const filteredUserDeployments = userDeployments.map(deployData => {
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
    <Container maxWidth={false} disableGutters>
      {!isSSR && isLoggedIn ? (
        <>
          <NavBar />
          <Divider />
          <Container fixed maxWidth="lg">
            <Box
              display="flex"
              sx={{
                padding: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchInput />
              <ButtonCreate />
            </Box>
            {userDeploymentsList.length > 0 ? (
              <RepoCardList userDeploymentsList={userDeploymentsList} />
            ) : (
              <Box sx={{ width: "100%" }}>
                <TemplateInitial />
              </Box>
            )}
          </Container>
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default Dashboard;
