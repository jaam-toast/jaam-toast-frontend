import { Suspense } from "react";
import dayjs from "dayjs";

import { useProjectQuery } from "../@hooks";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import * as css from "./ProjectInfo.css";

export function ProjectInfo({ projectName }: { projectName: string }) {
  const { data: project } = useProjectQuery(projectName);

  return (
    <div className={css.projectInfoContainer}>
      <section className={css.projectPreviewSection}>
        <Suspense fallback={<PreviewSkeleton />}>
          <Preview url={`https://${project?.buildDomain}`} />
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
              href={`https://${project?.buildDomain}`}
              target="_blank"
            >
              {`https://${project?.buildDomain}`}
            </a>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>status</span>
            <p className={css.projectInfoText}>READY</p>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>
              last commit message
            </span>
            <p className={css.projectInfoText}>{project?.lastCommitMessage}</p>
          </li>
          <li className={css.projectInfo}>
            <span className={css.projectInfoFieldTitle}>created at</span>
            <p className={css.projectInfoText}>
              {dayjs(project?.projectUpdatedAt).format("YYYY MM DD dddd")}
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
