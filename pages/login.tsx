import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";

import ButtonLogin from "../src/components/ButtonLogin";
import NavBar from "../src/components/Navbar";
import useAuth from "../src/lib/hooks/useAuth";

function Login() {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();
  const authCode: string | string[] | undefined = router.query.code;

  useAuth(authCode);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>
        <title>
          Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your
          Own Websites Quick And Easy Like Toasts
        </title>
      </Head>
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
                Login to Jaam Toast
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
    </>
  );
}

export default Login;
