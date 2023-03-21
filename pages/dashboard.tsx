import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Box, Container } from "@mui/material";

import Login from "./login";
import ButtonCreate from "src/components/ButtonCreate";
import RepoCardList from "src/components/ProjectList";
import { SearchInput } from "src/components/@shared";
import loginState, { isLoggedInState } from "src/recoil/auth";
import useResetBuildOption from "src/hooks/useResetBuildOption";

import { LoginData } from "types/auth";

function Dashboard() {
  const { data: user } =
    useRecoilValue<LoginData | null>(loginState) || ({} as LoginData);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const router = useRouter();
  useResetBuildOption();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <Container maxWidth={false} disableGutters>
      {isLoggedIn ? (
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
            <SearchInput
              placeholder="Search..."
              helperText="Please enter your Project name."
              sx={{
                m: 1,
                width: "75%",
              }}
            />
            <ButtonCreate />
          </Box>
          <RepoCardList userId={user._id} />
        </Container>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default Dashboard;
