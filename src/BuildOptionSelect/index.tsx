import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TextField, BuildStepCard, SelectBox, EnvField } from "../@shared";
import {
  useBuildOptions,
  useSetBuildOptions,
} from "../BuildOptionSelect/useBuildOptionsStore";
import useProjectMutaion from "./useProjectMutation";
import {
  usePresetBuildOptionStore,
  usePresetBuildOptions,
} from "../RepositorySelect/usePresetBuildOptionStore";
import * as css from "./index.css";

import { Framework } from "../@types/build";

export function BuildOptionSelect() {
  const navigate = useNavigate();
  const params = useParams();

  const { defaultProjectName, defaultBuildCommand, defaultInstallCommand } =
    usePresetBuildOptions();
  const buildOptions = useBuildOptions();
  const setBuildOptions = useSetBuildOptions();
  const { setRepoName, setSpace } = usePresetBuildOptionStore(
    state => state.actions,
  );

  const deploy = useProjectMutaion({
    // TODO: validation fail 처리.
    onValidateFail: console.log,
    onSuccess: () => {
      navigate(`./deploy`);
    },
    // TODO: 에러 처리.
    onError: () => {},
  });

  const handleClickPrev = () => {
    navigate(-1);
  };

  const isButtonNext = !!buildOptions.nodeVersion && !!buildOptions.framework;

  useEffect(() => {
    const { userName, repository } = params;
    if (!repository || !userName || !!buildOptions.projectName) {
      return;
    }

    setSpace(userName);
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
            <button onClick={() => deploy()} className={css.completeButton}>
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
              onTextFieldChange={setBuildOptions("projectName")}
              placeholder={defaultProjectName ?? ""}
              key={defaultProjectName}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Framework</p>
            <SelectBox
              label="Framework"
              options={Object.values(Framework)}
              onSelectionChange={setBuildOptions("framework")}
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
