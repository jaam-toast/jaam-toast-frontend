import { useEffect } from "react";
import { useRouter } from "next/router";
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
import {
  useDefaultProjectName,
  useIsProjectNameAvailable,
  useProjectNameActions,
} from "src/hooks/useProjectNameStore";
import {
  useBuildOptions,
  useSetBuildOptions,
} from "src/hooks/useBuildOptionsStore";
import useProjectMutaion from "src/hooks/useProjectMutaion";
import getUserFromCookie from "utils/getUserFromCookie";

import { BuildType, NodeVersion } from "types/build";
import type { GetServerSideProps } from "next";

function BuildOptionsPage() {
  const router = useRouter();
  // TODO: defaultProjectName 결정 로직.
  const defaultProjectName = useDefaultProjectName();
  const isProjectNameAvailable = useIsProjectNameAvailable();
  const { setProjectName, setDefaultProjectName } = useProjectNameActions();

  const buildOptions = useBuildOptions();
  const setBuildOptions = useSetBuildOptions();

  const deploy = useProjectMutaion({
    // TODO: validation fail 처리.
    onValidateFail: console.log,
    onSuccess: () => {
      const { userName, repository } = router.query;
      router.push(`/new/${userName}/${repository}/deploy`);
    },
    // TODO: 에러 처리.
    onError: () => {},
  });

  const handleClickPrev = () => {
    router.back();
  };

  const isButtonNext = !!buildOptions.nodeVersion && !!buildOptions.buildType;

  // TODO: repo 미선택 시 query에서 defaultProjectName 할당 로직. 에러 발생으로 주석 처리.
  // useEffect(() => {
  // const { repository } = router.query;

  //   if (!defaultProjectName) {
  //     setDefaultProjectName("repository" as string);
  //   }
  // }, []);

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
              <Button color="light" onClick={() => !!deploy && deploy()}>
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
                defaultValue={defaultProjectName ?? ""}
                onTextFieldChange={setProjectName}
                placeholder={defaultProjectName ?? ""}
                size="small"
                sx={{ fontSize: "small", width: "100%" }}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Node Version *
              </Typography>
              <SelectBox<NodeVersion>
                label="Node Version"
                type="nodeVersionChange"
                options={Object.values(NodeVersion)}
                onSelectionChange={setBuildOptions("nodeVersion")}
                defaultSelect={buildOptions.nodeVersion!}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Build Type *
              </Typography>
              <SelectBox<BuildType>
                label="Build Type"
                options={Object.values(BuildType)}
                onSelectionChange={setBuildOptions("buildType")}
              />
            </Box>

            <Box>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Install Command
              </Typography>
              <TextField
                placeholder={buildOptions.installCommand ?? ""}
                onTextFieldChange={setBuildOptions("installCommand")}
                size="small"
                sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
              />
            </Box>

            <Box>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Build Command
              </Typography>
              <TextField
                placeholder={buildOptions.buildCommand ?? ""}
                onTextFieldChange={setBuildOptions("buildCommand")}
                size="small"
                sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
              />
            </Box>

            <Box sx={{ marginTop: 1.5 }}>
              <Typography id="modal-description" variant="body2" sx={{ mt: 2 }}>
                Environment Varables
              </Typography>
              <BuildOptionEnvsField />
            </Box>
          </Box>
        </BorderBox>
      </CenterBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async context => {
  const user = getUserFromCookie(context);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default BuildOptionsPage;
