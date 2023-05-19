import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import { Header, ProjectInfoLayout } from "./@shared";
import { useAuth } from "./@hooks";

import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";

const RepositorySelect = lazy(() =>
  import("./RepositorySelect").then(({ RepositorySelect }) => ({
    default: RepositorySelect,
  })),
);
const BuildOptionSelect = lazy(() =>
  import("./BuildOptionSelect").then(({ BuildOptionSelect }) => ({
    default: BuildOptionSelect,
  })),
);
const ProjectDeploy = lazy(() =>
  import("./ProjectDeploy").then(({ ProjectDeploy }) => ({
    default: ProjectDeploy,
  })),
);
//
const ProjectDashboard = lazy(() =>
  import("./ProjectDashboard").then(({ ProjectDashboard }) => ({
    default: ProjectDashboard,
  })),
);
const ProjectSchema = lazy(() =>
  import("./ProjectSchema").then(({ ProjectSchema }) => ({
    default: ProjectSchema,
  })),
);
const ProjectContents = lazy(() =>
  import("./ProjectContents").then(({ ProjectContents }) => ({
    default: ProjectContents,
  })),
);
const NewContent = lazy(() =>
  import("./NewContent").then(({ NewContent }) => ({
    default: NewContent,
  })),
);
const ContentInfo = lazy(() =>
  import("./ContentInfo").then(({ ContentInfo }) => ({
    default: ContentInfo,
  })),
);
const ProjectAssets = lazy(() =>
  import("./ProjectAssets").then(({ ProjectAssets }) => ({
    default: ProjectAssets,
  })),
);
const ProjectWebhook = lazy(() =>
  import("./ProjectWebhook").then(({ ProjectWebhook }) => ({
    default: ProjectWebhook,
  })),
);
const NewWebhook = lazy(() =>
  import("./NewWebhook").then(({ NewWebhook }) => ({
    default: NewWebhook,
  })),
);
const WebhookInfo = lazy(() =>
  import("./WebhookInfo").then(({ WebhookInfo }) => ({
    default: WebhookInfo,
  })),
);
const ProjectSettings = lazy(() =>
  import("./ProjectSettings").then(({ ProjectSettings }) => ({
    default: ProjectSettings,
  })),
);

import { NotFound } from "./Error/NotFound";
import { Error } from "./Error";
import { AsyncBoundary } from "./Error/AsyncBoundary";
import { Portal } from "./Portal";
import * as css from "./app.css";

export function App() {
  const { isLogin } = useAuth();
  const { pathname, state } = useLocation();
  const portalRoot = document.getElementById("portal-root")!;

  if (pathname === "/" && isLogin) {
    return <Navigate to="/projects" />;
  }

  if (pathname !== "/" && !isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className={css.container}>
      <Header />
      {createPortal(<Portal />, portalRoot)}
      <AsyncBoundary suspenseFallback={<PageSkeleton />}>
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
          <Route element={<ProjectInfoLayout />}>
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
              path="/:userName/:projectName/contents/new"
              element={<NewContent />}
            />
            <Route
              path="/:userName/:projectName/contents/:schemaName/:contentId"
              element={<ContentInfo />}
            />
            <Route
              path="/:userName/:projectName/assets"
              element={<ProjectAssets />}
            />
            <Route
              path="/:userName/:projectName/webhook"
              element={<ProjectWebhook />}
            />
            <Route
              path="/:userName/:projectName/webhook/new"
              element={<NewWebhook />}
            />
            <Route
              path="/:userName/:projectName/webhook/:webhookId"
              element={<WebhookInfo />}
            />
            <Route
              path="/:userName/:projectName/settings"
              element={<ProjectSettings />}
            />
          </Route>
          <Route
            path="/error"
            element={<Error code={state?.code} message={state?.message} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AsyncBoundary>
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
