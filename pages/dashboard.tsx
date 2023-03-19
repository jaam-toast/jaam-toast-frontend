import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Box, Container, Divider } from "@mui/material";

import Login from "./login";
import ButtonCreate from "src/components/ButtonCreate";
import RepoCardList from "src/components/RepoCardList";
import NavBar from "src/components/Navbar";
import SearchInput from "src/components/SearchInput";

import { TITLE } from "lib/constants/metadata";
import useFetchDeployment from "lib/hooks/useFetchDeployment";
import loginState, { isLoggedInState } from "lib/recoil/auth";

import { LoginData } from "types/auth";

function Dashboard() {
  const { data: user } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();
  const userDeploymentsList = useFetchDeployment(user?._id);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }

    setIsSSR(false);
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
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
              {userDeploymentsList.length > 0 && <RepoCardList />}
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
