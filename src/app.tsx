import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import { Header } from "./@shared/Header";
import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";
import { RepositorySelect } from "./RepositorySelect";
import { BuildOptionSelect } from "./BuildOptionSelect";
import { ProjectDeploy } from "./ProjectDeploy";
import { ProjectDetail } from "./ProjectDetail";
import { useAuth } from "./@shared";
import * as css from "./app.css";

export function App() {
  const { user } = useAuth();

  return (
    <div className={css.container}>
      <Header />
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/projects" /> : <Landing />}
          />
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
          <Route path="/:userName/:projectName" element={<ProjectDetail />} />
        </Routes>
      </Suspense>
    </div>
  );
}
