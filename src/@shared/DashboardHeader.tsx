import { Link, useParams, useLocation } from "react-router-dom";

import * as css from "./DashboardHeader.css";
import { ValidationError } from "../@utils/createError";

export function DashboardHeader() {
  const { userName, projectName } = useParams();
  const location = useLocation();
  const { pathname } = location;

  if (!projectName || !userName) {
    throw new ValidationError("projectName, userName not found");
  }

  const regExp = /\/([^/]+)\/([^/]+)\/([^/]+)$/;
  const currentPathArr = pathname.match(regExp)!;

  return (
    <div className={css.container}>
      <h1 className={css.projectTitle}>{projectName}</h1>
      <ul className={css.navBar}>
        <Link to={`/${userName}/${projectName}/dashboard`}>
          <li
            className={
              currentPathArr[3] === "dashboard" ? css.navLinkPoint : css.navLink
            }
          >
            Project
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/schema`}>
          <li
            className={
              currentPathArr[3] === "schema" ? css.navLinkPoint : css.navLink
            }
          >
            Schema
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/contents`}>
          <li
            className={
              currentPathArr[3] === "contents" ||
              (currentPathArr[2] === "contents" && currentPathArr[3] === "new")
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
              currentPathArr[3] === "assets" ? css.navLinkPoint : css.navLink
            }
          >
            Assets
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/webhook`}>
          <li
            className={
              currentPathArr[3] === "webhook" ||
              (currentPathArr[2] === "webhook" && currentPathArr[3] === "new")
                ? css.navLinkPoint
                : css.navLink
            }
          >
            Webhook
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/settings`}>
          <li
            className={
              currentPathArr[3] === "settings" ? css.navLinkPoint : css.navLink
            }
          >
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}
