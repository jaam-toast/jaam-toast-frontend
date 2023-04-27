import { Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { BsColumnsGap } from "react-icons/bs";
import { BsFileEarmarkImage } from "react-icons/bs";
import { BsStack } from "react-icons/bs";

import { ColorBox } from "../@shared/ColorBox";
import { DashboardHeader } from "../@shared";
import { Preview, PreviewSkeleton } from "../ProjectDeploy/Preview";
import { useProjectQuery } from "./useProjectQuery";
import { COLORS } from "../@config/colors";
import * as css from "./index.css";

export function ProjectDashboard() {
  const params = useParams();
  const { userName, projectName } = params;

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  const { data: project } = useProjectQuery(projectName);

  return (
    <div className={css.layout}>
      <DashboardHeader />
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
                  <span className={css.infoFieldTitle}>
                    last commit message
                  </span>
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
          {project?.schemaList?.length ? (
            <section className={css.cmsInfoSection}>
              <span className={css.infoFieldTitle}>Api Info</span>
              <ul className={css.cmsInfoList}>
                <Link to={`/${userName}/${projectName}/schema`}>
                  <li className={css.cmsInfo}>
                    <div className={css.cmsInfoLeft}>
                      <ColorBox>
                        <BsColumnsGap color={COLORS.LAVENDAR_DARK} />
                      </ColorBox>
                      <span className={css.infoFieldTitle}>Schema</span>
                    </div>
                    <p className={css.infoText}>{project.schemaList.length}</p>
                  </li>
                </Link>
                <Link to={`/${userName}/${projectName}/contents`}>
                  <li className={css.cmsInfo}>
                    <div className={css.cmsInfoLeft}>
                      <ColorBox>
                        <BsFileEarmarkImage color={COLORS.LAVENDAR_DARK} />
                      </ColorBox>
                      <span className={css.infoFieldTitle}>Assets</span>
                    </div>
                    <p className={css.infoText}>10</p>
                  </li>
                </Link>
                <Link to={`/${userName}/${projectName}/assets`}>
                  <li className={css.cmsInfo}>
                    <div className={css.cmsInfoLeft}>
                      <ColorBox>
                        <BsStack color={COLORS.LAVENDAR_DARK} />
                      </ColorBox>
                      <span className={css.infoFieldTitle}>Contents</span>
                    </div>
                    <p className={css.infoText}>5</p>
                  </li>
                </Link>
              </ul>
            </section>
          ) : (
            <section className={css.emptyCmsSection}>
              <span className={css.infoText}>
                No contents here. <br />
                <strong>Let's create some!</strong> Ready to start?
              </span>
              <div className={css.emptyCmsButtonWrapper}>
                <button className={css.emptyCmsButton}>Quick Start</button>
                <Link
                  to={`/${userName}/${projectName}/schema`}
                  className={css.emptyCmsButton}
                >
                  Add Schema
                </Link>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
