// import { useProjectQuery } from "../ProjectDetail/useProjectQuery";
import { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

import { DashboardHeader } from "../@shared";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import * as css from "./index.css";

export function ProjectDetail() {
  const params = useParams();
  const { projectName } = params;

  if (!projectName) {
    return <Navigate to="/" />;
  }

  // const { data: project } = useProjectQuery(projectName);
  const MOCK_PROJECT = {
    projectName: "MOCK_PROJECT",
    repoName: "MOCK_REPO",
    space: "MOCK_SPACE",
    repoCloneUrl: "https://MOCK_PROJECT/MOCK_PROJECT.github.com",
    projectUpdatedAt: "123",
    nodeVersion: "12.18.0",
    buildType: "react",
    deployedUrl: "https://www.jaamtoast.click",
    lastCommitMessage: "hello",
  };

  const project = MOCK_PROJECT;

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
              <span className={css.projectInfoTitle}>package info</span>
              <p className={css.projectInfoText}>{project.buildType}</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>url</span>
              <p className={css.projectInfoText}>{project.deployedUrl}</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>status</span>
              <p className={css.projectInfoText}>READY</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>last commit message</span>
              <p className={css.projectInfoText}>{project.lastCommitMessage}</p>
            </li>
            <li className={css.projectInfo}>
              <span className={css.projectInfoTitle}>created at</span>
              <p className={css.projectInfoText}>{project.projectUpdatedAt}</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
