import { useState } from "react";
import { Link } from "react-router-dom";

import { ProjectCardList, ProjectCardListSkeleton } from "./ProjectCardList";
import { TextField } from "../@shared";
import { useAuth } from "../@hooks";
import { AsyncBoundary } from "../Error/AsyncBoundary";
import * as css from "./index.css";

export function ProjectList() {
  const { user } = useAuth();
  const [searchword, setSearchword] = useState<string>("");

  return (
    <div className={css.container}>
      <section className={css.explorerSection}>
        <div className={css.searchInput}>
          <TextField
            onTextFieldChange={setSearchword}
            placeholder="Search..."
          />
        </div>
        <Link className={css.newProjectButton} to={`/new/${user.name}`}>
          New Project
        </Link>
      </section>
      <AsyncBoundary suspenseFallback={<ProjectCardListSkeleton />}>
        <ProjectCardList searchword={searchword} />
      </AsyncBoundary>
    </div>
  );
}
