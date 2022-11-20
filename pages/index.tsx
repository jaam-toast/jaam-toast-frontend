import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Typography } from "@mui/material";
import NavBar from "../components/Navbar";
import Dashboard from "./dashboard";
import ButtonLogin from "../components/ButtonLogin";
import { isLoggedInState } from "../lib/recoil/auth";

function PageLanding() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }

    setIsSSR(false);
  }, [isLoggedIn, router]);

  return (
    <Container maxWidth={false} disableGutters>
      {!isSSR && isLoggedIn ? (
        <Dashboard />
      ) : (
        <>
          <NavBar />
          <Box
            component="div"
            display="flex"
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              verticalAlign: "middle",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              position="relative"
              src="/landingpage_content.png"
              alt="jaam-toast"
              sx={{
                width: "100%",
                height: "calc(100vh - 64px)",
                maxWidth: { xs: "100%", md: "100%" },
                maxHeight: {
                  xs: "calc(100vh - 64px)",
                  md: "calc(100vh - 64px)",
                },
              }}
            />
            <Typography
              position="absolute"
              variant="h2"
              sx={{
                padding: 1,
                height: "70vh",
                fontWeight: "bold",
              }}
            >
              Deploy your own project.
            </Typography>
            <Typography
              position="absolute"
              variant="body1"
              sx={{
                padding: 1,
                height: "45vh",
                fontColor: "#d3d3d3",
              }}
            >
              Every deployment from the 2022 edition of <b>jaam-toast.</b>
            </Typography>
            <Box position="absolute" sx={{ padding: 1, marginTop: 40 }}>
              <ButtonLogin />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default PageLanding;
