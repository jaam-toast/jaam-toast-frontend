import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import timeSince from "../@utils/timeSince";
import { Favicon } from "./Favicon";
import { Avatar, useProjectQuery } from "../@shared";
import * as css from "./ProjectCard.css";

import { FRAMEWORK_DOMAIN } from "../@types/build";

export function ProjectCard({ projectId }: { projectId: string }) {
  const { data: project } = useProjectQuery(projectId);
  const navigate = useNavigate();

  if (!project) {
    return null;
  }

  // TODO domain
  return (
    <div
      onClick={() => {
        navigate(`/${project.space}/${project.projectName}/dashboard`);
      }}
      className={css.projectCard}
    >
      <li className={css.projectCardhead}>
        <Avatar size="large" className={css.avatar}>
          <Suspense fallback={<div className={css.avatarIconSkeleton} />}>
            <Favicon domain={project.buildDomain[0]} />
          </Suspense>
        </Avatar>
        <Avatar size="large" className={css.avatar}>
          <Favicon domain={FRAMEWORK_DOMAIN[project.framework]} />
        </Avatar>
        <Avatar size="large">
          <Favicon domain={""} />
        </Avatar>
      </li>
      <div className={css.projectCardMain}>
        <strong className={css.projectCardName}>{project.projectName}</strong>
        <span className={css.projectCardUrl}>
          {project.buildDomain ?? "url not found..."}
        </span>
      </div>
      <div className={css.projectCardFooter}>
        <p className={css.projectCardCommitMessage}>
          {project.lastCommitMessage}
        </p>
        <span className={css.projectCardUpdatedAt}>
          {timeSince(Number(project.projectUpdatedAt))}
        </span>
      </div>
    </div>
  );
}
