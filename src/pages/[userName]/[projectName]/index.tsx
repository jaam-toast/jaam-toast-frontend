import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Box, Container, Divider, Typography } from "@mui/material";

import PreviewCommandsTextField from "src/components/Preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/Preview/PreviewEnvList";
import BuildingLog from "src/components/@shared/BuildingLog";
import { BorderBox } from "src/components/@shared";
import getUserFromCookie from "utils/getUserFromCookie";

import type { GetServerSideProps } from "next";
import {
  useProjectQuery,
  projectPrefetchQuery,
} from "src/hooks/useProjectQuery";

type ProjectDetailPageProps = {
  dehydratedState?: DehydratedState;
};

function ProjectDetailPage() {
  const router = useRouter();
  const { projectName } = router.query;
  const { data: project } = useProjectQuery(projectName);

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
                src={`https://${project?.deployedUrl}`}
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
            {`https://${project?.deployedUrl}`}
          </Typography>
          <PreviewCommandsTextField
            installCommand={project?.installCommand}
            buildCommand={project?.buildCommand}
          />
          <PreviewEnvList envsList={project?.envList} />
          <BuildingLog buildingLog={project?.buildingLog} />
        </Box>
      </BorderBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProjectDetailPageProps
> = async context => {
  const user = getUserFromCookie(context);
  const { projectName } = context.query;

  if (!user || !projectName || typeof projectName === "object") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  await queryClient.prefetchQuery(projectPrefetchQuery(user, projectName));

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
