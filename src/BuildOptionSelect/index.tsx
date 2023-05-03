import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TextField, BuildStepCard, SelectBox, EnvField } from "../@shared";
import {
  useBuildOptions,
  useSetBuildOptions,
  useSetProjectName,
  useCreateProjectMutation,
  usePresetBuildOptions,
  usePresetBuildOptionActions,
  useSpaceQuery,
} from "../@hooks";
import * as css from "./index.css";

import { FRAMEWORK, NODE_VERSION } from "../@types/build";
import { FRAMEWORK_PRESET } from "../@config/frameworks";

export function BuildOptionSelect() {
  const navigate = useNavigate();
  const params = useParams();

  const { data: spaces } = useSpaceQuery();
  const {
    defaultProjectName,
    defaultBuildCommand,
    defaultInstallCommand,
    defaultNodeVersion,
  } = usePresetBuildOptions();
  const buildOptions = useBuildOptions();
  const setBuildOptions = useSetBuildOptions();
  const setProjectName = useSetProjectName();
  const { setRepoName, setSpace, setDefaultCommand } =
    usePresetBuildOptionActions();

  const deploy = useCreateProjectMutation({
    onSuccess: () => {
      navigate(`./deploy`);
    },
    // TODO: 에러 처리.
    onError: () => {},
  });

  const handleClickPrev = () => {
    navigate(-1);
  };

  const isButtonNext = !!buildOptions.framework;

  useEffect(() => {
    const { userName, repository } = params;
    const space = spaces?.find(space => space.spaceName === userName);

    if (!repository || !userName || !!buildOptions.projectName || !space) {
      return;
    }

    setSpace(space);
    setRepoName(repository);
  }, []);

  return (
    <div className={css.container}>
      <section className={css.titleSection}>
        <h2 className={css.mainTitle}>You're almost done.</h2>
        <p className={css.subTitle}>
          Please follow the steps to configure your Project and deploy it.
        </p>
      </section>

      <BuildStepCard step={2} />

      <section className={css.buildOptionSection}>
        <div className={css.buttonConsole}>
          <button onClick={handleClickPrev} className={css.prevButton}>
            Prev
          </button>
          {isButtonNext && (
            <button
              onClick={() => deploy?.mutate()}
              className={css.completeButton}
            >
              Complete
            </button>
          )}
        </div>
        <div className={css.buildOptionList}>
          <div
            className={`${css.buildOption} ${
              buildOptions.isProjectNameAvailable ? "" : css.unavailableOption
            }`}
          >
            <p className={css.buildOptionTitle}>Project Name</p>
            {/* // TODO: apply red point color */}
            {!buildOptions.isProjectNameAvailable && (
              <p>Your Project Name is duplicated.</p>
            )}
            {/* // TODO: apply red point color when projectName is duplicated */}
            <TextField
              value={defaultProjectName ?? ""}
              onTextFieldChange={setProjectName}
              placeholder={defaultProjectName ?? ""}
              key={defaultProjectName}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Framework</p>
            <SelectBox
              options={FRAMEWORK}
              onSelectionChange={(selection: string) => {
                setBuildOptions("framework")(selection);
                setDefaultCommand({
                  installCommand:
                    FRAMEWORK_PRESET[selection]?.installCommand ??
                    "npm install",
                  buildCommand:
                    FRAMEWORK_PRESET[selection]?.buildCommand ??
                    "npm run build",
                });
              }}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Node Version</p>
            <SelectBox
              options={NODE_VERSION}
              defaultSelect={defaultNodeVersion}
              onSelectionChange={setBuildOptions("nodeVersion")}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Install Command</p>
            <TextField
              placeholder={defaultInstallCommand ?? ""}
              onTextFieldChange={setBuildOptions("installCommand")}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Build Command</p>
            <TextField
              placeholder={defaultBuildCommand ?? ""}
              onTextFieldChange={setBuildOptions("buildCommand")}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Environment Varables</p>
            <EnvField />
          </div>
        </div>
      </section>
    </div>
  );
}
