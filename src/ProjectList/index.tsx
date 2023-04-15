import { Suspense, useState } from "react";

import { ProjectCardList, ProjectCardListSkeleton } from "./ProjectCardList";
import { TextField, useAuth } from "../@shared";
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
        <a className={css.newProjectButton} href={`/new/${user.name}`}>
          New Project
        </a>
      </section>
      <Suspense fallback={<ProjectCardListSkeleton />}>
        <ProjectCardList searchword={searchword} />
      </Suspense>
    </div>
  );
}
