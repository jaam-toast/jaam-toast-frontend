import { Route, Routes } from "react-router-dom";

import { Header } from "./@shared/Header";
import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";
import { RepositorySelect } from "./RepositorySelect";
import * as css from "./app.css";

export function App() {
  return (
    <div className={css.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<ProjectList />} />
        {/* <Route path="/new/:userName/:projectName" element={<RepositoryImport />} /> */}
        <Route path="/new/:userName" element={<RepositorySelect />} />
        {/* <Route path="/new/:userName/:repository" element={<RepositoryImport />} /> */}
        {/* <Route path="/new/:userName/:repository/deploy" element={<RepositoryImport />} /> */}
        {/* <Route path="/new/:userName/:repository/preview" element={<RepositoryImport />} /> */}
      </Routes>
    </div>
  );
}
