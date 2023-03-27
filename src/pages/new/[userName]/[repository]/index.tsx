import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";

import {
  Button,
  BorderBox,
  CenterBox,
  TextField,
} from "src/components/@shared";
import BuildStepCard from "src/components/@shared/BuildStepCards";
import SelectBox from "src/components/@shared/SelectBox";
import BuildOptionEnvsField from "src/components/BuildOptions/BuildOptionEnvsField";
import useUser from "src/hooks/useUser";
import Config from "src/config";
import getUserFromCookie from "utils/getUserFromCookie";
import createRandomId from "utils/createRandomId";

import type {
  BuildOptions,
  BuildOptionsKeys,
  BuildOptionsTypes,
} from "types/projectOption";
import type { GetServerSideProps } from "next";
import type { Response, Project } from "types/api";

type BuildOptionsProps = {
  defaultOptions: Pick<
    BuildOptions,
    "projectName" | "installCommand" | "buildCommand"
  >;
};

function BuildOptionsPage({ defaultOptions }: BuildOptionsProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isProjectNameAvailable, setIsProjectNameAvailable] =
    useState<boolean>(true);

  const [buildOptions, setBuildOptions] = useState<BuildOptions>({
    projectName: defaultOptions.projectName,
    nodeVersion: null,
    envList: [],
    buildType: null,
    installCommand: defaultOptions.installCommand,
    buildCommand: defaultOptions.buildCommand,
  });

  const mutation = useMutation({
    mutationFn: () => {
      const {
        projectName,
        nodeVersion,
        installCommand,
        buildCommand,
        envList,
        buildType,
      } = buildOptions;

      return axios.post<Response<Project>>(
        `${Config.SERVER_URL_API}/projects?githubAccessToken=${user?.githubAccessToken}`,
        {
          userId: user?.id,
          space: "ponjaehyeok",
          repoName: "jamtotest0001",
          repoCloneUrl: "https://github.com/ponjaehyeok/jamtotest0001",
          projectUpdatedAt: new Date().toISOString(),
          projectName,
          nodeVersion,
          installCommand,
          buildCommand,
          envList,
          buildType,
          githubAccessToken: user?.githubAccessToken,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
    },
    onSuccess: () => {
      const { userName, repository } = router.query;

      // TODO: remove setCookie.
      setCookie("buildOptions", JSON.stringify(buildOptions));

      router.push(`/new/${userName}/${repository}/deploy`);
    },
  });

  const handleClickPrev = () => {
    router.back();
  };

  const handleOptionChange = (property: BuildOptionsKeys) => {
    return (option: BuildOptionsTypes) => {
      setBuildOptions(prev => ({
        ...prev,
        [property]: option,
      }));
    };
  };

  const validateProjectName = async (projectName: string) => {
    if (projectName === "") {
      if (!isProjectNameAvailable) {
        setIsProjectNameAvailable(true);
      }

      return;
    }

    try {
      const { data } = await axios.get<GetProjectResponse>(
        `${Config.SERVER_URL_API}/projects/${projectName}?githubAccessToken=${user?.githubAccessToken}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      if (!!data.result) {
        setIsProjectNameAvailable(false);
      } else if (!isProjectNameAvailable) {
        setIsProjectNameAvailable(true);
      }
    } catch (error) {
      if (!isProjectNameAvailable) {
        setIsProjectNameAvailable(true);
      }

      // TODO: error 분기 처리
      console.log(error);
    }
  };

  const handleProjectNameChange = (projectName: string) => {
    validateProjectName(projectName);
    handleOptionChange("projectName")(projectName);
  };

  const handleCompleteClick = () => {
    mutation.mutate();
  };

  const isButtonNext = !!buildOptions.nodeVersion && !!buildOptions.buildType;

  // TODO: fetch default domain & check duplication check logic.
  return (
    <Container fixed maxWidth="lg" sx={{ height: "90vh", p: 4 }}>
      <Box>
        <Typography id="modal-title" variant="h4" component="h3">
          You're almost done.
        </Typography>
        <Typography id="modal-title" variant="body2" gutterBottom>
          Please follow the steps to configure your Project and deploy it.
        </Typography>
      </Box>

      <BuildStepCard step={2} />

      {/* // TODO: make BuildOptionsForm component */}
      {/* // TODO: defaultBuildOptions={defaultBuildOptions} */}
      {/* // TODO: onBuildOptionsSubmit={(options: BuildOptions) => } */}
      <CenterBox>
        <BorderBox
          sx={{
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display="flex"
            sx={{ justifyContent: "space-between", width: "100%" }}
          >
            <Button color="light" onClick={handleClickPrev}>
              Prev
            </Button>
            {isButtonNext && (
              <Button color="light" onClick={handleCompleteClick}>
                Complete
              </Button>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Project Name
              </Typography>
              {/* // TODO: apply red point color */}
              {!isProjectNameAvailable && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Your Project Name is duplicated.
                </Typography>
              )}
              {/* // TODO: apply red point color when projectName is duplicated */}
              <TextField
                defaultValue={buildOptions.projectName}
                onTextFieldChange={handleProjectNameChange}
                placeholder={defaultOptions.projectName}
                size="small"
                sx={{ fontSize: "small", width: "100%" }}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Node Version *
              </Typography>
              <SelectBox
                label="Node Version"
                type="nodeVersionChange"
                options={["Node.js 14.x", "Node.js 16.x"]}
                onSelectionChange={handleOptionChange("nodeVersion")}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Build Type *
              </Typography>
              <SelectBox
                label="Build Type"
                options={["Create React App - SPA", "Next.js App - SSR"]}
                onSelectionChange={handleOptionChange("buildType")}
              />
            </Box>

            <Box>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Install Command
              </Typography>
              <TextField
                placeholder={defaultOptions.installCommand}
                onTextFieldChange={handleOptionChange("installCommand")}
                size="small"
                sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
              />
            </Box>

            <Box>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Build Command
              </Typography>
              <TextField
                placeholder={defaultOptions.buildCommand}
                onTextFieldChange={handleOptionChange("buildCommand")}
                size="small"
                sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Environment Varables
              </Typography>
              <BuildOptionEnvsField
                onEnvsChange={handleOptionChange("envList")}
              />
            </Box>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

type GetProjectResponse = {
  message: string;
  result: Project;
};

export const getServerSideProps: GetServerSideProps<
  BuildOptionsProps
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

  const { repository } = context.query;
  let defaultProjectName = repository as string;

  try {
    await axios.get<GetProjectResponse>(
      `${Config.SERVER_URL_API}/projects/${repository}?githubAccessToken=${user.githubAccessToken}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );

    defaultProjectName += `-${createRandomId()}`;
  } catch (error) {
    // TODO: 에러 처리 분기.
    console.log(error);
  }

  return {
    props: {
      defaultOptions: {
        projectName: defaultProjectName,
        installCommand: "npm install",
        buildCommand: "npm start",
      },
    },
  };
};

export default BuildOptionsPage;
