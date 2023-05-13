import { useParams } from "react-router-dom";

import { ProjectDeleteSection } from "./ProjectDeleteSection";
import { CommandSectionList } from "./CommandSectionList";
import { EnvSection } from "./EnvSection";
import { DomainSection } from "./DomainSection";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { NotFoundError } from "../@utils/createError";
import * as css from "./index.css";

export function ProjectSettings() {
  const { projectName } = useParams();

  if (!projectName) {
    throw new NotFoundError("project not found");
  }

  return (
    <AsyncBoundary suspenseFallback={<ProjectSettingsSkeleton />}>
      <>
        <CommandSectionList projectName={projectName} />
        <EnvSection projectName={projectName} />
        <DomainSection projectName={projectName} />
        <ProjectDeleteSection projectName={projectName} />
      </>
    </AsyncBoundary>
  );
}

function ProjectSettingsSkeleton() {
  return (
    <>
      <div className={css.settingOptionSectionSkeleton}></div>
      <div className={css.settingOptionSectionSkeleton}></div>
      <div className={css.settingOptionSectionSkeleton}></div>
      <div className={css.settingOptionSectionSkeleton}></div>
    </>
  );
}
