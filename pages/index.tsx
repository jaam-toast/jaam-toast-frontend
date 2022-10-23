import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonLogin from "../components/ButtonLogin";

import Dashboard from "./dashboard";
import loginState from "../lib/recoil/auth";

function PageLanding() {
  const isLoggedIn = useRecoilValue(loginState);
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }

    setIsRendered(true);
  }, [isLoggedIn, router]);

  return (
    <Container>
      {isRendered && isLoggedIn ? (
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
