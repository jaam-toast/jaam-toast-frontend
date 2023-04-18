import { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { DashboardHeader } from "../@shared";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import { useProjectQuery } from "./useProjectQuery";
import * as css from "./index.css";

export function ProjectDetail() {
  const params = useParams();
  const { projectName } = params;

  if (!projectName) {
    return <Navigate to="/" />;
  }

  const { data: project } = useProjectQuery(projectName);

  return (
    <div className={css.container}>
      <DashboardHeader />
      <div className={css.projectDetails}>
        <PreviewSkeleton />
        <section className={css.projectInfoSection}>
          <span className={css.projectInfoSectionTitle}>
            project informations
          </span>
          <ul className={css.projectInfoList}>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>name</span>
              <p className={css.projectInfoText}>{projectName}</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>framework</span>
              <p className={css.projectInfoText}>{project?.framework}</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>url</span>
              <a
                className={css.projectInfoText}
                href={`https://${project?.buildDomain}`}
                target="blank"
              >
                {`https://${project?.buildDomain}`}
              </a>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>status</span>
              <p className={css.projectInfoText}>READY</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>last commit message</span>
              <p className={css.projectInfoText}>
                {project?.lastCommitMessage}
              </p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>created at</span>
              <p className={css.projectInfoText}>
                {dayjs(project?.projectUpdatedAt).format("YYYY MM DD dddd")}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
