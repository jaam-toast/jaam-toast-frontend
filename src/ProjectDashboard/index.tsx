import { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

import { CmsInfo, CmsInfoSkeleton } from "./CmsInfo";
import { ProjectInfo, ProjectInfoSkeleton } from "./ProjectInfo";
import * as css from "./index.css";

export function ProjectDashboard() {
  const { userName, projectName } = useParams();

  if (!projectName || !userName) {
    return <Navigate to="/error" />;
  }

  return (
    <section className={css.container}>
      <header>
        <h2 className={css.sectionTitle}>project informations</h2>
      </header>
      <div className={css.wrapper}>
        <Suspense fallback={<ProjectInfoSkeleton />}>
          <ProjectInfo projectName={projectName} />
        </Suspense>
        <Suspense fallback={<CmsInfoSkeleton />}>
          <CmsInfo userName={userName} projectName={projectName} />
        </Suspense>
      </div>
    </section>
  );
}

export function ProjectDashboardSkeleton() {
  return (
    <section className={css.container}>
      <div>
        <h2> </h2>
      </div>
      <div className={css.wrapper}>
        <ProjectInfoSkeleton />
        <CmsInfoSkeleton />
      </div>
    </section>
  );
}
