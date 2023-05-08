import { useParams } from "react-router-dom";

import { ProjectDeleteSection } from "./ProjectDeleteSection";
import { CommandSectionList } from "./CommandSectionList";
import { EnvSection } from "./EnvSection";
import { DomainSection } from "./DomainSection";
import { Suspense } from "react";
import { ValidationError } from "../@utils/createError";
import * as css from "./index.css";

export function ProjectSettings() {
  const { projectName } = useParams();

  if (!projectName) {
    throw new ValidationError("project not found");
  }

  return (
    <Suspense fallback={<ProjectSettingsSkeleton />}>
      <CommandSectionList projectName={projectName} />
      <EnvSection projectName={projectName} />
      <DomainSection projectName={projectName} />
      <ProjectDeleteSection projectName={projectName} />
    </Suspense>
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
