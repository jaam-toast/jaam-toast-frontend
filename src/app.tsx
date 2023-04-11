import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import { Header } from "./@shared/Header";
import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";
import { RepositorySelect } from "./RepositorySelect";
import { BuildOptionSelect } from "./BuildOptionSelect";
import * as css from "./app.css";

export function App() {
  return (
    <div className={css.container}>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<ProjectList />} />
          {/* <Route path="/new/:userName/:projectName" element={<ProjectDetail />} /> */}
          <Route path="/new/:userName" element={<RepositorySelect />} />
          <Route
            path="/new/:userName/:repository"
            element={<BuildOptionSelect />}
          />
          {/* <Route
            path="/new/:userName/:repository/deploy"
            element={<ProjectDeploy />}
          /> */}
          {/* <Route path="/new/:userName/:repository/preview" element={<ProejctPreview />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
