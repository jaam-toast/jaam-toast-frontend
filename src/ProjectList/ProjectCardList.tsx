import { useProjectListQuery } from "../@hooks/useProjectListQuery";

import { ProjectCard } from "./ProjectCard";
import * as css from "./ProjectCardList.css";
import { Suspense } from "react";

type ProjectCardListProps = {
  searchword: string;
};

export function ProjectCardList({ searchword }: ProjectCardListProps) {
  const { data: projects } = useProjectListQuery();

  return (
    <section className={css.container}>
      {projects
        // ?.filter(project =>
        //   searchword ? project.repoName.includes(searchword) : true,
        // )
        ?.map(project => (
          <Suspense fallback={<ProjectCardSkeleton />} key={project}>
            <ProjectCard projectId={project} />
          </Suspense>
        ))}
    </section>
  );
}

export function ProjectCardSkeleton() {
  return <div className={css.projectCardSkeleton} />;
}

export function ProjectCardListSkeleton() {
  return (
    <div className={css.container}>
      {Array.from({ length: 15 }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} />
      ))}
    </div>
  );
}
