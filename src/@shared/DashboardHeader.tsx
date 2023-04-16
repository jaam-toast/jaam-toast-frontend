import { Link, Navigate, useParams } from "react-router-dom";
import * as css from "./DashboardHeader.css";

export function DashboardHeader() {
  const params = useParams();
  const { userName, projectName } = params;

  if (!projectName || !userName) {
    return <Navigate to="/error" />;
  }

  return (
    <div className={css.container}>
      <ul className={css.dashboardNavBar}>
        <li className={css.dashboardNavLink}>
          <Link to={`/${userName}/${projectName}`}>Project</Link>
        </li>
        <li className={css.dashboardNavLink}>
          <Link to={`/${userName}/${projectName}/settings`}>Settings</Link>
        </li>
      </ul>
      <h1 className={css.projectTitle}>{projectName?.toUpperCase()}</h1>
    </div>
  );
}
