import { Box, Container, Divider, Typography } from "@mui/material";

import PreviewCommandsTextField from "src/components/Preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/Preview/PreviewEnvList";
import BuildingLog from "src/components/@shared/BuildingLog";
import { BorderBox } from "src/components/@shared";

import type { Project } from "src/components/ProjectList/ProjectCardList";
import type { GetServerSideProps } from "next";
import getUserFromCookie from "utils/getUserFromCookie";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import Config from "src/config";
import axios from "axios";
import useUser from "src/hooks/useUser";
import { useRouter } from "next/router";

type ProjectDetailPageProps = {
  dehydratedState?: DehydratedState;
};

type Response<T> = {
  message: string;
  result: T;
};

function ProjectDetailPage() {
  const router = useRouter();
  const { user } = useUser();
  const { projectName } = router.query;

  const { data: query } = useQuery(
    ["dashboard-page", "project", projectName],
    async () => {
      const { data } = await axios.get<Response<Project>>(
        `${Config.SERVER_URL_API}/projects/${projectName}?githubAccessToken=${user?.githubAccessToken}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      return data;
    },
  );
  const { installCommand, buildCommand, deployedUrl, envList, buildingLog } =
    query?.result ?? {};

  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <BorderBox sx={{ boxShadow: 24, p: 4 }}>
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Box sx={{ width: "50%" }}>
            <Typography id="modal-title" variant="h6" component="h3">
              Preview
            </Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ ...IframeBoxStyle }}>
            <Box sx={{ ...IframeStyle }}>
              <iframe
                title="jaam-toast-preview"
                src={`https://${deployedUrl as string}`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                sandbox="allow-scripts"
                loading="eager"
                frameBorder="0"
              />
            </Box>
          </Box>
          <Typography id="preview-url" variant="h6" component="h4">
            {`https://${deployedUrl as string}`}
          </Typography>
          <PreviewCommandsTextField
            installCommand={installCommand}
            buildCommand={buildCommand}
          />
          <PreviewEnvList envsList={envList} />
          <BuildingLog buildingLog={buildingLog} />
        </Box>
      </BorderBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProjectDetailPageProps
> = async context => {
  const user = getUserFromCookie(context);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const { projectName } = context.query;

  await queryClient.prefetchQuery(
    ["dashboard-page", "project", projectName],
    async () => {
      const { data } = await axios.get<Response<Project>>(
        `${Config.SERVER_URL_API}/projects/${projectName}?githubAccessToken=${user?.githubAccessToken}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      return data;
    },
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const IframeBoxStyle = {
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "56.25%",
};

const IframeStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
};

export default ProjectDetailPage;
