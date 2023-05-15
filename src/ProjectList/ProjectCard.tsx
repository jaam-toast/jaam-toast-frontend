import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(relativeTime);
import last from "lodash/last";

import { Favicon } from "./Favicon";
import { Avatar } from "../@shared";
import { useProjectQuery, useUserQuery } from "../@hooks";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import * as css from "./ProjectCard.css";

import { FRAMEWORK_DOMAIN } from "../@types/build";

export function ProjectCard({ projectId }: { projectId: string }) {
  const { data: project } = useProjectQuery(projectId);
  const { data: userData } = useUserQuery();
  const navigate = useNavigate();

  if (!project) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_DATA);
  }

  const domain = project.customDomain.length
    ? last(project.customDomain)
    : project.jaamToastDomain;

  if (!project || !userData) {
    throw new NotFoundError(ERROR.NOT_FOUND.ALL);
  }

  return (
    <div
      onClick={() => {
        navigate(`/${project.space}/${project.projectName}/dashboard`);
      }}
      className={css.projectCard}
    >
      <Suspense
        fallback={
          <li className={css.projectCardhead}>
            <Avatar size="large" className={css.avatarIconSkeleton}>
              <div className={css.avatarIconSkeleton} />
            </Avatar>
            <Avatar size="large" className={css.avatarIconSkeleton}>
              <div className={css.avatarIconSkeleton} />
            </Avatar>
            <Avatar size="large" className={css.avatarIconSkeleton}>
              <div className={css.avatarIconSkeleton} />
            </Avatar>
          </li>
        }
      >
        <li className={css.projectCardhead}>
          <Avatar size="large" className={css.avatar}>
            <Favicon domain={domain ?? ""} />
          </Avatar>
          <Avatar size="large" className={css.avatar}>
            <Favicon domain={FRAMEWORK_DOMAIN[project.framework]} />
          </Avatar>
          <Avatar size="large">
            <img className={css.userProfile} src={userData.userImage} />
          </Avatar>
        </li>
      </Suspense>
      <div className={css.projectCardMain}>
        <b className={css.projectCardName}>{project.projectName}</b>
        <span className={css.projectCardUrl}>
          {domain ?? "url not found..."}
        </span>
      </div>
      <div className={css.projectCardFooter}>
        {!!project.projectUpdatedAt && (
          <span className={css.projectCardUpdatedAt}>
            {dayjs(project.projectUpdatedAt).fromNow()}
          </span>
        )}
      </div>
    </div>
  );
}
