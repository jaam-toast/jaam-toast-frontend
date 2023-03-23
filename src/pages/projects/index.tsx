import { Box, Container } from "@mui/material";
import { getCookie } from "cookies-next";

import ProjectList from "src/components/ProjectList";
import { SearchInput } from "src/components/@shared";
import ButtonCreate from "src/components/ButtonCreate";
import useResetBuildOption from "src/hooks/useResetBuildOption";

import type { GetServerSideProps } from "next";
import type { Project } from "src/components/ProjectList";

type DashboardProps = {
  userProjects: Project[];
};

function Dashboard({ userProjects }: DashboardProps) {
  // useResetBuildOption();

  return (
    <Container maxWidth={false} disableGutters>
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
        <ProjectList projects={userProjects} />
      </Container>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({
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

  // TODO: fetch user projects.
  const userProjects = [
    {
      repoOwner: "repoOwner example 1",
      repoName: "repoName example 1",
      deployedUrl: "www.example-deployed-1.com",
      lastCommitMessage: "lats commit message example 1",
      repoUpdatedAt: "repo updated at example 1",
    },
    {
      repoOwner: "repoOwner example 2",
      repoName: "repoName example 2",
      deployedUrl: "www.example-deployed-2.com",
      lastCommitMessage: "lats commit message example 2",
      repoUpdatedAt: "repo updated at example 2",
    },
  ];

  return {
    props: {
      userProjects,
    },
  };
};

export default Dashboard;
