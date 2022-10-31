import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
    <Container>
      {!isSSR && isLoggedIn ? (
        <>
          <NavBar />
          <Container maxWidth="lg">
            <Box
              display="flex"
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                m: 1,
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
