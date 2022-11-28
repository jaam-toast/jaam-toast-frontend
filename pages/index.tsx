import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { Box, Container, Typography } from "@mui/material";

import Head from "next/head";
import NavBar from "../components/Navbar";
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
    <>
      <Head>
        <title>
          Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your
          Own Websites Quick And Easy Like Toasts
        </title>
        <meta
          property="og:url"
          content="https://jaam-toast-frontend.vercel.app/"
        />
        <Container maxWidth={false} disableGutters>
          {!isSSR && !isLoggedIn ? (
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
                <Typography
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
                  variant="subtitle1"
                  sx={{
                    padding: 1,
                    fontColor: "#d3d3d3",
                  }}
                >
                  Every deployment from the 2022 edition of <b>jaam-toast.</b>
                </Typography>
                <Box sx={{ padding: 1 }}>
                  <ButtonLogin />
                </Box>
              </Box>
            </>
          ) : null}
        </Container>
      </Head>

      <Container maxWidth={false} disableGutters>
        {!isSSR && !isLoggedIn ? (
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
              <Typography
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
                variant="subtitle1"
                sx={{
                  padding: 1,
                  fontColor: "#d3d3d3",
                }}
              >
                Every deployment from the 2022 edition of <b>jaam-toast.</b>
              </Typography>
              <Box sx={{ padding: 1 }}>
                <ButtonLogin />
              </Box>
            </Box>
          </>
        ) : null}
      </Container>
    </>
  );
}

export default PageLanding;
