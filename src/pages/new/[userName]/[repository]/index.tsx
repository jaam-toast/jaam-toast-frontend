import { useRouter } from "next/router";

import TextField from "src/components/@shared/TextField";
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
    <div>
      <div>
        <p>You're almost done.</p>
        <p>Please follow the steps to configure your Project and deploy it.</p>
      </div>

      <BuildStepCard step={2} />

      {/* // TODO: make BuildOptionsForm component */}
      {/* // TODO: defaultBuildOptions={defaultBuildOptions} */}
      {/* // TODO: onBuildOptionsSubmit={(options: BuildOptions) => } */}
      <div>
        <div>
          <button color="light" onClick={handleClickPrev}>
            Prev
          </button>
          {isButtonNext && (
            <button color="light" onClick={() => !!deploy && deploy()}>
              Complete
            </button>
          )}
        </div>
        <div>
          <div>
            <p>Project Name</p>
            {/* // TODO: apply red point color */}
            {!isProjectNameAvailable && (
              <p variant="body2" sx={{ mt: 1 }}>
                Your Project Name is duplicated.
              </p>
            )}
            {/* // TODO: apply red point color when projectName is duplicated */}
            <TextField
              defaultValue={defaultProjectName ?? ""}
              onTextFieldChange={setProjectName}
              placeholder={defaultProjectName ?? ""}
              size="small"
              sx={{ fontSize: "small", width: "100%" }}
            />
          </div>

          <div sx={{ marginTop: 1.5 }}>
            <p>Node Version *</p>
            <SelectBox<NodeVersion>
              label="Node Version"
              type="nodeVersionChange"
              options={Object.values(NodeVersion)}
              onSelectionChange={setBuildOptions("nodeVersion")}
              defaultSelect={buildOptions.nodeVersion!}
            />
          </div>

          <div sx={{ marginTop: 1.5 }}>
            <p>Build Type *</p>
            <SelectBox<BuildType>
              label="Build Type"
              options={Object.values(BuildType)}
              onSelectionChange={setBuildOptions("buildType")}
            />
          </div>

          <div>
            <p>Install Command</p>
            <TextField
              placeholder={buildOptions.installCommand ?? ""}
              onTextFieldChange={setBuildOptions("installCommand")}
              size="small"
              sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
            />
          </div>

          <div>
            <p id="modal-description" variant="body2" sx={{ mt: 2 }}>
              Build Command
            </p>
            <TextField
              placeholder={buildOptions.buildCommand ?? ""}
              onTextFieldChange={setBuildOptions("buildCommand")}
              size="small"
              sx={{ fontSize: "small", width: "100%", marginTop: 1.5 }}
            />
          </div>

          <div sx={{ marginTop: 1.5 }}>
            <p id="modal-description" variant="body2" sx={{ mt: 2 }}>
              Environment Varables
            </p>
            <BuildOptionEnvsField />
          </div>
        </div>
      </div>
    </div>
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
