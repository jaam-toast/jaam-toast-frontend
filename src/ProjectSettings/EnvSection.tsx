import {
  useBuildOptions,
  useProjectQuery,
  usePutProjectMutaion,
} from "../@hooks";
import { EnvField } from "../@shared";
import { ValidationError } from "../@utils/createError";
import * as css from "./index.css";

import type { PutProjectOption } from "../@types/api";

export function EnvSection({ projectName }: { projectName: string }) {
  const { data: project } = useProjectQuery(projectName);
  const { envList } = useBuildOptions();
  const updateEnv = usePutProjectMutaion();

  if (!project) {
    throw new ValidationError("schema, project not found");
  }

  // TODO error toast
  const handleSaveClick = async (data: Pick<PutProjectOption, "envList">) => {
    try {
      await updateEnv.mutateAsync({ projectName, option: data });
    } catch (error) {}
  };

  return (
    <section className={css.settingOptionSection}>
      <div className={css.sectionHead}>
        <span className={css.sectionTitle}>Environtment Variables</span>
        <button
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
