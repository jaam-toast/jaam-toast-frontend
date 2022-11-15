import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ButtonCreate from "../components/ButtonCreate";
import Content from "../components/Content";
import NavBar from "../components/Navbar";
import SearchInput from "../components/SearchInput";

import Login from "./login";
import { isLoggedInState } from "../lib/recoil/auth";

function Dashboard() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }

    setIsSSR(false);
  }, [isLoggedIn, router]);

  return (
    <Container maxWidth={false} disableGutters>
      {!isSSR && isLoggedIn ? (
        <>
          <NavBar />
          <Divider />
          <Container maxWidth="lg">
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
            <Content />
          </Container>
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default Dashboard;
