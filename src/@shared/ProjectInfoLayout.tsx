import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import * as css from "./ProjectInfoLayout.css";

export function ProjectInfoLayout() {
  return (
    <div className={css.layout}>
      <DashboardHeader />
      <Outlet />
    </div>
  );
}
