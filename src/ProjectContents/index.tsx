import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Modal, useModal, SelectBox } from "../@shared";
import { ProjectContentsList } from "./ProjectContentsList";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const params = useParams();
  const navigate = useNavigate();

  const { projectName } = params;

  const [sortOption, setSortOption] = useState<SortMode>("createdAt");
  const [orderOption, setOrderOption] = useState<OrderMode>("ascending");
  const [currentSchemaIndex, setCurrentSchemaIndex] = useState<number>(0);
  const { openModal } = useModal();

  if (!projectName) {
    return <Navigate to="/error" />;
  }

  // TODO contents 없으면 에러나는 부분 해결
  const { data: project, refetch } = useProjectQuery(projectName);

  if (!project) {
    return <Navigate to="/error" />;
  }

  const { schemaList, storageKey: token } = project;
  const { schema } = useMemo(
    () => schemaList[currentSchemaIndex],
    [currentSchemaIndex],
  );

  const handleAddClick = () => {
    navigate("new");
  };

  return (
    <div className={css.container}>
      <Modal />
      <header className={css.header}>
        <button onClick={handleAddClick} className={css.newButton}>
          + New Contents
        </button>
      </header>
      <div className={css.inputContainer}>
        <div className={css.inputWrapper}>
          <SelectBox
            options={schemaList.map(data => data.schemaName) || []}
            defaultSelect={schema.title}
            onSelectionChange={(_, index) => {
              setCurrentSchemaIndex(index);
            }}
            label={"Schema"}
          />
        </div>
        <div className={css.inputWrapper}>
          <SelectBox
            options={["ascending", "descending"]}
            defaultSelect={"ascending"}
            onSelectionChange={setOrderOption}
            label={"Order"}
          />
        </div>
        <div className={css.inputWrapper}>
          <SelectBox
            options={["createdAt", "updatedAt"]}
            defaultSelect={"createdAt"}
            onSelectionChange={setSortOption}
            label={"Sort"}
          />
        </div>
      </div>
      <ProjectContentsList
        schema={schema}
        token={token}
        orderOption={orderOption}
        sortOption={sortOption}
      />
    </div>
  );
}
