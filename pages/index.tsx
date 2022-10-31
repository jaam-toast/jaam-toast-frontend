import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonLogin from "../components/ButtonLogin";

import Dashboard from "./dashboard";
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
    <Container>
      {!isSSR && isLoggedIn ? (
        <Dashboard />
      ) : (
        <Container maxWidth="lg">
          <Box
            display="flex"
            sx={{
              justifyContent: "center",
              verticalAlign: "middle",
              alignItems: "center",
              m: 1,
            }}
          >
            <ButtonLogin />
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default PageLanding;
