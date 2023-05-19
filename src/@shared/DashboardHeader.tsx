import { Link, useParams, useLocation } from "react-router-dom";

import * as css from "./DashboardHeader.css";
import { ValidationError } from "../@utils/createError";

export function DashboardHeader() {
  const { userName, projectName } = useParams();
  const location = useLocation();
  const [, , , pageName, newPage] = location.pathname.split("/");

  if (!projectName || !userName) {
    throw new ValidationError("projectName, userName not found");
  }

  return (
    <div className={css.container}>
      <h1 className={css.projectTitle}>{projectName}</h1>
      <ul className={css.navBar}>
        <Link to={`/${userName}/${projectName}/dashboard`}>
          <li
            className={
              pageName === "dashboard" ? css.navLinkPoint : css.navLink
            }
          >
            Project
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/schema`}>
          <li
            className={pageName === "schema" ? css.navLinkPoint : css.navLink}
          >
            Schema
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/contents`}>
          <li
            className={
              pageName === "contents" || (pageName === "contents" && newPage)
                ? css.navLinkPoint
                : css.navLink
            }
          >
            Contents
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/assets`}>
          <li
            className={pageName === "assets" ? css.navLinkPoint : css.navLink}
          >
            Assets
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/webhook`}>
          <li
            className={
              pageName === "webhook" || (pageName === "webhook" && newPage)
                ? css.navLinkPoint
                : css.navLink
            }
          >
            Webhook
          </li>
        </Link>
        <Link to={`/${userName}/${projectName}/settings`}>
          <li
            className={pageName === "settings" ? css.navLinkPoint : css.navLink}
          >
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}
