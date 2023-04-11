import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  BuildStepCard,
  SelectBox,
  EnvField,
  useDefaultProjectName,
  useIsProjectNameAvailable,
  useProjectNameActions,
} from "../@shared";
import {
  useBuildOptions,
  useSetBuildOptions,
} from "../BuildOptionSelect/useBuildOptionsStore";
import useProjectMutaion from "../BuildOptionSelect/useProjectMutation";
import { Framework } from "../types/build";
import * as css from "./index.css";

export function BuildOptionSelect() {
  const navigate = useNavigate();
  const params = useParams();

  const defaultProjectName = useDefaultProjectName();
  const isProjectNameAvailable = useIsProjectNameAvailable();
  const { setProjectName, setDefaultProjectName } = useProjectNameActions();

  const buildOptions = useBuildOptions();
  const setBuildOptions = useSetBuildOptions();

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

  const isButtonNext = !!buildOptions.nodeVersion && !!buildOptions.buildType;

  useEffect(() => {
    const { repository } = params;

    if (!defaultProjectName) {
      setDefaultProjectName(repository as string);
    }
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
              onClick={() => !!deploy && deploy()}
              className={css.completeButton}
            >
              Complete
            </button>
          )}
        </div>
        <div className={css.buildOptionList}>
          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Project Name</p>
            {/* // TODO: apply red point color */}
            {!isProjectNameAvailable && <p>Your Project Name is duplicated.</p>}
            {/* // TODO: apply red point color when projectName is duplicated */}
            <TextField
              defaultValue={defaultProjectName ?? ""}
              onTextFieldChange={setProjectName}
              placeholder={defaultProjectName ?? ""}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Build Type *</p>
            <SelectBox
              label="Build Type"
              options={Object.values(Framework)}
              onSelectionChange={setBuildOptions("buildType")}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Install Command</p>
            <TextField
              placeholder={buildOptions.installCommand ?? ""}
              onTextFieldChange={setBuildOptions("installCommand")}
            />
          </div>

          <div className={css.buildOption}>
            <p className={css.buildOptionTitle}>Build Command</p>
            <TextField
              placeholder={buildOptions.buildCommand ?? ""}
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
