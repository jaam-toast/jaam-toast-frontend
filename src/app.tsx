import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Header } from "./@shared/Header";
import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";
import { RepositorySelect } from "./RepositorySelect";
import { BuildOptionSelect } from "./BuildOptionSelect";
import { ProjectDeploy } from "./ProjectDeploy";
import { ProjectDashboard } from "./ProjectDashboard";
import { ProjectSchema } from "./ProjectSchema";
import { ProjectContents } from "./ProjectContents";
import { ProjectAssets } from "./ProjectAssets";
import { ProjectSettings } from "./ProjectSettings";
import { NotFound } from "./Error/NotFound";
import { Error } from "./Error";
import { useAuth } from "./@shared";
import * as css from "./app.css";

export function App() {
  const { user } = useAuth();
  const { pathname, state } = useLocation();

  if (pathname === "/" && !!user) {
    return <Navigate to="/projects" />;
  }

  if (pathname !== "/" && !user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/new/:userName" element={<RepositorySelect />} />
          <Route
            path="/new/:userName/:repository"
            element={<BuildOptionSelect />}
          />
          <Route
            path="/new/:userName/:repository/deploy"
            element={<ProjectDeploy />}
          />
          <Route
            path="/:userName/:projectName/dashboard"
            element={<ProjectDashboard />}
          />
          <Route
            path="/:userName/:projectName/schema"
            element={<ProjectSchema />}
          />
          <Route
            path="/:userName/:projectName/contents"
            element={<ProjectContents />}
          />
          <Route
            path="/:userName/:projectName/assets"
            element={<ProjectAssets />}
          />
          <Route
            path="/:userName/:projectName/settings"
            element={<ProjectSettings />}
          />
          <Route
            path="/error"
            element={<Error code={state?.code} message={state?.message} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className={css.containerSkeleton}>
      <div className={css.pageSkeleton} />
    </div>
  );
}
