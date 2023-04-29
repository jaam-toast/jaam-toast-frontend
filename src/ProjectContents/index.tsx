import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Modal, useModal, DashboardHeader, SelectBox } from "../@shared";
import { ModalNewContent } from "./ModalNewContent";
import { ProjectContentsList } from "./ProjectContentsList";
import { useProjectQuery } from "../ProjectDashboard/useProjectQuery";
import * as css from "./index.css";

import type { SortMode, OrderMode } from "../@types/cms";

export function ProjectContents() {
  const params = useParams();
  const { projectName } = params;

  const [searchword, setSearchword] = useState<string>("");
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
    openModal({
      component: <ModalNewContent schemaList={schemaList} token={token} />,
    });
  };

  return (
    <div className={css.layout}>
      <DashboardHeader />
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
      </div>
      <ProjectContentsList
        schema={schema}
        token={token}
        orderOption={orderOption}
        sortOption={sortOption}
        searchword={searchword}
      />
    </div>
  );
}
