import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import PreviewCommandsTextField from "src/components/Preview/PreviewCommandsTextField";
import PreviewEnvList from "src/components/Preview/PreviewEnvList";
import BuildingLog from "src/components/@shared/BuildingLog";
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
    <div>
      <div>
        <div>
          <div>
            <p>Preview</p>
          </div>
          <div>
            <div>
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
            </div>
          </div>
          <p>{`https://${project?.deployedUrl}`}</p>
          <PreviewCommandsTextField
            installCommand={project?.installCommand}
            buildCommand={project?.buildCommand}
          />
          <PreviewEnvList envsList={project?.envList} />
          <BuildingLog buildingLog={project?.buildingLog} />
        </div>
      </div>
    </div>
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

export default ProjectDetailPage;
