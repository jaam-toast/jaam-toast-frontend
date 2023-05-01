import { Link, Navigate, useParams, useLocation } from "react-router-dom";

import * as css from "./DashboardHeader.css";

export function DashboardHeader() {
  const params = useParams();
  const location = useLocation();
  const { userName, projectName } = params;
  const { pathname } = location;

  const regExp = /\/(\w+)$/;
  const currentPage = pathname.match(regExp)![1];

  if (!projectName || !userName) {
    return <Navigate to="/error" />;
  }

  return (
    <div className={css.container}>
      <h1 className={css.projectTitle}>{projectName}</h1>
      <ul className={css.navBar}>
        <Link to={`/${userName}/${projectName}/dashboard`}>
          <li
            className={
              currentPage === "dashboard" ? css.navLinkPoint : css.navLink
            }
          >
            Project
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/schema`}>
          <li
            className={
              currentPage === "schema" ? css.navLinkPoint : css.navLink
            }
          >
            Schema
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/contents`}>
          <li
            className={
              currentPage === "contents" || currentPage === "new"
                ? css.navLinkPoint
                : css.navLink
            }
          >
            Contents
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/assets`}>
          <li
            className={
              currentPage === "assets" ? css.navLinkPoint : css.navLink
            }
          >
            Assets
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/settings`}>
          <li
            className={
              currentPage === "settings" ? css.navLinkPoint : css.navLink
            }
          >
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}
