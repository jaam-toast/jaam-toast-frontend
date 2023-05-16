import { useState } from "react";
import { Link } from "react-router-dom";

import { ProjectCardList, ProjectCardListSkeleton } from "./ProjectCardList";
import { TextField } from "../@shared";
import { useUserQuery } from "../@hooks";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import { NotFoundError } from "../@utils/createError";
import { ERROR } from "../@config/message";
import * as css from "./index.css";

export function ProjectList() {
  const [searchword, setSearchword] = useState<string>("");
  const { data: user } = useUserQuery();

  if (!user) {
    throw new NotFoundError(ERROR.NOT_FOUND.PROJECT_NAME);
  }

  return (
    <div className={css.container}>
      <section className={css.explorerSection}>
        <div className={css.searchInput}>
          <TextField
            onTextFieldChange={setSearchword}
            placeholder="Search..."
          />
        </div>
        <Link className={css.newProjectButton} to={`/new/${user.userName}`}>
          New Project
        </Link>
      </section>
      <AsyncBoundary suspenseFallback={<ProjectCardListSkeleton />}>
        <ProjectCardList searchword={searchword} />
      </AsyncBoundary>
    </div>
  );
}
