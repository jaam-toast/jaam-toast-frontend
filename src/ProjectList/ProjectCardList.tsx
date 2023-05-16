import { Suspense } from "react";

import { EmptyCard } from "../@shared";
import { useUserQuery } from "../@hooks";
import { ProjectCard } from "./ProjectCard";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import * as css from "./ProjectCardList.css";

export function ProjectCardList({ searchword }: { searchword: string }) {
  const { data: user } = useUserQuery();

  if (!user) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }

  return (
    <section className={css.container}>
      {user.projects && user.projects.length ? (
        user.projects
          ?.filter(project =>
            searchword ? project.includes(searchword) : true,
          )
          ?.map(project => (
            <Suspense fallback={<ProjectCardSkeleton />} key={project}>
              <ProjectCard projectId={project} />
            </Suspense>
          ))
      ) : (
        <EmptyCard
          title="No project here."
          description="Let's create project! You can deploy using github, and
          you can use a headless cms"
          link={`/new/${user.userName}`}
          linkTitle="Create New Project"
        />
      )}
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
