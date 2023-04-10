import { Route, Routes } from "react-router-dom";

import { Header } from "./@shared/Header";
import { Footer } from "./@shared/Footer";
import { Landing } from "./Landing";
import { ProjectList } from "./ProjectList";
import * as css from "./app.css";

export function App() {
  return (
    <div className={css.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<ProjectList />} />
      </Routes>
      <Footer />
    </div>
  );
}
