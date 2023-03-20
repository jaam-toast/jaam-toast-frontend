import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";

import ButtonLogin from "src/components/ButtonLogin";
import useAuth from "lib/hooks/useAuth";
import { TITLE } from "lib/constants/metadata";

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
        <title>{TITLE}</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        {!isSSR ? (
          <>
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
