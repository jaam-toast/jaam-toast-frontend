import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Button } from "@mui/material";
import { getCookie } from "cookies-next";

import ProjectList from "src/components/ProjectList";
import { SearchInput } from "src/components/@shared";

import type { GetServerSideProps } from "next";

type GithubUserData = {
  _id: string;
  username: string;
  userGithubUri: string;
  userImage: string;
};

type LoginData = {
  data?: GithubUserData;
  githubAccessToken?: string;
  accessToken?: string;
};

type DashboardProps = {
  username: string;
};

// TODO: remove username
function UserProjects({ username }: DashboardProps) {
  const router = useRouter();
  const [searchword, setSearchword] = useState<string>("");

  const handleCreateProjectClick = () => {
    router.push(`/new/${username}`);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Container fixed maxWidth="lg" sx={{ height: "90vh" }}>
        {/* //TODO: make variant. */}
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
            onSearchInputChange={setSearchword}
            placeholder="Search..."
            helperText="Please enter your Project name."
            sx={{
              m: 1,
              width: "75%",
            }}
          />
          <Box sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              color="dark"
              sx={{ m: 1 }}
              onClick={handleCreateProjectClick}
            >
              New Project
            </Button>
          </Box>
        </Box>
        {/* // TODO: Skeleton UI */}
        <ProjectList searchword={searchword} />
      </Container>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async ({
  req,
  res,
}) => {
  const loginCookieData = getCookie("loginData", { req, res });

  if (!loginCookieData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const loginData: LoginData =
    typeof loginCookieData === "boolean" ? {} : JSON.parse(loginCookieData);
  const username = loginData?.data?.username ?? "";

  return {
    props: {
      username,
    },
  };
};

export default UserProjects;
