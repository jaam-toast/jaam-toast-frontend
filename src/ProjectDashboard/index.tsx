import { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useProjectQuery } from "../@shared";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import { CmsInfo } from "./CmsInfo";
import * as css from "./index.css";

export function ProjectDashboard() {
  const params = useParams();
  const { userName, projectName } = params;

  if (!projectName || !userName) {
    return <Navigate to="/error" />;
  }

  const { data: project } = useProjectQuery(projectName);

  return (
    <section className={css.container}>
      <header>
        <h2 className={css.sectionTitle}>project informations</h2>
      </header>
      <div className={css.wrapper}>
        <div className={css.projectInfoLeftWrapper}>
          <section className={css.projectPreviewSection}>
            <Suspense fallback={<PreviewSkeleton />}>
              <Preview url={`https://${project?.buildDomain}`} />
            </Suspense>
          </section>
          <section className={css.projectInfoSection}>
            <ul className={css.projectInfoList}>
              <li className={css.projectInfo}>
                <span className={css.infoFieldTitle}>package info</span>
                <p className={css.infoText}>{project?.framework}</p>
              </li>
              <li className={css.projectInfo}>
                <span className={css.infoFieldTitle}>url</span>
                <a
                  className={css.infoText}
                  href={`https://${project?.buildDomain}`}
                  target="_blank"
                >
                  {`https://${project?.buildDomain}`}
                </a>
              </li>
              <li className={css.projectInfo}>
                <span className={css.infoFieldTitle}>status</span>
                <p className={css.infoText}>READY</p>
              </li>
              <li className={css.projectInfo}>
                <span className={css.infoFieldTitle}>last commit message</span>
                <p className={css.infoText}>{project?.lastCommitMessage}</p>
              </li>
              <li className={css.projectInfo}>
                <span className={css.infoFieldTitle}>created at</span>
                <p className={css.infoText}>
                  {dayjs(project?.projectUpdatedAt).format("YYYY MM DD dddd")}
                </p>
              </li>
            </ul>
          </section>
        </div>
        <CmsInfo
          schemaListCount={project?.schemaList?.length || 0}
          userName={userName}
          projectName={projectName}
        />
      </div>
    </section>
  );
}
