import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProjectCardList, ProjectCardListSkeleton } from "./ProjectCardList";
import { TextField, useAuth } from "../@shared";
import * as css from "./index.css";

export function ProjectList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchword, setSearchword] = useState<string>("");

  const handleCreateProjectClick = () => {
    navigate(`/new/${user.name}`);
  };

  return (
    <div className={css.container}>
      <section className={css.explorerSection}>
        <div className={css.searchInput}>
          <TextField
            onTextFieldChange={setSearchword}
            placeholder="Search..."
          />
        </div>
        <button
          className={css.newProjectButton}
          onClick={handleCreateProjectClick}
        >
          New Project
        </button>
      </section>
      <Suspense fallback={<ProjectCardListSkeleton />}>
        <ProjectCardList searchword={searchword} />
      </Suspense>
    </div>
  );
}
