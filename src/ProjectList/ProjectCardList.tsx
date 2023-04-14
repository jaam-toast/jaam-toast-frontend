import { useNavigate } from "react-router-dom";
import { useProjectListQuery } from "./useProjectListQuery";
import timeSince from "../@utils/timeSince";
import * as css from "./ProjectCardList.css";

type ProjectCardListProps = {
  searchword: string;
};

export function ProjectCardList({ searchword }: ProjectCardListProps) {
  const naigate = useNavigate();
  const { data: projects } = useProjectListQuery();

  return (
    <section className={css.container}>
      {projects
        ?.filter(project =>
          searchword ? project.repoName.includes(searchword) : true,
        )
        .map((project, idx) => (
          <div
            key={project.projectName + idx}
            onClick={() => naigate(`/${project.space}/${project.repoName}`)}
            className={css.projectCard}
          >
            <div className={css.projectCardHead}>
              <div className={css.projectCardAvartars}></div>
              <strong className={css.projectCardName}>
                {project.projectName}
              </strong>
              <span className={css.projectCardUrl}>
                {project.deployedUrl ?? "url not found..."}
              </span>
            </div>
            <div className={css.projectCardFooter}>
              <p className={css.projectCardCommitMessage}>
                {project.lastCommitMessage}
              </p>
              <span className={css.projectCardUpdatedAt}>
                {timeSince(Number(project.projectUpdatedAt))} ago via
              </span>
            </div>
          </div>
        ))}
    </section>
  );
}

export function ProjectCardListSkeleton() {
  return (
    <div className={css.container}>
      {Array.from({ length: 15 }).map((_, idx) => (
        <div className={css.projectCardSkeleton} key={idx} />
      ))}
    </div>
  );
}
