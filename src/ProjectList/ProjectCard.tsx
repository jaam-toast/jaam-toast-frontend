import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(relativeTime);

import { Favicon } from "./Favicon";
import { Avatar } from "../@shared";
import { useProjectQuery, useUserQuery } from "../@hooks";
import * as css from "./ProjectCard.css";

import { FRAMEWORK_DOMAIN } from "../@types/build";

export function ProjectCard({ projectId }: { projectId: string }) {
  const { data: project } = useProjectQuery(projectId);
  const { data: userData } = useUserQuery();
  const navigate = useNavigate();

  // TODO error
  if (!project || !userData) {
    return null;
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
            <Favicon domain={project.buildDomain[0]} />
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
          {!!project.buildDomain.length
            ? project.buildDomain[project.buildDomain.length - 1]
            : "url not found..."}
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
