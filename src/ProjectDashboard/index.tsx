import { useParams } from "react-router-dom";

import { ERROR } from "../@config/message";
import { NotFoundError } from "../@utils/createError";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { CmsInfo, CmsInfoSkeleton } from "./CmsInfo";
import { ProjectInfo, ProjectInfoSkeleton } from "./ProjectInfo";
import * as css from "./index.css";

export function ProjectDashboard() {
  const { userName, projectName } = useParams();

  if (!projectName || !userName) {
    throw new NotFoundError(ERROR.NOT_FOUND.PARAMETER);
  }

  return (
    <section className={css.container}>
      <header>
        <h2 className={css.sectionTitle}>project informations</h2>
      </header>
      <div className={css.wrapper}>
        <AsyncBoundary suspenseFallback={<ProjectDashboardSkeleton />}>
          <>
            <ProjectInfo projectName={projectName} />
            <CmsInfo userName={userName} projectName={projectName} />
          </>
        </AsyncBoundary>
      </div>
    </section>
  );
}

export function ProjectDashboardSkeleton() {
  return (
    <>
      <ProjectInfoSkeleton />
      <CmsInfoSkeleton />
    </>
  );
}
