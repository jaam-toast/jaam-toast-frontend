import { Suspense } from "react";
import dayjs from "dayjs";
import last from "lodash/last";

import { useProjectQuery } from "../@hooks";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import * as css from "./ProjectInfo.css";

export function ProjectInfo({ projectName }: { projectName: string }) {
  const { data: project } = useProjectQuery(projectName);

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  const domain = project.customDomain.length
    ? last(project.customDomain)
    : project.jaamToastDomain;

  return (
    <div className={css.projectInfoContainer}>
      <section className={css.projectPreviewSection}>
        <Suspense fallback={<PreviewSkeleton />}>
          <Preview url={domain ?? ""} />
        </Suspense>
      </section>
      <section className={css.projectInfoSection}>
        <ul className={css.projectInfoList}>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>package info</span>
            <p className={css.projectInfoText}>{project?.framework}</p>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>url</span>
            <a
              className={css.projectInfoText}
              href={`//${domain}` ?? ""}
              target="_blank"
            >
              {domain ?? ""}
            </a>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>status</span>
            <p className={css.projectInfoText}>{project?.status}</p>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>updated at</span>
            <p className={css.projectInfoText}>
              {dayjs(project.projectUpdatedAt).format("YYYY-MM-DD hh:mm")}
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export function ProjectInfoSkeleton() {
  return (
    <div className={css.projectInfoContainer}>
      <section className={css.projectPreviewSectionSkeleton}></section>
      <section className={css.projectInfoSectionSkeleton}></section>
    </div>
  );
}
