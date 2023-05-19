import { useEffect } from "react";

import {
  useBuildOptions,
  useProjectQuery,
  useSetBuildOptions,
  useUpdateBuildOptionMutation,
} from "../@hooks";
import { EnvField } from "../@shared";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

import type { BuildOptions } from "../@types/build";

export function EnvSection({ projectName }: { projectName: string }) {
  const { data: project } = useProjectQuery(projectName);
  const { envList } = useBuildOptions();
  const setEnv = useSetBuildOptions()("envList");
  const updateEnv = useUpdateBuildOptionMutation();

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  useEffect(() => {
    setEnv(project?.envList);
  }, []);

  const handleSaveClick = async (data: Pick<BuildOptions, "envList">) => {
    updateEnv.mutate({ projectName, option: data });
  };

  return (
    <section className={css.settingOptionSection}>
      <div className={css.sectionHead}>
        <span className={css.sectionTitle}>Environtment Variables</span>
        <button
          disabled={
            !envList.length ||
            JSON.stringify(envList) == JSON.stringify(project.envList)
          }
          onClick={() => handleSaveClick({ envList })}
          className={css.saveButton}
        >
          save
        </button>
      </div>
      <EnvField envs={project.envList} />
    </section>
  );
}
